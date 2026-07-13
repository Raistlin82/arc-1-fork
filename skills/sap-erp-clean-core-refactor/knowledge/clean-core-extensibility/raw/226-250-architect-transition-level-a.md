---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 226
page_end: 250
topic: architect-transition-level-a
---

# Clean Core Extensibility - pages 226-250

## PDF page 226
Blog: The New Extensibility Model from the S/4HANA Sales Perspective
Nov.04.2025
INTERNAL – SAP and Partners Only 260

## PDF page 227
Blog: SAP S/4HANA Extensibility Options For Clean Core Journey
Dec.01.2025
INTERNAL – SAP and Partners Only 261

## PDF page 228
Dec.01.2025
Blog: SAP Fiori for SAP S/4HANA – Yes you need SAP Fiori to Configure, Adapt and Extend SAP S/4HANA
Compliance Master Data
Engineering Procurement
Finance Production
INTERNAL – SAP and Partners Only Manufacturing Sales 262

## PDF page 229
Blog: ABAP Cheat Sheets (for Developers)
Clean ABAP Guide & Cheat Sheet
Explore ABAP syntax in a nutshell & executable examples:
→ SAP Blog Post: ABAP Cheat Sheets
→ GitHub: ABAP Cheat Sheets
CONTENT
→ ABAP for Cloud Development
→ Data Types and Data Objects
→ Internal Tables
→ …
INTERNAL – SAP and Partners Only 263

## PDF page 230
Released APIs

## PDF page 231
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
INTERNAL – SAP and Partners Only 265

## PDF page 232
Blog - SAP S/4HANA APIs and Where to Find Them
https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-s-4hana-apis-and-where-to-find-them/ba-p/13723939
*
INTERNAL – SAP and Partners Only 266
* Tier 1 = Level A

## PDF page 233
SAP Note 3578329 - Frameworks,
Technologies and Development Patterns in
Context of Clean Core Extensibility

## PDF page 234
SAP Note 3578329 - Frameworks, Technologies and Development Patterns in
Context of Clean Core Extensibility
https://me.sap.com/notes/3578329
INTERNAL – SAP and Partners Only 268

## PDF page 235
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
269
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 236
New SAP Note 3690029 - Integration Technologies and Frameworks in
Context of Clean Core Integration
https://me.sap.com/notes/3690029
How to differs from SAP Note
3578329 – Extensibility?
Two notes, two Clean Core principles - they
complement, they do not overlap.
INTERNAL – SAP and Partners Only 270

## PDF page 237
Q & A

## PDF page 238
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
INTERNAL – SAP and Partners Only 272

## PDF page 239
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
INTERNAL – SAP and Partners Only 273

## PDF page 240
The best custom code is not created at all, do not extend unless you really have
to -> Investigate all other (standard) options to meet your requirements:
• Only Clean Core-compliant partner developed solutions
• Stay as close as possible to the latest SAP S/4HANA releases
• No duplication of SAP standard functionality
• Use the latest SAP S/4HANA innovations (SAP Fiori, Situation Handling,
Machine Learning etc…) to meet your requirements without needing
extensions
• Utilize SAP Signavio tools to identify relevant standard SAP solutions
and leverage new business processes only available in SAP Fiori
• Implement upgrade stable customer extensions
• Only actively used and well documented customer extensions
• Adhere to general code quality standards and best practices
• Process efficiency (decommission inefficient processes)
• Use the relevant tools to identify standard SAP solutions (refer to SAP Signavio tooling) and thereby avoid
extensions. Refer to SAP Fiori for SAP S/4HANA - Finding business process improvements with SAP Signavio
INTERNAL – SAP and Partners Only 274

## PDF page 241
Clean Core extensibility Governance and Processes
GET clean
Measure technical debt, set ambitious but realistic
goals to reduce it, and acknowledge that legacy code
won’t vanish overnight.
INTERNAL – SAP and Partners Only 275

## PDF page 242
Clean Core extensibility Governance and Processes
GET clean
Measure technical debt, set ambitious but realistic
Avoid extensions goals to reduce it, and acknowledge that legacy code
won’t vanish overnight.
when possible
INTERNAL – SAP and Partners Only 276

## PDF page 243
1
Functional
request
Functional Request
How to handle a Business Requirement? Avoid extensions
when possible
Avoid extensions when possible
INTERNAL – SAP and Partners Only 277

## PDF page 244
Blog: SAP S/4HANA Extensibility Options For Clean Core Journey
Dec.01.2025
INTERNAL – SAP and Partners Only 278

## PDF page 245
S/4HANA Cloud Private Edition 2025 - Blogs and Help
SAP Blogs
• SAP Cloud ERP Private 2025 FPS0 Release Highlights Part 1
• SAP Cloud ERP Private 2025 Product Release Highlights
• AI innovations in SAP Cloud ERP Private 2025
SAP Help
• Help Portal SAP S/4HANA Cloud Private Edition
• What’s New Viewer
• What’s New (PDF)
INTERNAL – SAP and Partners Only 279

## PDF page 246
S/4HANA Cloud Private Edition 2025 - Presentations
https://workzone.one.int.sap/site#workzone-home&/groups/qrZxo4uz8Km2oqxgwVlumb/content?folder_id=FRvdVv8yHW3ckKNdRpdwxE&view_mode=list
SAP_ERP_to_SAP_S4_2025 S4HANA_CLOUD_PRIVATE_EDITION_2025_DELIVERY_SCOPE SAP_Cloud_ERP_Private_vs_S4OP_2025_FPS0
By LOB:
• Real-time Analytics
• Fiori
• Intelligence
• New and updated business
processes
• Integration
• Compatibility Scope
INTERNAL – SAP and Partners Only 280

## PDF page 247
Exercises - S/4HANA Cloud Private Edition 2025 Release presentations
2025 Release documents
9-1.1 Joule scenarios in Finance 9-1.2 Cash Management innovations in
2025 release
For a demo of AI in SAP Cloud ERP Private to an
ECC Customer CFO, find in the presentation Your Customer run S/4HANA Cloud Private
“SAP ERP to S4 2025”, the Scenarios of Joule for Edition 2023 FP00 and is evaluating the
Finance. innovations that are available in the 2025
release. You have a discovery meeting with the
Check in the links provided for each scenario Cash Management team and need to present
(help.sap), what are the Roles required to the innovations the 2025 release will bring them.
perform the Demo.
Find in the presentation “S/4HANA Cloud
Private Edition 2025 Delivery Scope”,
Innovations related to Cash Management.
INTERNAL – SAP and Partners Only 281

## PDF page 248
Process Navigator
(SAP Best Practices content)
https://me.sap.com/processnavigator
INTERNAL – SAP and Partners Only 282

## PDF page 249
Exercises - Process Navigator
Process Navigator
9-2.1 Scope Item “J78 Advanced Cash 9-2.2 Scope Item “J78 Advanced Cash
Operations” process flow Operations” test script
To test the “Cash Flow Analyzer” App you will In the Solution Process “Advanced Cash
use the Scope Item “J78 Advanced Cash Operations (J78)” > Click on the tab
Operations” and need to it’s process flow. “Accelerators” > Click of Test script > Download
and open the document.
In the Process Navigator, Click on “Solution
Scenarios” > Scroll down and select “SAP Best Search for “Cash Flow Analyzer”
Practices for SAP S/4HANA Cloud Private
Edition 2025 FPS0
In the Line of Business “Finance” > Treasury
Management > Click on the Solution Process
“Advanced Cash Operations (J78)”
INTERNAL – SAP and Partners Only 283

## PDF page 250
Blog: Introducing the new SAP Fiori Apps Reference Library
https://community.sap.com/t5/technology-blog-posts-by-sap/introducing-the-new-sap-fiori-apps-reference-library/ba-p/14346676
INTERNAL – SAP and Partners Only 284
