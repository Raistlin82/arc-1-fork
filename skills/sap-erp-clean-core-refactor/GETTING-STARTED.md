# Clean Core Refactor — Getting Started (step-by-step)

A plain-language walkthrough for your **first** Clean Core refactoring run. No prior experience with
this skill assumed. If you already know the flow and want the terse reference, jump to the
[`WORKFLOW.md` operator quickstart](./WORKFLOW.md#operator-quickstart).

> **The 30-second mental model.** There are two pieces:
> - **ARC-1** is the *hands*. It is the tool that actually talks to your SAP system (reads code,
>   runs checks, writes objects). **It is the only thing that ever changes your SAP system.**
> - **This skill** (`sap-erp-clean-core-refactor`) is the *brain*. It tells the AI agent how to use
>   ARC-1's hands safely and in the right order. By itself it changes nothing.
>
> You talk to the **agent**. The agent runs the **skill**, which drives **ARC-1**, which talks to
> **SAP**. Nothing is written to SAP until you approve it.

---

## Before you start (5-minute checklist)

1. **ARC-1 is connected to your SAP system and works.** Ask the agent something read-only first,
   e.g. *"Use ARC-1 to probe the system and tell me the release and landscape."* If that fails,
   fix the connection before going further — the skill needs live evidence.
2. **ARC-1 is in read-only mode.** For the whole planning phase you want *no* write permissions.
   That means the environment variable `SAP_ALLOW_WRITES` is **not** set to `true`. This is the
   default, so usually there is nothing to do. You will open writes later, deliberately, in Step 6.
3. **The skill is installed / available to your agent.** In Codex you invoke it as
   `$sap-erp-clean-core-refactor`; in a Claude Code plugin install as
   `/arc-1:sap-erp-clean-core-refactor`. If it is not installed yet, see
   [WORKFLOW.md → step 0](./WORKFLOW.md#0-confirm-the-two-layers).
4. **Pick a small scope for your first run.** One package (and its sub-packages) is ideal — for
   example `ZSD_CUSTOM`. A single object works too. Do **not** start with your whole custom
   codebase.
5. **Know the business requirement, if you can.** "What is this code *for*, in business terms?"
   Without it, the skill cannot judge whether SAP standard already covers the need, and it will
   (correctly) mark those decisions as *needs research* instead of guessing.

---

## The five modes, in order

You run the skill in one **mode** at a time. Think of them as five gears you shift through:

| # | Mode | What you get | Touches SAP? |
|---|------|--------------|--------------|
| 1 | `discover` | What system is this, what custom objects exist, what do they touch | Reads only |
| 2 | `estimate` | Rough size and effort, grouped into logical units | Reads only |
| 3 | `plan` | The actual per-object decision + the exact steps to take | Reads only |
| 4 | `execute` | Applies the approved changes, one unit at a time, with checks | **Writes** (only what you approved) |
| 5 | `govern` | Health KPIs, regressions, exception/wrapper follow-up | Reads only |

**The golden line is between step 3 and step 4.** Everything up to and including `plan` is safe and
reversible — it only reads and produces a document. `execute` is the only mode that changes SAP, and
only after you have said yes.

---

## Step 1 — Discover (safe, read-only)

Tell the agent, in your own words, something like:

```text
Use $sap-erp-clean-core-refactor on package ZSD_CUSTOM in discover mode.
Landscape auto, domain auto, no SAP writes.
Business requirement: sales-order approval and operational reporting.
```

What comes back: the live **landscape** (e.g. S/4HANA Private Cloud) and release, what ARC-1 can do
on this system, the list of **logical units** (a class + its tests + its includes count as *one*
unit, not many), what each unit touches, who owns it, and where evidence is missing.

Read it. If the scope or ownership is wrong, fix that now before continuing — everything downstream
builds on this picture.

---

## Step 2 — Estimate (safe, read-only)

```text
Use $sap-erp-clean-core-refactor on ZSD_CUSTOM in estimate mode.
Reuse the discovery evidence and stay read-only.
```

You get clusters, a current-state read (each unit is A / B / C / D / **Unknown** — see the
[glossary](#glossary)) and effort ranges. `Unknown` means "we don't have enough evidence yet", it
does **not** mean "bad" — it will be resolved later, never assumed to be the worst case.

---

## Step 3 — Plan (safe, read-only — this is the heart of it)

```text
Use $sap-erp-clean-core-refactor on ZSD_CUSTOM in plan mode.
Landscape s4-private-cloud, domain auto, no SAP writes.
```

For **each** logical unit the plan answers, in this order:

1. Can **SAP standard** already do this? If yes → replace the custom code (after you confirm it
   behaves the same).
2. Is the code **actually used**? If nobody calls it → propose retirement.
3. If it must stay custom, **where should it live?** The skill runs the SAP *Application Extension
   Methodology* (AEM) questionnaire to choose between: a Key-User extension, on-stack ABAP Cloud,
   BTP ABAP Environment, Cloud Foundry, Kyma, or a hybrid split. It never just "defaults to BTP".
4. What is the **cleanliness level** (A/B/C/D) of every touchpoint, and which concrete **action**
   is executable now versus needs a manual handoff or more research.

> **You do not have to fill the questionnaire by hand.** The agent gathers the facts from the live
> system and its own questions. If you are curious how the decision is computed, there is a
> read-only resolver you can run yourself (optional):
> ```text
> npm run --silent clean-core:resolve -- --facts docs/refactor/unit-facts.json
> ```
> It prints the chosen decision, the steps, and any gate still pending. It never writes to SAP.

The plan is a **document** (`docs/refactor/<date>-clean-core-plan.md`). You can read it, edit it,
and share it. Nothing has touched SAP yet.

---

## Step 4 — Approve, per unit (you, the human)

This is your decision, not the agent's. Approve **specific units**, name the transport, and say
what to leave alone. For example:

```text
Approve this plan subset:
- ORDER_APPROVAL: rewrite on-stack ABAP Cloud, target package ZSD_CC
- ORDER_LEGACY_API: wrapper, outcome A + B, wrapper package ZSD_CC_WRAPPERS
- ORDER_OLD_REPORT: remove (unused)

Transport: DEVK900123
Leave ORDER_EXTERNAL_SYNC as research_required. Do not touch anything not listed.
```

Approve one small batch first. You can always come back for more.

---

## Step 5 — Open the write door (deliberately, narrowly)

Only now do you give ARC-1 permission to write, and only to the packages you approved. You set these
in ARC-1's configuration **outside** the skill:

```text
SAP_ALLOW_WRITES=true
SAP_ALLOWED_PACKAGES=ZSD_CUSTOM,ZSD_CUSTOM/**,ZSD_CC,ZSD_CC/**,ZSD_CC_WRAPPERS,ZSD_CC_WRAPPERS/**
```

Only if ARC-1 must **create or release a transport** for you, also add:

```text
SAP_ALLOW_TRANSPORT_WRITES=true
```

Think of `SAP_ALLOWED_PACKAGES` as a fence: even if something goes wrong, ARC-1 physically cannot
write outside those packages.

---

## Step 6 — Execute one unit at a time

```text
Use $sap-erp-clean-core-refactor on ZSD_CUSTOM in execute mode.
Push only ORDER_APPROVAL and ORDER_LEGACY_API, using transport DEVK900123.
Stop after each unit and show me the diff before writing.
```

For each unit the skill: takes a safety snapshot of the current code → generates the new version →
checks syntax → **shows you the exact diff and waits for your yes** → writes through ARC-1 →
activates → runs ATC and unit tests → re-checks the cleanliness level. If any check fails, that unit
stops and the next one does **not** start. You are never more than one approval away from control.

---

## Step 7 — Review the transport, then govern

Before releasing anything, run the transport review, then ask for governance:

```text
Use $sap-erp-clean-core-refactor on ZSD_CUSTOM in govern mode.
Report KPI changes, any ATC regressions, wrapper follow-ups and the next review backlog.
```

Releasing the transport is a **separate, explicit** step — it never happens automatically.

---

## The 8 golden rules (read these once)

1. **ARC-1 is the only thing that writes to SAP.** Skills and MCP servers only advise or research.
2. **Nothing is written before you approve the plan**, per unit.
3. **You approve the concrete diff** before every generated change is written.
4. **Missing evidence = `research_required`, never an automatic "Level D".** Unknown is not bad.
5. **A/B/C/D is a *cleanliness* score, not the architecture choice.** Where code should live is
   decided by the business need and touchpoints first.
6. **BTP is never the default.** On-stack, Key-User and side-by-side are all valid Level A answers.
7. **A wrapper is honest about its debt:** the result is reported as "A consumer + B wrapper" (or
   "+ C"), never as pure A.
8. **Start small, one landscape, one package, one unit at a time.**

---

## Glossary

| Term | Plain meaning |
|------|---------------|
| **Clean Core** | Keeping SAP's standard "core" un-modified, so upgrades stay easy. Your custom code lives *alongside* it through approved extension points, not *inside* it. |
| **Level A** | Clean: allowed technology + released/public SAP interfaces. The goal. |
| **Level B** | Uses documented but classic (older) APIs. Tolerated on Private Cloud / on-premise with governance. |
| **Level C** | Uses SAP-internal objects never meant for customers. Needs a time-boxed, owned exception. |
| **Level D** | Modifications / clones / "no-API" hacks. The thing you are moving away from. |
| **Unknown** | Not enough evidence yet to classify. Gets resolved, never assumed to be D. |
| **AEM** | SAP *Application Extension Methodology* — the official questionnaire that decides *where* an extension should live. This skill runs it for you. |
| **On-stack** | The extension runs *inside* the S/4 system (embedded ABAP Cloud or Key-User). Best when it needs S/4 data and transactions directly. |
| **Side-by-side** | The extension runs *outside* S/4 (BTP ABAP Environment, Cloud Foundry, Kyma) and talks to it through released APIs/events. Best for independent apps, mobile, SaaS. |
| **Wrapper** | A small, isolated Level A shell around an old (B/C) object, so the rest of your code can stay clean. Temporary managed debt. |
| **Gate** | A must-pass check (e.g. tests green, ATC clean, human approval). A failed MUST gate blocks the write. |
| **Logical unit** | One thing to decide about as a whole — e.g. a class with its local + test includes — not each individual file. |
| **Transport** | The SAP change container your edits are recorded in, to be moved between systems. |

---

## Troubleshooting

| Symptom | What it means / what to do |
|---------|----------------------------|
| The plan says `research_required` for a unit | The skill is missing a fact (owner, released successor, parity decision, BTP boundary…). It is telling you *what* is missing — supply it and re-plan. This is correct behaviour, not a failure. |
| It refuses to classify something as Level A | A touchpoint is still unreleased, or (for on-stack ABAP Cloud) the target package / object language version isn't proven. Provide that evidence or keep it as research. |
| Execute won't write | Check `SAP_ALLOW_WRITES=true` and that your target package matches `SAP_ALLOWED_PACKAGES`. For transport creation/release you also need `SAP_ALLOW_TRANSPORT_WRITES=true`. |
| It asks about BTP data ownership / identity / retirement | Any side-by-side Level A target must prove these. There is no shortcut — the runtime choice (CF/Kyma) alone never proves cleanliness. |
| I want to push a Level B unit up to A | Use `--push-to-a` with the specific unit names, after an architecture review. |

---

## Where to go next

- [`WORKFLOW.md`](./WORKFLOW.md) — the full operator sequence with all the gates and diagrams.
- [`DECISION_MATRIX.md`](./DECISION_MATRIX.md) — the exact ordered decision rules in a table.
- [`README.md`](./README.md) — orientation and the file map.
- [`INTEGRATIONS.md`](./INTEGRATIONS.md) — which companion skills and SAP tools get used, and when.
