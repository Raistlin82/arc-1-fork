---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 701
page_end: 725
topic: sap-business-ai-context
---

# Clean Core Extensibility - pages 701-725

## PDF page 701
ABAP Code Explanation Prompt
Explain this ABAP code in terms of business logic step by step: "
Data declaration
DATA lv_temperature TYPE p DECIMALS 2.
DATA lv_adjustment TYPE p DECIMALS 2.
DATA lv_condition_amount TYPE p DECIMALS 2.
DATA lv_error TYPE string. " Mandatory move of importing
parameters to changing parameters
MOVE-CORRESPONDING item_amounts TO item_result_amounts.
MOVE-CORRESPONDING item_attributes TO item_result_attributes.
MOVE-CORRESPONDING item_quantities TO item_result_quantities.
MOVE-CORRESPONDING prcg_element_attributes TO
prcg_element_result_amounts.
MOVE-CORRESPONDING active_price_amounts TO
active_price_result_amounts.
" Fetch temperature from the specified table field
lv_temperature = item_attributes-yy1_temperature_pci.
" Check if temperature is above 20 degrees
IF lv_temperature > 20.
" Calculate the price adjustment: decrease by 10% for every 2
degrees above 20
lv_adjustment = ( ( lv_temperature - 20 ) / 2 ) * (
prcg_element_attributes-
conditionamount / 10 ). " Adjust the condition base value based on
temperature
lv_condition_amount = prcg_element_attributes-conditionamount -
lv_adjustment.
" Set the adjusted condition amount back to the structure
prcg_element_result_amounts-conditionamount =
lv_condition_amount.
ENDIF.
INTERNAL – SAP and Partners Only 822

## PDF page 702
ABAP Code Generation Prompt
Write ABAP Code to create a
CDS view
ZI_INSPECTIONLOT_STATUS
by combining CDS views for
Inspection Lot header and
Inspection Lot Status with
fields InspectionLot,
Material, Plant,
InspectionLotType,
InspectionLotQuantity,
Supplier and StatusObject.
INTERNAL – SAP and Partners Only 823

## PDF page 703
Human-centric governance and built-in guardrails
Joule advances the AI governance you have in place
Built-in responsible AI UNESCO AI ethics principles Human-first automation
Safeguards against inappropriate Advances alignment Maximizes transformation while
use, bias, and hate speech with global AI principles empowering and elevating employees
Joule’s risk-mitigation guardrails
Prescribed Expertise Safety Filtering Data-driven responses Interaction guidelines
© 2025 SAP SE or an SAP affiliate company. All rights reserved. | Public

## PDF page 704
Product Roadmap
Delivering the premier solution through continuous investment and innovation
General Availability Advanced Value Customer-level Landscape and
Release Expansion Grounding Agents
Q2 2024 H2 2025 H1 2026 Future Outlook
User Experience Gated SAP Content Custom Documents SAP Landscape Awareness
Streaming, KBA, SAP Notes, EARL Limited Pilot in Q1 AI Toolchain, Connectors, etc.
Multithreading, History
User Experience Prompt Library
Agent Ecosystem
Multi-Language Copy/Paste, Suggested Customer Managed Native, LoB, Partner, Customer
EN, FR, DE, ES, Questions, Custom
PT, CN, JP, KR Instructions, Citation Panel Web Search
Administrator Conrolled Knowledge Service
Continuously Growing
Industry Knowledge
Content Automotive, etc. File Upload
Lifecycle Management At prompt: pdf, img and other Partner Extensibility
Embedded Prompt Content, Prompt Library, Expert
User Experience
Guide and Library
AI Units SKU Chat Export, Deep Thinking…
PUPM –Package
Console
Administrator and User Expert Workspace
Custom Instructions and Files
Custom Documents
Limited Pilot Additional Gated Content
Exclusive SAP Content
As of February 2026, subject to change. © 2025 SAP SE or an SAP affiliate company. All rights reserved. | Public

## PDF page 705
Commercialization
Aligning Fixed Pricing with Scalable Consumption
AI Units
For premium AI value that scales with users
Per User Per Month Package*
35 AI Units are charged per assigned user each month
SAP Joule for Consultants
* Fair use limits apply. Visit the SAP Business AI Discovery Center for more information.
© 2025 SAP SE or an SAP affiliate company. All rights reserved. | Public

## PDF page 706
Partner Portal - SAP Joule for Consultants
https://partneredge.sap.com/en/library/education/products/tech_plat/joule/e_ep_joule_consultants.html
INTERNAL – SAP and Partners Only 827

## PDF page 707
SAP Business AI
Autonomous Enterprise
SAP Business AI Commercial Model - Update May.2026
SAP Partner Portal links
Partners Webinars
Partner Excellence Center trainings and Advisory Services
Examples of SAP standard Business AI scenarios in S/4HANA Cloud Private Edition for the end user
AI Demo scenarios
Joule for Consultants
Joule for Developers
Joule for Developers (for ABAP)
Joule Work
Joule Studio and SAP AI Agent Hub
INTERNAL – SAP and Partners Only 828

## PDF page 708
Sap.com: Joule for Developers
https://www.sap.com/products/artificial-intelligence/joule-for-developers.html
INTERNAL – SAP and Partners Only 829

## PDF page 709
SAP Digital Library - Search for Joule for Developers
https://dam.sap.com/mac/app/search?query=Joule%20for%20developers
INTERNAL – SAP and Partners Only 830

## PDF page 710
Webinar: From setup to value: Activating SAP Joule for Developers
https://partneredge.sap.com/en/library/education/psd/2026/mar/e_oe_te_w_PSD_WEB_00013283.html
INTERNAL – SAP and Partners Only 831

## PDF page 711
INTERNAL – SAP and Partners Only 832

## PDF page 712
INTERNAL – SAP and Partners Only 833

## PDF page 713
INTERNAL – SAP and Partners Only 834

## PDF page 714
SAP Business AI
Autonomous Enterprise
SAP Business AI Commercial Model - Update May.2026
SAP Partner Portal links
Partners Webinars
Partner Excellence Center trainings and Advisory Services
Examples of SAP standard Business AI scenarios in S/4HANA Cloud Private Edition for the end user
AI Demo scenarios
Joule for Consultants
Joule for Developers
Joule for Developers (for ABAP)
Joule Work
Joule Studio and SAP AI Agent Hub
INTERNAL – SAP and Partners Only 835

## PDF page 715
SAP Communities for ABAP
ABAP Development Community
Other ABAP Communities
• ABAP Testing and Analysis Community
• ABAP Extensibility Community
• ABAP Connectivity Community
• SAP BTP ABAP Environment Community
• SAP S/4HANA Cloud ABAP Environment
Community
INTERNAL – SAP and Partners Only 836

## PDF page 716
ABAP Webinars and Blogs

## PDF page 717
Webinar: Overview and roadmap of SAP Joule for Developers, ABAP AI capabilities
https://partneredge.sap.com/en/library/education/psd/2026/jan/e_oe_te_w_PSD_WEB_00012777.html
INTERNAL – SAP and Partners Only 839

## PDF page 718
Webinar: Latest announcements for ABAP developers
https://partneredge.sap.com/en/library/education/psd/2026/jun/e_oe_te_w_PSD_WEB_00014434.html
INTERNAL – SAP and Partners Only 840

## PDF page 719
Blog: ABAP Platform in SAP S/4HANA Cloud Private Edition and SAP S/4HANA 2025
https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/abap-platform-in-sap-s-4hana-cloud-private-edition-and-sap-s-4hana-2025/ba-p/14289979
INTERNAL – SAP and Partners Only 841

## PDF page 720
Blog: SAP Joule for Developers, ABAP AI capabilities for SAP S/4HANA Cloud Private Edition 2025
https://community.sap.com/t5/technology-blog-posts-by-sap/sap-joule-for-developers-abap-ai-capabilities-for-sap-s-4hana-cloud-private/ba-p/14236954
INTERNAL – SAP and Partners Only 842

## PDF page 721
Blog: SAP Joule for Developers Expands to Private Cloud: Accelerating ABAP Innovation and Transformation
https://community.sap.com/t5/technology-blog-posts-by-sap/sap-joule-for-developers-expands-to-private-cloud-accelerating-abap/ba-p/14237958
INTERNAL – SAP and Partners Only 843

## PDF page 722
Blog: Developing AI Enabled Applications with ABAP AI SDK powered by ISLM
https://community.sap.com/t5/artificial-intelligence-blogs-posts/developing-ai-enabled-applications-with-abap-ai-sdk-powered-by-islm/ba-p/14252514
INTERNAL – SAP and Partners Only 844

## PDF page 723
Blog: Custom code migration to SAP S/4HANA powered by SAP Joule for Developers, ABAP AI capabilities
https://community.sap.com/t5/technology-blog-posts-by-sap/custom-code-migration-to-sap-s-4hana-powered-by-sap-joule-for-developers/ba-p/14329094
AI-based custom code migration support for IT project managers (custom
code analysis support for IT project managers is integrated in the Custom
Code Migration app in SAP BTP)
• Understand legacy code in the AI-based Custom Code Migration app
• Understand S/4HANA ATC issues in the AI-based Custom Code Migration app
AI-based support for custom code migration developer in ABAP
development tools for Eclipse (AI-based custom code analysis and
adaptation support for developers)
• Using Docs Chat for questions around custom code and S/4HANA
simplifications
• Understanding of old legacy code
• Understanding of S/4HANA related ATC findings
• Getting code proposal for adaptation of S/4HANA related issues (The Code
proposal capability allows you to fix the issue in custom code based on AI-
based proposal emulating the same process as deterministic quick fixes and
can be utilized for S/4HANA issues where deterministic quick fixes are not
available)
INTERNAL – SAP and Partners Only 845

## PDF page 724
Blog: Entering the New Era of Agentic AI for ABAP Development
https://community.sap.com/t5/technology-blog-posts-by-sap/entering-the-new-era-of-agentic-ai-for-abap-development/ba-p/14394643
INTERNAL – SAP and Partners Only 846

## PDF page 725
Blog: Sapphire 2026 recap: Joule for Developers Agentic ABAP AI is generally available
https://community.sap.com/t5/technology-blog-posts-by-sap/sapphire-2026-recap-joule-for-developers-agentic-abap-ai-is-generally/ba-p/14405739
INTERNAL – SAP and Partners Only 847
