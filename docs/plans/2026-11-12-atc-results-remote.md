# Persisted ATC results and developer-scenario remote ATC (W8)

Approved by the product owner on 2026-11-12 for Nova WOLF. Research and sources:
[`docs/research/2026-11-12-remote-atc-and-results.md`](../research/2026-11-12-remote-atc-and-results.md).
Verification: unit tests with mocks and synthetic fixtures only — **live verification pending**
(roadmap FEAT-95).

## Outcome

1. Read ATC results that ARC-1 did not start: list result sets (active, central for a checked
   system, by creator) and read one result's findings with completeness evidence.
2. Run ATC from a checked system that SAP delegates to its central check system (developer
   scenario), with an explicit variant and read-back of the persisted result.
3. State plainly that a central run series cannot be started through ADT and who schedules it.

## Public contract

- `SAPDiagnose(action="atc_results")` — read scope, `OperationType.Read`.
  - List (no `id`): `atcResult.scope` `active` (default) | `central` | `user`; `atcResult.sysId`,
    `atcResult.contactPerson`, `atcResult.minAgeDays`/`maxAgeDays` (central/user), `user` = creator
    (required for `user`), client-side `variant` (`*` suffix) and `atcResult.title`; `maxResults`
    ≤ 200 (default 50), `atcResult.offset`. Each input maps onto exactly one discovery template;
    unsupported combinations are refused by Zod before any SAP call.
  - Detail (`id` = display id, 1–64 alphanumerics): `atcResult.contactPerson`,
    `atcResult.includeExempted`, client-side `atcResult.objectName`, `maxResults` ≤ 500 (default
    100), `atcResult.offset`. Output: `evidence` (checkVariant, createdAt, objectCount,
    objectsWithFindings, findingCount), `header`, findings shaped like `atc` plus `checkId`,
    `messageId`, exemption fields and the enclosing object, `page`, `complete`/`incompleteReasons`.
    Incomplete → tool error carrying the data.
  - Discovery-gated: listed-absent `/sap/bc/adt/atc/results` → capability error; unknown discovery
    → the GET is attempted and a 404/405 becomes a capability error.
  - Bounds: 2 MiB list / 8 MiB result (`DataResponseBudget`), explicit refusal when exceeded.
- `SAPDiagnose(action="atc_remote")` — read scope, `OperationType.Read` (workload-producing like
  `atc`). Inputs: `objects` (≤ 20) or `name`+`type`, required `variant`, `timeoutSeconds`. Reuses
  `runAtcBatch`; adds `persistedResults` (via the run-status `displayid` link) and `warnings`.
  Fail-closed unless discovery lists `/atc/worklists`, `/atc/runs`, `/atc/results`.
- `atc` structured/batch run metadata gains optional `resultDisplayId` (additive).

## Policy, safety, surfaces

- `ACTION_POLICY`: both actions `read`/`Read`; they work on a read-only ARC-1 (Read is never blocked
  by the safety ceiling) and honour `SAP_DENY_ACTIONS`.
- Every ADT call goes through `checkOperation` (`ListAtcResults`, `GetAtcResult`, `AtcDiscovery`,
  existing `RunATCCheck`/`ListAtcVariants`). Audit: the standard `tool_call_start/end` events, as
  for the other ATC actions.
- Multi-target: both added to the reviewed `SAPDiagnose` allowlist (ADR-0006 workload decision,
  ADR-0007 Basic rules unchanged; one target, one identity, no RFC selection by ARC-1). Normative
  plan updated.
- Tool schema: one new described property `atcResult` (object, keys listed in its description,
  validated by Zod) to stay within the 75 000-byte tool-list wall; existing descriptions were
  trimmed by the same amount. Snapshots regenerated and reviewed.
- Clean-core chain: catalog operations `atc_central_results`, `atc_central_result_findings`,
  `atc_remote_assessment` (session-scope, landscape-dependent); skills `sap-clean-core-atc`,
  `migrate-custom-code` and the chain docs use them instead of asking the ATC administrator.

## Files

- `src/adt/atc-results.ts` (new), `src/adt/atc.ts` (`parseAtcRunResultDisplayId`, exported helpers).
- `src/handlers/diagnose-atc-results.ts`, `src/handlers/atc-results-input.ts` (new),
  `src/handlers/{diagnose,diagnose-fields,schemas,tools,object-types}.ts`, `src/authz/policy.ts`,
  `src/server/multi-target-tools.ts`.
- Tests: `tests/unit/adt/atc-results.test.ts`, `tests/unit/handlers/atc-results.test.ts`, updated
  policy/multi-target/tools/async tests, synthetic fixtures `tests/fixtures/xml/atc-result*.synthetic.xml`.

## Not done / residual

- Live capture and qualification of the list/result XML, age units and SID behavior (FEAT-95).
- Starting a central run series, choosing object provider/RFC destination/system group through
  ADT: no ADT resource exists (FEAT-96). The ATC administrator or quality expert schedules the run
  series once in transaction ATC of the central check system; ARC-1 then reads it with
  `atc_results` `scope="central"`.
- `/atc/results/{executionId}/log`, `/atc/checkfailures/*`, `/atc/result/worklist/…` and
  `/atc/ccstunnel` are not used.

## Live verification checklist (pending)

1. Central check system (758+): `atc_results` list for each scope, with and without `sysId`; read an
   S/4HANA readiness result; compare counts with transaction ATC *Manage Results*.
2. Checked system with SAP Note 2808562 and ADT access to the reference check system: list central
   results; read one.
3. Checked system in developer scenario: `atc_remote` with the reference variant; confirm findings,
   the `displayid` link and the persisted variant name.
4. A 7.50 checked system without the configuration: capability behavior and errors.
