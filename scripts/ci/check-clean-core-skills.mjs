#!/usr/bin/env node
/** Validate the Clean Core decision contract, ARC-1 examples, and skill coverage. */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import Ajv from 'ajv';
import {
  resolveCleanCorePlan,
  resolveDecision,
  resolveDispatches,
  resolveExecutionPlan,
} from '../resolve-clean-core-decision.mjs';

const SKILLS_DIR = 'skills';
const CLEAN_CORE_DIR = join(SKILLS_DIR, 'sap-erp-clean-core-refactor');
const CHAIN_JSON = join(CLEAN_CORE_DIR, 'chain.json');
const AEM_MODEL = join(CLEAN_CORE_DIR, 'aem-model.json');
const RUNTIME_RESOLVER = join(CLEAN_CORE_DIR, 'runtime', 'resolve-clean-core.mjs');
const RUNTIME_CLI = join(CLEAN_CORE_DIR, 'runtime', 'resolve-plan.mjs');
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

for (const required of [
  CHAIN_JSON,
  AEM_MODEL,
  RUNTIME_RESOLVER,
  RUNTIME_CLI,
  ACTION_CATALOG,
  DECISION_SCENARIOS,
  KNOWLEDGE_RULES,
  CURATED_GRAPH,
  DECISION_MATRIX,
  README,
  WORKFLOW,
  SKILL_MD,
]) {
  if (!existsSync(required)) fail(`${required} is missing`);
}

const chain = existsSync(CHAIN_JSON) ? readJson(CHAIN_JSON) : undefined;
const aemModel = existsSync(AEM_MODEL) ? readJson(AEM_MODEL) : undefined;
const catalog = existsSync(ACTION_CATALOG) ? readJson(ACTION_CATALOG) : undefined;
const scenarios = existsSync(DECISION_SCENARIOS) ? readJson(DECISION_SCENARIOS) : undefined;
const knowledge = existsSync(KNOWLEDGE_RULES) ? readJson(KNOWLEDGE_RULES) : undefined;
const curatedGraph = existsSync(CURATED_GRAPH) ? readJson(CURATED_GRAPH) : undefined;

if (chain) {
  if (chain.version !== 2) fail(`chain.json version must be 2, got ${JSON.stringify(chain.version)}`);
  if (chain.orchestrator !== 'sap-erp-clean-core-refactor') fail('chain.json has the wrong orchestrator');
  if (chain.aemModel !== basename(AEM_MODEL)) fail(`chain.json must reference ${basename(AEM_MODEL)}`);
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

  if (!gates.abap_cloud_target_proven) fail('chain.json needs the abap_cloud_target_proven gate');
  if (!actions.rewrite_on_stack_abap_cloud?.gates?.includes('abap_cloud_target_proven')) {
    fail('rewrite_on_stack_abap_cloud must require abap_cloud_target_proven');
  }
  const onStackDecision = decisions.find((decision) => decision.id === 'ON_STACK_LEVEL_A');
  const onStackFacts = new Set((onStackDecision?.conditions ?? []).map((condition) => condition.fact));
  for (const fact of ['landscape', 'abapCloudTargetPackageApproved', 'abapCloudLanguageVersionProven']) {
    if (!onStackFacts.has(fact)) fail(`ON_STACK_LEVEL_A must require ${fact}`);
  }
  if (chain.landscapes?.btp_abap_environment?.allowedDomains?.includes('embedded_abap_cloud_on_stack')) {
    fail('BTP ABAP Environment cannot be classified as embedded on-stack ABAP Cloud');
  }
  if (!decisions.some((decision) => decision.id === 'SIDE_BY_SIDE_BTP_ABAP')) {
    fail('chain.json is missing SIDE_BY_SIDE_BTP_ABAP');
  }

  if (new Set(decisionIds).size !== decisionIds.length) fail('chain.json has duplicate decision ids');
  if (new Set(precedences).size !== precedences.length) fail('chain.json has duplicate decision precedence values');

  for (const [name, gate] of Object.entries(gates)) {
    if (!['must', 'should'].includes(gate.severity)) fail(`gate ${name} has invalid severity`);
    if (!gate.executor || !gate.fallback) fail(`gate ${name} needs executor and fallback`);
  }

  const allowedExecutions = new Set([
    'read_only',
    'hybrid',
    'manual_handoff',
    'arc1_guarded',
    'arc1_target_guarded',
    'arc1_guarded_composite',
    'documented_exception',
    'delegated_guarded',
    'composite',
    'may_only',
  ]);
  for (const [name, action] of Object.entries(actions)) {
    if (!action.execution) fail(`action ${name} needs execution`);
    else if (!allowedExecutions.has(action.execution)) {
      fail(`action ${name} has unknown execution ${action.execution} (writeBlocked semantics hinge on this vocabulary)`);
    }
    if (!Array.isArray(action.localSkills)) fail(`action ${name} needs localSkills[]`);
    if (!Array.isArray(action.gates) || action.gates.length === 0) fail(`action ${name} needs non-empty gates[]`);
    if (!Array.isArray(action.operationIds)) fail(`action ${name} needs operationIds[]`);
    if (action.externalSkills !== undefined && !Array.isArray(action.externalSkills)) {
      fail(`action ${name} externalSkills must be an array`);
    }
    for (const gate of action.gates ?? []) if (!gateNames.has(gate)) fail(`action ${name} references unknown gate ${gate}`);
    for (const operation of action.operationIds ?? []) {
      if (!operationNames.has(operation)) fail(`action ${name} references unknown operation ${operation}`);
    }
    for (const [phase, phaseGates] of Object.entries(action.gatePhases ?? {})) {
      if (!Array.isArray(phaseGates) || phaseGates.length === 0) fail(`action ${name} gate phase ${phase} needs gates[]`);
      for (const gate of phaseGates ?? []) {
        if (!gateNames.has(gate)) fail(`action ${name} gate phase ${phase} references unknown gate ${gate}`);
        if (!action.gates.includes(gate)) fail(`action ${name} gate phase ${phase} omits ${gate} from action gates[]`);
      }
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
      const supported =
        condition.always === true ||
        (typeof condition.fact === 'string' &&
          (Object.hasOwn(condition, 'equals') || Object.hasOwn(condition, 'notEquals') || Array.isArray(condition.in)));
      if (!supported) fail(`decision ${decision.id} has unsupported condition ${JSON.stringify(condition)}`);
    }
    if (!Array.isArray(decision.evidenceRequired) || decision.evidenceRequired.length === 0) {
      fail(`decision ${decision.id} needs evidenceRequired[]`);
    }
  }

  for (const dispatch of dispatches) {
    const parents = Array.isArray(dispatch.parentActions) ? dispatch.parentActions : [];
    if (dispatch.mode !== undefined && dispatch.mode !== 'mayOnly') {
      fail(`dispatch ${dispatch.condition} has unknown mode ${dispatch.mode}`);
    }
    if (dispatch.mode === 'mayOnly' && parents.length) fail(`MAY-only dispatch ${dispatch.condition} cannot have parents`);
    if (dispatch.mode !== 'mayOnly' && !parents.length) fail(`dispatch ${dispatch.condition} needs parentActions[]`);
    for (const parent of parents) if (!actionNames.has(parent)) fail(`dispatch ${dispatch.condition} has unknown parent ${parent}`);
    if (!actionNames.has(dispatch.action)) fail(`dispatch ${dispatch.condition} has unknown action ${dispatch.action}`);
    if (!Array.isArray(dispatch.conditions) || dispatch.conditions.length === 0) {
      fail(`dispatch ${dispatch.condition} needs structured conditions[]`);
    }
    for (const condition of dispatch.conditions ?? []) {
      const supported =
        condition.always === true ||
        (typeof condition.fact === 'string' &&
          (Object.hasOwn(condition, 'equals') || Object.hasOwn(condition, 'notEquals') || Array.isArray(condition.in)));
      if (!supported) fail(`dispatch ${dispatch.condition} has unsupported condition ${JSON.stringify(condition)}`);
    }
  }

  // Fact-vocabulary closure: every condition fact must be documented in decisionFactCatalog,
  // and every catalog entry must actually be used by a decision, dispatch or the AEM model.
  const factCatalog = chain.decisionFactCatalog && typeof chain.decisionFactCatalog === 'object' ? chain.decisionFactCatalog : {};
  if (!Object.keys(factCatalog).length) fail('chain.json needs a decisionFactCatalog documenting every condition fact');
  const usedConditionFacts = new Set();
  for (const decision of decisions) {
    for (const condition of decision.conditions ?? []) if (condition.fact) usedConditionFacts.add(condition.fact);
  }
  for (const dispatch of dispatches) {
    for (const condition of dispatch.conditions ?? []) if (condition.fact) usedConditionFacts.add(condition.fact);
  }
  for (const fact of usedConditionFacts) {
    if (!factCatalog[fact]) fail(`condition fact ${fact} is missing from decisionFactCatalog`);
  }
  const aemFactNames = new Set([
    ...Object.keys(aemModel?.requiredFacts ?? {}),
    ...Object.values(aemModel?.conditionalFacts ?? {}).flatMap((definitions) => Object.keys(definitions)),
  ]);
  for (const fact of Object.keys(factCatalog)) {
    if (!usedConditionFacts.has(fact) && !aemFactNames.has(fact)) {
      fail(`decisionFactCatalog entry ${fact} is used by no decision, dispatch or AEM fact — remove or wire it`);
    }
  }

  const sideBySideFacts = new Set(chain.sideBySideContract?.requiredDecisionFacts ?? []);
  for (const id of ['SIDE_BY_SIDE_BTP_ABAP', 'SIDE_BY_SIDE_CF', 'SIDE_BY_SIDE_KYMA']) {
    const decision = decisions.find((candidate) => candidate.id === id);
    if (!decision) {
      fail(`chain.json is missing ${id}`);
      continue;
    }
    const decisionFacts = new Set(decision.conditions.map((condition) => condition.fact));
    for (const fact of sideBySideFacts) {
      if (!decisionFacts.has(fact)) fail(`${id} must require side-by-side Level A fact ${fact}`);
    }
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

if (aemModel && chain) {
  if (aemModel.version !== 1) fail('aem-model.json version must be 1');
  if (!Array.isArray(aemModel.sourcePages) || !aemModel.sourcePages.every(Number.isInteger)) {
    fail('aem-model.json needs integer sourcePages[]');
  }
  const allowedFactTypes = new Set(['boolean', 'string', 'stringArray', 'enum']);
  for (const [name, definition] of Object.entries(aemModel.requiredFacts ?? {})) {
    if (!allowedFactTypes.has(definition.type)) fail(`AEM fact ${name} has invalid type ${definition.type}`);
    if (definition.type === 'enum' && (!Array.isArray(definition.values) || !definition.values.length)) {
      fail(`AEM enum fact ${name} needs values[]`);
    }
  }
  for (const [domain, definitions] of Object.entries(aemModel.conditionalFacts ?? {})) {
    if (!chain.targetDomains.includes(domain)) fail(`AEM conditional facts reference unknown domain ${domain}`);
    for (const [name, definition] of Object.entries(definitions)) {
      if (!allowedFactTypes.has(definition.type)) {
        fail(`AEM conditional fact ${name} has invalid type ${definition.type}`);
      }
      if (definition.type === 'enum' && (!Array.isArray(definition.values) || !definition.values.length)) {
        fail(`AEM conditional enum fact ${name} needs values[]`);
      }
    }
  }
  const conditionGroups = [
    aemModel.keyUserSelector?.conditions,
    ...Object.values(aemModel.signals ?? {}).map((signals) =>
      signals.map(({ reason: _reason, ...condition }) => condition),
    ),
    ...(aemModel.sideBySideSelectors ?? []).map((selector) => selector.conditions),
  ];
  for (const conditions of conditionGroups) {
    for (const condition of conditions ?? []) {
      if (!aemModel.requiredFacts?.[condition.fact]) fail(`AEM condition references unknown fact ${condition.fact}`);
      const supported = Object.hasOwn(condition, 'equals') || Array.isArray(condition.in);
      if (!supported) fail(`AEM condition is unsupported: ${JSON.stringify(condition)}`);
    }
  }
  for (const selector of [aemModel.keyUserSelector, ...(aemModel.sideBySideSelectors ?? [])]) {
    if (!chain.targetDomains.includes(selector.domain)) {
      fail(`AEM selector references unknown domain ${selector.domain}`);
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
      if (Array.isArray(scenario.expectedDispatches) && actual) {
        const resolved = resolveDispatches(chain, actual.action, scenario.facts).map((dispatch) => dispatch.action);
        if (JSON.stringify(resolved) !== JSON.stringify(scenario.expectedDispatches)) {
          fail(
            `decision scenario ${scenario.id} expected dispatches ${JSON.stringify(scenario.expectedDispatches)}, got ${JSON.stringify(resolved)}`,
          );
        }
      }
      if (Array.isArray(scenario.expectedActionPlan) && actual) {
        const resolved = resolveExecutionPlan(chain, actual.action, scenario.facts).map((action) => action.action);
        if (JSON.stringify(resolved) !== JSON.stringify(scenario.expectedActionPlan)) {
          fail(
            `decision scenario ${scenario.id} expected action plan ${JSON.stringify(scenario.expectedActionPlan)}, got ${JSON.stringify(resolved)}`,
          );
        }
      }
    } catch (error) {
      fail(`decision scenario ${scenario.id} failed: ${error.message}`);
    }
  }
  for (const scenario of scenarios.runtimeScenarios ?? []) {
    if (!aemModel || !scenario.facts || !scenario.expectedDecision || !scenario.expectedAemStatus) {
      fail(`runtime decision scenario ${scenario.id} is incomplete`);
      continue;
    }
    try {
      const result = resolveCleanCorePlan(chain, aemModel, scenario.facts);
      if (result.aem.status !== scenario.expectedAemStatus) {
        fail(`runtime scenario ${scenario.id} expected AEM ${scenario.expectedAemStatus}, got ${result.aem.status}`);
      }
      if (scenario.expectedDomain && result.aem.selectedDomain !== scenario.expectedDomain) {
        fail(
          `runtime scenario ${scenario.id} expected domain ${scenario.expectedDomain}, got ${result.aem.selectedDomain}`,
        );
      }
      if (result.decision.id !== scenario.expectedDecision) {
        fail(`runtime scenario ${scenario.id} expected ${scenario.expectedDecision}, got ${result.decision.id}`);
      }
      if (Array.isArray(scenario.expectedActionPlan)) {
        const actions = result.actions.map((action) => action.action);
        if (JSON.stringify(actions) !== JSON.stringify(scenario.expectedActionPlan)) {
          fail(
            `runtime scenario ${scenario.id} expected action plan ${JSON.stringify(scenario.expectedActionPlan)}, got ${JSON.stringify(actions)}`,
          );
        }
      }
    } catch (error) {
      fail(`runtime decision scenario ${scenario.id} failed: ${error.message}`);
    }
  }

  // Replay coverage: every non-MAY-only specialized dispatch must be exercised by at least one
  // scenario, so a dispatch can never silently rot without a locking scenario.
  const coveredDispatchConditions = new Set();
  const collectCoverage = (facts, rootAction) => {
    try {
      for (const node of resolveExecutionPlan(chain, rootAction, facts)) {
        if (node.selectedBy && node.selectedBy !== 'decision') coveredDispatchConditions.add(node.selectedBy);
      }
    } catch {
      // scenario replay above already reported resolver failures
    }
  };
  for (const scenario of scenarios.scenarios ?? []) {
    const decision = resolveDecision(chain, scenario.facts);
    if (decision) collectCoverage(scenario.facts, decision.action);
  }
  for (const scenario of scenarios.runtimeScenarios ?? []) {
    if (!aemModel) break;
    try {
      const result = resolveCleanCorePlan(chain, aemModel, scenario.facts);
      for (const node of result.actions ?? []) {
        if (node.selectedBy && node.selectedBy !== 'decision') coveredDispatchConditions.add(node.selectedBy);
      }
    } catch {
      // already reported
    }
  }
  for (const dispatch of chain.specializedDispatches ?? []) {
    if (dispatch.mode === 'mayOnly') continue;
    if (!coveredDispatchConditions.has(dispatch.condition)) {
      fail(`specialized dispatch "${dispatch.condition}" is exercised by no decision/runtime scenario`);
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
    if (new Set(operation.requiredInputs ?? []).size !== (operation.requiredInputs ?? []).length) {
      fail(`operation ${id} has duplicate requiredInputs`);
    }
    for (const input of operation.requiredInputs ?? []) {
      if (!Object.hasOwn(operation.exampleArgs ?? {}, input)) {
        fail(`operation ${id} requires input ${input}, but exampleArgs has no matching property`);
      }
    }
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
    if (
      operation.tool === 'SAPWrite' &&
      operation.exampleArgs?.action === 'create' &&
      ['SKTD', 'KTD'].includes(operation.exampleArgs?.type)
    ) {
      const supportedRefTypes = new Set([
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
      const refType = String(operation.exampleArgs.refObjectType ?? '').toUpperCase();
      const refName = String(operation.exampleArgs.refObjectName ?? operation.exampleArgs.name);
      if (!supportedRefTypes.has(refType)) fail(`operation ${id} has unsupported SKTD refObjectType ${refType || '(missing)'}`);
      if (String(operation.exampleArgs.name).toUpperCase() !== refName.toUpperCase()) {
        fail(`operation ${id} SKTD name must match refObjectName`);
      }
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
for (const required of ['SKILL.md', 'WORKFLOW.md', 'DECISION_MATRIX.md', 'chain.json', 'aem-model.json', 'action-catalog.json', 'decision-scenarios.json', 'INTEGRATIONS.md', 'PATTERNS.md', 'SOURCES.md']) {
  if (readme && !readme.includes(required)) fail(`${README} should reference ${required}`);
}
for (const file of [WORKFLOW, SKILL_MD]) {
  if (!existsSync(file)) continue;
  const text = readText(file);
  for (const required of ['README.md', 'DECISION_MATRIX.md', 'chain.json', 'action-catalog.json']) {
    if (!text.includes(required)) fail(`${file} should reference ${required}`);
  }
}

if (existsSync(WORKFLOW)) {
  const workflow = readText(WORKFLOW);
  for (const required of [
    '## Operator quickstart',
    'SAP_ALLOW_WRITES=true',
    'SAP_ALLOWED_PACKAGES=',
    'abapLanguageVersion="cloudDevelopment"',
    'Approve decisions per logical unit',
  ]) {
    if (!workflow.includes(required)) fail(`${WORKFLOW} should include operator quickstart marker ${required}`);
  }
}
for (const file of [README, SKILL_MD]) {
  if (existsSync(file) && !readText(file).includes('WORKFLOW.md#operator-quickstart')) {
    fail(`${file} should link to the WORKFLOW operator quickstart`);
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
