# SAP Clean Core Refactor Orchestrator

This skill turns SAP Clean Core extensibility guidance into an evidence-backed architecture and,
where ARC-1 has a validated capability, a guarded execution plan.

It does not equate Level A with BTP. A target may be SAP standard, Key User on-stack, Developer
Extensibility on-stack with embedded ABAP Cloud, SAP BTP ABAP Environment side-by-side, Cloud
Foundry or Kyma side-by-side, hybrid, a governed wrapper outcome, retained Level B on Private
Edition/on-premise, or retirement.

## What it decides

For each logical unit, the orchestrator answers:

1. Can SAP standard replace the custom implementation?
2. Is the code used and business-owned?
3. Which extension use case and touchpoints remain?
4. Should the target be Key User, embedded ABAP Cloud on-stack, BTP ABAP Environment, CF, Kyma or hybrid?
5. What A/B/C/D/Unknown evidence applies to every touchpoint?
6. Which action is executable now, which is a manual handoff, and which needs research?
7. Which proof and governance controls make the result acceptable?
8. For BTP, who owns the data, which released boundary is used, and why BTP ABAP Environment, CF or Kyma fits?

The answer to question 4 is derived from the versioned questionnaire in [`aem-model.json`](./aem-model.json),
not accepted as an unexplained domain preference. Incomplete or conflicting facts resolve to
`ResearchRequired`.

## Start here

**New to this skill?** Read the beginner walkthrough first:
[`GETTING-STARTED.md`](./GETTING-STARTED.md) — a plain-language, step-by-step guide to your first
run (the two-layer model, the five modes, a worked example, golden rules and a glossary).

Before a live system run, follow the
[`WORKFLOW.md` operator quickstart](./WORKFLOW.md#operator-quickstart). It contains the complete
read-only discovery, estimate, plan approval, scoped-write execution, transport review and
governance sequence with copy-ready agent prompts.

The compact forms below are skill invocations, not ARC-1 shell commands. Use the syntax supported by
the current agent, for example `$sap-erp-clean-core-refactor` in Codex.

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

The seven steps are the `decisionStages` of [`chain.json`](./chain.json), in order. Shading marks
what each step does: grey collects evidence, teal decides, outlined proves.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontSize':'14px','primaryColor':'#EBF0F0','primaryTextColor':'#0F1518','primaryBorderColor':'#5B7275','lineColor':'#5B7275','edgeLabelBackground':'#FFFFFF'},'flowchart':{'curve':'basis','nodeSpacing':38,'rankSpacing':46}}}%%
flowchart LR
    R["Requirement"] --> S["1 · Standard-first"]
    S --> U["2 · Usage and ownership"]
    U --> A["3 · AEM and touchpoints"]
    A --> D["4 · Target domain"]
    D --> L["5 · Clean Core evidence"]
    L --> C["6 · Available capability"]
    C --> P["7 · Approved action and proof"]

    classDef start fill:#FFFFFF,stroke:#5B7275,stroke-width:1px,color:#46565B
    classDef gather fill:#F4F6F6,stroke:#8C9C9F,stroke-width:1px,color:#243033
    classDef choose fill:#DDEBEA,stroke:#0B5D5D,stroke-width:1.5px,color:#08302F
    classDef prove fill:#EBF0F0,stroke:#5B7275,stroke-width:1.5px,color:#1B2426
    class R start
    class S,U,A gather
    class D,L choose
    class C,P prove
```

Level is a compliance dimension, not the architecture selector. Wrapper results are composite:
`A consumer + B wrapper` or `A consumer + C wrapper`. Unknown evidence remains
`ResearchRequired`, not D.

## Capability boundaries

| Path | Status |
|---|---|
| SAP standard replacement | Planned; retirement executable after parity approval |
| Key User on-stack | Decision and owned manual handoff |
| Embedded ABAP Cloud on-stack | Executable through ARC-1 only with approved ABAP Cloud target package, proven object language version and released touchpoints |
| SAP BTP ABAP Environment side-by-side | Distinct Level A path; requires a target ARC-1 connection, released remote boundary and ABAP Cloud package/language proof |
| Custom API release | Executable through ARC-1 with live contract evidence |
| Wrapper | Executable on permitted landscapes with isolation and manual exception governance |
| Cloud Foundry side-by-side | Executable through the evidence-gated common CAP chain and CF packaging |
| Kyma side-by-side | CAP build and official Kyma/Helm preparation are executable; deployment needs cluster/registry approval |
| ATC exemption creation | Manual/external; ARC-1 has no such operation |

## Safety model

- ARC-1 is the only SAP writer.
- No write happens before plan approval.
- Deterministic SAP quick fixes may share one explicit package/transport approval.
- Mechanical agent changes and every generated redesign require concrete diff approval.
- Embedded ABAP Cloud on-stack Level A requires the `abap_cloud_target_proven` gate; missing language-version
  metadata blocks final A classification.
- BTP ABAP Environment is never classified as on-stack. Embedded ABAP Cloud and side-by-side ABAP
  Environment have distinct target domains and actions.
- Side-by-side Level A requires `side_by_side_level_a_proven`; BTP runtime choice is never accepted
  as a substitute for released touchpoints, ownership, consistency, identity and lifecycle proof.
- CAP schema, CAP service, Fiori Elements, freestyle UI5 and Kyma skills are conditionally
  dispatched from the reviewed side-by-side contract, never called as an unconditional bundle.
- Syntax, activation, ATC and applicable tests remain mandatory.
- `sap-transport-review` is the final release gate.
- C/D exceptions are visible, owned and time-bound.

## File map

| File | Purpose |
|---|---|
| [`GETTING-STARTED.md`](./GETTING-STARTED.md) | Beginner step-by-step user guide (start here) |
| [`SKILL.md`](./SKILL.md) | Agent protocol |
| [`WORKFLOW.md`](./WORKFLOW.md) | Operator flow and acceptance gates |
| [`DECISION_MATRIX.md`](./DECISION_MATRIX.md) | Human-readable ordered decisions |
| [`chain.json`](./chain.json) | Machine-readable decisions, gates, actions and skill dispatch |
| [`aem-model.json`](./aem-model.json) | Machine-readable AEM questionnaire, architecture signals and domain selectors |
| [`action-catalog.json`](./action-catalog.json) | ARC-1 payload examples validated against current tool schemas |
| [`decision-scenarios.json`](./decision-scenarios.json) | Golden architecture scenarios resolved in CI |
| [`INTEGRATIONS.md`](./INTEGRATIONS.md) | ARC-1, local skill, external SAP skill and MCP capabilities |
| [`PATTERNS.md`](./PATTERNS.md) | Standard, Key User, on-stack, side-by-side, wrapper, ATC, effort and governance patterns |
| [`SOURCES.md`](./SOURCES.md) | Evidence precedence and knowledge-base provenance |
| [`knowledge/clean-core-extensibility/decision-rules.json`](./knowledge/clean-core-extensibility/decision-rules.json) | Compact runtime knowledge index |
| [`knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md`](./knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md) | Knowledge-to-runtime bridge |
| [`knowledge/clean-core-extensibility/graphify-out/graph.curated.json`](./knowledge/clean-core-extensibility/graphify-out/graph.curated.json) | Alias-merged graph with curated bridges and no zero-degree nodes |
| [`runtime/resolve-plan.mjs`](./runtime/resolve-plan.mjs) | Installed runtime resolver for AEM, decisions, recursive actions, operations and gates |

## Validation

```text
npm run check:clean-core-skills
npm run check:skill-refs
npm run clean-core:query -- wrapper on-stack
npm run --silent clean-core:resolve -- --facts /path/to/facts.json
```

The first check validates the chain contract, local skill coverage, knowledge rules, operation IDs
and every canonical operation payload against the frozen ARC-1 schemas. It also enforces two
closures that keep the contract executable: each MUST gate must have the ARC-1 operation that can
prove it, positioned where it can (syntax and transport checks before the first write that carries
source, ATC and tests after the last one), and every ARC-1 action must be either used by an
operation or classified in `scripts/ci/clean-core-tool-coverage.json` — so a new capability in an
upstream release forces a deliberate adopt-or-skip decision instead of leaving the chain stale. The
second check rejects stale or invented tool names, actions and object types across all skill
documentation. The resolver derives the AEM domain, applies decision precedence, expands nested
dispatches and reports every pending MUST gate; it never performs SAP writes.
