---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 101
page_end: 125
topic: abap-cloud-developer-extensibility
---

# Clean Core Extensibility - pages 101-125

## PDF page 101
Screenshot 06/11 - Behaviour Definition for the Consumption View
INTERNAL – SAP and Partners Only 112

## PDF page 102
Screenshot 07/11 - Service Definition (to expose the Consumption View)
INTERNAL – SAP and Partners Only 113

## PDF page 103
Screenshot 08/11 - Service Binding
INTERNAL – SAP and Partners Only 114

## PDF page 104
Screenshot 09/11 - External App
BSP Application
IAM App
Fiori User Interface
Launchpad App
INTERNAL – SAP and Partners Only 115

## PDF page 105
Screenshot 10/11 - Fiori Tile
INTERNAL – SAP and Partners Only 116

## PDF page 106
Screenshot 11/11 - Fiori App
INTERNAL – SAP and Partners Only 117

## PDF page 107
ABAP Cloud development model and Developer Extensibility
• To enable ABAP Cloud development model, Customers need to create a custom software component and a custom
development package structure, this is called Developer Extensibility
• All objects created under this development package would use the ABAP Cloud development model e.g,
Refer to ABAP Platform documentation
INTERNAL – SAP and Partners Only 118

## PDF page 108
ABAP Cloud – IDE and API examples for on-stack developer extensibility
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
INTERNAL – SAP and Partners Only 119

## PDF page 109
ABAP Cloud – IDE and API examples for on-stack developer extensibility
Error
New ATC - SAP Note 3565942
SQL read access to table = Level C
MARA:
Absence of state “released”, “classic API” or
“no API” = Level C
Classic ABAP (Levels B, C, D)
is not permitted in ABAP Cloud
INTERNAL – SAP and Partners Only 120

## PDF page 110
ABAP Cloud within Level A
SAP S/4HANA Cloud Private Edition SAP Business Technology
Platform Clean core
levels
On-stack extension Side-by-side extension
highest
SAP objects and
Extend with ABAP Cloud,
Extend with ABAP Cloud extension points that
CAP, or low-code/no-
(SAP Build) are officially released
code tools (SAP Build)
and governed under A
clearly defined
stability contracts
SAP S/4HANA Cloud Private
SAP BTP Low-code/ no-code SAP BTP Pro-developer
Edition on-stack extensibility
• SAP Build Apps • SAP BTP, ABAP environment (ABAP Cloud) B
• Key User Extensibility (e.g. UI
adaptation, Custom Fields, Custom • SAP Build Process Automation • SAP Build Code - use cases
Business Object, Custom CDS views)
• SAP Build Work Zone ▪ Extend SAP Solutions
• Developer Extensibility (ABAP Cloud)
▪ Build SAP Fiori Apps
▪ Build and run Mobile Apps
▪ Build multi-tenant SaaS applications C
▪ Develop SAP HANA Native applications
D
lowest
SAP Build includes AI-enhanced pro-code and low-code tools for on-stack and side-by-side application development and process automation.
INTERNAL – SAP and Partners Only 121

## PDF page 111
ABAP Cloud within SAP Build
SAP Build
Low-code
SAP Build Apps
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
INTERNAL – SAP and Partners Only 122

## PDF page 112
ABAP Cloud within the SAP Business Suite architecture
INTERNAL – SAP and Partners Only 123

## PDF page 113
Virtual Data Model (VDM) as the technical foundation
The VDM is a unified, reusable semantic data model:
• Implementation through core data services (CDS)
• Active core entity and relationship model for SAP Cloud ERP
• Database abstraction, uniform modeling, and naming in business terminology
Joule AI agents
Remote APIs
Data product
and integration
VDM
Migration semantic
Analytics
services CDS
model
Extensibility Search
Services for UI Transactional models
consumption (business objects)
INTERNAL – SAP and Partners Only 124

## PDF page 114
Data Products in SAP S/4HANA Cloud, built on the Virtual Data Model
INTERNAL – SAP and Partners Only 125

## PDF page 115
ABAP Cloud Innovations

## PDF page 116
Latest innovations for ABAP Cloud
Innovate your enterprise and boost your efficiency
TRANSACTIONAL SCENARIOS CDS AND ANALYTICAL SCENARIOS BASED ON ABAP
• From scratch generator, with and without AI support • New CDS entity types—like table entities, scalar functions,
• Collaborative draft for UIs based on SAP Fiori updatable view entities, static, and writable external entities
• Editable tree view for SAP Fiori • Buffering of CDS table entities
• SAP Fiori–based UIs with multiple business objects • CDS hierarchy generator
• Event-driven side effects for asynchronous UI changes • Review booklet app generator
• ABAP RESTful application programming model–based • Multidimensional analysis app generator allowing a cube or
analytical table with aggregation and grouping capabilities query as a starting point
INTEGRATION SERVICES GENERATIVE AI IN ABAP CLOUD
• AI assistance for key user extensibility
• AI capabilities in SAP Joule for Developers to increase
• SQL services for data integration scenarios
developer productivity, such as chat assistance, code
• ABAP-based CDS external entities for outbound access to
explanation, predictive code completion, and generation of
external databases with ABAP-based SQL
apps, services, and tests
• AI-based service consumption model generation
• AI software development kit for ABAP enabled by intelligent
scenario lifecycle management to infuse AI into your apps
# What’s New / # ABAP Cloud Road map information
INTERNAL – SAP and Partners Only 129

## PDF page 117
ADT - ISLM Recommendation and ABAP AI SDK
Demo -
SAP
TechEd
2025
ISLM = Intelligent Scenario Lifecycle Management
Recommendations
from an ISLM machine
learning scenario Search of Product reviews
from an SAP Gen AI
scenario (ABAP AI SDK)
INTERNAL – SAP and Partners Only 130

## PDF page 118
ADT - Generate ABAP Repository Objects - 1/4
Demo -
SAP
TechEd
2025
INTERNAL – SAP and Partners Only 131

## PDF page 119
ADT - Generate ABAP Repository Objects - 2/4
Demo -
SAP
TechEd
2025
INTERNAL – SAP and Partners Only 132

## PDF page 120
ADT - Generate ABAP Repository Objects - 3/4
Demo -
SAP
TechEd
2025
INTERNAL – SAP and Partners Only 133

## PDF page 121
ADT - Generate ABAP Repository Objects - 4/4
Demo -
SAP
TechEd
2025
INTERNAL – SAP and Partners Only 134

## PDF page 122
SAP
TechEd
2025
Quick SAP Fiori app generator: Deploy the ABAP development tools preview
SAP Fiori launchpad Creation of SAP Fiori
Annotations driven No UI project sources
enabled project at any time
• SAP Fiori app for CRUD • No separate version • Launchpad configuration • Create SAP Fiori project
and tabular data use case control, lifecycle of UI covered in generator from quick SAP Fiori app
design time artefacts with tool bridge
• List report or object page • Launchpad tile is generated
floorplan • No tool switch for quick • Quick SAP Fiori app is
SAP Fiori app overwritten during
• Simplified generation from
deployment
ABAP development tools
• Productive SAP Fiori app
Released with SAP S/4HANA Cloud Public Edition 2505, SAP BTP ABAP Environment 2505, SAP S/4HANA Cloud Private Edition 2025.
Links:
• Help.sap - Creating SAP Fiori App Using Quick Fiori Application Generator
• SAP Community - Quickly Generate and Deploy SAP Fiori Apps from ABAP Development Tools for Eclipse
INTERNAL – SAP and Partners Only 135

## PDF page 123
Blog: Entering the New Era of Agentic AI for ABAP Development
https://community.sap.com/t5/technology-blog-posts-by-sap/entering-the-new-era-of-agentic-ai-for-abap-development/ba-p/14394643
INTERNAL – SAP and Partners Only 137

## PDF page 124
Blog: Sapphire 2026 recap: Joule for Developers Agentic ABAP AI is generally available
https://community.sap.com/t5/technology-blog-posts-by-sap/sapphire-2026-recap-joule-for-developers-agentic-abap-ai-is-generally/ba-p/14405739
INTERNAL – SAP and Partners Only 138

## PDF page 125
Blog: ABAP AI - Chapter 3: We go agentic!
https://community.sap.com/t5/technology-blog-posts-by-sap/abap-ai-chapter-3-we-go-agentic/ba-p/14391469
INTERNAL – SAP and Partners Only 139
