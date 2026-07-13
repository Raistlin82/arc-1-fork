---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 51
page_end: 75
topic: clean-core-levels-a-b-c-d
---

# Clean Core Extensibility - pages 51-75

## PDF page 51
Level C

## PDF page 52
Clean core extensibility model - Classic ABAP: Level C
SAP S/4HANA Cloud Private Edition
Clean core
Qualifiers = [Internal] Level C verification Examples
levels
1) NOT Found in the Cloudification repository or Found with
Internal] includes all SAP objects that are not Objects not found in the SAP Business Accelerator Hub
State “Not to be Released” *
[released], [classic] or [not recommended] and Cloudification repository
On-stack extension
highest
• Cloudification repository viewer > SAP Cloud ERP Private > • Function Module for “Material Unit of Measure conversion”
By default, SAP objects are classified as internal
Release: Latest - Search for the object (Top right search box) ▪ MATERIAL_UNIT_CONVERSION (Not to be Released)
objects which can be subject to change at any
2) ADT - Note that ADT doesn’t inform if the state is “No API”. ▪ MATERIAL_CONVERT_QUANTITY
time
Therefore, always check the object State in item 1 ▪ MD_CONVERT_MATERIAL_UNIT
Selected usage patterns for individual object (Cloudification repository) A
Frameworks from SAP Note 3578329 on Sep.15.2025
types (e.g. read access to SAP tables) are
• ADT > Object Properties > Tab: API State • Other: SAP Query
considered as [internal]
• Contract is not set
Examples of ATC findings for Level C - Priority 3:
[Internal] objects can over time be explicitly
• Release state: Not to be Released (indicating a successor API) Information message (Chapter 5.1.2 of the guide
reclassified as [classic] or [not recommended]
3) ATC “Extend SAP S/4HANA in the cloud and on premise with
depending on customer demand, portfolio or
ABAP based extensions”)
reported upgrade issues • ATC check “Usage of APIs” and "Allowed Enhancement
• Direct read access to SAP database table/view B
Technologies" (SAP Note 3565942): Priority 2: Warning
message
SAP internal objects, not
Extend with classic
designated as released (Level A),
ABAP
[Internal] SAP object nominated as classic APIs (Level C
B), or explicitly classified as not
recommended (Level D)
D
* There are some exceptions where an object has two entries in the Cloudification repository with
States "Not to be Released" and "Cloud API". Example: BAPI_SALESORDER_CREATEFROMDAT2
lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
58
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 53
Vision – SAP Lab Preview based on current planning, subject to change
Changelog Approach: Dependency between SAP internal objects and custom - 1/3
Examples for incompatible changes:
• Deletion of objects (e.g., function modules)
• Renaming or deletion of function module parameters
• Incompatible changes to parameter types
• Renaming or deletion of methods in SAP classes
• Removal of fields from CDS views objects in
changelog
The changelog covers the following object types:
• Function modules (FUNC)
• Classes (CLAS)
• Interfaces (INTF)
All SAP
• CDS views (STOB) Changed
internal Incompatibly
• Behavior definitions (BDEF) Backlog for next
SAP
objects changed
upgrade
internal
SAP internal
(rework in custom
objects
objects
code expected)
Custom Code
Amount of impacted objects
varies from
customer to customer
due to different usage
Use of SAP objects in custom code
59
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 54
Vision – SAP Lab Preview based on current planning, subject to change
Changelog Approach: Dependency between SAP internal objects and custom - 2/3
60
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 55
Vision – SAP Lab Preview based on current planning, subject to change
How the changelog supports your clean core journey - 3/3
• The changelog will give you a look into the This minimizes the risks associated with change
already-released SAP product road map. events with full transparency and effort
estimations.
• Without installing any upgraded sandbox, the
• Get planning reliability for adaptation
changelog will give you insights into
demand.
upcoming incompatible changes on SAP
Internal objects. • Get transparency of upcoming change events.
• Requests developer resources at the right
• ABAP test cockpit will analyze custom code
time.
and evaluate all referenced SAP Internal
• Avoid upgrade project delays.
objects for future incompatible changes.
61
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 56
Level C - Exercises - 1/3
SAP Cloudification Repository Viewer
SAP Cloud ERP Private > Release: Latest
Object NOT FOUND or State: Not to be Released
2.1-4.1 Function Module in the 2.1-4.2 Function Module not found 2.1-4.3 Function Module not found
Cloudification repository with in the Cloudification repository in the Cloudification repository
State “Not to be released” and (it’s neither Level B “Classic (it’s neither Level B “Classic
indicating a successor API” or Level D “No API”) API” or Level D “No API”)
The Architect is revising the current The Architect is revising the current The Architect is revising the current
extensions and want to know if extensions and want to know if extensions and want to know if
MATERIAL_UNIT_CONVERSION is MATERIAL_CONVERT_QUANTITY is MD_CONVERT_MATERIAL_UNIT is
Level B, C or D Level B, C or D Level B, C or D
This Function Module is in the Because this Function Module is NOT Because this Function Module is NOT
Cloudification Repository with the found in the Cloudification Repository found in the Cloudification Repository
state “Not to be released”. Since it’s (it’s neither Level B “Classic API” or (it’s neither Level B “Classic API” or
it’s neither Level B “Classic API” or Level D “No API”), it’s a Level C object Level D “No API”), it’s a Level C object
Level D “No API”), it’s a Level C
object.
A successor is indicated and should
be used
62
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 57
Level C - Exercises - 2/3
SAP Note 3578329
2.1-4.4 Level C frameworks and
technologies: SAP Query
Confirm in the “SAP Note 3578329 -
Frameworks, Technologies and Development
Patterns in Context of Clean Core Extensibility”,
that “SAP Query” is Level C
63
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 58
Level C - Optional Exercises - 3/3
(Partner demo system required - Release 2023 FPS03)
ADT - ABAP Development Tools
2.1-4.5 Level C object that in ADT has 2.1-4.6 Level C object that in ADT has
the Release State = “Not to be the Tab “API State” with “Contract
Released” C1 not yet set”
Confirm that the Function Module Confirm that the Function Module
MATERIAL_UNIT_CONVERSION is NOT MATERIAL_CONVERT_QUANTITY is NOT
found in the Cloudification Repository found in the Cloudification Repository
and therefore is a Level C object and therefore is a Level C object
Check in ADT, the tab “API State” of the Check in ADT, the tab “API State”
Function Module Function Module
MATERIAL_UNIT_CONVERSION and MATERIAL_CONVERT_QUANTITY and
check that the Release State = “Not to be check that the “Contract C1 not yet set”
Released”
64
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 59
Clean core extensibility model - Summary

## PDF page 60
Clean core extensibility model
SAP S/4HANA Cloud Private Edition SAP Business Technology
Clean core
Platform
levels
SAP standard objects On-stack extension Side-by-side extension
highest
[Released] SAP remote API
Extend with ABAP Cloud,
Extend with ABAP Cloud
[Released] SAP local API (SAP Build) CAP, or low-code/no- Cloud development and
code tools (SAP Build) A
usage of released APIs*
[Released] SAP extension point
Extend with classic
[Classic] SAP extension point
ABAP Usage of best practice
B
/ classic API**
[Classic] SAP API
Consumption of internal objects
[Internal] SAP object (conditionally clean when applying C
changelog for SAP objects)
[Not recommended]
Not clean core
SAP object D
Not upgrade-stable,
[Not recommended] SAP
not recommended
extension point / technology
lowest
*available on SAP Business Accelerator Hub
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
**available in Cloudification Repository Viewer 66
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 61
Clean core extensibility model - Summary
Examples of objects from the Examples of Frameworks
Level Description Qualifiers Comments
Cloudification repository on Sep.03.2025 SAP Note 3578329 on Sep.15.2025 *
Level SAP objects and extension Released Sales Order Enhancement The clean core level concept continues to uphold extensions
A points that are officially • I_SALESORDERTP • BAdI as Technology built via SAP BTP and ABAP Cloud as the gold standard -
released and governed Level A - representing the cleanest, most future-ready
Material Unit of Measure conversion Integration
under clearly defined approach. Therefore, always strive for the highest level of
• CL_MD_PRODUCT_UNIT_CONVERSION • Process Integration Technologies
stability contracts extensibility available and follow SAP recommendation to
Inspection Plan Output management adopt a BTP first strategy for extensions.
• --- • Output Management - Print Forms
Other
• CDS Views (Technology)
Level SAP objects, extension Classic Sales Order Enhancement The Frameworks, Technologies and Development Patterns
B points and established • BAPI_SALESORDER_CREATEFROMDAT2 • Customer Exits (SMOD/CMOD) nominated as classic APIs are defined on SAP Note
frameworks that have been 3578329.
Material Unit of Measure conversion Integration
explicitly nominated by SAP
• --- • Application Link Enabling (ALE) & Idoc
experts as classic APIs Classic APIs should be used in addition to the released APIs
Inspection Plan Output management in classic ABAP extensions.
• BAPI_INSPECTIONPLAN_CHANGE • Sapscript
Level SAP internal objects, not Internal Sales Order Enhancement SAP internal objects that have no official statement on and
C designated as released • --- • --- are not classified or intended for customer use (Millions of
(Level A), nominated as objects). There is no guarantee on long-term stability.
Material Unit of Measure conversion Integration
classic APIs (Level B), or
• MATERIAL_UNIT_CONVERSION • ---
explicitly classified as not Apply the changelog for SAP objects to mitigate upgrade
• MATERIAL_CONVERT_QUANTITY
recommended (Level D) Output management risks.
• MD_CONVERT_MATERIAL_UNIT
• ---
Inspection Plan
Other
• ---
• SAP Query
Level SAP objects and patterns Not Sales Order Enhancement Objects and Technologies not recommended **.
D that have been officially recommended • BAPI_SALESORDER_CREATEFROMDATA • Implicit and Explicit Enhancement Spot
declared as not • BAPI_SALESORDER_CREATEFROMDAT1 Usage of not recommended objects should be replaced via
Integration
recommended for external released APIs or classic APIs.
Material Unit of Measure conversion • ---
use
• ---
Output management
Inspection Plan • ---
• ---
* See additional overview of “Custom code use cases and their related clean core level” in the chapter 5.1.7 of the “Extend SAP S/4HANA in the cloud and on premise with ABAP based extensions” Whitepaper.
INTERNAL – SAP and Partners Only ** Additionally to the objects with state “No API” and to the Level D frameworks defined in the SAP Note 3578329, some technologies are not recommended and their use lead to Level D (e.g. Changing SAP tables 67
directly or doing a technical modification in a standard object).

## PDF page 62
Clean core extensibility model - Level verification for SAP S/4HANA Cloud Private Edition
Business ATC check
ADT
Level Description Qualifiers Accelerator Cloudification repository viewer “Usage of APIs”
Object Properties > Tab: API State
Hub SAP Note 3565942
Level SAP objects and Released Yes SAP Cloud ERP Private (Select the release in use by Release state: Released No findings
A extension points that the Customer)
are officially released • State: Released
and governed under • Number of objects on Oct.21.2025: 42483
clearly defined stability
contracts
Level SAP objects, extension Classic No SAP Cloud ERP Private (Select the release in use by Contract is not set Priority 3: Information message
B points and established the Customer) or
frameworks that have • State: Classic API Release state: Not to be Released (indicating a successor API)
been explicitly • Number of objects on Oct.21.2025: 7711
nominated by SAP
experts as classic APIs
Level SAP internal objects, Internal No --- Contract is not set Priority 2: Warning message
C not designated as or
released (Level A), Release state: Not to be Released (indicating a successor API)
nominated as classic
APIs (Level B), or
explicitly classified as
not recommended
(Level D)
Level SAP objects and Not No SAP Cloud ERP Private (Select the release in use by Contract is not set Priority 1: Error message
D patterns that have been recommended the Customer)
officially declared as • State: No API
not recommended for • Number of objects on Oct.21.2025: 488
external use
INTERNAL – SAP and Partners Only 68

## PDF page 63
Examples of custom code use cases and their related clean core level (I)
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
INTERNAL – SAP and Partners Only Always check the latest updates of SAP Note 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility 69

## PDF page 64
Examples of custom code use cases and their related clean core level (II)
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
INTERNAL – SAP and Partners Only 70

## PDF page 65
Examples of custom code use cases and their related clean core level (III)
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
INTERNAL – SAP and Partners Only 71

## PDF page 66
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
72
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 67
New SAP Note 3690029 - Integration Technologies and Frameworks in
Context of Clean Core Integration
https://me.sap.com/notes/3690029
How to differs from SAP Note
3578329 – Extensibility?
Two notes, two Clean Core principles - they
complement, they do not overlap.
INTERNAL – SAP and Partners Only 73

## PDF page 68
Blog: Introducing SAP Note 3690029 – Integration Technologies and
Frameworks in the Context of Clean Core
INTERNAL – SAP and Partners Only 74

## PDF page 69
SAP API Policy - 1/2
SAP API Policy Presentation API Policy – FAQ
https://dam.sap.com/mac/app/p/pdf/asset/preview/KfV1rh9?ltr=a&rc=10&doi=SAP1311123 https://www.sap.com/documents/2026/04/e2a0665e-4c7f-0010-bca6-c68f7e60039b.html
INTERNAL – SAP and Partners Only 75

## PDF page 70
SAP API Policy - 2/2
INTERNAL – SAP and Partners Only 76

## PDF page 71
Clean Core Extensibility Model - Guidelines
• Follow a BTP-first approach
• Use level A/B wherever possible
• Use level C (SAP internal objects)
only in areas where A/B is
technically not possible and
apply the change log
• Avoid level D.

## PDF page 72
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
INTERNAL – SAP and Partners Only 78

## PDF page 73
System Conversion - Classic ABAP in ECC and S/4HANA Cloud Private Edition
Example of a possible scenario after an ECC
conversion to S/4HANA Cloud Private Edition
ECC SAP S/4HANA Cloud Private Edition SAP BTP
On-stack On-stack Side-by- side
extension extension extension
System Conversion
SAP ECC SAP S/4HANA
ATC variant:
applications applications
S4HANA_READINESS
Finance Finance Classic
Sales Sales ABAP *
Examples of code corrections
Procurement Procurement
for S/4HANA
Manufacturing Classic From To Manufacturing
… …
ABAP * SQL syntax SAP HANA
Extensions are
for ECC syntax
S/4HANA
All ECC Error in compliant
transactions are deprecated (distributed in
available transactions (e.g. Levels B, C, D)
MBXX)
* Classic ABAP: Freestyle custom ABAP development that allows
Non-released API / Object
the use and modification of all SAP objects
79
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 74
System Conversion - Example of Classic ABAP: Extension to create a sales order
Classic ABAP Classic ABAP
System Conversion
ECC S/4HANA compliant
Select ….. from MARA into ATC variant: Select ….. from MARA
….. where ….. S4HANA_READINESS into ….. where ….. ORDER BY
PRIMARY KEY
Call Function Module Adapt the code
Call Function Module
to be S/4HANA
Call BAPI
compliant
Call BAPI
Found in the Cloudification Repository - State: No API Found in the Cloudification Repository - State: Not to be released Found in the Cloudification Repository - State: Not to be released
Non-released API / Object See release contract C1 (Use System-Internally) on help.sap.com
80
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 75
System Conversion - Example: After conversion, the extensions are distributed in Levels B, C, D
according to the state of the objects / APIs and Frameworks / Technologies that are used
SAP S/4HANA Cloud Private Edition SAP Business Technology
Clean core
Platform
levels
On-stack extension Side-by-side extension
highest
Objects and APIs distributed Frameworks / Technologies
Extend with ABAP Cloud,
in Levels B, C, D distributed in Levels B, C, D
Extend with ABAP Cloud (SAP Build) CAP, or low-code/no-
code tools (SAP Build) A
Clean core
Enhancement
• Customer Exits (SMOD/CMOD)
BAPI_SALESORDER_CREATEFROMDAT2
Integration
B
BAPI_INSPECTIONPLAN_CHANGE • Application Link Enabling (ALE) & Idoc
Output management
• Sapscript
MARA
Conditional
MATERIAL_UNIT_CONVERSION
Other
C
MATERIAL_CONVERT_QUANTITY • SAP Query clean core
MD_CONVERT_MATERIAL_UNIT
Enhancement
• Implicit and Explicit Enhancement Spot
BAPI_SALESORDER_CREATEFROMDATA
Not clean core
Other D
BAPI_SALESORDER_CREATEFROMDAT1
• Changing SAP tables directly
• Technical modification in a standard object
lowest
81
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY
