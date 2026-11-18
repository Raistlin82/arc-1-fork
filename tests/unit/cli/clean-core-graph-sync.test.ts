import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GraphSyncError,
  KNOWLEDGE_DIR,
  loadManifest,
  MANIFEST,
  runCli,
  syncGraph,
} from '../../../scripts/ci/sync-clean-core-graph.mjs';

const COMMIT = 'a'.repeat(40);
const BODY = Buffer.from('{"graph":{"curation_version":1},"nodes":[],"links":[]}');
const SHA = createHash('sha256').update(BODY).digest('hex');
const SOURCE = 'skills/expert/graphify-out/graph.curated.json';

let root: string;

function writeManifest(overrides: Record<string, unknown> = {}, file: Record<string, unknown> = {}) {
  mkdirSync(join(root, KNOWLEDGE_DIR), { recursive: true });
  const manifest = {
    repository: 'Owner/expert',
    commit: COMMIT,
    files: [{ source: SOURCE, target: 'graphify-out/graph.curated.json', sha256: SHA, bytes: BODY.length, ...file }],
    ...overrides,
  };
  writeFileSync(join(root, MANIFEST), JSON.stringify(manifest));
}

const destination = () => join(root, KNOWLEDGE_DIR, 'graphify-out', 'graph.curated.json');

function response(body: Buffer, status = 200) {
  return {
    status,
    headers: new Headers({ 'content-length': String(body.length) }),
    arrayBuffer: async () => body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength),
  };
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'arc1-graph-sync-'));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('Clean Core graph sync', () => {
  it('skips cleanly when the tree has no UPSTREAM.json (Docker build stage)', async () => {
    expect(loadManifest(root)).toBeUndefined();
    await expect(syncGraph({ root, fetchImpl: vi.fn() })).resolves.toEqual({ skipped: true, files: [] });
  });

  it('runs as a CLI when invoked through a symlinked path, never as a silent no-op', () => {
    const link = join(root, 'linked-ci');
    symlinkSync(resolve('scripts/ci'), link, 'dir');
    const run = spawnSync(process.execPath, [join(link, 'sync-clean-core-graph.mjs'), '--check'], {
      cwd: root,
      encoding: 'utf8',
    });
    expect(run.status).toBe(0);
    expect(run.stderr).toContain('not present; nothing to sync');
  });

  it('downloads the pinned file from the commit URL without following redirects, then verifies offline', async () => {
    writeManifest();
    const fetchImpl = vi.fn(async () => response(BODY));

    const result = await syncGraph({ root, fetchImpl });

    expect(result.files).toEqual([{ target: 'graphify-out/graph.curated.json', action: 'downloaded' }]);
    expect(fetchImpl).toHaveBeenCalledWith(
      `https://raw.githubusercontent.com/Owner/expert/${COMMIT}/${SOURCE}`,
      expect.objectContaining({ redirect: 'error' }),
    );
    expect(readFileSync(destination())).toEqual(BODY);

    const again = vi.fn();
    const second = await syncGraph({ root, fetchImpl: again });
    expect(second.files).toEqual([{ target: 'graphify-out/graph.curated.json', action: 'verified' }]);
    expect(again).not.toHaveBeenCalled();
  });

  it('fails closed on a hash mismatch and writes nothing', async () => {
    writeManifest();
    const fetchImpl = vi.fn(async () => response(Buffer.from('tampered')));

    await expect(syncGraph({ root, fetchImpl })).rejects.toThrow(/Integrity check failed/);
    expect(existsSync(destination())).toBe(false);
  });

  it('removes a stale local copy when the replacement cannot be downloaded', async () => {
    writeManifest();
    mkdirSync(join(root, KNOWLEDGE_DIR, 'graphify-out'), { recursive: true });
    writeFileSync(destination(), 'stale graph');
    const offline = vi.fn(async () => {
      throw Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } });
    });

    await expect(syncGraph({ root, fetchImpl: offline })).rejects.toThrow(
      /Cannot download .*ENOTFOUND.*clean-core:graph-sync/,
    );
    expect(existsSync(destination())).toBe(false);
  });

  it('rejects a non-200 answer', async () => {
    writeManifest();
    await expect(syncGraph({ root, fetchImpl: vi.fn(async () => response(BODY, 404)) })).rejects.toThrow(/HTTP 404/);
  });

  it('never touches the network in --check mode', async () => {
    writeManifest();
    const fetchImpl = vi.fn();
    await expect(syncGraph({ root, check: true, fetchImpl })).rejects.toThrow(/is missing/);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it.each([
    [{ commit: 'main' }, {}, /full 40-hex commit SHA/],
    [{ repository: 'https://evil.example/x' }, {}, /owner\/name/],
    [{}, { target: '../../escape.json' }, /must not contain/],
    [{}, { source: '/etc/passwd' }, /relative POSIX path/],
    [{}, { target: 'UPSTREAM.json' }, /reserved or duplicated/],
    [{}, { sha256: 'abc' }, /64 lowercase hex/],
    [{}, { bytes: 0 }, /bytes must be an integer/],
  ])('rejects an unsafe manifest %#', (overrides, file, message) => {
    writeManifest(overrides, file);
    expect(() => loadManifest(root)).toThrow(GraphSyncError);
    expect(() => loadManifest(root)).toThrow(message);
  });
});

describe('Clean Core graph sync CLI modes', () => {
  const offline = () =>
    vi.fn(async () => {
      throw Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNREFUSED' } });
    });

  async function run(
    argv: string[],
    env: Record<string, string> = {},
    fetchImpl: (url: string, init?: object) => Promise<unknown> = offline(),
  ) {
    const lines: string[] = [];
    const code = await runCli(argv, { root, env, fetchImpl, stderr: (line: string) => lines.push(line) });
    return { code, lines };
  }

  it('never fails a build or git install when the graph cannot be downloaded (one line, exit 0)', async () => {
    writeManifest();
    const { code, lines } = await run([]);
    expect(code).toBe(0);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatch(
      /^Clean Core graph not fetched: Cannot download .*ECONNREFUSED.*; the MCP server works without it; run npm run clean-core:graph-sync$/,
    );
    expect(existsSync(destination())).toBe(false);
  });

  it('stays best effort for prepack during a git-dependency install', async () => {
    writeManifest();
    expect((await run(['--pack'], { npm_command: 'install' })).code).toBe(0);
    expect((await run(['--pack'], { npm_command: 'exec' })).code).toBe(0);
  });

  it('a mismatch in best-effort mode writes nothing and removes the stale copy', async () => {
    writeManifest();
    mkdirSync(join(root, KNOWLEDGE_DIR, 'graphify-out'), { recursive: true });
    writeFileSync(destination(), 'stale graph');
    const { code, lines } = await run(
      [],
      {},
      vi.fn(async () => response(Buffer.from('tampered'))),
    );
    expect(code).toBe(0);
    expect(lines[0]).toMatch(/^Clean Core graph not fetched: Integrity check failed/);
    expect(existsSync(destination())).toBe(false);
  });

  it.each([
    [['--require'], {}],
    [['--check'], {}],
    [['--pack'], { npm_command: 'pack' }],
    [['--pack'], { npm_command: 'publish' }],
  ])('fails closed for %j %j (CI, offline check, npm pack / publish)', async (argv, env) => {
    writeManifest();
    const { code, lines } = await run(argv, env);
    expect(code).toBe(1);
    expect(lines.join('\n')).not.toContain('the MCP server works without it');
    expect(existsSync(destination())).toBe(false);
  });

  it('succeeds in the required mode once the pinned bytes download', async () => {
    writeManifest();
    const { code } = await run(
      ['--require'],
      {},
      vi.fn(async () => response(BODY)),
    );
    expect(code).toBe(0);
    expect(readFileSync(destination())).toEqual(BODY);
  });

  it('rejects unknown arguments', async () => {
    expect((await run(['--force'])).code).toBe(2);
  });
});

describe('Clean Core graph sync wiring', () => {
  it('builds best effort, while the explicit sync, prepack and CI require the graph', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    expect(pkg.scripts.build).toMatch(/node scripts\/ci\/sync-clean-core-graph\.mjs$/);
    expect(pkg.scripts['clean-core:graph-sync']).toBe('node scripts/ci/sync-clean-core-graph.mjs --require');
    expect(pkg.scripts['check:clean-core-graph']).toBe('node scripts/ci/sync-clean-core-graph.mjs --check');
    expect(pkg.scripts.prepack).toBe('node scripts/ci/sync-clean-core-graph.mjs --pack');
    expect(readFileSync('.github/workflows/test.yml', 'utf8')).toContain('run: npm run clean-core:graph-sync');
  });
});
