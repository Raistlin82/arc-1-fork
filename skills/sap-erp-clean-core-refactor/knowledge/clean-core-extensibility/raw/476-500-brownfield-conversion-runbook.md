---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 476
page_end: 500
topic: brownfield-conversion-runbook
---

# Clean Core Extensibility - pages 476-500

## PDF page 476
Extension deployment - Additional recommendations
(Extensibility Whitepaper)
The core of operational clean core governance within SAP S/4HANA systems relies on automated checks
using the ABAP test cockpit.
• These checks should be tightly integrated into the transport release process to ensure that checks run automatically
whenever developers release transports.
• When high-priority issues (usually priority 1 or 2) are identified, the transport should be blocked until the violations are
addressed or explicitly exempted through a defined governance process.
However, no enforcement strategy is complete without a structured exemption process.
• While clean core policies should be strictly applied, legitimate exceptions may arise.
• These must be consciously acknowledged and governed to prevent gradual degradation of development standards.
• A formal exemption procedure should be established, with a designated Quality Manager (ideally a senior developer or
architect) responsible for reviewing and either approving or rejecting requests.
• Every exemption request must include a clear justification, a reference to the specific finding being waived, and a list of the
development objects involved.
• All decisions must be recorded within ABAP test cockpit to ensure full traceability and accountability.
• Temporal limits should be defined for each exemption, and broad or generic exemptions at the object or package level
should be avoided.
• Periodic reviews of existing exemptions, typically covering 10–20% of cases, help verify ongoing relevance and support the
continuous refinement of development guidelines.
INTERNAL – SAP and Customers Only 556

## PDF page 477
Use ABAP test cockpit for clean core governance
Set up ABAP test cockpit On-premise: Copy variant
ABAP_CLOUD_DEVELOPMENT_DEFAULT
Remote ABAP test cockpit: Connect DEV systems to the central ABAP test cockpit system
Configure ABAP test cockpit to run during development tasks and at transport release
Block priority 1 and priority 2 findings for transport
Set up ABAP test cockpit check variant
Copy the ABAP test cockpit variant ABAP_CLOUD_DEVELOPMENT_DEFAULT
Add the following checks:
• Allowed SAP enhancement technologies*
• Usage of APIs*
• Code Pal checks for clean ABAP Add checks
• Search for customer modifications
• SAP Code Vulnerability Analyzer (if licensed accordingly)
• Critical statements
Suppress findings in legacy objects that cannot be adopted with ABAP test cockpit baseline
Request exemptions if SAP PUBLIC APIs are still needed to control their usage
INTERNAL – SAP and Customers Only * New checks available with SAP Note 3565942 558
https://community.sap.com/t5/technology-blog-posts-by-sap/abap-test-cockpit-atc-recommendations-for-governance-of-clean-core-abap/ba-p/14186130

## PDF page 478
Day 4 Feedback
Virtual version of the training
Language
Selection
https://surveys-platform.cfapps.us10.hana.ondemand.com/survey/ccea-day-4-virtual-english-2026-07
Which topics covered today were new to you
1.
Free text for comments
2.
• Your feedback is very important for us to improve this new training
• Feedback is anonymous and takes about 5 minutes
Thank you very much!
INTERNAL – SAP and Customers Only 559

## PDF page 479
Q & A

## PDF page 480
Index
Index
Agenda - 5 Days remote
1. Introduction - Clean Core > Extensibility
2. SAP S/4HANA Cloud Private Edition extensibility model overview
• 2.1 SAP S/4HANA Cloud Private Edition - new Clean Core Level concept (Levels A, B, C, D)
Extensibility
• 2.2 Example of Clean Core Levels for the objects of a system conversion
Day 1
Framework
3. Level A - On-stack extensibility
• 3.1 Key User extensibility What are the
extensibility
• 3.2 Classic ABAP x ABAP Cloud
alternatives
4. Level A - Side-by-Side extensibility in SAP BTP
5. Non-released x Released objects
6. How to consume Non-released objects and APIs in ABAP Cloud - Wrappers
Day 2
7. Certification of Partner Solutions following Clean Core
8. Architects transition from Classic ABAP to Level A
Guidelines and
9. Avoid extensions when possible Methodologies
10. Layering of Key User Extensibility and Developer Extensibility
Day 3 How to choose
11. How to define the best extensibility option for a specific scenario and SAP AEM
the best
12. RISE with SAP Methodology, SAP Activate and Cloud ALM alternative
Day 4
13. Clean Core extensibility Governance and Processes
Governance &
14. Transforming the Customer extensibility from ECC to Clean Core Transformation
Day 5 15. SAP Business AI
AI
INTERNAL – SAP and Partners Only 562

## PDF page 481
Clean Core Customers Reference Video
https://www.sap.com/cmp/wlp/rise-into-the-future-webinar-series/index.html#customer-showcases
Nippon Sanson
Cimpress USA
Europe
Brownfield
Greenfield
Upgrade done in 10 weeks
Upgrade done in 3 weeks
563
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 482
Webinar: SAP Cloud ERP Private - What you need to know about SAP BTP as an SAP Partner - Jun.2026
https://partneredge.sap.com/en/library/education/psd/2026/feb/e_oe_te_w_PSD_WEB_00013066.html
INTERNAL – SAP and Partners Only 564

## PDF page 483
Index
Index
Agenda
1. Introduction - Clean Core > Extensibility
2. SAP S/4HANA Cloud Private Edition extensibility model overview
• 2.1 SAP S/4HANA Cloud Private Edition - new Clean Core Level concept (Levels A, B, C, D)
Extensibility
• 2.2 Example of Clean Core Levels for the objects of a system conversion
Framework
3. Level A - On-stack extensibility
What are the • 3.1 Key User extensibility
extensibility
• 3.2 Classic ABAP x ABAP Cloud
alternatives
4. Level A - Side-by-Side extensibility in SAP BTP
5. Non-released x Released objects
6. How to consume Non-released objects and APIs in ABAP Cloud - Wrappers
7. Certification of Partner Solutions following Clean Core
8. Architects transition from Classic ABAP to Level A
Guidelines and
Methodologies 9. Avoid extensions when possible
10. Layering of Key User Extensibility and Developer Extensibility
How to choose
11. How to define the best extensibility option for a specific scenario and SAP AEM
the best
alternative 12. RISE with SAP Methodology, SAP Activate and Cloud ALM
13. Clean Core extensibility Governance and Processes
Governance &
Transformation 14. Transforming the Customer extensibility from ECC to Clean Core
15. SAP Business AI
AI
INTERNAL – SAP and Partners Only 565

## PDF page 484
How do Customers that transition from ECC
to S/4HANA Cloud Private Edition achieve
a clean core?

## PDF page 485
Two ways to achieve a clean core
GET clean
Housekeeping &
monitoring
Measure technical debt, set ambitious but realistic
goals to reduce it, and acknowledge that legacy code
won’t vanish overnight.
1 4
Functional Extension
STAY clean
Governance
request deployment
• Establish continuous governance to avoid any
“unnecessary” new technical debt
2 3
• Avoid extensions when possible, create the best
Extension Extension
architecture possible, implement accordingly, and
architecture implementation
safeguard your deployment to transparently
understand any new technical debt
INTERNAL – SAP and Partners Only 567

## PDF page 486
Greenfield
• Take advantage of a unique opportunity.
• Follow clean core principles right from the beginning.
• Establish strong governance.
Technical Debt
Technical Debt Increase – without Clean Core
18 months
upgrade
project *
1 month
upgrade
Greenfield or new implementation
project * Increased Agility
Keep the core clean
Rapid Innovation
Efficient Operations
SAP ERP SAP S/4HANA Cloud Private Edition
Move to
Central Component
SAP S/4HANA
INTERNAL – SAP and Partners Only * Example of the Customer reference Hitachi 568

## PDF page 487
Brownfield
• Establish clean core principles for every new deployment.
• Plan your journey toward a clean core and follow an iterative step-by-step approach.
• Understand that clean core doesn’t happen overnight.
Custom code 1) 6 months project, focused on conversion 1) Stay Clean: Clean Core for all new extensions
Technical
usage Data and move to the Cloud (without Business
Debt 2) Get Clean: Multiple projects and initiatives to
Collection for 16 transformation, only mandatory changes)
reduce the Technical Debt
months
2) Adoption of Fiori and retirement of SAPGUI
SCMON and ECC to S/4HANA Hyper
Technical Debt reduction projects and initiatives
SUSG conversion project Care
Deletion of
Increased Agility
unused Code
Rapid Innovation
during the
Efficient Operations
conversion
Examples: Elimination of Level D, adoption of Fiori Apps and Query
Browser, implementation of EWM and TM, Situation Handling, Joule agents)
SAP ERP Move to SAP S/4HANA Cloud Private Edition
Central Component SAP S/4HANA
INTERNAL – SAP and Partners Only 570

## PDF page 488
Example of Clean Core adoption
ECC
Technical
Non Clean Core *
Debt
14 months
to upgrade
70% standard
x
30% customization
SAP Cloud ERP Private
Clean Core *
3 months to
upgrade
85% standard
x
15% customization
SAP ERP Move to SAP S/4HANA Cloud Private Edition
Central Component SAP S/4HANA
INTERNAL – SAP and Partners Only 571
* Reference Customer that participated in a SAP Customer Conversations event on July/2025

## PDF page 489
References for this Chapter
Guide for moving to SAP
Guide for the RISE with Guide for Clean Core
White paper on Clean Guide for ABAP-based S/4HANA Cloud Private
SAP Methodology, that is Measurement Framework
Core extensibility for e x t e n sibility for Clean Edition in a practical,
embedded in SAP - Governance and
SAP S/4HANA Cloud Core condensed, down-to-earth
Activate Maturity
guide
INTERNAL – SAP and Partners Only 573

## PDF page 490
Moving to SAP Cloud ERP Private: Practical migration guidance (ECS guidance)
https://partneredge.sap.com/en/library/education/products/entManage/s4h-cld/private/ep_migration_insights_project_accelerators.html
INTERNAL – SAP and Partners Only 574

## PDF page 491
SAP Cloud ERP Private Partner Community (ECS guidance)
https://community.sap.com/t5/sap-cloud-erp-private/gh-p/erpprivate
INTERNAL – SAP and Partners Only 575

## PDF page 492
Introducing seven migration and modernization assistants
System Analysis Data Management
Assistant Assistant
7
Custom Code Configuration Test Management Migration &
Assistant Assistant Assistant
Modernization
Assistants
Roll-out Project
Assistant Management Assistant
576

## PDF page 493
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
577

## PDF page 494
How to Get and Stay Clean?
Example of tasks before and during the conversion project

## PDF page 495
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
workshops (SAP KPIs, Process and Guiding principles Extensibility
CAL instance for tests
Innovations, Apps, UX, Governance and
Extensibility Definition of the Extensibility Architecture
Analytics, AI) process for new
Governance, Evaluation of the and Development Guidelines
extensions
technologies,
KPIs, Processes Strategic Extensibility
prototyping, POCs Extensibility Practices for System Setup *
Decisions
RISE with SAP Deep dive learning and certification of
Customer Innovation
Methodology and Transformation Architects, Analytics, UX and Development
users with Hands on tests
Strategy and Clean Core runbook
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
Legacy Custom Custom code usage Data Define code to be Sandbox Conversion
Collection for 18 months deleted
code deletion
Delete unused code (during the conversion runs)
(SCMON and SUSG)
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
List classical custom fields “Custom fields enablement”
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions
Core extensions extensions
Design the UX experience Implement SAP Fiori with minimal Adopt
disruption approach and retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
SAPGUI the UI and
Fiori
Evaluate standard S/4HANA analytical drive the
Enable the End Users in SAP Fiori
Analytics Apps and Query Browser to replace users
classical reports Train the users in mandatory towards
Automation
S/4HANA Fiori Apps the
Map the CDS views category Query per
Joule / AI analytical
LOB (to be used in Query Browser) Train selected Key users
Apps
(multipliers) in Analytical apps and
Query Browser
INTERNAL – SAP and Partners Only * Extensibility Practices for System Setup 580
▪ EXT-SYS-01 - Automated Code Checks, EXT-SYS-02 - Exemption Process, EXT-SYS-03 - ABAP Cloud Software Component, EXT-SYS-04 - Usage Data Collection, EXT-SYS-05 - SAP BTP Account

## PDF page 496
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
GGeenneerraall lleeaarrnniinngg pprrooggrraamm Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
General learning program
workshops (SAP KPIs, Process Extensibility
CCAALL iinnssttaannccee ffoorr tteessttss • Autonomous Enterprise
Innovations, Apps, UX, Governance and
Extensibility Analytics, A•I) RISE wDeitfhin iStioAnP o Mf theeth Eoxdteonlsoigbiyli tay nAdrc Chilteeactnu rCe orepr ocess for new
Governance, EEvvaalluuaattiioonn ooff tthhee and Development Guidelines
• SAP Cloud ERP extensions
tteecchhnnoollooggiieess,,
KPIs, Processes Strategic Extensibility * Extensibility Practices for System Setup
pprroottoottyyppiinngg,, PPOOCCss Decisions • SAP BDDCee –p Bdiuves ilneaersnsin Dg aantad cCelrotiufidcation of ▪ EXT-SYS-01 - Automated Code Checks
Architects, Analytics, UX and Development ▪ EXT-SYS-02 - Exemption Process
RISE with SAP CCuussttoommeerr IInnnnoovvaattiioonn • SAP Busines u s s e A r I s ( w S it / h 4 H Ha A n N ds A o e n m te b s e ts dded AI, Joule, Machine Learni ▪ ng EX , T G -SY e S n -03 A - A I, B A … P C ) loud Software Component
Methodology aanndd TTrraannssffoorrmmaattiioonn • Clean Core Extensibility overview (Level concept, wrappers, Clas▪siEcX Tx-S YCSl-e04a - nUs aCgeo Draeta, C …olle)ction
▪ EXT-SYS-05 - SAP BTP Account
Extensibility Practices for System Setup *
SSttrraatteeggyy aanndd Clean Core runbo•okS AP Extensibility Framework overview (ABAP Cloud, SAP BTP, SAP AI,…)
rrooaaddmmaapp in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
Legacy Custom Custom code usage Data Define code toC bAeL insStaanndcbeo xf oCro ntevesrtssion
Collection for 18 months deleted
code deletion • Deployment of a S/4HANAD eFleutlely u nAucsteivda ctoedde A (dpuprilniagn tchee cino nCvelorsuidon A rpunpsli)ance Library
(SCMON and SUSG)
(https://cal.sap.com/)
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
Evaluation oLf itsht cel atsescichanl coulsotgomie sfie, ltdessts, prot“oCtuysptionmg f iaelndds ePnOabClesm ienn ta” Sandbox system
New Clean Core • Hands on practice and tDeesstisgn of new Clean Implementation of new Clean Core
Extensions
• Prototypes and POCs of tChoer en eexwte ntesicohnnsologies extensions
Design the UX experience Implement SAP Fiori with minimal Adopt
Customer Innovation and Transformation Strdaisterugpyti oann adp prrooaadchm aanpd retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
SAPGUI the UI and
Fiori • Strategic Business and IT objectives
Evaluate standard S/4HANA analytical drive the
• Innovation and Transformation strategy Enable End User in SAP Fiori
Analytics Apps and Query Browser to replace users
• Roadmap of trancsliatisosnic atol r SepAoPrts Cloud ERP PrivaTtreai na tnhde ausdeorsp tiino mn aonfd Iantonroyv ations towards
Automation
• E.g. fast system conversion with Fiori adoptSio/4nH AaNnAd Freiotriir eAmppesnt of SAPGUI, followed bthye
Map the CDS views category Query per
Joule / AI analytical
prLoOjeBc (ttso tboe ruesdeudc ine Qthueer tye Bcrhonwiscearl) debt, impTleramine snetl eEcWtedM K aeyn uds TerMs , implement ……….
Apps
• Preliminary Analytics architecture (multipliers) in Analytical apps and
Query Browser
• Preliminary list of Extensibility tools and approaches that will be adopted
INTERNAL – SAP and Partners Only 581
SAP Activate - Discover - Strategic Planning
• Create an Innovation Strategy and a High-Level Road Map
• Define the Analytics Architecture
• Establish a Clean Process Framework
SAP Activate - Discover - Application Value and Scoping
• Identify the value of SAP S/4HANA on Existing Business Processes
• Run the Establish the Business Value of User Experience Workshop

## PDF page 497
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program EEnnvviissiioonn tthhee ffuuttuurree Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
Envision the future workshops
Evaluation of the
wwoorrkksshhooppss ((SSAAPP KPIs, Process Extensibility
CAteLc ihnnsotalongciee fso, r tests • Run the UX Planning and Guiding Principals workshop
IInnnnoovvaattiioonnss,, AAppppss,, UUXX,, Governance and
Extensibility prototyping, POCs AAnnaallyyttiiccss,, AAII)) Definition• oRf tuhne Ethxtee nSsciboilpitey Aarncdhi tEecntvuirsei onp trhoece Fssu tfuorr en ewwo rkshops
Governance, Evaluation of the and Development Guidelines
extensions
technologies,
KPIs, Processes SSttrraatteeggiicc EExxtteennssiibbiilliittyy * Extensibility Practices for System Setup
prototyping, POCs DDeecciissiioonnss Deep dive learning and certification of ▪ EXT-SYS-01 - Automated Code Checks
ArchitectsS, tArnaatleygticics, EUxXt aennds Dibevileiltoyp Dmeencti sions ▪ EXT-SYS-02 - Exemption Process
RISE with SAP Customer Innovation u•sersF wioitrhi Haadnodpst ioonn t esstrtsategy (Ideally 100% Fiori after t ▪ he EX c T- o SY n S v -0 e 3 r - s AB io AP n C , lo u ud s S in of g tw a W re C e o b mp g o u ne i nt
Methodology and Transformation ▪ EXT-SYS-04 - Usage Data Collection
▪ EXT-SYS-05 - SAP BTP Account
for trEaxdteitniosnibailli tSy APrPacGtiUceI st rfaorn Ssyasctetimon Sse twuph e* n needed)
Strategy and Clean Core runbook
roadmap in CALM Conduct the r • unb F oo in k a a l c A ti n vi a ti l e y s t , i c p s e r A fo r r c m h i t t h e e c C tu le r a e n ( C E o m re b Q e u d a d li e ty d G A a n te a s l y a t n ic d s E , x S te A ns C ib , i B lit D y C Ma , t … uri ) ty Assessment
• BTP services scope
Legacy Custom Custom code usage Data Define code to be Sandbox Conversion
• For side-by-side extensibility:
Collection for 18 months deleted
code deletion
• SADPel eBteu iuldn uAspepds c *o d(Le o(dwu rciongd eth) ex cPornov ecrosdioen (rAuBnsA)P Cloud or CAP)
(SCMON and SUSG)
List the im•pactAedB AcuPs tColmo ud x CAP
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HA• NA SAAdaPp Btautiioldn )Workzone x Fiori launchpad
code adaptation
• SAP Event Management
List classical custom fields “Custom fields enablement”
• Roadmap of the adoption of Situation Handling, Event Management,
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions Embedded AI scenarios, Joule, Gen AI extensions and custom agents, …
Core extensions extensions
• Roadmap of the adoption of S/4HANA functional innovations that may
Design the UX experience Implement SAP Fiori with minimal Adopt
replace extensions or address business requirements
disruption approach and retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
Fiori Clean Core runbook SAPGUI the UI and
in CALM ConduEcvt atlhuea treu nsbtaonodka ardc tSiv/i4tHieAsN, pAe rafnoarmlyt tichael Clean Core Quality Gates and Extensibility Maturity Asses d s r m iv e e n t t he
Enable End User in SAP Fiori
Analytics Apps and Query Browser to replace users
classical reports Train the users in mandatory towards
Automation Clean Core runbook in CALM
S/4HANA Fiori Apps the
Map the CDS views category Query per
Joule / AI • Create the Clean Core runbook in CALM analytical
LOB (to be used in Query Browser) Train selected Key users
• Conduct and track the RISE with SAP Methodology activities in CALM Apps
(multipliers) in Analytical apps and
* SAP Build Apps Deprecation and The Path Forward • Perform the Clean Core Quality GateQsu ery Browser
• Perform the Extensibility Maturity Assessment
INTERNAL – SAP and Partners Only 582

## PDF page 498
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future DDeeffiinniittiioonn ooff tthhee EExxtteennssiibbiilliittyy GGoovveerrnnaannccee,, Implement the Extensibility Governance, monitor of KPIs
workshops (SAP KPIs, ProcesKsP aIsn, dP rGouciedsinsg principles Extensibility
CAL instance for tests Deep dive learning and certification of
Innovations, Apps, UX, Governance and
Extensibility Analytics, AI) Definition of the Extensibility Architecture proceAsrsc fhori tneecwt s, Analytics, UX and Development
Governance, Evaluation of the and Development Guidelines
exutesnesirosn swith Hands on tests
technologies,
KPIs, Processes Strategic Extensibility
prototyping, POCs Extensibility P•raMctiacensd faotro Sryys etenma bSleetumpe *nt curriculum for the
Decisions
RISE with SAP modern extension technologies for
Customer Innovation Deep dive learning and certification of
Methodology and Transformation Architects, Analytics, UX and Development architects and developers
Strategy and Clean Core runbook users with Hands on tests
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
Definition of the Extensibility Governance, KPIs, Process and Guiding principles
Legacy Custom Custom code usage Data Define code to be Sandbox Conversion
• Governance, Process and standards
Collection for 18 months deleted
code deletion
• Extensibility Governance process (SSB, KPIs trackingD) elete unused code (during the conversion runs)
(SCMON and SUSG)
• Extensibility E2E process, from extensioLni sftu tnhcet iimonpaacl treedq cuuesstot mto deployment
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
• Repository, tools and templates
code adaptation
• Guiding principles: List classical custom fields “Custom fields enablement”
New Clean Core • Fit to Standard and Clean Core
Design of new Clean Implementation of new Clean Core
Extensions
• Zero-modification policy Core extensions extensions
• Use of Released objects and when not available, wrap of Level B objects with design for reuse
Design the UX experience Implement SAP Fiori with minimal Adopt
• Fiori as the standard UI and retirement of SAPGUI
disruption approach and retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
• Evaluation of the use of SAP AI technologies in all extension requests SAPGUI the UI and
Fiori
• Use of SAP AI for architects and devEevlaolupaetres s ptarnoddaurdc tSiv/4itHyA (NJAo uanlea lfyotirc Cal onsultants, Joule for Developers and other AI toodlsr)ive the
Enable End User in SAP Fiori
Analytics Apps and Query Browser to replace users
• Security and compliance centric design
classical reports Train the users in mandatory towards
Automation • Architects and developers mandatory enablement curriculum for the modern extension technologies
S/4HANA Fiori Apps the
Map the CDS views category Query per
Joule / AI analytical
LOB (to be used in Query Browser) Train selected Key users
Apps
(multipliers) in Analytical apps and
Query Browser
INTERNAL – SAP and Partners Only * Extensibility Practices for System Setup 583
▪ EXT-SYS-01 - Automated Code Checks, EXT-SYS-02 - Exemption Process, EXT-SYS-03 - ABAP Cloud Software Component, EXT-SYS-04 - Usage Data Collection, EXT-SYS-05 - SAP BTP Account

## PDF page 499
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, IImmpplleemmeenntt tthhee EExxtteennssiibbiilliittyy GGoovveerrnnaannccee,, mmoonniittoorr ooff KKPPIIss
workshops (SAP KPIs, Process EExxtteennssiibbiilliittyy
CAL instance for tests
Innovations, Apps, UX, GGoovveerrnnaannccee aanndd Implement and run to
Extensibility DDeeffiinniittiioonn ooff tthhee EExxtteennssiibbiilliittyy AArrcchhiitteeccttuurree
Analytics, AI) pprroocceessss ffoorr nneeww
Governance, Evaluation of the aanndd DDeevveellooppmmeenntt GGuuiiddeelliinneess Stay Clean
eexxtteennssiioonnss
technologies,
KPIs, Processes Strategic Extensibility * Extensibility Practices for System Setup
Definpritoitoonty poinf gt,h PeO ECsxtensibiliDtyec Aisriocnhsi tecture and Development Guidelines ▪ EXT-SYS-01 - Automated Code Checks
▪ EXT-SYS-02 - Exemption Process
RISE with SAP • C G u u s i t d o e m l e in r e In s n o fo v r a t T io e n c hnical Architects (How to define the best extensibility approach) ▪ EXT-SYS-03 - ABAP Cloud Software Component
Methodology and• TranDsefofirnmitaitoionn o f the technologies and tools that will be adopted by the Customer ▪ EXT-SYS-04 - Usage Data Collection
▪ EXT-SYS-05 - SAP BTP Account
• Strat U eg s y e a o n f d an exCtleenans iCoonr ea rrucnhbitoeockt ure guidance methodology (e.g. AEM)
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
• Classification of the technology building blocks (Level A, B, C, D, Recommended, allowed, not recommended, not allowed,
Legacy Custom Custom code nuosat gine Duastea) Define code to be Sandbox Conversion
code deletion Collectio•n forF 1o8r m eoancthhs E xtensiond tealestke d(e.g. Create custom UI), assignment of the Technical Extension building blocks (e.g. Fiori, Mobile,
Delete unused code (during the conversion runs)
(SCMON and SUSG)
Build Apps *, …)
List the impacted custom
Legacy Custom • Criteria to define the best Technical Extension building block for the Ceuxstteonms icoond et aasdkap tation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
• On stack x Side-by-Side
List classical custom fields “Custom fields enablement”
• Key user x Developer Extensibility (for on stack extensibility)
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions • Low code x Pro code tools
Core extensions extensions
• ABAP Cloud x CAP (for side-by-side pro code extensibility)
• Guidance for the use of released APIs anDde esixgcne tphtei oUnX pexropcereiesnsc feor utilizingI mclpalesmsiecn At SPAIPs Foiro rSi AwPith i nmtienrimnaall objects Adopt
disruption approach and retire Fiori as
• Governance and documentation forE vaarlcuhaittee mctaunrdea tdoeryc iSs/i4oHnAsN aAn Fdio erix Acpeppstion approvals
SAPGUI the UI and
Fiori • Guidelines for Developers (How to implement / lifecycle management)
Evaluate standard S/4HANA analytical drive the
Enable End User in SAP Fiori
Analytics • Guidance for the use of Level A modeArpnp sd eanvde lQoupemrye Bnrto twescehrn too lroegpliaecse and tools users
• For each technology: development guidelinesc,l adsoscicuaml reepnotarttsion templates, deTrvaeinlo tphem uesnetr ss itna nmdaandrdasto (rye .g. naming conventtoiowna,r ds
Automation
S/4HANA Fiori Apps the
Software components and packageMs)a,p t othoel sCDS views category Query per
Joule / AI analytical
• Ensures the use of released APIs LOB (to be used in Query Browser) Train selected Key users
Apps
(multipliers) in Analytical apps and
• Defines processes for exceptions and use of Wrappers
Query Browser
• Incorporates automated code checks
INTERNAL – SAP and Partners Only * Ex•tensibDilioty cPruacmticeesn ftosr S cysotedme S erteupview and exemption processes for unreleased SAP objects * SAP Build Apps Deprecation and The Path F 5 o 8 rw 4 ard
▪ EXT-SYS-01 - Automated Code Checks, EXT-SYS-02 - Exemption Process, EXT-SYS-03 - ABAP Cloud Software Component, EXT-SYS-04 - Usage Data Collection, EXT-SYS-05 - SAP BTP Account

## PDF page 500
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
workshops (SAP KPIs, Process Extensibility
CAL instance for tests
Innovations, Apps, UX, Governance and
Extensibility Definition of the Extensibility Architecture
Analytics, AI) process for new
Governance, Evaluation of the and Development Guidelines
extensions
technologies,
KPIs, Processes Strategic Extensibility
prototyping, POCs Extensibility Practices for System Setup *
Decisions
RISE with SAP Deep dive learning and certification of
Customer Innovation
Methodology and Transformation Architects, Analytics, UX and Development
users with Hands on tests
Strategy and Clean Core runbook
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
Legacy Custom CCuussttoomm ccooddee uussaaggee DDaattaa DDeeffiinnee ccooddee ttoo bbee SSaannddbbooxx CCoonnvveerrssiioonn
CCoolllleeccttiioonn ffoorr 1188 mmoonntthhss ddeelleetteedd
code deletion
DDeelleettee uunnuusseedd ccooddee ((dduurriinngg tthhee ccoonnvveerrssiioonn rruunnss))
((SSCCMMOONN aanndd SSUUSSGG))
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
Custom code usage Data Collection for Define code to be deleted Delete unused code (during the
List classical custom fields “Custom fields enablement”
18 months (SCMON and SUSG) • Compare the list of used objects with all conversion runs)
New Clean Core
Design of new Clean Implementation of new Clean Core
Ex•tensLieovnesrage data from ABAP Call Monitor custom code objects stored in tables • The deletion of unused code is now
Core extensions extensions
(SCMON) to gain a detailed such as TADIR technically integrated into the conversion
Design the UX experience Implement SAP Fiori with minimal Adopt
understanding of your unused code • This comparison identifies unused process and makes execution much
disruption approach and retire Fiori as
share objectEsv afolura pteo mteanntdiaatl ocrlye Sa/n4HuApN aAn Fdi ori Apps easier
SAPGUI the UI and
• FioTrhi en aggregate SCMON data using optimizEavtaioluna,t ee sntsaundrianrgd Sa/ 4leHaAnN Aa nanda lytical • You can keep a backup of the deleted drive the
Enable End User in SAP Fiori
transaction SUSG efficientA spypsst eanmd aQrucehryit eBcrotuwrseer to replace objects using abapGit in order to store users
Analytics classical reports Train the users in mandatory towards
• It’s recommended to run SCMON for the objects of the deletion transport
S/4HANA Fiori Apps the
more than 12 months to identify year end Map the CDS views category Query per request of the SAP Fiori App Custom
Joule / AI analytical
LOB (to be used in Query Browser) Train selected Key users
processes Code Migration in a Git Repository Apps
(multipliers) in Analytical apps and
Query Browser
INTERNAL – SAP and Partners Only 585
