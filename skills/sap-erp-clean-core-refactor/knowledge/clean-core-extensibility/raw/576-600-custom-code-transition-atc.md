---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 576
page_end: 600
topic: custom-code-transition-atc
---

# Clean Core Extensibility - pages 576-600

## PDF page 576
New check in ABAP test cockpit based on usage guidelines for SAP APIs
Check a simple report with the list viewer for ABAP using:
New check in ABAP test cockpit
Cloud readiness checks:
CHECK BEHAVIOR
No finding in ABAP test cockpit:
Usage of released API
Priority 3 (info):
◼Usage of classic API
Priority 2 (warning):
◼ Usage of internal APIs (unclassified API)
◼ SQL read access to SAP database table
◼ SUBMIT statement on programs
Priority 1 (error):
◼ Usage of “no API” (with successor if available)
Usage of APIs check:
◼ SQL write access to SAP database table
◼ PERFORM statements on external subroutines
Learn more : ABAP test cockpit recommendations for governance of clean core development
INTERNAL – SAP and Partners Only 675

## PDF page 577
How ABAP test cockpit supports the clean extensibility level concept
CLEAN EXTENSIBILITY LEVELS
Usage of SAP objects in custom development Clean core checks in ABAP test cockpit *
A Released SAP APIs (local and remote) and extension points No messages
B Classic SAP APIs and extension points Priority 3: Info message
C Internal SAP objects Priority 2: Warning message
D Not recommended SAP objects and extension technologies Priority 1: Error message
* The checks “Usage of APIs”, “Allowed Enhancement Technologies”, and “Critical Statements” are considered for the clean extensibility level determination of customer objects.
Learn more : Clean Extensibility for SAP S/4HANA Cloud white paper and the extensibility guide for ABAP
INTERNAL – SAP and Partners Only 676

## PDF page 578
ABAP test cockpit on SAP BTP for clean extensibility governance
ABAP test cockpit on SAP BTP is recommended for governance of private cloud and on-
premise landscapes in line with the clean core concept ABAP test cockpit on SAP BTP
ABAP test cockpit on SAP BTP is available in the SAP BTP ABAP environment
• Always up-to-date check system operated and maintained by SAP
• Custom code analysis including security checks
(No additional license fee required for SAP Code Vulnerability Analyzer)
• Usage data consideration (SCMON, SUSG)
Developer scenario for ABAP test cockpit in
• Custom check variants and custom checks in ABAP test cockpit
ABAP development tools for Eclipse
• Developer scenario
• Robust workflow for handling of exemptions for ABAP test cockpit
• Baseline to exclude findings from ABAP test cockpit in old legacy code
• Scheduling of runs of ABAP test cockpit
• Transport management and integration of change request management (ChaRM)
Customer success stories
Geberit: Improve code quality with ABAP test cockpit on SAP BTP
REWE Digital: Build clean core apps with SAP BTP ABAP environment and ABAP test cockpit on SAP BTP
Check out Usage of ABAP test cockpit in the cloud for on-
INTERNAL – SAP and Partners Only premise developments 677

## PDF page 579
Training Feedback
Virtual version of the training
Language
Selection
https://surveys-platform.cfapps.us10.hana.ondemand.com/survey/ccea-day-5-virtual-english-2026-07
Feedback of the 5 days of trainings
Your feedback is very important for us to improve this new training
•
Feedback is anonymous and takes about 8 minutes
•
Thank you very much!
INTERNAL – SAP and Partners Only 678

## PDF page 580
How to post Questions in the ABAP Development community

## PDF page 581
How to post Questions in the ABAP Development community - See Appendix
INTERNAL – SAP and Partners Only 681

## PDF page 582
Business AI Advisory Services

## PDF page 583
SAP Business AI Advisory
https://partnerbenefitscatalog.sap.com/Partner-Benefits-Catalog/Sales-%26-Presales/SAP-Business-AI-Advisory/p/1002487
INTERNAL – SAP and Partners Only 683

## PDF page 584
SAP Business AI Activation Advisory
https://partnerbenefitscatalog.sap.com/Partner-Benefits-Catalog/Innovation/SAP-Business-AI-Activation-Advisory/p/1002143
INTERNAL – SAP and Partners Only 684

## PDF page 585
Q & A

## PDF page 586
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
INTERNAL – SAP and Partners Only 687

## PDF page 587
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
INTERNAL – SAP and Partners Only 688

## PDF page 588
SAP Saphire 2026
https://partneredge.sap.com/en/partnership/events/sapphire.html
https://partneredge.sap.com/en/solutions/aut-ent/about.html#portfolio
INTERNAL – SAP and Partners Only 689

## PDF page 589
Saphire: 2026 and beyond: Discover the latest innovations in SAP Cloud ERP Private | ERP1178V
https://www.sap.com/events/sapphire/virtual/flow/sap/sv26/catalog/page/catalog/session/1774553757285001dfk3
INTERNAL – SAP and Partners Only 690

## PDF page 590
SAP Sapphire 2026 Innovation News Guide
https://www.sap.com/topics/events/sapphire/innovation-news-guide-2026
INTERNAL – SAP and Partners Only 691

## PDF page 591
Webinar: Autonomous Enterprise and SAP Business AI Platform - Jun.08.2026
https://partneredge.sap.com/en/library/education/psd/2026/may/e_oe_te_w_PSD_WEB_00014246.html
INTERNAL – SAP and Partners Only 692

## PDF page 592
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
INTERNAL – SAP and Partners Only 693

## PDF page 593
Webinar: SAP Business AI Platform partner commercials and licensing - Jun.09.2026
https://partneredge.sap.com/en/library/education/psd/2026/may/e_oe_te_w_PSD_WEB_00014247.html
INTERNAL – SAP and Partners Only 694

## PDF page 594
E-learning: Discovering SAP’s Commercial Model for AI
https://learning.sap.com/courses/discovering-sap-s-commercial-model-for-ai-1
INTERNAL – SAP and Partners Only 695

## PDF page 595
SAP Business AI Commercial Model
https://www.experience-agent.cloud.sap/assets/SAP1314243?shareType=link
SAP’s evolved Business AI commercial model shifts to consumption-based value. It includes Base AI (free with cloud subscriptions), Premium AI
(consumption-based via AI Units), and customer-built AI (free at design, pay at runtime). Most GenAI moves to Base AI. Premium AI centers on agent
execution, priced per action. AI Units remain the core AI currency. Customers can access Joule Base via the SAP Store. The model aims for transparent,
INTERNAL – SAP and Partners Onslycalable AI adoption. Tools like the AI Feature Catalog and Estimator aid in sales and estimation. 696

## PDF page 596
The commercial foundation remains stable
AI Units stay AI Units: Buy upfront, No SKU
at the core use over time changes
AI Units remain SAP’s AI Customers buy AI Units upfront
Customers on SKUs 8019164
currency, alongside BTPEA and and consume them gradually,
continue on their existing SKU
BDC Capacity Units across guided by adoption plans.
—no migration required.
platform and data scenarios.
Built on a stable foundation, the value model is evolving
From users accessing AI to AI executing work for the business
©© SSAAPP SSEE 770000

## PDF page 597
When do Business AI commercial model changes take effect?
Newly released SAP AI agents will Premium AI centers on agent execution
follow consumption-based pricing, • AI Unit SKU 8018592 enabled for AI agent usage
with usage measured via AI Units • New SKU 8019164 required only for SAP Joule for Consultants (PUPM-based
offering)
Customer- and partner-facing
materials reflect all Business AI Most Generative AI capabilities transition to Base AI included in standard cloud
commercial changes including: Agent- subscriptions
based consumption, planned PUPM
phase-out, shift of Generative AI from PUPM largely phased out retained only where value is tied to individual productivity
Premium to Base AI (e.g., SAP Joule for Consultants)
SAP SAPPHIRE
MAY 12 Q3/2026
MAY JUN JUL AUG SEP OCT NOV DEC
JUL 1 DEC 31
Start of proactive customer and partner End of Joule Studio Promo
communication on PUPM phase-out, standardized Introduce run-time charging
messaging and detailed guidance provided to ensure custom-built agents
consistent communication ahead of Q3 changes
©© SSAAPP SSEE 770022

## PDF page 598
Introducing the evolved
commercial model
©© SSAAPP SSEE 703

## PDF page 599
How customers start and grow with SAP Business AI
1 2 3
Start with Base AI Scale with premium AI Extend with customer-built AI
Customers begin with AI included in their As needs grow, customers adopt advanced, For differentiation, customers can build and
cloud subscriptions. execution-driven AI. run their own AI.
• Built on SAP’s Business AI platform and
• Joule Base and embedded AI capabilities • Agents and high-value AI services
runtime
• No additional purchase required • Automation and end-to-end execution
• Monetized at execution time
SAP pre-built AI custom-built AI
©© SSAAPP SSEE 770044

## PDF page 600
SAP pre-built AI
©© SSAAPP SSEE 705
