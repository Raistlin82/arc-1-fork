import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  resolveAem,
  resolveCleanCorePlan,
  resolveDecision,
  resolveDispatches,
  resolveExecutionPlan,
} from '../../../scripts/resolve-clean-core-decision.mjs';
import { run } from '../../../scripts/resolve-clean-core-plan.mjs';

const chain = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/chain.json', 'utf8'));
const aemModel = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/aem-model.json', 'utf8'));
const decisionScenarios = JSON.parse(
  readFileSync('skills/sap-erp-clean-core-refactor/decision-scenarios.json', 'utf8'),
);

const levelABtpFacts = {
  sourceLevel: 'C',
  standardParity: 'gap',
  unusedProven: false,
  keyUserFit: false,
  selectedDomain: 'side_by_side_cf',
  implementationModel: 'cap',
  serviceBoundary: 'existing_released_api',
  releasedIntegrationBoundary: true,
  allTouchpointsReleased: true,
  technologyAllowed: true,
  unreleasedSapAccess: false,
  directS4DatabaseAccess: false,
  dataOwnership: 's4',
  dataConsistencyPlanDefined: true,
  transactionBoundaryDefined: true,
  identityModelDefined: true,
  apiOrEventContractGoverned: true,
  lifecycleIndependent: true,
  runtimeFitProven: true,
  erpRetirementOrBoundaryPlanDefined: true,
  capServiceRequired: true,
  uiTarget: 'cap_fiori_elements',
};

describe('Clean Core side-by-side decisions', () => {
  it('requires the complete Level A BTP fact set', () => {
    expect(resolveDecision(chain, levelABtpFacts)?.id).toBe('SIDE_BY_SIDE_CF');

    const missingOwnership: Record<string, unknown> = { ...levelABtpFacts };
    delete missingOwnership.dataOwnership;
    expect(resolveDecision(chain, missingOwnership)?.id).toBe('ANY_TO_RESEARCH');
  });

  it('does not dispatch CAP persistence for S/4-owned data', () => {
    const actions = resolveDispatches(chain, 'extract_to_side_by_side_cf', levelABtpFacts).map(
      (dispatch: { action: string }) => dispatch.action,
    );

    expect(actions).toEqual(['generate_cap_services', 'scaffold_cap_fiori_elements', 'verify_cap_solution']);
  });

  it('dispatches persistence and Kyma verification for replicated CAP data', () => {
    const facts = {
      ...levelABtpFacts,
      selectedDomain: 'side_by_side_kyma',
      serviceBoundary: 'released_event',
      dataOwnership: 'replicated',
      uiTarget: 'none',
    };

    const decision = resolveDecision(chain, facts);
    expect(decision?.id).toBe('SIDE_BY_SIDE_KYMA');
    expect(
      resolveDispatches(chain, decision.action, facts).map((dispatch: { action: string }) => dispatch.action),
    ).toEqual(['model_cap_persistence', 'generate_cap_services', 'verify_cap_solution']);
  });

  it('never classifies SAP BTP ABAP Environment as embedded on-stack ABAP Cloud', () => {
    expect(
      resolveDecision(chain, {
        sourceLevel: 'C',
        selectedDomain: 'embedded_abap_cloud_on_stack',
        landscape: 'btp_abap_environment',
        releasedSuccessor: true,
        abapCloudTargetPackageApproved: true,
        abapCloudLanguageVersionProven: true,
      })?.id,
    ).toBe('ANY_TO_RESEARCH');
  });
});

const aemBase = {
  sourceLevel: 'C',
  standardParity: 'gap',
  unusedProven: false,
  landscape: 's4_private_cloud',
  businessRequirement: 'Extend sales-order processing',
  touchpoints: ['sales-order-save'],
  targetUsers: 'sap_internal',
  keyUserFit: false,
  releasedExtensionPoint: false,
  transactionConsistencyRequired: true,
  mostDataInS4: true,
  extendExistingS4Application: true,
  highVolumeLocalDataRequired: false,
  saasOrPartnerProduct: false,
  independentOperationsRequired: false,
  independentLifecycleRequired: false,
  multiSystemOrchestrationRequired: false,
  mobileOrFreestyleUxRequired: false,
  responsibilitySplitDefined: false,
  classicRetentionApproved: false,
  implementationModel: 'undecided',
  sideBySideRuntime: 'undecided',
};

describe('Clean Core AEM resolver', () => {
  it('derives embedded on-stack ABAP Cloud from S/4 transaction drivers', () => {
    const result = resolveAem(aemModel, chain, aemBase);

    expect(result.status).toBe('resolved');
    expect(result.selectedDomain).toBe('embedded_abap_cloud_on_stack');
    expect(result.signals.onStack.map((signal: { fact: string }) => signal.fact)).toContain(
      'transactionConsistencyRequired',
    );
  });

  it('derives BTP ABAP Environment as side-by-side', () => {
    const result = resolveAem(aemModel, chain, {
      ...aemBase,
      targetUsers: 'external_consumer',
      transactionConsistencyRequired: false,
      mostDataInS4: false,
      extendExistingS4Application: false,
      independentOperationsRequired: true,
      independentLifecycleRequired: true,
      implementationModel: 'abap_cloud',
      sideBySideRuntime: 'btp_abap',
      sourceArc1Context: 's4-source',
      targetArc1Context: 'btp-abap-target',
      targetLandscape: 'btp_abap_environment',
    });

    expect(result.status).toBe('resolved');
    expect(result.selectedDomain).toBe('side_by_side_btp_abap');
    expect(result.derivedFacts).toEqual({ btpAbapTargetConnected: true });
    expect(result.derivedGates).toEqual({ aem_recorded: true, btp_abap_target_connected: true });
  });

  it('blocks BTP ABAP Environment when source and target ARC-1 contexts are reused', () => {
    const result = resolveAem(aemModel, chain, {
      ...aemBase,
      targetUsers: 'external_consumer',
      transactionConsistencyRequired: false,
      mostDataInS4: false,
      extendExistingS4Application: false,
      independentOperationsRequired: true,
      implementationModel: 'abap_cloud',
      sideBySideRuntime: 'btp_abap',
      sourceArc1Context: 'same-context',
      targetArc1Context: 'same-context',
      targetLandscape: 'btp_abap_environment',
    });

    expect(result.status).toBe('research_required');
    expect(result.conflicts).toContain('BTP ABAP Environment requires distinct source and target ARC-1 contexts.');
  });

  it('blocks conflicting on-stack and side-by-side drivers without a responsibility split', () => {
    const result = resolveAem(aemModel, chain, {
      ...aemBase,
      targetUsers: 'mixed',
      independentOperationsRequired: true,
      mobileOrFreestyleUxRequired: true,
    });

    expect(result.status).toBe('research_required');
    expect(result.selectedDomain).toBe('research');
    expect(result.conflicts).toContain(
      'On-stack and side-by-side drivers both exist, but no responsibility split is defined.',
    );
  });

  it('reports every missing questionnaire fact instead of accepting a domain hint', () => {
    const result = resolveAem(aemModel, chain, {
      selectedDomain: 'side_by_side_cf',
      landscape: 's4_private_cloud',
    });

    expect(result.status).toBe('research_required');
    expect(result.missingFacts).toContain('businessRequirement');
    expect(result.missingFacts).toContain('implementationModel');
  });
});

describe('Clean Core runtime plan resolver', () => {
  it('derives the BTP ABAP target connection fact and gate from distinct contexts', () => {
    const facts = decisionScenarios.runtimeScenarios.find(
      (scenario: { id: string }) => scenario.id === 'aem_side_by_side_btp_abap',
    ).facts;
    const result = resolveCleanCorePlan(chain, aemModel, facts);
    const targetGate = result.actions[0].gates.find(
      (gate: { gate: string }) => gate.gate === 'btp_abap_target_connected',
    );

    expect(result.decision.id).toBe('SIDE_BY_SIDE_BTP_ABAP');
    expect(targetGate.status).toBe('passed');
    expect(result.actions[0].externalSkills).toEqual([
      'sap-abap',
      'sap-abap-cds',
      'sap-btp-best-practices',
      'sap-btp-developer-guide',
    ]);
  });

  it('expands hybrid dispatches recursively', () => {
    const facts = {
      ...aemBase,
      targetUsers: 'mixed',
      independentOperationsRequired: true,
      independentLifecycleRequired: true,
      mobileOrFreestyleUxRequired: true,
      responsibilitySplitDefined: true,
      implementationModel: 'cap',
      sideBySideRuntime: 'cf',
      releasedIntegrationBoundary: true,
      dataOwnership: 's4',
      transactionBoundaryDefined: true,
      identityModelDefined: true,
      capServiceRequired: true,
      uiTarget: 'cap_fiori_elements',
    };

    const result = resolveCleanCorePlan(chain, aemModel, facts);

    expect(result.decision.id).toBe('HYBRID');
    expect(result.actions.map((action: { action: string }) => action.action)).toEqual([
      'hybrid_extension',
      'extract_to_side_by_side_cf',
      'generate_cap_services',
      'scaffold_cap_fiori_elements',
      'verify_cap_solution',
    ]);
    expect(result.writeBlocked).toBe(true);
  });

  it('rejects recursive dispatch cycles', () => {
    const cyclicChain = {
      gateCatalog: { approved: { severity: 'must' } },
      actions: {
        first: { execution: 'read_only', localSkills: [], operationIds: [], gates: ['approved'] },
        second: { execution: 'read_only', localSkills: [], operationIds: [], gates: ['approved'] },
      },
      specializedDispatches: [
        { condition: 'first to second', conditions: [{ always: true }], parentActions: ['first'], action: 'second' },
        { condition: 'second to first', conditions: [{ always: true }], parentActions: ['second'], action: 'first' },
      ],
    };

    expect(() => resolveExecutionPlan(cyclicChain, 'first', {})).toThrow('dispatch cycle');
  });

  it('exposes the runtime resolver through the clean-core CLI', () => {
    const result = run(['--facts', '-', '--compact'], JSON.stringify({ ...aemBase, sourceLevel: 'Unknown' }));
    const plan = JSON.parse(result.output);

    expect(result.exitCode).toBe(0);
    expect(plan.aem.selectedDomain).toBe('embedded_abap_cloud_on_stack');
    expect(plan.decision.id).toBe('ANY_TO_RESEARCH');
    expect(plan.actions.map((action: { action: string }) => action.action)).toEqual(['research_required']);
  });
});
