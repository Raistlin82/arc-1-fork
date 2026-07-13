---
name: migrate-custom-code
description: Applies selected SAP ATC quick fixes and bounded mechanical ABAP corrections to one approved logical unit through ARC-1. Uses exact quickfix payloads, explicit package/transport approval, syntax/activation/ATC/unit-test gates and confidence-based human review. Use after Clean Core classification when findings are deterministic or mechanical; return architectural redesigns, wrappers, RAP/CAP migrations and unresolved findings to the parent orchestrator.
---

# Migrate Custom Code

This is the canonical executor for deterministic and bounded mechanical ATC remediation. It does
not choose the Clean Core target architecture. Use `sap-clean-core-atc` for classification and
`sap-erp-clean-core-refactor` for standard, Key User, on-stack, side-by-side, wrapper or retirement
decisions.

## Input

```text
<type> <name> --transport=<request> [--variant=<assessment-variant>]
                   [--findings=<ids-or-lines>] [--approval-scope=object|package-transport]
```

Require:

- an approved object/logical unit and finding set;
- current source and package;
- an explicit transport for transportable objects;
- operator approval scoped either to this object or to deterministic fixes in the named
  package/transport.

This skill never creates or releases a transport. The parent orchestrator owns transport planning
and `sap-transport-review`.

## Confidence policy

| Class | Definition | Write policy |
|---|---|---|
| High | SAP-proposed quickfix delta, applied with unchanged opaque proposal data, syntax clean | May use prior package/transport approval |
| Medium | Bounded agent-authored mechanical correction with no architecture change | Concrete diff approval required |
| Low | Generated redesign, uncertain behavior, syntax failure or incomplete affected sources | No write; return proposal to parent |

Examples of low/architectural residue: replacing SAP GUI, redesigning authorization, changing LUW
semantics, introducing a wrapper, migrating SEGW/RAP/CAP, replacing internal tables with a new data
model, or selecting a released successor whose business parity is not proven.

## Protocol

### 1. Baseline

1. Read active source and object versions.
2. Confirm package, transport and open-lock context.
3. Run the selected ATC assessment:

```text
SAPDiagnose(action="atc", type="CLAS", name="ZCL_EXAMPLE", variant="ABAP_CLOUD_READINESS")
SAPRead(type="CLAS", name="ZCL_EXAMPLE")
SAPRead(type="VERSIONS", name="ZCL_EXAMPLE", objectType="CLAS")
```

If the requested variant is unavailable, stop for target-relevant findings unless the parent plan
explicitly accepts a named degraded fallback. No findings is not success until checked-object
coverage is proven.

### 2. Group findings

Group by exact source unit and line. For classes, preserve main/definitions/implementations/macros/
testclasses boundaries. For function groups and programs, include all affected includes in the
logical unit.

Order:

1. deterministic SAP quickfixes;
2. safe lint/format candidates;
3. medium-confidence mechanical corrections;
4. low-confidence/architectural residue returned to parent.

### 3. Preview quickfix

For each selected finding, pass current source and exact position:

```text
SAPDiagnose(action="quickfix", type="CLAS", name="ZCL_EXAMPLE", source="<current_source>", line=17, column=1)
```

Do not choose a proposal solely by label. Record proposal URI, opaque user content and every
affected object/source URI. Reject the automated path when:

- no proposal matches the selected finding;
- affected source content is unavailable;
- the proposal crosses the approved package/transport scope;
- the delta includes unrelated refactoring;
- the proposal changes architecture or behavior beyond the finding.

### 4. Apply proposal in memory

Pass proposal data through exactly:

```text
SAPDiagnose(action="apply_quickfix", type="CLAS", name="ZCL_EXAMPLE", source="<current_source>", line=17, column=1, proposalUri="<proposal_uri>", proposalUserContent="<opaque_user_content>")
```

For a multi-object proposal, also pass every `proposalAffectedObjects` entry returned by preview,
including current content. Merge deltas in memory and rebase later proposals on the latest
candidate; never apply multiple stale deltas independently.

### 5. Normalize and validate candidate

```text
SAPLint(action="lint_and_fix", source="<candidate_source>", name="ZCL_EXAMPLE")
SAPLint(action="format", source="<candidate_source>")
SAPDiagnose(action="syntax", type="CLAS", name="ZCL_EXAMPLE", source="<candidate_source>")
```

`lint_and_fix` and `format` return candidates. They do not persist source. Review their deltas and
exclude unrelated formatting when it would obscure the functional fix.

If syntax fails, do not write. Store the candidate and diagnostic as a low-confidence proposal.

### 6. Approval gate

- High-confidence deterministic delta: confirm it is inside the previously approved package and
  transport scope.
- Medium-confidence mechanical delta: show the concrete diff and require explicit approval.
- Low-confidence delta: stop without write.

### 7. Persist and activate

```text
SAPWrite(action="update", type="CLAS", name="ZCL_EXAMPLE", source="<approved_candidate>", transport="DEVK900001")
SAPActivate(action="activate", type="CLAS", name="ZCL_EXAMPLE")
```

For multiple affected objects, write all approved candidates under the same scope and activate as
a batch. A partial write is a failure: restore from the captured version baseline or leave the
transport explicitly blocked for recovery.

### 8. Regression proof

Run applicable tests and ATC again:

```text
SAPDiagnose(action="unittest", type="CLAS", name="ZCL_EXAMPLE", coverage=true)
SAPDiagnose(action="atc", type="CLAS", name="ZCL_EXAMPLE", variant="ABAP_CLOUD_READINESS")
```

For CDS/RAP logical units, run the available CDS tests, behavior/unit tests and sibling activation
checks selected by the parent plan. Compare findings before and after:

- selected findings removed;
- no net ATC regression;
- no activation error;
- tests green or an explicit parent-approved manual fallback;
- unrelated findings unchanged or explained.

Failure triggers rollback/recovery from the as-found version baseline and blocks acceptance.

## Output

```json
{
  "logicalUnit": "ZCL_EXAMPLE",
  "approvalScope": "package-transport",
  "transport": "DEVK900001",
  "applied": [
    {
      "finding": "finding-id",
      "confidence": "high",
      "proposalUri": "provider-uri",
      "affectedObjects": ["ZCL_EXAMPLE"]
    }
  ],
  "manualReview": [],
  "architecturalResidue": [],
  "validation": {
    "syntax": "pass",
    "activation": "pass",
    "tests": "pass",
    "atcRegression": 0
  }
}
```

Return architectural residue with finding, source location, reason it is non-mechanical, evidence
needed and recommended parent action. Do not attempt to solve it inside this skill.

## Guardrails

- Never ask ARC-1 to invent a quickfix URI or opaque user content.
- Never persist the preview response without inspecting the returned delta.
- Never auto-apply an agent-authored correction under the deterministic approval scope.
- Never skip unit tests merely because syntax and ATC pass.
- Never report success from an empty ATC result without coverage evidence.
- Never release the transport from this skill.
- Never transform a business/architecture decision into a mechanical fix.
