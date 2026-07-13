#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rulesFile = fileURLToPath(
  new URL('../skills/sap-erp-clean-core-refactor/knowledge/clean-core-extensibility/decision-rules.json', import.meta.url),
);

export function queryKnowledge(terms, limit = 8) {
  const knowledge = JSON.parse(readFileSync(rulesFile, 'utf8'));
  const normalized = terms.map((term) => term.toLowerCase()).filter(Boolean);
  return knowledge.rules
    .map((rule) => {
      const haystack = `${rule.id} ${rule.topics.join(' ')} ${rule.statement}`.toLowerCase();
      const score = normalized.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { ...rule, score };
    })
    .filter((rule) => normalized.length === 0 || rule.score > 0)
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
    .slice(0, limit);
}

function run(argv) {
  const json = argv.includes('--json');
  const limitIndex = argv.indexOf('--limit');
  const limit = limitIndex >= 0 ? Number.parseInt(argv[limitIndex + 1] ?? '', 10) : 8;
  const terms = argv.filter(
    (arg, index) => arg !== '--json' && arg !== '--limit' && !(limitIndex >= 0 && index === limitIndex + 1),
  );
  const matches = queryKnowledge(terms, Number.isFinite(limit) && limit > 0 ? limit : 8);
  if (json) {
    console.log(JSON.stringify(matches, null, 2));
    return;
  }
  if (!matches.length) {
    console.log('No curated Clean Core rule matched. Return ResearchRequired and use the source lookup ladder.');
    return;
  }
  for (const rule of matches) {
    console.log(`${rule.id} [pages ${rule.sourcePages.join(', ')}] ${rule.statement}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) run(process.argv.slice(2));
