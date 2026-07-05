---
name: sap-erp-clean-core-refactor
description: Plans and executes a Clean Core refactor of SAP ABAP custom code (Z*/Y*). Inventories objects via ARC-1, classifies them as Level A/B/C/D (via `sap-clean-core-atc`), and decides per logical unit (a program + its includes = one unit) whether to rewrite-in-place, extract to a side-by-side BTP extension, keep at Level B, or remove. Documentation lookups are just-in-time (no pre-built KB). Use when asked to "refactor custom code to Clean Core", "plan side-by-side extensions", "Clean Core return on ERP", or to produce a documented migration plan.
---

# SAP ERP — Clean Core Refactor

Plans and executes the refactor of ABAP custom code to Clean Core. Three modes:

| Mode | What it does | Writes? |
|---|---|---|
| `discover` | Inventory the Z*/Y* package | No |
| `estimate` | Inventory + cluster + classify + type-aware fan-in, then instantiate the [PATTERNS §9.5 effort model](./PATTERNS.md) with the REAL numbers → emit `docs/refactor/<date>-effort-estimate.md` (person-day sizing, no per-unit decisions yet) | No |
| `plan` (default) | Everything `estimate` does + understanding pass + per-unit decisions → emit `docs/refactor/<date>-clean-core-plan.md` (supersedes the estimate with decision-refined effort) | No |
| `execute` | Apply the plan: rewrite ABAP, scaffold BTP extensions, document Level B keepers, remove unused. Logs ACTUAL effort per unit for §9.5 calibration | Yes (with per-unit confirmation) |

## Input

```
<package-or-object> [mode] [flags]
```

Examples:
- `ZFI estimate` — person-day sizing from the real system state, before committing to a plan
- `ZFI plan` — typical first call (default target = `btp-cf`)
- `ZCL_INVOICE_HANDLER plan` — single-object focus
- `ZFI execute` — apply plan with per-unit confirmation
- `ZFI plan --target=btp-kyma --aggressive` — Kyma side-by-side target + push Level B → A

**Flags**:

| Flag | Effect |
|---|---|
| `--target=btp-cf` (default) `· btp-kyma · onprem-kyma` | Side-by-side runtime when extracting to BTP |
| `--target-level=A` (synonym of `--aggressive`) | Prefer Level A everywhere; explore B→A escalation |
| `--target-level=B` | Settle for B; cheaper paths preferred |
| `--push-to-a=A,B,C` | Selective B→A for listed objects only |
| `--force-refresh` | Bypass the 30-day cache; re-query sources |
| `--budget=N` | Per-finding JIT lookup budget (default 5; Apify only when configured) |
| `--report=dossier` | Emit the plan through [`../sap-migration-dossier/SKILL.md`](../sap-migration-dossier/SKILL.md) (HTML/JSON/CSV/graph + review cards) instead of the plain markdown plan |

After plan emission, edit `docs/refactor/<date>-clean-core-plan.md` to override any decision before `execute`.

## Decision tree (per logical unit)

"Object" below means the **logical unit** from Step 2 (main + includes / FUGR / RAP stack) — a bare include never gets its own decision.

| Start Level | Default Target | Path |
|---|---|---|
| A | A | no_action |
| Unused | — | remove_unused (with sign-off) |
| C | **A** | `rewrite_in_place` via released API (or `extract_to_side_by_side` if no equivalent; `keep_at_level_b` if only data-access) |
| D | **B** | `rewrite_in_place` via BAdI / enhancement-point (or `extract_to_side_by_side` if BAdI not feasible or `--target-level=A`) |
| B | **B** | `keep_at_level_b` (default). Escalates to A only with `--aggressive` / `--push-to-a` / `--target-level=A` |

**Target levels are expected landings, not ceilings.** "D → B" means the *realistic* landing of an in-place rewrite (the official home for internals-coupling is a BAdI/enhancement spot — a documented classic API = Level B; released cloud enhancement spots are a small subset). When a finding has a 1:1 released successor (PATTERNS 9.2), the rewrite lands at A directly — and the Step 7 re-classification records whatever level was actually achieved. The in-place path that cannot reach A is exactly what `extract_to_side_by_side` is for.

**System-type modifier** — the tree above assumes an on-prem/private-cloud system. Resolve the system type once in Step 1 (`bootstrap-system-context` probe → `system-info.md`) and apply:

| Where the code must live | Compliance floor | Effect on the tree |
|---|---|---|
| BTP ABAP Environment / S/4HANA Public Cloud | **A only** — Level B is non-compliant there (see `sap-clean-core-atc`, "BTP vs On-Premise") | `keep_at_level_b` is NOT an option. D → `extract_to_side_by_side` (or full rewrite to A); C → A mandatory; every B row escalates as if `--target-level=A` were set |
| S/4HANA on-prem / Private Cloud (goal = survive upgrades) | A + B both compliant | Table applies as written; C → B is an acceptable cheaper stop when no released equivalent exists |

**Side-by-side outcome** = Level A on the ERP side (the Z object disappears; logic lives on BTP under separate Clean Core gate).

**`release_api` shortcut (C/D → A without a rewrite).** When an object is C or D *only because it consumes another Z/Y object* that has no released API contract, the cheapest path is releasing the dependency itself. First read the current contract with `SAPRead(type="API_STATE", name="<dep>", objectType="<type>")`, verify stability with the type-aware fan-in resolver from Step 2 (`SAPContext(action="impact", type="DDLS")` for CDS; `SAPNavigate(action="references")` or cached `SAPContext(action="usages")` for non-CDS) plus owner sign-off, then call `SAPManage(action="set_api_state", name="<dep>", objectType="<type>", contract="C1", transport="<tr>")`. Contracts C0-C4 are type- and release-dependent — don't pre-judge; send the default and let SAP's error list the supported ones. The same move completes a B→A escalation: after a rewrite stabilizes a Z-API (CDS view, class), release it so every consumer drops to Level A. A released contract is a compatibility promise.

## Workflow

### Step 1 — Pre-flight

- Verify ARC-1 MCP is connected (`SAPSearch` probe). ARC-1 is required because it is the only writer.
- Build a capability matrix for optional lookups/reviewers: `mcp-sap-docs` / `abap_mcp_server` if available, Apify MCP if available, `@sap/cds-mcp`, context7, Fiori MCP, UI5 MCP, and companion plugin skills. Missing optional tools degrade to documented fallback/manual mode; do not block the read-only plan unless the missing tool is required for the selected execution branch.
- Resolve `$TARGET` (`--target=…` or ask once).
- One-time per system: run [`../bootstrap-system-context/SKILL.md`](../bootstrap-system-context/SKILL.md) to capture release / ATC preset / formatter into `system-info.md`. With mcp-sap-docs connected, also snapshot `abap_feature_matrix` for the captured release — Step 6a rewrites must only use language features that exist there.
- Transport-conflict scan: [`../sap-transport-overview/SKILL.md`](../sap-transport-overview/SKILL.md) — if any object of the package sits in someone else's open transport, flag it now (an object locked in two requests stalls Step 6.5).
- Init `.cache/sap-clean-core/` (gitignored).

### Step 2 — Inventory + impact analysis

- Enumerate Z*/Y* objects: `SAPRead(type="DEVC", name="<pkg>")` (walk subpackages recursively). Use `SAPSearch(searchType="tadir_lookup", names=[...])` only for exact cross-package validation of names you already collected; `source="both"` is optional and requires SQL scope. `DEVC` omits legacy SEGW rows, so detect SEGW through MPC/DPC class names, service searches, and, when SQL is allowed, `tadir_lookup source="both"` / targeted TADIR checks.
- Cheap red-flag pre-scan: `SAPRead(type="<source_type>", name="<object_name>", grep="EXEC SQL|CALL 'SYSTEM'|CALL TRANSACTION|SUBMIT ")` per source-bearing object — spots forbidden statements without downloading full sources; feeds the classification step's triage order (worst first).
- Dead-code: delegate to [`../sap-unused-code/SKILL.md`](../sap-unused-code/SKILL.md) (requires `SAP_ALLOW_FREE_SQL=true`).
- **Cluster into logical units.** TADIR granularity lies: a legacy "object" is usually N rows (main program + its includes, function group + FMs + `LZ…` includes, a CDS/RAP stack). Classification and decisions operate on the **compilation unit**, never on a bare include:

| TADIR rows | Logical unit | How to resolve membership |
|---|---|---|
| PROG main + INCL includes | one unit | `SAPRead(type="PROG")` on the main, parse real `INCLUDE` statements, then `SAPRead(type="INCL")` for members; use `SAPContext(action="deps", type="PROG")` for dependency context and `SAPNavigate(action="references")` to detect shared includes — never `SAPContext(action="structure")`, which is TABL-only |
| FUGR + FUNCs + `LZ…` includes | one unit | `SAPRead(type="FUGR", expand_includes=true)`; dynpros are NOT reachable via ADT — flag for manual review |
| CLAS (+ CCDEF/CCIMP/testclasses) | one unit | ADT already treats the class as the unit |
| DDLS + DCLS + DDLX + BDEF + SRVD + SRVB | one unit (RAP/CDS stack) | `SAPContext(action="impact", type="DDLS")` sibling detection from the CDS root |
| SEGW MPC/DPC/`*_EXT` + model | one unit | routed to `migrate-segw-to-rap` as a whole |

  An include referenced by 2+ mains is a **shared component**: it gets ONE decision, coordinated across the units that use it (`SAPNavigate(action="references")` surfaces the fan-in). ATC runs on the unit's main object; includes inherit its findings; the A-D roll-up is the worst level across the unit; the plan emits **one row per unit**, listing its members.
- **Impact analysis** for every non-A candidate is type-aware: DDLS/RAP roots use `SAPContext(action="impact", type="DDLS", includeIndirect=<needed>)`; non-CDS objects use `SAPNavigate(action="references", type="<type>", name="<name>")`; cached `SAPContext(action="usages")` is allowed only when ARC-1 cache warmup is enabled. Fan-in count drives effort × risk:

| Fan-in | Risk × | Strategy |
|---|---|---|
| 0 | 0× | `remove_unused` candidate |
| 1-3 internal | 1× | low-risk `rewrite_in_place` |
| 4-10 | 2× | medium-risk; keep a thin adapter when rewriting |
| 11-50 | 4× | prefer `extract_to_side_by_side` if BTP available |
| 50+ | 8× | mandatory `research_required` (architectural review) |

### Step 3 — Classification

Delegate to [`../sap-clean-core-atc/SKILL.md`](../sap-clean-core-atc/SKILL.md). Receive back per-unit Level A/B/C/D (ATC runs on each unit's main object) + ATC finding categories.

### Step 4 — Understand, JIT lookup, decide

**4-0 — Understanding pass (systematic, every non-A unit).** Before any decision, run [`../explain-abap-code/SKILL.md`](../explain-abap-code/SKILL.md) on each unit in scope: purpose, control flow, dependency context. Persist the output to `docs/refactor/analysis/<unit>.md` — it feeds the decision below, the plan's evidence column, and Step 6's rewrite/test-generation context. No SAP-side cost (reads only); Level-A units skip (nothing to decide). Deciding the fate of code nobody has read is how refactors go wrong.

For each non-A finding, consult sources in this order until evidence is sufficient (bounded by `--budget`):

1. **Cache hit**: `.cache/sap-clean-core/<sha256-of-topic>/<source>-<date>.md` (30-day TTL stable / 7-day community).
2. **Tier-1 git** (free): grep `abap-atc-cr-cv-s4hc`, curated `SAP-samples`, `cloud-sdk` (all installed as local clones).
3. **Tier-4 MCP** (free when installed): `mcp-sap-docs` / `abap_mcp_server` — `sap_get_object_details` for release states, `sap_community_search` (replaces the paid community/blog lookups), `sap_discovery_center_search` for reference architectures, `abap_feature_matrix` for release-gated language features, and `ui5_version_diff` for UI5 upgrade deltas when exposed; `@sap/cds-mcp` (`search_docs`/`search_model`) for the CAP side; `context7` for non-SAP libraries.
4. **Tier-2 Apify** (paid, ~€0.005-0.02/page): `api.sap.com`, `help.sap.com`, `developers.sap.com`, community, blogs.
5. **Pattern mining** (free, optional): `SAPRead(type="VERSIONS", name="<obj>", objectType="<type>")` + `SAPRead(type="VERSION_SOURCE", versionUri="<uri>")` for the customer's own history — find how similar Z objects have already been migrated. Cuts rewrite effort 30-50%.

If budget exhausts without an answer, flag `research_required` and go back to the unit's 4-0 analysis for a deeper pass (method-level, `SAPRead` with `method` surgery) before giving up.

Full source catalog: [`./SOURCES.md`](./SOURCES.md). Battle-tested patterns referenced for decision-making: [`./PATTERNS.md`](./PATTERNS.md).

### Step 5 — Emit plan

Write `docs/refactor/<date>-clean-core-plan.md` with one row per logical unit (members listed):

| Object | Start Level | Target Level | Decision | Replacement / Pattern | Effort | Risk | KB evidence |

Effort is estimated per [`PATTERNS.md §9.5`](./PATTERNS.md) (person-day model: fixed run costs + per-unit scenario × fan-in band + extra conditions); the plan header carries the fixed-cost subtotal and the grand total so stakeholders see both.

**`estimate` mode — actualizing §9.5 with the real situation.** Runs the read-only pipeline up to fan-in, then matches every unit to a §9.5.2 scenario row **mechanically and auditably** — each assignment cites its signals:

| Signal | Source | Drives |
|---|---|---|
| Unit type + member count | Step 2 clustering | scenario row (PROG/FUGR/CLAS/SEGW/RAP stack) |
| Start level + finding categories | Step 3 classification | From→To column; mechanical-only units → covered by Phase 0 (≈0 per-unit) |
| Fan-in count | Step 2 type-aware resolver (`SAPContext impact` for DDLS, `SAPNavigate references` / cached `SAPContext usages` for non-CDS) | multiplier band (×1/×2/×4/50+→dedicated) |
| `REUSE_ALV_*`/`WRITE` hits, MPC/DPC members, dynpro presence | Step 2 grep pre-scan + FUGR read | report/SEGW rows; +dynpro condition |
| Existing test classes per unit | inventory (testclasses includes) | +20–30% no-tests condition |

Output `docs/refactor/<date>-effort-estimate.md`: instantiated fixed-cost table (real unit counts), per-unit table (unit, scenario, band, pd range, signals), aggregates per scenario/level, top-10 effort drivers, assumptions + confidence notes. `plan` later refines it (human decisions can move units between scenarios); `execute` logs actuals per unit so the §9.5 baselines get recalibrated per system — estimate → plan → actuals is the calibration loop that makes the numbers quotable.

Plus: inventory summary, side-by-side extension catalog (per `extract` outcome), suggested sequencing (quick wins → in-place phase 1 → in-place phase 2 → side-by-side parallel), research backlog, source citations.

**User reviews the plan and edits any decision** before `execute`.

With `--report=dossier` (or whenever the plan must be shared with stakeholders who won't read raw markdown), delegate emission to [`../sap-migration-dossier/SKILL.md`](../sap-migration-dossier/SKILL.md): it already produces inventory + usage + ATC + clean-core review cards with Markdown/HTML/JSON/CSV/graph outputs. Feed it the per-unit decision table from this step as extra input; keep `docs/refactor/<date>-clean-core-plan.md` as the editable source of truth for `execute`.

### Step 6 — Execute (opt-in)

**As-found baseline (systematic, before ANY write — quickfixes included).** Two snapshots of the state you found:
1. Source: [`../setup-abap-mirror/SKILL.md`](../setup-abap-mirror/SKILL.md) — abapGit-style local mirror, cheap `git diff` evidence for the whole run.
2. Documentation: [`../sap-object-documenter/SKILL.md`](../sap-object-documenter/SKILL.md) batch pass over every unit in the plan → `docs/refactor/baseline/<date>/` (purpose, style Classic/Modern/Mixed, dependencies, as-is). This is the "before" picture reviewers and auditors will ask for; regenerate after Step 7 for the "after".

**Phase 0 — package-wide mechanical burn-down (lights-out).** Immediately after plan approval, sweep every `rewrite_in_place` / mechanical-only object in one pass, but remember these tools transform source; they do not persist by themselves. For each source-bearing object: read active source, run `SAPDiagnose(action="quickfix")` at matching ATC finding positions, select only proposals whose description matches the finding, call `SAPDiagnose(action="apply_quickfix")` to get text deltas, merge the deltas, run `SAPLint(action="lint_and_fix")`, then `SAPLint(action="format")`, validate with `SAPDiagnose(action="syntax", source="<candidate>")`, persist with `SAPWrite(action="update", source="<candidate>", transport="<phase0-tr>")`, and `SAPActivate`. No per-object confirmation needed for this mechanical phase, but the own transport must be reviewed with `sap-transport-review`. Re-run `SAPDiagnose(action="atc")` afterwards to refresh plan numbers before the generative loop.

Then, per object, ask confirmation and dispatch:

| Decision | Action |
|---|---|
| `rewrite_in_place` | ⓪ Residual mechanical findings first: `quickfix` → `apply_quickfix` → merge deltas into the candidate source — Phase 0 already swept the package; this catches what surfaces during the rewrite itself. ① Generate regression test via [`../generate-abap-unit-test/SKILL.md`](../generate-abap-unit-test/SKILL.md) or [`../generate-cds-unit-test/SKILL.md`](../generate-cds-unit-test/SKILL.md) (CDS on 8.16+: seed from `SAPDiagnose(action="cds_testcases")`). ② Rewrite candidate source, run `SAPLint(action="lint_and_fix")`, `SAPLint(action="format")`, and `SAPDiagnose(action="syntax", source="<candidate>")`; only then `SAPWrite(action="update")` + `SAPActivate`. ③ Cheap `/abap-cloud-review` pass (sap-abap plugin) BEFORE the ATC round-trip when the plugin is available. ④ `SAPDiagnose(action="atc")` + ⑤ `SAPDiagnose(action="unittest")`. ⑥ Review the edit as a diff: `SAPRead(type="<type>", name="<name>", action="diff")` active-vs-previous. ⑦ Rollback if regression: read history with `SAPRead(type="VERSIONS", objectType="<type>", name="<name>")`, fetch the chosen revision through `SAPRead(type="VERSION_SOURCE", versionUri="<revision_uri>")`, then restore it with `SAPWrite(action="update")`. (Same ⓪–⑦ as WORKFLOW.md's cage.) For RAP behavior pool delegate to [`../generate-rap-logic/SKILL.md`](../generate-rap-logic/SKILL.md) |
| `extract_to_side_by_side` | Delegate to [`../modernize-abap-to-btp-cap/SKILL.md`](../modernize-abap-to-btp-cap/SKILL.md). ABAP source stays deprecated-tagged until QA confirms parity. UI side: [`../convert-ui5-to-fiori-elements/SKILL.md`](../convert-ui5-to-fiori-elements/SKILL.md) (annotation-driven LROP) or [`../modernize-ui5-app/SKILL.md`](../modernize-ui5-app/SKILL.md) (freestyle TypeScript, for non-standard UX) |
| `keep_at_level_b` | Delegate to [`../sap-object-documenter/SKILL.md`](../sap-object-documenter/SKILL.md) (SKTD rationale + ATC exemption) |
| `remove_unused` | Stakeholder sign-off → `SAPNavigate(action="references")` last-check → `SAPWrite(action="delete")` |

**Specialized rewrite dispatches** (recognize these shapes before falling back to the generic rewrite):

| Object shape | Delegate to |
|---|---|
| SEGW OData V2 service (MPC/DPC/MPC_EXT/DPC_EXT classes) | [`../migrate-segw-to-rap/SKILL.md`](../migrate-segw-to-rap/SKILL.md) — reverse-engineer to RAP V4, don't rewrite the generated classes |
| Analytical Z report (ALV over aggregates, no transaction) | [`../generate-analytics-star-schema/SKILL.md`](../generate-analytics-star-schema/SKILL.md) → [`../generate-cds-analytical-query/SKILL.md`](../generate-cds-analytical-query/SKILL.md) — the clean-core successor is an embedded-analytics cube + query, not a transactional LROP |
| Object whose plan row lists ONLY mechanical/priority ATC findings | [`../migrate-custom-code/SKILL.md`](../migrate-custom-code/SKILL.md) — the standalone finding-driven fixer covers it without the full 6a pipeline |

New decision arm — `release_api`: read `SAPRead(type="API_STATE", name="<dep>", objectType="<type>")`, run `/api-style-review` (sap-api-style plugin) on the API surface when available, get owner sign-off, then `SAPManage(action="set_api_state", name="<dep>", objectType="<type>", contract="C1", transport="<tr>")` on the unreleased Z dependency (see Decision tree note). Idempotent; SAP's "No changes were made" is a no-op success.

Transport: `SAPTransport(action="check")` → `SAPTransport(action="create")` → `SAPTransport(action="reassign")`. Optional `SAPGit(action="commit")` if `SAP_ALLOW_GIT_WRITES=true`.

### Step 7 — Verify

Cumulative `SAPDiagnose(action="atc")` + `SAPDiagnose(action="unittest")` on the whole package. Net ATC regression aborts the loop. For data-access rewrites on hot objects (direct SELECT → released `I_*` CDS view), verify performance did not regress with [`../debug-slow-sql/SKILL.md`](../debug-slow-sql/SKILL.md) — a released view with the wrong access path can be slower than the SELECT it replaced. Before releasing the transport, gate the changed set with [`../sap-transport-review/SKILL.md`](../sap-transport-review/SKILL.md) (per-object diffs + risk flags). Optional `analyze-chat-session` at session end for learnings.

> **ATC skips `$TMP`/local objects** — zero findings on a local package means "not checked", not "clean". Classification and regression gates only work on transportable packages (see [`../sap-clean-core-atc/SKILL.md`](../sap-clean-core-atc/SKILL.md)).

## Cost

| Item | Cost |
|---|---|
| ARC-1 MCP / arc-1 native skills / Tier-1 git clones / MCP-server lookups | €0 |
| Tier-2 Apify per page | €0.005-0.02 |
| Typical refactor (50-200 objects) | **€0.50-€5 total**, user pays own Apify account |
| Re-run within 30 days (cache hits) | €0 |
| `--aggressive` mode delta | +30-50% |

No centralized infra. No pre-built KB. Manual mode (no Apify) works at zero cost but slower.

## Companion files

| File | What |
|---|---|
| [`./WORKFLOW.md`](./WORKFLOW.md) | **Operator's guide** — the 5 things you type, plus the full delegation map (which skill runs where, whether it is chain / stock arc-1 / external plugin / MCP) |
| [`./SOURCES.md`](./SOURCES.md) | 26 authoritative SAP sources + optional MCP connectors across 4 tiers (Tier-1 git / Tier-2 Apify / Tier-3 manual / Tier-4 MCP) |
| [`./PATTERNS.md`](./PATTERNS.md) | ~90 battle-tested patterns in 9 categories (UI5/FE V4, CAP/TS, BTP/Kyma deployment target matrix, security, customizing, lifecycle, events, ecosystem plugins, **ABAP level-escalation recipes D→B / C→A / B→A**). Consulted during Step 1 target resolution, Step 4 decision, Step 6a in-place rewrite + Step 6b side-by-side scaffold |
| [`./INTEGRATIONS.md`](./INTEGRATIONS.md) | Step-by-step mapping: refactor phase × ARC-1 MCP tool × arc-1 native skill × secondsky/sap-skills plugin |

## Recommended companion plugins

**Strongly recommended** (from [secondsky/sap-skills](https://github.com/secondsky/sap-skills)); if a plugin command is unavailable, continue only with the documented degraded path or make the branch manual:
- `sap-abap` — ABAP language patterns (Step 6 rewrite ABAP) + `/abap-cloud-review` post-rewrite gate (Step 6a)
- `sap-abap-cds` — CDS view design (Step 6 when introducing CDS)
- `sap-cap-capire` — CAP framework + 4 dispatchable agents (Step 6 side-by-side) + `/cap-deployment-checklist` hand-off gate
- `sap-btp-developer-guide` — BTP reference (Step 1 target resolution) + `/btp-app-readiness-review` hand-off gate

**SHOULD**:
- `sap-api-style` — `/api-style-review` before every `release_api` (Step 6d) and on side-by-side `service.cds` design (Step 6b)
- `sapui5-linter` — `/ui5-linter-check` + `/ui5-linter-fix-plan` on the side-by-side UI (Step 6b)
- `sap-btp-connectivity` — `/btp-destination-diagnose` when the extension consumes S/4 APIs via destinations (Step 6b)
- `sap-btp-best-practices` — `/btp-architecture-review` at hand-off for larger side-by-side landscapes

**Optional MCPs**: Apify MCP (JIT lookup), `mcp-sap-docs` / `abap_mcp_server` (preferred over Apify when installed — incl. `sap_get_object_details`, `sap_community_search`, `sap_discovery_center_search`, `abap_feature_matrix`, `ui5_version_diff` when present), `@sap/cds-mcp` (CAP docs + staged-model introspection), context7 (non-SAP libs), Fiori MCP and UI5 MCP for UI branches, plus situational SHOULD plugins listed in [`./INTEGRATIONS.md`](./INTEGRATIONS.md). Record which are active in the plan header.

## When NOT to use

- Single small change to one Z object → use ARC-1 directly.
- Green-field BTP development → use [`../modernize-abap-to-btp-cap/SKILL.md`](../modernize-abap-to-btp-cap/SKILL.md) directly.
- System upgrade plan → use SAP Activate methodology.
- Customer has no BTP plan AND no Customizing alternative → the toolkit can still help (no-BTP customers get `rewrite_in_place` + `keep_at_level_b` paths only, compliance score lower but progress is real).

## Companion repository

For audit / hardening / CI gates of the CAP applications this skill generates, see [`Raistlin82/sap-cap-toolkit`](https://github.com/Raistlin82/sap-cap-toolkit) (8 skills: clean-core-enforce, customizing-honor, security-rbac-matrix, fiori-app-audit, text-polish, stack-audit-full, ci-gates-pattern, fiori-battle-tested-patterns).
