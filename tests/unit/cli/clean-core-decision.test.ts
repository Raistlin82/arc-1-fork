import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { resolveDecision, resolveDispatches } from '../../../scripts/resolve-clean-core-decision.mjs';

const chain = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/chain.json', 'utf8'));

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
});
