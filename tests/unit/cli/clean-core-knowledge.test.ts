import { describe, expect, it } from 'vitest';
import { queryKnowledge } from '../../../scripts/query-clean-core-knowledge.mjs';

describe('Clean Core knowledge query', () => {
  it('returns wrapper and on-stack rules for multi-term queries', () => {
    const matches = queryKnowledge(['wrapper', 'on-stack'], 20);
    expect(matches.map((rule: { id: string }) => rule.id)).toEqual(
      expect.arrayContaining(['CC-LVL-A-DOMAINS', 'CC-ONSTACK-SELECT', 'CC-WRAPPER-OUTCOME']),
    );
  });

  it('returns no rules for an unknown term instead of guessing', () => {
    expect(queryKnowledge(['not-a-clean-core-topic'])).toEqual([]);
  });
});
