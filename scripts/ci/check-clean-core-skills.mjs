#!/usr/bin/env node
/**
 * Clean-core skill-chain guard.
 *
 * This check turns the clean-core orchestrator documentation into a small contract:
 * - chain.json is valid and every decision/action is documented in DECISION_MATRIX.md
 * - every local ARC-1 skill is either used by the chain or explicitly marked MAY-only
 * - generate-rap-service remains MAY-only, not a default production refactor path
 * - critical SAP* examples in the skills markdown tree include the arguments ARC-1 actually requires
 * - optional SAP docs/plugin calls stay capability-gated instead of assuming tool names exist
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const SKILLS_DIR = 'skills';
const CLEAN_CORE_DIR = join(SKILLS_DIR, 'sap-erp-clean-core-refactor');
const CHAIN_JSON = join(CLEAN_CORE_DIR, 'chain.json');
const DECISION_MATRIX = join(CLEAN_CORE_DIR, 'DECISION_MATRIX.md');
const README = join(CLEAN_CORE_DIR, 'README.md');
const WORKFLOW = join(CLEAN_CORE_DIR, 'WORKFLOW.md');
const SKILL_MD = join(CLEAN_CORE_DIR, 'SKILL.md');

const errors = [];

function fail(message) {
  errors.push(message);
}

function readText(file) {
  return readFileSync(file, 'utf8');
}

function walkMarkdown(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walkMarkdown(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function localSkillNames() {
  return readdirSync(SKILLS_DIR)
    .map((name) => join(SKILLS_DIR, name, 'SKILL.md'))
    .filter((p) => existsSync(p))
    .map((p) => basename(dirname(p)))
    .sort();
}

function unique(values) {
  return [...new Set(values)];
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

// ---------------------------------------------------------------------------
// 1. Chain manifest + decision matrix sync.
// ---------------------------------------------------------------------------

if (!existsSync(CHAIN_JSON)) fail(`${CHAIN_JSON} is missing`);
if (!existsSync(DECISION_MATRIX)) fail(`${DECISION_MATRIX} is missing`);
if (!existsSync(README)) fail(`${README} is missing`);

let chain;
if (existsSync(CHAIN_JSON)) {
  try {
    chain = JSON.parse(readText(CHAIN_JSON));
  } catch (error) {
    fail(`${CHAIN_JSON} is not valid JSON: ${error.message}`);
  }
}

if (chain) {
  if (chain.orchestrator !== 'sap-erp-clean-core-refactor') {
    fail(`chain.json orchestrator must be sap-erp-clean-core-refactor, got ${JSON.stringify(chain.orchestrator)}`);
  }

  const actions = chain.actions && typeof chain.actions === 'object' ? chain.actions : {};
  const decisions = Array.isArray(chain.decisions) ? chain.decisions : [];
  const specializedDispatches = Array.isArray(chain.specializedDispatches) ? chain.specializedDispatches : [];
  const actionNames = new Set(Object.keys(actions));
  const decisionIds = decisions.map((d) => d.id);

  for (const id of decisionIds) {
    if (decisionIds.indexOf(id) !== decisionIds.lastIndexOf(id)) fail(`duplicate decision id in chain.json: ${id}`);
  }

  const allowedSources = new Set(['A', 'B', 'C', 'D', 'Any']);
  const allowedTargets = new Set(['A', 'B', 'Removed', 'ResearchRequired']);
  for (const decision of decisions) {
    if (!decision.id) fail('decision without id in chain.json');
    if (!actionNames.has(decision.action)) fail(`decision ${decision.id} references unknown action ${decision.action}`);
    if (!Array.isArray(decision.source) || decision.source.length === 0) fail(`decision ${decision.id} needs non-empty source[]`);
    for (const source of decision.source ?? []) {
      if (!allowedSources.has(source)) fail(`decision ${decision.id} has invalid source ${source}`);
    }
    if (!allowedTargets.has(decision.target)) fail(`decision ${decision.id} has invalid target ${decision.target}`);
    if (!decision.trigger) fail(`decision ${decision.id} needs a trigger`);
  }

  for (const [name, action] of Object.entries(actions)) {
    if (!Array.isArray(action.localSkills)) fail(`action ${name} needs localSkills[]`);
    if (!Array.isArray(action.gates) || action.gates.length === 0) fail(`action ${name} needs non-empty gates[]`);
  }

  for (const dispatch of specializedDispatches) {
    const parentActions = Array.isArray(dispatch.parentActions)
      ? dispatch.parentActions
      : dispatch.parentAction
        ? [dispatch.parentAction]
        : [];
    if (dispatch.mode === 'mayOnly' && parentActions.length !== 0) {
      fail(`specialized dispatch ${dispatch.condition} is mayOnly but declares parentActions`);
    }
    if (dispatch.mode !== 'mayOnly' && parentActions.length === 0) {
      fail(`specialized dispatch ${dispatch.condition} needs non-empty parentActions[]`);
    }
    for (const parentAction of parentActions) {
      if (!actionNames.has(parentAction)) {
        fail(`specialized dispatch ${dispatch.condition} references unknown parentAction ${parentAction}`);
      }
    }
    if (!actionNames.has(dispatch.action)) {
      fail(`specialized dispatch ${dispatch.condition} references unknown action ${dispatch.action}`);
    }
  }

  const matrix = existsSync(DECISION_MATRIX) ? readText(DECISION_MATRIX) : '';
  for (const id of decisionIds) {
    if (!matrix.includes(`| ${id} |`)) fail(`${DECISION_MATRIX} is missing row for decision ${id}`);
  }
  for (const action of actionNames) {
    if (!matrix.includes(`\`${action}\``)) fail(`${DECISION_MATRIX} does not mention action ${action}`);
  }

  const readme = existsSync(README) ? readText(README) : '';
  for (const required of ['SKILL.md', 'WORKFLOW.md', 'DECISION_MATRIX.md', 'chain.json', 'INTEGRATIONS.md', 'PATTERNS.md', 'SOURCES.md']) {
    if (readme && !readme.includes(required)) fail(`${README} should reference ${required}`);
  }

  for (const file of [WORKFLOW, SKILL_MD]) {
    if (existsSync(file)) {
      const text = readText(file);
      if (!text.includes('README.md')) fail(`${file} should reference README.md`);
      if (!text.includes('DECISION_MATRIX.md')) fail(`${file} should reference DECISION_MATRIX.md`);
      if (!text.includes('chain.json')) fail(`${file} should reference chain.json`);
    }
  }

  const allSkills = localSkillNames();
  const coveredSkills = unique(Object.values(chain.skillCoverage ?? {}).flat());
  for (const skill of allSkills) {
    if (!coveredSkills.includes(skill)) fail(`local skill ${skill} is not covered in chain.json skillCoverage`);
  }
  for (const skill of coveredSkills) {
    if (!allSkills.includes(skill)) fail(`chain.json skillCoverage references missing local skill ${skill}`);
  }
  for (const [actionName, action] of Object.entries(actions)) {
    for (const skill of action.localSkills ?? []) {
      if (!allSkills.includes(skill)) fail(`action ${actionName} references missing local skill ${skill}`);
    }
  }

  const mayOnly = new Set(chain.skillCoverage?.mayOnly ?? []);
  if (!mayOnly.has('generate-rap-service')) fail('generate-rap-service must remain in skillCoverage.mayOnly');
  for (const decision of decisions) {
    const action = actions[decision.action];
    if ((action?.localSkills ?? []).includes('generate-rap-service')) {
      fail(`generate-rap-service is used by default decision ${decision.id}; it must stay MAY-only`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Capability-gate guard across skills/**/*.md.
// ---------------------------------------------------------------------------

for (const file of walkMarkdown(SKILLS_DIR)) {
  const text = readText(file);
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    const loc = `${file}:${index + 1}`;
    if (/\/api-style-review|\/btp-destination-diagnose|\/abap-cloud-review|\/cap-deployment-checklist|\/btp-app-readiness-review/.test(line)) {
      fail(`${loc}: direct plugin slash command remains; describe it as exposed/capability-gated`);
    }
    if (/sap_community_search\s*\(/.test(line) && !/only when exposed|when exposed/i.test(line)) {
      fail(`${loc}: sap_community_search call must be capability-gated`);
    }
    if (/sap_discovery_center_search\s*\(/.test(line) && !/only when exposed|when exposed/i.test(line)) {
      fail(`${loc}: sap_discovery_center_search call must be capability-gated`);
    }
  });
}

// ---------------------------------------------------------------------------
// 3. Strict argument guard for high-risk SAP* examples in skills/**/*.md.
// ---------------------------------------------------------------------------

function extractSapCalls(text) {
  const calls = [];
  const re = /\b(SAP(?:Read|Search|Write|Activate|Navigate|Query|Transport|Git|Context|Lint|Diagnose|Manage))\s*\(/g;
  let match;
  while ((match = re.exec(text))) {
    const start = re.lastIndex;
    let depth = 1;
    let quote = null;
    let i = start;
    for (; i < text.length; i++) {
      const ch = text[i];
      const prev = text[i - 1];
      if (quote) {
        if (ch === quote && prev !== '\\') quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        continue;
      }
      if (ch === '(') depth++;
      if (ch === ')' && --depth === 0) break;
    }
    if (depth === 0) calls.push({ tool: match[1], args: text.slice(start, i), index: match.index });
  }
  return calls;
}

function hasArg(args, name) {
  return new RegExp(`\\b${name}\\s*=`).test(args);
}

for (const file of walkMarkdown(SKILLS_DIR)) {
  const text = readText(file);
  for (const call of extractSapCalls(text)) {
    const loc = `${file}:${lineOf(text, call.index)}`;
    const args = call.args;
    if (call.tool === 'SAPSearch' && /searchType\s*=\s*"tadir_lookup"/.test(args) && !hasArg(args, 'names')) {
      fail(`${loc}: tadir_lookup must pass names=[...]`);
    }
    if (call.tool === 'SAPDiagnose' && /action\s*=\s*"quickfix"/.test(args)) {
      for (const arg of ['type', 'name', 'source', 'line']) if (!hasArg(args, arg)) fail(`${loc}: quickfix missing ${arg}`);
    }
    if (call.tool === 'SAPDiagnose' && /action\s*=\s*"apply_quickfix"/.test(args)) {
      for (const arg of ['type', 'name', 'source', 'line', 'proposalUri', 'proposalUserContent']) {
        if (!hasArg(args, arg)) fail(`${loc}: apply_quickfix missing ${arg}`);
      }
    }
    if (call.tool === 'SAPDiagnose' && /action\s*=\s*"syntax"/.test(args)) {
      for (const arg of ['type', 'name', 'source']) if (!hasArg(args, arg)) fail(`${loc}: syntax missing ${arg}`);
    }
    if (call.tool === 'SAPTransport' && /action\s*=\s*"check"/.test(args)) {
      for (const arg of ['type', 'name', 'package']) if (!hasArg(args, arg)) fail(`${loc}: transport check missing ${arg}`);
    }
    if (call.tool === 'SAPTransport' && /action\s*=\s*"create"/.test(args) && !hasArg(args, 'package')) {
      fail(`${loc}: transport create missing package`);
    }
    if (call.tool === 'SAPWrite' && /action\s*=\s*"update"/.test(args)) {
      for (const arg of ['type', 'name', 'source']) if (!hasArg(args, arg)) fail(`${loc}: SAPWrite update missing ${arg}`);
    }
    if (call.tool === 'SAPRead' && /type\s*=\s*"VERSION_SOURCE"/.test(args) && !hasArg(args, 'versionUri')) {
      fail(`${loc}: VERSION_SOURCE missing versionUri`);
    }
  }
}

if (errors.length) {
  console.error(`check-clean-core-skills: ${errors.length} violation(s)\n`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('check-clean-core-skills: OK');
