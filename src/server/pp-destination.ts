import type { BTPConfig } from '@arc-mcp/xsuaa-auth/btp';
import type { ServerConfig } from './types.js';

/** Historical single-target dual-destination resolution. */
export function resolvePpDestinationName(config: ServerConfig): string | undefined {
  if (config.destinationName) {
    return config.destinationName;
  }
  return process.env.SAP_BTP_PP_DESTINATION || process.env.SAP_BTP_DESTINATION;
}

/**
 * Load the bound Destination/Connectivity runtime for a single-target PP route.
 *
 * A Public Cloud deployment legitimately configures only SAP_BTP_PP_DESTINATION: there is no
 * shared startup destination and the SAP URL is resolved per user. Keep this decision independent
 * from SAP_BTP_DESTINATION so that strict PP-only profiles can reach the Destination service.
 */
export function resolveSingleTargetPpBtpConfig(
  config: ServerConfig,
  current: BTPConfig | undefined,
  parseVCAPServices: () => BTPConfig | null | undefined,
): BTPConfig | undefined {
  if (current || !config.ppEnabled || !resolvePpDestinationName(config)) return current;
  return parseVCAPServices() ?? undefined;
}
