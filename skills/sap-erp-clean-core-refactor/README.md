# Clean Core Refactor Orchestrator

This is the human entry point for the SAP ERP Clean Core refactor chain.

Use this orchestrator when you have custom ABAP code in a `Z*`, `Y*`, or customer namespace and
you need to move it toward Clean Core without guessing, skipping evidence, or letting writes happen
before a reviewed plan exists.

In one sentence: the chain reads the SAP system, groups custom code into real logical units,
classifies each unit as Clean Core Level A/B/C/D, proposes the right remediation path, waits for
human review, then executes changes through ARC-1 safety gates only.

## What It Does

The orchestrator is built for package-level refactoring, not isolated edits. It answers four
questions before any write is allowed:

1. What custom code exists, including includes, function groups, RAP/CDS siblings and SEGW shapes?
2. Which Clean Core level does each logical unit currently meet?
3. What is the cheapest safe target for each unit: keep, rewrite, release an API, extract
   side-by-side, remove, or research?
4. Which validations must pass before the transport can be released?

ARC-1 remains the only component that reads from or writes to the SAP system. Skills decide and
sequence the work; optional SAP plugins and MCP servers provide review or documentation lookup;
ARC-1 performs the actual system operations.

## The Practical Flow

Run the chain in three movements.

First, understand the system. `bootstrap-system-context` captures the SAP release, components,
available ADT features, formatter and lint/ATC profile. This prevents the chain from proposing ABAP
or RAP patterns that the target release cannot support.

Second, plan the refactor. `sap-erp-clean-core-refactor <package> plan` inventories the package,
clusters real logical units, classifies them, analyzes every non-A unit, looks up released
successors just in time, and emits an editable plan. Up to this point the SAP system is read-only.

Third, execute the approved plan. `sap-erp-clean-core-refactor <package> execute` starts with an
as-found baseline, applies mechanical fixes first, then loops unit by unit with syntax, lint, ATC,
unit-test, diff and transport gates. Every meaningful rewrite has human confirmation on the diff.

The transport is reviewed last with `sap-transport-review`.

## Commands You Actually Use

```text
/bootstrap-system-context
/sap-erp-clean-core-refactor ZPKG estimate
/sap-erp-clean-core-refactor ZPKG plan

# review and edit docs/refactor/<date>-clean-core-plan.md

/sap-erp-clean-core-refactor ZPKG execute
/sap-transport-review
```

`estimate` is optional. It gives a person-day sizing from the live system before the chain commits
to per-unit decisions. `plan` is the normal starting point when you want the actionable migration
plan. `execute` is opt-in and follows the reviewed plan.

## How Decisions Are Made

The decision model is intentionally simple:

- Level A code normally stays as it is.
- Unused code becomes a removal candidate, but only after runtime/static evidence and sign-off.
- Level B code can stay at B on S/4HANA on-premise or Private Cloud when the rationale is documented.
- Level B code must be pushed to A when the target is BTP ABAP Environment or S/4HANA Public Cloud.
- Level C code usually needs a released successor or a released customer API contract.
- Level D code must leave the no-API zone. It is rewritten to an allowed construct when possible, or
  extracted side-by-side when in-place remediation would not be clean enough.
- If the chain cannot prove the successor, ownership, fan-in, target level or business parity, it
  stops that unit as `research_required` instead of inventing a migration.

The full canonical matrix lives in [`DECISION_MATRIX.md`](./DECISION_MATRIX.md). The machine-readable
version lives in [`chain.json`](./chain.json) and is checked by CI.

## The Safety Contract

No code-changing path is trusted just because it was generated.

Every write path is wrapped by these rules:

- no SAP write before the plan is reviewed;
- package and transport safety are enforced by ARC-1;
- mechanical quickfixes run before generative rewrites;
- candidate source must pass lint/format and syntax before `SAPWrite`;
- changed objects must pass ATC and unit-test gates when applicable;
- the operator reviews the actual diff before accepting the unit;
- rollback uses SAP version history, not hope;
- `sap-transport-review` is the final pre-release gate.

The only lights-out write phase is the mechanical burn-down of tool-proposed quickfixes, and even
that phase still goes through syntax, write, activate, ATC refresh and transport review.

## What "Optimal" Means Here

The chain is optimal when it minimizes risk and custom surface, not when it blindly maximizes
automation.

For Public Cloud and BTP ABAP Environment, the compliance floor is Level A. For on-premise and
Private Cloud systems, Level B can be a valid end state when the code uses documented classic
extension points and the rationale is auditable.

The orchestrator prefers:

- released SAP APIs over unreleased internals;
- releasing stable customer APIs over rewriting every consumer;
- in-place rewrites when they can reach the target level cleanly;
- side-by-side CAP/BTP extraction when ERP-side remediation would remain dirty or too risky;
- research backlog over a confident-looking but unsupported answer.

## Where Each File Fits

Start here, then drill down only when needed.

- [`README.md`](./README.md) is this readable overview.
- [`SKILL.md`](./SKILL.md) is the executable protocol the agent follows.
- [`WORKFLOW.md`](./WORKFLOW.md) is the operator map: what runs, in what order, and with which tier
  of automation.
- [`DECISION_MATRIX.md`](./DECISION_MATRIX.md) is the canonical source-level to target-level decision
  reference.
- [`chain.json`](./chain.json) is the CI-checked manifest that keeps decisions, actions and skill
  coverage synchronized.
- [`INTEGRATIONS.md`](./INTEGRATIONS.md) explains which ARC-1 tools, local skills, optional SAP
  plugins and MCP servers are used at each phase.
- [`PATTERNS.md`](./PATTERNS.md) contains the ABAP, CAP, BTP, Fiori/UI5 and effort-estimation recipes
  used during planning and execution.
- [`SOURCES.md`](./SOURCES.md) lists the authoritative SAP sources and lookup tiers used for evidence.

## When Not To Use It

Do not start this chain for a one-line ABAP fix, a single small Z object edit, or a greenfield CAP
application with no ERP custom-code migration. Use ARC-1 directly for small changes and the CAP/BTP
skills directly for greenfield work.

Use this orchestrator when the main problem is deciding what a body of existing ERP custom code
should become.

## Maintenance Guardrails

The documentation is deliberately split into a readable layer and a contract layer. Keep the README
simple. Keep the matrix and `chain.json` exact. Keep examples aligned with the real ARC-1 tool
surface.

Before changing the chain, run:

```text
npm run check:clean-core-skills
npm run check:skill-refs
```

Those checks prevent the most expensive documentation failures: undocumented actions, missing skill
coverage, invalid `SAP*()` examples, optional plugin calls treated as mandatory commands, and
`generate-rap-service` slipping into the default production refactor path.
