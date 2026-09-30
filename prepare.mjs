#!/usr/bin/env node
/**
 * npm runs `prepare` on `npm install` in a clone, when it installs ARC-1 straight from git,
 * and while the Cloud Foundry buildpack installs the MTA payload. Keep this file at the package
 * root: deployment intentionally excludes the rest of `scripts/`, but npm must still be able to
 * resolve the lifecycle hook from the packaged application.
 *
 * A git dependency ships only what `prepare` leaves behind, and `bin/arc1.js` loads `dist/`, so
 * this builds `dist/` when it is missing. It never fails an install for what it cannot do there:
 * no sources yet (the Docker layer that installs only package.json), no TypeScript (an install
 * without dev dependencies), or `dist/` already built. Plain Node, so it runs the same under
 * cmd.exe, PowerShell and sh.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// the git hooks of the contributors: only in a working tree, and only when husky is installed
if (existsSync('.git') && existsSync('node_modules/husky')) {
  try {
    execSync('husky', { stdio: 'ignore' });
  } catch {
    // not a tree husky can configure: nothing to set up
  }
}

const sources = existsSync('tsconfig.json') && existsSync('src');
const typescript = existsSync('node_modules/typescript');
if (!existsSync('dist/cli.js') && sources && typescript) execSync('npm run build', { stdio: 'inherit' });
