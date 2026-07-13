---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 276
page_end: 300
topic: layering-and-extensibility-option-selection
---

# Clean Core Extensibility - pages 276-300

## PDF page 276
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
INTERNAL – SAP and Partners Only 312

## PDF page 277
Extensibility for Differentiation
(1) SAP Process Automation Content
(2) SAP Build Content
INTERNAL – SAP and Partners Only 313

## PDF page 278
Clean Core extensibility Governance and Processes
GET clean
Measure technical debt, set ambitious but realistic
goals to reduce it, and acknowledge that legacy code
won’t vanish overnight.
How to define the
best extensibility
option for a
specific scenario
and SAP AEM
INTERNAL – SAP and Partners Only 314

## PDF page 279
SAP Build
SAP Build
Low-code
SAP Build Apps *
Low-code applications
Key user
Extensions for Workflows and SAP Build Process
extensibility for
SAP applications automations Automation
SAP S/4HANA
Digital workspaces
SAP Build Work Zone
Joule copilot
SAP S/4HANA
SAP BTP
Cloud
Side-by-side extensibility
On-stack extensibility
Prebuilt content
and templates
Full-stack applications
Full-stack applications
Cloud developer Integrations SAP Build Code
Integrations
extensibility for Partner multitenant
Extensions for SAP BTP, ABAP
SAP S/4HANA
SAP applications SaaS applications and environment
add-ons
Pro-code
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 315

## PDF page 280
Reference 1 / 8:
On-Stack x Side-by-Side comparison

## PDF page 281
Detailed guidance through SAP
Application Extension Methodology
On-Stack x Side-by-Side
and Extension Architecture Guide
SIDE-BY-SIDE EXTENSIBILITY ON SAP BTP
Can or should be decoupled from SAP Cloud ERP core (loosely
coupled – for example via event or remote API calls).
ON-STACK KEY USER OR
Is a hub scenario (i.e., integrates with several SAP Cloud ERP
DEVELOPER
systems, other SAP solutions, or additional cloud services).
EXTENSIBILITY
Is a multi-tenant partner SaaS solution which is operated by the
partner independent of the SAP Cloud ERP operation.
Part of a highly integrated business process of the SAP
Cloud ERP core (e.g., a custom process extension)
Requires heavy mobile usage with BTP’s native device capabilities or
even needs to be used in offline scenarios.
Extends an existing SAP Cloud ERP core app (e.g., via
Custom Fields App) Requires process automation for SAP Cloud ERP processes or
across multiple systems.
Depends on fast SQL access to SAP data, heavy data Is intended to be used by users who do not have access to the SAP
exchange to BTP would increase TCO / performance Cloud ERP system (e.g., a client in a web shop)
Requires scalability/elasticity in peak load scenarios and should not
Strong consistency with SAP transactions (e.g., updates
put availability of SAP Cloud ERP at risk due to infrastructure resources
in the same logical unit of work).
Benefits from frequent shipments and changes (CI/CD) of the
extension – independent of SAP Cloud ERP custom code lifecycle
Custom Remote API to drive side-by-side extension
Benefits from a broad spectrum of developers with different skill sets
(ABAP Cloud, Java, JavaScript, Python, Low-Code)
INTERNAL – SAP and Partners Only 319

## PDF page 282
Exercises - On-Stack x Side-by-Side
On-Stack x Side-by-Side
11-1.1 Extension in the Sales Order pricing, to
provide additional discounts in specific
promotional scenarios (Customer x Total
Amount x Promotional Items x Date)
The Customer has implemented custom fields in the
Business Partner, Product Master and created a
Custom Object to register some promotional scenario
using multiple parameters. The Sales Order pricing is
dynamically affected with additional discounts based
on a Custom logic.
Should this Sales Order pricing extension be
implemented On Stack or Side-by-Side?
INTERNAL – SAP and Partners Only 321
Is a multi-tenant partner SaaS solution which is
operated by the partner independent of the SAP Cloud
ERP operation.

## PDF page 283
Exercises - On-Stack x Side-by-Side
On-Stack x Side-by-Side
11-1.1 Extension in the Sales Order pricing, to
provide additional discounts in specific
promotional scenarios (Customer x Total
Amount x Promotional Items x Date)
The Customer has implemented custom fields in the
Business Partner, Product Master and created a
Custom Object to register some promotional scenario
using multiple parameters. The Sales Order pricing is
dynamically affected with additional discounts based
on a Custom logic.
Should this Sales Order pricing extension be
implemented On Stack or Side-by-Side?
ON-STACK
INTERNAL – SAP and Partners Only 322
Is a multi-tenant partner SaaS solution which is
operated by the partner independent of the SAP Cloud
ERP operation.

## PDF page 284
Exercises - On-Stack x Side-by-Side
On-Stack x Side-by-Side
11-1.1 Extension in the Sales Order pricing, to 11-1.2 Partner SaaS solution + Remote API
provide additional discounts in specific
promotional scenarios (Customer x Total The Partner wants to implement a multi-tenant SaaS
Amount x Promotional Items x Date) solution that will integrate with multiple S/4HANA
Cloud Customers.
The Customer has implemented custom fields in the
Business Partner, Product Master and created a Should this multi-tenant SaaS Partner solution be
Custom Object to register some promotional scenario implemented On Stack or Side-by-Side?
using multiple parameters. The Sales Order pricing is
dynamically affected with additional discounts based
on a Custom logic.
Should this Sales Order pricing extension be
implemented On Stack or Side-by-Side?
ON-STACK
INTERNAL – SAP and Partners Only 323
Is a multi-tenant partner SaaS solution which is
operated by the partner independent of the SAP Cloud
ERP operation.

## PDF page 285
Exercises - On-Stack x Side-by-Side
On-Stack x Side-by-Side
11-1.1 Extension in the Sales Order pricing, to 11-1.2 Partner SaaS solution + Remote API
provide additional discounts in specific
promotional scenarios (Customer x Total The Partner wants to implement a multi-tenant SaaS
Amount x Promotional Items x Date) solution that will integrate with multiple S/4HANA
Cloud Customers.
The Customer has implemented custom fields in the
Business Partner, Product Master and created a Should this multi-tenant SaaS Partner solution be
Custom Object to register some promotional scenario implemented On Stack or Side-by-Side?
using multiple parameters. The Sales Order pricing is
SIDE-BY-SIDE
dynamically affected with additional discounts based
on a Custom logic.
Should this Sales Order pricing extension be
This solution requires a Custom released remote API
implemented On Stack or Side-by-Side?
that process a very high volume of data in S/4HANA
Cloud, should this be On Stack or Side-by-Side?
ON-STACK
INTERNAL – SAP and Partners Only 324
Is a multi-tenant partner SaaS solution which is
operated by the partner independent of the SAP Cloud
ERP operation.

## PDF page 286
Exercises - On-Stack x Side-by-Side
On-Stack x Side-by-Side
11-1.1 Extension in the Sales Order pricing, to 11-1.2 Partner SaaS solution + Remote API
provide additional discounts in specific
promotional scenarios (Customer x Total The Partner wants to implement a multi-tenant SaaS
Amount x Promotional Items x Date) solution that will integrate with multiple S/4HANA
Cloud Customers.
The Customer has implemented custom fields in the
Business Partner, Product Master and created a Should this multi-tenant SaaS Partner solution be
Custom Object to register some promotional scenario implemented On Stack or Side-by-Side?
using multiple parameters. The Sales Order pricing is
SIDE-BY-SIDE
dynamically affected with additional discounts based
on a Custom logic.
Should this Sales Order pricing extension be
This solution requires a Custom released remote API
implemented On Stack or Side-by-Side?
that process a very high volume of data in S/4HANA
Cloud, should this be On Stack or Side-by-Side?
ON-STACK
ON-STACK
INTERNAL – SAP and Partners Only 325
Is a multi-tenant partner SaaS solution which is
operated by the partner independent of the SAP Cloud
ERP operation.

## PDF page 287
Reference 1:
On-Stack x Side-by-Side comparison
TCO considerations for Side-by-Slide extensibility

## PDF page 288
Lessons Learned to avoid issues: The Customer needs to be aligned with the
TCO when Side-by-Side scenarios are implemented
Extension
BTP service
Evaluation
Implementation
Definition of the Definition of the balance
of a SAP BTP
Extension Extension statement
Side-by-Side
Requirements Architecture
$
Extension
SAP BTP cost
estimation
SAP Note 2842000 - How Help.sap
SAP Note 3315297 - BTP
to monitor the
FAQ: commercial models Enterprise Accounts
consumption of
and service balance Commercial Models
resources, services and
statements Fee Service Plans
credits on SAP BTP?
INTERNAL – SAP and Partners Only 327

## PDF page 289
ISnAfPo rsmiteation published on ISnAfPo rsmiteation published on ISnAfPo rsmiteation published on
Help.sap
https://help.sap.com/docs/btp/sap-business-technology-platform/enterprise-accounts
For information about service availability, prices, and estimators, see
https://www.sap.com/products/technology-platform/solutions.html
and
https://www.sap.com/products/technology-platform/integration-suite/pricing.html
You can also view the service catalog via the SAP Discovery Center .
INTERNAL – SAP and Partners Only 328

## PDF page 290
Webinar: Introduction to SAP BTP commercial models, cost estimation and cost management
https://partneredge.sap.com/en/library/education/psd/2025/oct/e_oe_te_w_PSD_WEB_00012034.html
INTERNAL – SAP and Partners Only 329

## PDF page 291
Webinar: SAP Cloud ERP Private - What you need to know about SAP BTP as an SAP Partner - Jun.2026
https://partneredge.sap.com/en/library/education/psd/2026/feb/e_oe_te_w_PSD_WEB_00013066.html
INTERNAL – SAP and Partners Only 330

## PDF page 292
SAP S/4HANA Cloud Digital Access
Help.sap.com - SAP Digital Access SAP Partner Pricing App
https://help.sap.com/docs/S4H_OP_CE_Shared/31ca07612b8b420189225ccb2125acea/2533866e
35404182bdf7f3d6af59e76b.html
INTERNAL – SAP and Partners Only 331

## PDF page 293
Reference 1:
On-Stack x Side-by-Side comparison
Fusion Development and Examples

## PDF page 294
Blog and Examples: How Fusion Development Boosts Developer Productivity
https://community.sap.com/t5/application-development-and-automation-blog-posts/how-fusion-development-boosts-developer-productivity/ba-p/13948952
Fusion development can mean different things: On the one hand, it Examples:
bridges different tools and technologies, on the other, it brings
together people with diverse skills and preferences to collaborate 1. Full-stack application with distinct
effortlessly. All in all, it allows to leverage diverse expertise and
frontend and backend components
technologies to build cohesive solutions.
developed in separate environments. In
this case, a developer or a fusion team
could be using SAP Build Code and the
ABAP environment – either on-stack (in
SAP S/4HANA Cloud) or side-by-side (on
SAP BTP). If adding low-code application
development to the mix, the user
interface could also be created in SAP
Build Apps * for drag-and-drop simplicity.
2. On-stack extension where a key user
adds a custom field, which is then
seamlessly exposed in a mobile
application running on SAP BTP
INTERNAL – SAP and Partners Only 333
* SAP Build Apps Deprecation and The Path Forward

## PDF page 295
Reference 1:
On-Stack x Side-by-Side comparison
Fusion Development - Example 1
• Backend on On-Stack ABAP Cloud, Frontend in SAP BTP Build Apps *
* SAP Build Apps Deprecation and The Path Forward

## PDF page 296
Example 1: Backend on On-Stack ABAP Cloud, Frontend in SAP BTP Build Apps *
On-Stack x Side-by-Side
SIDE-BY-SIDE EXTENSIBILITY ON SAP BTP
Example 1:
Can or should be decoupled from SAP Cloud ERP core (loosely • Full-stack
coupled – for example via event or remote API calls). application with
ON-STACK KEY USER OR distinct frontend
Is a hub scenario (i.e., integrates with several SAP Cloud ERP and backend
DEVELOPER
systems, other SAP solutions, or additional cloud services). components
EXTENSIBILITY developed in
Is a multi-tenant partner SaaS solution which is operated by the separate
partner independent of the SAP Cloud ERP operation. environments. In
Part of a highly integrated business process of the SAP
this case, a
Cloud ERP core (e.g., a custom process extension)
Requires heavy mobile usage with BTP’s native device capabilities or
developer or a
even needs to be used in offline scenarios.
fusion team could
Extends an existing SAP Cloud ERP core app (e.g., via E.g. Web shop for B2B be using SAP Build
Custom Fields App) Requires process automation for SAP Cloud C E u R s P t o p m roc e e r s s ses or Code and the
across multiple systems.
ABAP environment
– either on-stack (in
Depends on fast SQL access to SAP data, heavy data Is intended to be used by users who do not have access to the SAP
SAP S/4HANA
exchange to BTP would increase TCO / performance Cloud ERP system (e.g., a client in a web shop)
E.g. Custom Remote API Cloud) or side-by-
side (on SAP BTP).
for transactional data Requires scalability/elasticity in peak load scenarios and should not
Strong consistency with SAP transactions (e.g., updates If adding low-code
query put availability of SAP Cloud ERP at risk due to infrastructure resources
in the same logical unit of work). application
development to the
Benefits from frequent shipments and changes (CI/CD) of the
mix, the user
extension – independent of SAP Cloud ERP custom code lifecycle
Custom Remote API to drive side-by-side extension interface could also
Benefits from a broad spectrum of developers with different skill sets be created in SAP
(ABAP Cloud, Java, JavaScript, Python, Low-Code) Build Apps * for
drag-and-drop
E.g. UI created with
simplicity.
SAP Build Apps *
INTERNAL – SAP and Partners Only * SAP Build Apps Deprecation and The Path Forward 335

## PDF page 297
Example 1: Backend on On-Stack ABAP Cloud, Frontend in SAP BTP Build Apps *
SAP Build portfolio
SAP Build E.g. UI created with
Low-code SAP Build Apps *
Example 1:
SAP Build Apps *
• Full-stack application Low-code applications
Key user
Extensions for with distinct frontend Workflows and SAP Build Process
extensibility for
SAP applications and backend automations Automation
SAP S/4HANA
components developed Digital workspaces
SAP Build Work Zone
in separate
environments. In this
Joule copilot
case, a developer or a
SAP S/4HANA
fusion team could be SAP BTP
Cloud
using SAP Build Code
E.g. Custom Remote API and the ABAP Side-by-side extensibility
On-stack extensibility
for transactional data environment – either
query on-stack (in SAP
Prebuilt content
S/4HANA Cloud) or
and templates
side-by-side (on SAP Full-stack applications
Full-stack applications
Cloud developer BTP). If adding low- Integrations SAP Build Code
Integrations
extensibility for code application Partner multitenant
Extensions for SAP BTP, ABAP
SAP S/4HANA development to the mix,
SAP applications SaaS applications and environment
the user interface could add-ons E.g. Web shop for B2B
also be created in SAP
Customers
Build Apps * for drag-
and-drop simplicity.
Pro-code
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 336

## PDF page 298
Example 1: Backend on On-Stack ABAP Cloud, Frontend in SAP BTP Build Apps *
Extensibility options with SAP Build
SAP Cloud ERP SAP BTP
Released Remote SAP APIs
Create and enable
On-stack extensibility integration Side-by-side extensibility
Remote Custom APIs
Released SAP extension
Released SAP local APIs Example 1:
points
• Full-stack application
with distinct frontend and
Automate Create
Adapt and extend backend components
Create custom apps Create custom apps tasks and digital
standard apps developed in separate
processes workspaces
environments. In this
case, a developer or a
E.g. Web shop for B2B
fusion team could be E.g. UI created with
SAP Build (On-Stack) Customers SAP Build (Side-by-Side)
using SAP Build Code SAP Build Apps *
E.g. Custom Remote API and the ABAP
for transactional data environment – either on-
SAPUI5 Flexibility SAP Cloud ERP Cloudq AuBAePr yE nvironment stack (in SAP S/4HANA
CAP & Low Code
Cloud) or side-by-side (on ABAP Process Digital
SAPUI5 Application
SAP BTP). If adding low- Cloud Automation Experiences
Development
(Build Code)
code application
Key User Developer Key User Developer
Adaptation Adaptation Extensibility Extensibility development to the mix,
the user interface could
ABAP Cloud ABAP Cloud
also be created in SAP
Build Apps * for drag-and- Pro Code Low Code
drop simplicity.
INTERNAL – SAP and Partners Only 337
* SAP Build Apps Deprecation and The Path Forward
available on the Extension Architecture Guide

## PDF page 299
Reference 1:
On-Stack x Side-by-Side comparison
Fusion Development - Example 2
• Custom Field exposed in a remote API, Mobile Application SAP BTP

## PDF page 300
Example 2: Custom Field exposed in a remote API, Mobile Application SAP BTP
On-Stack x Side-by-Side
SIDE-BY-SIDE EXTENSIBILITY ON SAP BTP
Example 2:
Can or should be decoupled from SAP Cloud ERP core (loosely
• On-stack extension
coupled – for example via event or remote API calls).
where a key user
ON-STACK KEY USER OR
adds a custom field,
Is a hub scenario (i.e., integrates with several SAP Cloud ERP
DEVELOPER systems, other SAP soluEt.igo.n Lso, ogri ca dadnidtio UnaIlc crloeuadte sder wvicitehs ) . which is then
seamlessly exposed
EXTENSIBILITY SAP Build Code Mobile Services
E.g. Custom Field App - Is a multi-tenant partner SaaS solution which is operated by the in a mobile
Maintenance Order partner independent of the SAP Cloud ERP operation. application running on
Part of a highly integrated business process of the SAP
SAP BTP
custom attribute
Cloud ERP core (e.g., a custom process extension)
Requires heavy mobile usage with BTP’s native device capabilities or
even needs to be used in offline scenarios.
Extends an existing SAP Cloud ERP core app (e.g., via
Custom Fields App) Requires process automation for SAP Cloud ERP processes or
across multiple systems.
Depends on fast SQL access to SAP data, heavy data Is intended to be used by users who do not have access to the SAP
exchange to BTP would increase TCO / performance Cloud ERP system (e.g., a client in a web shop)
Requires scalability/elasticity in peak load scenarios and should not
Strong consistency with SAP transactions (e.g., updates
put availability of SAP Cloud ERP at risk due to infrastructure resources
in the same logical unit of work).
Benefits from frequent shipments and changes (CI/CD) of the
extension – independent of SAP Cloud ERP custom code lifecycle
Custom Remote API to drive side-by-side extension
Benefits from a broad spectrum of developers with different skill sets
(ABAP Cloud, Java, JavaScript, Python, Low-Code)
INTERNAL – SAP and Partners Only 339
