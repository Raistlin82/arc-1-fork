---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 176
page_end: 200
topic: released-apis-and-wrappers
---

# Clean Core Extensibility - pages 176-200

## PDF page 176
ADT - Example of Repository Tree for Released Objects
• Right click your ABAP Repository Tree > Configure Tree
• Property Filter: api:RELEASED
INTERNAL – SAP and Partners Only 201

## PDF page 177
ADT - Example of Search (Shift + Ctrl + A ) by Object Type “bdef” and API “use_in_cloud_development)
bdef = Behavior Definition (API)
type:bdef api:use_in_cloud_development *salesorder*
Type:bdef
api:use_in_cloud_development
INTERNAL – SAP and Partners Only 202

## PDF page 178
ADT Search (Shift + Ctrl + A )
Type code Type description
BDEF Behavior Definition
DDLS Data Definition Language Source (CDS view)
CLAS Class
type:bdef api:use_in_cloud_development *salesorder*
type:ddls api:use_in_cloud_development *salesorder*
INTERNAL – SAP and Partners Only type:clas api:use_in_cloud_development *conversion* 203

## PDF page 179
ADT - Demo: Search for the object “MARA”, check the API State and open the successor “I_PRODUCT”
INTERNAL – SAP and Partners Only To search for an Object and verify the Properties in ADT: Shift + Ctrl + A 204

## PDF page 180
SAP Business Accelerator Hub - Release status for Developer and Key User Extensibility
INTERNAL – SAP and Partners Only 205

## PDF page 181
Help.sap.com - Oct.10.2025
https://help.sap.com/doc/abapdocu_cp_index_htm/CLOUD/en-US/index.htm?file=abenabap_versions_and_apis.htm
Release Contracts
A repository object can be classified by a release contract. A release contract is the prerequisite for classifying a repository object as a released API that can be accessed in a restricted
ABAP language version. It ensures a certain stability regarding consistency and compatibility of repository objects that are released as APIs. For repository objects delivered by SAP,
compliance with a release contract is checked by special ATC checks.
The following release contracts are available:
• Extend (C0)
This contract ensures stability at dedicated extension points to allow for a certain extensibility.
Contract C0 is relevant for repository objects that are enhanced by enhancement tools, e.g. of the ABAP Dictionary or ABAP CDS.
For more information, see Extend (C0) on SAP Help Portal.
• Use System-Internally (C1)
This contract ensures a technically stable public interface for system-internal use. Existing visible components, for example parameters, elements, or CDS associations, must not be
changed in an incompatible way. Optional components might be added later.
Contract C1 is relevant for repository objects that are accessed by different ABAP language versions.
For more information, see Use System-Internally (C1).
• Use as Remote API (C2)
This contract ensures a technically stable public interface for use as remote API. It is similar to C1 but additionally guarantees, that external consumers of the API do not need to be
adjusted after an upgrade.
Contract C2 is relevant only for external consumption.
For more information, see Use as Remote API (C2).
• Manage Configuration Content (C3)
This contract ensures a stable persistence for own configuration content that can be exported, imported, displayed and edited using dedicated APIs. No key or other fields must be
changed. Non-key fields might be added later.
Contract C3 is relevant for Business Configuration Tools.
• Use in ABAP-Managed Database Procedures (AMDP) (C4)
This contract ensures a technically stable public interface for use in ABAP Managed Database Procedures. It is similar to C1 but in contrast to C1, no optional components can be
added later. No changes are allowed.
Contract C4 is relevant for AMDP methods that are accessed by other AMDP methods, such as BAdI methods implemented as AMDP-methods.
For more information, see Use in ABAP-Managed Database Procedures (C4).
INTERNAL – SAP and Partners Only 206

## PDF page 182
Examples: Non-released x Released objects
(ADT status for 2023 FPS03)
Non-released
Released objects
objects
Use System-Internally Use as a
Extend
(Contract C1 - stable public interface for Remote API
(Contract C0 - extension points stability)
Object type Object Object system-internal use) (Contract C2 *)
Release Key User Release Key User Release
Cloud Dev. Cloud Dev.
State Apps State Apps State
Table MARA I_PRODUCT Released No Yes Released Yes Yes ---
Table VBAP I_SALESDOCUMENTITEM Released No Yes Released Yes Yes ---
BAPI_SALESORDER_C
Local API I_SALESORDERTP Released Yes No Released Yes No ---
REATEFROMDAT2
BAPI_SALESORDER_C
Remote API A_SALESORDER Released No Yes --- --- --- Released
REATEFROMDAT2
BAdI:
SD_SLS_CHECK_BEFORE_SAVE
Extension MV45AFZZ • Interface: --- --- --- Released Yes Yes ---
IF_SD_SLS_CHECK_BEFORE_S
AVE
BAdI:
BD_MMPUR_FINAL_CHECK_PO
Extension ME_PROCESS_PO_CUST • Interface: --- --- --- Released Yes Yes ---
IF_EX_MMPUR_FINAL_CHECK_
PO
See release contracts C0, C1 and C2 information on help.sap.com * C2: stable public interface for use as remote API
INTERNAL – SAP and Partners Only 207

## PDF page 183
CDS View CDS View Local API
Examples:
Released
objects in
ADT
Remote API BAdI BAdI
(Status for 2023
FPS03)
INTERNAL – SAP and Partners Only 208

## PDF page 184
Increase of Released objects: S/4HANA 2022 FPS02 to 2025 FPS00 (+ 129%)
Example: For use in Cloud Development (+ 273%)
S/4HANA 2022 FPS02: 26,414 released objects S/4HANA 2025 FPS00: 60,405 released objects
INTERNAL – SAP and Partners Only 212

## PDF page 185
How to find Released APIs: Level A
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
Level A Objects and APIs
B
1) SAP Business Accelerator Hub
• Remote API: SAP S/4HANA Cloud Private Edition > APIs > All
• Local API: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > Business Object Interfaces
• Extension Point: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > Business Add-Ins
• CDS Views: SAP S/4HANA Cloud Private Edition > on Stack Extensibility > CDS Views
2) Help.sap.com (for CDS Views) C
• CDS Views: Help.sap.com > SAP S/4HANA Cloud Private Edition > Product Assistance > Related
Information “SAP S/4HANA and SAP S/4HANA Cloud Private Edition > Cross Components > Virtual Data
Model and CDS Views > CDS Views
3) Cloudification repository
• Cloudification repository viewer > SAP Cloud ERP Private > Release: Latest > State: Released
4) ADT D
• ADT > Object Properties > Tab: API State > Release state: Released
5) ATC
• ATC check “Usage of APIs” and "Allowed Enhancement Technologies" (SAP Note 3565942): No
finding lowest
INTERNAL – SAP and Partners Only 213

## PDF page 186
Blog - SAP S/4HANA APIs and Where to Find Them
https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-s-4hana-apis-and-where-to-find-them/ba-p/13723939
*
INTERNAL – SAP and Partners Only 214
* Tier 1 = Level A

## PDF page 187
Request of Missing APIs

## PDF page 188
Request Missing APIs in the Customer Influence Portal
S/4HANA Cloud Private Edition
S/4HANA Cloud Private Edition - Local and Remote APIs
Select the Customer Influence channel
Extensibility and Integration (APIs) of the LOB you need an API
INTERNAL – SAP and Partners Only 216

## PDF page 189
Request Missing APIs in the Customer Influence Portal
S/4HANA Cloud Public Edition
S/4HANA Cloud Public Edition - Local APIs S/4HANA Cloud Public Edition - Remote APIs
Key User and Developer Extensibility APIs for Integration
INTERNAL – SAP and Partners Only 217

## PDF page 190
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
INTERNAL – SAP and Partners Only 218

## PDF page 191
RECAP: ABAP Cloud development model and Developer Extensibility
• To enable ABAP Cloud development model, Customers need to create a custom software component and a custom
development package structure, this is called Developer Extensibility
• All objects created under this development package would use the ABAP Cloud development model e.g,
Refer to ABAP Platform documentation
INTERNAL – SAP and Partners Only 219

## PDF page 192
RECAP: ABAP Cloud – IDE and API examples for on-stack developer extensibility
Custom ABAP on
SAP S/4HANA Cloud
ABAP development tools in Eclipse
Cloud-optimized ABAP language
Proven ABAP transport management
Access to released SAP APIs ONLY
– otherwise, syntax error!
No access to old Dynpro APIs
No direct select on the MARA table from
SAP
Local APIs from SAP S/4HANA
SELECT products from
SAP S/4HANA tables using the public
I_Product CDS view
INTERNAL – SAP and Partners Only 220

## PDF page 193
RECAP: ABAP Cloud – IDE and API examples for on-stack developer
extensibility
Error
New ATC - SAP Note 3565942
SQL read access to table = Level C
MARA:
Absence of state “released”, “classic API” or
“no API” = Level C
Classic ABAP (Levels B, C, D)
is not permitted in ABAP Cloud
INTERNAL – SAP and Partners Only 221

## PDF page 194
Level A can only access “Released” objects
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
INTERNAL – SAP and Partners Only **available in Cloudification Repository Viewer 222

## PDF page 195
How can we access a “Classic API” in ABAP Cloud?
(e.g. Level B - BAPI_INSPECTIONPLAN_CHANGE)
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
Syntax
error
Extend with classic
[Classic] SAP extension point
ABAP Usage of best practice
B
/ classic API**
BAPI_IN[CSPlaEsCsTicIO] NSPALPA NA_PCIHANGE
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
INTERNAL – SAP and Partners Only **available in Cloudification Repository Viewer 223

## PDF page 196
Blog 1 - How to mitigate missing publicly released SAP APIs – The ABAP Cloud API enablement guide
https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/how-to-mitigate-missing-publicly-released-sap-apis-the-abap-cloud-api/ba-p/13561479
INTERNAL – SAP and Partners Only 224

## PDF page 197
Building ABAP Cloud wrappers – basic principles
ABAP Cloud
3
Release the wrapper for
RELEASE
Use in Cloud Development
ABAP Cloud rules enforced by ABAP Test
Cockpit (ATC)*
1 Z_WRAPPER
Create the wrapper ATC exemptions for usage of non-released SAP
WRAPPER
object objects → governance
Clear custom interface between SAP code and
2 custom code
Implement the wrapper
A custom wrapper generator is available for
and access the required
function modules (BAPIs)
non-released SAP object
Non-released
SAP development objects
LEVEL B - Classic API
LEVEL C - Internal API
LEVEL D - Not recommended
* More information:
Classic ABAP
INTERNAL – SAP and Partners Only How the ABAP Test Cockpit Supports you to adopt ABAP Cloud 226

## PDF page 198
Wrappers are required when we need to access Levels B, C, D objects
ABAP Cloud
RELEASE
ATC exemptions for
Z_WRAPPER
usage of non-released
WRAPPER
SAP objects
Classic ABAP
INTERNAL – SAP and Partners Only 227

## PDF page 199
Blog 2 with example - How to wrap a classic BAPI and consume it from a RAP business object in ABAP Cloud?
Tutorial
https://developers.sap.com/group.sap-s4hana-extensibility-wrap-api.html
Not released
INTERNAL – SAP and Partners Only 229

## PDF page 200
Blog 3 with example - How to generate a wrapper for function modules (BAPIs) for missing released SAP APIs
Tutorial
https://developers.sap.com/tutorials/abap-s4hanacloud-purchasereq-create-wrapper.html
Not released
INTERNAL – SAP and Partners Only 231
