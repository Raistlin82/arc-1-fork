#!/usr/bin/env node
/**
 * Skill integration guard.
 *
 * Validates every instructional SAP*() reference against the frozen LLM tool surface and the
 * action-specific requirements enforced by the handlers. It also verifies the local skill catalog:
 * folder/frontmatter identity, unique names, README coverage, and resolvable Markdown skill links.
 *
 * Imported source transcripts under knowledge raw directories are intentionally excluded from invocation
 * checks: they are evidence, not agent instructions.
 *
 * Run: npm run check:skill-refs (wired into .github/workflows/test.yml)
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize, resolve } from 'node:path';

const FIXTURES_DIR = 'tests/fixtures/tool-definitions';
const SKILLS_DIR = 'skills';
const SKILLS_README = join(SKILLS_DIR, 'README.md');
const INSTRUCTION_DIRS = [SKILLS_DIR, join('.agents', 'skills'), join('.claude', 'skills'), join('.claude', 'commands')];

/** @type {Array<{file: string, line: number, tool?: string, reason: string, valid?: Set<string>}>} */
const violations = [];

function fail(file, line, reason, tool, valid) {
  violations.push({ file, line, reason, tool, valid });
}

/** @returns {string[]} */
function mdFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...mdFiles(path));
    else if (name.endsWith('.md')) out.push(path);
  }
  return out;
}

function instructionMdFiles() {
  return INSTRUCTION_DIRS.filter(existsSync).flatMap((dir) => mdFiles(dir));
}

const instructionalFiles = instructionMdFiles();
let checkedCallCount = 0;

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

// ---------------------------------------------------------------------------
// 1. Build the union tool surface from every frozen fixture variant.
// ---------------------------------------------------------------------------

/** @type {Map<string, {actions: Set<string>, types: Set<string>, searchTypes: Set<string>, properties: Set<string>, enums: Map<string, Set<string>>}>} */
const surface = new Map();

function schemaEnumValues(schema) {
  const values = new Set(schema?.enum ?? []);
  for (const branch of schema?.anyOf ?? []) for (const value of branch.enum ?? []) values.add(value);
  return values;
}

for (const file of readdirSync(FIXTURES_DIR).filter((name) => name.endsWith('.json'))) {
  const tools = JSON.parse(readFileSync(join(FIXTURES_DIR, file), 'utf8'));
  if (!Array.isArray(tools)) continue;
  for (const tool of tools) {
    const entry = surface.get(tool.name) ?? {
      actions: new Set(),
      types: new Set(),
      searchTypes: new Set(),
      properties: new Set(),
      enums: new Map(),
    };
    const properties = tool.inputSchema?.properties ?? {};
    for (const [name, schema] of Object.entries(properties)) {
      entry.properties.add(name);
      const values = entry.enums.get(name) ?? new Set();
      for (const value of schemaEnumValues(schema)) values.add(value);
      if (values.size) entry.enums.set(name, values);
    }
    for (const value of properties.action?.enum ?? []) entry.actions.add(value);
    for (const value of properties.type?.enum ?? []) entry.types.add(value);
    for (const value of properties.searchType?.enum ?? []) entry.searchTypes.add(value);
    const itemProperties = properties.objects?.items?.properties ?? {};
    for (const value of itemProperties.type?.enum ?? []) entry.types.add(value);
    surface.set(tool.name, entry);
  }
}

if (surface.size === 0) {
  console.error(`check-skill-tool-refs: no fixtures found under ${FIXTURES_DIR}; refusing to pass vacuously.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Parse balanced, multiline SAP*() calls and their top-level arguments.
// ---------------------------------------------------------------------------

function extractCalls(text) {
  const calls = [];
  const regexp = /\b(SAP[A-Z][A-Za-z]+)\s*\(/g;
  let match;
  while ((match = regexp.exec(text))) {
    const argsStart = regexp.lastIndex;
    let depth = 1;
    let quote = null;
    let escaped = false;
    let index = argsStart;
    for (; index < text.length; index++) {
      const character = text[index];
      if (quote) {
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === quote) quote = null;
        continue;
      }
      if (character === '"' || character === "'" || character === '`') quote = character;
      else if (character === '(') depth++;
      else if (character === ')' && --depth === 0) break;
    }
    if (depth !== 0) {
      calls.push({ tool: match[1], args: text.slice(argsStart), index: match.index, unclosed: true });
      break;
    }
    calls.push({ tool: match[1], args: text.slice(argsStart, index), index: match.index, unclosed: false });
    regexp.lastIndex = index + 1;
  }
  return calls;
}

function splitTopLevel(args) {
  const parts = [];
  let start = 0;
  let quote = null;
  let escaped = false;
  let round = 0;
  let square = 0;
  let curly = 0;
  for (let index = 0; index < args.length; index++) {
    const character = args[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === '`') quote = character;
    else if (character === '(') round++;
    else if (character === ')') round--;
    else if (character === '[') square++;
    else if (character === ']') square--;
    else if (character === '{') curly++;
    else if (character === '}') curly--;
    else if (character === ',' && round === 0 && square === 0 && curly === 0) {
      parts.push(args.slice(start, index));
      start = index + 1;
    }
  }
  parts.push(args.slice(start));
  return parts;
}

function parseArguments(args) {
  const named = new Map();
  const bare = [];
  for (const part of splitTopLevel(args)) {
    const cleaned = part.trim().replace(/^(?:>\s*)+/, '');
    if (!cleaned) continue;
    const match = cleaned.match(/^([A-Za-z][A-Za-z0-9_]*)\s*=\s*([\s\S]*)$/);
    if (match) named.set(match[1], match[2].trim());
    else bare.push(cleaned);
  }
  return { named, bare };
}

function literal(value) {
  if (value == null) return undefined;
  const trimmed = value.trim();
  const quoted = trimmed.match(/^(["'`])([\s\S]*)\1$/);
  if (quoted) return quoted[2];
  if (/^[A-Za-z0-9_$*/.-]+$/.test(trimmed)) return trimmed;
  return undefined;
}

function isPlaceholder(value) {
  return /^<[^>]+>$/.test(String(value ?? '').trim().replace(/^["'`]|["'`]$/g, ''));
}

function requireArgs(call, file, line, named, names) {
  for (const name of names) {
    if (!named.has(name)) fail(file, line, `${call.tool} missing required argument "${name}"`, call.tool);
  }
}

function requireTarget(call, file, line, named) {
  if (named.has('uri')) return;
  if (named.has('type') && named.has('name')) return;
  fail(file, line, `${call.tool} requires "uri" or the pair "type" + "name"`, call.tool);
}

const CLASS_ONLY_WRITE_ACTIONS = new Set([
  'edit_method',
  'edit_class_definition',
  'edit_method_signature',
  'add_method',
  'delete_method',
  'change_method_visibility',
  'scaffold_rap_handlers',
  'generate_behavior_implementation',
  'edit_text_symbols',
]);

const KTD_REF_OBJECT_TYPES = new Set([
  'BDEF/BAC',
  'BDEF/BAE',
  'BDEF/BAF',
  'BDEF/BAS',
  'BDEF/BDE',
  'BDEF/BDO',
  'BDEF/BSO',
  'BDEF/BVA',
  'DDLS/DF',
  'DEVC/K',
  'SRVB/SVB',
  'SRVD/SRV',
]);

function validateNonEmptyArray(call, file, line, named, name) {
  const value = named.get(name);
  if (value?.trim() === '[]') fail(file, line, `${call.tool} argument "${name}" must be non-empty`, call.tool);
}

function validateExactType(call, file, line, named, expected, reason) {
  const rawType = named.get('type');
  if (isPlaceholder(rawType)) {
    fail(file, line, `${call.tool} ${reason} requires the literal type="${expected}", not a generic type placeholder`, call.tool);
    return;
  }
  const type = literal(rawType);
  if (type !== expected) fail(file, line, `${call.tool} ${reason} requires type="${expected}"`, call.tool);
}

function validateKtdCreate(call, file, line, named) {
  requireArgs(call, file, line, named, ['refObjectType']);
  const rawRefType = named.get('refObjectType');
  if (rawRefType && !isPlaceholder(rawRefType)) {
    const refType = literal(rawRefType)?.toUpperCase();
    if (!refType || !KTD_REF_OBJECT_TYPES.has(refType)) {
      fail(file, line, `${call.tool} SKTD create has unsupported refObjectType "${refType ?? rawRefType}"`, call.tool, KTD_REF_OBJECT_TYPES);
    }
  }

  const rawName = named.get('name');
  const rawRefName = named.get('refObjectName') ?? rawName;
  if (!isPlaceholder(rawName) && !isPlaceholder(rawRefName)) {
    const name = literal(rawName);
    const refName = literal(rawRefName);
    if (name && refName && name.toUpperCase() !== refName.toUpperCase()) {
      fail(file, line, `${call.tool} SKTD name "${name}" must match refObjectName "${refName}"`, call.tool);
    }
  }
}

function validateRequiredArguments(call, file, line, named) {
  if (named.size === 0) return;
  const action = literal(named.get('action'));
  const type = literal(named.get('type'));

  switch (call.tool) {
    case 'SAPRead': {
      requireArgs(call, file, line, named, ['type']);
      if (action === 'diff') requireArgs(call, file, line, named, ['name']);
      if (type === 'VERSION_SOURCE') requireArgs(call, file, line, named, ['versionUri']);
      else if (type && !['SYSTEM', 'COMPONENTS', 'INACTIVE_OBJECTS'].includes(type)) {
        requireArgs(call, file, line, named, ['name']);
      }
      break;
    }
    case 'SAPSearch': {
      const searchType = literal(named.get('searchType')) ?? 'object';
      if (searchType === 'tadir_lookup') {
        if (!named.has('names') && !named.has('query')) {
          fail(file, line, 'SAPSearch tadir_lookup requires "names" or "query"', call.tool);
        }
        validateNonEmptyArray(call, file, line, named, 'names');
      } else requireArgs(call, file, line, named, ['query']);
      break;
    }
    case 'SAPQuery':
      requireArgs(call, file, line, named, ['sql']);
      break;
    case 'SAPWrite': {
      requireArgs(call, file, line, named, ['action']);
      if (action === 'batch_create') {
        requireArgs(call, file, line, named, ['objects']);
        validateNonEmptyArray(call, file, line, named, 'objects');
      }
      else if (action) requireArgs(call, file, line, named, ['type', 'name']);
      const requirements = {
        update: ['source'],
        edit_method: ['method', 'source'],
        edit_class_definition: ['source'],
        add_method: ['method'],
        edit_method_signature: ['method', 'source'],
        delete_method: ['method'],
        change_method_visibility: ['method', 'visibility'],
        scaffold_rap_handlers: ['bdefName'],
        edit_text_symbols: ['source'],
      };
      if (requirements[action]) requireArgs(call, file, line, named, requirements[action]);
      if (CLASS_ONLY_WRITE_ACTIONS.has(action)) validateExactType(call, file, line, named, 'CLAS', `action="${action}"`);
      if (action === 'create' && type === 'FUNC') requireArgs(call, file, line, named, ['group']);
      if (action === 'create' && ['SKTD', 'KTD'].includes(type)) validateKtdCreate(call, file, line, named);
      break;
    }
    case 'SAPActivate':
      if (named.has('objects')) {
        validateNonEmptyArray(call, file, line, named, 'objects');
        break;
      }
      requireArgs(call, file, line, named, ['name']);
      if (!['publish_srvb', 'unpublish_srvb'].includes(action)) requireArgs(call, file, line, named, ['type']);
      break;
    case 'SAPNavigate':
      requireArgs(call, file, line, named, ['action']);
      if (action === 'hierarchy') requireArgs(call, file, line, named, ['name']);
      else if (action) requireTarget(call, file, line, named);
      break;
    case 'SAPLint':
      requireArgs(call, file, line, named, ['action']);
      if (['lint', 'lint_and_fix', 'format'].includes(action)) requireArgs(call, file, line, named, ['source']);
      if (action === 'set_formatter_settings' && !named.has('indentation') && !named.has('style')) {
        fail(file, line, 'SAPLint set_formatter_settings requires "indentation" or "style"', call.tool);
      }
      break;
    case 'SAPDiagnose': {
      requireArgs(call, file, line, named, ['action']);
      const requirements = {
        syntax: ['type', 'name', 'source'],
        unittest: ['type', 'name'],
        atc: ['type', 'name'],
        cds_testcases: ['name'],
        object_state: ['type', 'name'],
        quickfix: ['type', 'name', 'source', 'line'],
        apply_quickfix: ['type', 'name', 'source', 'line', 'proposalUri', 'proposalUserContent'],
        trace_cancel: ['id'],
        odata_perf: ['url'],
        cds_sql: ['name'],
        set_sql_trace_state: ['sqlOn'],
      };
      if (requirements[action]) requireArgs(call, file, line, named, requirements[action]);
      break;
    }
    case 'SAPTransport': {
      requireArgs(call, file, line, named, ['action']);
      const requirements = {
        get: ['id'],
        create: ['description'],
        release: ['id'],
        delete: ['id'],
        remove_object: ['id', 'pgmid', 'type', 'name'],
        reassign: ['id', 'owner'],
        release_recursive: ['id'],
        check: ['type', 'name', 'package'],
        history: ['type', 'name'],
      };
      if (requirements[action]) requireArgs(call, file, line, named, requirements[action]);
      break;
    }
    case 'SAPGit': {
      requireArgs(call, file, line, named, ['action']);
      if (['branches', 'history', 'objects', 'check', 'stage', 'pull', 'push', 'commit', 'unlink'].includes(action)) {
        requireArgs(call, file, line, named, ['repoId']);
      }
      if (['switch_branch', 'create_branch'].includes(action)) {
        requireArgs(call, file, line, named, ['repoId', 'branch']);
      }
      if (['external_info', 'clone'].includes(action)) requireArgs(call, file, line, named, ['url']);
      if (action === 'clone' && literal(named.get('backend')) === 'abapgit') {
        requireArgs(call, file, line, named, ['package']);
      }
      break;
    }
    case 'SAPContext':
      requireArgs(call, file, line, named, ['name']);
      if (action !== 'usages') requireArgs(call, file, line, named, ['type']);
      if (action === 'impact') validateExactType(call, file, line, named, 'DDLS', 'action="impact"');
      if (action === 'structure') validateExactType(call, file, line, named, 'TABL', 'action="structure"');
      if (action !== 'usages' && type === 'FUNC' && !named.has('source')) {
        requireArgs(call, file, line, named, ['group']);
      }
      break;
    case 'SAPManage': {
      requireArgs(call, file, line, named, ['action']);
      const requirements = {
        create_package: ['name', 'description'],
        delete_package: ['name'],
        change_package: ['objectName', 'objectType', 'oldPackage', 'newPackage'],
        flp_list_tiles: ['catalogId'],
        flp_create_catalog: ['domainId', 'title'],
        flp_create_group: ['groupId', 'title'],
        flp_create_tile: ['catalogId', 'tile'],
        flp_add_tile_to_group: ['groupId', 'catalogId', 'tileInstanceId'],
        flp_delete_catalog: ['catalogId'],
      };
      if (requirements[action]) requireArgs(call, file, line, named, requirements[action]);
      if (action === 'set_api_state' && !named.has('objectUri') && !named.has('name')) {
        fail(file, line, 'SAPManage set_api_state requires "objectUri" or "name"', call.tool);
      }
      break;
    }
  }
}

function validateEnum(file, line, tool, key, value, valid) {
  if (!valid.size || isPlaceholder(value)) return;
  const parsed = literal(value);
  if (parsed === undefined) {
    fail(file, line, `${tool} argument "${key}" must be one literal value or an explicit <placeholder>`, tool, valid);
  } else if (!valid.has(parsed)) {
    fail(file, line, `${tool} ${key} "${parsed}" is not in the exposed enum`, tool, valid);
  }
}

for (const file of instructionalFiles) {
  if (normalize(file).includes(`${join('knowledge', 'clean-core-extensibility', 'raw')}${process.platform === 'win32' ? '\\' : '/'}`)) {
    continue;
  }
  const text = readFileSync(file, 'utf8');
  for (const call of extractCalls(text)) {
    checkedCallCount++;
    const line = lineOf(text, call.index);
    if (call.unclosed) {
      fail(file, line, `unclosed ${call.tool}(...) reference`, call.tool);
      continue;
    }
    const entry = surface.get(call.tool);
    if (!entry) {
      fail(file, line, `unknown ARC-1 tool "${call.tool}"`, call.tool, new Set(surface.keys()));
      continue;
    }
    const { named, bare } = parseArguments(call.args);
    for (const [key, value] of named) {
      if (!entry.properties.has(key)) {
        fail(file, line, `${call.tool} has no exposed top-level argument "${key}"`, call.tool, entry.properties);
        continue;
      }
      const values = entry.enums.get(key);
      if (values) validateEnum(file, line, call.tool, key, value, values);
    }
    for (const token of bare) {
      const cleaned = token.replace(/^["'`]|["'`]$/g, '');
      if (/^[a-z][a-z0-9_]*$/.test(cleaned) && entry.actions.size && !entry.actions.has(cleaned)) {
        fail(file, line, `${call.tool} bare action "${cleaned}" is not in the exposed enum`, call.tool, entry.actions);
      } else if (/^[A-Z][A-Z0-9_/]{2,}$/.test(cleaned) && entry.types.size && !entry.types.has(cleaned)) {
        fail(file, line, `${call.tool} bare type "${cleaned}" is not in the exposed enum`, call.tool, entry.types);
      }
    }
    validateRequiredArguments(call, file, line, named);
  }
}

// ---------------------------------------------------------------------------
// 3. Validate local skill identity, catalog coverage, and Markdown skill links.
// ---------------------------------------------------------------------------

const readme = readFileSync(SKILLS_README, 'utf8');
const skillNames = new Map();
for (const entry of readdirSync(SKILLS_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const skillFile = join(SKILLS_DIR, entry.name, 'SKILL.md');
  if (!existsSync(skillFile)) continue;
  const text = readFileSync(skillFile, 'utf8');
  const nameMatch = text.match(/^---\s*\n[\s\S]*?^name:\s*([^\s]+)\s*$/m);
  if (!nameMatch) fail(skillFile, 1, 'missing frontmatter name');
  else {
    const declared = nameMatch[1];
    if (declared !== entry.name) fail(skillFile, 2, `frontmatter name "${declared}" must match folder "${entry.name}"`);
    if (skillNames.has(declared)) fail(skillFile, 2, `duplicate skill name "${declared}" (also ${skillNames.get(declared)})`);
    skillNames.set(declared, skillFile);
  }
  if (!readme.includes(`](${entry.name}/SKILL.md)`)) {
    fail(SKILLS_README, 1, `local skill "${entry.name}" is missing from the Available Skills catalog`);
  }
}

for (const file of instructionalFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+\.md(?:#[^)]+)?)\)/g)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, '');
    if (/^(?:https?:|mailto:|app:)/.test(rawTarget) || rawTarget.includes('<')) continue;
    const targetWithoutAnchor = decodeURIComponent(rawTarget.split('#')[0]);
    if (['./system-info.md', './skipped.md'].includes(targetWithoutAnchor)) continue;
    const target = resolve(dirname(file), targetWithoutAnchor);
    if (!existsSync(target)) fail(file, lineOf(text, match.index), `broken Markdown link to "${rawTarget}"`);
  }
}

// External MCP names are intentionally discovered at runtime. These sequence checks prevent the
// skills from bypassing the discovery/schema steps that make release-specific tools safe.
const externalToolReference =
  /\b(?:abap_generators-[A-Za-z0-9_-]+|abap_activate_objects|sap_get_object_details|sap_search_objects|abap_feature_matrix|sap_community_search|sap_discovery_center_search|ui5_version_diff|search_docs|search_model)\b|\bmcp__[A-Za-z0-9_-]+/;
const externalDiscoveryGate =
  /tool discovery|capabilit(?:y|ies) (?:is|are) exposed|when exposed|if exposed|only when exposed|when available|if available|when connected|with [^\n.]* connected|if (?:the )?[^\n.]*connected|do not have a tool|not connected|active namespace/i;

for (const file of instructionalFiles) {
  const text = readFileSync(file, 'utf8');
  if (externalToolReference.test(text) && !externalDiscoveryGate.test(text)) {
    fail(file, 1, 'external MCP references must be capability-gated and use the live discovered schema');
  }
  if (/abap_generators-(?:get_schema|generate_objects)/.test(text) && !text.includes('abap_generators-list_generators')) {
    fail(file, 1, 'official ABAP generator use must start with abap_generators-list_generators');
  }
  if (/abap_generators-generate_objects/.test(text) && !text.includes('abap_generators-get_schema')) {
    fail(file, 1, 'official ABAP generator execution must obtain the live schema first');
  }
  if (/mcp__fiori-mcp__(?:get_functionality_details|execute_functionality)/.test(text) && !text.includes('mcp__fiori-mcp__list_functionalities')) {
    fail(file, 1, 'Fiori MCP execution must start with list_functionalities discovery');
  }
  if (/mcp__fiori-mcp__execute_functionality/.test(text) && !text.includes('mcp__fiori-mcp__get_functionality_details')) {
    fail(file, 1, 'Fiori MCP execution must obtain live functionality details first');
  }
}

// ---------------------------------------------------------------------------
// 4. Report.
// ---------------------------------------------------------------------------

if (violations.length) {
  console.error(`check-skill-tool-refs: ${violations.length} integration violation(s)\n`);
  for (const violation of violations) {
    console.error(`  ${violation.file}:${violation.line}${violation.tool ? `  ${violation.tool}` : ''} - ${violation.reason}`);
    if (violation.valid) console.error(`      valid: ${[...violation.valid].sort().join(', ') || '(none)'}`);
  }
  console.error('\nFix the skill instructions or catalog; do not weaken the runtime contract.');
  process.exit(1);
}

console.log(
  `check-skill-tool-refs: OK - ${surface.size} tools, ${skillNames.size} packaged skills, ${instructionalFiles.length} instruction files, ${checkedCallCount} calls, links, and external discovery sequences validated.`,
);
