# Clean Core Architecture and Execution Patterns

This reference contains the reusable patterns used by [`SKILL.md`](./SKILL.md). It does not repeat
the exact AEM contract in [`aem-model.json`](./aem-model.json), routing in [`chain.json`](./chain.json) or tool payloads in
[`action-catalog.json`](./action-catalog.json).

## 1. Decision record

Every logical unit receives an Architecture Decision Record with these fields:

| Field | Required content |
|---|---|
| Business requirement | Outcome, users, process and measurable acceptance criteria |
| Current implementation | Logical-unit members, touchpoints, ownership and runtime evidence |
| Standard-first result | SAP standard capability considered, gap and parity decision |
| Quality attributes | Coupling, LUW consistency, latency, data volume, availability, scaling, security, lifecycle and TCO |
| Current evidence | A/B/C/D/Unknown per relevant touchpoint, ATC and release-state sources |
| Target | domain, level, action and responsibility boundary |
| Capability | executable, manual handoff, degraded or unavailable |
| Governance | owner, gates, exception, expiry, retirement trigger and KPIs |

Do not use one source-level label as a substitute for the architecture decision.

## 2. Standard-first

Use before every extension decision:

1. Express the requirement without reference to the current custom implementation.
2. Check active S/4 scope, available Fiori apps, configuration, released extension points and
   roadmap/lifecycle evidence.
3. Compare business parity, not source-code similarity.
4. Prefer configuration or standard process when parity and TCO are acceptable.
5. Retire the custom implementation only after owner-approved acceptance tests.

Outcome options are `replace_with_standard`, extension required, or `research_required`.

## 3. Extension touchpoint inventory

Classify the requirement across all tiers:

| Tier | Touchpoints |
|---|---|
| Presentation | Fiori adaptation, custom UI, SAP GUI, forms, output management |
| Application | BAdIs, business logic, RAP behavior, workflows, jobs, validations |
| Data | custom fields/tables, CDS, DCL, analytical models, direct SQL |
| Integration | released APIs, events, IDocs, RFC/BAPI, OData, Integration Suite |
| Lifecycle | transports, tests, monitoring, ownership, upgrade dependency |

A unit reaches Level A only when every relevant touchpoint uses an allowed technology and released
contract/extension point. A released API does not erase a remaining classic UI or internal-table
dependency.

## 4. Target-domain selection

The runtime resolver requires the complete AEM questionnaire. It records which authoritative
on-stack and side-by-side signals matched. Both groups without an approved responsibility split,
no matched group, missing facts, an incompatible implementation/runtime pair or a domain hint that
disagrees with the derived result all produce `ResearchRequired`.

### Key User on-stack

Prefer when the requirement is bounded to supported custom fields, UI adaptation, forms, analytics,
workflows or custom business objects exposed by the product's Key User tools.

Required handoff:

- SAP app/tool and tenant/system;
- released extension point or supported business context;
- fields/objects, naming and lifecycle owner;
- downstream data/API impact;
- transport/publication process;
- acceptance and regression tests.

ARC-1 may inventory and document the replaced code but does not automate Key User apps.

### Embedded ABAP Cloud on-stack

Prefer when:

- logic is part of an S/4 business process;
- one SAP LUW and strong consistency matter;
- high-volume local data access or low latency is required;
- an existing S/4 application is being extended;
- released APIs and extension points can support the design.

Use embedded ABAP Cloud language/version rules, released SAP/custom APIs, RAP/CDS where appropriate,
and strict package/software-component boundaries.

### SAP BTP ABAP Environment side-by-side

This is ABAP Cloud, but it is not on-stack. Select it for an independently operated side-by-side
ABAP solution when AEM favors side-by-side and `implementationModel=abap_cloud` with
`sideBySideRuntime=btp_abap`.

Level A additionally requires a released remote ERP API/event boundary, explicit data and
transaction ownership, identity, independent lifecycle and a connected target ARC-1 context. The
target package and object language version must prove ABAP Cloud. Never route BTP target writes
through the source S/4 connection.

### Side-by-side on Cloud Foundry

Prefer when:

- users are outside SAP or need consumer/mobile/freestyle UX;
- the solution is SaaS or a multi-system hub;
- lifecycle, scaling, availability or downtime must be independent;
- integration can be remote/event-driven and loosely coupled;
- the team requires frequent independent releases.

Prefer CF for conventional CAP business applications and managed BTP service integration. The
solution reaches A only when every relevant touchpoint is released, no direct S/4 persistence or
unreleased access remains, and ownership, consistency, transactions, identity, lifecycle,
operations and ERP retirement/stable-boundary evidence are complete. BTP deployment alone proves
nothing.

### Kyma

Select Kyma only for a concrete Kubernetes/container requirement such as workload controls,
operators, sidecars, non-buildpack runtime constraints or cluster-level integration. CAP supports
official Kyma/Helm preparation, but deployment still requires real cluster, registry, namespace,
security, operations and delivery evidence. Kyma and CF apply the same Clean Core Level A rules.

### Hybrid

Split responsibilities explicitly:

- on-stack owns transactional consistency and core process extension;
- side-by-side owns independent UX, orchestration, cross-system logic or scale;
- the boundary uses released APIs/events;
- retries, idempotency, authorization and failure ownership are documented.

Hybrid is not permission to duplicate business ownership on both sides.

## 5. Classification

| Level | Evidence pattern | Typical examples |
|---|---|---|
| A | Allowed technology plus released SAP/customer APIs and extension points | Key User, ABAP Cloud/RAP with released touchpoints, side-by-side over released APIs |
| B | Documented classic API or classic extension technology | unreleased classic BAPI/API, classic BAdI/enhancement technology where SAP permits it |
| C | Internal SAP object or technology not intended as a stable customer API | direct internal table/class/function use |
| D | Modification, no-API zone or not-recommended technology | SAP modification, clone, implicit enhancement or forbidden extension pattern |
| Unknown | Evidence incomplete or contradictory | object missing from source data, uncertain exit exception, unverified successor |

Classification is edition- and release-dependent. Names in examples are never universal proof.
Use live API state, ATC and official structured SAP data.

## 6. Released custom API

Use when many consumers are non-A only because a stable customer-owned interface is not released.

1. Read current release state and supported contracts.
2. Measure fan-in and compatibility obligations. Take the count from the response's `total`, not from
   the returned rows: `find_references` caps its list (100 by default, 1000 max), so a large consumer
   base is truncated in the list while `total` still reports it. `truncated=true` means the consumer
   inventory is incomplete — record the fan-in as degraded and do not claim a complete rewrite scope.
3. Review naming, semantics, authorization, error behavior and lifecycle.
4. Obtain API-owner approval.
5. Release the appropriate live-supported contract.
6. Re-run ATC and reclassify every consumer independently.

Contract choice is type- and release-specific. C1 is common for local use but not universal; remote
services and classic object types may require C0, C3 or another supported contract.

## 7. Wrapper

### Use only when

- no suitable released successor exists;
- the requirement cannot be removed or redesigned economically;
- Private Edition/on-premise permits managed B/C debt;
- access can be isolated behind a stable released custom API;
- exception ownership and a retirement trigger exist.

### Placement

- Put the wrapper in a dedicated Standard ABAP software component/package, such as the landscape's
  HOME component.
- Never place it in the ABAP Cloud software component that contains the consumer.
- Keep forbidden/internal access inside the wrapper only.
- Release the wrapper interface/class/CDS contract, not the underlying SAP internal object.

### Recommended shapes

| Source dependency | Wrapper target |
|---|---|
| RAP business object | class/interface using EML |
| Function module/BAPI | class/interface |
| Classic class/interface | released class/interface facade |
| Table | CDS view, with DCL where authorization semantics require it |
| CDS | released CDS plus DCL |

Avoid wrappers for SAP GUI technology, unstable global state, uncontrolled `COMMIT WORK` or
`ROLLBACK WORK`, or semantics that cannot be represented safely.

### Result and lifecycle

- Classic API wrapper: consumer A plus wrapper B.
- Internal object wrapper: consumer A plus wrapper C exception.
- The program is not wholly A while wrapper debt exists; report both components.
- Unit-test the wrapper and consumer boundary.
- Review after SAP upgrades and API changelog updates.
- Replace and retire when a released successor appears.

Level B informational ATC findings do not require exemptions. Level C and exceptional D findings
need finding-level, owned, time-bound governance; exemption creation is currently manual.

## 8. Rewrite on-stack

Execution sequence:

1. Mirror source and capture active versions.
2. Establish behavior tests where feasible.
3. Delegate deterministic findings to `migrate-custom-code`.
4. Design against released APIs/extension points and release-supported ABAP syntax.
5. Generate a candidate without persisting it.
6. Lint, format and run SAP syntax checks.
7. Present the concrete diff for approval.
8. Write and activate through ARC-1.
9. Run ATC and applicable unit/CDS/RAP tests.
10. Reclassify the logical unit and update the plan.

Specialized dispatches are chosen only after the architecture action:

- SEGW service: `migrate-segw-to-rap`;
- embedded analytics: `generate-analytics-star-schema` and `generate-cds-analytical-query`;
- RAP behavior gap: `generate-rap-logic`;
- full production RAP stack: `generate-rap-service-researched`.

## 9. Side-by-side Level A on BTP

The side-by-side plan must define:

- released ERP API/event boundary and communication arrangement;
- data ownership and replication policy;
- synchronous versus asynchronous interaction;
- identity propagation and authorization;
- retry, idempotency and compensation;
- TCO, digital-access/commercial review where applicable;
- availability, observability, transport and operations;
- business parity and ERP retirement sequence.

The AEM resolver first distinguishes BTP ABAP Environment from CF/Kyma. For CAP, run
`modernize-abap-side-by-side-core` and persist `side-by-side-decision.json`; then dispatch only the
selected implementation branches.

### Data ownership

| Ownership | CAP modeling rule |
|---|---|
| `s4` | Consume a released remote API/event; no generated CAP persistence for S/4 tables |
| `btp_abap` | Persist only the bounded context approved for BTP ABAP Environment; do not dispatch CAP CDS |
| `cap` | Generate CAP CDS only for the approved bounded context |
| `replicated` | Generate CAP CDS plus source contract, key, ordering, idempotency, reconciliation, retention and deletion controls |
| `none` | Keep the service stateless |

### CDS split

| Target | Skill family | Responsibility |
|---|---|---|
| S/4 boundary | `sap-abap-cds`, RAP skills, `generate-cds-unit-test` | ABAP CDS/RAP and released ERP contract |
| BTP ABAP Environment | `sap-abap`, `sap-abap-cds`, ABAP unit/CDS tests | Side-by-side ABAP Cloud implementation and released remote boundary |
| CAP model/service | `sap-cap-capire`, `modernize-abap-cap-schema`, `modernize-abap-cap-service`, `generate-cap-cds-test` | CAP CDS persistence, service and tests |

Use both only for `cdsTarget=dual_boundary`. A custom RAP boundary built entirely on released
touchpoints may support pure A. A wrapper over classic/internal access remains a visible A+B/A+C
outcome even when CAP consumes its released facade.

### Conditional UI and runtime

- `uiTarget=cap_fiori_elements`: `scaffold-cap-fiori-elements` using CAP OData V4 metadata and CAP
  annotations;
- `uiTarget=ui5_freestyle`: `modernize-ui5-app`;
- `uiTarget=none|external`: neither UI skill;
- `sideBySideRuntime=cf`: CF/MTA packaging;
- `sideBySideRuntime=kyma`: `deploy-cap-to-kyma` after CAP verification.

The fact key is `sideBySideRuntime` everywhere (aem-model, chain conditions, resolver facts
files) — a facts file keyed `runtime` silently drops the value.

The generated target is accepted only after `generate-cap-cds-test` proves compilation, contracts,
authorization, events/replication where applicable and business parity. Placeholder `501`/TODO
handlers are an acceptance failure.

## 10. Deterministic and generated fixes

| Class | Example | Policy |
|---|---|---|
| Deterministic/high | SAP quickfix proposal applied exactly | One explicit package/transport approval may cover the batch; syntax/activation/ATC/tests remain mandatory |
| Mechanical/medium | Agent-authored bounded syntax modernization | Concrete diff approval before write |
| Generative/variable | API redesign, RAP conversion, wrapper, CAP extraction | Architecture approval, concrete diff, tests and owner approval |
| Low | Syntax failure, missing context, uncertain behavior | Proposal only; no write |

Package-wide deterministic execution must exclude unrelated refactoring and multi-object proposals
whose affected sources cannot all be reviewed and validated.

## 11. ATC

Enumerate first, then use two purposes explicitly:

| Purpose | Variant policy | Result |
|---|---|---|
| Availability | `atc_variants` lists the system's variants and its default | Variant availability becomes live evidence, not an assumption |
| Assessment | `ABAP_CLOUD_READINESS`, confirmed present | Evidence for Level A readiness and successors |
| Development/transport gate | Governed customer copy of `ABAP_CLOUD_DEVELOPMENT_DEFAULT` | Block configured P1/P2 findings before release |

The development variant should include Usage of APIs, Allowed SAP Enhancement Technologies,
Critical Statements, modification search and optional security checks. Record any system-specific
fallback and reduce confidence accordingly. Do not probe availability by launching an ATC run when
`atc_variants` can answer it directly; ATC also skips `$TMP`, so an empty result there proves
nothing about the variant.

## 12. Governance

### Minimum roles

| Role | Accountable for |
|---|---|
| Business owner | requirement, parity and retirement approval |
| Extension architect | AEM, target domain and responsibility boundary |
| API owner | released custom API compatibility |
| Development owner | implementation, tests and support |
| Clean Core governance | variants, exceptions, KPIs and lifecycle review |
| Operations/security | runtime, identity, monitoring and production acceptance |

### KPIs

| KPI | Definition for this orchestrator |
|---|---|
| Clean Core Share | proportion of in-scope logical units classified A after evidence review |
| Technical Debt Score | weighted B/C/D and exception burden, including wrapper debt |
| Unused Code Share | proportion of in-scope units proven unused and awaiting/after retirement |
| Business Modifications | count and trend of modifications/clones/no-API-zone implementations |

Do not hide C debt inside an A consumer count. Report both gross A consumers and residual wrapper
debt.

## 13. Effort model

Estimate logical units, not TADIR rows. Start with evidence-backed ranges and recalibrate from actual
execution.

| Action | Base range (person-days) | Main multipliers |
|---|---:|---|
| No action/document | 0.1-0.5 | missing ownership/evidence |
| Replace with standard | 1-8 | process/configuration and parity testing |
| Key User handoff/implementation | 0.5-5 | fields, forms, workflow and tenant transport |
| Deterministic remediation | 0.25-2 | finding count and affected objects |
| Rewrite on-stack | 2-20 | behavior complexity, fan-in, tests, released successor quality |
| Release custom API | 1-8 | fan-in, contract design and compatibility obligations |
| Wrapper | 3-15 | dependency semantics, isolation, exception and tests |
| Side-by-side BTP ABAP Environment | 8-50+ | target connection/package setup, released remote boundary, ABAP Cloud rewrite, identity, tests, parity and source retirement |
| Side-by-side CF | 10-60+ | data, UI, integration, security, operations and parity |
| Side-by-side Kyma | 15-75+ | CF factors plus container, cluster, registry, Helm, network and operational ownership |
| Hybrid | sum of owned parts plus 20-40% boundary overhead | consistency, events, failure handling |
| Retirement | 0.5-5 | references, business approval and cleanup |

Apply multipliers separately for criticality, fan-in, missing tests, release uncertainty, data
volume, UI redesign, external integrations and regulatory/security scope. Never report a single
point estimate without assumptions and confidence.

The fan-in multiplier reads `total` from `find_references`, never the number of returned rows (see
§6). An estimate built on a truncated consumer list understates exactly the units that need the most
work, so a `truncated` fan-in lowers estimate confidence instead of silently sizing the unit.

## 14. Scenario checks

The decision engine must correctly handle at least:

1. Existing A on-stack implementation remains on-stack.
2. Custom field/UI requirement selects Key User A with manual handoff.
3. Tight transaction/high-volume requirement selects embedded ABAP Cloud A.
4. Independently operated ABAP Cloud selects BTP ABAP Environment side-by-side, never on-stack.
5. SaaS/mobile/multi-system CAP requirement selects CF only after the complete Level A BTP contract.
6. Classic BAPI wrapper reports A+B.
7. Internal-table wrapper reports A+C and a time-bound exception.
8. Stable custom dependency selects API release and then reclassification.
9. Level D modification selects released BAdI A, classic B or side-by-side based on live evidence.
10. Unused unit retires after final references and owner approval.
11. Mixed custom field plus mobile use case selects hybrid and expands its nested runtime actions.
12. Public Cloud refuses B and wrapper debt.
13. Missing or conflicting AEM evidence selects `ResearchRequired`, never D by assumption.
14. CAP-owned data dispatches CAP schema; S/4-owned data does not.
15. A justified Kubernetes requirement selects Kyma; runtime preference alone does not.
16. CAP Fiori Elements and freestyle UI5 are mutually exclusive dispatches.
