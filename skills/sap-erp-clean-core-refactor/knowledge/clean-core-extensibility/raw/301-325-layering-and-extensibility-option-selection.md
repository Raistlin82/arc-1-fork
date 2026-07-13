---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 301
page_end: 325
topic: layering-and-extensibility-option-selection
---

# Clean Core Extensibility - pages 301-325

## PDF page 301
Example 2: Custom Field exposed in a remote API, Mobile Application SAP BTP
SAP Build portfolio
E.g. Custom Field App - SAP Build
Low-code
Maintenance Order
custom attribute
SAP Build Apps *
Low-code applications
Key user
Extensions for Workflows and SAP Build Process
extensibility for
SAP applications automations Automation
SAP S/4HANA
Digital workspaces
SAP Build Work Zone
Example 2:
Joule copilot
SAP S/4HANA
• On-stack extension
SAP BTP
Cloud where a key user
adds a custom field,
Side-by-side extensibility
On-stack extensibility which is then
seamlessly exposed
inP rae mbuoiblti lceo anptepnlict ation
ruannndin tge monp SlaAtePs BTP
Full-stack applications
Full-stack applications
Cloud developer Integrations SAP Build Code
Integrations
extensibility for Partner multitenant
Extensions for SAP BTP, ABAP
SAP S/4HANA
SAP applications SaaS applications and environment
add-ons
E.g. Logic and UI created with
SAP Build Code Mobile Services
Pro-code
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 340

## PDF page 302
Example 2: Custom Field exposed in a remote API, Mobile Application SAP BTP
Extensibility options with SAP Build
SAP Cloud ERP SAP BTP
Released Remote SAP APIs
Create and enable
On-stack extensibility integration Side-by-side extensibility
Remote Custom APIs
Released SAP extension
Released SAP local APIs
points
Automate Create
Adapt and extend
Create custom apps Example 2: Create custom apps tasks and digital
standard apps
processes workspaces
• On-stack extension
where a key user adds a E.g. Logic and UI created with
E.g. Custom Field App -
SAP Build (On-Stack) custom field, which is then SAP Build (Side-by-Side)
SAP Build Code Mobile Services
Maintenance Order
seamlessly exposed in a
custom attribute mobile application running
on SAP BTP
SAPUI5 Flexibility SAP Cloud ERP Cloud ABAP Environment
CAP & Low Code
ABAP Process Digital
SAPUI5 Application
Cloud Automation Experiences
Development
(Build Code)
Key User Developer Key User Developer
Adaptation Adaptation Extensibility Extensibility
ABAP Cloud ABAP Cloud
Pro Code Low Code
INTERNAL – SAP and Partners Only 342
available on the Extension Architecture Guide

## PDF page 303
Reference 2 / 8:
Decision Tree: How to define the best
extensibility option

## PDF page 304
How to define the best extensibility option for a specific scenario?
➢ Consumer-grade apps
Target group and YES
➢ App for persons w/o user in SAP S/4HANA
consumption
➢ Native mobile / freestyle UI
NO
YES
SaaS solution? ➢ Partner SaaS solution (for many customers, for multiple core products,..)
NO
➢ Independence of SAP S/4HANA Cloud infrastructure and operation
Infrastructure and
YES
(e.g., flexible scalability, flexible downtimes, flexible choice of data
YES
operations
center) required?
NO
➢ Tightly coupled extensions
System of records ➢ SAP S/4HANA contains most data, only small amount of data is added NO
and transaction ➢ Transactional consistency required
➢ Enabling custom services for side-by-side extensibility
YES
Key User or ➢ Simple last mile extensions (UI flexibility, add custom fields, …)
Developer Extension ➢ Analytical key user use cases
YES NO
Key User Extensibility On-Stack Developer Extensibility Side-by-Side Extensibility
Extensibility scenario
Developer Tools Low-code/
SAP Fiori-based ABAP Development Tools
and toolset Java, Node.js, no-code
Key User Tools in Eclipse
ABAP Cloud tools
INTERNAL – SAP and Partners Only 344
Source: Extend SAP S/4HANA in the cloud and on premise with ABAP-based extensions

## PDF page 305
Exercises - Decision Tree
Decision Tree
11-2.1 Analytical App with a Bar Chart and
filters
Customer requirement:
• Analytical App for S/4HANA Users with Fiori
look and feel
• Not a SaaS solution
• Do not require independence of S/4HANA
Cloud infrastructure
• Will read released CDS view with high volume
of data from S/4HANA Cloud
• The App can be addressed by a Bar Chart with
filters
INTERNAL – SAP and Partners Only 346

## PDF page 306
Exercises - Decision Tree
Decision Tree
11-2.1 Analytical App with a Bar Chart and
filters
Customer requirement:
• Analytical App for S/4HANA Users with Fiori
look and feel
• Not a SaaS solution
• Do not require independence of S/4HANA
Cloud infrastructure
• Will read released CDS view with high volume
of data from S/4HANA Cloud
• The App can be addressed by a Bar Chart with
filters
INTERNAL – SAP and Partners Only 347

## PDF page 307
Exercises - Decision Tree
Decision Tree
11-2.1 Analytical App with a Bar Chart and 11-2.2 Analytical App with very complex
filters logic and buttons that trigger APIs
Customer requirement: Customer requirement:
• Analytical App for S/4HANA Users with Fiori • Analytical App for S/4HANA Users with Fiori
look and feel look and feel
• Not a SaaS solution • Not a SaaS solution
• Do not require independence of S/4HANA • Do not require independence of S/4HANA
Cloud infrastructure Cloud infrastructure
• Will read released CDS view with high volume • Will read released CDS view with high volume
of data from S/4HANA Cloud of data from S/4HANA Cloud
• The App can be addressed by a Bar Chart with • The App will process data from multiple CDS
filters views with complex calculations and will need
some buttons that will trigger APIs
INTERNAL – SAP and Partners Only 348

## PDF page 308
Exercises - Decision Tree
Decision Tree
11-2.1 Analytical App with a Bar Chart and 11-2.2 Analytical App with very complex
filters logic and buttons that trigger APIs
Customer requirement: Customer requirement:
• Analytical App for S/4HANA Users with Fiori • Analytical App for S/4HANA Users with Fiori
look and feel look and feel
• Not a SaaS solution • Not a SaaS solution
• Do not require independence of S/4HANA • Do not require independence of S/4HANA
Cloud infrastructure Cloud infrastructure
• Will read released CDS view with high volume • Will read released CDS view with high volume
of data from S/4HANA Cloud of data from S/4HANA Cloud
• The App can be addressed by a Bar Chart with • The App will process data from multiple CDS
filters views with complex calculations and will need
some buttons that will trigger APIs
INTERNAL – SAP and Partners Only 349

## PDF page 309
Reference 3 / 8:
SAP BTP Guidance Framework
Extension Architecture Guide

## PDF page 310
SAP BTP Guidance Framework - 1/2
https://discovery-center.cloud.sap/guidance-framework
INTERNAL – SAP and Partners Only 351

## PDF page 311
SAP BTP Guidance Framework - 2/2
https://discovery-center.cloud.sap/guidance-framework
INTERNAL – SAP and Partners Only 352

## PDF page 312
Extension Architecture Guide - 1/4
Nov.12.2025
https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/what-is-extension-architecture-guide
INTERNAL – SAP and Partners Only 353

## PDF page 313
Extension Architecture Guide - 2/4
https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/what-is-extension-architecture-guide
INTERNAL – SAP and Partners Only 354

## PDF page 314
Extension Architecture Guide - 3/4
Nov.12.2025
https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/what-is-extension-architecture-guide
INTERNAL – SAP and Partners Only 355

## PDF page 315
Extension Architecture Guide - 4/4
Nov.12.2025
https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/what-is-extension-architecture-guide
INTERNAL – SAP and Partners Only 356

## PDF page 316
Exercises - Extension Architecture Guide - Presentation Tier Guidance - Mobile
Extension Architecture Guide - Presentation Tier Guidance - Mobile
11-3.1 Mobile App that requires enterprise-grade offline synchronization
The Customer needs a Mobile App that requires enterprise-grade offline synchronization. The
requirements can’t not be fulfilled with standard SAP solutions and was not found at SAP Store.
Access the Extension Architecture Guide, Click on Table of Contents > “Presentation Tier Guidance”
> Scroll down and check the options “SAP Mobile Services” and “SAP Build Apps * ”
Which of the 2 options support the Customer requirements?
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 358

## PDF page 317
Exercises - Extension Architecture Guide - Presentation Tier Guidance - Mobile
Extension Architecture Guide - Presentation Tier Guidance - Mobile
11-3.1 Mobile App that requires enterprise-grade offline synchronization
The Customer needs a Mobile App that requires enterprise-grade offline synchronization. The
requirements can’t not be fulfilled with standard SAP solutions and was not found at SAP Store.
Access the Extension Architecture Guide, Click on Table of Contents > “Presentation Tier Guidance”
> Scroll down and check the options “SAP Mobile Services” and “SAP Build Apps * ”
Which of the 2 options support the Customer requirements?
INTERNAL – SAP and Partners Only * SAP Build Apps Deprecation and The Path Forward 359

## PDF page 318
Reference 4 / 8:
ABAP Cloud - Technical Use Cases and
Recommended Technologies

## PDF page 319
ABAP Cloud - Technical Use Cases and Recommended Technologies - 1/5
https://www.sap.com/documents/2023/05/74fc05e6-747e-0010-bca6-c68f7e60039b.html
This document shall be used a reference for the possible
use cases for development and key user extensibility of
ABAP Cloud and to find further documentation and
material for each of them.
ABAP Cloud Use Cases - Overview and Recommendations
The chapter Documentation for the use cases will
feature available links for documentation for each
SAP product where ABAP Cloud is available, blogs
and other material.
INTERNAL – SAP and Partners Only 361

## PDF page 320
ABAP Cloud - Technical Use Cases and Recommended Technologies - 2/5
https://www.sap.com/documents/2023/05/74fc05e6-747e-0010-bca6-c68f7e60039b.html
INTERNAL – SAP and Partners Only 362

## PDF page 321
ABAP Cloud - Technical Use Cases and Recommended Technologies - 3/5
https://www.sap.com/documents/2023/05/74fc05e6-747e-0010-bca6-c68f7e60039b.html
INTERNAL – SAP and Partners Only 363

## PDF page 322
ABAP Cloud - Technical Use Cases and Recommended Technologies - 4/5
https://www.sap.com/documents/2023/05/74fc05e6-747e-0010-bca6-c68f7e60039b.html
INTERNAL – SAP and Partners Only 364

## PDF page 323
ABAP Cloud - Technical Use Cases and Recommended Technologies - 5/5
https://www.sap.com/documents/2023/05/74fc05e6-747e-0010-bca6-c68f7e60039b.html
INTERNAL – SAP and Partners Only 365

## PDF page 324
Exercises - ABAP Cloud - Technical Use Cases and Recommended Technologies
ABAP Cloud - Technical Use Cases and Recommended Technologies
11-4.1 Extensibility options and their “level of 11-4.2 Guidance to implement a BAdI with “ABAP
recommendation” for “BAdI Implementations” Cloud developer extensibility in S/4HANA
Cloud Private Edition”
You need to perform a “BAdI implementation” and want
to know what are the extensibility options available, After it’s decided to implement a BAdI using the “ABAP
and their level of commendation. Cloud developer extensibility in S/4HANA Cloud
Private Edition” you need to learn how to do it.
Level of recommendation
Download the document “ABAP Cloud - Technical Use
Cases and Recommended Technologies” > In the Download the “ABAP Cloud - Technical Use Cases and
Chapter “ABAP Cloud Use Cases - Overview and Recommended Technologies” > In the Chapter
Recommendations”, Scroll down to “Built-in Qualities” “Documentation for developer and key user
> Extensibility > BAdI Implementation extensibility in ABAP Cloud and Classic ABAP”, Scroll
down to “Built-in Qualities - Extensibility” > BAdI
Implementation
INTERNAL – SAP and Partners Only 366

## PDF page 325
Reference 5 / 8:
Help.sap
