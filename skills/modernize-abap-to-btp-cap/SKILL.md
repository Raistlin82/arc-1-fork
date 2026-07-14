---
name: modernize-abap-to-btp-cap
description: Builds a BTP-native CAP Node.js target from an approved ABAP side-by-side decision. Consumes the mandatory boundary/data/runtime contract, then conditionally delegates CAP CDS persistence, services, Fiori Elements or freestyle UI, tests, and CF/Kyma packaging. Use after `modernize-abap-side-by-side-core`, not as proof that moving code to BTP is Clean Core Level A.
---

# Modernize ABAP to BTP CAP

Build orchestrator that takes an approved ABAP logical unit/package and produces a CAP project under
`<target>/.target-cap-staging/`. It leaves the ABAP system untouched; custom ERP boundary work is a
separate ABAP CDS/RAP branch.

Different from [`../migrate-custom-code/SKILL.md`](../migrate-custom-code/SKILL.md): that skill fixes ATC findings *inside* an ABAP system. This one produces a *side-by-side BTP target* that consumes released S/4HANA APIs instead.

## Input

```
<Z-package> <target-dir> --decision=<path>/side-by-side-decision.json [--deployment=cf|kyma] [--cap-runtime=node] [--skip=...] [--apply]
```

Examples:
- `ZSALES_PKG ./out --decision=./docs/side-by-side-decision.json` - run the approved conditional chain
- `ZSALES_PKG ./out --decision=./docs/side-by-side-decision.json --skip=deployment` - build and test only

## Defaults (applied silently)

| Aspect | Default |
|---|---|
| Deployment | Taken from the decision contract; never silently defaults across CF/Kyma |
| Source landscape | Read from `bootstrap-system-context`; never silently assume Public Cloud |
| CAP runtime | Node.js — the only supported value (Java deferred to v2) |
| OData | V4 |
| UI | Taken from `uiTarget`; default `none`, never generate both FE and freestyle |
| Auth | XSUAA |
| DB | HANA Cloud prod + SQLite dev |
| Output mode | Sandbox `.target-cap-staging/` (reversible) |
| MTA build | `mbt` |
| Output language | English i18n bundle |

## Conditional chain

Run only rows selected by the side-by-side decision contract. Each selected sub-skill can be re-run
independently.

| Step | Sub-skill | Produces |
|---|---|---|
| 1 | [`../modernize-abap-side-by-side-core/SKILL.md`](../modernize-abap-side-by-side-core/SKILL.md) | Mandatory reviewed architecture contract |
| 2 | This orchestrator | Runtime-neutral CAP skeleton and `docs/clean-core-gap.md` |
| 3 | [`../modernize-abap-cap-schema/SKILL.md`](../modernize-abap-cap-schema/SKILL.md) | CAP persistence only for `dataOwnership=cap|replicated` |
| 4 | [`../modernize-abap-cap-service/SKILL.md`](../modernize-abap-cap-service/SKILL.md) | CAP service only when `capServiceRequired=true` |
| 5 | [`../scaffold-cap-fiori-elements/SKILL.md`](../scaffold-cap-fiori-elements/SKILL.md) or `modernize-ui5-app` | Exactly one selected UI branch, or none |
| 6 | [`../generate-cap-cds-test/SKILL.md`](../generate-cap-cds-test/SKILL.md) | CAP compile, contract, authorization and parity evidence |
| 7 | This skill for CF; [`../deploy-cap-to-kyma/SKILL.md`](../deploy-cap-to-kyma/SKILL.md) for Kyma | Runtime-specific delivery artifacts |

## Pre-flight

```
SAPManage(action="probe")
```

Load and validate `side-by-side-decision.json` before reading package contents. Refuse when its
runtime differs from `--deployment`, its outcome is `ResearchRequired`, or its implementation model
is not `cap`.

Inventory does not require RAP availability. If CDS/RAP features are unavailable, record which
source artifacts cannot be modeled directly and continue with the supported ABAP/DDIC inventory.
Block only the specific target step that requires an unavailable capability. If the package is in
`$TMP`, require a transportable retirement/API-boundary plan before production cutover.

Validate `<target-dir>` is empty or contains a previous staging output only. Refuse to overwrite an existing CAP project without explicit confirmation.

## Gates

- **Unknown ERP touchpoint or unreleased boundary** -> stop that integration as `ResearchRequired`;
  do not treat moving code to BTP as proof of a clean ERP boundary
- **No released equivalent found for a critical object** -> flag it; redesign, build an A-compliant
  custom RAP boundary, or report a composite wrapper outcome
- **Missing data ownership** -> do not call the CAP schema skill
- **Target dir not empty / not staging** -> refuse without `--apply` confirmation
- **Kyma selected** -> delegate packaging only to `deploy-cap-to-kyma`; do not generate MTA/CF deploy
  instructions

If the source project has a Clean Core CI gate (`scripts/ci/check-s4-compat-coverage.sh` or equivalent), invoke it after staging — drift detection against `SAP/abap-atc-cr-cv-s4hc`.

## Output

```
<target>/.target-cap-staging/
├── db/schema.cds            (Step 3)
├── srv/service.cds          (Step 4)
├── srv/service.ts           (Step 4)
├── app/<namespace>/         (Step 5)
├── xs-security.json         (runtime packaging)
├── mta.yaml                 (CF only)
├── chart/ or gen/chart      (Kyma only)
├── package.json             (Step 1)
├── docs/
│   ├── side-by-side-decision.json
│   ├── clean-core-gap.md    (Step 2)
│   ├── test-evidence.json   (Step 6)
│   └── porting-plan.md      (orchestrator summary + ADRs)
└── README.md
```

The user reviews under the staging dir, then promotes to the real CAP project (rename / move, or invoke with `--apply` to write directly).

## Hand-off

Generated CAP project is **sandbox**. Manual next steps (not in this skill):

Before deploying, run the readiness gates on the staged project. Use external skill/plugin
commands only when the current environment exposes them; otherwise perform the equivalent manual
review and record the degraded gate in `docs/porting-plan.md`.

1. `sap-cap-capire` - CAP model, service and deploy readiness.
2. `sap-btp-developer-guide` - BTP-side readiness (services, roles, entitlements).
3. `sap-btp-best-practices` — SHOULD for every deployable BTP side-by-side extension; branch-MUST
   for production, multi-subaccount/multi-region, sensitive-data, principal-propagation,
   HA/failover, or shared-landscape scenarios.
4. `sap-btp-service-manager` — SHOULD when the extension uses BTP services; branch-MUST when the
   deliverable creates, binds, or automates service instances.
5. `sap-fiori-app-development` + `sap-fiori-tools` / `sap-fiori-create-cli` - branch-MUST only when
   `uiTarget=cap_fiori_elements`; keep CAP service metadata authoritative.
6. `sap-fiori-guidelines` + `sapui5-linter` / `sapui5-cli` / `sap-fiori-eslint-plugin` —
   branch-MUST for stakeholder-facing UI: Fiori UX / accessibility review plus UI5 lint/build
   checks. If the plugin is absent, run local `@ui5/linter` or the project's lint script.

```bash
cd <target>/.target-cap-staging
npm install
npx cds compile db srv > /dev/null
npm test
```

For CF, add/build the reviewed MTA and deploy under the environment's delivery approval. For Kyma,
follow `deploy-cap-to-kyma`; never emit both deployment paths in one plan.

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
- Non-CAP side-by-side implementation -> requires another reviewed executor

## Recommended companion plugins

From [secondsky/sap-skills](https://github.com/secondsky/sap-skills). These are external
capabilities; do not copy their GPL-licensed text into ARC-1 docs.

- `sap-abap` (recommended) — ABAP source patterns the sub-skills consume
- `sap-abap-cds` (branch-MUST only for a custom S/4 ABAP CDS/RAP boundary; never for CAP CDS)
- `sap-cap-capire` (branch-MUST) - CAP CDS, service, test and deployment guidance
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
