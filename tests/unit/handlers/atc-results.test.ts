import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultSafetyConfig } from '../../../src/adt/safety.js';
import { DEFAULT_CONFIG } from '../../../src/server/types.js';
import { mockResponse } from '../../helpers/mock-fetch.js';
import { featuresOff } from './handler-test-config.js';
import { AdtClient, mockFetch } from './setup-undici-mock.js';

const { handleToolCall } = await import('../../../src/handlers/dispatch.js');
const { parseDiscoveryDocument } = await import('../../../src/adt/xml-parser.js');
const { resetCachedFeatures, setCachedFeatures } = await import('../../../src/handlers/feature-cache.js');

const fixture = (name: string) => readFileSync(join(import.meta.dirname, '../../fixtures/xml', name), 'utf-8');
const LIST = fixture('atc-results-list.synthetic.xml');
const DETAIL = fixture('atc-result-detail.synthetic.xml');
const RUN_COMPLETED = fixture('atc-run-status-completed.xml');
const DISPLAY_ID = '005056A62AA91EEF818525AD389CA4BD';
const RUN_DISPLAY_ID = 'DEA8421BB8E81FE1A9AF2379E41998A2';

const discovery = (...paths: string[]) =>
  `<app:service xmlns:app="http://www.w3.org/2007/app" xmlns:atom="http://www.w3.org/2005/Atom"><app:workspace><atom:title>ABAP Test Cockpit</atom:title>${paths
    .map((path) => `<app:collection href="${path}"><atom:title>x</atom:title></app:collection>`)
    .join(
      '',
    )}<app:collection href="/sap/bc/adt/programs/programs"><app:accept>application/xml</app:accept></app:collection></app:workspace></app:service>`;
const ALL_ATC = ['/sap/bc/adt/atc/worklists', '/sap/bc/adt/atc/runs', '/sap/bc/adt/atc/results'];

const client = () =>
  new AdtClient({ baseUrl: 'http://sap:8000', username: 'test', password: 'test', safety: defaultSafetyConfig() });
const call = (args: Record<string, unknown>, config = DEFAULT_CONFIG) =>
  handleToolCall(client(), config, 'SAPDiagnose', args);
const body = (result: Awaited<ReturnType<typeof call>>) => JSON.parse(result.content[0]!.text as string);
const requests = () =>
  mockFetch.mock.calls.map(([url, options]) => {
    const parsed = new URL(String(url));
    for (const key of ['sap-client', 'sap-language']) parsed.searchParams.delete(key);
    return `${options?.method ?? 'GET'} ${parsed.pathname}${parsed.search}`;
  });

function withDiscovery(...paths: string[]) {
  setCachedFeatures({ ...featuresOff(), discoveryMap: parseDiscoveryDocument(discovery(...paths)) });
}

/** Developer-scenario run on a checked system; the run links its persisted result. */
function mockRemoteRun(result = () => mockResponse(200, DETAIL.replaceAll(DISPLAY_ID, RUN_DISPLAY_ID))) {
  mockFetch.mockImplementation(async (url: string | URL, options?: { method?: string }) => {
    const path = new URL(String(url)).pathname;
    const method = options?.method ?? 'GET';
    if (method === 'HEAD') return mockResponse(200, '', { 'x-csrf-token': 'T' });
    if (path === '/sap/bc/adt/discovery') return mockResponse(200, discovery(...ALL_ATC));
    if (path.endsWith('/atc/variants'))
      return mockResponse(200, '<namedItems><namedItem><name>ZS4_READINESS_REF</name></namedItem></namedItems>');
    if (method === 'POST' && path.endsWith('/worklists')) return mockResponse(200, 'WL1');
    if (method === 'POST' && path.endsWith('/runs'))
      return mockResponse(201, '', { location: '/sap/bc/adt/atc/runs/R1' });
    if (path === '/sap/bc/adt/atc/runs/R1') return mockResponse(200, RUN_COMPLETED);
    if (path === `/sap/bc/adt/atc/results/${RUN_DISPLAY_ID}`) return result();
    return mockResponse(
      200,
      '<worklist id="WL1" objectSetIsComplete="true"><objects><object uri="/sap/bc/adt/atc/objects/R3TR/PROG/ZREPORT_A" type="PROG" name="ZREPORT_A"><findings><finding priority="1" checkTitle="S/4HANA" messageTitle="KONV"/></findings></object></objects></worklist>',
    );
  });
}

describe('SAPDiagnose atc_results', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetCachedFeatures();
  });
  afterEach(() => resetCachedFeatures());

  it('lists the active results on a read-only server and filters/pages client-side', async () => {
    mockFetch.mockResolvedValue(mockResponse(200, LIST));
    const result = await call({ action: 'atc_results', variant: 'S4HANA*', maxResults: 1 });
    expect(result.isError).toBeUndefined();
    expect(requests()).toEqual(['GET /sap/bc/adt/atc/results?activeResult=true']);
    expect(body(result)).toMatchObject({
      scope: 'active',
      recognizedShape: true,
      sapCount: 2,
      results: [{ displayId: DISPLAY_ID, checkVariant: 'S4HANA_READINESS_2023', runSeries: 'ERP_S4_READINESS' }],
      page: { offset: 0, limit: 1, returned: 1, total: 1, nextOffset: null },
    });
  });

  it('maps central results of a checked system and the creator onto the discovery template', async () => {
    withDiscovery(...ALL_ATC);
    mockFetch.mockResolvedValue(mockResponse(200, LIST));
    const result = await call({
      action: 'atc_results',
      user: 'atc_admin',
      atcResult: { scope: 'central', sysId: 'ERP', maxAgeDays: 30, title: 'nightly' },
    });
    expect(requests()).toEqual([
      'GET /sap/bc/adt/atc/results?centralResult=true&createdBy=ATC_ADMIN&ageMax=30&sysId=ERP',
    ]);
    expect(body(result).results).toEqual([
      expect.objectContaining({ displayId: '005056A62AA91EEF818525AD389C0001', title: 'Nightly clean core' }),
    ]);
  });

  it('reads one result with completeness evidence and paged, object-filtered findings', async () => {
    mockFetch.mockResolvedValue(mockResponse(200, DETAIL));
    const result = await call({
      action: 'atc_results',
      id: DISPLAY_ID,
      maxResults: 1,
      atcResult: { objectName: 'zreport_a', offset: 1, includeExempted: true },
    });
    expect(result.isError).toBeUndefined();
    expect(requests()).toEqual([`GET /sap/bc/adt/atc/results/${DISPLAY_ID}?includeExemptedFindings=true`]);
    const data = body(result);
    expect(data).toMatchObject({
      displayId: DISPLAY_ID,
      complete: true,
      evidence: {
        checkVariant: 'S4HANA_READINESS_2023',
        createdAt: '2026-11-01T22:00:00Z',
        objectCount: 3,
        objectsWithFindings: 2,
        findingCount: 3,
        includeExempted: true,
      },
      objectName: 'ZREPORT_A',
      page: { offset: 1, limit: 1, returned: 1, total: 2, nextOffset: null },
    });
    expect(data.findings[0]).toMatchObject({ priority: 2, line: 40, object: { name: 'ZREPORT_A', type: 'PROG' } });
  });

  it('returns incomplete evidence as an error without dropping the findings', async () => {
    mockFetch.mockResolvedValue(mockResponse(200, DETAIL.replace('atcfinding:priority="2"', 'atcfinding:priority=""')));
    const result = await call({ action: 'atc_results', id: DISPLAY_ID });
    expect(result.isError).toBe(true);
    expect(body(result)).toMatchObject({ complete: false, page: { total: 3 } });
  });

  it('fails closed with a capability error when discovery does not list the results collection', async () => {
    withDiscovery('/sap/bc/adt/atc/worklists', '/sap/bc/adt/atc/runs');
    const result = await call({ action: 'atc_results' });
    expect(result.isError).toBe(true);
    expect(body(result)).toMatchObject({ capability: 'unavailable' });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('turns a 404 without discovery evidence into a capability error', async () => {
    mockFetch.mockResolvedValue(mockResponse(404, 'Not found'));
    const result = await call({ action: 'atc_results', id: DISPLAY_ID });
    expect(result.isError).toBe(true);
    expect(body(result).message).toContain('does not expose persisted ATC results');
  });

  it('reports an oversized result instead of truncating silently', async () => {
    mockFetch.mockResolvedValue(mockResponse(200, `<resultList>${' '.repeat(8 * 1024 * 1024 + 1)}</resultList>`));
    const result = await call({ action: 'atc_results', id: DISPLAY_ID });
    expect(result.isError).toBe(true);
    expect(JSON.stringify(body(result))).toContain('contactPerson');
  });

  it('honours SAP_DENY_ACTIONS for the new actions', async () => {
    for (const action of ['atc_results', 'atc_remote']) {
      const result = await call(
        { action, ...(action === 'atc_remote' ? { type: 'PROG', name: 'ZREPORT_A', variant: 'X' } : {}) },
        { ...DEFAULT_CONFIG, denyActions: [`SAPDiagnose.${action}`] },
      );
      expect(result.isError).toBe(true);
    }
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it.each([
    { action: 'atc', type: 'PROG', name: 'Z', atcResult: { scope: 'central' } },
    { action: 'atc_results', atcResult: { scope: 'user' } },
    { action: 'atc_results', user: 'DEV1' },
    { action: 'atc_results', atcResult: { scope: 'user', sysId: 'ERP' }, user: 'DEV1' },
    { action: 'atc_results', id: DISPLAY_ID, atcResult: { scope: 'central' } },
    { action: 'atc_results', id: DISPLAY_ID, variant: 'X' },
    { action: 'atc_results', atcResult: { objectName: 'Z' } },
    { action: 'atc_results', atcResult: { unknown: true } },
    { action: 'atc_results', atcResult: { scope: 'central', minAgeDays: 9, maxAgeDays: 1 } },
    { action: 'atc_results', atcResult: { sysId: 'E-RP' } },
    { action: 'atc_results', id: '../x' },
    { action: 'atc_results', id: DISPLAY_ID, maxResults: 501 },
    { action: 'atc_results', maxResults: 201 },
    { action: 'atc_results', type: 'PROG' },
    { action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A' },
    { action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A', variant: 'X', objects: [{ type: 'PROG', name: 'Z' }] },
    { action: 'atc_remote', variant: 'X' },
    { action: 'atc_remote', type: 'DEVC', name: 'ZPKG', variant: 'X' },
    { action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A', variant: 'X', resultFormat: 'structured' },
  ])('rejects invalid input before any SAP call: %j', async (input) => {
    const result = await call(input);
    expect(result.isError).toBe(true);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe('SAPDiagnose atc_remote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetCachedFeatures();
  });
  afterEach(() => resetCachedFeatures());

  it('fails closed, naming the residual gap, when the system does not list every ATC resource', async () => {
    withDiscovery('/sap/bc/adt/atc/worklists', '/sap/bc/adt/atc/runs');
    const result = await call({ action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A', variant: 'ZS4_READINESS_REF' });
    expect(result.isError).toBe(true);
    const data = body(result);
    expect(data.capability).toBe('unavailable');
    expect(data.message).toContain('/sap/bc/adt/atc/results');
    expect(data.message).toContain('Schedule Runs');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fails closed when discovery cannot be read at all', async () => {
    mockFetch.mockResolvedValue(mockResponse(500, 'down'));
    const result = await call({ action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A', variant: 'ZS4_READINESS_REF' });
    expect(result.isError).toBe(true);
    expect(body(result).message).toContain('could not be read');
    expect(requests().every((request) => request.includes('/discovery'))).toBe(true);
  });

  it('runs the delegated check and reads back the persisted result as evidence', async () => {
    mockRemoteRun();
    const result = await call({ action: 'atc_remote', type: 'PROG', name: 'ZREPORT_A', variant: 'ZS4_READINESS_REF' });
    expect(result.isError).toBeUndefined();
    const data = body(result);
    expect(data).toMatchObject({
      scenario: 'developer',
      complete: true,
      variant: 'ZS4_READINESS_REF',
      variantSource: 'requested',
      persistedResults: [
        {
          worklistId: 'WL1',
          displayId: RUN_DISPLAY_ID,
          checkVariant: 'S4HANA_READINESS_2023',
          complete: true,
        },
      ],
    });
    expect(data.runs[0].resultDisplayId).toBe(RUN_DISPLAY_ID);
    // A local reference variant that differs from the central one is surfaced, not hidden.
    expect(data.warnings.join(' ')).toContain('S4HANA_READINESS_2023');
    expect(requests()).toEqual(
      expect.arrayContaining([
        'GET /sap/bc/adt/discovery',
        'POST /sap/bc/adt/atc/worklists?checkVariant=ZS4_READINESS_REF',
        `GET /sap/bc/adt/atc/results/${RUN_DISPLAY_ID}`,
      ]),
    );
  });

  it('keeps the run result when the persisted result cannot be read', async () => {
    withDiscovery(...ALL_ATC);
    mockRemoteRun(() => mockResponse(403, 'No authorization'));
    const result = await call({
      action: 'atc_remote',
      objects: [{ type: 'PROG', name: 'ZREPORT_A' }],
      variant: 'ZS4_READINESS_REF',
    });
    const data = body(result);
    expect(data.complete).toBe(true);
    expect(data.persistedResults).toEqual([{ worklistId: 'WL1', displayId: RUN_DISPLAY_ID, unavailable: 'HTTP 403' }]);
  });
});
