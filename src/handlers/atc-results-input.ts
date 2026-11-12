/** Input rules for SAPDiagnose atc_results / atc_remote (allowlists mirror the CI actions). */
import type { z } from 'zod';
import { ATC_BATCH_TYPES } from '../adt/atc-batch.js';
import { ATC_RESULT_FINDING_LIMIT, ATC_RESULT_ID_PATTERN, ATC_RESULT_LIST_LIMIT } from '../adt/atc-results.js';

interface AtcResultActionInput {
  action: string;
  id?: string;
  user?: string;
  variant?: string;
  maxResults?: number;
  name?: string;
  type?: string;
  objects?: unknown[];
  atcResult?: {
    scope?: string;
    sysId?: string;
    minAgeDays?: number;
    maxAgeDays?: number;
    title?: string;
    objectName?: string;
    includeExempted?: boolean;
  };
  [key: string]: unknown;
}

const ALLOWED: Record<string, ReadonlySet<string>> = {
  atc_results: new Set(['action', 'id', 'user', 'variant', 'maxResults', 'atcResult']),
  atc_remote: new Set(['action', 'name', 'type', 'objects', 'variant', 'timeoutSeconds']),
};

/** Strict clients fill unrelated optional fields with harmless defaults; those are not real inputs. */
function isFiller(value: unknown): boolean {
  return value === undefined || value === false || (Array.isArray(value) && value.length === 0);
}

export function validateAtcResultActions(input: AtcResultActionInput, ctx: z.RefinementCtx): void {
  const issue = (path: string, message: string) => ctx.addIssue({ code: 'custom', path: [path], message });
  const allowed = ALLOWED[input.action];
  if (!allowed) {
    if (input.atcResult !== undefined) issue('atcResult', 'atcResult is only supported for atc_results.');
    return;
  }
  for (const [key, value] of Object.entries(input))
    if (!allowed.has(key) && !isFiller(value)) issue(key, `${key} is not supported for ${input.action}.`);

  if (input.action === 'atc_remote') {
    if (!input.variant?.trim() || input.variant.length > 128)
      issue(
        'variant',
        'atc_remote requires the explicit check variant (1..128 characters), e.g. the local reference variant.',
      );
    const single = input.name !== undefined || input.type !== undefined;
    if (input.objects !== undefined ? single : !(input.name && input.type))
      issue('objects', 'atc_remote needs either objects[] or name+type, not both.');
    const baseType = input.type?.toUpperCase().split('/')[0];
    if (input.objects === undefined && baseType && !(ATC_BATCH_TYPES as readonly string[]).includes(baseType))
      issue('type', `atc_remote supports ${ATC_BATCH_TYPES.join(', ')}.`);
    return;
  }

  const options = input.atcResult ?? {};
  const detail = input.id !== undefined;
  const limit = detail ? ATC_RESULT_FINDING_LIMIT.max : ATC_RESULT_LIST_LIMIT.max;
  if (detail && !new RegExp(ATC_RESULT_ID_PATTERN).test(input.id!))
    issue('id', 'atc_results id must be the result display id (1..64 letters/digits).');
  if (
    input.maxResults !== undefined &&
    (!Number.isInteger(input.maxResults) || input.maxResults < 1 || input.maxResults > limit)
  )
    issue('maxResults', `atc_results maxResults must be 1..${limit}.`);
  const listOnly = {
    scope: options.scope,
    sysId: options.sysId,
    minAgeDays: options.minAgeDays,
    maxAgeDays: options.maxAgeDays,
    title: options.title,
    user: input.user,
    variant: input.variant,
  };
  const detailOnly = { objectName: options.objectName, includeExempted: options.includeExempted };
  for (const [key, value] of Object.entries(detail ? listOnly : detailOnly))
    if (value !== undefined && value !== false)
      issue(key, detail ? `${key} filters the result list; omit id to use it.` : `${key} requires id (one result).`);
  if (detail) return;
  const scope = options.scope ?? 'active';
  if (
    scope === 'active' &&
    (input.user !== undefined || options.minAgeDays !== undefined || options.maxAgeDays !== undefined)
  )
    issue(
      'atcResult',
      'scope "active" supports only sysId and contactPerson; use scope "central" or "user" for creator/age filters.',
    );
  if (scope === 'user' && !input.user) issue('user', 'scope "user" requires user (the creator of the results).');
  if (scope === 'user' && options.sysId !== undefined) issue('atcResult', 'scope "user" has no sysId filter.');
  if (options.minAgeDays !== undefined && options.maxAgeDays !== undefined && options.minAgeDays > options.maxAgeDays)
    issue('atcResult', 'minAgeDays must not exceed maxAgeDays.');
}
