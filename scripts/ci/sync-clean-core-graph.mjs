#!/usr/bin/env node
/**
 * Download the pinned Clean Core knowledge graph into the sap-erp-clean-core-refactor skill.
 *
 * The graph is not vendored: `knowledge/clean-core-extensibility/UPSTREAM.json` pins one commit of
 * Raistlin82/sap-clean-core-expert plus the sha256 and size of every file, and this script fetches
 * exactly those bytes from raw.githubusercontent.com at that commit. It is data only: nothing
 * downloaded is ever executed.
 *
 *   node scripts/ci/sync-clean-core-graph.mjs          # download what is missing or different (npm run build)
 *   node scripts/ci/sync-clean-core-graph.mjs --check  # offline: fail unless every file matches its pin
 *
 * Fail closed: a hash or size mismatch, a redirect, a non-200 answer or no network ends with exit 1
 * and no file left at the destination. Without UPSTREAM.json (for example the Docker build stage,
 * which copies only src/) there is nothing to sync and the script exits 0 with a notice.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export const KNOWLEDGE_DIR = join('skills', 'sap-erp-clean-core-refactor', 'knowledge', 'clean-core-extensibility');
export const MANIFEST = join(KNOWLEDGE_DIR, 'UPSTREAM.json');
export const RAW_ORIGIN = 'https://raw.githubusercontent.com';
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
const TIMEOUT_MS = 60_000;
const SYNC_HINT = 'Run `npm run clean-core:graph-sync` (or `npm run build`) with access to raw.githubusercontent.com.';

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

async function main(argv) {
  const check = argv.includes('--check');
  const unknown = argv.filter((arg) => arg !== '--check');
  if (unknown.length) {
    console.error(`sync-clean-core-graph: unknown argument(s) ${unknown.join(' ')} (only --check is supported)`);
    return 2;
  }
  try {
    const result = await syncGraph({ check, log: (line) => console.error(`sync-clean-core-graph: ${line}`) });
    if (result.skipped) {
      console.error(`sync-clean-core-graph: ${MANIFEST} not present; nothing to sync`);
      return 0;
    }
    console.error(
      `sync-clean-core-graph: OK — ${result.files.length} file(s) match ${result.repository}@${result.commit.slice(0, 12)}`,
    );
    return 0;
  } catch (error) {
    if (!(error instanceof GraphSyncError)) throw error;
    console.error(`sync-clean-core-graph: ${error.message}`);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await main(process.argv.slice(2));
}
