#!/usr/bin/env node
/** Validate the Clean Core decision contract, ARC-1 examples, and skill coverage. */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import Ajv from 'ajv';
import { resolveDecision } from '../resolve-clean-core-decision.mjs';

const SKILLS_DIR = 'skills';
const CLEAN_CORE_DIR = join(SKILLS_DIR, 'sap-erp-clean-core-refactor');
const CHAIN_JSON = join(CLEAN_CORE_DIR, 'chain.json');
const ACTION_CATALOG = join(CLEAN_CORE_DIR, 'action-catalog.json');
const DECISION_SCENARIOS = join(CLEAN_CORE_DIR, 'decision-scenarios.json');
const KNOWLEDGE_RULES = join(CLEAN_CORE_DIR, 'knowledge', 'clean-core-extensibility', 'decision-rules.json');
const CURATED_GRAPH = join(
  CLEAN_CORE_DIR,
  'knowledge',
  'clean-core-extensibility',
  'graphify-out',
  'graph.curated.json',
);
const DECISION_MATRIX = join(CLEAN_CORE_DIR, 'DECISION_MATRIX.md');
const README = join(CLEAN_CORE_DIR, 'README.md');
const WORKFLOW = join(CLEAN_CORE_DIR, 'WORKFLOW.md');
const SKILL_MD = join(CLEAN_CORE_DIR, 'SKILL.md');
const TOOL_FIXTURES = 'tests/fixtures/tool-definitions';
const errors = [];

function fail(message) {
  errors.push(message);
}

function readText(file) {
  return readFileSync(file, 'utf8');
}

function readJson(file) {
  try {
    return JSON.parse(readText(file));
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
    return undefined;
  }
}

function walkMarkdown(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walkMarkdown(path));
    else if (name.endsWith('.md')) out.push(path);
  }
  return out;
}

function localSkillNames() {
  return readdirSync(SKILLS_DIR)
    .map((name) => join(SKILLS_DIR, name, 'SKILL.md'))
    .filter((path) => existsSync(path))
    .map((path) => basename(dirname(path)))
    .sort();
}

function unique(values) {
  return [...new Set(values)];
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

for (const required of [CHAIN_JSON, ACTION_CATALOG, DECISION_SCENARIOS, KNOWLEDGE_RULES, CURATED_GRAPH, DECISION_MATRIX, README, WORKFLOW, SKILL_MD]) {
  if (!existsSync(required)) fail(`${required} is missing`);
}

const chain = existsSync(CHAIN_JSON) ? readJson(CHAIN_JSON) : undefined;
const catalog = existsSync(ACTION_CATALOG) ? readJson(ACTION_CATALOG) : undefined;
const scenarios = existsSync(DECISION_SCENARIOS) ? readJson(DECISION_SCENARIOS) : undefined;
const knowledge = existsSync(KNOWLEDGE_RULES) ? readJson(KNOWLEDGE_RULES) : undefined;
const curatedGraph = existsSync(CURATED_GRAPH) ? readJson(CURATED_GRAPH) : undefined;

if (chain) {
  if (chain.version !== 2) fail(`chain.json version must be 2, got ${JSON.stringify(chain.version)}`);
  if (chain.orchestrator !== 'sap-erp-clean-core-refactor') fail('chain.json has the wrong orchestrator');
  for (const mode of ['discover', 'estimate', 'plan', 'execute', 'govern']) {
    if (!chain.modes?.includes(mode)) fail(`chain.json modes[] is missing ${mode}`);
  }

  const actions = chain.actions && typeof chain.actions === 'object' ? chain.actions : {};
  const gates = chain.gateCatalog && typeof chain.gateCatalog === 'object' ? chain.gateCatalog : {};
  const decisions = Array.isArray(chain.decisions) ? chain.decisions : [];
  const dispatches = Array.isArray(chain.specializedDispatches) ? chain.specializedDispatches : [];
  const actionNames = new Set(Object.keys(actions));
  const gateNames = new Set(Object.keys(gates));
  const operationNames = new Set(Object.keys(catalog?.operations ?? {}));
  const decisionIds = decisions.map((decision) => decision.id);
  const precedences = decisions.map((decision) => decision.precedence);
  const allowedSources = new Set(['A', 'B', 'C', 'D', 'Unknown']);
  const allowedTargets = new Set(['A', 'B', 'A+B', 'A+C', 'Removed', 'ArchitectureDependent', 'ResearchRequired']);
  const allowedDomains = new Set(chain.targetDomains ?? []);

  if (new Set(decisionIds).size !== decisionIds.length) fail('chain.json has duplicate decision ids');
  if (new Set(precedences).size !== precedences.length) fail('chain.json has duplicate decision precedence values');

  for (const [name, gate] of Object.entries(gates)) {
    if (!['must', 'should'].includes(gate.severity)) fail(`gate ${name} has invalid severity`);
    if (!gate.executor || !gate.fallback) fail(`gate ${name} needs executor and fallback`);
  }

  for (const [name, action] of Object.entries(actions)) {
    if (!action.execution) fail(`action ${name} needs execution`);
    if (!Array.isArray(action.localSkills)) fail(`action ${name} needs localSkills[]`);
    if (!Array.isArray(action.gates) || action.gates.length === 0) fail(`action ${name} needs non-empty gates[]`);
    if (!Array.isArray(action.operationIds)) fail(`action ${name} needs operationIds[]`);
    for (const gate of action.gates ?? []) if (!gateNames.has(gate)) fail(`action ${name} references unknown gate ${gate}`);
    for (const operation of action.operationIds ?? []) {
      if (!operationNames.has(operation)) fail(`action ${name} references unknown operation ${operation}`);
    }
  }

  for (const decision of decisions) {
    if (!decision.id) fail('decision without id in chain.json');
    if (!Number.isInteger(decision.precedence)) fail(`decision ${decision.id} needs integer precedence`);
    if (!actionNames.has(decision.action)) fail(`decision ${decision.id} references unknown action ${decision.action}`);
    if (!Array.isArray(decision.sourceLevels) || decision.sourceLevels.length === 0) {
      fail(`decision ${decision.id} needs non-empty sourceLevels[]`);
    }
    for (const source of decision.sourceLevels ?? []) {
      if (!allowedSources.has(source)) fail(`decision ${decision.id} has invalid source level ${source}`);
    }
    if (!allowedTargets.has(decision.targetLevel)) fail(`decision ${decision.id} has invalid target level ${decision.targetLevel}`);
    if (!allowedDomains.has(decision.targetDomain)) fail(`decision ${decision.id} has invalid target domain ${decision.targetDomain}`);
    if (!decision.trigger) fail(`decision ${decision.id} needs a trigger`);
    if (!Array.isArray(decision.conditions) || decision.conditions.length === 0) {
      fail(`decision ${decision.id} needs conditions[]`);
    }
    for (const condition of decision.conditions ?? []) {
      const supported = condition.always === true || (typeof condition.fact === 'string' && (Object.hasOwn(condition, 'equals') || Array.isArray(condition.in)));
      if (!supported) fail(`decision ${decision.id} has unsupported condition ${JSON.stringify(condition)}`);
    }
    if (!Array.isArray(decision.evidenceRequired) || decision.evidenceRequired.length === 0) {
      fail(`decision ${decision.id} needs evidenceRequired[]`);
    }
  }

  for (const dispatch of dispatches) {
    const parents = Array.isArray(dispatch.parentActions) ? dispatch.parentActions : [];
    if (dispatch.mode === 'mayOnly' && parents.length) fail(`MAY-only dispatch ${dispatch.condition} cannot have parents`);
    if (dispatch.mode !== 'mayOnly' && !parents.length) fail(`dispatch ${dispatch.condition} needs parentActions[]`);
    for (const parent of parents) if (!actionNames.has(parent)) fail(`dispatch ${dispatch.condition} has unknown parent ${parent}`);
    if (!actionNames.has(dispatch.action)) fail(`dispatch ${dispatch.condition} has unknown action ${dispatch.action}`);
  }

  const matrix = existsSync(DECISION_MATRIX) ? readText(DECISION_MATRIX) : '';
  for (const id of decisionIds) if (!matrix.includes(`| ${id} |`)) fail(`${DECISION_MATRIX} is missing row ${id}`);
  for (const action of actionNames) if (!matrix.includes(`\`${action}\``)) fail(`${DECISION_MATRIX} does not mention ${action}`);

  const allSkills = localSkillNames();
  const coveredSkills = unique(Object.values(chain.skillCoverage ?? {}).flat());
  for (const skill of allSkills) if (!coveredSkills.includes(skill)) fail(`local skill ${skill} is not covered in skillCoverage`);
  for (const skill of coveredSkills) if (!allSkills.includes(skill)) fail(`skillCoverage references missing skill ${skill}`);
  for (const [actionName, action] of Object.entries(actions)) {
    for (const skill of action.localSkills ?? []) {
      if (!allSkills.includes(skill)) fail(`action ${actionName} references missing skill ${skill}`);
    }
  }
  if (!chain.skillCoverage?.mayOnly?.includes('generate-rap-service')) fail('generate-rap-service must remain MAY-only');
  for (const decision of decisions) {
    if ((actions[decision.action]?.localSkills ?? []).includes('generate-rap-service')) {
      fail(`generate-rap-service is used by decision ${decision.id}; it must remain MAY-only`);
    }
  }

  for (const [landscape, config] of Object.entries(chain.landscapes ?? {})) {
    if (!Array.isArray(config.allowedLevels) || !config.allowedLevels.length) fail(`landscape ${landscape} needs allowedLevels[]`);
    for (const domain of config.allowedDomains ?? []) {
      if (!allowedDomains.has(domain)) fail(`landscape ${landscape} references unknown domain ${domain}`);
    }
  }
}

if (chain && scenarios) {
  if (scenarios.version !== 1) fail('decision-scenarios.json version must be 1');
  const ids = scenarios.scenarios?.map((scenario) => scenario.id) ?? [];
  if (new Set(ids).size !== ids.length) fail('decision-scenarios.json has duplicate scenario ids');
  const decisionIds = new Set(chain.decisions.map((decision) => decision.id));
  for (const scenario of scenarios.scenarios ?? []) {
    if (!scenario.facts || !scenario.expectedDecision) fail(`decision scenario ${scenario.id} is incomplete`);
    if (!decisionIds.has(scenario.expectedDecision)) fail(`decision scenario ${scenario.id} expects unknown decision ${scenario.expectedDecision}`);
    try {
      const actual = resolveDecision(chain, scenario.facts);
      if (actual?.id !== scenario.expectedDecision) {
        fail(`decision scenario ${scenario.id} expected ${scenario.expectedDecision}, got ${actual?.id ?? 'no match'}`);
      }
    } catch (error) {
      fail(`decision scenario ${scenario.id} failed: ${error.message}`);
    }
  }
}

if (catalog) {
  if (catalog.version !== 1) fail('action-catalog.json version must be 1');
  const schemas = new Map();
  for (const file of readdirSync(TOOL_FIXTURES).filter((name) => name.endsWith('.json'))) {
    for (const tool of readJson(join(TOOL_FIXTURES, file)) ?? []) {
      const entries = schemas.get(tool.name) ?? [];
      entries.push({ file, schema: tool.inputSchema });
      schemas.set(tool.name, entries);
    }
  }
  const ajv = new Ajv({ allErrors: true, strict: false });
  for (const [id, operation] of Object.entries(catalog.operations ?? {})) {
    if (!operation.tool || !operation.exampleArgs) fail(`operation ${id} needs tool and exampleArgs`);
    if (!Array.isArray(operation.requiredInputs)) fail(`operation ${id} needs requiredInputs[]`);
    const candidates = schemas.get(operation.tool) ?? [];
    if (!candidates.length) {
      fail(`operation ${id} references unknown tool ${operation.tool}`);
      continue;
    }
    const valid = candidates.some(({ schema }) => ajv.validate(schema, operation.exampleArgs));
    if (!valid) {
      const details = candidates
        .map(({ file, schema }) => {
          ajv.validate(schema, operation.exampleArgs);
          return `${file}: ${ajv.errorsText(ajv.errors)}`;
        })
        .join(' | ');
      fail(`operation ${id} example does not match any ${operation.tool} schema: ${details}`);
    }
  }
}

if (knowledge) {
  if (knowledge.version !== 1) fail('decision-rules.json version must be 1');
  const ids = (knowledge.rules ?? []).map((rule) => rule.id);
  if (new Set(ids).size !== ids.length) fail('decision-rules.json has duplicate ids');
  for (const rule of knowledge.rules ?? []) {
    if (!rule.statement || !Array.isArray(rule.topics) || !rule.topics.length) fail(`knowledge rule ${rule.id} is incomplete`);
    if (!Array.isArray(rule.sourcePages) || !rule.sourcePages.every(Number.isInteger)) {
      fail(`knowledge rule ${rule.id} needs integer sourcePages[]`);
    }
    if (!['authoritative', 'derived'].includes(rule.confidence)) fail(`knowledge rule ${rule.id} has invalid confidence`);
  }
}

if (curatedGraph) {
  if (curatedGraph.graph?.curation_version !== 1) fail('graph.curated.json curation_version must be 1');
  const nodeIds = new Set((curatedGraph.nodes ?? []).map((node) => node.id));
  const labels = new Set();
  const degree = new Map([...nodeIds].map((id) => [id, 0]));
  for (const node of curatedGraph.nodes ?? []) {
    const normalized = (node.norm_label ?? node.label ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (labels.has(normalized)) fail(`graph.curated.json has duplicate normalized label ${normalized}`);
    labels.add(normalized);
    for (const alias of node.alias_ids ?? []) {
      if (nodeIds.has(alias)) fail(`graph.curated.json alias ${alias} still exists as a node`);
    }
  }
  for (const link of curatedGraph.links ?? []) {
    if (!nodeIds.has(link.source) || !nodeIds.has(link.target)) {
      fail(`graph.curated.json link references a missing node: ${link.source} -> ${link.target}`);
      continue;
    }
    degree.set(link.source, (degree.get(link.source) ?? 0) + 1);
    degree.set(link.target, (degree.get(link.target) ?? 0) + 1);
  }
  for (const hyperedge of curatedGraph.hyperedges ?? []) {
    for (const id of hyperedge.nodes ?? []) {
      if (!nodeIds.has(id)) fail(`graph.curated.json hyperedge ${hyperedge.id} references missing node ${id}`);
      else degree.set(id, (degree.get(id) ?? 0) + 1);
    }
  }
  const isolates = [...degree].filter(([, count]) => count === 0).map(([id]) => id);
  if (isolates.length) fail(`graph.curated.json has zero-degree nodes: ${isolates.join(', ')}`);
}

const readme = existsSync(README) ? readText(README) : '';
for (const required of ['SKILL.md', 'WORKFLOW.md', 'DECISION_MATRIX.md', 'chain.json', 'action-catalog.json', 'decision-scenarios.json', 'INTEGRATIONS.md', 'PATTERNS.md', 'SOURCES.md']) {
  if (readme && !readme.includes(required)) fail(`${README} should reference ${required}`);
}
for (const file of [WORKFLOW, SKILL_MD]) {
  if (!existsSync(file)) continue;
  const text = readText(file);
  for (const required of ['README.md', 'DECISION_MATRIX.md', 'chain.json', 'action-catalog.json']) {
    if (!text.includes(required)) fail(`${file} should reference ${required}`);
  }
}

for (const file of walkMarkdown(SKILLS_DIR)) {
  const text = readText(file);
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    const loc = `${file}:${index + 1}`;
    if (/\/api-style-review|\/btp-destination-diagnose|\/abap-cloud-review|\/cap-deployment-checklist|\/btp-app-readiness-review/.test(line)) {
      fail(`${loc}: direct plugin slash command remains; capability-gate it`);
    }
    if (/sap_community_search\s*\(/.test(line) && !/only when exposed|when exposed/i.test(line)) {
      fail(`${loc}: sap_community_search must be capability-gated`);
    }
    if (/sap_discovery_center_search\s*\(/.test(line) && !/only when exposed|when exposed/i.test(line)) {
      fail(`${loc}: sap_discovery_center_search must be capability-gated`);
    }
  });
}

function extractSapCalls(text) {
  const calls = [];
  const regexp = /\b(SAP(?:Read|Search|Write|Activate|Navigate|Query|Transport|Git|Context|Lint|Diagnose|Manage))\s*\(/g;
  let match;
  while ((match = regexp.exec(text))) {
    const start = regexp.lastIndex;
    let depth = 1;
    let quote = null;
    let index = start;
    for (; index < text.length; index++) {
      const character = text[index];
      if (quote) {
        if (character === quote && text[index - 1] !== '\\') quote = null;
        continue;
      }
      if (character === '"' || character === "'") quote = character;
      else if (character === '(') depth++;
      else if (character === ')' && --depth === 0) break;
    }
    if (depth === 0) calls.push({ tool: match[1], args: text.slice(start, index), index: match.index });
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
