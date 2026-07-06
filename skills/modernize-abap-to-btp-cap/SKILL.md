---
name: modernize-abap-to-btp-cap
description: End-to-end migration orchestrator from classic ABAP Z* packages to a BTP-native CAP application (Node.js + Fiori Elements V4 + Cloud Foundry). Chains specialized `modernize-abap-cap-*` sub-skills to produce a target CAP project. Use when asked to "port this Z package to BTP CAP", "modernize ABAP to CAP", "generate a CAP scaffold from this Z package", or "migrate custom code to BTP greenfield".
---

# Modernize ABAP → BTP CAP

Orchestrator that takes an ABAP Z* package and produces a CAP project under `<target>/.target-cap-staging/`. Leaves the ABAP system untouched.

Different from [`../migrate-custom-code/SKILL.md`](../migrate-custom-code/SKILL.md): that skill fixes ATC findings *inside* an ABAP system. This one produces a *side-by-side BTP target* that consumes released S/4HANA APIs instead.

## Input

```
<Z-package> <target-dir> [--cap-runtime=node] [--skip=…] [--apply]
```

Examples:
- `ZSALES_PKG ./out` — full default chain
- `ZSALES_PKG ./out --skip=fiori,mta` — only schema + service, no UI / deploy artifacts

## Defaults (applied silently)

| Aspect | Default |
|---|---|
| Target | `public_cloud` (Clean Core L-A goal) |
| CAP runtime | Node.js — the only supported value (Java deferred to v2) |
| OData | V4 |
| Fiori pattern | List Report + Object Page (LROP) |
| Auth | XSUAA |
| DB | HANA Cloud prod + SQLite dev |
| Output mode | Sandbox `.target-cap-staging/` (reversible) |
| MTA build | `mbt` |
| Output language | English i18n bundle |

## Chain

The orchestrator runs the 6 sub-steps below sequentially. Each can be re-run independently via the linked sub-skill.

| Step | Sub-skill | Produces |
|---|---|---|
| 1 | (this orchestrator) Pre-flight + skeleton | CAP `cds init`-style structure under `<target>/.target-cap-staging/`, package.json with `@sap/cds ^9` + `@cap-js/hana` + `@cap-js/sqlite` |
| 2 | Clean Core gap analysis | `docs/clean-core-gap.md` with per-object A/B/C/D level + replacement suggestions. **Gate**: > 30% C/D → recommend `migrate-custom-code` first |
| 3 | [`../modernize-abap-cap-schema/SKILL.md`](../modernize-abap-cap-schema/SKILL.md) | `db/schema.cds` from Z-tables / DDIC structures |
| 4 | [`../modernize-abap-cap-service/SKILL.md`](../modernize-abap-cap-service/SKILL.md) | `srv/service.cds` + handler stubs from FMs / programs |
| 5 | Fiori Elements V4 scaffold | `app/<namespace>/` LROP with annotations |
| 6 | Auth + MTA | `xs-security.json` + `mta.yaml` for `cf deploy` |

## Pre-flight

```
SAPManage(action="probe")   # verify ARC-1 + ADT + CDS/RAP availability
```

If CDS/RAP unavailable → stop (cannot inventory). If package in `$TMP` → warn user to use a transportable package first.

Validate `<target-dir>` is empty or contains a previous staging output only. Refuse to overwrite an existing CAP project without explicit confirmation.

## Gates

- **Clean Core gap > 30% C/D objects** → warn, recommend `migrate-custom-code` first, then retry
- **No released equivalent found for a critical object** → flag in `clean-core-gap.md`; user decides whether to extract custom logic to CAP side-by-side or block
- **Target dir not empty / not staging** → refuse without `--apply` confirmation

If the source project has a Clean Core CI gate (`scripts/ci/check-s4-compat-coverage.sh` or equivalent), invoke it after staging — drift detection against `SAP/abap-atc-cr-cv-s4hc`.

## Output

```
<target>/.target-cap-staging/
├── db/schema.cds            (Step 3)
├── srv/service.cds          (Step 4)
├── srv/service.ts           (Step 4)
├── app/<namespace>/         (Step 5)
├── xs-security.json         (Step 6)
├── mta.yaml                 (Step 6)
├── package.json             (Step 1)
├── docs/
│   ├── clean-core-gap.md    (Step 2)
│   └── porting-plan.md      (orchestrator summary + ADRs)
└── README.md
```

The user reviews under the staging dir, then promotes to the real CAP project (rename / move, or invoke with `--apply` to write directly).

## Hand-off

Generated CAP project is **sandbox**. Manual next steps (not in this skill):

Before deploying, run the readiness gates on the staged project. Use external skill/plugin
commands only when the current environment exposes them; otherwise perform the equivalent manual
review and record the degraded gate in `docs/porting-plan.md`.

1. `sap-cap-capire` — CAP-side deploy readiness.
2. `sap-btp-developer-guide` — BTP-side readiness (services, roles, entitlements).
3. `sap-btp-best-practices` — SHOULD for every deployable BTP side-by-side extension; branch-MUST
   for production, multi-subaccount/multi-region, sensitive-data, principal-propagation,
   HA/failover, or shared-landscape scenarios.
4. `sap-btp-service-manager` — SHOULD when the extension uses BTP services; branch-MUST when the
   deliverable creates, binds, or automates service instances.
5. `sap-fiori-app-development` + `sap-fiori-tools` / `sap-fiori-create-cli` — branch-MUST when
   Step 5 creates or modifies a Fiori Elements app: decide CAP vs standalone, keep backend metadata
   authoritative, and prefer the Fiori toolchain/MCP when exposed.
6. `sap-fiori-guidelines` + `sapui5-linter` / `sapui5-cli` / `sap-fiori-eslint-plugin` —
   branch-MUST for stakeholder-facing UI: Fiori UX / accessibility review plus UI5 lint/build
   checks. If the plugin is absent, run local `@ui5/linter` or the project's lint script.

```bash
cd <target>/.target-cap-staging
npm install
cds deploy --to hana    # or sqlite for dev
mbt build               # build MTA archive
cf deploy mta_archives/<archive>.mtar
```

If the deployed app cannot reach its S/4 destination, run the `sap-btp-connectivity` destination
diagnostic command only when the plugin exposes it; otherwise perform the same destination,
Cloud Connector, authentication, and principal-propagation checks manually and record the degraded
gate in `docs/porting-plan.md`.

For audit / hardening / CI gates of the generated CAP project, see [`Raistlin82/sap-cap-toolkit`](https://github.com/Raistlin82/sap-cap-toolkit).

## When NOT to use

- ABAP-system-internal ATC fixes → use [`../migrate-custom-code/SKILL.md`](../migrate-custom-code/SKILL.md)
- Single-object refactor (not whole package) → invoke a sub-skill directly
- Multi-package coordinated migration → split per package, run orchestrator N times
- Java CAP runtime → v2 (not yet supported)
- Kyma deployment → v2 (defaults to CF for now)

## Recommended companion plugins

From [secondsky/sap-skills](https://github.com/secondsky/sap-skills). These are external
capabilities; do not copy their GPL-licensed text into ARC-1 docs.

- `sap-abap` (recommended) — ABAP source patterns the sub-skills consume
- `sap-abap-cds` (recommended) — CDS view patterns for Step 3
- `sap-cap-capire` (recommended, 4 agents) — CAP scaffolding patterns for Steps 3-4
- `sap-btp-developer-guide` (recommended) — BTP deployment for Step 6
- `sap-btp-best-practices` (SHOULD; branch-MUST for production/high-risk landscapes) — BTP account, security, operations, HA/failover and governance review before deploy hand-off
- `sap-btp-service-manager` (SHOULD; branch-MUST when service lifecycle is deliverable scope) — BTP service instances and bindings
- `sap-fiori-app-development` (branch-MUST for FE branches) — Fiori app creation/modification rules for CAP vs standalone and backend metadata ownership
- `sap-fiori-tools` / `sap-fiori-create-cli` (branch-MUST when FE generation uses Fiori tooling; otherwise SHOULD) — Fiori Elements scaffolding and project validation for Step 5
- `sap-fiori-guidelines` (SHOULD; branch-MUST for stakeholder-facing UI) — Fiori UX/accessibility/design review

- `sap-api-style` (SHOULD) — API style review on the generated `service.cds` (Step 4) when the
  plugin exposes a command; otherwise use an equivalent manual checklist
- `sapui5-linter`, `sapui5-cli`, `sap-fiori-eslint-plugin` (branch-MUST when Step 5 produces UI5/FE frontend) — use the installed skill/plugin when exposed; otherwise run local `@ui5/linter` or project lint scripts
- `sap-fiori-add-visual-filter`, `sap-fiori-analytical-chart` (branch-MUST only when the accepted FE UX includes those controls)

Plus ARC-1 MCP (mandatory — system probe + source read in Steps 1-2) and `@sap/cds-mcp` when configured (recommended — authoritative CAP docs via `search_docs` + staged-model introspection via `search_model` in Steps 3-4). If a companion plugin/MCP is missing, record the degraded path in the hand-off notes instead of assuming the command exists.
