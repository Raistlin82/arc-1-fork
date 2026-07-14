---
name: modernize-abap-side-by-side-core
description: Designs and proves a Clean Core side-by-side target before CAP, Cloud Foundry, Kyma, CDS, integration, or UI generation starts. Resolves the released S/4 boundary, data ownership, consistency, identity, implementation model, runtime fit, UI target, lifecycle, and composite wrapper outcome. Use for any proposed Level A BTP extraction or hybrid extension.
---

# Modernize ABAP Side-by-Side Core

Produce the architecture contract consumed by every side-by-side implementation skill. Do not
scaffold CAP, UI, Cloud Foundry, or Kyma before this contract is complete.

## Input

```text
<package-or-logical-unit> <target-dir> [--runtime=auto|cf|kyma] [--implementation=cap]
```

Read the approved Clean Core plan when invoked by `sap-erp-clean-core-refactor`. Otherwise remain
read-only and collect equivalent evidence through ARC-1.

## Output contract

Write `<target-dir>/docs/side-by-side-decision.json`:

```json
{
  "version": 1,
  "logicalUnit": "ORDER_APPROVAL",
  "targetLevel": "A",
  "implementationModel": "cap",
  "runtime": "cf",
  "serviceBoundary": "existing_released_api",
  "releasedIntegrationBoundary": true,
  "allTouchpointsReleased": true,
  "unreleasedSapAccess": false,
  "directS4DatabaseAccess": false,
  "dataOwnership": "s4",
  "cdsTarget": "cap_cds",
  "dataConsistencyPlanDefined": true,
  "transactionBoundaryDefined": true,
  "identityModelDefined": true,
  "apiOrEventContractGoverned": true,
  "lifecycleIndependent": true,
  "runtimeFitProven": true,
  "erpRetirementOrBoundaryPlanDefined": true,
  "capServiceRequired": true,
  "uiTarget": "cap_fiori_elements",
  "overallOutcome": "A",
  "evidence": []
}
```

Allowed values:

| Field | Values |
|---|---|
| `implementationModel` | `cap`, `non_cap`, `undecided` |
| `runtime` | `cf`, `kyma`, `undecided` |
| `serviceBoundary` | `existing_released_api`, `custom_rap`, `released_event`, `unavailable` |
| `dataOwnership` | `s4`, `cap`, `replicated`, `none` |
| `cdsTarget` | `none`, `abap_cds`, `cap_cds`, `dual_boundary` |
| `uiTarget` | `none`, `cap_fiori_elements`, `ui5_freestyle`, `external` |
| `overallOutcome` | `A`, `A+B`, `A+C`, `ResearchRequired` |

Every boolean must carry evidence or an explicit not-applicable rationale. Missing evidence is not
`false`; it makes the outcome `ResearchRequired`.

## Workflow

1. Reconfirm SAP standard and AEM. Side-by-side is not a default modernization destination.
2. Inventory every presentation, application, data, integration, and lifecycle touchpoint.
3. Prove an existing released API/event or design a custom RAP boundary built only on released
   touchpoints. If a classic/internal wrapper is required, report `A+B` or `A+C`, never pure A.
4. Assign data ownership before selecting CAP persistence:
   - `s4`: consume a released remote service; do not clone S/4 tables;
   - `cap`: model only the approved bounded context in CAP;
   - `replicated`: additionally define event/API source, key, ordering, idempotency,
     reconciliation, retention, deletion, and failure ownership;
   - `none`: keep the service stateless.
5. Define synchronous/asynchronous transaction boundaries, compensation, identity propagation,
   authorization, availability, logging, transport, support, and retirement.
6. Select runtime from evidence. Prefer CF for conventional CAP business applications. Select
   Kyma only for a concrete Kubernetes, container, operator, sidecar, or workload-control need.
7. Select UI independently. `cap_fiori_elements` and `ui5_freestyle` are alternatives; `none` is a
   valid backend-only result.
8. Emit the contract and stop on every unresolved MUST field.

## Conditional dispatch

| Contract fact | Required next skill |
|---|---|
| `implementationModel=cap` | `modernize-abap-to-btp-cap` |
| `dataOwnership=cap|replicated` | `modernize-abap-cap-schema` |
| `capServiceRequired=true` | `modernize-abap-cap-service` |
| `uiTarget=cap_fiori_elements` | `scaffold-cap-fiori-elements` |
| `uiTarget=ui5_freestyle` | `modernize-ui5-app` |
| Any CAP target | `generate-cap-cds-test` |
| `runtime=kyma` | `deploy-cap-to-kyma` after build and tests |
| `serviceBoundary=custom_rap` | ABAP CDS/RAP branch before CAP consumption |

`sap-abap-cds` applies only to the S/4 ABAP CDS/RAP boundary. `sap-cap-capire` applies to CAP CDS.
Do not invoke either as a generic substitute for the other.

## Level A refusal rules

Do not emit pure `A` when any touchpoint is unreleased, BTP reads S/4 persistence directly, data
ownership is ambiguous, identity or transaction semantics are missing, the selected runtime is
unjustified, or an ERP wrapper hides B/C debt. Moving code to BTP never upgrades the ERP boundary.
