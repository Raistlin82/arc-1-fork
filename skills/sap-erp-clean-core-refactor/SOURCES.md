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
| `UPSTREAM.json` | Pin of the graph source: repository, tag, full commit SHA, and path, size and sha256 of every downloaded file |
| `graphify-out/graph.curated.json` | **Downloaded at build, not committed.** The full curated graph of `sap-clean-core-expert` (all five principles): alias-merged, explicit `CURATED` bridges, no zero-degree nodes |
| `graphify-out/CURATION.md` | **Downloaded at build, not committed.** The expert's curation record: alias merges, restored nodes and the non-executable `CURATED` bridges |
| `raw/*.md` | **Local only, never committed.** Page-bounded source extraction used to audit a rule without loading the full document; present only in private installs (see [Private raw corpus](#private-raw-corpus)) |

### Graph provenance

The graph has one source: [`Raistlin82/sap-clean-core-expert`](https://github.com/Raistlin82/sap-clean-core-expert),
tag `v0.3.1`, commit `39846273dae1891fd4ef744c37a8068c12f56333` (curated graph: 531 nodes, 1062 links,
30 communities, 41 hyperedges; 935 `EXTRACTED`, 124 `INFERRED`, 3 `CURATED` links). It is derived from
six SAP publications: *Clean Core Extensibility for Architects* (2026-07), the Clean Core L200 deck,
the Governance & Operational Practices Maturity deck, the Measurement Criteria for Clean Core KPIs deck,
the Clean Core Data white paper and the Clean core integration white paper (2026-08), as the expert's
README and `CURATION.md` record.

`npm run build` runs `scripts/ci/sync-clean-core-graph.mjs`, which downloads each file listed in
[`UPSTREAM.json`](./knowledge/clean-core-extensibility/UPSTREAM.json) from
`raw.githubusercontent.com` at the pinned commit, refuses redirects, and writes it only when size and
sha256 match. Any mismatch or network failure fails the build and leaves no file behind;
`npm run check:clean-core-graph` verifies the files offline and `check:clean-core-skills` repeats that
check before it validates the graph contract. The downloaded files are gitignored and ship in the
npm package. A checkout that has not run the build has no graph: run `npm run clean-core:graph-sync`.
To move to a newer expert release, change the commit, sizes and hashes in `UPSTREAM.json` in one
reviewed commit (take them from `git show <commit>:<path>` in the expert repository).

**License.** The graph is SAP SE copyright material in derived form (labels, short rationales and
page/slide references taken from the publications above). The expert's MIT license covers its plugin
software only, not its knowledge base, and the same holds here: this repository's MIT license does
not cover the downloaded graph.

Precedence is unchanged: live ARC-1 evidence first, then `decision-rules.json` and the structured
AEM facts, then the graph. Only the extensibility part of the graph maps to runtime decisions; the
other four principles explain and never authorize an action.

Outside the knowledge directory, [`aem-model.json`](./aem-model.json) operationalizes the AEM
selection criteria and `runtime/resolve-plan.mjs` combines them with `chain.json`. The knowledge
graph explains and traces concepts; only the curated rules, structured AEM facts and live evidence
authorize a runtime decision.

The source PDF is not packaged, and neither is any transcript of it. The curated index preserves its
title/version and page references, which is all the public repository ships. Graph generation
caches, the local PDF symlink and the raw chunks are build inputs, not runtime skill content.

### Private raw corpus

The source document is SAP copyrighted material distributed to SAP partners, so its full text must
never be committed, packaged or published. `.gitignore` (repository root and `knowledge/`) and
`knowledge/.npmignore` exclude `raw/`, `source/`, `sources/` and PDFs under any `knowledge/`
directory. Do not weaken those rules, and do not paste substantial passages of the document into
committed files: rules and graph nodes carry short labels and page numbers only.

Detect the mode at runtime:

```bash
KB=skills/sap-erp-clean-core-refactor/knowledge/clean-core-extensibility
HAS_RAW=$([ -d "$KB/raw" ] && echo yes || echo no)
```

- `HAS_RAW=no` (any clone of the public repository): work from `decision-rules.json`, the curated
  graph and the page references, and cite the source as *Clean Core Extensibility for Architects*
  (2026-07), PDF page N. Never fabricate a quotation you cannot see.
- `HAS_RAW=yes` (private install): open the cited `raw/*.md` chunk to audit the exact wording
  before relying on it.

To rebuild the private corpus locally, obtain the PDF through your own SAP partner access, place it
at `$KB/source/clean-core-extensibility-for-architects-2026-07.pdf` (ignored), and regenerate the
page-range chunks into `$KB/raw/` (ignored) with the same graphify extraction that produced
`graphify-out/`. Both directories stay on your machine.

During repository work, query the compact layer with:

```text
npm run clean-core:query -- wrapper on-stack
npm run clean-core:query -- atc exemption --json
npm run clean-core:graph-sync
npm run --silent clean-core:resolve -- --facts docs/refactor/unit-facts.json
```

No result means the orchestrator must use the lookup ladder or return `ResearchRequired`; it must
not improvise a rule from graph proximity.

## Primary knowledge source

| ID | Source | Coverage |
|---|---|---|
| `clean-core-extensibility-architects-2026-07` | *Clean Core Extensibility for Architects - SAP Cloud ERP Private*, v20.9D, July 2026 | Clean Core levels, Key User, Developer Extensibility, side-by-side, AEM, wrappers, ATC, governance, brownfield transition and KPIs |

The integration axis has its own source: SAP Note 3690029 and SAP's *Clean core integration* white
paper (sap.com/documents/1327955), which define an A–D scale for integration technologies
separate from the extensibility levels above. The white paper's concepts are in the graph (since
the full expert graph, see [Graph provenance](#graph-provenance)), but no rule in
`decision-rules.json` cites it yet: the chain still consumes the integration axis through the
Integration Interfaces section of `sap-migration-dossier`.

Important curated page groups:

| Topic | Pages |
|---|---|
| Levels A/B/C/D | 51-75, 566-568 |
| Level A Key User | 76-125, 801-900 |
| Developer Extensibility and embedded ABAP Cloud | 126-150 |
| Side-by-side and SAP Build | 151-175 |
| Released APIs and wrappers | 176-225 |
| On-stack versus side-by-side selection | 281, 301-325 |
| AEM and wrapper guides pointers | 326-375 |
| Governance and system setup | 401-475 |
| Brownfield custom-code transition | 476-550 |
| AI fixes, wrappers, ATC and exemptions | 551-600 |

`check:clean-core-skills` validates only that `sourcePages` are integer arrays (shape, not
content); semantic accuracy of every page citation requires human review against the source
document (or the private raw transcripts), because page numbers alone cannot prove what a page says.

## Live ARC-1 evidence

Use operation IDs from [`action-catalog.json`](./action-catalog.json):

| Question | Operations |
|---|---|
| What system and release is this? | `system_probe`, `read_system` |
| Which ATC check variants does it actually have? | `atc_variants` (never inferred from an ATC run) |
| What custom code exists? | `inventory_package`, `exact_tadir_lookup`, `read_source` — a listing is partial until a TADIR census confirms it |
| Who depends on it? | `read_dependencies`, `find_references`, `read_usages`, `read_impact` (for CDS blast radius), `read_relations` (transitive shape, when exposed) |
| What is the current Clean Core evidence? | `atc_assessment`, `atc_batch_assessment`, `read_api_state` |
| What did a central/scheduled ATC run find (e.g. S/4HANA readiness)? | `atc_central_results`, `atc_central_result_findings`; ad hoc on a checked system: `atc_remote_assessment` |
| Does the package still pass its gates? | `atc_ci_gate`, `unittest_ci_gate` (govern mode, fail closed) |
| What exactly does this request change? | `transport_diff` (DDIC objects appear without a source diff) |
| What does this DDIC change touch? | `read_source`, `read_ddic_structure`, `find_references` with `maxResults` |
| Did remediation work? | `syntax_check`, `activate_object`, `atc_assessment`, `run_unit_tests`, `read_diff` |
| Is deletion/release safe? | `find_references`, `transport_check` |

Fan-in counts come from the response's `total` (`usageCount`/`summary` for `read_usages`/`read_impact`),
never from the returned rows: these operations page, and a capped list understates the blast radius.
`truncated=true` makes the fan-in degraded evidence.

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
| SAP Help - Adjustment of Database Structures | https://help.sap.com/docs/ABAP_PLATFORM_NEW/ec1c9c8191b74de98feb94001a95dd76/cf21f1ab446011d189700000e8322d00.html | The three adjustment methods (delete and recreate, ALTER TABLE, conversion), what decides between them, and the rule against adjusting during production (PATTERNS §15) |
| SAP Help - Typical Import Steps | https://help.sap.com/docs/ABAP_PLATFORM_NEW/4a368c163b08418890a406d413933ba7/3dad5b0c4ebc11d182bf0000e829fbfe.html | The *structure conversion* step every transport import runs, which is why development data never decides a DDIC class |
| ABAP Keyword Documentation - DDIC table adjustment | https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/ABENDDIC_DATABASE_TABLES_ADJ.html | Changes that force an adjustment of existing data: client column, deleted or renamed fields, technical field properties; domain effects in `ABENDDIC_DOMAINS_TECH` |
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

## Release upgrade sources

Read on 2026-11-14 for the upgrade mode (PATTERNS §16). Anything not confirmed there is marked *to verify*.

| Fact | Source | State |
|---|---|---|
| SAP's level model: A = ABAP Cloud and released APIs (no ATC finding); B = classic APIs and classic extension points listed in the Cloudification Repository classification (priority 3 finding); C = internal SAP objects, conditionally clean with the changelog for SAP objects (priority 2); D = not recommended objects, `noAPI`, modifications (priority 1). SAP may reclassify an internal object as a classic API or as not recommended, which moves the level | SAP Cloud ALM, *Extensibility* — https://help.sap.com/docs/CloudALM/877c96cf971648b09ee0d0a64f7f4fef/eaa61d6ae6744ccdb0d18820fb8998c9.html | verified |
| Released objects per release: `src/objectReleaseInfo_PCE<release>_<FPS>.json` (on 2026-11-14: `PCE2022`, `PCE2022_1`, `PCE2022_2`, `PCE2023_0`…`PCE2023_3`, `PCE2025_0`…`PCE2025_2`, `PCELatest`), for SAP Cloud ERP Private *or on-premise*; files per feature pack stack only, no support-package updates. Fields: `state` (`released`, `deprecated`, `notToBeReleased`, `notToBeReleasedStable`), `successorClassification`, `successors[]`, `successorConceptName`. The README's example name `objectReleaseInfo_PCE2025.json` does not exist (HTTP 404); the files carry the FPS suffix | https://github.com/SAP/abap-atc-cr-cv-s4hc (README and `src/` listing at commit of 2026-11-12) | verified |
| Classic APIs (Level B): one file, `src/objectClassifications_SAP.json`, states `classicAPI` and `noAPI`, `labels` (for example `transactional-consistent`), `successors`; it is not split per release | same repository | verified |
| The delta of released objects between two releases is not published by SAP: it is the difference of two release files. Computed here: `PCE2025_2` releases 4,530 objects that `PCE2023_3` does not (36 of them were `notToBeReleasedStable` and 1 `deprecated` there); 67 objects released in `PCE2023_3` are not released in `PCE2025_2` (47 absent, 20 `deprecated`) | computed from the two files on 2026-11-14 | computed, not an SAP statement |
| ATC: *Clean Core → Usage of APIs (Cloudification Repository)* with the PCE file for Private Edition and on-premise (Notes 3565942 for "Usage of APIs" and "Allowed Enhancement Technologies", 3449860 for classic APIs); *Cloud Readiness → Usage of Released APIs (Cloudification Repository)* for SAP Cloud ERP (Notes 3284711, 3377462) | repository README | verified as cited by SAP there; the notes themselves not re-read |
| Successors per finding: SAP's *ABAP Clean Core Adaptation Agent* identifies C1-released successor APIs for each ATC finding (default variant `ABAP_CLEAN_CORE_READINESS`; limits in Note 3809815) | https://help.sap.com/docs/ABAP_Cloud/d165a95020e94e419319f02c21874ffb/dc092d1bd30b475c8ac3072b9a4cbc10.html | verified; whether the plain ATC finding text names the successor is *to verify* |
| Release contracts C0–C4 and `CL_ABAP_DOCU_RELEASED_APIS` (the released objects of the current system) | https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/ABENABAP_RELEASE_CONTRACTS.html | verified |
| Business modifications are the critical modifications for upgrades ("likely require significant adaptation"); note corrections and legacy enhancement technologies are anticipated and cause minimal effort | SAP Cloud ALM, *Business Modifications* — https://help.sap.com/docs/CloudALM/877c96cf971648b09ee0d0a64f7f4fef/90b9a4309c02485ea1b8006e6d022f63.html | verified |
| Combine the upgrade with custom-code housekeeping and remove unused code | *Upgrade Guide for SAP S/4HANA 2025*, 2.2 — https://help.sap.com/doc/760ce610a2af4174a329d2d8315378e2/2025/en-US/UPGR_OP2025.pdf | verified |
| Impact Analysis for Clean Core Developments Level C (incompatible changes of used internal APIs), planned with SAP S/4HANA 2023 SPS07 and 2025 SPS03 | *SAP S/4HANA and SAP S/4HANA Cloud Private Edition Roadmap Information* — https://help.sap.com/docs/ABAP_PLATFORM_CROSS/f2afdaf444844c38909aefc7bc792cdb/696ec787abb2469b9c76ef1d3933b2c1.html | planned; availability *to verify* |
| An ordering "remove upgrade debt before SUM, raise the level after it" is not an SAP prescription: it is this skill's design, derived from the facts above | — | design decision |

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
recorded as a separate B/C component even when its facade is released. A DDIC change record stores
the as-found and target definition of every object, its `ddicDbImpact` class with the where-used
evidence behind it and, for a handoff, the database plan per system and the retention approval.

Cache age never upgrades confidence. Recheck API release state, supported contracts and successor
availability before execution even when planning evidence is cached.
