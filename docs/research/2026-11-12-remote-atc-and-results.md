# Remote ATC and persisted ATC results through ADT

> **Status: desk research + unit tests with mocks only (2026-11-12).** No SAP system was available.
> Nothing in this note is live-verified by ARC-1 except where a repository capture is cited
> (the 758 run-status fixture and the measurements in `docs/plans/fix-atc-effective-check-variant.md`).
> External code was read as data only; nothing was executed.

## Question

Nova WOLF needs ARC-1 to (1) read ATC results that ARC-1 did not start — runs scheduled in
transaction ATC, central/remote run series, results made available to developer systems — and
(2) check custom code of an SAP ERP system from a central check system for an S/4HANA conversion
(`S4HANA_READINESS_<release>`, RFC destination / system group / object provider configured in
transaction ATC of the central system). What does ADT actually expose for each?

## TL;DR

| Need | What ADT offers | ARC-1 action |
|---|---|---|
| List persisted result sets | `GET /sap/bc/adt/atc/results` with five URI templates (active, active-for-SID, by creator, central, central-for-SID) | `SAPDiagnose(action="atc_results")` |
| Read one result set | `GET /sap/bc/adt/atc/results/{displayId}{?activeResult,contactPerson,includeExemptedFindings}` | `SAPDiagnose(action="atc_results", id=…)` |
| Map an ARC-1 run to its persisted result | The completed run status links `…/relations/results/displayid` → `/sap/bc/adt/atc/results/{displayId}` (live 758 capture) | `resultDisplayId` on `atc` runs |
| Ad-hoc check of a checked system's code by the central system | Only the **developer scenario**: the checked system's own ATC delegates to the central system when configured; ADT is unchanged | `SAPDiagnose(action="atc_remote")` on the checked system |
| Start/schedule a central run series, choose object provider / RFC destination / system group | **Nothing** in the ADT discovery document | Not possible — residual gap |

## Sources (all read 2026-11-12)

1. **ADT discovery document, "ABAP Test Cockpit" workspace** — third-party capture published at
   <https://raw.githubusercontent.com/fr0ster/mcp-abap-adt/main/docs/adt-discovery.xml> (the file
   does not record the system release). Already cited by
   `docs/plans/fix-atc-effective-check-variant.md`. Relevant collections and templates:

   ```text
   /sap/bc/adt/atc/results                     term atcresults
     {?activeResult,contactPerson}                                  rel …/results/active
     {?activeResult,contactPerson,sysId}                            rel …/results/activeforsysid
     {?createdBy,ageMin,ageMax,contactPerson}                       rel …/results/user
     {?centralResult,createdBy,contactPerson,ageMin,ageMax}         rel …/results/central
     {?centralResult,createdBy,contactPerson,ageMin,ageMax,sysId}   rel …/results/centralforsysid
     /{displayId}{?activeResult,contactPerson,includeExemptedFindings} rel …/results/displayid
     /{executionId}/log                                             rel …/results/log
   /sap/bc/adt/atc/runs{?worklistId,clientWait}
   /sap/bc/adt/atc/worklists{?checkVariant}, /{worklistId}{?timestamp,usedObjectSet,includeExemptedFindings}
   /sap/bc/adt/atc/result/worklist/{worklistId}/{displayId}{?contactPerson}
   /sap/bc/adt/atc/checkfailures/{worklistId}{?displayId}, /checkfailures/logs{?displayId,objName,objType,moduleId,phaseKey}
   /sap/bc/adt/atc/ccstunnel{?targetUri}       title "CCS Tunnel" (purpose not publicly documented)
   /sap/bc/adt/atc/customizing, /variants, /approvers, /exemptions/apply, /remarks, /autoqf/worklist,
   /checkexemptionsview, /apprNotifi/subscriptions, /configuration/{configurations,metadata}
   /sap/bc/adt/atc/checks/remoteenabled{?checkname}   (CHKO object: is a check remote-enabled)
   ```

   There is **no** collection for run series, scheduling, object providers, system groups or RFC
   destinations. `docs/research/2026-05-08-nw750-discovery-gap-analysis.md` lists
   `/sap/bc/adt/atc/results` as present on NW 7.50 (#55).
2. **Repository capture** `tests/fixtures/xml/atc-run-status-completed.xml` (live 758): the completed
   `atc:run` carries `<atom:link rel="http://www.sap.com/abap/checks/atc/relations/results/displayid"
   href="/sap/bc/adt/atc/results/DEA8421B…"/>` next to the `worklistid` link — this is the mapping
   the earlier plan said was missing.
3. **Repository measurement** `docs/plans/fix-atc-effective-check-variant.md`: `GET
   /sap/bc/adt/atc/results/{displayId}` returns `<atcresult:checkVariant>`; displayId ≠ worklistId;
   `GET /sap/bc/adt/atc/result/worklist/{worklistId}` alone returns 404.
4. **SAP Help, ABAP platform 2025 FPS02** (via the SAP documentation MCP):
   - *Usage Scenario and Technical Requirements* —
     <https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/7f9d7a446bb74a8c8e4970bcfbeb1f99.html>:
     central check system ≥ 7.51, checked systems 7.00–7.50, remote stubs SAP Note 2190113,
     prerequisites SAP Note 2364916; two ways to run: *central check runs* scheduled by a quality
     expert in the central system, and *ad-hoc runs by developers* triggered from the development
     system "as he is used to do it in ATC, but the analysis will be performed by the central check
     system"; `S4HANA_READINESS` is a listed example variant.
   - *Configuring the Checked System* —
     <https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/17eb1a1d504442b3ad438451197b937b.html>:
     SCI *Reference Check System* RFC destination, a global check variant whose executable checks
     are *In Reference Check System* (pointing at a central variant), ATC system role *Local ATC
     Checks Only*, the global variant in ATC basic settings; checked systems below 7.51 innovation
     package need SAP Note 2375864. Optional step 5: *Allow access to the Reference Check System with
     ABAP Development Tools* (RFC destination; authorization `S_Q_GOVERN ACTVT=45 ATC_OTYPGO=04`)
     so "ABAP Development Tools … displays the results from the Reference Check System in the ATC
     Result Browser for your system group".
   - *Running Remote ATC Checks in a Central Check System* —
     <https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/16e11b7b7fcf48ac812e21aa8de77381.html>:
     every check run belongs to a run series that defines objects/system/checks; "Replication of
     results between the central check system and the checked system is not supported in the remote
     scenario."
   - *Scheduling Check Runs in the Central Check System* —
     <https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/68917d0bb6844f5d9c73b68d0502fc6f.html>:
     an ATC administrator or quality expert logs on to the central system, transaction ATC → *ATC
     Administration → Runs → Schedule Runs*, selects the run series, *Schedule*; *Execute in
     Background* for regular intervals; postprocessing can name RFC destinations of satellite
     development systems to which a completed result is distributed.
   - *Configuring the ATC Developer Scenario* (BTP ABAP environment as central system) —
     <https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/3943c74328df43ad9a1fd22c39882aae.html>:
     after setup, ATC is run "in SAP GUI or ABAP development tools for Eclipse … in your checked
     system".
5. **SAP Community** (quality varies) —
   <https://community.sap.com/t5/enterprise-resource-planning-q-a/can-t-show-up-atc-central-check-result-browser-in-adt/qaq-p/12275606>:
   central results are browsed in ADT on the *checked* system, which needs SAP Note 2808562
   ("ATC: Access Reference Check System via ADT").
   <https://community.sap.com/t5/application-development-and-automation-blog-posts/abap-test-cockpit-atc-for-developers-in-eclipse/ba-p/13113248>:
   the ATC Result Browser shows the active central result published to development systems.
6. **Third-party clients, read as data:** `@mcp-abap-adt/adt-clients@12.1.0`
   (`dist/runtime/atc/parse.js`, `logs.js` on jsDelivr) reads the run-status `displayid` link and
   calls `/atc/results/{executionId}/log`; `rafaelssclaudio/MCP` `src/handlers/AtcHandlers.ts`
   reads `/atc/results/{displayId}` and parses `resultList > result` with child elements
   `displayId`, `title`, `checkVariant`, `runSeries`, `createdAt` and `objects/object/findings/finding`
   (worklist attribute names); its own comments say some names were not confirmed live.
   `abapify/adt-cli` generates the `/atc/results` contract from discovery (response schema guessed).

## Analysis

### Persisted results (`atc_results`)

The discovery templates are the authoritative request contract; ARC-1 maps each list call to
exactly one of them and **refuses** an input the chosen template does not carry (for example a
creator filter on `scope="active"`), because SAP would ignore it and return an unfiltered list.
`activeResult`/`centralResult` are sent as `true` (the same boolean style as `clientWait` and
`includeExemptedFindings`). `ageMin`/`ageMax` are integers interpreted as days — **inferred from the
name, not verified**.

The response shape is the weak point: only `<atcresult:checkVariant>` was measured. The parser
therefore accepts a `resultList` (or `results`) root with `result` rows, or a single `result` root,
reads header values from child elements **or** attributes, and returns all scalar fields under
`fields` when a known name is missing. Findings reuse the live-verified worklist attribute names
(`adtcore:uri/type/name`, `atcfinding:location/priority/checkTitle/messageTitle/quickfixInfo`,
`quickfixes@automatic|manual|pseudo`). Completeness is evidence-based: one result, display id echoed
and equal to the request, one objects container (an empty `<objects/>` counts as zero objects),
well-formed object rows and priorities, and an announced object count (when present) equal to the
returned rows. Exempted findings are excluded unless `includeExempted=true` (SAP's parameter).

Size: a central migration result can be tens of MiB. ARC-1 bounds list bodies to 2 MiB and result
bodies to 8 MiB with the existing streaming `DataResponseBudget`, refuses larger bodies with a hint
(`contactPerson` narrows a result server-side), and pages findings client-side. No ADT template
pages a result server-side; `/atc/result/worklist/{worklistId}/{displayId}` may load a result into a
worklist (which has object-set paging), but its contract is unknown — deferred.

### Remote ATC (`atc_remote`)

SAP offers two remote mechanisms, and only one is reachable from an ADT client:

1. **Central run series.** Objects of the checked system are selected by an *object provider*
   (RFC destination + system group) in a run series that lives in the central system and is
   scheduled there in transaction ATC. ADT discovery has no resource for run series, object
   providers, scheduling or RFC destinations, and the ATC run body (`atc:run/objectSets`) only
   references ADT URIs of the connected system. **ARC-1 cannot start such a run.**
2. **Developer scenario.** On the *checked* system, ATC runs exactly as locally (ADT worklist +
   run); SAP delegates the analysis to the central system because the global check variant
   references a variant there. From ADT's point of view nothing changes, so the "remote" capability
   is a property of the system's configuration, not of an ADT parameter. ARC-1 cannot observe the
   delegation.

`atc_remote` therefore implements exactly the developer scenario: it requires an explicit variant
(the local reference variant), runs the existing batch executor (same limits, verification and
completeness as `atc objects[]`), and reads back the persisted result each completed run links to,
reporting its `checkVariant` and completeness. A persisted variant that differs from the local name
is a warning, not an error: a reference variant may legitimately carry the central name, and ARC-1
cannot tell that from a substitution. It is fail-closed: unless discovery positively lists
`/atc/worklists`, `/atc/runs` and `/atc/results` (discovery is fetched on demand when not cached),
it returns a capability error that names the residual gap.

`/sap/bc/adt/atc/ccstunnel{?targetUri}` may be how the checked system's ADT reaches the reference
check system (SAP Note 2808562), but there is no public contract; using it would mean forwarding
arbitrary target URIs, which ARC-1's path-safety model forbids. Not used.

### Who schedules the run series

Per SAP Help, an **ATC administrator or quality expert** of the central check system configures the
run series (object provider, check variant such as `S4HANA_READINESS_<release>`) and schedules it
once in transaction ATC (*Schedule Runs*; *Execute in Background* for periodic runs). Results then
live in the central system; they can be activated and, per the scheduling page, distributed to
satellite development systems, while the remote-scenario overview states that replication to the
checked system is not supported. ARC-1 reads them either connected to the **central** system
(`scope="central"`, `sysId=<checked SID>`) or connected to a **checked** system that enabled ADT
access to the reference check system (SAP Note 2808562, `S_Q_GOVERN 45/04`) — which of the two
returns the central result through `/atc/results` must be confirmed live.

## Residual gaps (roadmap)

- **FEAT-95** — Live-qualify `atc_results`/`atc_remote`: capture list and result bodies on a 758+
  central check system and on a checked system with reference-check-system access, confirm element
  names, `ageMin/ageMax` units, `activeResult`/`centralResult` values, `sysId` behavior, the size of
  a real readiness result and whether delegation leaves a persisted result linked from the run.
- **FEAT-96** — Starting a remote run series through ADT: blocked until SAP discovery advertises a
  run-series/object-provider resource; until then the administrator schedules it once.
