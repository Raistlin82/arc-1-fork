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
  const rawFacts = factsPath === '-' ? (stdin ?? readFileSync(0, 'utf8')) : readFileSync(factsPath, 'utf8');
  const chain = JSON.parse(readFileSync(fileURLToPath(new URL('chain.json', skillDir)), 'utf8'));
  const aemModel = JSON.parse(readFileSync(fileURLToPath(new URL('aem-model.json', skillDir)), 'utf8'));
  const result = resolveCleanCorePlan(chain, aemModel, JSON.parse(rawFacts));
  return { output: JSON.stringify(result, null, argv.includes('--compact') ? 0 : 2), exitCode: 0 };
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const result = run(process.argv.slice(2));
    process.stdout.write(`${result.output}\n`);
    process.exitCode = result.exitCode;
  } catch (error) {
    process.stderr.write(`clean-core:resolve: ${error.message}\n`);
    process.exitCode = 1;
  }
}
