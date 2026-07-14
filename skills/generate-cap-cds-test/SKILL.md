---
name: generate-cap-cds-test
description: Generates and runs CAP CDS model, service, authorization, remote-boundary, event, and parity tests for an approved side-by-side target. Uses the project's supported cds.test API and test runner, blocks unresolved 501/TODO handlers, and emits acceptance evidence. Use for CAP CDS changes; do not use for ABAP CDS test doubles.
---

# Generate CAP CDS Tests

Validate a CAP target against its approved side-by-side contract. This skill tests CAP CDS and CAP
services; use `generate-cds-unit-test` for ABAP CDS in S/4.

## Input

```text
<cap-project> --decision=<path>/side-by-side-decision.json
```

Require `implementationModel=cap`. Detect the existing test runner and module format. Prefer
Vitest for new CAP Node.js projects; preserve a supported existing runner instead of rewriting the
project unnecessarily. Use the CAP-provided `cds.test()` API and call it once per test file.

## Test layers

1. Compile all CDS models and services with the project's local CAP toolchain.
2. Validate entity keys, associations, compositions, constraints, annotations, and OData metadata.
3. Test service functions/actions, error mapping, authorization, optimistic concurrency/drafts,
   and transaction boundaries.
4. Mock released remote services by contract. Do not replace their contract with inferred ABAP
   implementation details.
5. For replicated data, test duplicate delivery, ordering, replay, reconciliation, deletion, and
   poison-message handling.
6. Re-run accepted business parity cases against the CAP service.
7. Run hybrid tests only when approved cloud bindings are available; never persist credentials.

Minimum local gates:

```bash
npx cds compile db srv > /dev/null
npm test
```

Use `cds bind` only for an approved integration profile and inject resolved bindings at runtime.

## Blocking checks

- Fail when generated production handlers still contain `501`, unresolved migration `TODO`s, or
  placeholder success responses.
- Fail when a CAP-owned entity was not approved by `dataOwnership=cap|replicated`.
- Fail when an S/4-owned entity is persisted locally without an approved replication contract.
- Fail when authorization tests cover only anonymous or privileged happy paths.
- Fail when external API/event fixtures do not identify the released contract and version.

## Output

Write `<cap-project>/docs/test-evidence.json` with commands, tool versions, model hash, tested
contracts, passed/failed scenarios, unresolved parity gaps, and whether `cap_solution_verified`
is satisfied. A scaffold with green compilation but placeholder handlers is not verified.

Use `sap-cap-capire` for CAP semantics and `@sap/cds-mcp` `search_docs`/`search_model` when those
capabilities are exposed. Do not invent MCP calls when they are absent.
