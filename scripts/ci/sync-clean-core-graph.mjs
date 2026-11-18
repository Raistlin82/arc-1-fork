#!/usr/bin/env node
/**
 * Download the pinned Clean Core knowledge graph into the sap-erp-clean-core-refactor skill.
 *
 * The graph is not vendored: `knowledge/clean-core-extensibility/UPSTREAM.json` pins one commit of
 * Raistlin82/sap-clean-core-expert plus the sha256 and size of every file, and this script fetches
 * exactly those bytes from raw.githubusercontent.com at that commit. It is data only: nothing
 * downloaded is ever executed.
 *
 *   node scripts/ci/sync-clean-core-graph.mjs            # best effort (npm run build, prepare, npx github:)
 *   node scripts/ci/sync-clean-core-graph.mjs --require  # fail closed (CI, npm run clean-core:graph-sync)
 *   node scripts/ci/sync-clean-core-graph.mjs --pack     # prepack: fail closed under npm pack / npm publish
 *   node scripts/ci/sync-clean-core-graph.mjs --check    # offline: fail unless every file matches its pin
 *
 * Integrity never depends on the mode: bytes are written only after their size and sha256 match the
 * pin, and a local file that differs from the pin is removed before the download, so a stale or
 * tampered graph is never left behind. The mode only decides the exit code when the graph cannot be
 * obtained (no network, proxy refusal, HTTP error, mismatch):
 * - best effort: one line on stderr and exit 0. Installing or building ARC-1 from git must never fail
 *   for this, because the MCP server does not read the graph; only the skill does.
 * - --require, --check, and --pack under `npm pack` / `npm publish`: exit 1, so CI and a published
 *   package can never go without the graph. (`--pack` stays best effort when npm runs prepack while
 *   installing a git dependency, where `npm_command` is not pack or publish.)
 * Without UPSTREAM.json (for example the Docker build stage, which copies only src/) there is nothing
 * to sync and the script exits 0 with a notice.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const KNOWLEDGE_DIR = join('skills', 'sap-erp-clean-core-refactor', 'knowledge', 'clean-core-extensibility');
export const MANIFEST = join(KNOWLEDGE_DIR, 'UPSTREAM.json');
export const RAW_ORIGIN = 'https://raw.githubusercontent.com';
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
const TIMEOUT_MS = 60_000;
const SYNC_HINT = 'Run `npm run clean-core:graph-sync` with access to raw.githubusercontent.com.';

export class GraphSyncError extends Error {}

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function safeRelativePath(value, what) {
  if (typeof value !== 'string' || !value || isAbsolute(value) || value.includes('\\')) {
    throw new GraphSyncError(`${MANIFEST}: ${what} must be a relative POSIX path, got ${JSON.stringify(value)}`);
  }
  if (value.split('/').some((part) => part === '' || part === '.' || part === '..')) {
    throw new GraphSyncError(`${MANIFEST}: ${what} must not contain empty, "." or ".." segments: ${value}`);
  }
  if (!/^[A-Za-z0-9._/-]+$/.test(value)) {
    throw new GraphSyncError(`${MANIFEST}: ${what} has unexpected characters: ${value}`);
  }
  return value;
}

/** Parse and validate UPSTREAM.json; returns undefined when the manifest is absent. */
export function loadManifest(root = process.cwd()) {
  const path = join(root, MANIFEST);
  if (!existsSync(path)) return undefined;
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new GraphSyncError(`${MANIFEST} is not valid JSON: ${error.message}`);
  }
  if (!/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(manifest.repository ?? '')) {
    throw new GraphSyncError(`${MANIFEST}: repository must be "owner/name"`);
  }
  if (!/^[0-9a-f]{40}$/.test(manifest.commit ?? '')) {
    throw new GraphSyncError(`${MANIFEST}: commit must be a full 40-hex commit SHA (never a branch or tag)`);
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw new GraphSyncError(`${MANIFEST}: files[] must list at least one file`);
  }
  const base = resolve(root, KNOWLEDGE_DIR);
  const targets = new Set();
  const files = manifest.files.map((file, index) => {
    const source = safeRelativePath(file.source, `files[${index}].source`);
    const target = safeRelativePath(file.target, `files[${index}].target`);
    const destination = resolve(base, target);
    if (!destination.startsWith(base + sep)) {
      throw new GraphSyncError(`${MANIFEST}: files[${index}].target escapes the knowledge directory`);
    }
    if (target === 'UPSTREAM.json' || targets.has(target)) {
      throw new GraphSyncError(`${MANIFEST}: files[${index}].target is reserved or duplicated: ${target}`);
    }
    targets.add(target);
    if (!/^[0-9a-f]{64}$/.test(file.sha256 ?? '')) {
      throw new GraphSyncError(`${MANIFEST}: files[${index}].sha256 must be 64 lowercase hex characters`);
    }
    if (!Number.isInteger(file.bytes) || file.bytes <= 0 || file.bytes > MAX_FILE_BYTES) {
      throw new GraphSyncError(`${MANIFEST}: files[${index}].bytes must be an integer in 1..${MAX_FILE_BYTES}`);
    }
    return {
      source,
      target,
      destination,
      sha256: file.sha256,
      bytes: file.bytes,
      url: `${RAW_ORIGIN}/${manifest.repository}/${manifest.commit}/${source}`,
    };
  });
  return { ...manifest, files };
}

/** Offline state of one pinned file: 'ok', 'missing' or 'mismatch'. */
export function fileState(file) {
  if (!existsSync(file.destination)) return 'missing';
  const bytes = readFileSync(file.destination);
  return bytes.length === file.bytes && sha256(bytes) === file.sha256 ? 'ok' : 'mismatch';
}

async function defaultFetch() {
  try {
    // Built-in fetch ignores HTTPS_PROXY; undici's EnvHttpProxyAgent honours HTTP(S)_PROXY/NO_PROXY.
    const { fetch, EnvHttpProxyAgent } = await import('undici');
    const dispatcher = new EnvHttpProxyAgent();
    return (url, init) => fetch(url, { ...init, dispatcher });
  } catch {
    return globalThis.fetch;
  }
}

async function download(file, fetchImpl) {
  let response;
  try {
    response = await fetchImpl(file.url, { redirect: 'error', signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch (error) {
    throw new GraphSyncError(
      `Cannot download ${file.url}: ${error?.cause?.code ?? error?.message ?? error}. ${SYNC_HINT}`,
    );
  }
  if (response.status !== 200) {
    throw new GraphSyncError(`Download of ${file.url} answered HTTP ${response.status}; expected 200. ${SYNC_HINT}`);
  }
  const declared = Number(response.headers?.get?.('content-length') ?? Number.NaN);
  if (Number.isFinite(declared) && declared > MAX_FILE_BYTES) {
    throw new GraphSyncError(`Download of ${file.url} declares ${declared} bytes, above the ${MAX_FILE_BYTES} cap`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > MAX_FILE_BYTES) {
    throw new GraphSyncError(`Download of ${file.url} exceeds the ${MAX_FILE_BYTES}-byte cap`);
  }
  const actual = sha256(bytes);
  if (bytes.length !== file.bytes || actual !== file.sha256) {
    throw new GraphSyncError(
      `Integrity check failed for ${file.target}: got ${bytes.length} bytes sha256 ${actual}, ` +
        `pinned ${file.bytes} bytes sha256 ${file.sha256}. Nothing was written.`,
    );
  }
  return bytes;
}

/**
 * Bring every pinned file to its pinned bytes. Returns a summary; throws GraphSyncError on any failure
 * after removing the files it could not verify, so a stale or tampered graph never ships.
 *
 * @param {{ root?: string, check?: boolean, fetchImpl?: (url: string, init?: object) => Promise<any>,
 *   log?: (line: string) => void }} [options]
 */
export async function syncGraph({ root = process.cwd(), check = false, fetchImpl, log = () => {} } = {}) {
  const manifest = loadManifest(root);
  if (!manifest) return { skipped: true, files: [] };
  const results = [];
  let fetcher = fetchImpl;
  for (const file of manifest.files) {
    const state = fileState(file);
    if (state === 'ok') {
      results.push({ target: file.target, action: 'verified' });
      continue;
    }
    if (check) {
      throw new GraphSyncError(
        `${join(KNOWLEDGE_DIR, file.target)} is ${state === 'missing' ? 'missing' : 'not the pinned version'} ` +
          `(${manifest.repository}@${manifest.commit}). ${SYNC_HINT}`,
      );
    }
    if (state === 'mismatch') rmSync(file.destination, { force: true });
    fetcher ??= await defaultFetch();
    const bytes = await download(file, fetcher);
    mkdirSync(dirname(file.destination), { recursive: true });
    const temporary = `${file.destination}.download-${process.pid}`;
    try {
      writeFileSync(temporary, bytes);
      renameSync(temporary, file.destination);
    } finally {
      rmSync(temporary, { force: true });
    }
    log(`downloaded ${relative(root, file.destination)} (${file.bytes} bytes, sha256 verified)`);
    results.push({ target: file.target, action: 'downloaded' });
  }
  return { skipped: false, repository: manifest.repository, commit: manifest.commit, files: results };
}

const FLAGS = new Set(['--check', '--require', '--pack']);

/**
 * CLI behaviour, exported for tests. Returns the exit code.
 *
 * @param {string[]} argv
 * @param {{ root?: string, env?: Record<string, string | undefined>, fetchImpl?: (url: string, init?: object) => Promise<any>,
 *   stderr?: (line: string) => void }} [options]
 */
export async function runCli(argv, { root = process.cwd(), env = process.env, fetchImpl, stderr = console.error } = {}) {
  const unknown = argv.filter((arg) => !FLAGS.has(arg));
  if (unknown.length) {
    stderr(`sync-clean-core-graph: unknown argument(s) ${unknown.join(' ')} (supported: ${[...FLAGS].join(', ')})`);
    return 2;
  }
  const check = argv.includes('--check');
  const packing = argv.includes('--pack') && ['pack', 'publish'].includes(env.npm_command ?? '');
  const required = check || argv.includes('--require') || packing;
  try {
    const result = await syncGraph({ root, check, fetchImpl, log: (line) => stderr(`sync-clean-core-graph: ${line}`) });
    if (result.skipped) {
      stderr(`sync-clean-core-graph: ${MANIFEST} not present; nothing to sync`);
      return 0;
    }
    stderr(`sync-clean-core-graph: OK — ${result.files.length} file(s) match ${result.repository}@${result.commit.slice(0, 12)}`);
    return 0;
  } catch (error) {
    const reason = String(error instanceof Error ? error.message : error).replace(/\s+/g, ' ').trim();
    if (required) {
      stderr(`sync-clean-core-graph: ${reason}`);
      return 1;
    }
    const short = reason.replace(SYNC_HINT, '').trim().replace(/\.$/, '');
    stderr(`Clean Core graph not fetched: ${short}; the MCP server works without it; run npm run clean-core:graph-sync`);
    return 0;
  }
}

// Run as a CLI whenever this file is the entry point, also through a symlink or another path spelling:
// a silent no-op here would let `npm run build` pass without the graph.
function isEntryPoint() {
  if (!process.argv[1]) return false;
  try {
    const normalize = (path) => (process.platform === 'win32' ? path.toLowerCase() : path);
    return normalize(realpathSync(process.argv[1])) === normalize(realpathSync(fileURLToPath(import.meta.url)));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  process.exitCode = await runCli(process.argv.slice(2));
}
