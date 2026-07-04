# Clean Core Refactor — Operator's Guide

The end-to-end sequence for taking one custom package (`Z*`/`Y*`) from "unknown custom code"
to "classified, remediated, and refactored toward Clean Core Level B/A" — showing **exactly
which skill runs at each step, where it comes from, and what it delegates to**.

You type **five things**. Everything else is delegation.

## Legend — where does each piece come from?

| Origin | Meaning |
|---|---|
| **CHAIN** | Ships with this skill set (`sap-erp-clean-core-refactor` + the `modernize-abap-cap-*` chain) |
| **arc-1** | Stock ARC-1 skill — present in the upstream `skills/` catalog |
| **PLUGIN** | External agent plugin (e.g. [secondsky/sap-skills](https://github.com/secondsky/sap-skills)) — review/gate commands only, never writes |
| **MCP** | An MCP server, not a skill. **ARC-1 is the only thing that ever writes to the SAP system** |

Division of labor: **skills decide, plugins review, ARC-1 executes.**

## Prerequisites (server-side, once)

| Config | Why |
|---|---|
| `SAP_ALLOW_WRITES=true` + `SAP_ALLOWED_PACKAGES=ZPKG/**` | every mutation (incl. activation) is checked fail-closed against the object's real package |
| `SAP_ALLOW_TRANSPORT_WRITES=true` | create/reassign transport requests in Phase 5 |
| `SAP_ALLOW_FREE_SQL=true` *(optional)* | only for runtime dead-code detection (SCMON/SUSG) |
| **Transportable package — not `$TMP`** | ATC silently skips local objects: 0 findings on a `$TMP` package means "not checked", not "clean" |

> **Honesty note on "automatic ATC remediation":** the automatic pass covers *mechanical*
> findings (ATC quickfixes + lint autofixes). Architectural findings — unreleased APIs, direct
> DB access, modifications — have no auto-fix by definition; they are exactly what the plan
> phase turns into rewrite / extract / release / keep decisions.

## A — What you type (5 steps)

| # | You type | Skill | Origin | What happens |
|---|---|---|---|---|
| 1 | `/bootstrap-system-context` | `bootstrap-system-context` | **arc-1** | `SAPManage(action="probe")` → SID, release, components, features; formatter + ATC preset; `abap_feature_matrix` snapshot for the release → `system-info.md`. No sub-skills |
| 2 | `/sap-erp-clean-core-refactor ZPKG plan` | `sap-erp-clean-core-refactor` | **CHAIN** | Inventory → classification → per-object decision → editable plan at `docs/refactor/<date>-clean-core-plan.md`. **No writes.** Delegation: table B |
| 3 | *(review & edit the plan — no command)* | — | — | The human gate. Override any per-object decision before anything touches the system |
| 4 | `/sap-erp-clean-core-refactor ZPKG execute` | `sap-erp-clean-core-refactor` | **CHAIN** | Applies the plan with per-object confirmation. Delegation: table C |
| 5 | `/sap-transport-review` | `sap-transport-review` | **arc-1** | Pre-release gate: per-object unified diffs + risk flags on the transport. Standalone |

## B — Delegation chain of `plan` (step 2)

| Internal step | Calls | Origin | When |
|---|---|---|---|
| 1e Bootstrap | `bootstrap-system-context` | **arc-1** | only if step 1 wasn't run |
| 1f Transport-conflict scan | `sap-transport-overview` | **arc-1** | objects already locked in someone else's open TR would stall Phase 5 |
| 2 Inventory | `SAPRead(type="DEVC")` recursive, `SAPSearch(searchType="tadir_lookup")`, red-flag `grep` pre-scan | **MCP** ARC-1 | always |
| 2e Impact | `SAPContext(action="impact")` per candidate — fan-in drives the risk × effort multipliers | **MCP** ARC-1 | always; the single most important call |
| 2d Dead code | `sap-unused-code` | **arc-1** | optional; needs `SAP_ALLOW_FREE_SQL` |
| 3 Classification A–D | `sap-clean-core-atc` → `SAPDiagnose(action="atc")` + `sap_get_object_details` per SAP reference | **arc-1** + **MCP** sap-docs | always, per object, worst-level roll-up |
| 4 JIT evidence lookup | `mcp-sap-docs` (`sap_community_search`, `sap_discovery_center_search`, `abap_feature_matrix`), `@sap/cds-mcp`, `context7` | **MCP** | per non-A finding, budget-bounded |
| 4 Budget-exhausted fallback | `explain-abap-code` | **arc-1** | stubborn objects only |
| 4 Decision recipes | [`PATTERNS.md`](./PATTERNS.md) Category 9 (D→B / C→A / B→A) | **CHAIN** (reference doc) | consulted, not invoked |
| 5 Stakeholder report | `sap-migration-dossier` | **arc-1** | only with `--report=dossier` |

## C — Delegation chain of `execute` (step 4), per plan decision

| Plan decision | Calls | Origin |
|---|---|---|
| *(before anything)* optional local baseline | `setup-abap-mirror` — abapGit-style package snapshot for local `git diff` evidence | **arc-1** |
| **`rewrite_in_place`** (D→B, C→A) | ① regression tests: `generate-abap-unit-test` / `generate-cds-unit-test` (CDS seeds from `SAPDiagnose(action="cds_testcases")` on 8.16+) | **arc-1** |
| | ② mechanical burn-down: `SAPDiagnose(action="quickfix")` → `apply_quickfix` | **MCP** ARC-1 |
| | ③ rewrite per [`PATTERNS.md`](./PATTERNS.md) 9.1/9.2 recipes → `SAPWrite` + `SAPActivate` + `SAPLint(action="format")` | **CHAIN** + **MCP** ARC-1 |
| | ④ `/abap-cloud-review` — cheap review pass BEFORE the ATC round-trip | **PLUGIN** `sap-abap` |
| | ⑤ `SAPDiagnose(action="atc")` + `unittest` + `SAPRead(action="diff")`; rollback from version history on regression | **MCP** ARC-1 |
| | RAP behavior logic → `generate-rap-logic`; full RAP stack (rare) → `generate-rap-service-researched` | **arc-1** |
| **`rewrite_in_place`** — specialized shapes | SEGW V2 service (MPC/DPC) → `migrate-segw-to-rap` (never hand-rewrite generated classes) | **arc-1** |
| | analytical Z report → `generate-analytics-star-schema` → `generate-cds-analytical-query` (embedded analytics, not a transactional LROP) | **arc-1** |
| | only mechanical findings on the object → `migrate-custom-code` standalone is sufficient | **arc-1** |
| **`extract_to_side_by_side`** (= Level A on the ERP side) | `modernize-abap-to-btp-cap` orchestrator, which chains: | **CHAIN** |
| | ├ `modernize-abap-cap-schema` (`db/schema.cds` from Z tables) | **CHAIN** |
| | ├ `modernize-abap-cap-service` (`srv/service.cds` + handler stubs) | **CHAIN** |
| | ├ `/api-style-review` on the generated service surface | **PLUGIN** `sap-api-style` |
| | ├ UI: `convert-ui5-to-fiori-elements` (annotation-driven LROP) **or** `modernize-ui5-app` (freestyle TS) | **arc-1** |
| | ├ `/ui5-linter-check` → `/ui5-linter-fix-plan` (UI gate) | **PLUGIN** `sapui5-linter` |
| | ├ hand-off gates: `/cap-deployment-checklist` + `/btp-app-readiness-review` (+ `/btp-architecture-review` for larger landscapes) | **PLUGIN** `sap-cap-capire`, `sap-btp-developer-guide`, `sap-btp-best-practices` |
| | └ destination triage when the deployed app can't reach S/4: `/btp-destination-diagnose` | **PLUGIN** `sap-btp-connectivity` |
| **`release_api`** (B→A closing move) | `/api-style-review` first (a released contract freezes design debt), then `SAPManage(action="set_api_state", contract="C1")` | **PLUGIN** + **MCP** ARC-1 |
| **`keep_at_level_b`** (on-prem only) | `sap-object-documenter` — SKTD rationale + ATC exemption | **arc-1** |
| **`remove_unused`** | no skill — sign-off → `SAPNavigate(action="references")` last check → `SAPWrite(action="delete")` | **MCP** ARC-1 |
| Transport handling (per phase/cluster) | `SAPTransport(action="check")` → `create` → `reassign`; ARC-1 pre-checks inactive objects before `release` | **MCP** ARC-1 |

## D — Verification (inside step 4, then step 5)

| Check | Calls | Origin |
|---|---|---|
| Cumulative ATC + unit tests on the whole package (net ATC regression **aborts the loop**) | `SAPDiagnose(action="atc")` + `SAPDiagnose(action="unittest")` | **MCP** ARC-1 |
| Perf regression on hot data-access rewrites (a released `I_*` view can be slower than the SELECT it replaced) | `debug-slow-sql` ladder (`odata_perf` / `cds_sql`) | **arc-1** |
| Pre-release transport gate | `sap-transport-review` (step 5 of table A) | **arc-1** |
| Session learnings (optional) | `analyze-chat-session` | **arc-1** |

## The full census

- **You invoke 5 things**; 3 are stock arc-1, 2 are this chain's orchestrator.
- **This chain owns exactly 4 skills**: the orchestrator + the 3 CAP-extraction skills. Everything else it drives is stock arc-1 (**21 upstream skills** engaged across the run: bootstrap-system-context, sap-transport-overview, sap-unused-code, sap-clean-core-atc, explain-abap-code, sap-migration-dossier, setup-abap-mirror, generate-abap-unit-test, generate-cds-unit-test, generate-rap-logic, generate-rap-service-researched, migrate-segw-to-rap, generate-analytics-star-schema, generate-cds-analytical-query, migrate-custom-code, convert-ui5-to-fiori-elements, modernize-ui5-app, sap-object-documenter, debug-slow-sql, sap-transport-review, analyze-chat-session) or external plugins (**7 review/gate commands**, never writes).
- **Every write to the SAP system goes through the ARC-1 MCP server** — behind its safety ceiling (`allowWrites`, package allowlist, transport gates), regardless of which skill asked for it.

## See also

- [`SKILL.md`](./SKILL.md) — the protocol this guide is the operator view of
- [`INTEGRATIONS.md`](./INTEGRATIONS.md) — the same mapping at sub-step granularity (tool × skill × plugin per step)
- [`PATTERNS.md`](./PATTERNS.md) — Category 9: the per-finding escalation recipes used during rewrites
- [`SOURCES.md`](./SOURCES.md) — where the evidence for every decision comes from
