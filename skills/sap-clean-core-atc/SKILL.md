---
name: sap-clean-core-atc
description: Classifies SAP ABAP custom-code logical units as Clean Core Level A, B, C, D or Unknown using live ARC-1 ATC/API-state evidence plus official released-object data. Separates assessment variants from development/transport gates and supports S/4HANA Public Cloud, Private Cloud, on-premise and BTP ABAP Environment without treating Level A as BTP-only. Use for package-wide Clean Core baselines, readiness reports, target planning and post-remediation reclassification.
---

# SAP Clean Core ATC Classification

Produce evidence, not migration. This skill classifies logical units and their touchpoints. Use
[`../migrate-custom-code/SKILL.md`](../migrate-custom-code/SKILL.md) to remediate selected findings
and [`../sap-erp-clean-core-refactor/SKILL.md`](../sap-erp-clean-core-refactor/SKILL.md) to choose a
target architecture.

## Input

```text
<package-or-object> [--landscape=auto|s4-public-cloud|s4-private-cloud|s4-on-premise|btp-abap-environment]

CLI flags stay kebab-case; every EMITTED landscape value uses the machine contract's snake_case
identifiers (`s4_public_cloud`, `s4_private_cloud`, `s4_on_premise`, `btp_abap_environment`) so the
classification JSON feeds `chain.json`/`aem-model.json` and the runtime resolver without mapping.
                    [--assessment-variant=<name>] [--gate-variant=<name>]
```

Do not silently default to Public Cloud. Probe the landscape or ask once. Landscape constrains the
acceptable target; it does not change the factual current classification.

## Classification model

| Level | Required evidence |
|---|---|
| A | Allowed extension technology and released SAP/customer APIs or extension points for every relevant touchpoint |
| B | Documented classic API, BAdI or classic extension technology that SAP permits for Private Edition/on-premise |
| C | Internal SAP object or non-released implementation detail without an approved classic API status |
| D | Modification, clone, no-API-zone access or technology explicitly not recommended by authoritative evidence |
| Unknown | Release state, technology, exception or successor evidence is missing/contradictory |

Unknown is not D. Keep `provisionalWorstKnownLevel` separately when some findings are known but the
logical unit is incomplete.

Level A may be Key User on-stack, Developer Extensibility on-stack or side-by-side through released
touchpoints. This classifier does not infer deployment location from the level.

## Protocol

### 1. Establish live context

1. Read the system context produced by `bootstrap-system-context`; refresh when stale.
2. Record system release, edition/landscape, components and feature probes. ARC-1 cannot enumerate ATC check variants: record the variants the customer NAMES (assessment `ABAP_CLOUD_READINESS`, governed copy of `ABAP_CLOUD_DEVELOPMENT_DEFAULT`) and verify each by attempting the ATC run — a missing variant fails with an explicit SAP error, which is the availability evidence.
3. Discover an official SAP documentation MCP exact-object capability when exposed; record its
   namespace. Otherwise use official structured SAP release data.

### 2. Inventory logical units

- Enumerate package contents through ARC-1 and recurse into subpackages.
- Cluster main programs and includes, function groups/functions/includes, classes/local includes,
  and complete CDS/RAP stacks.
- Treat a shared include or dependency as separate evidence, not as an independent business unit
  unless it has its own ownership and lifecycle.
- Record non-source touchpoints that ATC cannot discover automatically: Key User artifacts, UI
  adaptations, forms, integration configuration and business ownership.

### 3. Run assessment ATC

Use `ABAP_CLOUD_READINESS` when available:

```text
SAPDiagnose(action="atc", type="CLAS", name="ZCL_EXAMPLE", variant="ABAP_CLOUD_READINESS")
```

If unavailable, run the system's configured assessment/default variant, record its exact name and
mark Level A evidence degraded. Do not claim equivalent coverage without comparing the checks.

ATC complements API release evidence. A released object may still be used through a forbidden
statement or technology; an ATC finding may also require edition/release-specific confirmation.

### 4. Resolve every material touchpoint

For customer or SAP dependencies, read live API state where supported:

```text
SAPRead(type="API_STATE", name="ZIF_EXAMPLE", objectType="INTF")
```

For SAP objects, query exact object details in the official structured source. Record:

- object name and type;
- customer edition/landscape and source release;
- release state and contract/extension-point status;
- successor and source URL/date;
- conflicting live versus external evidence.

Do not classify from object-name familiarity. User/customer exits may have SAP Note-specific
exceptions; unresolved exceptions are Unknown.

### 5. Aggregate the logical unit

Known severity order is A < B < C < D. Aggregate as follows:

1. If every relevant touchpoint is known, the unit level is the worst known level.
2. If any material touchpoint is Unknown, set `classificationStatus=incomplete`, `level=Unknown`
   and retain `provisionalWorstKnownLevel` for prioritization only.
3. Report wrapper structures as separate components: consumer A and wrapper B/C. Do not flatten the
   program to A.
4. Releasing one custom API changes only that dependency. Re-run the full aggregation.

### 6. Evaluate target compliance separately

| Landscape | Acceptable target |
|---|---|
| S/4HANA Public Cloud | A only |
| BTP ABAP Environment | A only |
| S/4HANA Private Cloud | A preferred; B permitted; C only governed exception |
| S/4HANA on-premise | A preferred; B permitted; C only governed exception |

Current classification and target compliance are separate output fields. A current B unit in
Private Edition may be compliant without being A; the same unit is not acceptable for Public Cloud.

### 7. Record assessment versus gate

| Purpose | Variant |
|---|---|
| A-readiness assessment | `ABAP_CLOUD_READINESS` when available |
| Development/transport enforcement | governed customer copy of `ABAP_CLOUD_DEVELOPMENT_DEFAULT` |

The gate variant should include Usage of APIs, Allowed SAP Enhancement Technologies, Critical
Statements, modification checks and optional security checks according to governance policy. Do
not assume the assessment variant is configured as a blocking transport gate.

Level B informational findings require no ATC exemption. C exceptions require evidence that no A/B
successor exists. D exceptions are exceptional, finding-level, owned and time-bound.

## Output

Write a package/object report containing:

```json
{
  "logicalUnit": "ZCL_EXAMPLE",
  "members": ["ZCL_EXAMPLE"],
  "classificationStatus": "complete",
  "level": "B",
  "provisionalWorstKnownLevel": "B",
  "targetCompliance": {
    "landscape": "s4_private_cloud",
    "acceptable": true
  },
  "touchpoints": [
    {
      "kind": "classic-api",
      "name": "EXAMPLE_API",
      "level": "B",
      "evidence": "official-object-source"
    }
  ],
  "atc": {
    "assessmentVariant": "ABAP_CLOUD_READINESS",
    "gateVariant": "Z_CLEAN_CORE_RELEASE",
    "degraded": false
  },
  "successors": [],
  "openEvidence": []
}
```

Package summary includes:

- logical-unit counts by A/B/C/D/Unknown;
- current Clean Core Share based on complete classifications;
- technical-debt contribution by B/C/D and wrapper debt;
- findings grouped by deterministic, mechanical, generative and research-required;
- target-compliance failures for the selected landscape;
- evidence source/date and degraded checks.

## Guardrails

- Never call `migrate-custom-code` automatically from a classification-only request.
- Never report "no findings" as proof of A when the variant coverage is unknown or ATC skipped the
  package/object.
- Never classify `$TMP` as clean merely because the ATC worklist returned no rows; verify checked
  object status and package eligibility.
- Never infer portability to BTP from Level A.
- Never create or suggest an exemption for Level B informational findings.
- Never replace Unknown with D to make rollups simpler.
