---
name: sap-erp-clean-core-refactor
description: Plans, estimates, executes and governs SAP Clean Core extensibility for Z/Y custom code across S/4HANA Public Cloud, Private Cloud, on-premise, embedded ABAP Cloud and BTP. Uses a curated SAP Clean Core knowledge base plus live ARC-1 evidence to choose SAP standard, Key User on-stack, embedded ABAP Cloud on-stack, BTP ABAP Environment side-by-side, Cloud Foundry, Kyma, hybrid, wrapper, Level B retention or retirement paths. Use for Clean Core refactoring, AEM extension decisions, wrapper strategy, custom API release, package migration planning and governed remediation.
---

# SAP ERP Clean Core Refactor

Architect and execute Clean Core remediation without equating Level A with BTP. Level A may be
SAP standard, Key User on-stack, Developer Extensibility with embedded ABAP Cloud, or a
side-by-side extension using released ERP touchpoints.

Read [`README.md`](./README.md) for orientation, the
[`WORKFLOW.md` operator quickstart](./WORKFLOW.md#operator-quickstart) before a live run,
[`DECISION_MATRIX.md`](./DECISION_MATRIX.md) for human-readable decisions,
[`aem-model.json`](./aem-model.json) for the architecture questionnaire, [`chain.json`](./chain.json)
for the executable contract and [`action-catalog.json`](./action-catalog.json) for validated ARC-1
payload shapes. Use [`runtime/resolve-plan.mjs`](./runtime/resolve-plan.mjs) for deterministic runtime
resolution.

## Modes

| Mode | Result | SAP writes |
|---|---|---|
| `discover` | Landscape, capability and logical-unit inventory | No |
| `estimate` | Inventory, classification, clusters and effort ranges | No |
| `plan` | Approved-target proposal, decision record, action sequence and evidence gaps | No |
| `execute` | Apply only approved and currently supported actions | Yes |
| `govern` | KPI baseline, ATC regression, exception/wrapper lifecycle and review backlog | No by default |

## Input

```text
<package-or-object> [mode] [flags]
```

| Flag | Values | Rule |
|---|---|---|
| `--landscape` | `auto`, `s4-public-cloud`, `s4-private-cloud`, `s4-on-premise`, `btp-abap-environment` | Probe when `auto`; never silently assume Public Cloud or BTP |
| `--domain` | `auto`, `standard`, `key-user`, `embedded-abap-cloud`, `side-by-side-btp-abap`, `side-by-side-cf`, `side-by-side-kyma`, `hybrid` | `auto` runs AEM; an explicit value is checked against AEM and never overrides a conflict |
| `--target-level` | `A`, `B` | Optional constraint, not a deployment selector |
| `--push-to-a` | comma-separated logical units | Selective escalation after architecture review |
| `--force-refresh` | boolean | Ignore cached external evidence |
| `--report` | `markdown`, `dossier` | `dossier` delegates to `sap-migration-dossier` |

If landscape or business requirement cannot be inferred from live context, ask once before the
target-domain decision. Do not default to BTP Cloud Foundry.

## Invariants

1. Decide from the business requirement and extension touchpoints before using A/B/C/D.
2. Search for SAP standard before designing an extension.
3. Treat missing classification evidence as `Unknown`, never automatically as D.
4. Classify logical units, not isolated includes.
5. Level A requires allowed technology and released status for every relevant touchpoint.
6. Embedded ABAP Cloud on-stack Level A also requires an approved ABAP Cloud target package and proven object
   language version; ATC success alone is insufficient.
7. Report wrappers as `A consumer + B wrapper` or `A consumer + C wrapper`.
8. BTP Level A requires a released boundary plus proven ownership, consistency, transaction,
   identity, lifecycle, runtime and ERP retirement/boundary facts; CF/Kyma alone prove nothing.
9. SAP BTP ABAP Environment is side-by-side. Never classify it as embedded on-stack ABAP Cloud.
10. ABAP CDS/RAP and CAP CDS are separate branches. Invoke each only for its selected target.
11. Key User is a manual handoff until an exposed implementation capability validates.
12. ARC-1 is the only SAP writer. Optional skills and MCP servers advise or research.
13. Deterministic quick fixes require one explicit package/transport approval. Generative changes
   always require approval of the concrete diff.
14. A plan is not complete without evidence, confidence, owner, gates and rollback/retirement path.

## Protocol

### 1. Establish context

- Delegate system discovery to `bootstrap-system-context` and transport conflicts to
  `sap-transport-overview`.
- Confirm ARC-1 with `SAPManage(action="probe")`.
- Record landscape, release, installed components, available ADT features, write ceiling, package
  allowlist, transport policy, ATC variants and optional MCP/skill capabilities.
- Load the smallest relevant evidence pack from
  `knowledge/clean-core-extensibility/decision-rules.json`. Use
  `npm run clean-core:query -- <terms>` during repository development.

### 2. Inventory logical units and touchpoints

- Use operation `inventory_package`; recurse into subpackages.
- Use `exact_tadir_lookup` only for known names. Detect legacy SEGW through generated classes,
  service evidence and targeted lookup because DEVC inventory may omit it.
- Cluster PROG/includes, FUGR/FUNC/includes, CLAS/local includes and complete CDS/RAP stacks.
- For each unit record UI, forms, reports, integrations/events, business logic/BAdIs, APIs,
  persistence, runtime use, fan-in, ownership and transport state.
- Delegate usage evidence to `sap-unused-code`, classification to `sap-clean-core-atc`, intent
  explanation to `explain-abap-code`, and dossier output when requested.

### 3. Run the architecture decision

For every logical unit, in this order:

1. Can SAP standard replace it with acceptable parity?
2. Is the unit unused?
3. Which extension use case and touchpoints remain?
4. Does Key User extensibility fit?
5. Run every required fact in `aem-model.json`: do on-stack or side-by-side signals dominate, or is
   an explicit responsibility split required?
6. What are the current level and all relevant API/extension-point release states?
7. Can a released successor or released custom API reach A?
8. If not, is an isolated wrapper allowed and governable?
9. For side-by-side, what owns the data and which released API/event crosses the ERP boundary?
10. Which implementation model, UI and BTP ABAP/CF/Kyma runtime are justified?
11. Which implementation capability is actually available?

Persist the facts for the logical unit and run `node runtime/resolve-plan.mjs --facts <file>` from
the installed skill directory, or `npm run --silent clean-core:resolve -- --facts <file>` in the ARC-1
repository. Accept `aem_recorded` only when the result is `resolved` or `not_required`. The resolver
derives the domain, applies [`DECISION_MATRIX.md`](./DECISION_MATRIX.md), expands nested dispatches
and reports pending gates. Otherwise select `research_required`.

### 4. Emit the plan

Write `docs/refactor/<date>-clean-core-plan.md` with:

- landscape and capability matrix;
- business requirement, touchpoints and standard-first result;
- one AEM record per logical unit;
- source level, target domain, target level and action;
- for embedded ABAP Cloud on-stack Level A, target package/software component and live or manually verified
  `abapLanguageVersion="cloudDevelopment"` evidence;
- for BTP ABAP Environment, a distinct target ARC-1 connection, target package/language proof and
  released remote ERP boundary;
- for side-by-side Level A, the `modernize-abap-side-by-side-core` contract: service boundary,
  all released touchpoints, ownership, consistency, transactions, identity, lifecycle, runtime fit,
  UI target and ERP retirement/boundary plan;
- composite wrapper level where applicable;
- exact operation IDs from [`action-catalog.json`](./action-catalog.json);
- MUST/SHOULD gates, confidence, evidence, owner, effort and open questions;
- Key User manual handoff and any unavailable CF/Kyma delivery capabilities;
- governance baseline and continuous controls.

`estimate` stops before per-unit target approval. `plan` remains read-only. The operator may edit
the plan before execution.

### 5. Execute approved capabilities

- Capture the as-found source and documentation baseline first.
- Delegate deterministic findings to `migrate-custom-code`; do not duplicate its quick-fix loop.
- Execute one approved logical unit at a time using the action's `operationIds` from `chain.json`.
- Block `rewrite_on_stack_abap_cloud` unless the approved ABAP Cloud target package, object language
  version and all released touchpoints satisfy the `abap_cloud_target_proven` gate.
- Block `rewrite_side_by_side_btp_abap` unless source and target ARC-1 contexts are explicit, the
  target is SAP BTP ABAP Environment and `btp_abap_target_connected` is proven. Never send target
  writes through the source S/4 connection.
- Run `modernize-abap-side-by-side-core` before any CAP generation. Use
  `modernize-abap-to-btp-cap` for the runtime-neutral CAP build, then CF packaging or
  `deploy-cap-to-kyma` according to the approved contract.
- Invoke `modernize-abap-cap-schema` only for `dataOwnership=cap|replicated`; invoke
  `scaffold-cap-fiori-elements` and `modernize-ui5-app` as mutually exclusive UI branches.
- Block acceptance while CAP handlers contain unresolved `501`/migration TODOs or
  `generate-cap-cds-test` has not proven the solution.
- For Key User, produce implementation steps, required SAP app, fields/extension points, owner and
  acceptance tests; do not invent an ARC-1 write.
- For wrappers, isolate the wrapper package/component, release only the wrapper API, rewrite the
  consumers, record the exception and retirement trigger, and test after upgrades.
- Reclassify after every accepted unit. One released dependency does not prove the whole consumer A.

### 6. Prove and govern

- Every changed unit must pass syntax, activation, ATC, applicable tests and approved diff.
- Use `sap-transport-review` before release.
- `govern` reports Clean Core Share, Technical Debt Score, Unused Code Share and Business
  Modifications, plus ATC regression, wrapper successor watch, exception expiry, unused-code
  refresh and SAP API changelog review.
- Use `ABAP_CLOUD_READINESS` for A assessment when available. Use a governed customer copy of
  `ABAP_CLOUD_DEVELOPMENT_DEFAULT` for development/transport blocking. Record fallbacks.
- Do not create exemptions for informational Level B findings. C/D exceptions must be explicit,
  finding-level, time-bound and owned.

## Confidence policy

| Change | Confidence | Automation |
|---|---|---|
| SAP-proposed deterministic quick fix, syntax clean | High | May persist after one package/transport approval |
| Mechanical transformation without SAP proposal | Medium | Diff approval required |
| Generated redesign or wrapper | Variable | Diff approval, tests and owner approval required |
| Syntax-failing or incomplete proposal | Low | Never write; retain as proposal/research |

## Supporting references

- [`WORKFLOW.md`](./WORKFLOW.md#operator-quickstart): operator quickstart, sequence and gates.
- [`INTEGRATIONS.md`](./INTEGRATIONS.md): ARC-1, local skills, SAP skills and MCP capability map.
- [`PATTERNS.md`](./PATTERNS.md): architecture, wrapper, execution and governance patterns.
- [`SOURCES.md`](./SOURCES.md): evidence precedence and authoritative sources.
- [`knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md`](./knowledge/clean-core-extensibility/ARC1_RUNTIME_ACTION_MAP.md): knowledge-to-runtime bridge.

## Refusal rules

Stop or return `research_required` when the landscape is unknown, the business owner or parity
decision is missing, a target capability is unavailable, a released successor is unproven, BTP
ownership/boundary/runtime evidence is incomplete, a wrapper cannot be isolated, a required gate
is degraded without accepted fallback, or a change would bypass ARC-1 safety controls.
