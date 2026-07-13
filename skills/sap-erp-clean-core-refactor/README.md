# SAP Clean Core Refactor Orchestrator

This skill turns SAP Clean Core extensibility guidance into an evidence-backed architecture and,
where ARC-1 has a validated capability, a guarded execution plan.

It does not equate Level A with BTP. A target may be SAP standard, Key User on-stack, Developer
Extensibility on-stack with embedded ABAP Cloud, Cloud Foundry side-by-side, hybrid, a governed
wrapper outcome, retained Level B on Private Edition/on-premise, or retirement.

## What it decides

For each logical unit, the orchestrator answers:

1. Can SAP standard replace the custom implementation?
2. Is the code used and business-owned?
3. Which extension use case and touchpoints remain?
4. Should the target be Key User, developer on-stack, side-by-side or hybrid?
5. What A/B/C/D/Unknown evidence applies to every touchpoint?
6. Which action is executable now, which is a manual handoff, and which needs research?
7. Which proof and governance controls make the result acceptable?

## Operating modes

```text
sap-erp-clean-core-refactor ZPKG discover
sap-erp-clean-core-refactor ZPKG estimate
sap-erp-clean-core-refactor ZPKG plan
sap-erp-clean-core-refactor ZPKG execute
sap-erp-clean-core-refactor ZPKG govern
```

`discover`, `estimate` and `plan` are read-only. `execute` requires an approved plan and runs only
actions whose capabilities are available. `govern` measures regression, KPIs, wrapper successors
and exception expiry.

## Decision model

```mermaid
flowchart LR
    R["Requirement"] --> S["Standard-first"]
    S --> U["Usage and ownership"]
    U --> A["AEM and touchpoints"]
    A --> D["Target domain"]
    D --> L["Clean Core evidence"]
    L --> C["Available capability"]
    C --> P["Approved action and proof"]
```

Level is a compliance dimension, not the architecture selector. Wrapper results are composite:
`A consumer + B wrapper` or `A consumer + C wrapper`. Unknown evidence remains
`ResearchRequired`, not D.

## Capability boundaries

| Path | Status |
|---|---|
| SAP standard replacement | Planned; retirement executable after parity approval |
| Key User on-stack | Decision and owned manual handoff |
| Developer Extensibility on-stack | Executable through ARC-1 for supported ADT objects |
| Custom API release | Executable through ARC-1 with live contract evidence |
| Wrapper | Executable on permitted landscapes with isolation and manual exception governance |
| Cloud Foundry side-by-side | Executable through the CAP/Fiori skill chain |
| Kyma side-by-side | Architecture/manual handoff; current CAP skill is CF-only |
| ATC exemption creation | Manual/external; ARC-1 has no such operation |

## Safety model

- ARC-1 is the only SAP writer.
- No write happens before plan approval.
- Deterministic SAP quick fixes may share one explicit package/transport approval.
- Mechanical agent changes and every generated redesign require concrete diff approval.
- Syntax, activation, ATC and applicable tests remain mandatory.
- `sap-transport-review` is the final release gate.
- C/D exceptions are visible, owned and time-bound.

## File map

| File | Purpose |
|---|---|
| [`SKILL.md`](./SKILL.md) | Agent protocol |
| [`WORKFLOW.md`](./WORKFLOW.md) | Operator flow and acceptance gates |
| [`DECISION_MATRIX.md`](./DECISION_MATRIX.md) | Human-readable ordered decisions |
| [`chain.json`](./chain.json) | Machine-readable decisions, gates, actions and skill dispatch |
| [`action-catalog.json`](./action-catalog.json) | ARC-1 payload examples validated against current tool schemas |
| [`decision-scenarios.json`](./decision-scenarios.json) | Golden architecture scenarios resolved in CI |
| [`INTEGRATIONS.md`](./INTEGRATIONS.md) | ARC-1, local skill, external SAP skill and MCP capabilities |
| [`PATTERNS.md`](./PATTERNS.md) | Standard, Key User, on-stack, side-by-side, wrapper, ATC, effort and governance patterns |
| [`SOURCES.md`](./SOURCES.md) | Evidence precedence and knowledge-base provenance |
| [`knowledge/clean-core-extensibility/decision-rules.json`](./knowledge/clean-core-extensibility/decision-rules.json) | Compact runtime knowledge index |
| [`knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md`](./knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md) | Knowledge-to-runtime bridge |
| [`knowledge/clean-core-extensibility/graphify-out/graph.curated.json`](./knowledge/clean-core-extensibility/graphify-out/graph.curated.json) | Alias-merged graph with curated bridges and no zero-degree nodes |

## Validation

```text
npm run check:clean-core-skills
npm run check:skill-refs
npm run clean-core:query -- wrapper on-stack
```

The first check validates the chain contract, local skill coverage, knowledge rules, operation IDs
and every canonical operation payload against the frozen ARC-1 schemas. The second rejects stale or
invented tool names, actions and object types across all skill documentation.
