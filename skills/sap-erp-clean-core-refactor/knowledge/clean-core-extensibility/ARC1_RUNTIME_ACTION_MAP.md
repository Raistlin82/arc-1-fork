# Clean Core Knowledge to ARC-1 Runtime Map

The knowledge graph explains why an architecture is appropriate. [`decision-rules.json`](./decision-rules.json)
provides the bounded runtime evidence pack. [`../../action-catalog.json`](../../action-catalog.json)
defines the only canonical ARC-1 payload examples. [`../../chain.json`](../../chain.json) composes
those operations into governed actions.

No graph node writes to SAP. A graph/rule match proposes evidence and candidate decisions; only an
approved chain action may invoke ARC-1 writes.

## Runtime layers

| Layer | Question | Artifact |
|---|---|---|
| Strategy | What does SAP Clean Core guidance require? | graph, raw source chunks, `decision-rules.json` |
| Decision | Which standard, use case, domain, level and action apply? | `chain.json`, `DECISION_MATRIX.md` |
| Capability | Can the current environment execute the action? | system probe, available skills/MCPs, action executor |
| Execution | Which exact tool payloads and gates apply? | `action-catalog.json` plus live substituted inputs |
| Proof | Did the result improve without regression? | ATC, syntax, tests, diff, transport and governance evidence |

## Tool roles

| Role | Canonical operation IDs |
|---|---|
| System and landscape | `system_probe`, `read_system` |
| Inventory | `inventory_package`, `exact_tadir_lookup`, `read_source` |
| Dependencies and fan-in | `read_dependencies`, `find_references` |
| Classification | `atc_assessment`, `read_api_state` |
| Deterministic remediation | `quickfix_preview`, `quickfix_apply`, `lint_candidate`, `format_candidate`, `syntax_check` |
| Source mutation | `write_update`, `activate_object`, `activate_batch` |
| On-stack creation | `batch_create_objects`, `publish_service_binding` |
| Wrapper | `create_wrapper_package`, `create_wrapper_class`, `release_api`, `write_governance_document` |
| Regression proof | `run_unit_tests`, `read_diff`, `atc_assessment` |
| Retirement | `find_references`, `delete_object` |
| Transport | `transport_check`, `transport_create`, `transport_release` |

The runtime must copy the operation, substitute every declared `requiredInput`, and preserve the
argument names. It must not abbreviate a call in generated executable instructions.

## Architecture concept mapping

| Knowledge concept | Evidence pack | Candidate actions |
|---|---|---|
| Standard-first and AEM | requirement, standard parity, users, coupling, consistency, data, lifecycle, TCO | `replace_with_standard`, target-domain selection, `research_required` |
| Level A domains | allowed technology plus all released touchpoints | `no_action`, `replace_with_key_user_extensibility`, `rewrite_on_stack_abap_cloud`, `extract_to_side_by_side_cf`, `hybrid_extension` |
| Release contracts | live API state, supported contracts, fan-in and owner approval | `release_api`, then consumer reclassification |
| Wrapper access | no released successor, landscape permission, package isolation, exception governance | `create_or_use_wrapper` with composite A+B or A+C result |
| Brownfield debt | runtime/static use, fan-in, business owner, current level | `remove_unused`, rewrite, side-by-side, keep B or research |
| AI-assisted remediation | deterministic proposal or generated candidate, confidence and syntax result | `migrate_custom_code` or diff-approved rewrite |
| Governance | ATC variants, transport policy, KPIs, exception/wrapper lifecycle | block, proceed, degraded/manual or continuous review |

## Valid call examples

These examples are duplicated only to make the runtime boundary explicit. CI validates them and
the catalog against the frozen ARC-1 schemas.

### Inventory and evidence

```text
SAPRead(type="DEVC", name="ZPKG")
SAPSearch(searchType="tadir_lookup", names=["ZCL_EXAMPLE"], source="adt", maxResults=20)
SAPRead(type="CLAS", name="ZCL_EXAMPLE")
SAPContext(action="deps", type="CLAS", name="ZCL_EXAMPLE", depth=1)
SAPNavigate(action="references", type="CLAS", name="ZCL_EXAMPLE")
SAPDiagnose(action="atc", type="CLAS", name="ZCL_EXAMPLE", variant="ABAP_CLOUD_READINESS")
SAPRead(type="API_STATE", name="ZIF_EXAMPLE", objectType="INTF")
```

### Deterministic remediation

```text
SAPDiagnose(action="quickfix", type="CLAS", name="ZCL_EXAMPLE", source="<current_source>", line=17, column=1)
SAPDiagnose(action="apply_quickfix", type="CLAS", name="ZCL_EXAMPLE", source="<current_source>", line=17, column=1, proposalUri="<proposal_uri>", proposalUserContent="<opaque_user_content>")
SAPLint(action="lint_and_fix", source="<candidate_source>", name="ZCL_EXAMPLE")
SAPLint(action="format", source="<candidate_source>")
SAPDiagnose(action="syntax", type="CLAS", name="ZCL_EXAMPLE", source="<candidate_source>")
SAPWrite(action="update", type="CLAS", name="ZCL_EXAMPLE", source="<candidate_source>", transport="DEVK900001")
SAPActivate(action="activate", type="CLAS", name="ZCL_EXAMPLE")
SAPDiagnose(action="unittest", type="CLAS", name="ZCL_EXAMPLE", coverage=true)
SAPRead(action="diff", type="CLAS", name="ZCL_EXAMPLE", from="active", to="inactive")
```

`proposalUri` and `proposalUserContent` must be passed through exactly from the preview response.
Apply multi-object quick fixes only when every affected source and explicit approval are available.

### Custom API release

```text
SAPRead(type="API_STATE", name="ZIF_EXAMPLE", objectType="INTF")
SAPNavigate(action="references", type="INTF", name="ZIF_EXAMPLE")
SAPManage(action="set_api_state", name="ZIF_EXAMPLE", objectType="INTF", apiState="RELEASED", contract="C1", transport="DEVK900001")
SAPDiagnose(action="atc", type="CLAS", name="ZCL_CONSUMER", variant="ABAP_CLOUD_READINESS")
```

`C1` is an example, not a universal choice. Read the live state and supported contracts. Service,
classic DDIC and other object types may require C0, C3 or another supported contract. Releasing one
dependency does not automatically classify all consumers A.

### Wrapper

```text
SAPManage(action="create_package", name="ZCC_WRAPPERS", description="Clean Core wrappers", superPackage="ZCC", softwareComponent="HOME", transport="DEVK900001", recordChanges=true)
SAPWrite(action="create", type="CLAS", name="ZCL_CC_WRAPPER", description="Clean Core wrapper", package="ZCC_WRAPPERS", transport="DEVK900001", source="<wrapper_source>")
SAPActivate(action="activate", type="CLAS", name="ZCL_CC_WRAPPER")
SAPManage(action="set_api_state", name="ZCL_CC_WRAPPER", objectType="CLAS", apiState="RELEASED", contract="C1", transport="DEVK900001")
SAPWrite(action="update", type="CLAS", name="ZCL_CONSUMER", source="<rewritten_consumer>", transport="DEVK900001")
SAPDiagnose(action="atc", type="CLAS", name="ZCL_CONSUMER", variant="ABAP_CLOUD_READINESS")
SAPDiagnose(action="unittest", type="CLAS", name="ZCL_CC_WRAPPER", coverage=true)
SAPWrite(action="create", type="SKTD", name="ZCC_WRAPPER_DOC", description="Wrapper decision", package="ZCC_DOC", transport="DEVK900001", refObjectType="DDLS/DF", refObjectName="ZI_EXAMPLE", source="<governance_record>")
```

The wrapper must live outside the ABAP Cloud component. `HOME` is an example and must be replaced
with the landscape's actual Standard ABAP software component. ARC-1 does not currently create ATC
exemptions; exemption approval/creation is a manual or separately exposed governance capability.

### Retirement and transport

```text
SAPNavigate(action="references", type="CLAS", name="ZCL_UNUSED")
SAPWrite(action="delete", type="CLAS", name="ZCL_UNUSED", transport="DEVK900001")
SAPTransport(action="check", type="CLAS", name="ZCL_UNUSED", package="ZPKG")
SAPTransport(action="create", package="ZPKG", description="Clean Core remediation")
SAPTransport(action="release_recursive", id="DEVK900001")
```

Release happens only after `sap-transport-review`; ARC-1 performs its inactive-object pre-check.

## Capability boundaries

| Target/action | Current status | Runtime behavior |
|---|---|---|
| On-stack ABAP Cloud | Executable through ARC-1 for supported ADT object types | Generate, validate, write and activate under normal gates |
| Cloud Foundry CAP | Executable through the CAP skill chain | ARC-1 manages ERP evidence/API boundary and later retirement |
| Key User | Planning and handoff | Record SAP app/tool, extension point, owner and acceptance tests; no invented ARC-1 mutation |
| Kyma | Planning and handoff | Do not call the CF-only CAP executor as if it deployed to Kyma |
| ATC exemption creation | Manual/external | Record owner, finding, rationale and expiry; do not invent a tool action |

## Runtime result contract

Every selected action returns:

```json
{
  "sourceLevel": "C",
  "targetDomain": "developer_on_stack",
  "targetLevel": "A+C",
  "action": "create_or_use_wrapper",
  "evidenceRuleIds": ["CC-WRAPPER-OUTCOME", "CC-WRAPPER-PLACEMENT"],
  "operationIds": ["read_api_state", "find_references", "create_wrapper_class"],
  "confidence": "medium",
  "approvals": ["owner", "wrapper_exception", "generative_diff"],
  "manualCapabilities": ["atc_exemption_governance"],
  "retirementTrigger": "released successor becomes available"
}
```

If any required field cannot be supported by evidence, return `research_required` and no write
sequence.
