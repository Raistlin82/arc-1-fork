/** Resolve the first Clean Core decision whose source level and structured conditions match. */

function matchesCondition(condition, facts) {
  if (condition.always === true) return true;
  const actual = facts[condition.fact];
  if (Object.hasOwn(condition, 'equals')) return actual === condition.equals;
  if (Array.isArray(condition.in)) return condition.in.includes(actual);
  throw new Error(`Unsupported Clean Core condition: ${JSON.stringify(condition)}`);
}

export function resolveDecision(chain, facts) {
  if (!facts.sourceLevel) throw new Error('sourceLevel is required');
  return [...chain.decisions]
    .sort((left, right) => left.precedence - right.precedence)
    .find(
      (decision) =>
        decision.sourceLevels.includes(facts.sourceLevel) &&
        decision.conditions.every((condition) => matchesCondition(condition, facts)),
    );
}
