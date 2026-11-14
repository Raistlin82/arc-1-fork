import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  checkTargetLevel,
  resolveCleanCorePlan,
  resolveUpgradeAssessment,
} from '../../../scripts/resolve-clean-core-decision.mjs';
import { run } from '../../../skills/sap-erp-clean-core-refactor/runtime/resolve-upgrade.mjs';

const chain = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/chain.json', 'utf8'));
const aemModel = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/aem-model.json', 'utf8'));
const beforeInput = JSON.parse(readFileSync('tests/fixtures/clean-core/upgrade-before.json', 'utf8'));
const afterInput = JSON.parse(readFileSync('tests/fixtures/clean-core/upgrade-after.json', 'utf8'));

type Unit = {
  name: string;
  proposal?: string;
  rule?: string;
  stayReason?: string | null;
  effort?: { band: string; lowPd: number; highPd: number } | null;
  driver?: string;
  rank?: number | null;
  decision?: string;
  phaseFit?: string;
  order?: number;
  targetLevelCheck?: string;
};

type Assessment = {
  status: string;
  kind: string;
  action: string | null;
  conflicts: string[];
  counts: Record<string, number>;
  effort?: { lowPd: number; highPd: number };
  units: Unit[];
};
type Plan = { decision: { id: string }; targetLevelCheck?: Record<string, unknown> };
const assess = (input: unknown): Assessment =>
  resolveUpgradeAssessment(chain, aemModel, input) as unknown as Assessment;
const plan = (facts: unknown): Plan => resolveCleanCorePlan(chain, aemModel, facts) as unknown as Plan;
const level = (requested: unknown, decided: string) =>
  (checkTargetLevel(chain, requested, decided) as { status: string } | undefined)?.status;

describe('Clean Core upgrade mode, before the upgrade', () => {
  const result = assess(beforeInput);
  const units = result.units;

  it('ranks the units whose debt costs upgrade effort, business modifications first', () => {
    expect(result.status).toBe('resolved');
    expect(result.action).toBe('prioritize_before_upgrade');
    expect(units.map((u) => [u.order, u.name, u.driver, u.phaseFit])).toEqual([
      [1, 'ZSD_ORDER_EXIT', 'business_modification', 'before'],
      [2, 'ZMM_PO_IMPLICIT', 'implicit_enhancement', 'before'],
      [3, 'ZCL_SD_PRICING', 'changed_internal_dependency', 'before'],
      [4, 'ZPP_UTIL', 'unverified_internal_dependency', 'before'],
      [5, 'ZCL_FI_POSTING', 'changed_internal_dependency', 'after'],
      [6, 'ZCL_HR_REPORT', 'none', 'after'],
    ]);
  });

  it('decides every unit with the existing decisions, inventing none', () => {
    const ids = new Set(chain.decisions.map((d: { id: string }) => d.id));
    for (const unit of units) expect(ids.has(unit.decision)).toBe(true);
    expect(units.find((u) => u.name === 'ZSD_ORDER_EXIT')?.decision).toBe('STANDARD_FIRST');
    expect(units.find((u) => u.name === 'ZMM_PO_IMPLICIT')?.decision).toBe('ANY_TO_REMOVED');
    // incomplete evidence is research, never a guess
    expect(units.find((u) => u.name === 'ZPP_UTIL')?.decision).toBe('ANY_TO_RESEARCH');
  });

  it('moves to the after phase a unit whose successor exists only in the target release', () => {
    const unit = units.find((u) => u.name === 'ZCL_FI_POSTING');
    expect(unit?.decision).toBe('ON_STACK_LEVEL_A');
    expect(unit?.phaseFit).toBe('after');
    expect(units.find((u) => u.name === 'ZCL_SD_PRICING')?.phaseFit).toBe('before');
  });
});

describe('Clean Core upgrade mode, after the upgrade', () => {
  const result = assess(afterInput);
  const units = result.units;

  it('counts the units re-read and the proposals: rise to A, rise to B, stay', () => {
    expect(result.status).toBe('resolved');
    expect(result.kind).toBe('clean-core-upgrade-assessment');
    expect(result.counts).toEqual({ reread: 7, riseToA: 4, riseToB: 1, stay: 2, evidenceMissing: 1, notReread: 2 });
    expect(result.counts.riseToA + result.counts.riseToB + result.counts.stay).toBe(result.counts.reread);
  });

  it('proposes per unit with the rule, the evidence gap and the PATTERNS §13 effort band', () => {
    const byName = new Map(units.map((u) => [u.name, u]));
    expect(byName.get('ZCL_SD_PRICE')).toMatchObject({
      proposal: 'A',
      rule: 'RISE_TO_A_RELEASED_SUCCESSOR',
      effort: { band: 'deterministic_remediation', lowPd: 0.25, highPd: 2 },
    });
    expect(byName.get('ZSD_ORDER_EXIT')).toMatchObject({ proposal: 'A', rule: 'RISE_TO_A_RELEASED_EXTENSION_POINT' });
    expect(byName.get('ZMM_REPORT')).toMatchObject({
      proposal: 'B',
      rule: 'RISE_TO_B_CLASSIC_API',
      targetLevelCheck: 'below',
    });
    expect(byName.get('ZSD_UTIL')).toMatchObject({ proposal: 'stay', stayReason: 'evidence_missing', effort: null });
    expect(byName.get('ZCL_FI_KEEP')).toMatchObject({ proposal: 'stay', stayReason: 'no_successor_in_target' });
    // A and Unknown are not re-read: Unknown is missing evidence, never a level to raise
    expect(byName.has('ZCL_ALREADY_A')).toBe(false);
    expect(byName.has('Z_I_UNKNOWN')).toBe(false);
    expect(result.effort).toEqual({ lowPd: 6.5, highPd: 64 });
  });

  it('never proposes B on a landscape that does not allow it', () => {
    const cloud = assess({
      ...afterInput,
      landscape: undefined,
      units: [
        {
          type: 'PROG',
          name: 'ZMM_REPORT',
          facts: {
            sourceLevel: 'D',
            landscape: 's4_public_cloud',
            upgradeEvidenceComplete: true,
            classicApiAvailable: true,
          },
        },
      ],
    });
    expect(cloud.units[0]?.proposal).toBe('stay');
  });

  it('refuses a re-assessment on a system not proven at the target release', () => {
    const refused = assess({
      ...afterInput,
      upgrade: { ...afterInput.upgrade, targetReleaseConfirmed: false },
    });
    expect(refused.status).toBe('research_required');
    expect(refused.units).toEqual([]);
    expect(refused.conflicts.join(' ')).toMatch(/targetReleaseConfirmed/);
  });

  it('refuses an upgrade to the same release, a missing phase and a Public Edition landscape', () => {
    const same = {
      ...beforeInput,
      upgrade: { ...beforeInput.upgrade, targetRelease: beforeInput.upgrade.sourceRelease },
    };
    expect(assess(same).status).toBe('research_required');
    const phase = { ...beforeInput, upgrade: { ...beforeInput.upgrade, phase: 'during' } };
    expect(assess(phase).status).toBe('research_required');
    const publicCloud = { ...afterInput, landscape: 's4_public_cloud' };
    expect(assess(publicCloud).status).toBe('research_required');
  });

  it('writes the machine-readable result through the CLI, exit 2 when refused', () => {
    const ok = run(['--units', '-', '--compact'], JSON.stringify(afterInput));
    expect(ok.exitCode).toBe(0);
    expect(JSON.parse(ok.output).counts.reread).toBe(7);
    const refused = run(
      ['--units', '-'],
      JSON.stringify({ ...afterInput, upgrade: { ...afterInput.upgrade, targetReleaseConfirmed: false } }),
    );
    expect(refused.exitCode).toBe(2);
    expect(run([]).exitCode).toBe(1);
  });
});

describe('Clean Core target level', () => {
  it('compares the decided level with the requested one', () => {
    expect(level(undefined, 'B')).toBeUndefined();
    expect(level('A', 'A')).toBe('met');
    expect(level('B', 'A+B')).toBe('met');
    expect(level('A', 'A+C')).toBe('composite');
    expect(level('A', 'ArchitectureDependent')).toBe('unverified');
    expect(level('A', 'B')).toBe('below');
    expect(level('C', 'A')).toBe('invalid');
  });

  it('turns a decision below the target level into research, and keeps it when the target is met', () => {
    const facts = {
      sourceLevel: 'D',
      standardParity: 'gap',
      unusedProven: true,
    };
    const met = plan({ ...facts, targetLevel: 'A' });
    expect(met.decision.id).toBe('ANY_TO_REMOVED');
    expect(met.targetLevelCheck?.status).toBe('met');
    const invalid = plan({ ...facts, targetLevel: 'D' });
    expect(invalid.decision.id).toBe('ANY_TO_RESEARCH');
    const scenarios = JSON.parse(readFileSync('skills/sap-erp-clean-core-refactor/decision-scenarios.json', 'utf8'));
    const keep = scenarios.runtimeScenarios.find(
      (s: { id: string }) => s.id === 'target_level_a_refuses_level_b_retention',
    );
    const below = plan(keep.facts);
    expect(below.decision.id).toBe('ANY_TO_RESEARCH');
    expect(below.targetLevelCheck).toMatchObject({
      requested: 'A',
      decided: 'B',
      status: 'below',
      decisionAfter: 'ANY_TO_RESEARCH',
    });
    expect(plan({ ...keep.facts, targetLevel: 'B' }).decision.id).toBe('B_KEEP_PRIVATE');
  });
});
