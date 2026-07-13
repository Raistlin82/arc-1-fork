---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 26
page_end: 50
topic: introduction-clean-core-principles
---

# Clean Core Extensibility - pages 26-50

## PDF page 26
Clean Core Extensibility
Keep competitiveness
1
while reducing Business processes
complexity.
Main Aspects:
Avoid extensions when possible Decouple extensions 2
Extensibility
from the standard core.
Set up a strong governance to create decoupled
extensions in a way that they would work in the cloud
Separate extensions by leveraging released APIs Control data according 3
Data
to the latest standards.
(Custom extensions do not break an upgrade and
upgrades do not break an extension)
Leverage the full capabilities of extensibility on the
Keep the system landscape
stack as well as side-by-side with SAP BTP 4 Integration
reliable and flexible.
Create technical debts only as informed decision
Keep the operations
5
Operations
effective and efficient.
29
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 27
Evolved clean core extensibility model for S/4HANA Cloud
SAP delivers an evolved clean core level concept, which provides greater clarity for
extensibility decisions and simplifies the qualification criteria.
• Standardized Governance: A clear, four-level model for structured, transparent extension decisions
• Informed Choices: Enables smarter prioritization of extension cleanup and development
• Balanced Flexibility: Supports both modern and legacy scenarios while guiding toward clean
architectures with a BTP-first approach.
• Faster Innovation: Encourages upgrade-safe, scalable extensions with less technical debt via SAP Build
• Tool-Based Support: Backed by SAP’s tools for development and compliance like ABAP Test Cockpit
and RISE with SAP Methodology dashboard
30
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 28
Updated Clean Core Extensibility Model
SAP Build includes AI-powered pro-code and low-code tools for on-stack and
side-by-side application development and process automation
INTERNAL – SAP and Partners Only 31

## PDF page 29
Important guides
SAP Note 3578329 -
Frameworks, ABAP test cockpit (ATC)
White paper on Clean Guide for ABAP-based
ABAP Extensibility Technologies and recommendations for
Core extensibility for e x tensibility for Clean
Strategy Development Patterns in governance of clean core
SAP S/4HANA Cloud Core
Context of Clean Core ABAP development
Extensibility
Additional information and blog posts linked at https://pages.community.sap.com/topics/abap
32
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 30
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
34
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 31
Clean core extensibility model
SAP S/4HANA Cloud Private SAP Business Technology
Clean core
Edition Platform
levels
On-stack extension Side-by-side extension
highest
Extend with ABAP Cloud,
Extend with ABAP Cloud
CAP, or low-code/no-
(SAP Build)
code tools (SAP Build) A
Clean core
Extend with classic
ABAP
B
Conditional clean core
C
Not clean core
D
lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
35
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 32
Level A

## PDF page 33
SAP Build
SAP Build
Clean core extensibility model - What did not change: Level A
SAP Build Code
SAP Build Code
SAP S/4HANA Cloud Private Edition SAP Business Technology
Platform Clean core
levels
On-stack extension Side-by-side extension
highest
SAP objects and
Extend with ABAP Cloud,
The clean core level Extend with ABAP Cloud CAP, or low-code/no- extension points that
(SAP Build) are officially released
concept continues to code tools (SAP Build)
and governed under A
uphold extensions built clearly defined
stability contracts
via SAP BTP and ABAP
Cloud as the gold
SAP S/4HANA Cloud Private
standard - Level A - SAP BTP Low-code/ no-code SAP BTP Pro-developer
Edition on-stack extensibility
representing the • SAP Build Apps * • SAP BTP, ABAP environment (ABAP Cloud) B
• Key User Extensibility (e.g. UI
cleanest, most future- adaptation, Custom Fields, Custom • SAP Build Process Automation • SAP Build Code - use cases
ready approach. Business Object, Custom CDS views)
• SAP Build Work Zone ▪ Extend SAP Solutions
Therefore, always strive • Developer Extensibility (ABAP Cloud)
▪ Build SAP Fiori Apps
for the highest level of
▪ Build and run Mobile Apps
extensibility available
▪ Build multi-tenant SaaS applications C
and follow SAP
▪ Develop SAP HANA Native applications
recommendation to
adopt a BTP first
strategy for extensions.
D
lowest
* SAP Build Apps Deprecation and The Path Forward
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
37
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 34
Clean core extensibility model - What did not change: Level A
SAP S/4HANA Cloud Private Edition SAP Business Technology
Platform Clean core
levels
SAP standard objects On-stack extension Side-by-side extension
highest
[Released] SAP remote API SAP objects and
Extend with ABAP Cloud,
Extend with ABAP Cloud extension points that
CAP, or low-code/no-
[Released] SAP local API (SAP Build) are officially released
code tools (SAP Build)
and governed under A
[Released] SAP extension point clearly defined
stability contracts
Qualifiers = Level A verification Examples
B
[Released] 1) SAP Business Accelerator Hub
Objects from the Cloudification repository
Objects and extension • Remote API: SAP S/4HANA Cloud Private Edition > APIs > All viewer on Sep.15.2025
points officially • Local API: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > Business Object Interfaces • Released Sales Order API: I_SALESORDERTP
released by SAP under
• Extension Point: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > Business Add-Ins • Released Material Unit of Measure conversion
stability contracts (C0,
• CDS Views: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > CDS Views API: CL_MD_PRODUCT_UNIT_CONVERSION
C1, C2, C3, C4)
2) Help.sap.com (for CDS Views) Frameworks from SAP Note 3578329 on C
These objects can be
• CDS Views: Help.sap.com > SAP S/4HANA Cloud Private Edition > Product Assistance > Related Sep.15.2025
found by customers in
Information “SAP S/4HANA and SAP S/4HANA Cloud Private Edition > Cross Components > Virtual Data • Enhancement: BAdI as Technology
Business Accelerator Hub
Model and CDS Views > CDS Views
(api.sap.com), in the • Integration: Process Integration
system (ADT) and via 3) Cloudification repository Technologies
Cloudification Repository • Cloudification repository viewer > SAP Cloud ERP Private > Release: Latest > State: Released • Output management: Output Management -
4) ADT Print Forms D
• ADT > Object Properties > Tab: API State > Release state: Released • Other: CDS Views (Technology)
5) ATC
• ATC check “Usage of APIs” and "Allowed Enhancement Technologies" (SAP Note 3565942): No
finding lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
40
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 35
Level A - Exercises - 1/4
SAP Business Accelerator Hub
2.1-1.1 Remote API: 2.1-1.2 Local API: Sales 2.1-1.3 Extension Point: 2.1-1.4 CDS Views: CDS
Sales Order remote Order BAdI (Business Add- View for Sales Order
API - A2X in) for an extension Item
(Synchronous) On-stack extension that before the Sales
needs a released local API Order save Use of the Query Browser
Customer Web site that for the business object to check the Sales volume
needs a released remote “Sales Order” On-Stack extension that of a product that has just
API for the business object checks the Sales Order been launched
“Sales Order” compliance before saving
it. An error message will be
triggered in case of missing
fields or inconsistencies
41
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 36
Level A - Exercises - 2/4
SAP Cloudification Repository Viewer SAP Cloudification Repository Viewer
SAP Cloud ERP Private > Release: Latest SAP Cloud ERP Private > Release: Latest
State: Not To Be Released State: Released
2.1-1.5 Successor 2.1-1.6 Successor 2.1-1.7 Successor 2.1-1.8 CDS 2.1-1.9 Local APIs
of of table of Function Views for the for the
BAPI_SALES MARA Module Application Application
ORDER_CRE MATERIAL_U Component Component
ATEFROMDAT Architect wants to NIT_CONVER SD-SLS SD-SLS-API
2 know the released SION (Sales) (Sales)
CDS View that is
Architect wants to the successor of Architect wants to On-stack On-stack
know the released the table MARA know the released extension that extension that
local API that is Class that is the needs a released needs a released
the successor of successor of the CDS View for the local API for the
the Function Module business object business object
BAPI_SALESORDE MATERIAL_UNIT_ “Sales Order” “Sales Order”
R_CREATEFROMD CONVERSION
AT2
42
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 37
Level A - Exercises - 3/4
CDS Views in the Help.sap.com Release Contracts SAP Note 3578329
2.1-1.10 CDS Views for Sales Order 2.1-1.11 Release Contracts 2.1-1.12 Level A frameworks and
Item technologies: User Interface
Check in the SAP Help the Release
Check in the SAP Help the CDS Views contracts definitions (C0, C1, C2, C3, Confirm in the “SAP Note 3578329 -
for Sales > Order and Contract C4) Frameworks, Technologies and
Management > Sales Order Development Patterns in Context of
Management and Processing > Sales Clean Core Extensibility”, that Fiori is
Order > Sales Order Item the User Interface Level A (Upgrade
stable and Cloud Ready)
43
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 38
Level A - Optional Exercises - 4/4
(Partner demo system required - Release 2023 FPS03)
ADT - ABAP Development Tools
2.1-1.13 Verification 2.1-1.14 ADT - 2.1-1.15 ADT - 2.1-1.16 ADT - 2.1-1.17 ADT - 2.1-1.18 Find a
of the Release successor: successor: successor: object tree of released BAdI
status of Released Local Released CDS Released Class Released for Project WBS
Objects API that is the View that is the that is the Objects
successor of successor of successor of Architect needs to
Architect wants to the the table MARA the Function Architect wants to find a BAdI for
check if an object BAPI_SALESOR Module create an object tree Project WBS
has Release DER_CREATEF Architect wants to MATERIAL_UNI with the Application Structures using the
contracts ROMDAT2 know the released T_CONVERSIO Components (e.g. object tree for the
CDS View that is the N MM, SD) of the Application
Architect wants to successor of the released objects Component PS
know the released table MARA Architect wants to “USE_IN_CLOUD_DE
local API that is the know the released VELOPMENT” and
successor of the Class that is the “USE_AS_REMOTE_
BAPI_SALESORDER_ successor of the API”
CREATEFROMDAT2 Function Module
MATERIAL_UNIT_CO
NVERSION
44
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 39
Levels B, C, D

## PDF page 40
Clean core extensibility model - Classic ABAP: Levels B, C, D
SAP S/4HANA Cloud Private Edition SAP Business Technology
Clean core
Platform
levels
On-stack extension Side-by-side extension
highest
Extend with ABAP Cloud,
Extend with ABAP Cloud
CAP, or low-code/no-
(SAP Build)
code tools (SAP Build) A
Clean core
Extend with classic
ABAP
B
Conditional clean core
C
Not clean core
D
lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
46
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 41
Level B

## PDF page 42
Clean core extensibility model - Classic ABAP: Level B
SAP S/4HANA Cloud Private Edition
Clean core
levels
On-stack extension
highest
A
SAP objects, extension points
Extend with classic
[Classic] SAP extension point and established frameworks
ABAP
that have been explicitly B
[Classic] SAP API nominated by SAP experts as
classic APIs
Qualifiers = [Classic] Level B verification Examples
1) Cloudification repository C
[Classic] includes objects and extension points nominated by SAP Objects from the Cloudification repository
experts as “Classic API” – but without a stability contract • Cloudification repository viewer > SAP Cloud ERP viewer on Sep.15.2025
Private > Release: Latest > State: Classic API
• Released Inspection plan BAPI:
Legacy APIs and extension points which were provided already in
2) ADT BAPI_INSPECTIONPLAN_CHANGE (Released
S/4HANA On Premise and SAP ERP, intended to be specifically used
by customers • ADT > Object Properties > Tab: API State API not available for Inspection plan)
• Contract is not set Frameworks from SAP Note 3578329 on
Mature technologies, frameworks (e.g. SAPGUI, ALV grid) and
development patterns intended and recommended to be used • Release state: Not to be Released (indicating a Sep.15.2025 D
by customers already in SAP S/4HANA or SAP ERP and which are not successor API) • Enhancement: Customer Exits
known to cause general upgrade issues 3) ATC (SMOD/CMOD)
These objects are recommended the next best option where no • ATC check “Usage of APIs” and "Allowed • Integration: Application Link Enabling (ALE)
[Released] object is available and can include e.g. BAdIs, Classic Enhancement Technologies" (SAP Note 3565942): & IDoc lowest
User Exits, BAPIs. The central repository for classic APIs is the Priority 3: Information message • Output management: Sapscript
ClSoAuPd Biufiicldaitnicolund reesp AoI-senithoarnyced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
48
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 43
Level B - Exercises - 1/3
SAP Cloudification Repository Viewer
SAP Cloud ERP Private > Release: Latest
State: Classic API
2.1-2.1 Classic API for 2.1-2.2 Classic APIs for 2.1-2.3 Classic APIs for
Inspection Plan Project System (PS) Quality Management
(QM)
On-stack extension that On-stack extension that
needs an API for the needs APIs for the On-stack extension that
business object “Inspection Application Component “PS- needs APIs for the
Plan” ST” (Project System Application Component
Structures) “QM-IM”
Since there is no released
API, a Classic API (Level B) is Since there is no released
the highest level that can be API for “PS-ST”, Classic APIs
achieved (Level B) are the highest
level that can be achieved
49
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 44
Level B - Exercises - 2/3
SAP Note 3578329
2.1-2.4 Level B frameworks and 2.1-2.5 Level B frameworks and
technologies: BAPI Framework - technologies: Usage of individual SAP
Technology BAPIs
Confirm in the “SAP Note 3578329 - Confirm in the “SAP Note 3578329 -
Frameworks, Technologies and Development Frameworks, Technologies and Development
Patterns in Context of Clean Core Extensibility”, Patterns in Context of Clean Core Extensibility”,
that “BAPI Framework - Technology” is Level B that “Usage of individual SAP BAPIs in customer
(Upgrade stable, but NOT Cloud Ready) extensions” may be Level B, C or D.
Check the column “Public Cloud Ready The Level will depend on the specific BAPI
Alternatives” for the BAPI Framework - Level. For example:
Technology = RAP
• BAPI_INSPECTIONPLAN_CREATE: Level B
50
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 45
Level B - Optional Exercises - 3/3
(Partner demo system required - Release 2023 FPS03)
ADT - ABAP Development Tools
2.1-2.6 Level B object (within the 2.1-2.7 Level B object (within the
Cloudification Repository with State = Cloudification Repository with State =
Classic API) that in ADT has the Release Classic API) that in ADT has the Tab “API
State = “Not to be Released” State” with “Contract C1 not yet set”
Confirm in the Cloudification Repository the Confirm in the Cloudification Repository the
State of the State of the BAPI_INSPECTIONPLAN_CREATE
BAPI_SALESORDER_CREATEFROMDAT2 (Classic API)
(Classic API)
Check in ADT, the tab “API State” of the
Check in ADT, the tab “API State” of the BAPI_INSPECTIONPLAN_CREATE and check
BAPI_SALESORDER_CREATEFROMDAT2 and that the “Contract C1 not yet set”
check that the Release State = “Not to be
Released”
51
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 46
Level D

## PDF page 47
Clean core extensibility model - Classic ABAP: Level D
SAP S/4HANA Cloud Private Edition
Clean core
levels
On-stack extension
highest
Qualifiers = [Not Recommended] Level D verification Examples
1) Cloudification repository
This level includes individual SAP objects Objects from the Cloudification repository viewer on Sep.15.2025
explicitly classified as not fit to be used • Cloudification repository viewer > SAP Cloud • BAPI_SALESORDER_CREATEFROMDATA A
by customers (“No API”) ERP Private > Release: Latest > State: No API
• BAPI_SALESORDER_CREATEFROMDAT1
2) ADT
It includes modifications, selected usage
Frameworks from SAP Note 3578329 on Sep.15.2025
patterns for individual object types (e.g. • ADT > Object Properties > Tab: API State
• Enhancement: Implicit and Explicit Enhancement Spot
write access to SAP tables) as well as • Contract is not set
selected extension techniques and 3) ATC Examples of ATC findings for Level D - Priority 1: Error message
development patterns (e.g. implicit (Chapter 5.1.2 of the guide “Extend SAP S/4HANA in the cloud and on B
• ATC check “Usage of APIs” and "Allowed
enhancements) premise with ABAP based extensions”)
Enhancement Technologies" (SAP Note 3565942):
• Object is modified
Objects can be identified via cloudification Priority 1: Error message
• Enhancement technology is not allowed
repository (Find SAP Discouraged Objects
• Direct write access to SAP database tables
by applying the filter for “state” with “No
• Call of form routines in SAP program
API”).
• Usage of SAP object classified as “No API”
• Usage of critical ABAP statements C
Extend with classic
ABAP SAP objects and patterns that
[Not recommended]
have been officially declared
SAP object D
as not recommended for
[Not recommended] SAP
external use
extension point / technology
lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
53
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 48
Level D - Exercises - 1/3
SAP Cloudification Repository Viewer
SAP Cloud ERP Private > Release: Latest
State: No API
2.1-3.1 Sales Order BAPI that had the API 2.1-3.2 Sales Order BAPI that had the API
State “No API” State “No API”
The Architect is revising the current extensions The Architect is revising the current extensions
and want to know if and want to know if
BAPI_SALESORDER_CREATEFROMDATA BAPI_SALESORDER_CREATEFROMDAT1
is Level B, C or D is Level B, C or D
Because this BAPI is found in the Because this BAPI is found in the
Cloudification Repository with State “No API”, Cloudification Repository with State “No API”,
it’s a Level D object it’s a Level D object
54
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 49
Level D - Exercises - 2/3
SAP Note 3578329
2.1-3.3 Level D frameworks and
technologies: Explicit and Implicit
Enhancements
Confirm in the “SAP Note 3578329 -
Frameworks, Technologies and Development
Patterns in Context of Clean Core Extensibility”,
that “Explicit and Implicit Enhancements” are
Level D * (NOT Upgrade stable, NOT Cloud
Ready)
Check the column “Public Cloud Ready
Alternatives” for the Explicit and Implicit
Enhancements = BAdI (Kernel based)
* A selected number of user and customer exits is considered clean core-compliant. So, it is advisable always to check whether
there is a specific SAP note that allows the exit usage (e.g., SAP Note 3589866 Clean Core: Userexits & VOFM in SD/LE).
• https://me.sap.com/notes/3589866
55
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 50
Level D - Optional Exercises - 3/3
(Partner demo system required - Release 2023 FPS03)
ADT - ABAP Development Tools
2.1-3.4 Level D object (within the
Cloudification Repository with State =
No API) that in ADT has the Tab “API
State” with “Contract C1 not yet set”
Confirm in the Cloudification Repository the
State of the
BAPI_SALESORDER_CREATEFROMDATA
(No API)
Check in ADT, the tab “API State” of the
BAPI_SALESORDER_CREATEFROMDATA
and check that the “Contract C1 not yet set”
56
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY
