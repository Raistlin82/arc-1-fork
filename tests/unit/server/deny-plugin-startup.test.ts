/**
 * SAP_DENY_ACTIONS may name a plugin tool (Custom_*). Plugins load after the config is parsed, so
 * createAndStartServer checks those names against the loaded plugin tools: a loaded one is accepted,
 * a mistyped or missing one still refuses startup.
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_CONFIG, type ServerConfig } from '../../../src/server/types.js';

vi.mock('../../../src/server/http.js', () => ({
  startHttpServer: vi.fn(async () => ({ close: vi.fn() })),
}));
vi.mock('../../../src/server/shutdown.js', () => ({ registerShutdownHandlers: vi.fn(), closeHttpServer: vi.fn() }));

const { createAndStartServer } = await import('../../../src/server/server.js');
const { logger } = await import('../../../src/server/logger.js');

const BASE: ServerConfig = {
  ...DEFAULT_CONFIG,
  url: 'http://sap:8000',
  transport: 'http-streamable',
  cacheMode: 'none',
};

describe('SAP_DENY_ACTIONS with plugin tools at startup', () => {
  let dir: string;
  let manifest: string;

  beforeEach(() => {
    vi.spyOn(logger, 'info').mockImplementation(() => {});
    vi.spyOn(logger, 'warn').mockImplementation(() => {});
    dir = mkdtempSync(join(tmpdir(), 'arc1-deny-plugin-'));
    manifest = join(dir, 'Custom_DenyLaunchReport.tool.json');
    writeFileSync(
      manifest,
      JSON.stringify({
        name: 'Custom_DenyLaunchReport',
        description: 'manifest read tool',
        scope: 'read',
        inputSchema: { type: 'object', additionalProperties: false, properties: {} },
        request: { method: 'GET', path: '/sap/bc/adt/discovery' },
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(dir, { recursive: true, force: true });
  });

  it('refuses startup when a denied plugin tool is not provided by any plugin', async () => {
    await expect(
      createAndStartServer({ ...BASE, denyActions: ['SAPDiagnose.odata_perf', 'Custom_NotLoaded'] }),
    ).rejects.toThrow(/unknown plugin tool 'Custom_NotLoaded'.*ARC1_PLUGINS loads no plugin tool/);
  });

  it('starts when the denied plugin tool is loaded, and refuses a mistyped one', async () => {
    const startup = await createAndStartServer({
      ...BASE,
      plugins: [manifest],
      denyActions: ['SAPDiagnose.odata_perf', 'Custom_DenyLaunchReport'],
    });
    await startup.close();

    // The registry is process-wide: the plugin is already registered, so the second start skips loading it.
    await expect(createAndStartServer({ ...BASE, denyActions: ['Custom_DenyLaunchReprt'] })).rejects.toThrow(
      /unknown plugin tool 'Custom_DenyLaunchReprt'.*Loaded plugin tools: Custom_DenyLaunchReport/,
    );
  });
});
