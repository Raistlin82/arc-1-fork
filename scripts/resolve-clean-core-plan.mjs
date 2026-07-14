#!/usr/bin/env node

import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { run } from '../skills/sap-erp-clean-core-refactor/runtime/resolve-plan.mjs';

export { run };

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
