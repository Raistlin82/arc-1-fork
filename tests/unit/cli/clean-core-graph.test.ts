import { describe, expect, it } from 'vitest';
import { refineGraph } from '../../../scripts/refine-clean-core-graph.mjs';

describe('Clean Core graph refinement', () => {
  it('merges duplicate normalized labels and redirects links', () => {
    const source = {
      graph: {},
      nodes: [
        { id: 'canonical', label: 'Same Concept', norm_label: 'same concept' },
        { id: 'duplicate', label: 'Same Concept', norm_label: 'same concept' },
        { id: 'target', label: 'Target', norm_label: 'target' },
      ],
      links: [{ source: 'duplicate', target: 'target', relation: 'references' }],
      hyperedges: [],
    };

    const curated = refineGraph(source);
    expect(curated.nodes.map((node: { id: string }) => node.id)).toEqual(['canonical', 'target']);
    expect(curated.nodes[0].alias_ids).toEqual(['duplicate']);
    expect(curated.links).toEqual([
      expect.objectContaining({ source: 'canonical', target: 'target', relation: 'references' }),
    ]);
  });
});
