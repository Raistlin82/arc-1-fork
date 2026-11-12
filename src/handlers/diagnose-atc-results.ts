/**
 * SAPDiagnose `atc_results` (persisted ATC result sets) and `atc_remote` (developer-scenario ATC run
 * with persisted-result read-back). Both are read scope; see docs/plans/2026-11-12-atc-results-remote.md.
 */
import { type AtcBatchObject, atcDdicObjectUrl, runAtcBatch } from '../adt/atc-batch.js';
import {
  ATC_REMOTE_COLLECTIONS,
  ATC_RESULT_FINDING_LIMIT,
  ATC_RESULT_LIST_LIMIT,
  ATC_RESULTS_PATH,
  type AtcResultHeader,
  type AtcResultScope,
  getAtcResult,
  listAtcResults,
} from '../adt/atc-results.js';
import type { AdtClient } from '../adt/client.js';
import { fetchDiscoveryDocument } from '../adt/discovery.js';
import { AdtApiError, AdtResponseLimitError } from '../adt/errors.js';
import { checkOperation, OperationType } from '../adt/safety.js';
import { getCurrentContext } from '../server/context.js';
import { getCachedDiscovery, getCachedFeatures } from './feature-cache.js';
import { objectUrlForType } from './object-types.js';
import { errorResult, type ToolResult, textResult, toolJson } from './shared.js';

export interface AtcResultOptions {
  scope?: AtcResultScope;
  sysId?: string;
  contactPerson?: string;
  minAgeDays?: number;
  maxAgeDays?: number;
  title?: string;
  objectName?: string;
  offset?: number;
  includeExempted?: boolean;
}

const RESIDUAL_GAP =
  'ADT has no resource to start an ATC run series or to select an object provider/RFC destination. ' +
  'On the central check system an ATC administrator schedules the run series once in transaction ATC ' +
  '(Schedule Runs; "Execute in Background" for periodic runs); read its results with ' +
  'SAPDiagnose(action="atc_results", atcResult={scope:"central", sysId:"<checked SID>"}).';

type Presence = Map<string, boolean> | undefined;

/** Discovery presence of the ATC collections; undefined when no discovery evidence exists. */
async function atcCollectionPresence(client: AdtClient, fetchWhenUnknown: boolean): Promise<Presence> {
  let map: ReadonlyMap<string, string[]> | undefined = getCachedFeatures()?.discoveryMap ?? getCachedDiscovery();
  if ((!map || map.size === 0) && fetchWhenUnknown) {
    checkOperation(client.safety, OperationType.Read, 'AtcDiscovery');
    map = (await fetchDiscoveryDocument(client.http)).map;
  }
  if (!map || map.size === 0) return undefined;
  return new Map(ATC_REMOTE_COLLECTIONS.map((path) => [path, map!.has(path)]));
}

function pageOf<T>(items: readonly T[], offset: number, limit: number) {
  const page = items.slice(offset, offset + limit);
  return {
    items: page,
    page: {
      offset,
      limit,
      returned: page.length,
      total: items.length,
      nextOffset: offset + page.length < items.length ? offset + page.length : null,
    },
  };
}

function wildcardMatch(value: string | null, pattern: string | undefined): boolean {
  if (!pattern || pattern === '*') return true;
  if (value === null) return false;
  const upper = pattern.trim().toUpperCase();
  return upper.endsWith('*') ? value.toUpperCase().startsWith(upper.slice(0, -1)) : value.toUpperCase() === upper;
}

function compactHeader(header: AtcResultHeader, includeFields: boolean) {
  const { fields, ...known } = header;
  const present = Object.fromEntries(Object.entries(known).filter(([, value]) => value !== null));
  return includeFields || header.displayId === null ? { ...present, fields } : present;
}

function capabilityError(message: string): ToolResult {
  return errorResult(toolJson({ capability: 'unavailable', message }));
}

function responseLimitResult(error: AdtResponseLimitError): ToolResult {
  return errorResult(
    toolJson({
      complete: false,
      error: `The ATC result response exceeded ARC-1's ${error.limitBytes}-byte limit; nothing was truncated silently.`,
      hint: 'Narrow it server-side with atcResult.contactPerson, or review the result in transaction ATC / the ADT ATC Result Browser.',
    }),
  );
}

async function handleAtcResults(client: AdtClient, args: Record<string, unknown>): Promise<ToolResult> {
  const options = (args.atcResult ?? {}) as AtcResultOptions;
  const signal = getCurrentContext()?.signal;
  const presence = await atcCollectionPresence(client, false);
  if (presence?.get(ATC_RESULTS_PATH) === false)
    return capabilityError(
      `This system's ADT discovery does not list ${ATC_RESULTS_PATH}; persisted ATC results cannot be read through ADT here.`,
    );
  const offset = options.offset ?? 0;
  try {
    if (typeof args.id === 'string') {
      const limit = Math.min(Number(args.maxResults ?? ATC_RESULT_FINDING_LIMIT.default), ATC_RESULT_FINDING_LIMIT.max);
      const detail = await getAtcResult(
        client.http,
        client.safety,
        args.id,
        { contactPerson: options.contactPerson, includeExempted: options.includeExempted === true },
        { signal },
      );
      const objectName = options.objectName?.trim().toUpperCase();
      const selected = objectName
        ? detail.findings.filter((finding) => finding.object.name.toUpperCase() === objectName)
        : detail.findings;
      const { items, page } = pageOf(selected, offset, limit);
      const payload = {
        displayId: detail.header.displayId ?? args.id,
        complete: detail.complete,
        incompleteReasons: detail.incompleteReasons,
        evidence: {
          checkVariant: detail.header.checkVariant,
          createdAt: detail.header.createdAt,
          objectCount: detail.objects.length,
          objectsWithFindings: detail.objects.filter((object) => object.findingCount > 0).length,
          findingCount: detail.findings.length,
          includeExempted: options.includeExempted === true,
        },
        header: compactHeader(detail.header, true),
        ...(objectName ? { objectName } : {}),
        findings: items,
        page,
      };
      return detail.complete ? textResult(toolJson(payload)) : errorResult(toolJson(payload));
    }
    const limit = Math.min(Number(args.maxResults ?? ATC_RESULT_LIST_LIMIT.default), ATC_RESULT_LIST_LIMIT.max);
    const scope = options.scope ?? 'active';
    const list = await listAtcResults(
      client.http,
      client.safety,
      {
        scope,
        sysId: options.sysId,
        contactPerson: options.contactPerson,
        createdBy: args.user as string | undefined,
        minAgeDays: options.minAgeDays,
        maxAgeDays: options.maxAgeDays,
      },
      { signal },
    );
    const title = options.title?.trim().toLowerCase();
    const filtered = list.entries.filter(
      (entry) =>
        wildcardMatch(entry.checkVariant, args.variant as string | undefined) &&
        (!title || `${entry.title ?? ''} ${entry.runSeries ?? ''}`.toLowerCase().includes(title)),
    );
    const { items, page } = pageOf(filtered, offset, limit);
    const payload = {
      scope,
      request: list.path,
      recognizedShape: list.recognized,
      sapCount: list.entries.length,
      results: items.map((entry) => compactHeader(entry, false)),
      page,
      next: 'Read one result with id=<displayId>.',
    };
    return list.recognized ? textResult(toolJson(payload)) : errorResult(toolJson(payload));
  } catch (error) {
    if (error instanceof AdtResponseLimitError) return responseLimitResult(error);
    if (error instanceof AdtApiError && (error.statusCode === 404 || error.statusCode === 405) && !presence)
      return capabilityError(
        `SAP answered ${error.statusCode} for ${ATC_RESULTS_PATH}; this system does not expose persisted ATC results through ADT (or the display id is unknown).`,
      );
    throw error;
  }
}

async function handleAtcRemote(client: AdtClient, args: Record<string, unknown>): Promise<ToolResult> {
  // Fail closed: a delegated run is only offered when discovery positively lists every resource it uses.
  const presence = await atcCollectionPresence(client, true);
  const missing = presence
    ? ATC_REMOTE_COLLECTIONS.filter((path) => presence.get(path) !== true)
    : [...ATC_REMOTE_COLLECTIONS];
  if (missing.length > 0)
    return capabilityError(
      `Remote ATC is not available: ADT discovery ${presence ? 'does not list' : 'could not be read to confirm'} ` +
        `${missing.join(', ')}. ${RESIDUAL_GAP}`,
    );
  const requested = (args.objects as { type: AtcBatchObject['type']; name: string }[] | undefined) ?? [
    { type: args.type as AtcBatchObject['type'], name: String(args.name) },
  ];
  const objects = requested.map((object) => ({
    ...object,
    uri: atcDdicObjectUrl(object.type, object.name) ?? objectUrlForType(object.type, object.name),
  }));
  const signal = getCurrentContext()?.signal;
  const batch = await runAtcBatch(client.http, client.safety, objects, args.variant as string, {
    signal,
    ...(args.timeoutSeconds === undefined ? {} : { timeoutMs: Number(args.timeoutSeconds) * 1000 }),
  });
  const warnings: string[] = [];
  if (batch.variantSource !== 'requested')
    warnings.push('The variant list was unreachable; SAP may have substituted DEFAULT for the requested variant.');
  const persistedResults: Record<string, unknown>[] = [];
  for (const run of batch.runs) {
    if (!run.resultDisplayId) continue;
    try {
      const detail = await getAtcResult(client.http, client.safety, run.resultDisplayId, {}, { signal });
      const variant = detail.header.checkVariant;
      if (variant && batch.variant && variant.toUpperCase() !== batch.variant.toUpperCase())
        warnings.push(
          `Persisted result ${run.resultDisplayId} reports check variant ${variant}, not ${batch.variant}. ` +
            'A local variant that references a central variant may legitimately differ; otherwise SAP substituted it.',
        );
      persistedResults.push({
        worklistId: run.worklistId,
        displayId: run.resultDisplayId,
        complete: detail.complete,
        ...compactHeader(detail.header, false),
      });
    } catch (error) {
      if (!(error instanceof AdtApiError || error instanceof AdtResponseLimitError)) throw error;
      persistedResults.push({
        worklistId: run.worklistId,
        displayId: run.resultDisplayId,
        unavailable: error instanceof AdtApiError ? `HTTP ${error.statusCode}` : 'response too large',
      });
    }
  }
  if (persistedResults.length === 0)
    warnings.push('SAP linked no persisted result; the effective variant is known only from the request.');
  const payload = {
    scenario: 'developer',
    delegation:
      'Runs on the connected system. SAP delegates it to the central check system only when this system is configured as a checked system (SCI reference check system + variant referencing a central variant); ARC-1 cannot observe the delegation.',
    ...batch,
    persistedResults,
    warnings,
    residualGap: RESIDUAL_GAP,
  };
  return batch.complete ? textResult(toolJson(payload)) : errorResult(toolJson(payload));
}

export function handleAtcResultActions(client: AdtClient, args: Record<string, unknown>): Promise<ToolResult> {
  return args.action === 'atc_remote' ? handleAtcRemote(client, args) : handleAtcResults(client, args);
}
