/**
 * Persisted ATC result sets (`/sap/bc/adt/atc/results`) — results that ARC-1 did not start:
 * runs scheduled in transaction ATC, central/remote run-series results, and results made available
 * to a checked system. Read-only; every request is bounded and goes through `checkOperation`.
 *
 * Wire contract sources (see docs/research/2026-11-12-remote-atc-and-results.md):
 * - URI templates: ADT discovery "ABAP Test Cockpit" workspace, collection `atcresults`
 *   (`{?activeResult,contactPerson}`, `{?activeResult,contactPerson,sysId}`,
 *   `{?createdBy,ageMin,ageMax,contactPerson}`, `{?centralResult,createdBy,contactPerson,ageMin,ageMax[,sysId]}`,
 *   `/{displayId}{?activeResult,contactPerson,includeExemptedFindings}`).
 * - Run-status → display id link: live 758 capture tests/fixtures/xml/atc-run-status-completed.xml.
 * - `<atcresult:checkVariant>` element in the detail: measured on 758 (docs/plans/fix-atc-effective-check-variant.md).
 * The list/detail element names beyond that are NOT live-verified in ARC-1; the parser is tolerant
 * (child elements or attributes) and returns the raw scalar fields so a first live run can confirm them.
 */

import { type AtcFinding, nodeRecords, nodeText, nodeValues, parseAtcFinding } from './atc.js';
import { DataResponseBudget } from './data-result-context.js';
import { AdtApiError } from './errors.js';
import type { AdtHttpClient } from './http.js';
import type { AdtRequestOptions } from './http-deadline.js';
import { canonicalHostRelativeAdtPath } from './path-safety.js';
import { checkOperation, OperationType, type SafetyConfig } from './safety.js';
import { parseXml } from './xml-parser.js';

export const ATC_RESULTS_PATH = '/sap/bc/adt/atc/results';
/** Collections a delegated (developer-scenario) run and its read-back need; all must be listed. */
export const ATC_REMOTE_COLLECTIONS = ['/sap/bc/adt/atc/worklists', '/sap/bc/adt/atc/runs', ATC_RESULTS_PATH] as const;
export const ATC_RESULT_SCOPES = ['active', 'central', 'user'] as const;
export type AtcResultScope = (typeof ATC_RESULT_SCOPES)[number];
export const ATC_RESULT_ID_PATTERN = '^[A-Za-z0-9]{1,64}$';
export const ATC_RESULT_SYSID_PATTERN = '^[A-Za-z][A-Za-z0-9]{2}$';
export const ATC_RESULT_USER_PATTERN = '^[A-Za-z0-9_.@$/-]{1,40}$';
export const ATC_RESULT_MAX_AGE_DAYS = 3650;
export const ATC_RESULT_LIST_LIMIT = { default: 50, max: 200 } as const;
export const ATC_RESULT_FINDING_LIMIT = { default: 100, max: 500 } as const;
/** List bodies are small; a central result with many thousand findings can be tens of MiB. */
export const ATC_RESULT_LIST_RESPONSE_BYTES = 2 * 1024 * 1024;
export const ATC_RESULT_DETAIL_RESPONSE_BYTES = 8 * 1024 * 1024;
const RAW_FIELD_LIMIT = 40;
const RAW_VALUE_LIMIT = 200;

export interface AtcResultListQuery {
  scope: AtcResultScope;
  sysId?: string;
  contactPerson?: string;
  createdBy?: string;
  minAgeDays?: number;
  maxAgeDays?: number;
}

export interface AtcResultHeader {
  displayId: string | null;
  title: string | null;
  checkVariant: string | null;
  runSeries: string | null;
  createdAt: string | null;
  createdBy: string | null;
  systemId: string | null;
  isActive: boolean | null;
  isCentral: boolean | null;
  objectCount: number | null;
  findingCount: number | null;
  /** Every scalar field SAP returned (elements and attributes, prefix-free), bounded. */
  fields: Record<string, string>;
}

export interface AtcResultFinding extends Omit<AtcFinding, 'object'> {
  object: { type: string; name: string; uri: string };
  checkId?: string;
  messageId?: string;
  exemptionKind?: string;
  exemptionApproval?: string;
}

export interface AtcResultDetail {
  header: AtcResultHeader;
  objects: { type: string; name: string; uri: string; packageName?: string; findingCount: number }[];
  findings: AtcResultFinding[];
  complete: boolean;
  incompleteReasons: string[];
}

const HEADER_KEYS: Record<Exclude<keyof AtcResultHeader, 'fields'>, readonly string[]> = {
  displayId: ['displayId', 'displayID', 'id'],
  title: ['title', 'description'],
  checkVariant: ['checkVariant', 'checkVariantName', 'chkProfileName'],
  runSeries: ['runSeries', 'runSeriesName', 'seriesName', 'series'],
  createdAt: ['createdAt', 'creationTime', 'scheduledOn', 'timestamp', 'createdOn'],
  createdBy: ['createdBy', 'scheduledBy', 'author'],
  systemId: ['sysId', 'systemId', 'sid', 'system'],
  isActive: ['isActive', 'active', 'activeResult'],
  isCentral: ['isCentral', 'central', 'centralResult'],
  objectCount: ['objectCount', 'numberOfObjects', 'objectsCount'],
  findingCount: ['findingCount', 'numberOfFindings', 'findingsCount'],
};

function invalid(message: string): never {
  throw new AdtApiError(message, 400, ATC_RESULTS_PATH);
}

function checkPattern(value: string | undefined, pattern: string, label: string): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  if (!new RegExp(pattern).test(trimmed)) invalid(`ATC result ${label} has an invalid format.`);
  return trimmed;
}

function checkAge(value: number | undefined, label: string): number | undefined {
  if (value === undefined) return undefined;
  if (!Number.isInteger(value) || value < 0 || value > ATC_RESULT_MAX_AGE_DAYS)
    invalid(`ATC result ${label} must be an integer 0..${ATC_RESULT_MAX_AGE_DAYS}.`);
  return value;
}

/**
 * Map a list query onto exactly one discovery template. Inputs a template does not carry are
 * refused rather than silently dropped (SAP would ignore them and return an unfiltered list).
 */
export function buildAtcResultListPath(query: AtcResultListQuery): string {
  const sysId = checkPattern(query.sysId, ATC_RESULT_SYSID_PATTERN, 'sysId')?.toUpperCase();
  const contactPerson = checkPattern(query.contactPerson, ATC_RESULT_USER_PATTERN, 'contactPerson')?.toUpperCase();
  const createdBy = checkPattern(query.createdBy, ATC_RESULT_USER_PATTERN, 'createdBy')?.toUpperCase();
  const ageMin = checkAge(query.minAgeDays, 'minAgeDays');
  const ageMax = checkAge(query.maxAgeDays, 'maxAgeDays');
  if (ageMin !== undefined && ageMax !== undefined && ageMin > ageMax)
    invalid('minAgeDays must not exceed maxAgeDays.');
  const params: [string, string | number | undefined][] = [];
  switch (query.scope) {
    case 'active':
      if (createdBy !== undefined || ageMin !== undefined || ageMax !== undefined)
        invalid('scope "active" supports only sysId and contactPerson filters.');
      params.push(['activeResult', 'true'], ['contactPerson', contactPerson], ['sysId', sysId]);
      break;
    case 'central':
      params.push(
        ['centralResult', 'true'],
        ['createdBy', createdBy],
        ['contactPerson', contactPerson],
        ['ageMin', ageMin],
        ['ageMax', ageMax],
        ['sysId', sysId],
      );
      break;
    case 'user':
      if (createdBy === undefined) invalid('scope "user" requires the creating user (user).');
      if (sysId !== undefined) invalid('scope "user" has no sysId filter; use scope "active" or "central".');
      params.push(['createdBy', createdBy], ['ageMin', ageMin], ['ageMax', ageMax], ['contactPerson', contactPerson]);
      break;
    default:
      invalid('Unknown ATC result scope.');
  }
  const search = params
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
  return `${ATC_RESULTS_PATH}?${search}`;
}

function scalarText(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value).trim();
  const record = nodeRecords(value)[0];
  if (record && Object.keys(record).every((key) => key === '#text' || key.startsWith('@_'))) {
    const text = nodeText(record);
    return text || undefined;
  }
  return undefined;
}

function rawFields(record: Record<string, unknown>): Record<string, string> {
  const fields: Record<string, string> = {};
  const entries = [
    ...Object.entries(record).filter(([key]) => !key.startsWith('@_') && key !== '#text'),
    ...Object.entries(record)
      .filter(([key]) => key.startsWith('@_'))
      .map(([key, value]) => [key.slice(2), value] as const),
  ];
  for (const [key, value] of entries) {
    if (Object.keys(fields).length >= RAW_FIELD_LIMIT) break;
    if (Object.hasOwn(fields, key)) continue;
    const text = scalarText(value);
    if (text !== undefined) fields[key] = text.slice(0, RAW_VALUE_LIMIT);
  }
  return fields;
}

function pick(fields: Record<string, string>, keys: readonly string[]): string | null {
  for (const key of keys) {
    const match = Object.keys(fields).find((candidate) => candidate.toLowerCase() === key.toLowerCase());
    if (match && fields[match]) return fields[match]!;
  }
  return null;
}

function flag(value: string | null): boolean | null {
  if (value === null) return null;
  if (/^(true|x|1|yes)$/i.test(value)) return true;
  if (/^(false|-|0|no|)$/i.test(value)) return false;
  return null;
}

function count(value: string | null): number | null {
  if (value === null || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function parseAtcResultHeader(record: Record<string, unknown>): AtcResultHeader {
  const fields = rawFields(record);
  return {
    displayId: pick(fields, HEADER_KEYS.displayId),
    title: pick(fields, HEADER_KEYS.title),
    checkVariant: pick(fields, HEADER_KEYS.checkVariant),
    runSeries: pick(fields, HEADER_KEYS.runSeries),
    createdAt: pick(fields, HEADER_KEYS.createdAt),
    createdBy: pick(fields, HEADER_KEYS.createdBy),
    systemId: pick(fields, HEADER_KEYS.systemId),
    isActive: flag(pick(fields, HEADER_KEYS.isActive)),
    isCentral: flag(pick(fields, HEADER_KEYS.isCentral)),
    objectCount: count(pick(fields, HEADER_KEYS.objectCount)),
    findingCount: count(pick(fields, HEADER_KEYS.findingCount)),
    fields,
  };
}

/** `resultList > result*`, or a bare `result` root; anything else is an unrecognized shape. */
function resultRecords(xml: string): { records: Record<string, unknown>[]; recognized: boolean } {
  const parsed = parseXml(xml);
  const list = nodeRecords(parsed.resultList ?? parsed.results);
  if (list.length === 1) return { records: nodeRecords(list[0]!.result), recognized: true };
  const single = nodeRecords(parsed.result);
  if (single.length > 0 && nodeValues(parsed.result).length === single.length)
    return { records: single, recognized: true };
  return { records: [], recognized: false };
}

export function parseAtcResultList(xml: string): { entries: AtcResultHeader[]; recognized: boolean } {
  if (!xml.trim()) return { entries: [], recognized: true };
  const { records, recognized } = resultRecords(xml);
  return { entries: records.map(parseAtcResultHeader), recognized };
}

function stringAttr(record: Record<string, unknown>, key: string): string {
  const value = record[`@_${key}`];
  return typeof value === 'string' ? value.trim() : '';
}

export function parseAtcResultDetail(xml: string, requestedId: string): AtcResultDetail {
  const reasons: string[] = [];
  const { records, recognized } = resultRecords(xml);
  if (!recognized || records.length !== 1) reasons.push('SAP did not return exactly one ATC result.');
  const record = records.length === 1 ? records[0]! : {};
  const header = parseAtcResultHeader(record);
  if (!header.displayId) reasons.push('SAP did not echo the result display id.');
  else if (header.displayId.toUpperCase() !== requestedId.toUpperCase())
    reasons.push('SAP returned a different result display id.');
  // `<objects/>` parses to '' (a present, empty container); absence stays unproven, never clean.
  const containerCount = nodeValues(record.objects).length;
  const containers = nodeRecords(record.objects);
  if (containerCount > 1) reasons.push('SAP returned more than one ATC objects container.');
  if (containerCount === 0 && header.objectCount !== 0) reasons.push('SAP did not provide an ATC objects container.');
  const objectRows = containerCount === 1 && containers.length === 1 ? nodeRecords(containers[0]!.object) : [];
  const objects: AtcResultDetail['objects'] = [];
  const findings: AtcResultFinding[] = [];
  let malformedObjects = 0;
  for (const row of objectRows) {
    const identity = { type: stringAttr(row, 'type'), name: stringAttr(row, 'name'), uri: stringAttr(row, 'uri') };
    const rows = nodeRecords(row.findings).flatMap((container) => nodeRecords(container.finding));
    if (
      !identity.type ||
      !identity.name ||
      !canonicalHostRelativeAdtPath(identity.uri, '/sap/bc/adt/', { allowRawEncodedSlash: true })
    ) {
      malformedObjects += 1;
      continue;
    }
    const packageName = stringAttr(row, 'packageName');
    objects.push({ ...identity, ...(packageName ? { packageName } : {}), findingCount: rows.length });
    for (const finding of rows) {
      const parsed = parseAtcFinding(finding);
      const extra: Partial<AtcResultFinding> = {};
      for (const key of ['checkId', 'messageId', 'exemptionKind', 'exemptionApproval'] as const) {
        const value = stringAttr(finding, key);
        if (value && value !== '-') extra[key] = value;
      }
      findings.push({ ...parsed, ...extra, object: identity });
    }
  }
  if (malformedObjects > 0) reasons.push(`${malformedObjects} malformed ATC object row(s) were ignored.`);
  const invalidPriorities = findings.filter((f) => !Number.isInteger(f.priority) || f.priority <= 0).length;
  if (invalidPriorities > 0) reasons.push(`${invalidPriorities} ATC finding(s) had a missing or malformed priority.`);
  if (header.objectCount !== null && header.objectCount !== objects.length + malformedObjects)
    reasons.push(`SAP announced ${header.objectCount} object(s) but returned ${objects.length + malformedObjects}.`);
  return { header, objects, findings, complete: reasons.length === 0, incompleteReasons: reasons };
}

function boundedRequest(limitBytes: number, family: string, options?: AdtRequestOptions): AdtRequestOptions {
  return { ...options, responseBudget: new DataResponseBudget(limitBytes, family) };
}

function assertBodyWithin(body: string, limitBytes: number, family: string): void {
  // Mirrors the streaming budget for transports that buffer (and for mocked transports).
  new DataResponseBudget(limitBytes, family).assertSingleResponseBytes(Buffer.byteLength(body));
}

/** List persisted ATC result sets for one discovery template. */
export async function listAtcResults(
  http: AdtHttpClient,
  safety: SafetyConfig,
  query: AtcResultListQuery,
  options?: AdtRequestOptions,
): Promise<{ path: string; entries: AtcResultHeader[]; recognized: boolean }> {
  checkOperation(safety, OperationType.Read, 'ListAtcResults');
  const path = buildAtcResultListPath(query);
  const response = await http.get(
    path,
    { Accept: 'application/xml' },
    boundedRequest(ATC_RESULT_LIST_RESPONSE_BYTES, 'atc-results', options),
  );
  assertBodyWithin(response.body, ATC_RESULT_LIST_RESPONSE_BYTES, 'atc-results');
  return { path, ...parseAtcResultList(response.body) };
}

/** Read one persisted ATC result set (header + findings) by its display id. */
export async function getAtcResult(
  http: AdtHttpClient,
  safety: SafetyConfig,
  displayId: string,
  query: { contactPerson?: string; includeExempted?: boolean } = {},
  options?: AdtRequestOptions,
): Promise<AtcResultDetail & { path: string }> {
  checkOperation(safety, OperationType.Read, 'GetAtcResult');
  const id = checkPattern(displayId, ATC_RESULT_ID_PATTERN, 'display id')!;
  const contactPerson = checkPattern(query.contactPerson, ATC_RESULT_USER_PATTERN, 'contactPerson')?.toUpperCase();
  const params = [
    ...(contactPerson ? [`contactPerson=${encodeURIComponent(contactPerson)}`] : []),
    ...(query.includeExempted ? ['includeExemptedFindings=true'] : []),
  ];
  const path = `${ATC_RESULTS_PATH}/${encodeURIComponent(id)}${params.length ? `?${params.join('&')}` : ''}`;
  const response = await http.get(
    path,
    { Accept: 'application/xml' },
    boundedRequest(ATC_RESULT_DETAIL_RESPONSE_BYTES, 'atc-result', options),
  );
  assertBodyWithin(response.body, ATC_RESULT_DETAIL_RESPONSE_BYTES, 'atc-result');
  return { path, ...parseAtcResultDetail(response.body, id) };
}
