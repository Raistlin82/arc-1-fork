# Integrations Map — Level A Refactor

Detailed mapping of every refactor step against:
- **ARC-1 MCP tools** that perform the operation on the SAP system
- **arc-1 native skills** that the orchestrator delegates to
- **secondsky/sap-skills plugins** that provide the language / framework knowledge for the operation
- **Other external sources** (Apify, MCP servers, manual)

Use this document to:
- Verify the skill's coverage of available tooling.
- Diagnose what's missing in an environment ("ARC-1 not configured" / "secondsky plugin X not installed" / …).
- Understand the cost/value contribution of each integration point.

## Architectural roles

| Layer | Role | Examples |
|---|---|---|
| **ARC-1 MCP** | the *hands* — reads/writes ABAP objects on the SAP system via ADT REST API | `SAPRead`, `SAPWrite`, `SAPActivate`, `SAPLint`, `SAPContext`, `SAPDiagnose`, `SAPTransport`, `SAPGit`, `SAPManage`, `SAPNavigate`, `SAPSearch`, `SAPQuery` |
| **arc-1 native skills** | the *playbook* — sequences of MCP operations encoded as reusable agents | `bootstrap-system-context`, `sap-clean-core-atc`, `generate-rap-logic`, `modernize-abap-to-btp-cap`, … |
| **secondsky/sap-skills plugins** | the *library of patterns* — how to write what the hands will write, when installed. Treat them as external capability-gated dependencies; do not copy their GPL text into ARC-1 docs | `sap-abap`, `sap-abap-cds`, `sap-cap-capire` (with 4 agents), `sap-btp-developer-guide`, `sap-api-style`, `sap-fiori-tools`, `sap-fiori-app-development`, `sap-fiori-guidelines`, `sapui5-linter`, `sap-btp-best-practices`, … |
| **This skill** (`sap-erp-clean-core-refactor`) | the *orchestrator* — decides which patterns to apply using which hands following which playbook | (you are here) |
| **External knowledge** | JIT documentation lookup when local cache misses | `mcp-sap-docs` / `abap_mcp_server` when connected, Apify when connected, WebFetch/manual pointers for simple HTML. Always use the tool names actually exposed by the current MCP client; do not hardcode a namespace |

## Step-by-step integration map

### Step 1 — Pre-flight

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 1a — ARC-1 connectivity probe | `SAPSearch(searchType="object", query="<pkg>", maxResults=10)` | — | — | — | Cheap call to verify the server responds + auth works |
| 1b — Optional capability matrix | — | — | plugin skill probes | `mcp-sap-docs`/`abap_mcp_server`, Apify, `@sap/cds-mcp`, context7, Fiori MCP, UI5 MCP | Record active/missing/degraded plus the exact exposed tool names. Only ARC-1 blocks the run globally; branch-specific MCPs block only that branch. For external skills, record availability of `sap-btp-best-practices`, `sapui5-linter`, `sap-fiori-guidelines`, `sap-fiori-app-development`, and `sap-fiori-tools` |
| 1c — Resolve `$TARGET` | — | — | `sap-btp-developer-guide` (target landscape reference) | — | Default `btp-cf` |
| 1d — Init local cache | (bash) | — | — | — | `.cache/sap-clean-core/` gitignored |
| 1e — Bootstrap system context | `SAPRead(type="SYSTEM")`, `SAPRead(type="COMPONENTS")`, `SAPManage(action="probe")`, `SAPLint(action="list_rules")` | **`bootstrap-system-context`** | — | `abap_feature_matrix` when SAP docs MCP is connected | One-time per system; produces `system-info.md` with release, components, feature flags, lint preset, and optional release-feature snapshot |
| 1f — Transport-conflict scan | `SAPTransport(action="list", summary=true, user="*")` | **`sap-transport-overview`** | — | — | Objects already locked in someone else's open TR stall Step 6.5 |

### Step 2 — Inventory

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 2a — Package enumeration | `SAPRead(type="DEVC", name="<pkg>")` | — | — | — | Recursive sub-package walk (re-read each subpackage) |
| 2b — Object validation | `SAPSearch(searchType="tadir_lookup", names=["<object_name>"])` after `DEVC` collection | — | — | — | Exact cross-package validation. `tadir_lookup` does not enumerate by `packageName`; use `source="both"` only when SQL is allowed and you need legacy SEGW/ghost-row evidence |
| 2c — Namespace filter | (post-processing) | — | — | — | Keep only `Z*`, `Y*`, customer namespace |
| 2d — Unused detection | `SAPQuery(sql="<SCMON/SUSG query>")` (requires `SAP_ALLOW_FREE_SQL=true`) | **`sap-unused-code`** | — | — | Last 6 months runtime hits |
| 2e — Cluster into logical units | `SAPRead(type="PROG", name="<program>")` / `SAPRead(type="INCL", name="<include>")` for real include membership, `SAPRead(type="FUGR", expand_includes=true)`, `SAPContext(action="impact", type="DDLS")` for RAP/CDS siblings, `SAPNavigate(action="references")` for shared includes | **`explain-abap-code`** (stubborn units), **`sap-object-documenter`** (batch unit docs) | — | — | Main + includes / FUGR / RAP stack = ONE unit; classification + plan rows are per unit, never per bare include |
| 2f — Impact / fan-in analysis (per unit) | DDLS: **`SAPContext(action="impact", type="DDLS")`**. Non-CDS: **`SAPNavigate(action="references")`**. Optional cached inverse: `SAPContext(action="usages")` when warmup is enabled | — | — | — | Fan-in count drives effort x risk multipliers without calling DDLS-only APIs on non-CDS objects |

### Step 3 — Classification

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 3a — ATC run | `SAPDiagnose(action="atc", type="<type>", name="<name>", variant="ABAP_CLOUD_READINESS")` per object | **`sap-clean-core-atc`** | — | — | Per-object Level A/B/C/D. ⚠️ ATC skips `$TMP` — transportable packages only |
| 3b — Augment with finding categories | (post-processing) | — | — | — | non-released-api / direct-db-access / modification / enhancement-point |

### Step 4 — JIT documentation lookup + decision

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 4-0 — Understanding pass (every non-A unit) | `SAPRead` + `SAPContext(action="deps")` | **`explain-abap-code`** | — | — | Systematic, not a fallback: purpose/flow/deps per unit → `docs/refactor/analysis/<unit>.md`; feeds the decision + Step 6 rewrite context |
| 4a — Cache-first lookup | (filesystem read) | — | — | — | 30d TTL stable, 7d community/blogs |
| 4b — Tier 1 git lookup | (filesystem grep) | — | — | git clones: `abap-atc-cr-cv-s4hc`, `SAP-samples`, `cloud-sdk` | Free, fast, authoritative for object classification |
| 4b — Tier 2 JIT Apify | — | — | — | `apify/website-content-crawler`, `apify/puppeteer-scraper` | Per-page cost ~€0.005-0.02; user pays |
| 4b — Tier 4 MCP-server lookup | — | — | — | `mcp-sap-docs` / `abap_mcp_server` (`sap_get_object_details`, `sap_search_objects`, `search` + `fetch` when exposed, `sap_discovery_center_service` for known services, `abap_feature_matrix`, `ui5_version_diff` when exposed), `@sap/cds-mcp` (`search_docs`/`search_model`), `context7` | Preferred when installed (free). If a dedicated `sap_community_search` tool is exposed, use it for exact community/blog symptoms; otherwise use the unified `search(includeOnline=true)` path before falling back to Apify. If Discovery Center search is needed but no dedicated search tool is exposed, use unified `search(...)` first, then `sap_discovery_center_service` with the discovered service name/id |
| 4c — Cite + cache | (filesystem write) | — | — | — | `.cache/sap-clean-core/<topic-hash>/<source>-<date>.md` |
| 4d — Budget exhaustion fallback | — | **`explain-abap-code`** (single-object deep dive) | — | — | Reduces human research effort ~50% |
| 4d-quater — Pattern mining | **`SAPRead(type="VERSIONS", name="<name>", objectType="<type>")`**, **`SAPRead(type="VERSION_SOURCE", versionUri="<revision_uri>")`** | — | — | — | Mine customer's own history for refactor patterns. `VERSION_SOURCE` requires the revision URI returned by `VERSIONS`; it does not take `name`/`objectType`. Reduces rewrite effort 30-50% on customers with established conventions |
| 4d-bis — Decision tree | (agent reasoning) | — | — | — | Per-unit Start Level + flags → Target Level + Decision |
| 4e-4g — Level B escalation | — | — | — | — | `--aggressive` / `--push-to-a` / `--target-level=A` flags |

### Step 5 — Plan emission

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 5a — Generate plan markdown | (filesystem write) | — | — | — | `docs/refactor/<date>-clean-core-plan.md` |
| 5b — Per-unit decision rows | (templating) | — | — | — | Object / Start Level / Target Level / Decision / Replacement / Effort / Risk / KB evidence |
| 5c — Stakeholder dossier (`--report=dossier`) | — | **`sap-migration-dossier`** | — | — | HTML/JSON/CSV/graph + review cards; plan markdown stays the editable source of truth |
| 5d — Effort quantification (`estimate` mode / plan header) | (mechanical matching over Steps 2-3 outputs) | — | — | — | Instantiates PATTERNS §9.5 with real unit counts, levels, fan-in bands + detected conditions → `docs/refactor/<date>-effort-estimate.md`; execute logs actuals for recalibration |

### Step 6 — Execute (opt-in)

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 6-pre — Generate regression tests (CLAS/FUGR) | — | **`generate-abap-unit-test`** | `sap-abap` (test patterns reference) | — | Capture current behaviour as baseline |
| 6-pre — Generate regression tests (DDLS) | — | **`generate-cds-unit-test`** | `sap-abap-cds` (CDS Test Double Framework patterns) | — | For CDS views |
| 6-pre — As-found source snapshot | (source reads) | **`setup-abap-mirror`** | — | — | abapGit-style baseline for local `git diff` evidence across the whole run |
| 6-pre — As-found docs baseline (every plan unit) | (source reads) | **`sap-object-documenter`** | — | — | Batch as-is documentation → `docs/refactor/baseline/<date>/`, BEFORE any write (quickfixes included); regenerate after Step 7 for the "after" picture |
| **6-0 — Phase 0: package-wide mechanical burn-down** | `SAPRead(type="<type>", name="<name>")` → `SAPDiagnose(action="quickfix", type="<type>", name="<name>", source="<source>", line=<line>, column=<column>)` → `SAPDiagnose(action="apply_quickfix", type="<type>", name="<name>", source="<source>", line=<line>, column=<column>, proposalUri="<proposal_uri>", proposalUserContent="<proposal_user_content>")` deltas → merge → `SAPLint(action="lint_and_fix", source="<candidate>", name="<name>")` → `SAPLint(action="format", source="<candidate>")` → `SAPDiagnose(action="syntax", type="<type>", name="<name>", source="<candidate>")` → `SAPWrite(action="update", type="<type>", name="<name>", source="<candidate>", transport="<tr>")` → `SAPActivate(type="<type>", name="<name>")` | — | — | — | Lights-out, right after plan approval; own transport; `SAPDiagnose(action="atc", type="<type>", name="<name>")` re-run refreshes the plan numbers before the generative loop |
| 6a-0 — Residual quickfixes (per unit) | `SAPDiagnose(action="quickfix", type="<type>", name="<name>", source="<source>", line=<line>, column=<column>)` → `SAPDiagnose(action="apply_quickfix", type="<type>", name="<name>", source="<source>", line=<line>, column=<column>, proposalUri="<proposal_uri>", proposalUserContent="<proposal_user_content>")` deltas → merge into candidate source | — | — | — | Catches mechanical findings that surface during the rewrite itself (Phase 6-0 already swept the package). Objects with ONLY mechanical findings can go through **`migrate-custom-code`** standalone instead |
| 6a-alt — SEGW V2 service in inventory | — | **`migrate-segw-to-rap`** | — | — | MPC/DPC classes are generated — reverse-engineer to RAP V4, never hand-rewrite |
| 6a-alt — Analytical Z report | — | **`generate-analytics-star-schema`** → **`generate-cds-analytical-query`** | — | — | Successor is an embedded-analytics cube + query, not a transactional LROP |
| 6a — Rewrite in-place: read + pre-write gates + write | `SAPRead(type="VERSIONS", name="<name>", objectType="<type>")`, candidate source assembly, `SAPLint(action="lint_and_fix", source="<candidate>", name="<name>")`, `SAPLint(action="format", source="<candidate>")`, `SAPDiagnose(action="syntax", type="<type>", name="<name>", source="<candidate>")`, `SAPWrite(action="update", type="<type>", name="<name>", source="<source>", transport="<tr>")`, `SAPActivate(type="<type>", name="<name>")` | **`generate-rap-logic`** (when rewrite goes to RAP behavior pool), **`generate-rap-service-researched`** (full RAP stack, rare) | **`sap-abap`** (language patterns), **`sap-abap-cds`** (CDS views if introduced) | — | Pattern-mined via Step 4d-quater; formatter output must be written, not merely displayed |
| 6a — Cloud-readiness review | — | — | **`sap-abap`** `/abap-cloud-review` | — | Cheap LLM review pass before the ATC round-trip |
| 6a — ATC regression | `SAPDiagnose(action="atc", type="<type>", name="<name>")` | — | — | — | Gate: blocks loop if regression |
| 6a — Unit test regression | `SAPDiagnose(action="unittest", type="<type>", name="<name>")` | — | — | — | Gate: blocks loop on test failure |
| 6a — Review edit as diff | `SAPRead(type="<type>", name="<name>", action="diff")` | — | — | — | Active-vs-previous version diff of the rewrite |
| 6d — API design review | — | — | **`sap-api-style`** `/api-style-review` | — | Run BEFORE releasing: a C1 contract freezes naming/design debt |
| 6d — Release API contract | `SAPRead(type="API_STATE", name="<api>", objectType="<type>")` → `SAPManage(action="set_api_state", name="<api>", objectType="<type>", contract="C1", transport="<tr>")` | — | — | — | `release_api` arm: release a stable Z dependency so consumers drop to Level A (ARC-1 ≥ 0.9.24; contract support is release-dependent) |
| 6a — Rollback if regression | `SAPRead(type="VERSIONS", name="<name>", objectType="<type>")` → `SAPRead(type="VERSION_SOURCE", versionUri="<revision_uri>")` → `SAPWrite(action="update", type="<type>", name="<name>", source="<revision_source>", transport="<tr>")` | — | — | — | Restore the pre-rewrite version from SAP's version history (no git needed) |
| 6b — Side-by-side scaffold | — | **`modernize-abap-to-btp-cap`** chain, **`convert-ui5-to-fiori-elements`** or **`modernize-ui5-app`** (UI: annotation-driven vs freestyle) | **`sap-cap-capire`** (4 agents), **`sap-btp-developer-guide`**, **`sap-fiori-app-development`**, **`sap-fiori-tools`** when available | `@sap/cds-mcp` (staged-model introspection), Fiori MCP/UI5 MCP for UI branches when configured | Per-extension CAP project under `<target>/.target-cap-staging/`; branch becomes manual/degraded if its required MCP is absent. `sap-fiori-app-development` is branch-MUST for FE creation/modification to enforce CAP vs standalone and backend-metadata ownership |
| 6b — UI quality gate | — | — | **`sapui5-linter`** when available; otherwise local `@ui5/linter` / project lint scripts. **`sap-fiori-guidelines`** for stakeholder-facing UI review | — | Branch-MUST when the extension has a UI5/FE frontend. Use plugin commands only when exposed; otherwise run the equivalent local/checklist path and record the degraded gate |
| 6b — Destination diagnostics | — | — | **`sap-btp-connectivity`** `/btp-destination-diagnose` | — | When the extension consumes S/4 APIs via destinations |
| 6b-post — Hand-off gates | — | — | **`sap-cap-capire`**, **`sap-btp-developer-guide`**, `sap-btp-best-practices` | — | Deploy-readiness gates for the generated CAP project, before `cf deploy`. `sap-btp-best-practices` is SHOULD for any deployable BTP extension and branch-MUST for production, multi-subaccount/multi-region, sensitive-data, principal-propagation, HA/failover, or shared-landscape scenarios. Use exact commands only when the installed skill/plugin exposes them |
| 6c — Document Level B keeper | `SAPWrite(type="SKTD", action="create"\|"update")` | **`sap-object-documenter`** | — | — | Markdown rationale + ATC exemption update |
| 6.5 — Transport requirement check | `SAPTransport(action="check", type="<type>", name="<name>", package="<package>")` | — | — | — | Ensure deps reachable |
| 6.5 — Transport create / ownership transfer | `SAPTransport(action="create", description="<description>", package="<package>")`; `SAPTransport(action="reassign", id="<tr>", owner="<user>")` only when the owner must change | — | — | — | One TR per phase or per cluster. Reusing a request means passing its ID as `transport="<tr>"` on write calls; `reassign` is owner transfer, not object assignment |
| 6.5 — gCTS / abapGit commit | `SAPGit(action="list_repos")` → `SAPGit(action="commit", repoId="<repo_id>")` for gCTS-capable systems | — | — | — | Optional; with `SAP_ALLOW_GIT_WRITES=true`. abapGit and gCTS expose different write actions, so probe/list first |
| 6.5 — Transport release | `SAPTransport(action="release_recursive", id="<tr>")` after review approval | — | — | — | Releases tasks then parent. ARC-1 runs an inactive-object pre-check before release and fails fast when objects are still inactive |

### Step 7 — Verification

| Sub-step | ARC-1 MCP | arc-1 skills | secondsky plugin | External | Notes |
|---|---|---|---|---|---|
| 7a — ATC final check | `SAPDiagnose(action="atc", type="<type>", name="<name>")` per changed object + `sap-clean-core-atc` package roll-up | — | — | — | Cumulative regression |
| 7b — Unit test full run | `SAPDiagnose(action="unittest", type="<type>", name="<name>")` per changed testable object | — | — | — | All tests including pre-existing |
| 7b-bis — Pre-release transport gate | `SAPTransport(action="list", summary=true)` + `SAPRead(type="<type>", name="<name>", action="diff")` | **`sap-transport-review`** | — | — | Per-object diffs + risk flags before release |
| 7c-bis — Perf regression on data-access rewrites | `SAPDiagnose(action="odata_perf", url="<odata_path>")` / `SAPDiagnose(action="cds_sql", name="<ddls_name>")` | **`debug-slow-sql`** | — | — | Hot objects only; a released `I_*` view can be slower than the SELECT it replaced |
| 7c — Cross-check against CAP audit | — | [`sap-cap-clean-core-enforce`](https://github.com/Raistlin82/sap-cap-toolkit/blob/main/skills/sap-cap-clean-core-enforce/SKILL.md) (other branch) | — | — | Verify BTP-side compliance |
| 7d — Session learnings | — | **`analyze-chat-session`** | — | — | Propose new skill traps for future runs |

## Coverage assessment

The table below shows **what fraction of ARC-1 MCP capabilities the skill currently engages**.

| ARC-1 MCP tool | Engagement in this skill |
|---|---|
| `SAPRead` (source + VERSIONS + VERSION_SOURCE + SKTD) | 🟢 Step 2 (inventory), Step 4d-quater (mining), Step 6a (pre-write VERSIONS check), Step 6c (read SKTD) |
| `SAPSearch` (object + tadir_lookup + source_code full-text) | 🟢 Step 2 (connectivity probe, exact-name validation, optional source_code searches) |
| `SAPWrite` (update + delete + SKTD create/update + batch_create) | 🟢 Step 6a (update), Step 6c (attach_sktd), Step 6 unused (delete) |
| `SAPActivate` | 🟢 Step 6a (post-write activation) |
| `SAPNavigate` (go-to-definition, find references) | 🟢 Step 2 non-CDS fan-in/shared include detection; Step 6 remove_unused (`references` last-check) |
| `SAPQuery` (free SQL, off by default) | 🟡 Used by `sap-unused-code` (delegate) — requires `SAP_ALLOW_FREE_SQL=true` |
| `SAPTransport` | 🟢 Step 6.5 (check + create + release/release_recursive; reassign only for owner transfer), Step 7b-bis (summary) |
| `SAPGit` | 🟡 Step 6.5 commit only after repo discovery (opt-in via `SAP_ALLOW_GIT_WRITES=true`) — rollback uses SAP version history, never git |
| `SAPContext` (deps + DDLS impact + cached usages) | 🟢 Step 2e/2f for DDLS impact and cached usages; non-CDS reverse lookup uses `SAPNavigate(action="references")` |
| `SAPLint` (lint + lint_and_fix + format + get_formatter_settings) | 🟢 Step 6a pre-write source normalization |
| `SAPDiagnose` (atc + unittest + quickfix/apply_quickfix + cds_testcases + syntax + dumps + traces) | 🟢 Step 3 (ATC classification), Step 6a-0 (quickfix deltas + syntax), Step 6a (unittest), Step 7 (full run) |
| `SAPManage` (probe + set_api_state) | 🟢 Step 1e (via `bootstrap-system-context`), Step 6d (`release_api` — release a Z API contract, C0–C4) |

**Overall**: the skill engages all 12 ARC-1 tools either directly or through delegated native skills, but write authority remains centralized in ARC-1 and optional MCP/plugin branches are capability-gated.

## Coverage assessment — secondsky/sap-skills

The table below shows which secondsky plugins this skill treats as recommended capability gates. Missing plugin commands must be recorded in the plan header and either replaced by the documented fallback or made a manual review gate.

| Plugin | Severity | Step where invoked |
|---|---|---|
| `sap-abap` | RECOMMENDED | Step 6a rewrite_in_place (ABAP rewrite patterns) + `/abap-cloud-review` post-rewrite gate when available |
| `sap-abap-cds` | RECOMMENDED | Step 6a when rewrite introduces CDS views |
| `sap-cap-capire` (with 4 agents) | RECOMMENDED | Step 6b side-by-side scaffold + `/cap-deployment-checklist` hand-off gate |
| `sap-btp-developer-guide` | RECOMMENDED | Step 1c target resolution, Step 6b scaffold + `/btp-app-readiness-review` hand-off gate |
| `sap-api-style` | SHOULD | Step 6d `/api-style-review` before every `release_api`; Step 6b `service.cds` design review |
| `sap-fiori-app-development` | branch-MUST for FE branches | Step 6b Fiori app creation/modification: CAP vs standalone decision, backend metadata ownership, Fiori MCP/tool-first workflow when exposed |
| `sap-fiori-tools` | branch-MUST when FE UI is generated through Fiori tooling; otherwise SHOULD reference | Step 6b Fiori Elements UI generation and project validation |
| `sap-fiori-guidelines` | SHOULD; branch-MUST for stakeholder-facing UI | Step 6b UX/accessibility/design review of generated or modernized UI |
| `sapui5-linter` | branch-MUST for UI5/FE frontends | Step 6b post-scaffold UI quality gate. Use installed skill/plugin when exposed; otherwise run local `@ui5/linter` / project lint scripts |
| `sap-btp-connectivity` | SHOULD | Step 6b when extension uses destinations (`/btp-destination-diagnose`) |
| `sap-btp-best-practices` | SHOULD; branch-MUST for production, multi-subaccount/multi-region, sensitive data, principal propagation, HA/failover, or shared landscapes | BTP architecture/governance/readiness review before deploy hand-off |
| `sap-cloud-sdk` | SHOULD | Step 6b when extension uses Cloud SDK |
| `sap-cloud-sdk-ai` | OPTIONAL | Step 6b when extension is AI-heavy |
| `sap-btp-cloud-logging` | OPTIONAL | Step 6b production observability |
| `sap-btp-job-scheduling` | OPTIONAL | Step 6b when extension has scheduled jobs |
| `sap-btp-cloud-transport-management` | OPTIONAL | Step 6.5 when customer uses cTMS |
| `sap-btp-master-data-integration` | OPTIONAL | Step 6b when extension subscribes to MDI events |
| `sap-btp-cias` | OPTIONAL | Step 6b when customer uses IAS instead of XSUAA |
| `sap-btp-business-application-studio` | OPTIONAL | Hand-off documentation |
| `sap-btp-integration-suite` | OPTIONAL | Step 6b when side-by-side uses iFlows |
| `sap-btp-build-work-zone-advanced` | OPTIONAL | Step 6b when UI surfaces in Work Zone |
| `sap-btp-intelligent-situation-automation` | OPTIONAL | Step 6b when extension includes workflow logic |

Plugins **NOT** used by this skill (out of scope):
- `sap-sqlscript`, `sap-hana-ml`, `sap-hana-cloud-data-intelligence`, `sap-hana-cli` — HANA-native dev
- `sap-datasphere`, `sap-sac-*` — analytics
- `sap-ai-core` — AI infrastructure

## Cost model — by integration layer

| Layer | Cost per refactor (50-200 objects) | Who pays |
|---|---|---|
| ARC-1 MCP | €0 (server runs on user's infra) | User (server hosting) |
| arc-1 native skills | €0 (skill execution is agent-time, not API-billed) | (agent inference cost is platform-billed) |
| secondsky/sap-skills | €0 (knowledge base; no per-call cost) | (one-time install) |
| Tier 1 git clones | €0 (~100 MB on first install) | User (bandwidth) |
| Tier 2 Apify JIT | €0.50-€5 typical | User (own Apify token) |
| Tier 4 MCP-server-backed | €0 | User (server hosting) |

**Total**: €0.50-€5 per typical customer refactor, all charged to the user's own infrastructure / accounts. No centralized cost.

## See also

- [`./SKILL.md`](./SKILL.md) — main protocol; this document is the integration deep-dive.
- [`./SOURCES.md`](./SOURCES.md) — authoritative SAP source catalog (Tier 1-4).
- [`sap-cap-fiori-battle-tested-patterns`](./PATTERNS.md) — broader companion plugin map (Category 8) for the CAP-side toolkit.
- [ARC-1 README](https://github.com/arc-mcp/arc-1) — full MCP capability reference.
- [secondsky/sap-skills](https://github.com/secondsky/sap-skills) — 32-plugin SAP skill catalog.
