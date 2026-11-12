import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { parseAtcRunResultDisplayId } from '../../../src/adt/atc.js';
import {
  ATC_RESULT_DETAIL_RESPONSE_BYTES,
  buildAtcResultListPath,
  getAtcResult,
  listAtcResults,
  parseAtcResultDetail,
  parseAtcResultList,
} from '../../../src/adt/atc-results.js';
import { AdtApiError, AdtResponseLimitError } from '../../../src/adt/errors.js';
import type { AdtHttpClient } from '../../../src/adt/http.js';
import { defaultSafetyConfig } from '../../../src/adt/safety.js';

const fixture = (name: string) => readFileSync(join(import.meta.dirname, '../../fixtures/xml', name), 'utf-8');
const LIST = fixture('atc-results-list.synthetic.xml');
const DETAIL = fixture('atc-result-detail.synthetic.xml');
const RUN_COMPLETED = fixture('atc-run-status-completed.xml');
const DISPLAY_ID = '005056A62AA91EEF818525AD389CA4BD';

function httpReturning(body: string) {
  const get = vi.fn().mockResolvedValue({ statusCode: 200, headers: {}, body });
  return { http: { get } as unknown as AdtHttpClient, get };
}

describe('ATC run → persisted result link', () => {
  it('reads the display id from the live 758 run-status capture', () => {
    expect(parseAtcRunResultDisplayId(RUN_COMPLETED)).toBe('DEA8421BB8E81FE1A9AF2379E41998A2');
  });

  it.each([
    ['no link', '<run status="Completed"/>'],
    [
      'unsafe href',
      '<run status="Completed"><link rel="x/results/displayid" href="https://evil/sap/bc/adt/atc/results/A"/></run>',
    ],
    [
      'ambiguous links',
      '<run><link rel="x/results/displayid" href="/sap/bc/adt/atc/results/A"/><link rel="y/results/displayid" href="/sap/bc/adt/atc/results/B"/></run>',
    ],
    ['query in href', '<run><link rel="x/results/displayid" href="/sap/bc/adt/atc/results/A?x=1"/></run>'],
  ])('ignores %s', (_label, xml) => {
    expect(parseAtcRunResultDisplayId(xml)).toBeUndefined();
  });
});

describe('buildAtcResultListPath (discovery templates)', () => {
  it.each([
    [{ scope: 'active' as const }, '/sap/bc/adt/atc/results?activeResult=true'],
    [
      { scope: 'active' as const, sysId: 'erp', contactPerson: 'dev1' },
      '/sap/bc/adt/atc/results?activeResult=true&contactPerson=DEV1&sysId=ERP',
    ],
    [
      { scope: 'central' as const, sysId: 'ERP', createdBy: 'atc_admin', minAgeDays: 0, maxAgeDays: 30 },
      '/sap/bc/adt/atc/results?centralResult=true&createdBy=ATC_ADMIN&ageMin=0&ageMax=30&sysId=ERP',
    ],
    [{ scope: 'user' as const, createdBy: 'DEV1', maxAgeDays: 7 }, '/sap/bc/adt/atc/results?createdBy=DEV1&ageMax=7'],
  ])('maps %j', (query, path) => {
    expect(buildAtcResultListPath(query)).toBe(path);
  });

  it.each([
    { scope: 'active' as const, createdBy: 'DEV1' },
    { scope: 'active' as const, maxAgeDays: 3 },
    { scope: 'user' as const },
    { scope: 'user' as const, createdBy: 'DEV1', sysId: 'ERP' },
    { scope: 'central' as const, sysId: 'E&R' },
    { scope: 'central' as const, minAgeDays: 9, maxAgeDays: 3 },
    { scope: 'central' as const, maxAgeDays: -1 },
    { scope: 'central' as const, contactPerson: 'a b' },
  ])('refuses filters the template does not carry or malformed values: %j', (query) => {
    expect(() => buildAtcResultListPath(query)).toThrow(AdtApiError);
  });
});

describe('parseAtcResultList', () => {
  it('reads element and attribute headers tolerantly', () => {
    const { entries, recognized } = parseAtcResultList(LIST);
    expect(recognized).toBe(true);
    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({
      displayId: DISPLAY_ID,
      checkVariant: 'S4HANA_READINESS_2023',
      runSeries: 'ERP_S4_READINESS',
      createdAt: '2026-11-01T22:00:00Z',
      systemId: 'ERP',
      isActive: true,
      isCentral: true,
    });
    expect(entries[1]).toMatchObject({ checkVariant: 'ABAP_CLOUD_READINESS', isActive: false, isCentral: null });
    expect(entries[1]!.fields.title).toBe('Nightly clean core');
  });

  it('flags an unknown root instead of returning an empty clean list', () => {
    expect(parseAtcResultList('<somethingElse/>')).toEqual({ entries: [], recognized: false });
    expect(parseAtcResultList('')).toEqual({ entries: [], recognized: true });
  });
});

describe('parseAtcResultDetail', () => {
  it('returns findings shaped like atc with object identity and completeness evidence', () => {
    const detail = parseAtcResultDetail(DETAIL, DISPLAY_ID.toLowerCase());
    expect(detail.complete).toBe(true);
    expect(detail.incompleteReasons).toEqual([]);
    expect(detail.objects.map((o) => [o.name, o.findingCount])).toEqual([
      ['ZREPORT_A', 2],
      ['ZCL_ORDER', 1],
      ['ZIF_CLEAN', 0],
    ]);
    expect(detail.findings[0]).toMatchObject({
      priority: 1,
      line: 12,
      hasQuickfix: true,
      quickfixInfo: 'atc:AA01,1',
      checkId: 'CHK_S4_SIMPL',
      messageId: '1',
      uri: '/sap/bc/adt/programs/programs/zreport_a/source/main#start=12,4',
      object: { type: 'PROG', name: 'ZREPORT_A', uri: '/sap/bc/adt/atc/objects/R3TR/PROG/ZREPORT_A' },
    });
    expect(detail.findings[0]).not.toHaveProperty('exemptionApproval');
    expect(detail.findings[1]!.hasQuickfix).toBe(false);
  });

  it.each([
    ['another id', DETAIL, 'FFFF', 'different result display id'],
    ['no id echo', DETAIL.replace(/<atcresult:displayId>[^<]+<\/atcresult:displayId>/, ''), DISPLAY_ID, 'echo'],
    [
      'no objects container',
      DETAIL.replace(/<atcresult:objects>[\s\S]*<\/atcresult:objects>/, ''),
      DISPLAY_ID,
      'objects container',
    ],
    [
      'malformed priority',
      DETAIL.replace('atcfinding:priority="2"', 'atcfinding:priority="x"'),
      DISPLAY_ID,
      'priority',
    ],
    [
      'unsafe object uri',
      DETAIL.replace('/sap/bc/adt/atc/objects/R3TR/INTF/ZIF_CLEAN', 'https://evil/x'),
      DISPLAY_ID,
      'malformed ATC object',
    ],
    [
      'announced count mismatch',
      DETAIL.replace('<atcresult:objects>', '<atcresult:objectCount>9</atcresult:objectCount><atcresult:objects>'),
      DISPLAY_ID,
      'announced 9',
    ],
    ['two results', `<resultList><result/><result/></resultList>`, DISPLAY_ID, 'exactly one'],
  ])('stays incomplete for %s', (_label, xml, id, reason) => {
    const detail = parseAtcResultDetail(xml, id);
    expect(detail.complete).toBe(false);
    expect(detail.incompleteReasons.join(' ')).toContain(reason);
  });

  it('accepts an explicit empty objects container as zero objects', () => {
    const xml = `<resultList><result><displayId>${DISPLAY_ID}</displayId><objects/></result></resultList>`;
    expect(parseAtcResultDetail(xml, DISPLAY_ID)).toMatchObject({ complete: true, findings: [] });
  });
});

describe('listAtcResults / getAtcResult requests', () => {
  it('lists with a bounded read under a read-only safety config', async () => {
    const { http, get } = httpReturning(LIST);
    const result = await listAtcResults(http, defaultSafetyConfig(), { scope: 'central', sysId: 'ERP' });
    expect(result.entries).toHaveLength(2);
    const [path, headers, options] = get.mock.calls[0]!;
    expect(path).toBe('/sap/bc/adt/atc/results?centralResult=true&sysId=ERP');
    expect(headers).toEqual({ Accept: 'application/xml' });
    expect(options.responseBudget.limitBytes).toBe(2 * 1024 * 1024);
  });

  it('reads one result with contact person and exempted findings', async () => {
    const { http, get } = httpReturning(DETAIL);
    const result = await getAtcResult(http, defaultSafetyConfig(), DISPLAY_ID, {
      contactPerson: 'dev1',
      includeExempted: true,
    });
    expect(result.complete).toBe(true);
    expect(get.mock.calls[0]![0]).toBe(
      `/sap/bc/adt/atc/results/${DISPLAY_ID}?contactPerson=DEV1&includeExemptedFindings=true`,
    );
    expect(get.mock.calls[0]![2].responseBudget.limitBytes).toBe(ATC_RESULT_DETAIL_RESPONSE_BYTES);
  });

  it('refuses a malformed display id before any request', async () => {
    const { http, get } = httpReturning(DETAIL);
    await expect(getAtcResult(http, defaultSafetyConfig(), '../x')).rejects.toThrow(AdtApiError);
    expect(get).not.toHaveBeenCalled();
  });

  it('never parses a body beyond the detail limit', async () => {
    const { http } = httpReturning(`<resultList>${' '.repeat(ATC_RESULT_DETAIL_RESPONSE_BYTES)}</resultList>`);
    await expect(getAtcResult(http, defaultSafetyConfig(), DISPLAY_ID)).rejects.toBeInstanceOf(AdtResponseLimitError);
  });
});
