#!/usr/bin/env node
/**
 * Skill → tool-surface staleness guard.
 *
 * The skills/ tree cites ARC-1 tool calls in prose (`SAPDiagnose(action="atc")`,
 * `SAPRead(type="SKTD")`, `SAPLint(format)`). The tool surface evolves (actions get renamed,
 * types collapse), and a skill written against an old release silently teaches the LLM calls
 * that no longer validate — exactly what happened to the clean-core refactor chain written
 * against 0.7.2 (`SAPLint(run_atc)`, `SAPDiagnose(run_unit_tests)`, `SAPSearch(package_tree)`).
 *
 * This guard extracts every `SAP<Tool>(…)` reference from skills/**\/*.md and validates the
 * recognizable pieces against the frozen LLM surface in tests/fixtures/tool-definitions/*.json
 * (union across all variants, so onprem/btp/gate differences don't false-positive):
 *   - the tool name must be one of the 12 real tools
 *   - `action="x"` / bare lowercase tokens must be in that tool's action enum
 *   - `searchType="x"` must be in SAPSearch's searchType enum
 *   - `type="X"` / bare UPPERCASE tokens must be in that tool's type enum
 * Anything else (kwargs, placeholders, ellipses) is ignored — prose stays free-form.
 *
 * Run: npm run check:skill-refs   (also wired into .github/workflows/test.yml)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FIXTURES_DIR = 'tests/fixtures/tool-definitions';
const SKILLS_DIR = 'skills';

// ---------------------------------------------------------------------------
// 1. Build the union surface from every fixture variant.
// ---------------------------------------------------------------------------

/** @type {Map<string, { actions: Set<string>, types: Set<string>, searchTypes: Set<string> }>} */
const surface = new Map();

for (const file of readdirSync(FIXTURES_DIR).filter((f) => f.endsWith('.json'))) {
  const tools = JSON.parse(readFileSync(join(FIXTURES_DIR, file), 'utf8'));
  if (!Array.isArray(tools)) continue;
  for (const tool of tools) {
    const entry = surface.get(tool.name) ?? { actions: new Set(), types: new Set(), searchTypes: new Set() };
    const props = tool.inputSchema?.properties ?? {};
    for (const v of props.action?.enum ?? []) entry.actions.add(v);
    for (const v of props.type?.enum ?? []) entry.types.add(v);
    for (const v of props.searchType?.enum ?? []) entry.searchTypes.add(v);
    // batch_create items carry their own type enum (three-file-sync sibling schema)
    const itemProps = props.objects?.items?.properties ?? {};
    for (const v of itemProps.type?.enum ?? []) entry.types.add(v);
    surface.set(tool.name, entry);
  }
}

if (surface.size === 0) {
  console.error(`check-skill-tool-refs: no fixtures found under ${FIXTURES_DIR} — refusing to pass vacuously.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Scan skills/**/*.md for SAP<Tool>(…) references.
// ---------------------------------------------------------------------------

/** @returns {string[]} */
function mdFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...mdFiles(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

const CALL_RE = /\b(SAP[A-Z][A-Za-z]+)\(([^()]*)\)/g;
const violations = [];

function checkToken(tool, entry, rawToken, file, line) {
  const token = rawToken.trim().replace(/^["'`]|["'`]$/g, '');
  if (!token) return;

  // key="value" / key='value' / key=value
  const kv = token.match(/^(\w+)\s*=\s*["'`]?([\w$*/-]+)["'`]?$/);
  if (kv) {
    const [, key, value] = kv;
    if (key === 'action' && entry.actions.size && !entry.actions.has(value)) {
      violations.push({ file, line, tool, token, reason: `action "${value}" not in ${tool} enum`, valid: entry.actions });
    } else if (key === 'searchType' && entry.searchTypes.size && !entry.searchTypes.has(value)) {
      violations.push({ file, line, tool, token, reason: `searchType "${value}" not valid`, valid: entry.searchTypes });
    } else if (key === 'type' && entry.types.size && !entry.types.has(value)) {
      violations.push({ file, line, tool, token, reason: `type "${value}" not in ${tool} enum`, valid: entry.types });
    }
    return; // other kwargs (name=, query=, variant=, …) are free-form
  }

  // bare lowercase word → action candidate
  if (/^[a-z][a-z0-9_]*$/.test(token)) {
    if (entry.actions.size && !entry.actions.has(token)) {
      violations.push({ file, line, tool, token, reason: `bare token "${token}" not in ${tool} action enum`, valid: entry.actions });
    }
    return;
  }

  // bare UPPERCASE word → type candidate (only for tools that HAVE a type enum)
  if (/^[A-Z][A-Z0-9_]{2,}$/.test(token)) {
    if (entry.types.size && !entry.types.has(token)) {
      violations.push({ file, line, tool, token, reason: `bare token "${token}" not in ${tool} type enum`, valid: entry.types });
    }
    return;
  }
  // placeholders (<pkg>, …), snippets, expressions → ignore
}

for (const file of mdFiles(SKILLS_DIR)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((text, i) => {
    for (const m of text.matchAll(CALL_RE)) {
      const [, tool, args] = m;
      const entry = surface.get(tool);
      if (!entry) {
        violations.push({ file, line: i + 1, tool, token: '(tool name)', reason: `unknown tool "${tool}"`, valid: new Set(surface.keys()) });
        continue;
      }
      // split prose-style separators: commas, arrows, pipes (incl. escaped table pipes), plus, slash
      for (const rawToken of args.split(/,|→|\\\||\||\+|\s\/\s/)) checkToken(tool, entry, rawToken, file, i + 1);
    }
  });
}

// ---------------------------------------------------------------------------
// 3. Report.
// ---------------------------------------------------------------------------

if (violations.length) {
  console.error(`check-skill-tool-refs: ${violations.length} stale/invented tool reference(s) in skills/*.md\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.tool} — ${v.reason}`);
    console.error(`      valid: ${[...v.valid].sort().join(', ') || '(none)'}\n`);
  }
  console.error('Fix the skill text to use the current tool surface (tests/fixtures/tool-definitions/).');
  process.exit(1);
}
console.log(`check-skill-tool-refs: OK — all SAP*() references in skills/ match the frozen tool surface (${surface.size} tools).`);
