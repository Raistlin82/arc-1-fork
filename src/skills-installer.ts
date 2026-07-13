import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SKILL_AGENTS = [
  'agents',
  'claude-code',
  'cursor',
  'github-copilot',
  'codex',
  'gemini',
  'opencode',
] as const;

export type SkillAgent = (typeof SKILL_AGENTS)[number];

export interface SkillInstallOptions {
  agent: SkillAgent;
  global: boolean;
  projectDir?: string;
  destination?: string;
  skill?: string;
  force?: boolean;
  dryRun?: boolean;
  sourceDir?: string;
}

export interface SkillInstallResult {
  source: string;
  destination: string;
  installed: string[];
  skipped: string[];
  dryRun: boolean;
}

const PROJECT_SKILL_DIRS: Record<SkillAgent, string> = {
  agents: '.agents/skills',
  'claude-code': '.claude/skills',
  cursor: '.agents/skills',
  'github-copilot': '.agents/skills',
  codex: '.agents/skills',
  gemini: '.agents/skills',
  opencode: '.agents/skills',
};

const GLOBAL_SKILL_DIRS: Record<SkillAgent, string> = {
  agents: '.agents/skills',
  'claude-code': '.claude/skills',
  cursor: '.cursor/skills',
  'github-copilot': '.copilot/skills',
  codex: '.codex/skills',
  gemini: '.gemini/skills',
  opencode: '.config/opencode/skills',
};

export function bundledSkillsRoot(): string {
  return fileURLToPath(new URL('../skills/', import.meta.url));
}

export function listBundledSkills(sourceDir = bundledSkillsRoot()): string[] {
  if (!existsSync(sourceDir)) throw new Error(`Bundled skills directory not found: ${sourceDir}`);
  return readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(sourceDir, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort();
}

export function resolveSkillsDestination(
  options: Pick<SkillInstallOptions, 'agent' | 'global' | 'projectDir' | 'destination'>,
): string {
  if (options.destination) return resolve(options.destination);
  if (options.global) return join(homedir(), GLOBAL_SKILL_DIRS[options.agent]);
  return join(resolve(options.projectDir ?? process.cwd()), PROJECT_SKILL_DIRS[options.agent]);
}

export function installBundledSkills(options: SkillInstallOptions): SkillInstallResult {
  const source = resolve(options.sourceDir ?? bundledSkillsRoot());
  const destination = resolveSkillsDestination(options);
  const available = listBundledSkills(source);
  const selected = options.skill ? [options.skill] : available;
  const unknown = selected.filter((name) => !available.includes(name));
  if (unknown.length) {
    throw new Error(`Unknown bundled skill: ${unknown.join(', ')}. Available: ${available.join(', ')}`);
  }

  const installed: string[] = [];
  const skipped: string[] = [];
  if (!options.dryRun) mkdirSync(destination, { recursive: true });

  for (const name of selected) {
    const sourceSkill = join(source, name);
    const targetSkill = join(destination, name);
    if (existsSync(targetSkill) && !options.force) {
      skipped.push(name);
      continue;
    }
    if (!options.dryRun) {
      if (existsSync(targetSkill)) rmSync(targetSkill, { recursive: true, force: true });
      mkdirSync(dirname(targetSkill), { recursive: true });
      cpSync(sourceSkill, targetSkill, { recursive: true, dereference: false });
    }
    installed.push(name);
  }

  return { source, destination, installed, skipped, dryRun: options.dryRun ?? false };
}
