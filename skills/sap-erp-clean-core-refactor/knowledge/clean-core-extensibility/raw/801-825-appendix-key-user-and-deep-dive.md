---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 801
page_end: 825
topic: appendix-key-user-and-deep-dive
---

# Clean Core Extensibility - pages 801-825

## PDF page 801
Key User Extensibility: Custom Reusable Elements
Custom Code List
Custom Code List
• A code list consists of code values (example: enUS) and code
value descriptions (example English (US))
• Code values descriptions can be translated
• You can reuse a code list in several custom business objects
• You cannot modify or delete code values of code lists that are
transported
Key User Fiori App Custom Reusable Elements
Refer to F3248 Custom Reusable Elements
INTERNAL – SAP and Partners Only 927

## PDF page 802
Key User Extensibility: Custom Reusable Elements
Custom Libraries
Custom Libraries
• With Custom Reusable Elements you can modularize and structure
your custom code
• You can create Custom Libraries and organize your methods
• This application is specifically designed for custom code reuse
• Key Features:
• Create a new custom library
• Add a method to your created custom library
• Add details to your method
• Use global variables in custom re-use libraries: create a buffer
across business logic events
• Test your custom code, save and publish your custom code and
method
Key User Fiori App Custom Reusable Elements
Refer to F3248 Custom Reusable Elements
INTERNAL – SAP and Partners Only 928

## PDF page 803
Key User Extensibility: Custom CDS Views
Create Custom CDS Views
• You can use the app to create custom CDS views for different purposes:
• Cube or Dimension views to be used in analytical scenarios
• General custom CDS views to be reused for view building in various scenarios
• External APIs define a service that can be consumed externally via OData
• Value Help Views used in Custom Fields and Custom Business Objects
• Data Extraction views to enable full extraction capabilities with Custom CDS Views
• With the app, you can create or modify a custom CDS view by, for instance by:
• adding fields from multiple data sources
• creating your own calculated fields such arithmetical calculations, case statements,
conversions
• refining the properties (such as aggregation behavior, semantics) of the selected
fields
Key User Fiori App Custom CDS Views
• creating and maintaining parameters for the usage within your view
• adding filters in order to refine the result set
• Editing a custom CDS view is an assisted process with scenario specific guidance and
checks.
Refer to F1866A Custom CDS Views (Version 2) • After publishing your CDS View, you can preview the results in the built-in data preview
or in the Customer Data Browser
INTERNAL – SAP and Partners Only 929

## PDF page 804
Key User Extensibility: Tracing
Tracing
• Tracing can be used to see which determinations, validations and
actions of which custom business object and nodes are being
processed in which order.
• You can also trace values of the input, output and changing
parameters of validations, determinations, actions and the duration
of their execution
• By creating a new trace you are able to select a name and define
properties:
• Retention date: until when a trace information will be available
• Lifetime: activate time for a trace
• Select user: e.g. communication user in case of an incoming web
service call
• You can start and stop the tracing
Key User Fiori App Custom Logic Tracing
• The result view of your trace will also be listed
• The icon on the trace overview indicates the status of the whole
trace
Refer to F3438 Custom Logic Tracing
INTERNAL – SAP and Partners Only 930

## PDF page 805
Key User Extensibility: Analytics Extensibility
Manage KPIs and Reports
KPI design Fiori apps
• Adapt SAP delivered KPIs and reports by copying them and
adjusting to your business needs
• Define drill downs to analyze the KPIs to better understand your
business situation
• Apply filters on the drill down to narrow down to your area of
interest.
• Save the filtered analysis to launch the same analysis at a later
point in time
• Define associations between KPIs and reports so that they are
available during analysis at runtime.
• Navigate to transactional apps to take action based on your
analysis
Key User Fiori App Manage KPIs and Reports
INTERNAL – SAP and Partners Only 931

## PDF page 806
Key User Extensibility: Analytics Extensibility
Custom Analytical Queries (Query Builder)
Create Custom Analytical Queries
• Create a query based on a released SAP analytical data source
(CDS views of type cube) or a custom analytical data source
• Copy a query from a SAP delivered standard analytical query
• Add or remove or customize field defined in the query (defining
new labels for a field, display data as key or text, show or hide
result rows etc.)
• Add or remove filters (pre-configured fixed value filters or user
input values filters)
• Create parameters to read the values from the user
• Create calculated / restricted / converted measures
Key User Fiori App Custom Analytical Queries • Define Hierarchies
• Testing included: Preview the results by executing the report (in
Design Studio)
INTERNAL – SAP and Partners Only 932

## PDF page 807
Key User Extensibility: Analytics Extensibility
View Browser
View Browser
• Search for CDS views and display details
− SAP and custom views
− Filter by view type, release status, etc.
− Free text search
• Create/manage analytical applications
• Display of content
• Show the details of 5500+ released CDS views
• State for release SAP S/4HANA Cloud 2111
Key User Fiori App View Browser
INTERNAL – SAP and Partners Only 933

## PDF page 808
Key User Extensibility: Custom Catalog Extensions
With the Catalog Extensions Fiori app, you can
• Extend SAP Fiori catalogs
• Add custom business object UI to a SAP Fiori catalog
• Add a Smart Business KPIs or Report to a SAP Fiori catalog
• Add a Analytical Query Application to a SAP Fiori catalog
• Add a Custom Tile to a SAP Fiori catalog
• Add a Analytical Cloud Story to a SAP Fiori catalog
• Custom Inbound Service App: Customers can call an inbound
service via oAuth
By extending the Fiori catalog the respective custom Fiori tile is
Key User Fiori App Custom Catalog Extension
assigned to the selected Fiori catalog, and the tile appears in the Fiori
Launchpad.
In the Fiori Launchpad, you can use the “Personalize Home Page”
feature to add custom tile to one or more launchpad groups.
SAP S/4HANA Cloud, public edition only
INTERNAL – SAP and Partners Only 934

## PDF page 809
Key User Extensibility: Custom Forms
Adobe Forms Designer: Create a new form template
• As a copy of a SAP standard form
• Based on an existing data source (ODATA service)
• Based on an extended ODATA service using already existing fields
and associations from published CDS views
E-Mail Template Designer Create a new e-mail template
• Based on an existing data source (CDS View)
• Based on an extended SAP data source (CDS View)
Adobe Form Designer and E-Mail Template Designer
INTERNAL – SAP and Partners Only 935

## PDF page 810
Key User Extensibility: Extensibility Cockpit
Extensibility Cockpit
• Search in business contexts for extensible objects (UI OData
services, APIs, CDS views, business scenarios form/email templates,
…) and BAdIs
• Navigation to creation of custom fields and BAdI implementation
from the search result list
• Show the details of
• 3500+ extensible CDS views
• 1000+ extensible OData service
• 1000+ extensible BAdIs
• (extensible with the key user tools)
Key User Fiori App Extensibility Cockpit
INTERNAL – SAP and Partners Only 936

## PDF page 811
Key User Extensibility: Maintain Translations
With the Maintain Translations Fiori app, you can
• Maintain translations for key user objects, e.g. custom CDS views
and custom analytical queries
Note: Some key user apps provide translation capabilities in the app
itself.
Key User Fiori App Maintain Translations
Refer to F4950 Maintain Translations
INTERNAL – SAP and Partners Only 937

## PDF page 812
Key User Extensibility: Extensibility Inventory Application
Extensibility Inventory Application
• You can display an overview of your extensibility items and view
associations or dependencies between various extensibility items
• You can see how importing or exporting extensibility items affect
other extensibility items
• Following information is provided in every extensibility item view:
− Name and type of extensibility item, date, last change, person who
performed it, status of extensibility item (deleted, imported and/or
exported)
− Uses: Other extensibility items that the extensibility item in question uses,
their name and type, further extensibility items that are used by or use
these extensibility items
− Used by: Other extensibility items that the extensibility item in question is
used by, their name and type, further extensibility items that are used by
these extensibility items
− Change history full history of changes made to the extensibility item in
Key User Fiori App Extensibility Inventory Application question (in the cloud versions only)
• You can download item dependencies
Refer to F2587 Extensibility Inventory
INTERNAL – SAP and Partners Only 938

## PDF page 813
Key User Extensibility: Lifecycle Management
Export Software Collection
• Create collections of extensibility items and export them from the
quality system
• Check the consistency of items in a collection
• Merge collections
• Add notes during export
• Lock collections and lock changes of items in collections
Import Collection
• Import collections into a production system
Key User Fiori App Export Software Collection
SAP S/4HANA Cloud, public edition only
INTERNAL – SAP and Partners Only 939

## PDF page 814
Resources
SAP Fiori Apps Reference Library Get key information for each app, including all the technical data you need for installation and configuration
SAP Blogs
▪ The Key User Extensibility Tools of S/4HANA
▪ SAP S/4HANA Extensibility: All You Need to Know
▪ S/4HANA Extensibility: Use Case Overview
▪ SAP Fiori for SAP S/4HANA – Adaptation Transport Organizer
▪ SAP S/4HANA Key User Extensibility powered by Embedded Steampunk: Custom Field with ABAP implemented Value Help
SSSSSSSSESSSA//////AxA//44444444tPPPeHHHHHHHH nSSFAAAAAAAAd//ioNNNNNNNN44 arHHAAAAAAAAin LA A dAAFPAACCaNN illlBBBBuIoaoonAAAAAAnrtuutif cPPPP ddeCCoLh g llraPPPPMMoopmrulllluuaaaaaanaa ddtdttttTiiceffffnn oooooPhPf ttYoorrrrrupaammmmoirlvabiis nnuSa dl fiKCMM rActoFE PeoeS PomrEaae yn A ErSdSiira mfnnPdUesi/itigtt otli4i sStaa outTTnieH/iiionernnnear4Aan m gm lPHeFEtiN z PirxUpomAopioAnrtrpnlNloedaam gaC nduAtILit lalne eusac o TTnCsfitsucubeoe dlt|no|dimrml icm Au StSPhpypddAAaepl l aa|ParEtPaispt t xo SdHeoHettnA sienseCen: nPal| ol|gpAp sl n HiS SA idzPPbtAeiAaepnooillPpnPppigrrtt ttt s yHaHaaaP | |lenlt|oe i Sl dorlSpSptA nAa AA PP PlPTPdoo rH aHrrHattpeenaaetlllspllippnp P gPoPo orAotrr rtptOtaapalrlslg |a nSiAzePr H|e SlAp PP oHretalpl Portal
SAP S/4HANA Cloud Private Edition Product *Choose applicable S/4HANA Cloud Private Edition version
• S/4HANA ABAP Platform Key User extensibility | SAP Help Portal
• S/4HANA ABAP Platform Configuration Information: Adaptation Transport Organizer | SAP Help Portal
• S/4HANA Fiori Launchpad Personalizing and Adapting Apps | SAP Help Portal
• S/4HANA Platform Tools for Setting Up Launchpad Content | SAP Help Portal
• S/4HANA ABAP Platform Maintain Form Templates | SAP Help Portal
• S/4HANA ABAP Platform Maintain Email Templates | SAP Help Portal
SAP S/4HANA Cloud Public Edition Product *Choose applicable S/4HANA Cloud Public Edition version
• Extend and Integrate Your SAP S/4HANA Cloud Extensibility | SAP Help Portal
• SAP Fiori Launchpad for SAP S/4HANA Cloud Personalizing and Adapting Apps | SAP Help Portal
• S/4HANA Cloud Maintain Form Templates | SAP Help Portal
• S/4HANA Cloud Maintain Email Templates | SAP Help Portal
INTERNAL – SAP and Partners Only 943

## PDF page 815
Appendix
Level A - On-stack extensibility - Key User extensibility
Level A - Side-by-side extensibility
Extensibility KPIs - Detailed Information
Setting up ATC Checks for Clean Core and Importing ATC Results
How to post Questions in the ABAP Development community
INTERNAL – SAP and Partners Only 944

## PDF page 816
Clean core extensibility model - What did not change: Level A
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
• SAP Build Apps * • SAP BTP, ABAP environment (ABAP Cloud) B
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
INTERNAL – SAP and Partners Only * SAP Build Apps Deprecation and The Path Forward 945

## PDF page 817
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
INTERNAL – SAP and Partners Only 947

## PDF page 818
SAP Build is an . . .
AppDev and automation
solution that spans low-code,
pro-code, and generative AI.

## PDF page 819
SAP Build: Generative AI–based application development and automation on
SAP Business Technology Platform
SAP Build
Apps and extensions Workflows and automations Digital workspaces
SAP Build Code
-e
Fusion team o r P d o c (S ( A A P B S A / P 4H e A n N v A i r a o n n d m SA e P n B ts T ) P) SAP Build SAP Build Work Zone
development Process Automation
-e
wd
SAP Build Apps *
oo
Lc
Centralized governance, security, and lifecycle management
Business AI Joule
capabilities Generative AI–based development, optimized for business application development
Prebuilt 120+ finance | 40+ HCM | 115+ supply chain and procurement | 225+ other
Solutions Line-of-business prebuilt solutions
Deep integration
Customer
with business Cloud ERP HR Finance Supply chain
experience
applications
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 949

## PDF page 820
Capabilities vs Products
INTERNAL – SAP and Partners Only 950

## PDF page 821
Jump-start your extensions with prebuilt content
SAP Business Accelerator Hub
Maintained and
updated by SAP
>3,200
Prebuilt integrations
>300
Business events
>1,200
Automation artifacts within
more than 430 content
packages
Visit SAP Business Accelerator Hub
INTERNAL – SAP and Partners Only 995511

## PDF page 822
Begin your extension journey today with SAP Build
Get started Start your free trial of SAP Activate your Build entitlements
at no cost Build now included in your RISE for SAP offering
Learn more Visit SAP Build Page Try the SAP Build Learning journey
Explore pre-built content for
Accelerate
SAP S/4HANA from the SAP
development
Build
INTERNAL – SAP and Partners Only 952

## PDF page 823
Dive deeper into key resources for your journey with SAP BTP and SAP Build
SAP BTP Onboarding resource
SAP Discovery Center SAP Learning Free tier and trial Overview of SAP BTP
Guidance Framework center for SAP BTP
• Discover your compass for • Realize use cases with step-by- • Become an SAP BTP solution • Obtain access to your • Find the best try-to-buy • Understand how SAP BTP
architecting, implementing, step guidance through missions architect services solution for your situation is built and serves as
and operating solutions on • Gain insights and details into and role architecture
• Develop your SAP skills for • Be empowered with proper
SAP BTP our services for SAP BTP and
AI features free, anywhere, anytime, and governance and structure • Start developing – check out • Check out the SAP BTP
• Your central access point for: at your own pace on the the mission catalog L1 Deck
• Explore SAP BTP reference • Highlight best practices
– Decision guides architectures, supporting best SAP Learning site and things to consider • Be productive with a simple • Learn more about the
practices for system landscapes
– Reference architectures • Access more than 100 upgrade with free-tier service strategy for SAP BTP
– Solution diagrams • U tra se n s o p u a r r e e s n t t i m vie at w o r o s f f y o o r u a r SAP Learning Journeys for • G re a s i o n u h r e ce lp s f u fo l r a s s e s l e f- t s s e a r n v d ic e plans • Check out the road map
SAP BTP and more
– Methodologies investments guidance • Get support from highlights for SAP BTP
– DevOps with SAP BTP • Stay ahead with road maps that • Start your journey with SAP Community
highlight upcoming innovations discovering SAP Business
– Best practices • Access SAP Discovery Center
• Read customer stories to Technology Platform
– And more
see how we've transformed
businesses like yours
Scan this code to learn more Scan this code to learn more Scan this code to learn more Scan this code to learn more Scan this code to learn more
INTERNAL – SAP and Partners Only 953

## PDF page 824
SAP Business Technology Platform – Get & Stay Certified Overview
Certification Stay Certified Effort Stay Certified LJ Get Certified Effort Get Certified LJ
vs
Data Analyst -SAC Training duration: 1 h 40 mins • Data Analyst – SAP Analytics Cloud Training Duration: 18 hours • SAP Certified Associate- DataAnalyst - SAP
Assessment: 12 Questions Exam: 60 Questions Analytics Cloud
Back-end Developer - Training Duration: 15 mins • Back-End Developer - Cloud Application Training Duration: 43 hours • SAP Certified Associate - Backend
CAP Assessment: 10 Questions Programming model Exam: 80 questions Developer - SAP Cloud Application
Programming Model
Back- end Developer – Training Duration: 1h • Back-End Developer - ABAP Cloud Training Duration: 43 hours • SAP Certified Associate - Back-End
ABAP Cloud Assessment: 10 questions Exam: 80 questions Developer - ABAP Cloud
SAP Work Zone Training Duration: 2 h 30 min • SAP Build Work Zone Implementation and Training Duration: 12 hours • SAP Certified Associate - SAP Build Work
Assessment: 10 Questions Administration Exam: 60 questions Zone Implementation and Administration
Low Code, No Code Training Duration: 6h • Low Code, No Code Developer Training Duration: 19 hours • SAP Certified Associate – Low Code, No
Developer Assessment: 10 Questions Exam: 60 questions Code – SAP Build
Integration Developer Training Duration: 40 mins • Integration Developer Training Duration: 10 hours • SAP Certified Associate- Integration
Assessment: 8 Questions Exam: 60 questions Developer
Data Engineer – Data Training Duration: 1h 35 mins • Data Engineer – SAP Data Fabric Training Duration: 53 hours • SAP Certified Associate - Data Engineer -
Fabric Assessment: 9 Questions Exam: 80 questions Data Fabric
Database Administrator Training Duration: 1h 20 mins • Database Administrator – SAP HANA Training Duration: 50 hours • SAP Certified Associate - Database
– SAP HANA Assessment: 10 Questions Exam: 50 questions Administrator - SAP HANA
Data Engineer – SAP Training Duration: 4h • SAP Data Engineer – SAP HANA Training Duration: 18 hours • SAP Certified Associate - Data Engineer -
HANA Assessment: 10 Questions Exam: 60 questions SAP HANA
SAP BTP Solution Training Duration: 1h 30 mins • SAP BTP Solution Architect Training Duration: 20 hours • SAP Certified Professional – Solution
Architect Assessment: 11 Questions Exam: 40 questions Architect –SAP BTP
INTERNAL – SAP and Partners Only 954

## PDF page 825
End-to-end guide for multitenant SaaS solutions on SAP Business Technology Platform
https://partneredge.sap.com/en/library/assets/products/tech_plat/dgl/87/94/SAP1248794.html
INTERNAL – SAP and Partners Only 955
