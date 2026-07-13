---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 451
page_end: 475
topic: governance-system-setup-deployment
---

# Clean Core Extensibility - pages 451-475

## PDF page 451
System View – Customer Object Assessment
• The Customer Object Assessment provides insights about the distribution of customer objects across the
clean core extensibility levels
SAP objects/development Objects/development patterns Rely on SAP objects/development
Solely built on released SAP APIs
patterns officially classified as neither released (Level A) nor patterns explicitly marked as not
and extension points
classic APIs nominated as mature (Level B) recommended

## PDF page 452
System View – Customer Object Assessment
• The Customer Object Assessment provides insights about the distribution of customer objects across the
clean core extensibility levels
• Level A: Based on Custom Code Analytics
• Levels B, C and D: Based on the latest ATC check results you imported
• Allows to quickly identify areas needing immediate attention and improvement
• Enables progress tracking and supports decision-making
SAP objects/development Objects/development patterns Rely on SAP objects/development
Solely built on released SAP APIs
patterns officially classified as neither released (Level A) nor patterns explicitly marked as not
and extension points
classic APIs nominated as mature (Level B) recommended

## PDF page 453
Demo - RISE with SAP Methodology Dashboard in Cloud ALM (Extensibility)
INTERNAL – SAP and Partners Only 532

## PDF page 454
Exercises - Cloud ALM - RISE with SAP Methodology Dashboard
Cloud ALM - RISE with SAP Methodology Dashboard
13-2.1 Access the RISE with SAP Methodology 13-2.2 Evaluate the Extensibility KPIs
Dashboard in Cloud ALM and check the status of
Data Collection Tools for System ID = CAA Click on the Tab “Extensibility”
Access the SAP Cloud ALM - public demo tenant and go Check the KPI Overview
to “Tenant access”. Take note of the password for the
user Agatha (Cross Capability User). Click on “SAP Cloud
ALM Launchpad” to open the logon screen and Logon
Click on the “RISE with SAP Methodology” Space > Click
Check the Clean Core Share (A, B, C, D)
on “System View” > Select the Elegible System = CAA
Click on the Overview drop down arrow and select “Data
Collection Tools”
Check the status of the “Data Collection Tools” and for
ABAP Test Cockpit, click on the “…” in the upper right of
the Tile > Select view imports
INTERNAL – SAP and Partners Only 533

## PDF page 455
SAP Discovery Center
A game changer for measuring Clean Core extensibility
Open source: Project Kernseife
Measure and understand clean core with
the Kernseife score
Track your clean core transformation
progress
Identify technical debt and focus on the
most important ATC findings
Create custom classifications to make
clean core a reality
Align your Kernseife score with your
strategic goals
Have governance and measurability
based on the same data source
Scan this code or
click here to learn more
INTERNAL – SAP and Partners Only 534

## PDF page 456
Essential SAP Notes and further Resources
SAP Notes:
- 3627152 - SAP Note Analyzer Files for ATC Checks Related to Clean Core
- Includes: 3565942 - ATC Checks "Usage of APIs" and "Allowed Enhancement Technologies“
- 2781766 - Enabling ATC check result export for SAP Readiness Check 2.0
- 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility
Blog Posts:
- ABAP test cockpit (ATC) recommendations for govern... - SAP Community
- Remote Code Analysis in ATC - One central check sy... - SAP Community
- New Clean Core Extensibility KPIs arrive on the RI... - SAP Community
Further documentation:
- Custom Code Migration Guide for SAP S/4HANA 2025
- Extensibility | SAP Help Portal
- Clean Core Extensibility Whitepaper
INTERNAL – SAP and Partners Only 536

## PDF page 457
New ATC check based on usage guidelines for SAP APIs
New ABAP Test Cockpit check
(SAP Note 3565942) Example: Check a simple ABAP report with ALV
ABAP_CLOUD_READINESS checks: 14 errors
Checks usages of SAP standard objects in custom code like interfaces, classes,
function modules, CDS views, behavior definitions, DDIC database tables and DDIC
database views, programs or their subroutines
Does not check usages of SAP DDIC object types like data elements, domains,
table types and structures
Check behaviour
No ATC finding - Level A
Usage of released API
Priority 3 (Info) - Level B
Usage of classic API
Priority 2 (Warning) - Level C
Usage of internal APIs (not classified API)
New ATC check "Usage of APIs" and "Allowed Enhancement
SQL read access to SAP database table Technologies“: 1 error, 1 Warning, 3 infos
SUBMIT statement on programs
Priority 1 (Error) - Level D
Usage of “no API” (with successor if available)
SQL write access to SAP database table
PERFORM statements on external subroutines
INTERNAL – SAP and Partners Only 537
https://community.sap.com/t5/technology-blog-posts-by-sap/abap-test-cockpit-atc-recommendations-for-governance-of-clean-core-abap/ba-p/14186130

## PDF page 458
Blog: Activation of RISE with SAP Methodology Dashboard on Cloud ALM
https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/clean-core-part-1-activation-of-rise-with-sap-methodology-dashboard-on/ba-p/14328522
INTERNAL – SAP and Partners Only 538

## PDF page 459
Setting up ATC Checks for Clean Core and Importing ATC Results to RISE with SAP
Methodology Dashboard - How to Guide, see the Appendix
INTERNAL – SAP and Partners Only 539

## PDF page 460
Extension end-to-end process (from request to deployment)
INTERNAL – SAP and Partners Only 540

## PDF page 461
Extension end-to-end process (from request to deployment)
White paper on Clean
Core extensibility for
SAP S/4HANA Cloud
Pgs. 32 - 41
INTERNAL – SAP and Partners Only 541

## PDF page 462
Extension end-to-end process (from request to deployment)
1. Functional request
• Ensure the requirement fits the
right SAP process context (Link to
Process Dimension)
• Fit-to-Standard Workshop: gather
requirements in the right business
context and link them to
processes using SAP Cloud ALM.
• Is the Extension Valuable? Check
if it solves a real gap.
• Business Case: show clear
benefits, such as cost savings or
automation.
• Pace Layering: identify if the
process is standard,
differentiating, or innovative.
• Make or Buy: Decide between SAP
standard, partner solution, or
custom build.
INTERNAL – SAP and Partners Only 542

## PDF page 463
Functional Request
How to handle a Business Requirement?
INTERNAL – SAP and Customers Only 543

## PDF page 464
SSB approval process for extensions that are not Clean Core compliant
Project Work Stream Team Solution Standardization Board Steering Committee
(e.g., H2R, O2C, …)
Assess request, review
1. Solution design requires extension for compliance,
that doesn’t use clean core evaluate risk, formulate
compliant extensibility technology? decision
Prepare and
“Yes” to
2. Solution design requires integration submit request
at least
using non-released API? ONE for review by
question SSB. Use the
3. The solution design has process
KDD template
variations, prevents implementation and create a Document decision in
of consistent standard process or new entry in SSB deviation tracker & Decision on escalated
standard data across the SSB deviation communicate to requests
organization? tracker stakeholders
4. The solution design impacts the
expected value negatively?
Review clean core
Regular report
“No” to all Keep record of all to the steering KPIs, SSB decisions,
questions decisions / report on committee and escalated
Approved standard compliance requests in the regular
Implement and
by SSB
metrics (monthly) Steering committee
document the design in
cadence
ALM tool
Rejected
Escalate declined by SSB Collect the clean core
request to Steerco measurement KPIs
Work stream lead escalates to
steering
INTERNAL – SAP and Customers Only 544

## PDF page 465
Optional Exercises - SAP Activate
SAP Activate
13-3.1 Solution Standardization Board 12-3.2 SSB Design Review Process
accelerators
To define the SSB Design Review Process, you
To define the SSB Design Review Process of
need to find the slide below within the
your project, you need to find the Solution
accelerators of the Task “Establish Solution
Standardization Board accelerators in the SAP
Standardization Board”
Activate
Evaluate the accelerators of the previous
Since the project is a System Conversion, access
exercise and find which of them has the SSB
the SAP Activate for SAP Cloud ERP Private -
Design Review Process
System Conversion > Click on the tab “Content”
> Use the filters: Phase = Prepare and Tags =
Clean Core Success Plan > Open “Project
Initiation and Governance > Click on “Establish
Solution Standardization Board”
INTERNAL – SAP and Customers Only 545

## PDF page 466
Extension end-to-end process (from request to deployment)
2. Extension architecture
• Identify and design the optimal
extension architecture. Apply the
SAP Application Extension
Methodology to define use cases,
map extension tasks to technical
building blocks, and choose the
best-fit technologies.
• Acknowledge, approve, and
document decisions. Use guidance
assets and templates to make
informed, “Clean Core”-compliant
choices.
INTERNAL – SAP and Partners Only 546

## PDF page 467
SAP Application Extension Methodology
The SAP Application
Extension Methodology
helps you to define,
document and execute
an enterprise extension
strategy
for your organization.
1. Assess Extension 2. Assess Extension 3. Define Extension
Use Case Technology Target Solution
Process Flow Extension Target Solution Diagram
Agnostic Technologies
+
Possible Building Blocks
and respective Level
Extension Target Solution Reasoning
INTERNAL – SAP and Partners Only 547

## PDF page 468
Extension Technology Mapping
Link
The Customer can include a column with the usage guidelines for each Building Block:
Recommended, allowed, not recommended, not allowed, not in use
Three-Tier Architecture Extension Style Extension Task Extension Domain On-Stack Extension Domain Clean Core Level Technical Extension Building Block Help Portal Documentation
On-stack Key-User Extensibility A SAPUI5 Flexibility: Key-User Adaptation https://help.sap.com/docs/UI5_FLEXIBILITY/430e2c1a4ff241bc8162df4bSf51e0c730o/328ap550e137344514ae085b924180d078.html
On-stack A SAPUI5 Flexibility: Developer Adaptation https://help.sap.com/docs/UI5_FLEXIBILITY/430e2c1a4ff241bc8162df4bf51e0730/a3e9d764dc8841468f73fd7cabc07cec.html?version=Cloud
On-stack A SAP Screen Personas (for Classic Dynpro, WebDynpro, Classic dynpros rendered in Whetbtp)s://help.sap.com/docs/SAP_SCREEN_PERSONAS?locale=en-US
Adapt standard UI: add/hide/create/re-
User Interface Extension
name/re-arrange field/label/headlines
On-stack Classic Extensibility B Dynpro: Screen Enhancements (BAdI) https://help.sap.com/docs/SAP_NETWEAVER_750/46a2cfc13d25463b8•b9a3dT2a3ice3bar0ds9/c:1133442d692af04e10000000a1550b0.html?locale=en-US
On-stack Classic Extensibility D Dynpro: Modification https://help.sap.com/docs/ABAP_PLATFORM_NEW/9d31c01d526747e898a6073fba44674f/e9635fa6e01e11d195490000e82de14a.html?locale=en-US
On-stack Classic Extensibility B WebDynpro ABAP: Screen Enhancements (BAdI) https://help.sap.com/docs/SAP_NETWEAVER_750/46a2cfc13d25463b8b9a3d2a3c3ba0d9/c1133442d692af04e10000000a1550b0.html?locale=en-US
On-stack Classic Extensibility D WebDynpro ABAP: Modification https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/e9/635fa6e01e11d19549▪0000Pe82rdee14sa/feramnesetta.htmtion
Side-by-Side, On-stack A SAP Fiori Elements (supported floorplans) https://experience.sap.com/fiori-design-web/smart-templates/#supported-floorplans
Side-by-Side, On-stack A SAPUI5 https://help.sap.com/viewer/product/SAPUI5/External/en-US ▪ Application
Side-by-Side A UI5 Web Components https://help.sap.com/docs/SAPUI5?version=External#discover_task-ui5-web-components
Create custom UI Side-by-Side A SAP Mobile Services https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docsD-ena/gutidaes/index.html
▪
Side-by-Side A SAP Build Apps https://help.sap.com/docs/BUILD_APPS
On-stack Classic Extensibility B Dynpro https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f68e489816e04•3f1ad6d91 dE69a6x84t29e31/n4a4s3fa2i8o5bcn52b aSee10t0y000l0e0a4s21937.html?locale=en-US
New User Interface On-stack Classic Extensibility B WebDynpro ABAP https://help.sap.com/saphelp_snc700_ehp01/helpdata/en/77/3545415ea6f523e10000000a155106/frameset.htm
Side-by-Side A SAP Build Work Zone, standard edition
Presentation Tier Side-by-Side A SAP Build Work Zone, advanced edition https://help.sap.com/viewer/product/WZ/Cloud/en-US • 23 Extension Tasks
Side-by-Side A SAP Task Center https://help.sap.com/viewer/product/TASK_CENTER/Cloud/en-US
Create central entry point
Side-by-Side A SAP Start https://help.sap.com/docs/start • Domains:
Side-by-Side A SAP Mobile Start https://help.sap.com/docs/mobile-start?locale=en-US
On-stack A SAP Fiori Launchpad https://help.sap.com/docs/SAP_FIORI_LAUNCHPAD?locale=en-US
Adapt custom form templates based On-stack Key-User Extensibility A Maintain Form Templates (Output control framework) https://help.sap.com/docs/ABAP_PLATFORM_NEW/30eef4341efd4a2c86f2f98▪f187eOccbn3/d-a4S88ft76a07c84k47b 0(bK427e922y26 cUfcf9sb1.ehtmrl? laocanle=den -US
on standard process On-stack Classic Extensibility B Maintain Form Template (NAST based framework)
Side-by-Side A SAP Forms Service by Adobe (via REST API) https://help.sap.com/docs/forms-service-by-adobe/sap-forms-service-cf/sap-forms-sDerviece-vbye-adloobe?plocealer= een-UxS httteps:n//apsi.saipb.coiml/ipatcyka)ge /SAPFormsServicebyAdobe/overview
Form
On-stack Developer Extensibility A RAP Data Services for Print Forms (via SAP Interactive Forms by Adobe (IFbA)) https://help.sap.com/docs/btp/sap-business-technology-platform/rap-data-services-for-print-forms?locale=en-US
Create custom form
On-stack Classic Extensibility B Custom Print Program with custom form (via SAPScript & SAP Smart Forms) Side-by-Side
On-stack Classic Extensibility A/B Custom Print Program with custom form (via SAP Interactive Forms by Adobe (IFbA)) ▪
Adapt e-mail template based on On-stack Key-User Extensibility A Maintain E-Mail Template (Output control framework) https://help.sap.com/docs/ABAP_PLATFORM_NEW/b5670aaaa2364a29935f40b16499972d/578952e8d39e410da77947037534f875.html?locale=en-US&version=latest
• 110 Technical Extension
standard process On-stack Classic Extensibility B Adapt E-Mail Template (NAST based framework)
E-Mail Side-by-Side A Create E-Mail with Reuse-components of SAP Cloud SDK https://sap.github.io/cloud-sdk/docs/js/features/mail-client
Create custom e-mail Side-by-Side A ABAP Environment: Create E-Mail with Reuse-Components of ABAP Cloud https://help.sap.com/docs/btp/sap-business-technology-platform/integration-aBnd-cuonniecltidvity-isnendging- mBails-lusoing-csmtkp s
On-stack Developer Extensibility A Create E-Mail with Reuse-Components of ABAP Cloud
On-stack Key-User Extensibility A Custom Fields App
Add custom field to UI service
On-stack Classic Extensibility B Dynpro: Screen Enhancements (BAdI) (add field for Dynpro UI)
On-stack Key-User Extensibility A Custom Fields App https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/57909455bf7c4fdd8bcf48d76c1eae33.html?locale=en-US
Add custom field to API
On-stack Developer Extensibility A Extend CDS view (C0 released) as basis of remote API with new field
On-stack Key-User Extensibility A Custom Logic App (BAdIs)
Adapt standard business process with
On-stack Developer Extensibility A ABAP BAdIs (released for use in cloud development) https://api.sap.com/products/SAPS4HANACloud/developerextensibility/badi
custom logic (e.g. pre-fill/validate On-stack Classic Extensibility B ABAP BAdIs (SE18/SE19) https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/ee/6f3b42ea85b26Rbe10e0000f00ea15r510e6/franmesect.htme links:
field, within LUW - Logical Unit of
On-stack Classic Extensibility B/C User Exits (SMOD / CMOD, Customer Exits)
Work)
On-stack Classic Extensibility D Modification
Side-by-Side A CAP in SAP BTP Cloud Foundry Environment https://help.sap.com/products/BTP/65de2977205c403bbc107264b8ecc•f4b/9cH7092ec7bl7pae4 dP49bco8aer35tfdad0el0 bD18.hotml?cverusionm=Cloued ntation
Side-by-Side A ABAP Cloud in SAP BTP ABAP Environment https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/11d62652aa2b4600a0fa136de0789648.html?version=Cloud
Side-by-Side A CAP in SAP BTP Kyma (Container) https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/468c2f3c3ca24c2c8497ef9f83154c44.html?version=Cloud
Side-by-Side A SAP BTP Kyma (Serverless) https://kyma-project.io/#/serverless-manager/user/README • Discovery Center Missions
Create application logic Side-by-Side A SAP Build Apps https://help.sap.com/docs/build-apps?locale=en-US
Side-by-Side A SAP Build Process Automation https://help.sap.com/viewer/product/PROCESS_AUTOMATION/Cloud/en•-US Blogs
Side-by-Side A <various SAP BTP Services> https://discovery-center.cloud.sap/viewServices/?category=all&regions=all&provider=all&showFilters=true
Application Tier Business Logic Extension
On-stack Developer Extensibility A ABAP Cloud in SAP S/4HANA
On-stack Classic Extensibility B/C Classic ABAP • Learning Journeys
Side-by-Side A OData UI Service based on custom entities using CAP https://cap.cloud.sap/docs/advanced/fiori
Side-by-Side, On-stackDeveloper Extensibility A OData UI Service Binding based on RAP object
Create API for UI service Side-by-Side, On-
stack Developer Extensibility A HTTP Inbound Communication https://help.sap.com/docs/btp/sap-business-technology-platform/apis-for-inbound-communication-http
On-stack Classic Extensibility OData Service in SEGW (no annotations)
Side-by-Side A OData Service using CAP
Side-by-Side A Web API binding with ABAP Cloud https://help.sap.com/viewer/923180ddb98240829d935862025004d6/Cloud/en-US/1913ad9f52e64ab5858df00a8d20c4d6.html
Side-by-Side A REST based Service using CAP
INTERNAL – SAP and Partners Only Create API for integration S O i n d - e s - t b a y c - k Side Developer Extensibility A A G W r e a b p h A Q P L I b S in e d rv in ic g e w u i s th in A g B C A A P P Cloud https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/latest/en-US/1913ad9f52e64ab5858df00a8d20c4d6.html 548
On-stack Developer Extensibility A HTTP Inbound Communication (SICF)
On-stack Classic Extensibility OData Service in SEGW
On-stack Classic Extensibility RFC-enabled function module
On-stack Classic Extensibility SOAP Service

## PDF page 469
Extension Technology Mapping: Extension Task - Extension Domains - Building Blocks
SAP Application Extension Methodology Extension Technology Mapping
Building Clean Core Block Level Example SAP Fiori Elements Extension Domain
SAPUI5
On-stack
Classic Extensibility: Dynpro
Tier Extension Extension
Architecture Style Task Classic Extensibility: WebDynpro
Presentation New User Create
SAP Fiori Elements
Tier Interface custom UI
Extension
SAPUI5
Domain
Side-by-Side UI5 Webcomponent
SAP Mobile Services
SAP Build Apps *
INTERNAL – SAP and Partners Only 549
Frameworks & Technologies in context of Clean Core Extensibility: SAP-Note 3578329
T h re e -T ie r A rch ite ctu P re se n ta tio n T ie r A p p lica tio n T ie r re E x te n sio n S ty le U se r In te rfa ce E xte n sio n N e w U se r In te rfa ce F o rm E -M a il B u sin e ss Lo gic E xte n sio n E x te n sio n T a sk A d a p t sta n d a rd U I: a d d /h id e /cre a te /re - n a m e /re -a rra n ge fie ld /la b e l/h e a d lin e s C re a te cu sto m U I C re a te ce n tra l e n try p o in t A d a p t cu sto m fo rm te m p la te s b a se d o n sta n d a rd p ro ce ss C re a te cu sto m fo rm A d a p t e -m a il te m p la te b a se d o n sta n d a rd p ro ce ss C re a te cu sto m e -m a il A d d cu sto m fie ld to U I se rvice A d d cu sto m fie ld to A P I A d a p t sta n d a rd b u sin e ss p ro ce ss w ith cu sto m lo gic (e .g. p re -fill/va lid a te fie ld , w ith in LU W - Lo gica l U n it o f W o rk) C re a te a p p lica tio n lo gic C re a te A P I fo r U I se rvice C re a te A P I fo r in te gra tio n E x te n sio n D o m O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck S id e -b y-S id e , O n S id e -b y-S id e , O n S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e O n -sta ck O n -sta ck S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e O n -sta ck O n -sta ck O n -sta ck S id e -b y-S id e O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck S id e -b y-S id e S id e -b y-S id e O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e O n -sta ck O n -sta ck S id e -b y-S id e S id e -b y-S id e , O n S id e -b y-S id e , O n sta ck O n -sta ck S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e S id e -b y-S id e O n -sta ck O n -sta ck O n -sta ck O n -sta ck O n -sta ck a in -sta -sta -sta - O n -S ta ck E x te n sio n D K e y-U se r E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility ckck C la ssic E xte n sib ility C la ssic E xte n sib ility K e y-U se r E xte n sib ility C la ssic E xte n sib ility D e ve lo p e r E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility K e y-U se r E xte n sib ility C la ssic E xte n sib ility D e ve lo p e r E xte n sib ility K e y-U se r E xte n sib ility C la ssic E xte n sib ility K e y-U se r E xte n sib ility D e ve lo p e r E xte n sib ility K e y-U se r E xte n sib ility D e ve lo p e r E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility D e ve lo p e r E xte n sib ility C la ssic E xte n sib ility ckD e ve lo p e r E xte n sib ility D e ve lo p e r E xte n sib ility C la ssic E xte n sib ility D e ve lo p e r E xte n sib ility D e ve lo p e r E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility C la ssic E xte n sib ility o m a in C le a n C o re AAABDBDAAAAABBAAAAAAABAABA /BABAAAABAAAABB /CDAAAAAAAAB /CAAAAAAAAA L e v e l SSSDDWWSSUSSDWSSSSSSMMSRCCMACACCDCECAAUMCACSSS<ACOOHOOWRGWHORS T e ch n ica l E x te n sio n B u ild in g B lo ck A P U I5 F le xib ility: K e y-U se r A d a p ta tio n A P U I5 F le xib ility: D e ve lo p e r A d a p ta tio n A P S cre e n P e rso n a s (fo r C la ssic D yn p ro , W e b D yn p ro , C la ssic d yn p ro s re n d e re d in W yn p ro : S cre e n E n h a n ce m e n ts (B A d I) yn p ro : M o d ifica tio n e b D yn p ro A B A P : S cre e n E n h a n ce m e n ts (B A d I) e b D yn p ro A B A P : M o d ifica tio n A P F io ri E le m e n ts (su p p o rte d flo o rp la n s) A P U I5 I5 W e b C o m p o n e n ts A P M o b ile S e rvice s A P B u ild A p p s yn p ro e b D yn p ro A B A P A P B u ild W o rk Z o n e , sta n d a rd e d itio n A P B u ild W o rk Z o n e , a d va n ce d e d itio n A P T a sk C e n te r A P S ta rt A P M o b ile S ta rt A P F io ri La u n ch p a d a in ta in F o rm T e m p la te s (O u tp u t co n tro l fra m e w o rk) a in ta in F o rm T e m p la te (N A S T b a se d fra m e w o rk) A P F o rm s S e rvice b y A d o b e (via R E S T A P I) A P D a ta S e rvice s fo r P rin t F o rm s (via S A P In te ra ctive F o rm s b y A d o b e (IF b A )) u sto m P rin t P ro gra m w ith cu sto m fo rm (via S A P S crip t & S A P S m a rt F o rm s) u sto m P rin t P ro gra m w ith cu sto m fo rm (via S A P In te ra ctive F o rm s b y A d o b e (IF b A )) a in ta in E -M a il T e m p la te (O u tp u t co n tro l fra m e w o rk) d a p t E -M a il T e m p la te (N A S T b a se d fra m e w o rk) re a te E -M a il w ith R e u se -co m p o n e n ts o f S A P C lo u d S D K B A P E n viro n m e n t: C re a te E -M a il w ith R e u se -C o m p o n e n ts o f A B A P C lo u d re a te E -M a il w ith R e u se -C o m p o n e n ts o f A B A P C lo u d u sto m F ie ld s A p p yn p ro : S cre e n E n h a n ce m e n ts (B A d I) (a d d fie ld fo r D yn p ro U I) u sto m F ie ld s A p p xte n d C D S vie w (C 0 re le a se d ) a s b a sis o f re m o te A P I w ith n e w fie ld u sto m Lo gic A p p (B A d Is) B A P B A d Is (re le a se d fo r u se in clo u d d e ve lo p m e n t) B A P B A d Is (S E 1 8 /S E 1 9 ) se r E xits (S M O D / C M O D , C u sto m e r E xits) o d ifica tio n A P in S A P B T P C lo u d F o u n d ry E n viro n m e n t B A P C lo u d in S A P B T P A B A P E n viro n m e n t A P in S A P B T P K ym a (C o n ta in e r) A P B T P K ym a (S e rve rle ss) A P B u ild A p p s A P B u ild P ro ce ss A u to m a tio n va rio u s S A P B T P S e rvice s> B A P C lo u d in S A P S /4 H A N A la ssic A B A P D a ta U I S e rvice b a se d o n cu sto m e n titie s u sin g C A P D a ta U I S e rvice B in d in g b a se d o n R A P o b je ct T T P In b o u n d C o m m u n ica tio n D a ta S e rvice in S E G W (n o a n n o ta tio n s) D a ta S e rvice u sin g C A P e b A P I b in d in g w ith A B A P C lo u d E S T b a se d S e rvice u sin g C A P ra p h Q L S e rvice u sin g C A P e b A P I b in d in g w ith A B A P C lo u d T T P In b o u n d C o m m u n ica tio n (S IC F ) D a ta S e rvice in S E G W F C -e n a b le d fu n ctio n m o d u le O A P S e rvice H e lp P o rta l D o cu m e n ta tio n T i e r E x t e n s i o n S h ttp s://h e lp .sa p .co m /d o cs/U I5 _ F LE X IB ILIT Y /4 3 0 e 2 c1 a 4 ff2 4 1 b c8 1 6 2 d f4 b f5 1 e 0 7 3 0 /3 2 8 a 5 5 0 1 3 7 3 4 4 5 1 4 a e 0 8 5 b 9 2 4 1 8 0 d 0 7 8 .h tm l h ttp s://h e lp .sa p .co m /d o cs/U I5 _ F LE X IB ILIT Y /4 3 0 e 2 c1 a 4 ff2 4 1 b c8 1 6 2 d f4 b f5 1 e 0 7 3 0 /a 3 e 9 d 7 6 4 d c8 8 4 1 4 6 8 f7 3 fd 7 ca b c0 7 ce c.h tm l? ve rsio n = C lo u d hetbtp)s://h e lp .sa p .co m /d o cs/S A P _ S C R E E N _ P E R S O N A S ? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/S A P _ N E T W E A V E R _ 7 5 0 /4 6 a 2 cfc1 3 d 2 5 4 6 3 b 8 b 9 a 3 d 2 a 3 c3 b a 0 d 9 /c1 1 3 3 4 4 2 d 6 9 2 a f0 4 e 1 0 0 0 0 0 0 0 a 1 5 5 0 b 0 .h tm l? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/A B A P _ P LA T F O R M _ N E W /9 d 3 1 c0 1 d 5 2 6 7 4 7 e 8 9 8 a 6 0 7 3 fb a 4 4 6 7 4 f/e 9 6 3 5 fa 6 e 0 1 e 1 1 d 1 9 5 4 9 0 0 0 0 e 8 2 d e 1 4 a .h tm l? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/S A P _ N E T W E A V E R _ 7 5 0 /4 6 a 2 cfc1 3 d 2 5 4 6 3 b 8 b 9 a 3 d 2 a 3 c3 b a 0 d 9 /c1 1 3 3 4 4 2 d 6 9 2 a f0 4 e 1 0 0 0 0 0 0 0 a 1 5 5 0 b 0 .h tm l? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o c/sa p h e lp _ n w 7 5 /7 .5 .5 /e n -U S /e 9 /6 3 5 fa 6 e 0 1 e 1 1 d 1 9 5 4 9 0 0 0 0 e 8 2 d e 1 4 a /fra m e se t.h tm h ttp s://e xp e rie n ce .sa p .co m /fio ri-d e sign -w e b /sm a rt-te m p la te s/# su p p o rte d -flo o rp la n s h ttp s://h e lp .sa p .co m /vie w e r/p ro d u ct/S A P U I5 /E xte rn a l/e n -U S h ttp s://h e lp .sa p .co m /d o cs/S A P U I5 ? ve rsio n = E xte rn a l# d isco ve r_ ta sk-u i5 -w e b -co m p o n e n ts h ttp s://h e lp .sa p .co m /d o c/f5 3 c6 4 b 9 3 e 5 1 4 0 9 1 8 d 6 7 6 b 9 2 7 a 3 cd 6 5 b /C lo u d /e n -U S /d o cs-e n /gu id e s/in d e x.h tm l h ttp s://h e lp .sa p .co m /d o cs/B U ILD _ A P P S h ttp s://h e lp .sa p .co m /d o cs/S A P _ S 4 H A N A _ O N -P R E M IS E /f6 8 e 4 8 9 8 1 6 e 0 4 3 f1 a d d 9 1 d 6 9 a 6 8 4 2 9 3 1 /4 a 4 3 fa 2 8 5 b c5 2 b a e e 1 0 0 0 0 0 0 0 a 4 2 1 9 3 7 .h tm l? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /sa p h e lp _ sn c7 0 0 _ e h p 0 1 /h e lp d a ta /e n /7 7 /3 5 4 5 4 1 5 e a 6 f5 2 3 e 1 0 0 0 0 0 0 0 a 1 5 5 1 0 6 /fra m e se t.h tm P r e s e n t a t i o n h ttp s://h e lp .sa p .co m /vie w e r/p ro d u ct/W Z /C lo u d /e n -U S N e w U s e r I n t e h ttp s://h e lp .sa p .co m /vie w e r/p ro d u ct/T A S K _ C E N T E R /C lo u d /e n -U S h ttp s://h e lp .sa p .co m /d o cs/sta rt T i e r h ttp s://h e lp .sa p .co m /d o cs/m o b ile -sta rt? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/S A P _ F IO R I_ LA U N C H P A D ? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/A B A P _ P LA T F O R M _ N E W /3 0 e e f4 3 4 1 e fd 4 a 2 c8 6 f2 f9 8 f1 8 7 e ccb 3 /d a 4 8 8 f7 6 0 7 8 4 4 7 b 0 b 4 2 7 9 2 2 2 6 cfcf9 b 1 .h tm l? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/fo rm s-se rvice -b y-a d o b e /sa p -fo rm s-se rvice -cf/sa p -fo rm s-se rvice -b y-a d o b e ? lo ca le = e n -U S h ttp s://a p i.sa p .co m /p a cka ge /S A P F o rm sS e rvice b yA d o b e /o ve h ttp s://h e lp .sa p .co m /d o cs/b tp /sa p -b u sin e ss-te ch n o lo gy-p la tfo rm /ra p -d a ta -se rvice s-fo r-p rin t-fo rm s? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /d o cs/A B A P _ P LA T F O R M _ N E W /b 5 6 7 0 a a a a 2 3 6 4 a 2 9 9 3 5 f4 0 b 1 6 4 9 9 9 7 2 d /5 7 8 9 5 2 e 8 d 3 9 e 4 1 0 d a 7 7 9 4 7 0 3 7 5 3 4 f8 7 5 .h tm l? lo ca le = e n -U S & ve rsio n = la te st h ttp s://sa p .gith u b .io /clo u d -sd k/d o cs/js/fe a tu re s/m a il-clie n t h ttp s://h e lp .sa p .co m /d o cs/b tp /sa p -b u sin e ss-te ch n o lo gy-p la tfo rm /in te gra tio n -a n d -co n n e ctivity-se n d in g-m a ils-u sin g-sm tp h ttp s://h e lp .sa p .co m /d o cs/S A P _ S 4 H A N A _ C LO U D /0 f6 9 f8 fb 2 8 a c4 b f4 8 d 2 b 5 7 b 9 6 3 7 e 8 1 fa /5 7 9 0 9 4 5 5 b f7 c4 fd d 8 b cf4 8 d 7 6 c1 e a e 3 3 .h tm l? lo ca le = e n -U S h ttp s://a p i.sa p .co m /p ro d u cts/S A P S 4 H A N A C lo u d /d e ve lo p e re xte n sib ility/b a d i h ttp s://h e lp .sa p .co m /d o c/sa p h e lp _ n w 7 5 /7 .5 .5 /e n -U S /e e /6 f3 b 4 2 e a 8 5 b 2 6 b e 1 0 0 0 0 0 0 0 a 1 5 5 1 0 6 /fra m e se t.h tm h ttp s://h e lp .sa p .co m /p ro d u cts/B T P /6 5 d e 2 9 7 7 2 0 5 c4 0 3 b b c1 0 7 2 6 4 b 8 e ccf4 b /9 c7 0 9 2 c7 b 7 a e 4 d 4 9 b c8 a e 3 5 fd d 0 e 0 b 1 8 .h tm l? ve rsio n = C lo u d h ttp s://h e lp .sa p .co m /p ro d u cts/B T P /6 5 d e 2 9 7 7 2 0 5 c4 0 3 b b c1 0 7 2 6 4 b 8 e ccf4 b /1 1 d 6 2 6 5 2 a a 2 b 4 6 0 0 a 0 fa 1 3 6 d e 0 7 8 9 6 4 8 .h tm l? ve rsio n = C lo u d h ttp s://h e lp .sa p .co m /p ro d u cts/B T P /6 5 d e 2 9 7 7 2 0 5 c4 0 3 b b c1 0 7 2 6 4 b 8 e ccf4 b /4 6 8 c2 f3 c3 ca 2 4 c2 c8 4 9 7 e f9 f8 3 1 5 4 c4 4 .h tm l? ve rsio n = C lo u d h ttp s://kym a -p ro je ct.io /# /se rve rle ss-m a n a ge r/u se r/R E A D M E h ttp s://h e lp .sa p .co m /d o cs/b u ild -a p p s? lo ca le = e n -U S h ttp s://h e lp .sa p .co m /vie w e r/p ro d u ct/P R O C E S S _ A U T O M A T IO N /C lo u d /e n -U S h ttp s://d isco ve ry-ce n te r.clo u d .sa p /vie w S e rvice s/? ca te go ry= a ll& re gio n s= a ll& p ro vid e r= a ll& sh o w F ilte rs= tru e h ttp s://ca p .clo u d .sa p /d o cs/a d va n ce d /fio ri h ttp s://h e lp .sa p .co m /d o cs/b tp /sa p -b u sin e ss-te ch n o lo gy-p la tfo rm /a p is-fo r-in b o u n d -co m m u n ica tio n -h ttp h ttp s://h e lp .sa p .co m /vie w e r/9 2 3 1 8 0 d d b 9 8 2 4 0 8 2 9 d 9 3 5 8 6 2 0 2 5 0 0 4 d 6 /C lo u d /e n -U S /1 9 1 3 a d 9 f5 2 e 6 4 a b 5 8 5 8 d f0 0 a 8 d 2 0 c4 d 6 .h tm l h ttp s://h e lp .sa p .co m /vie w e r/fc4 c7 1 a a 5 0 0 1 4 fd 1 b 4 3 7 2 1 7 0 1 4 7 1 9 1 3 d /la te st/e n -U S /1 9 1 3 a d 9 f5 2 e 6 4 a b 5 8 5 8 d f0 0 a 8 d 2 0 c4 d 6 .h tm l t r rvie w y f a l e c e C r E e x a t t e e n c s u i o s t n o m T a U s I k SSSSSOO i d i d i d i d i dnn E eeeee-- x ss ----- tt tbbbbbaa e yyyyycc n -----kk sSSSSS iiiiii oddddd neeeee ,, D OO o nn m -- ss att aa i ncc kk CC O ll n aa - ss S ss t i c i c a c EE k xx tt E ee x nn t ss e ii bb n ii s ll ii i tt o yy n D o m a i n C l e a n C oAAAAABB r e L e v e l SSUSSDW AAIAAy 5 e TPP PPn b e F UW M B p D r c h i o I 5e o u oy b n n r i b i l d p Ci i c E o l e A r o a l l e m Sp A m p E pe B e or s x A v n n t i P et ec s n ne s ( ts s s iu o p n p Bo ur t ie l dd if nl o g o Br p l ol a c n k s )
Link
* SAP Build Apps Deprecation and The Path Forward

## PDF page 470
Extension end-to-end process (from request to deployment)
3. Extension implementation
• Adopt a clean core mindset, write future-
proof code, and focus on reuse.
• Develop and follow Development
guidelines.
• Upskill to ABAP Cloud and modern SAP
extensibility through learning journeys
and certifications.
• Plan clean extensions by identifying SAP
standard touchpoints, using released
extension points (Level A) first, and only
stepping outside when justified.
INTERNAL – SAP and Partners Only 550

## PDF page 471
Extension implementation
1. Mindset: Build with the future in mind: stable, maintainable, aligned with strategy
2. Guidelines: Define clear, consistent development rules for quality and compliance
3. Skills & Enablement: Upskill teams for ABAP Cloud and clean core practices
4. Clean Extensions: Design extensions that are decoupled, upgrade-safe, and follow SAP’s recommended levels
INTERNAL – SAP and Customers Only 551

## PDF page 472
Extension implementation - Additional recommendations
(Extensibility Whitepaper)
At the beginning of an implementation, it is essential to identify all touchpoints with the SAP
standard, such as
• User interfaces (applications, forms, reports),
• Integrations (integration flows, events),
• Business logic (business add-ins), and
• APIs (CDS views, business objects interfaces, BAPIs),
• as well as persistence (tables).
This approach helps clarify all potential dependencies on the SAP standard and the core and shows
how tightly coupled an extension will be.
With this information in place, development should be planned using a top-down approach,
moving from clean core Level A to clean core Level D, transitioning from tightly coupled to loosely or
entirely decoupled extensions.
INTERNAL – SAP and Customers Only 552

## PDF page 473
Example of Setup for separation of ABAP Cloud (Z_CLEAN) and Classic ABAP (Z_UNCLEAN / HOME)
Custom Objects SAP Objects
Software Component: Z_CLEAN Software Component: SAPSCORE
d ZCL_DEMO (Class)
u
o
l
C
…
P
A METHOD check_product_validitiy.
B SELECT SINGLE ProductGroup FROM I_Product ✓ I_Product (CDS View)
A
WHERE Product = @product
INTO @DATA(lv_product).
…
Software Component: Z_UNCLEAN / HOME
✓
P ZI_EXAMPLE_WRAPPER (CDS)
A
B
A …
c define view entity ZI_EXAMPLE_WRAPPER as select from
i s s smodilog ✓ SMODILOG (Table)
a {
l C key obj_type as ObjectType,
…
INTERNAL – SAP and Customers Only 553

## PDF page 474
Extension deployment ties into operational clean
core principles by enforcing that only compliant
Extension end-to-end process
and quality-checked code moves into production.
Automated code validations and a tightly
4. Extension deployment
controlled exemption process guarantee
alignment with overall governance.
• Enforce clean core rules
automatically by integrating
ATC checks into transport
release, and blocking
noncompliant code until fixed
or approved
• Manage exceptions formally
with clear justification,
tracking in ATC, expiry dates,
and regular reviews
• Restrict ABAP usage by
applying ABAP Cloud language
version, role separation, and
API checks to prevent
noncompliant code
• Safeguard stability by creating
wrappers for legacy objects
and running ABAP unit tests.
• Promote transparency by
sharing findings and lessons
learned to build a culture of
quality and compliance
INTERNAL – SAP and Partners Only 554

## PDF page 475
Extension deployment
Overview
Authorizations Promote Cloud API Unit testing Clean core
cloud readiness enablement levels
highest
Allow developers to use only Maintain most of the
ABAP Cloud, ABAP for key users, objects in Level A
and ABAP developer tools as IDE. by using...
A
(General setup)
Changelog for SAP
objects
B
Monitor the changelog for SAP Use the ABAP test cockpit …released custom Use ABAP unit tests to verify the
objects to detect incompatible check variant ABAP Cloud APIs to wrap and stability of access to non-
changes to non-released SAP Readiness during consume objects of released objects and detect
objects. development to promote Levels B to D behavioural changes in Level B, C,
ABAP Cloud. and D objects after upgrades.
(Wrappers) C
(Setup)
(Unit testing with ABAP unit)
D
lowest
INTERNAL – SAP and Customers Only For full documentation, read the document “Extend SAP S/4HANA in the cloud and on premise 555
with ABAP based extensions”.
