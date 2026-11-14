#!/usr/bin/env node

import { readFileSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolveUpgradeAssessment } from './resolve-clean-core.mjs';

const skillDir = new URL('../', import.meta.url);

function usage() {
  return `Usage: node runtime/resolve-upgrade.mjs --units <file|-> [--compact]

Repository shortcut: npm run --silent clean-core:upgrade -- --units <file|-> [--compact]

Upgrade mode of the Clean Core chain (chain.json upgradeContract). The input names the release upgrade and the
units with their facts:

  { "upgrade": { "sourceRelease": "S/4HANA 2021", "targetRelease": "S/4HANA 2023", "phase": "before|after",
                 "targetReleaseConfirmed": true, "targetLevel": "A|B" },
    "landscape": "s4_on_premise|s4_private_cloud",
    "units": [{ "type": "CLAS", "name": "ZCL_X", "package": "ZPKG", "facts": { "sourceLevel": "C", ... },
                "evidence": [], "successors": [] }] }

before: ranks the units whose debt costs upgrade effort and resolves each with the existing decisions.
after:  re-reads every unit at B, C or D against the target release and proposes A, B or stay, with the effort band.
The result (kind clean-core-upgrade-assessment) is written to stdout. Use - to read stdin.`;
}

/**
 * @param {string[]} argv
 * @param {string | undefined} stdin
 */
export function run(argv, stdin = undefined) {
  if (argv.includes('--help') || argv.includes('-h')) return { output: usage(), exitCode: 0 };
  const unitsIndex = argv.indexOf('--units');
  if (unitsIndex < 0 || !argv[unitsIndex + 1]) return { output: usage(), exitCode: 1 };

  const unitsPath = argv[unitsIndex + 1];
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
  const raw = unitsPath === '-' ? (stdin ?? readFileSync(0, 'utf8')) : readRequired(unitsPath, 'units file');
  const chain = parseJson(readRequired(fileURLToPath(new URL('chain.json', skillDir)), 'chain.json'), 'chain.json');
  const aemModel = parseJson(
    readRequired(fileURLToPath(new URL('aem-model.json', skillDir)), 'aem-model.json'),
    'aem-model.json',
  );
  const result = resolveUpgradeAssessment(chain, aemModel, parseJson(raw, `units (${unitsPath})`));
  return {
    output: JSON.stringify(result, null, argv.includes('--compact') ? 0 : 2),
    // a refused assessment is a result, not a crash: the caller reads status and conflicts
    exitCode: result.status === 'resolved' ? 0 : 2,
  };
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const result = run(process.argv.slice(2));
    const stream = result.exitCode === 1 ? process.stderr : process.stdout;
    stream.write(`${result.output}\n`);
    process.exitCode = result.exitCode;
  } catch (error) {
    process.stderr.write(`clean-core:upgrade: ${error.message}\n`);
    process.exitCode = 1;
  }
}
