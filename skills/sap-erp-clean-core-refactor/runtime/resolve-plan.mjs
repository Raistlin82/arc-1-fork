#!/usr/bin/env node

import { readFileSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolveCleanCorePlan } from './resolve-clean-core.mjs';

const skillDir = new URL('../', import.meta.url);

function usage() {
  return `Usage: node runtime/resolve-plan.mjs --facts <file|-> [--compact]

Repository shortcut: npm run --silent clean-core:resolve -- --facts <file|-> [--compact]

Resolve a complete Clean Core plan from structured JSON facts. Use - to read stdin.`;
}

/**
 * @param {string[]} argv
 * @param {string | undefined} stdin
 */
export function run(argv, stdin = undefined) {
  if (argv.includes('--help') || argv.includes('-h')) return { output: usage(), exitCode: 0 };
  const factsIndex = argv.indexOf('--facts');
  if (factsIndex < 0 || !argv[factsIndex + 1]) return { output: usage(), exitCode: 1 };

  const factsPath = argv[factsIndex + 1];
  const parseJson = (raw, label) => {
    try {
      return JSON.parse(raw);
    } catch (error) {
      throw new Error(`${label} is not valid JSON: ${error.message}`);
    }
  };
  const readRequired = (path, label) => {
    try {
      return readFileSync(path, 'utf8');
    } catch (error) {
      throw new Error(`cannot read ${label} (${path}): ${error.message}`);
    }
  };
  const rawFacts =
    factsPath === '-' ? (stdin ?? readFileSync(0, 'utf8')) : readRequired(factsPath, 'facts file');
  const chain = parseJson(readRequired(fileURLToPath(new URL('chain.json', skillDir)), 'chain.json'), 'chain.json');
  const aemModel = parseJson(
    readRequired(fileURLToPath(new URL('aem-model.json', skillDir)), 'aem-model.json'),
    'aem-model.json',
  );
  const result = resolveCleanCorePlan(chain, aemModel, parseJson(rawFacts, `facts (${factsPath})`));
  return { output: JSON.stringify(result, null, argv.includes('--compact') ? 0 : 2), exitCode: 0 };
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const result = run(process.argv.slice(2));
    const stream = result.exitCode === 0 ? process.stdout : process.stderr;
    stream.write(`${result.output}\n`);
    process.exitCode = result.exitCode;
  } catch (error) {
    process.stderr.write(`clean-core:resolve: ${error.message}\n`);
    process.exitCode = 1;
  }
}
