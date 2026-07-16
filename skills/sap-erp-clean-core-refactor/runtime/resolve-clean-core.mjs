/** Resolve Clean Core AEM, decisions and recursive execution plans. */

function matchesCondition(condition, facts) {
  if (condition.always === true) return true;
  const actual = facts[condition.fact];
  if (Object.hasOwn(condition, 'equals')) return actual === condition.equals;
  if (Object.hasOwn(condition, 'notEquals')) return actual !== condition.notEquals;
  if (Array.isArray(condition.in)) return condition.in.includes(actual);
  throw new Error(`Unsupported Clean Core condition: ${JSON.stringify(condition)}`);
}

function matchesConditions(conditions, facts) {
  return conditions.every((condition) => matchesCondition(condition, facts));
}

function validateFact(name, definition, value) {
  if (definition.type === 'boolean') return typeof value === 'boolean';
  if (definition.type === 'string') return typeof value === 'string' && value.trim().length > 0;
  if (definition.type === 'stringArray') {
    return (
      Array.isArray(value) &&
      value.length > 0 &&
      value.every((item) => typeof item === 'string' && item.trim())
    );
  }
  if (definition.type === 'enum') return definition.values.includes(value);
  throw new Error(`Unsupported AEM fact type for ${name}: ${definition.type}`);
}

function matchedSignals(signals, facts) {
  return signals.filter((signal) => matchesCondition(signal, facts));
}

/**
 * @param {string} status
 * @param {Record<string, any>} details
 * @returns {{ status: string, methodology: string, [key: string]: any }}
 */
function aemResult(status, details = {}) {
  return {
    status,
    methodology: 'SAP Application Extension Methodology',
    ...details,
  };
}

/** Resolve an AEM target domain from the complete structured architecture questionnaire. */
export function resolveAem(aemModel, chain, facts) {
  const invalidFacts = [];
  const missingFacts = [];
  for (const [name, definition] of Object.entries(aemModel.requiredFacts ?? {})) {
    if (!Object.hasOwn(facts, name)) missingFacts.push(name);
    else if (!validateFact(name, definition, facts[name])) invalidFacts.push(name);
  }

  if (missingFacts.length || invalidFacts.length) {
    return aemResult('research_required', {
      selectedDomain: 'research',
      missingFacts,
      invalidFacts,
      conflicts: [],
      rationale: ['The AEM questionnaire is incomplete or contains invalid values.'],
      sourcePages: aemModel.sourcePages,
    });
  }

  const onStackSignals = matchedSignals(aemModel.signals.onStack, facts);
  const sideBySideSignals = matchedSignals(aemModel.signals.sideBySide, facts);
  const signalEvidence = {
    onStack: onStackSignals.map(({ fact, reason }) => ({ fact, reason })),
    sideBySide: sideBySideSignals.map(({ fact, reason }) => ({ fact, reason })),
  };
  let selectedDomain;
  const conflicts = [];

  if (matchesConditions(aemModel.keyUserSelector.conditions, facts) && !sideBySideSignals.length) {
    selectedDomain = aemModel.keyUserSelector.domain;
  } else if (matchesConditions(aemModel.keyUserSelector.conditions, facts)) {
    conflicts.push(
      'Key-user fit conflicts with evidenced side-by-side drivers; split responsibilities or re-scope before selecting key user extensibility.',
    );
  } else if (onStackSignals.length && sideBySideSignals.length) {
    if (facts.responsibilitySplitDefined) selectedDomain = 'hybrid';
    else conflicts.push('On-stack and side-by-side drivers both exist, but no responsibility split is defined.');
  } else if (onStackSignals.length) {
    selectedDomain = facts.classicRetentionApproved ? 'classic_on_stack' : 'embedded_abap_cloud_on_stack';
  } else if (sideBySideSignals.length) {
    if (facts.implementationModel === 'non_cap') {
      conflicts.push(
        'implementationModel non_cap is recognized by AEM but has no executable side-by-side chain yet; keep research_required or choose cap/abap_cloud.',
      );
    } else {
      const selectors = aemModel.sideBySideSelectors.filter((selector) =>
        matchesConditions(selector.conditions, facts),
      );
      if (selectors.length === 1) selectedDomain = selectors[0].domain;
      else if (selectors.length > 1) {
        conflicts.push('More than one side-by-side implementation/runtime selector matched.');
      }
      else conflicts.push('The side-by-side implementation model and runtime are missing, undecided or incompatible.');
    }
  } else {
    conflicts.push('No authoritative on-stack or side-by-side AEM driver was evidenced.');
  }

  const conditionalDefinitions = aemModel.conditionalFacts?.[selectedDomain] ?? {};
  for (const [name, definition] of Object.entries(conditionalDefinitions)) {
    if (!Object.hasOwn(facts, name)) missingFacts.push(name);
    else if (!validateFact(name, definition, facts[name])) invalidFacts.push(name);
  }
  if (
    selectedDomain === 'side_by_side_btp_abap' &&
    facts.sourceArc1Context &&
    facts.targetArc1Context &&
    facts.sourceArc1Context === facts.targetArc1Context
  ) {
    conflicts.push('BTP ABAP Environment requires distinct source and target ARC-1 contexts.');
  }

  if (selectedDomain && facts.selectedDomain && facts.selectedDomain !== selectedDomain) {
    conflicts.push(
      `Provided selectedDomain ${facts.selectedDomain} conflicts with the AEM result ${selectedDomain}.`,
    );
  }

  const allowedDomains = chain.landscapes?.[facts.landscape]?.allowedDomains ?? [];
  if (selectedDomain && !allowedDomains.includes(selectedDomain)) {
    conflicts.push(`Domain ${selectedDomain} is not allowed for landscape ${facts.landscape}.`);
  }

  if (!selectedDomain || missingFacts.length || invalidFacts.length || conflicts.length) {
    return aemResult('research_required', {
      selectedDomain: 'research',
      candidateDomain: selectedDomain,
      missingFacts,
      invalidFacts,
      conflicts,
      signals: signalEvidence,
      rationale: [...onStackSignals, ...sideBySideSignals].map((signal) => signal.reason),
      sourcePages: aemModel.sourcePages,
    });
  }

  return aemResult('resolved', {
    selectedDomain,
    missingFacts: [],
    invalidFacts: [],
    conflicts: [],
    signals: signalEvidence,
    rationale: [
      ...onStackSignals.map((signal) => signal.reason),
      ...sideBySideSignals.map((signal) => signal.reason),
    ],
    targetSolution: {
      businessRequirement: facts.businessRequirement,
      touchpoints: facts.touchpoints,
      domain: selectedDomain,
      implementationModel: facts.implementationModel,
      runtime: facts.sideBySideRuntime,
      sourceArc1Context: facts.sourceArc1Context,
      targetArc1Context: facts.targetArc1Context,
    },
    derivedFacts: {},
    derivedGates: {
      aem_recorded: true,
      // The gate derives ONLY from operator/probe-proven evidence, never from domain selection alone.
      ...(selectedDomain === 'side_by_side_btp_abap' && facts.btpAbapTargetConnected === true
        ? { btp_abap_target_connected: true }
        : {}),
    },
    sourcePages: aemModel.sourcePages,
  });
}

export function resolveDecision(chain, facts) {
  if (!facts.sourceLevel) throw new Error('sourceLevel is required');
  return [...chain.decisions]
    .sort((left, right) => left.precedence - right.precedence)
    .find(
      (decision) =>
        decision.sourceLevels.includes(facts.sourceLevel) &&
        matchesConditions(decision.conditions, facts),
    );
}

export function resolveDispatches(chain, parentAction, facts) {
  return (chain.specializedDispatches ?? []).filter(
    (dispatch) =>
      dispatch.mode !== 'mayOnly' &&
      dispatch.parentActions.includes(parentAction) &&
      matchesConditions(dispatch.conditions ?? [], facts),
  );
}

/** Expand every matching specialized dispatch recursively and reject cycles. */
export function resolveExecutionPlan(chain, rootAction, facts) {
  const nodes = [];
  const byAction = new Map();
  const active = new Set();

  function visit(actionName, parentAction, dispatch, depth) {
    if (active.has(actionName)) throw new Error(`Clean Core dispatch cycle detected at ${actionName}`);
    const existing = byAction.get(actionName);
    if (existing) {
      if (parentAction && !existing.parents.includes(parentAction)) existing.parents.push(parentAction);
      return;
    }

    const action = chain.actions?.[actionName];
    if (!action) throw new Error(`Unknown Clean Core action: ${actionName}`);
    const gateEvidence = facts.gates ?? {};
    const gates = action.gates.map((gate) => {
      const catalogEntry = chain.gateCatalog?.[gate];
      if (!catalogEntry) throw new Error(`Unknown Clean Core gate: ${gate} (missing from gateCatalog)`);
      return {
        gate,
        severity: catalogEntry.severity,
        status: gateEvidence[gate] === true ? 'passed' : 'pending',
      };
    });
    const node = {
      order: nodes.length + 1,
      action: actionName,
      parents: parentAction ? [parentAction] : [],
      depth,
      selectedBy: dispatch?.condition ?? 'decision',
      execution: action.execution,
      localSkills: action.localSkills,
      externalSkills: action.externalSkills ?? [],
      operationIds: action.operationIds,
      gates,
      gatePhases: action.gatePhases ?? {},
      writeBlocked:
        action.execution !== 'read_only' && gates.some((gate) => gate.severity === 'must' && gate.status !== 'passed'),
    };
    nodes.push(node);
    byAction.set(actionName, node);

    active.add(actionName);
    for (const childDispatch of resolveDispatches(chain, actionName, facts)) {
      visit(childDispatch.action, actionName, childDispatch, depth + 1);
    }
    active.delete(actionName);
  }

  visit(rootAction, undefined, undefined, 0);
  return nodes;
}

function decisionById(chain, id) {
  const decision = chain.decisions.find((candidate) => candidate.id === id);
  if (!decision) throw new Error(`Clean Core decision ${id} is missing`);
  return decision;
}

const VALID_SOURCE_LEVELS = new Set(['A', 'B', 'C', 'D', 'Unknown']);
// Domains that never bind to one landscape: they keep or defer the current placement.
const LANDSCAPE_EXEMPT_DOMAINS = new Set(['current_allowed_domain', 'research']);

/** Resolve standard-first, AEM, the ordered decision, recursive actions, operations and gates. */
export function resolveCleanCorePlan(chain, aemModel, facts) {
  if (!facts.sourceLevel) throw new Error('sourceLevel is required');

  const planConflicts = [];
  if (!VALID_SOURCE_LEVELS.has(facts.sourceLevel)) {
    planConflicts.push(`sourceLevel ${JSON.stringify(facts.sourceLevel)} is not one of A, B, C, D, Unknown.`);
  }
  if (facts.landscape !== undefined && !chain.landscapes?.[facts.landscape]) {
    planConflicts.push(`landscape ${JSON.stringify(facts.landscape)} is not a known landscape.`);
  }

  let aem;
  let decision;
  let resolvedFacts = { ...facts };
  if (facts.standardParity === 'acceptable') {
    aem = aemResult('not_required', {
      selectedDomain: 'standard',
      rationale: ['SAP standard satisfies the requirement with acceptable parity.'],
      sourcePages: aemModel.sourcePages,
    });
    decision = resolveDecision(chain, resolvedFacts);
  } else if (facts.standardParity !== 'gap') {
    aem = aemResult('research_required', {
      selectedDomain: 'research',
      missingFacts: facts.standardParity === undefined ? ['standardParity'] : [],
      invalidFacts: [],
      conflicts: ['SAP standard parity is not proven as acceptable or gap.'],
      rationale: [],
      sourcePages: aemModel.sourcePages,
    });
    decision = decisionById(chain, 'ANY_TO_RESEARCH');
  } else if (facts.unusedProven === true) {
    aem = aemResult('not_required', {
      selectedDomain: 'retired',
      rationale: ['Runtime and static evidence prove that the unit can be retired.'],
      sourcePages: aemModel.sourcePages,
    });
    decision = resolveDecision(chain, resolvedFacts);
  } else if (typeof facts.unusedProven !== 'boolean') {
    aem = aemResult('research_required', {
      selectedDomain: 'research',
      missingFacts: ['unusedProven'],
      invalidFacts: [],
      conflicts: [],
      rationale: ['Usage must be assessed before selecting an extension architecture.'],
      sourcePages: aemModel.sourcePages,
    });
    decision = decisionById(chain, 'ANY_TO_RESEARCH');
  } else {
    aem = resolveAem(aemModel, chain, facts);
    if (aem.status === 'resolved') {
      // Operator-provided facts and gate evidence always win over AEM-derived values:
      // an explicit false must never be silently flipped to passed.
      resolvedFacts = {
        ...aem.derivedFacts,
        ...facts,
        selectedDomain: aem.selectedDomain,
        gates: { ...aem.derivedGates, ...(facts.gates ?? {}) },
      };
      decision = resolveDecision(chain, resolvedFacts);
    } else {
      decision = decisionById(chain, 'ANY_TO_RESEARCH');
    }
  }

  if (!decision) {
    planConflicts.push('No decision conditions matched the evidenced facts; falling back to research.');
    decision = decisionById(chain, 'ANY_TO_RESEARCH');
  }

  // Landscape ceiling applies on EVERY branch, including the AEM-bypassing
  // standard-parity and unused shortcuts (the AEM path also checks it earlier).
  const allowedDomains = chain.landscapes?.[facts.landscape]?.allowedDomains;
  if (
    allowedDomains &&
    !LANDSCAPE_EXEMPT_DOMAINS.has(decision.targetDomain) &&
    !allowedDomains.includes(decision.targetDomain)
  ) {
    planConflicts.push(
      `Decision ${decision.id} targets domain ${decision.targetDomain}, which landscape ${facts.landscape} does not allow.`,
    );
    decision = decisionById(chain, 'ANY_TO_RESEARCH');
  }
  if (planConflicts.length && decision.id !== 'ANY_TO_RESEARCH') {
    decision = decisionById(chain, 'ANY_TO_RESEARCH');
  }

  const actions = resolveExecutionPlan(chain, decision.action, resolvedFacts);
  return {
    version: 1,
    orchestrator: chain.orchestrator,
    aem,
    decision: {
      id: decision.id,
      targetLevel: decision.targetLevel,
      targetDomain: decision.targetDomain,
      action: decision.action,
      evidenceRequired: decision.evidenceRequired,
    },
    conflicts: planConflicts,
    actions,
    writeBlocked: actions.some((action) => action.writeBlocked),
  };
}
