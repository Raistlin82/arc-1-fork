/** SAPDiagnose shared timeout/variant, package CI and ATC-result input definitions. Consumed by tools.ts and schemas.ts. */
import { z } from 'zod';
import {
  ATC_RESULT_MAX_AGE_DAYS,
  ATC_RESULT_SCOPES,
  ATC_RESULT_SYSID_PATTERN,
  ATC_RESULT_USER_PATTERN,
} from '../adt/atc-results.js';
export const CI_PACKAGES_SCHEMA = z
  .array(
    z
      .string()
      .min(1)
      .max(40)
      .regex(/^[A-Za-z0-9_/$]+$/),
  )
  .max(50);
const packageItem = { type: 'string', minLength: 1, maxLength: 40, pattern: '^[A-Za-z0-9_/$]+$' };
const ageZod = z.coerce.number().int().min(0).max(ATC_RESULT_MAX_AGE_DAYS).optional();
/** atc_results options (one described object keeps SAPDiagnose small); pass schemas.ts' looseOptionalBoolean. */
export const atcResultInputSchema = (looseBoolean: z.ZodType<boolean | undefined>) =>
  z
    .object({
      scope: z.enum(ATC_RESULT_SCOPES).optional(),
      sysId: z.string().regex(new RegExp(ATC_RESULT_SYSID_PATTERN)).optional(),
      contactPerson: z.string().regex(new RegExp(ATC_RESULT_USER_PATTERN)).optional(),
      minAgeDays: ageZod,
      maxAgeDays: ageZod,
      title: z.string().min(1).max(120).optional(),
      objectName: z.string().min(1).max(40).optional(),
      offset: z.coerce.number().int().min(0).max(1_000_000).optional(),
      includeExempted: looseBoolean,
    })
    .strict();
export const SAPDIAGNOSE_ADDITIONAL_INPUTS = {
  variant: {
    type: 'string',
    description: 'atc/atc_ci variant; atc_variants name filter (*=all)',
  },

  timeoutSeconds: {
    type: 'number',
    description: 'Timeout 1–3600s: unittest/atc default 300; CI overall default 600.',
  },

  packages: {
    type: 'array',
    maxItems: 50,
    items: packageItem,
    description: 'CI exact packages; 1–50 total with packageTrees.',
  },
  packageTrees: {
    type: 'array',
    maxItems: 50,
    items: packageItem,
    description: 'CI packages including subpackages.',
  },
  configuration: {
    type: 'string',
    minLength: 1,
    maxLength: 128,
    description: 'atc_ci: optional configuration.',
  },
  failOnSeverity: {
    type: 'string',
    enum: ['error', 'warning', 'info'],
    description: 'atc_ci failure threshold (default error).',
  },
  includeReportXml: {
    type: 'boolean',
    description: 'CI XML reports (default false; 256 KiB total cap).',
  },
  atcResult: {
    type: 'object',
    description:
      'atc_results list: scope active|central|user(+user), sysId, contactPerson, minAgeDays, maxAgeDays, title, variant; id: objectName, offset, includeExempted.',
  },
};
