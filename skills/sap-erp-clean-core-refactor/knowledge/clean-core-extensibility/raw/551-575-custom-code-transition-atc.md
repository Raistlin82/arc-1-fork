---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 551
page_end: 575
topic: custom-code-transition-atc
---

# Clean Core Extensibility - pages 551-575

## PDF page 551
2.2 Adapt code - Manual
INTERNAL – SAP and Partners Only 646

## PDF page 552
2.2 Adapt code - Manual
Manual
(demo of 2023)
INTERNAL – SAP and Partners Only 647

## PDF page 553
2.2 Adapt code - Manual
Manual
(demo of 2023)
INTERNAL – SAP and Partners Only 648

## PDF page 554
2.3 New ATC Check - No findings
INTERNAL – SAP and Partners Only 649

## PDF page 555
Adapt
Agentic Custom Code Adaptation

## PDF page 556
Assistants supporting ongoing modernization
Discover Prepare Explore Realize Deploy Run Continuously innovate
Central engagement layer and orchestration through Joule
System Analysis Assistant Continuation across the migration process
Input for all other assistants
Continuous monitoring and improvement
Data Management Assistant
of migration data quality
Maintaining a
Custom Code Assistant
clean core strategy
Configuration Assistant
Test Management Assistant
Rollout Assistant
Project Management Assistant
Continuous exchange
Joule for Consultants Joule for Developers
INTERNAL – SAP and Partners Only 651

## PDF page 557
Saphire 2026 - Demo of SAP Joule for developers ABAP agentic AI custom code migration in Eclipse
https://www.youtube.com/watch?v=G9QGCHWkxKw
Agentic demo (Q2 2026 — just
released)
• ABAP MCP Server connects Eclipse to an
agent (demo uses Amazon Q, but it's
partner-agnostic)
• Agent runs ATC on a scope of custom code
→ finds, say, 29 technical findings
• Agent applies deterministic quick fixes at
scale (rule-based, high confidence)
• Agent then proposes and applies AI-
generated fixes with confidence
classification and human-in-the-loop review
INTERNAL – SAP and Partners Only 652

## PDF page 558
Saphire 2026 - SAP Joule for developers ABAP AI goes agentic with focus on custom code migration
https://www.youtube.com/watch?v=Ek2hLmYs-bE
INTERNAL – SAP and Partners Only 653

## PDF page 559
Blog: S/4HANA Custom Code Migration Agent - Accelerating ECC to SAP S/4HANA Transformation with Agentic AI
https://community.sap.com/t5/technology-blog-posts-by-sap/s-4hana-custom-code-migration-agent-accelerating-ecc-to-sap-s-4hana/ba-p/14418929
“Proposes AI-based fixes for the
complex use cases, for which
deterministic quick fixes do
not exist.
For each AI-based fix the
confidence score of the fix
proposal is calculated. The
agent automatically changes the
code only using AI-based fixes
with high confidence score and
without syntax errors. AI-based
fixes with lower confidence
score or causing syntax errors
are inserted into the code as
proposals in the comments. This
will allow developers to review
the proposed changes and
adjust them as needed”
YouTube video demo
INTERNAL – SAP and Partners Only 654

## PDF page 560
Joule desktop generated: Three Agents to Know (Late 2026 Roadmap)
• Mass S/4HANA Custom Code Conversion Agent — ATC-driven,
fixes code to run on S/4HANA (Q2 2026 GA)
• Mass Clean Core Adoption Agent — detect and fix clean-core ATC
issues, move to ABAP Cloud patterns (later 2026)
• Web Dynpro → SAP Fiori Modernization Agent — transform legacy
UI to ABAP Cloud/Fiori (later 2026)
INTERNAL – SAP and Partners Only 655

## PDF page 561
Modification + “Clones” + Implicit enhancements

## PDF page 562
Modification + “Clones” + Implicit enhancements
Many instances of SAP ERP instances
contain a high number of obsolete
modifications—that is, with the code
actually identical to the standard. There is
no reason to take these over to SAP
Pg. 38
S/4HANA, as they can be reverted
without any impact. During several
reviews performed in customers’
systems, over 50% of all modifications in
a given system were classified as
obsolete. Another large group of
modifications will become dispensable on
system conversion and can be reverted
too. You can analyze all modifications
and classify them into the categories
listed in the following table. Don’t be
deterred by numbers; the actual
modifications are far fewer. You can
include the clones (that is, the custom
programs created as copies of SAP code)
and implicit enhancements into your
review and treat both as modifications.
INTERNAL – SAP and Partners Only 657

## PDF page 563
SAP Clone Finder - transaction CCAPPS
INTERNAL – SAP and Partners Only 658

## PDF page 564
Renovate by use case

## PDF page 565
Renovate by use case
Classic development
type
Pg. 99
INTERNAL – SAP and Partners Only 660

## PDF page 566
Transition of classic ABAP custom code towards clean core - 1/3
Category Use Case Related Clean Recommendation
Core Level
Extensions Custom field on DB table or CDS view via A
released extension include
Implementation of a released SAP BAdI A
Custom field on DB table or CDS view via extension B
include that has not been released
Custom field on DB table via classic append C Monitor when extension include will be
available and adapt accordingly
Implementation of an SAP BAdI that has not been B Monitor when BAdI will be released and
released adapt accordingly
Implementation of a BAdI that has been flagged as SAP- D Should be allowed in exceptional cases
internal only
Extension of an SAP Fiori app (RAP based) A
Extension of an SAP Fiori app (SEGW, BOPF, UI5) B
Extension of an SAP application with legacy UI B Monitor if SAP Fiori application will be
technology, e.g., SAP GUI transaction available
INTERNAL – SAP and Partners Only Always check the latest updates of SAP Note 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility 661

## PDF page 567
Transition of classic ABAP custom code towards clean core - 2/3
Category Use Case Related Clean Recommendation
Core Level
Custom Custom SAP Fiori app (RAP based) for the core SAP A
Applications S/4HANA Cloud scope
Custom SAP Fiori app (SEGW, BOPF, UI5) B Prefer to use RAP. Exception could be
know-how or reuse
Custom application with legacy UI technology (e.g., B Should be prevented
ABAP report with ALV, Web Dynpro application)
SE54 based BC UI B RAP-based BC-App
Wrapper Wrapper classes around SAP objects that have not been B if the wrapped Monitor when the released RAP interface
released (e.g., BAPI) object is a is available and replace the wrapper
classic API,
otherwise C
Wrapper CDS view for SAP table or CDS view that have B if the wrapped Monitor when a released CDS view is
not been released object is a available and replace the wrapper
classic API,
otherwise C
Always check the latest updates of SAP Note 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility
INTERNAL – SAP and Partners Only 662

## PDF page 568
Transition of classic ABAP custom code towards clean core - 3/3
Category Use Case Related Clean Recommendation
Core Level
Modifications Applying SAP note with manual corrections, e.g., DDIC D Reset modification once the correction is
object from SAP BASIS part of the core
Implementation of user/customer exits * D Monitor if SAP released BAdI can be
used instead
Modification (Business driven) D Should be allowed only in exceptional
cases
* A selected number of user and customer exits is considered clean core-compliant. So, it is advisable always to
check whether there is a specific SAP note that allows the exit usage (e.g., SAP Note 3589866 Clean Core: Userexits
& VOFM in SD/LE).
• https://me.sap.com/notes/3589866
Always check the latest updates of SAP Note 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility
INTERNAL – SAP and Partners Only 663

## PDF page 569
For Customer Exits and User Exits, always check updates on important SAP Notes
SAP Note 3578329 - Frameworks, Technologies and SAP Note 3589866 - Clean Core: Userexits & VOFM in SD/LE
Development Patterns in Context of Clean Core Extensibility
The classic userexits are technically modifications of SAP objects.
Single-Implementation Extension Techniques In the corresponding tools provided by SAP for detecting modifications, these objects are
ignored, preventing their delivery and thus overwriting the objects.
• For some extension techniques only one concurrent, active implementation can exist at a given point of time in
a system (e.g. Customer Exits, Single Use BAdIs). If more than one implementation of such an extension comes
This meets all fundamental requirements for Clean Core upgrade stability and accordingly
into a system, this is likely to result in issues (e.g. short dumps). This can be the case if e.g. an implementation
these objects have a clean core level of 'B'.
delivered via a 3rd party addon clashes with an implementation done by the customer.
• If an extension technique is supporting only one concurrent implementation, this does not negatively influence
its clean core level. It's in the customer's responsibility to avoid such situations e.g. when installing a new 3rd
party addon.
INTERNAL – SAP and Partners Only 664

## PDF page 570
New SAP Note 3690029 - Integration Technologies and Frameworks in
Context of Clean Core Integration
https://me.sap.com/notes/3690029
How to differs from SAP Note
3578329 – Extensibility?
Two notes, two Clean Core principles - they
complement, they do not overlap.
INTERNAL – SAP and Partners Only 665

## PDF page 571
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
Identify the Business Transformation requirements
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
and priorities
List the most actively used extensions Retire Unused custom code
Classic
Design and implement new Clean Core extensions
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions
• For all new developments, your target should be the strict adherence to
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize clean core principles. This means avoiding any unnecessary technical
optimization B (when A isn’t available) extensions that have a business case
Classify the extensions by Business area business
and renovation debt by ensuring every extension follows clear guidelines.
value: Level D Modification + “Clones” + implicit Renovate extensions without
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions
optimized and respective business processes DDeessiiggnn aanndd iimmpplleemmeenntt nneeww CClleeaann CCoorree eexxtteennssiioonnss
with
tangible
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
impact
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension
Improvement as-is process flows
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
and AI
evaluation
Paradigm
AI, Situation Handling, Build Process automation Technical Replace classical reports by Analytical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 668

## PDF page 572
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
ATC ExeRmunptions
• ATC Exemptions are used to control the usage of SAP internal objects
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Level A (when no Released or Classic API is available), Level C (Priority 2
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
Warning) and in exceptional cases Level D (Priority 1 Error). You should
KPIs
Identify the Business Transformation requirements
not create exemptions for Level B (Priority 3 Info)
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
and priorities
• Exemptions can be applied at the level of entire packages, whole ABAP
List the most actively used extensions objects/sub-objects, or mReotriree gUrnaunseudla crulys toonm icnoddievidual findings
Classic
List the most business-critical extensions •SQLF coord ec lpeuasnh dcoowren ffoinr dpeinrfgosrm, yaoncue s ohpotiumlidz autisoen the fine-gRreannouvlaatre obpy tuiosne caats tehe
extensions
finding level to ensure the best possible governance
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize
optimization • The ATCB (ewxheemn Ap tiisonn’t bavroaiwlasbeler) can be used teox tmenosnioitnosr t heaxte hmavpet iao bnuss ainnedss i sc ase
Classify the extensions by Business area business
and renovation value: tLheevreel fDo rMeo tdhifeic raeticoon m+ “mCelonndees”d + t oimopl lfiocirt controllingR tehneo vaadteo epxttioenns ioofn tsh wei tchloeuatn
Classify the extensions by use case
Focus enchoarnec eemxetentnss: iCblialistysi fmy oandde Al dapt or Replace documentation
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions Document your Level A objects and manage your Wrappers and exemptions by LOB
optimized and respective business processes Design and implement new Clean Core extensions
with
tangible
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
impact Wrappers
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension • If you use an SAP internal API frequently in your custom code, or if you
Improvement as-is process flows
Guidelines often access a single database table directly, you will receive an ATC
and Innovation
Signavio Process Modeler to document your as-is
In Memory finding for each usage. This can make the process of creating exemptions
processes and import SAP Best Practices for
and AI for every individual finding quite tedious
evaluation
Paradigm
• The recommended practice is to create a wrapper around the SAP object
AI, Situation Handling, Build Process automation Technical Replaacned c ulassesi cthali sre wporartps pbey rA inna lyyotiucar l customE vcaoludaete, cinusstteomad c oodf ed rierencovtlayt iaonc coef sthsein zg
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
the SAP object
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
• RenWovitaht et heixst eanpspiornosa wcihth, tShiteuraeti oisn only a single usage of the SAP object within
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
the wrapper, and you only need to create one exemption for that finding
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI • This is considered a best practice for working with internal SAP objects
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 669

## PDF page 573
ABAP Test Cockpit to govern a Clean Core

## PDF page 574
How to adapt custom code for ABAP Cloud in SAP Cloud ERP Private
Use ABAP development tools for Eclipse and ABAP test cockpit for Using quick fixes in ABAP development tools for Eclipse
custom code analysis and adaptation
Run ABAP test cockpit with the ABAP_CLOUD_READINESS check variant to check
for ABAP Cloud (Level A) compliance of your code.
Use mass-enabled quick fixes for custom code adaptation:
• ABAP for Cloud Development language version
• Usage of released objects
Successor-released API in the check result in ABAP test cockpit
Adapt custom code to the usage of released APIs:
• Use successor APIs displayed in the details of analysis results
• Implement custom wrappers for missing released APIs
Check out How to make your custom code cloud ready and upgrade stable
INTERNAL – SAP and Partners Only 673

## PDF page 575
Use ABAP test cockpit to govern a clean core
Set up ABAP test cockpit Copy the variant for ABAP test cockpit
ABAP_CLOUD_DEVELOPMENT_DEFAULT
Remote ABAP test cockpit:
Connect development systems to the central ABAP test cockpit
Configure ABAP test cockpit to run during development tasks and at transport release
Block priority 1 and priority 2 findings for transport
Set up a check variant for ABAP test cockpit
• Copy the variant ABAP_CLOUD_DEVELOPMENT_DEFAULT
• Add the following checks:
− Allowed SAP enhancement technologies *
− Usage of APIs *
− Critical statements
Add checks
− Searches for customer modifications
− SAP Code Vulnerability Analyzer (if licensed accordingly)
Suppress findings in legacy objects that cannot be adopted with ABAP test cockpit
Request exemptions for ABAP test cockpit if SAP internal objects are still needed to
control their usage
INTERNAL – SAP and Partners Only (* New checks available with SAP Note 3565942) 674
