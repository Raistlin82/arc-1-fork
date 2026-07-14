# Clean Core Evidence Sources

The orchestrator uses a local curated knowledge base first, then live system evidence and official
SAP sources for release-specific facts. It never treats a search snippet or community answer as
sufficient evidence for a write decision.

## Evidence precedence

| Priority | Source | What it proves |
|---:|---|---|
| 1 | Live ARC-1 system evidence | Actual ERP release, components, object state, dependencies, ATC findings, transports and ABAP tests |
| 2 | Local curated Clean Core knowledge | Architecture rules, AEM criteria, levels, wrappers, governance and page provenance |
| 3 | Official structured SAP object data | Released API/extension-point status and successors by edition/release |
| 4 | Official SAP Help, product documentation and samples | Product behavior, supported technology and implementation guidance |
| 5 | SAP Notes and lifecycle sources | Release-specific corrections/exceptions requiring authenticated access |
| 6 | SAP Community/blogs | Symptom discovery only after official sources are insufficient |

For side-by-side implementation proof, generated CAP model hashes, local compile/test output,
deployed-runtime evidence and the approved architecture record complement ARC-1. They prove the BTP
target; they do not override ARC-1 evidence about the connected S/4 system.

When sources conflict, the plan records the conflict. Live system evidence wins for current object
state; official SAP release-specific documentation wins for supportability; the unit remains
`ResearchRequired` until the conflict is resolved.

## Local knowledge base

Path: `knowledge/clean-core-extensibility/`

| Artifact | Runtime role |
|---|---|
| `decision-rules.json` | Compact, curated rules with topics, source pages and confidence |
| `ARC1_RUNTIME_ACTION_MAP.md` | Mapping from knowledge concepts to decisions and validated ARC-1 operations |
| `graphify-out/graph.json` | Full concept/relation graph for exploration and future index refinement |
| `graphify-out/graph.curated.json` | Deterministic alias-merged graph with explicit curated bridges and no zero-degree nodes |
| `graphify-out/CURATION.md` | Curation metrics and the explicit non-executable bridges added to the source graph |
| `graphify-out/GRAPH_REPORT.md` | Communities, quality observations and graph summary |
| `graphify-out/graph.html` | Interactive human exploration |
| `raw/*.md` | Page-bounded source extraction used to audit a rule without loading the full document |

Outside the knowledge directory, [`aem-model.json`](./aem-model.json) operationalizes the AEM
selection criteria and `runtime/resolve-plan.mjs` combines them with `chain.json`. The knowledge
graph explains and traces concepts; only the curated rules, structured AEM facts and live evidence
authorize a runtime decision.

The source PDF is not packaged. The curated index preserves its title/version and page references;
raw chunks preserve enough local context to audit each rule. Graph generation caches and the local
PDF symlink are build inputs, not runtime skill content.

During repository work, query the compact layer with:

```text
npm run clean-core:query -- wrapper on-stack
npm run clean-core:query -- atc exemption --json
npm run clean-core:graph
npm run --silent clean-core:resolve -- --facts docs/refactor/unit-facts.json
```

No result means the orchestrator must use the lookup ladder or return `ResearchRequired`; it must
not improvise a rule from graph proximity.

## Primary knowledge source

| ID | Source | Coverage |
|---|---|---|
| `clean-core-extensibility-architects-2026-07` | *Clean Core Extensibility for Architects - SAP Cloud ERP Private*, v20.9D, July 2026 | Clean Core levels, Key User, Developer Extensibility, side-by-side, AEM, wrappers, ATC, governance, brownfield transition and KPIs |

Important curated page groups:

| Topic | Pages |
|---|---|
| Levels A/B/C/D | 51-75, 566-568 |
| Level A Key User | 76-125, 801-900 |
| Developer Extensibility and embedded ABAP Cloud | 126-150 |
| Side-by-side and SAP Build | 151-225 |
| On-stack versus side-by-side selection | 281, 301-325 |
| AEM and wrapper guidance | 326-375 |
| Governance and system setup | 401-475 |
| Brownfield custom-code transition | 476-550 |
| AI fixes, wrappers, ATC and exemptions | 551-600 |

Page references are validated for type and uniqueness by `check:clean-core-skills`; content changes
require human review because page numbers alone cannot prove semantic accuracy.

## Live ARC-1 evidence

Use operation IDs from [`action-catalog.json`](./action-catalog.json):

| Question | Operations |
|---|---|
| What system and release is this? | `system_probe`, `read_system` |
| What custom code exists? | `inventory_package`, `exact_tadir_lookup`, `read_source` |
| Who depends on it? | `read_dependencies`, `find_references` |
| What is the current Clean Core evidence? | `atc_assessment`, `read_api_state` |
| Did remediation work? | `syntax_check`, `activate_object`, `atc_assessment`, `run_unit_tests`, `read_diff` |
| Is deletion/release safe? | `find_references`, `transport_check` |

ARC-1 ATC cannot by itself prove business suitability, standard parity, Key User fit or target
architecture. Those require the AEM evidence pack and owner decisions.

## Official structured SAP object sources

Prefer an exposed SAP documentation MCP exact-object tool. Current clients may expose equivalent
functions under different namespaces, so discover the capability rather than hardcoding it.

Fallback structured source:

| Source | URL | Use |
|---|---|---|
| SAP Cloudification Repository data | https://github.com/SAP/abap-atc-cr-cv-s4hc | Released object status and successors by edition |

For a known SAP object, record object type, edition, source release, release state, successor,
retrieval date and source URL. A name-only keyword match is not enough.

## Official documentation

| Source | URL | Use |
|---|---|---|
| SAP Help - Clean Core | https://help.sap.com/docs/btp/sap-business-technology-platform/clean-core | Clean Core concepts and extensibility guidance |
| SAP Help - ABAP Cloud | https://help.sap.com/docs/abap-cloud | Language version, released APIs and developer extensibility |
| SAP Business Accelerator Hub | https://api.sap.com/ | Released remote APIs and events |
| SAP CAP documentation | https://cap.cloud.sap/docs/ | CAP side-by-side implementation |
| CAP `cds.test` | https://cap.cloud.sap/docs/node.js/cds-test | Current CAP Node.js test API and runner guidance |
| CAP Fiori UI guidance | https://cap.cloud.sap/docs/guides/uis/fiori | CAP annotations, Fiori preview and app separation |
| CAP Kyma deployment | https://cap.cloud.sap/docs/guides/deploy/to-kyma | Official `cds add kyma`, Helm build and deployment workflow |
| SAP BTP documentation | https://help.sap.com/docs/btp/sap-business-technology-platform | Runtime, security and service architecture |
| SAP Fiori tools | https://help.sap.com/docs/SAP_FIORI_tools | CAP/RAP-aware Fiori Elements generation and validation |
| SAP Fiori Design Guidelines | https://experience.sap.com/fiori-design-web/ | UX and accessibility decisions |
| SAP Discovery Center | https://discovery-center.cloud.sap/ | BTP services and reference missions |
| SAP samples | https://github.com/SAP-samples | Supported implementation examples, never classification authority |

Prefer official search/fetch capabilities when exposed. Use page crawling only for the exact page
needed and cache the result with retrieval date; do not perform broad recurring crawls as part of a
normal plan.

## Authenticated/manual sources

| Source | Use | Plan behavior |
|---|---|---|
| SAP Notes / SAP for Me | release-specific corrections, user-exit exceptions, product support | Emit note number and manual verification owner |
| Maintenance Planner/product lifecycle | compatibility and lifecycle | Record manual evidence link/date |
| Customer architecture/governance tools | AEM decisions, business ownership, exemptions, KPIs | Link or export evidence; never invent completion |

## Community evidence

SAP Community and blogs may help locate an obscure error or candidate successor. They cannot alone
authorize API release, wrapper exceptions, deletion or production architecture. Confirm every
material claim with live system evidence or an official SAP source.

## Required evidence record

Every non-trivial decision stores:

```json
{
  "claim": "The target can consume a released API",
  "sourceType": "live-system-or-official-sap",
  "sourceId": "object-and-edition-specific-id",
  "sourceLocation": "URL or PDF pages",
  "retrievedAt": "YYYY-MM-DD",
  "appliesTo": "system release and logical unit",
  "confidence": "high|medium|low",
  "openConflict": null
}
```

A side-by-side Level A record additionally stores the exact released API/event/custom RAP contract,
all-touchpoint result, direct/unreleased access checks, data ownership, replication controls,
transaction and identity models, runtime-fit rationale, CAP compile/test evidence, deployment
evidence where executed, parity result and ERP retirement or stable-boundary plan. A wrapper is
recorded as a separate B/C component even when its facade is released.

Cache age never upgrades confidence. Recheck API release state, supported contracts and successor
availability before execution even when planning evidence is cached.
