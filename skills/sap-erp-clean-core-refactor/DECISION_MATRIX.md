# Clean Core Decision Matrix

Canonical source-to-target matrix for `sap-erp-clean-core-refactor`.

Use this file during `plan` to turn the Clean Core classification into a concrete action. The
machine-readable companion is [`./chain.json`](./chain.json); keep the `ID` values in sync because
`npm run check:clean-core-skills` validates both files.

## Common Pre-Decision Flow

Every row below assumes this evidence already exists:

1. `bootstrap-system-context` captured release, components, system type and ARC-1 feature flags.
2. `sap-transport-overview` checked open-request conflicts.
3. ARC-1 inventory clustered TADIR rows into logical units.
4. `sap-clean-core-atc` classified every unit A/B/C/D.
5. `explain-abap-code` analyzed every non-A unit.
6. JIT lookup resolved released successors through SAP docs MCP / cache / Apify / manual evidence.

## System-Type Modifier

| System type | Compliance floor | Effect |
|---|---|---|
| BTP ABAP Environment / S/4HANA Public Cloud | A only | `keep_at_level_b` is forbidden. B/C/D rows must escalate to A or become `research_required`. |
| S/4HANA on-prem / Private Cloud | A or B | B is acceptable when documented, justified and verified. |

## Source -> Target Matrix

| ID | Source | Target | Action | Trigger | Skill sequence | Required gates |
|---|---|---|---|---|---|---|
| A_TO_A_NO_ACTION | A | A | `no_action` | Unit already uses released APIs / allowed extension model | none | Keep classification evidence in the plan |
| B_TO_B_KEEP_B | B | B | `keep_at_level_b` | On-prem/PCE unit is compliant enough but cannot justify A cheaply | `sap-object-documenter` | SKTD rationale, ATC exemption evidence, not allowed on Public Cloud |
| B_TO_A_RELEASE_API | B | A | `release_api` | Stable Z/Y API is the only thing keeping consumers below A | ARC-1 API state/read/manage tools; `sap-api-style` when exposed | fan-in stability check, owner sign-off, `SAPManage(action="set_api_state")`, ATC reclassification |
| B_TO_A_REWRITE_IN_PLACE | B | A | `rewrite_in_place` | B dependency has a released successor or can be re-based cleanly | `generate-abap-unit-test` / `generate-cds-unit-test`; `generate-rap-logic` when behavior logic is involved | quickfix first, lint/format, syntax, ATC, unittest, human diff |
| B_TO_A_EXTRACT_SIDE_BY_SIDE | B | A | `extract_to_side_by_side` | A cannot be reached safely inside ERP, but ERP-side object can be replaced/retired | `modernize-abap-to-btp-cap` -> `modernize-abap-cap-schema` -> `modernize-abap-cap-service` -> UI branch as needed | CAP compile/build, BTP/Fiori/UI5 gates, QA parity, old ERP object deprecated/retired |
| C_TO_B_REWRITE_IN_PLACE | C | B | `rewrite_in_place` | Internal API can be replaced by documented classic/on-prem API, and B is acceptable | `generate-abap-unit-test` / `generate-cds-unit-test`; specialist skill if matched below | quickfix first, lint/format, syntax, ATC no D/C regression, unittest, human diff |
| C_TO_A_REWRITE_IN_PLACE | C | A | `rewrite_in_place` | Internal/unreleased construct has a verified released successor | tests -> rewrite per PATTERNS 9.2 -> ARC-1 write/activate | successor verified, syntax, ATC reclassifies A, unittest, human diff |
| C_TO_A_RELEASE_API | C | A | `release_api` | C is caused only by consuming an unreleased Z/Y dependency | ARC-1 API state/read/manage tools; `sap-api-style` when exposed | owner sign-off, fan-in stability, API state visible, consumers reclassify |
| C_TO_A_EXTRACT_SIDE_BY_SIDE | C | A | `extract_to_side_by_side` | GUI-bound, file/frontend, external API, or side-by-side is cheaper/cleaner | `modernize-abap-to-btp-cap` chain plus UI/BTP branch gates | CAP/BTP/UI gates, QA parity, old ERP object deprecated/retired |
| D_TO_B_REWRITE_IN_PLACE | D | B | `rewrite_in_place` | Modification, implicit enhancement, native SQL, BDC, kernel/OS access can land on documented on-prem construct | tests -> quickfix -> rewrite; `debug-slow-sql` for data-access hot paths | no D findings remain, syntax, ATC, unittest, human diff |
| D_TO_A_EXTRACT_SIDE_BY_SIDE | D | A | `extract_to_side_by_side` | D finding cannot be made cloud-clean inside ERP or Public Cloud forbids B | `modernize-abap-to-btp-cap` chain plus branch-specific gates | ERP-side object removed/deprecated, CAP/BTP/UI gates, QA parity |
| D_TO_A_REWRITE_IN_PLACE_RARE | D | A | `rewrite_in_place` | D finding has a verified released direct successor | tests -> rewrite -> ARC-1 write/activate | successor verified, syntax, ATC reclassifies A, unittest, human diff |
| ANY_TO_REMOVED | Any | Removed | `remove_unused` | Runtime/static evidence says no real consumers | `sap-unused-code` evidence plus ARC-1 references/delete | stakeholder sign-off, final `SAPNavigate(action="references")`, `SAPWrite(action="delete")` |
| ANY_TO_RESEARCH_REQUIRED | Any | ResearchRequired | `research_required` | Successor, ownership, fan-in, compliance target or business parity is uncertain | `explain-abap-code`; `sap-migration-dossier` when stakeholder artifact is needed | no write; issue remains in research backlog |

## Specialized Dispatches

These are refinements of the action column above.

| Condition | Action ID | Parent action | Target | Skill sequence |
|---|---|---|---|---|
| Only mechanical / quickfixable ATC findings | `migrate_custom_code` | `rewrite_in_place` | ATC-dependent | `migrate-custom-code` |
| SEGW OData V2 service | `migrate_segw_to_rap` | `rewrite_in_place` or `extract_to_side_by_side` | A | `migrate-segw-to-rap` |
| Analytical ALV/read-only report | `analytical_embedded` | `rewrite_in_place` | A | `generate-analytics-star-schema` -> `generate-cds-analytical-query` |
| RAP behavior implementation gap | `rap_logic` | `rewrite_in_place` | A or B | `generate-rap-logic` |
| Full production RAP stack, rare | `rap_full_stack_researched` | `rewrite_in_place` | A | `generate-rap-service-researched` |
| Small greenfield CRUD/prototype, not a refactor default | `greenfield_rap_may` | MAY only | A | `generate-rap-service` |

## Verification Contract

Every code-changing row ends with:

1. `SAPDiagnose(action="syntax", type="<type>", name="<name>", source="<candidate>")`
2. `SAPWrite(...)` / `SAPActivate(...)` only after local gates pass
3. `SAPDiagnose(action="atc", type="<type>", name="<name>")`
4. `SAPDiagnose(action="unittest", type="<type>", name="<name>")` when applicable
5. `SAPRead(type="<type>", name="<name>", action="diff")`
6. `sap-transport-review` before release
7. `debug-slow-sql` when the changed unit is a hot data-access path
