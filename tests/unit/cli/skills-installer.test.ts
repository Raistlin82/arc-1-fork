import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { installBundledSkills, listBundledSkills, resolveSkillsDestination } from '../../../src/skills-installer.js';

describe('skills installer', () => {
  let root: string;
  let source: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'arc1-skills-'));
    source = join(root, 'bundled');
    for (const name of ['alpha', 'beta']) {
      mkdirSync(join(source, name), { recursive: true });
      writeFileSync(join(source, name, 'SKILL.md'), `---\nname: ${name}\n---\n`);
    }
    mkdirSync(join(source, 'not-a-skill'), { recursive: true });
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('lists only directories containing SKILL.md', () => {
    expect(listBundledSkills(source)).toEqual(['alpha', 'beta']);
  });

  it('installs all skills into the universal project directory', () => {
    const projectDir = join(root, 'project');
    const result = installBundledSkills({ agent: 'agents', global: false, projectDir, sourceDir: source });
    expect(result.installed).toEqual(['alpha', 'beta']);
    expect(result.skipped).toEqual([]);
    expect(existsSync(join(projectDir, '.agents/skills/alpha/SKILL.md'))).toBe(true);
  });

  it('installs one selected skill and rejects an unknown name', () => {
    const destination = join(root, 'custom');
    const result = installBundledSkills({
      agent: 'codex',
      global: false,
      destination,
      sourceDir: source,
      skill: 'beta',
    });
    expect(result.installed).toEqual(['beta']);
    expect(existsSync(join(destination, 'alpha'))).toBe(false);
    expect(() =>
      installBundledSkills({ agent: 'codex', global: false, destination, sourceDir: source, skill: 'missing' }),
    ).toThrow(/Unknown bundled skill/);
  });

  it('skips existing skills unless force is set', () => {
    const destination = join(root, 'custom');
    installBundledSkills({ agent: 'agents', global: false, destination, sourceDir: source, skill: 'alpha' });
    writeFileSync(join(source, 'alpha', 'SKILL.md'), 'updated');
    const skipped = installBundledSkills({
      agent: 'agents',
      global: false,
      destination,
      sourceDir: source,
      skill: 'alpha',
    });
    expect(skipped.skipped).toEqual(['alpha']);
    expect(readFileSync(join(destination, 'alpha', 'SKILL.md'), 'utf8')).not.toBe('updated');

    const forced = installBundledSkills({
      agent: 'agents',
      global: false,
      destination,
      sourceDir: source,
      skill: 'alpha',
      force: true,
    });
    expect(forced.installed).toEqual(['alpha']);
    expect(readFileSync(join(destination, 'alpha', 'SKILL.md'), 'utf8')).toBe('updated');
  });

  it('performs dry runs without creating the destination', () => {
    const destination = join(root, 'dry-run');
    const result = installBundledSkills({
      agent: 'agents',
      global: false,
      destination,
      sourceDir: source,
      dryRun: true,
    });
    expect(result.installed).toEqual(['alpha', 'beta']);
    expect(existsSync(destination)).toBe(false);
  });

  it('resolves agent-specific project destinations', () => {
    expect(resolveSkillsDestination({ agent: 'claude-code', global: false, projectDir: root })).toBe(
      join(root, '.claude/skills'),
    );
    expect(resolveSkillsDestination({ agent: 'codex', global: false, projectDir: root })).toBe(
      join(root, '.agents/skills'),
    );
  });

  it('installs an executable Clean Core runtime with its model and chain', () => {
    const destination = join(root, 'clean-core');
    installBundledSkills({
      agent: 'codex',
      global: false,
      destination,
      sourceDir: 'skills',
      skill: 'sap-erp-clean-core-refactor',
    });
    const installed = join(destination, 'sap-erp-clean-core-refactor');
    const scenarios = JSON.parse(readFileSync(join(installed, 'decision-scenarios.json'), 'utf8'));
    const facts = scenarios.runtimeScenarios.find(
      (scenario: { id: string }) => scenario.id === 'aem_side_by_side_btp_abap',
    ).facts;
    const result = spawnSync(
      process.execPath,
      [join(installed, 'runtime/resolve-plan.mjs'), '--facts', '-', '--compact'],
      {
        input: JSON.stringify(facts),
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(0);
    expect(result.stderr).toBe('');
    expect(JSON.parse(result.stdout).decision.id).toBe('SIDE_BY_SIDE_BTP_ABAP');
  });
});
