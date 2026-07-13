# Clean Core Integration Map

This document defines which capability is used, when it becomes mandatory and what happens when it
is unavailable. The decision protocol is in [`SKILL.md`](./SKILL.md), routing in
[`chain.json`](./chain.json), valid tool shapes in [`action-catalog.json`](./action-catalog.json),
and the architecture rules in [`PATTERNS.md`](./PATTERNS.md).

## Responsibility boundary

| Layer | Responsibility | May write to SAP? |
|---|---|---:|
| Orchestrator | Standard-first, AEM, target domain, level, action, confidence and gates | No directly |
| ARC-1 MCP | Live evidence, source mutation, activation, API release, packages and transports | Yes, under server safety policy |
| Local ARC-1 skills | Specialized planning/generation around ARC-1 tools | Only through ARC-1 |
| SAP documentation MCPs | Released-object, successor, feature and official documentation evidence | No |
| External SAP skills/plugins | Domain guidance and review gates | No direct SAP write in this chain |
| Human/SAP apps | Business parity, Key User implementation, exceptions and approvals | Outside ARC-1 |

Capability discovery happens before planning. Record the exact exposed namespace or skill name;
never assume a plugin command exists because it appears in this document.

## ARC-1 capability map

| Phase | Required ARC-1 capability | Canonical operation IDs | Missing behavior |
|---|---|---|---|
| Landscape | system, components, feature probe | `system_probe`, `read_system` | Block target decision |
| Inventory | package read, exact TADIR lookup, source read | `inventory_package`, `exact_tadir_lookup`, `read_source` | Block package plan |
| Impact | dependencies and where-used | `read_dependencies`, `find_references` | Mark fan-in degraded; block destructive actions/API release |
| Classification | ATC and API state | `atc_assessment`, `read_api_state` | `ResearchRequired` for affected unit |
| Mechanical fixes | quickfix, lint, syntax | `quickfix_preview`, `quickfix_apply`, `lint_candidate`, `format_candidate`, `syntax_check` | Keep as proposal/manual remediation |
| ABAP execution | update/create, activation, unit tests, diff | `write_update`, `batch_create_objects`, `activate_object`, `run_unit_tests`, `read_diff` | Plan remains read-only |
| API governance | read/set release contract | `read_api_state`, `release_api` | No release action; redesign or research |
| Wrapper | package, class, API release, SKTD | `create_wrapper_package`, `create_wrapper_class`, `release_api`, `write_governance_document` | Wrapper path blocked |
| Retirement | references, delete | `find_references`, `delete_object` | No deletion |
| Transport | check, create, recursive release | `transport_check`, `transport_create`, `transport_release` | No write execution/release |

Use the catalog rather than writing abbreviated examples in generated plans. Runtime values are
substituted, but the property names and required inputs remain unchanged.

## Local skill orchestration

| Skill | Status | Trigger | Role |
|---|---|---|---|
| `bootstrap-system-context` | MUST | Every new system or stale context | Landscape/release/feature baseline |
| `sap-transport-overview` | MUST before writes | Plan/execute | Open request and collision evidence |
| `sap-clean-core-atc` | MUST | Package/object classification | Current A/B/C/D/Unknown evidence |
| `sap-unused-code` | SHOULD; MUST for removal | SQL/runtime evidence available | Usage evidence and removal candidates |
| `explain-abap-code` | MUST for non-trivial non-A | Intent is not obvious | Business/technical understanding |
| `sap-migration-dossier` | Optional | `--report=dossier` or large program | Reviewable HTML/JSON/CSV artifacts |
| `setup-abap-mirror` | MUST before writes | Any executable source change | As-found source/rollback baseline |
| `sap-object-documenter` | MUST for decisions/exceptions | Standard replacement, Key User, wrapper, keep B | As-is/to-be and governance record |
| `migrate-custom-code` | MUST for deterministic findings | Quickfixable/mechanical ATC set | Canonical quickfix executor |
| `generate-abap-unit-test` | SHOULD; MUST for wrapper/high-risk logic | ABAP behavior needs regression protection | Test baseline and generated tests |
| `generate-cds-unit-test` | SHOULD; MUST for semantic CDS change | CDS behavior/filter/aggregation changes | CDS regression tests |
| `generate-rap-logic` | Branch-MUST | RAP behavior implementation gap | Behavior-pool implementation |
| `generate-rap-service-researched` | Branch-MUST | Approved full production RAP target | Research-backed RAP stack |
| `generate-rap-service` | MAY only | Small prototype explicitly requested | Never a production refactor default |
| `migrate-segw-to-rap` | Branch-MUST | SEGW OData V2 target | RAP/OData V4 replacement |
| `generate-analytics-star-schema` | Branch-MUST | Embedded analytical model | Cube/star model generation |
| `generate-cds-analytical-query` | Branch-MUST | Analytical query target | Query generation |
| `debug-slow-sql` | Branch-MUST | Hot data access or performance regression | SQL/runtime evidence |
| `modernize-abap-to-btp-cap` | Branch-MUST for CF | Approved side-by-side Cloud Foundry | CF-only CAP orchestrator |
| `modernize-abap-cap-schema` | Internal CF branch | CAP schema extraction | Data model target |
| `modernize-abap-cap-service` | Internal CF branch | CAP service extraction | Service target |
| `convert-ui5-to-fiori-elements` | Conditional | Annotation-driven UI target | Fiori Elements migration |
| `modernize-ui5-app` | Conditional | Freestyle/custom-control UI target | UI5 modernization |
| `sap-transport-review` | MUST before release | Any changed transport | Diff/risk/release gate |
| `analyze-chat-session` | Optional | After material execution | Lessons and pattern feedback |

## Key User and Kyma capability status

| Capability | Current implementation | Required plan output |
|---|---|---|
| Key User extensibility | Decision and manual handoff only | SAP app/tool, released extension point, custom field/object, business owner, lifecycle, acceptance tests |
| Kyma side-by-side | Architecture and handoff only | workload split, APIs/events, security, operations, delivery owner, deployment and acceptance plan |

Do not route Key User work through generic `SAPWrite`. Do not invoke the CF-only CAP skill for Kyma.
When a future MCP or skill exposes a validated implementation API, add it to `action-catalog.json`
and CI before changing either path to executable.

## SAP documentation MCPs

Current clients may expose equivalent functionality under `mcp-sap-docs`, `abap_mcp_server` or
another namespace. Discover tools first.

| Capability | Severity | Use |
|---|---|---|
| exact SAP object details/release state | MUST for disputed or external API classification | Verify level, edition and successor for a known object |
| object search | SHOULD | Find released alternatives by keyword/type/component |
| unified official documentation search/fetch | SHOULD | Confirm architecture, feature and release-specific behavior |
| ABAP feature matrix | MUST when rewrite uses release-sensitive syntax | Prevent unsupported ABAP language proposals |
| Discovery Center service details | SHOULD for BTP branches | Service capabilities and reference architecture evidence |
| UI5 version comparison | Branch-SHOULD | UI modernization and workaround retirement |
| community search | Last resort, only when exposed | Exact obscure error after official evidence is insufficient |

MCP evidence improves classification but never overrides live ARC-1 system evidence for the actual
customer release and object state.

## External SAP skills and plugins

These are capability references only. Do not copy their text into this repository.

### Baseline

| Skill/capability | Severity | Trigger |
|---|---|---|
| `sap-abap` | SHOULD | Any generated ABAP rewrite |
| `sap-abap-cds` | Branch-MUST | CDS/RAP target |
| `sap-api-style` | SHOULD; MUST for externally exposed custom API | Before API release/service contract approval |
| `sap-btp-best-practices` | Branch-MUST | Every production BTP target |
| `sap-btp-developer-guide` | Branch-MUST | BTP architecture/deployment handoff |
| `sap-cap-capire` | Branch-MUST | CAP target |

### BTP and integration branches

| Skill/capability | Trigger |
|---|---|
| `sap-btp-connectivity` | Destinations, Cloud Connector, principal propagation |
| `sap-btp-service-manager` | Service instance/binding lifecycle is in scope |
| `sap-btp-cloud-transport-management` | Customer uses cTMS |
| `sap-btp-cloud-logging` | Production observability |
| `sap-btp-job-scheduling` | Scheduled workloads |
| `sap-btp-integration-suite` | iFlows/API Management/integration orchestration |
| `sap-btp-master-data-integration` | MDI events/master-data subscription |
| `sap-btp-cias` | IAS/customer identity architecture |
| `sap-btp-build-work-zone-advanced` | Work Zone exposure |
| `sap-btp-intelligent-situation-automation` | Workflow/situation automation |
| `sap-cloud-sdk-ai`, `sap-ai-pathfinder`, `sap-ai-core` | AI-specific extension branch |

### UI branches

| Skill/capability | Trigger |
|---|---|
| `sap-fiori-app-development` | Fiori Elements or SAP Fiori app creation/modification |
| `sap-fiori-tools`, `sap-fiori-create-cli` | Fiori project generation/tooling |
| `sap-fiori-guidelines` | Stakeholder-facing UX and accessibility review |
| `sapui5-linter`, `sapui5-cli`, `sap-fiori-eslint-plugin` | UI5 lint/build/quality gates |
| `sap-fiori-add-visual-filter`, `sap-fiori-analytical-chart` | Those controls are in the approved UX |

### Data and analytics branches

| Skill/capability | Trigger |
|---|---|
| `sap-sqlscript`, `sap-hana-cli` | AMDP, SQLScript, HDI or HANA-native implementation |
| `sap-hana-ml`, `sap-hana-cloud-data-intelligence` | HANA ML/data-pipeline target |
| `sap-datasphere` | Datasphere target |
| `sap-sac-custom-widget`, `sap-sac-planning`, `sap-sac-scripting` | SAP Analytics Cloud deliverable |

`sap-commerce-cloud` is relevant only when the selected side-by-side use case is an ecommerce or
consumer-experience hub. It is not a generic Clean Core dependency.

## Missing enterprise integrations

No currently exposed capability in this repository automates SAP Cloud ALM, LeanIX, Signavio, RISE
Methodology Dashboard, Key User apps or ATC exemption creation. The orchestrator records manual
handoffs and evidence links for these systems. They are not simulated with invented tool calls.

## Capability severity

| Severity | Meaning |
|---|---|
| MUST | The branch blocks when unavailable unless `chain.json` names an accepted fallback |
| SHOULD | Continue only with a recorded degraded/manual equivalent |
| OPTIONAL | Use when it materially improves the selected branch |
| MAY-only | Never selected automatically |

The plan header records every missing MUST/SHOULD capability, its fallback, owner and effect on
confidence.
