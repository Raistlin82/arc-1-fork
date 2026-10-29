import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

interface WorkflowJob {
  needs?: string | string[];
  if?: string;
}

const githubExpression = (expression: string): string => `\${{ ${expression} }}`;
const needsOf = (job: WorkflowJob): string[] => (Array.isArray(job.needs) ? job.needs : job.needs ? [job.needs] : []);

// A fork has no upstream tags: release-please there proposes a wrong version and publishes it.
describe('release workflow', () => {
  it('runs only in the upstream repository, every publish job included', async () => {
    const workflow = parse(await readFile('.github/workflows/release.yml', 'utf8')) as {
      jobs: Record<string, WorkflowJob>;
    };
    expect(workflow.jobs['release-please'].if).toBe(githubExpression("github.repository == 'arc-mcp/arc-1'"));

    // every job reaches release-please through needs, and none forces itself past a skipped need
    const reaches = (name: string, seen = new Set<string>()): boolean =>
      name === 'release-please' ||
      (!seen.has(name) && needsOf(workflow.jobs[name]).some((need) => reaches(need, seen.add(name))));
    for (const [name, job] of Object.entries(workflow.jobs)) {
      if (name === 'release-please') continue;
      expect(reaches(name), name).toBe(true);
      expect(job.if ?? '', name).not.toMatch(/\b(always|failure|cancelled)\(\)/);
    }
  });
});
