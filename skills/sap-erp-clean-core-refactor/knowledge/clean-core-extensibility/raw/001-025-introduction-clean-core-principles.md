---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 1
page_end: 25
topic: introduction-clean-core-principles
---

# Clean Core Extensibility - pages 1-25

## PDF page 1
Clean Core Extensibility for Architects
Focus on:
 SAP Cloud ERP Private
 Clean Core extensibility
Eduardo Tagusagawa William Terceiro
SAP Cloud ERP Private Specialist SAP Cloud ERP Specialist
Partner Excellence Center - Americas Partner Excellence Center Americas
Target Audience: SAP Partners
Jul/2026
INTERNAL – SAP and Partners Only

## PDF page 2
Disclaimer
The information in this presentation is confidential and proprietary to SAP and may not be disclosed without the permission of SAP.
Except for your obligation to protect confidential information, this presentation is not subject to your license agreement or any other service
or subscription agreement with SAP. SAP has no obligation to pursue any course of business outlined in this presentation or any related
document, or to develop or release any functionality mentioned therein.
This presentation, or any related document and SAP's strategy and possible future developments, products and or platforms directions and
functionality are all subject to change and may be changed by SAP at any time for any reason without notice. The information in this
presentation is not a commitment, promise or legal obligation to deliver any material, code or functionality. This presentation is provided
without a warranty of any kind, either express or implied, including but not limited to, the implied warranties of merchantability, fitness for a
particular purpose, or non-infringement. This presentation is for informational purposes and may not be incorporated into a contract. SAP
assumes no responsibility for errors or omissions in this presentation, except if such damages were caused by SAP’s intentional or gross
negligence.
All forward-looking statements are subject to various risks and uncertainties that could cause actual results to differ materially from
expectations. Readers are cautioned not to place undue reliance on these forward-looking statements, which speak only as of their dates,
and they should not be relied upon in making purchasing decisions.
2

## PDF page 3
Housekeeping and Information Resources
If you have questions during the issues, please use the Q&A function. Not the chat.
If you like to have a 1:1 follow-up on a specific topic, please provide your contact details so we
can arrange a follow-up (partner name, your name, email address).
If you like to contact SAP presenter an overview of the contacts is included.
The recording and slides will be sent out to all participants within the next few business days. In
case of issues with the email you can this session registration link to access the recording and
slides.
If you have any technical issues please use the chat function.
© 2025 SAP SE or an SAP affiliate company. All rights reserved. ǀ INTERNAL – Authorized for Partners 3

## PDF page 4
Objectives
Provide for Technical Architects an overview of the SAP S/4HANA Cloud Private
Edition extensibility framework and it’s components
Explain the new Clean Core Level concept (Levels A, B, C, D)
Provide guidelines and references about how to assign the extensibility patterns to
the extensions
Explain how to manage Clean Core extensibility
Provide examples of ways we can help the Customers that converted to SAP
S/4HANA Cloud Private Edition, transform their extensibility objects from Classic
ABAP towards Clean Core
Comment: Clean Core has many dimensions, we are focusing on “Extensibility”
INTERNAL – SAP and Partners Only 4

## PDF page 5
Test of the access to the training WorkZone
Link to access the training WorkZone was sent by e-mail to all participants
If you have issues to access the WorkZone, send an e-mail to:
• Eduardo.tagusagawa@sap.com
https://workzone.one.int.sap/site#workzone-home&/groups/qrZxo4uz8Km2oqxgwVlumb/workpage_tabs/Nw7aRgbXTFzAfCYiICDqCI
INTERNAL – SAP and Partners Only 6

## PDF page 6
Agenda with LINKS
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
INTERNAL – SAP and Partners Only 7
Appendix

## PDF page 7
Index
Index
Agenda - 2 Days on site
1. Introduction - Clean Core > Extensibility
2. SAP S/4HANA Cloud Private Edition extensibility model overview
• 2.1 SAP S/4HANA Cloud Private Edition - new Clean Core Level concept (Levels A, B, C, D)
Day 1 Extensibility
• 2.2 Example of Clean Core Levels for the objects of a system conversion
Framework
Morning
3. Level A - On-stack extensibility
• 3.1 Key User extensibility What are the
extensibility
• 3.2 Classic ABAP x ABAP Cloud
alternatives
4. Level A - Side-by-Side extensibility in SAP BTP
5. Non-released x Released objects
6. How to consume Non-released objects and APIs in ABAP Cloud - Wrappers
Day 1 7. Certification of Partner Solutions following Clean Core
Afternoon
8. Architects transition from Classic ABAP to Level A
Guidelines and
9. Avoid extensions when possible Methodologies
10. Layering of Key User Extensibility and Developer Extensibility
How to choose
11. How to define the best extensibility option for a specific scenario and SAP AEM
the best
Day 2
12. RISE with SAP Methodology, SAP Activate and Cloud ALM alternative
Morning
13. Clean Core extensibility Governance and Processes
Governance &
14. Transforming the Customer extensibility from ECC to Clean Core Transformation
Day 2
15. SAP Business AI
Afternoon AI
INTERNAL – SAP and Partners Only 9

## PDF page 8
Index
Index
Agenda - 5 Days remote
1. Introduction - Clean Core > Extensibility
2. SAP S/4HANA Cloud Private Edition extensibility model overview
• 2.1 SAP S/4HANA Cloud Private Edition - new Clean Core Level concept (Levels A, B, C, D)
Extensibility
• 2.2 Example of Clean Core Levels for the objects of a system conversion
Day 1
Framework
3. Level A - On-stack extensibility
• 3.1 Key User extensibility What are the
extensibility
• 3.2 Classic ABAP x ABAP Cloud
alternatives
4. Level A - Side-by-Side extensibility in SAP BTP
5. Non-released x Released objects
6. How to consume Non-released objects and APIs in ABAP Cloud - Wrappers
Day 2
7. Certification of Partner Solutions following Clean Core
8. Architects transition from Classic ABAP to Level A
Guidelines and
9. Avoid extensions when possible Methodologies
10. Layering of Key User Extensibility and Developer Extensibility
Day 3 How to choose
11. How to define the best extensibility option for a specific scenario and SAP AEM
the best
12. RISE with SAP Methodology, SAP Activate and Cloud ALM alternative
Day 4
13. Clean Core extensibility Governance and Processes
Governance &
14. Transforming the Customer extensibility from ECC to Clean Core Transformation
Day 5 15. SAP Business AI
AI
INTERNAL – SAP and Partners Only 10

## PDF page 9
Day 1 Attendance check
https://forms.office.com/Pages/ResponsePage.aspx?id=bGf3QlX0PEKC9twtmXka91LKZMutGCFBltT9ZrQ0rTJURUhQMk5XMVdIOVQ2U05EQ0RRMkZEVFlaMC4u&r6f1961c85f51448587512a10c14b8a12=00014216
1. Scan the QR code
2. Enter your name, email,
SUSER and company
3. Submit
Please don't modify the
EventID prefilled value)
INTERNAL – SAP and Partners Only 11

## PDF page 10
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
INTERNAL – SAP and Partners Only 13

## PDF page 11
AI is everywhere. Results aren't
Three gaps are keeping AI stuck in pilot.
42%
Lack of Lack of Lack of
business & data connection governance & Report data access & quality
issues as leading barrier
process context & integration reliability
Generic models can read your AI is added on top of AI that can’t be audited or
data. They can't reason over disconnected, outdated controlled becomes a risk
how your business actually runs. systems. for your business. 74%
of orgs stuck in pilot mode with
The providers promising to fix this don't have the foundation to do so
no path to scale
Most AI providers are building from the outside in
Layering intelligence on top of systems they don't own, data they didn't generate, processes they've never run.
PPUUBBLLIICC 1144

## PDF page 12
What AI needs to actually deliver value.
SAP already has it
Deep Process & Semantically Rich Enterprise-Grade
Industry Knowledge Business Data Governance
50 years of process & industry intelligence Data enriched with operational AI for enterprise deployment,
encoded in our applications, knowledge business context in a suite-wide managing the full Agentic AI lifecycle
graph and LLMs semantic model securely and reliably out-of-the-box
>120 Mission-critical 7.3M data fields covered by
100% of AI workloads covered
processes covered SAP Knowledge Graph
by certified controls1
PPUUBBLLIICC 1 ISO 42001 AI management system; ISO 27001 Security Management System; ISO 9001 Quality Management System 1155

## PDF page 13
The Beginning of Better.
Welcome to the
Autonomous Enterprise
People set the direction. AI executes.
What are we solving today?
INTERNAL – SAP and Partners Only 16

## PDF page 14
Key elements of the
Autonomous Enterprise
1 Joule as the new engagement layer, bringing together data,
workflows, and agents across SAP systems and beyond
2 SAP Autonomous Suite to reinvent how enterprises run,
based on AI assistants and agents executing work E2E
3 Industry AI embeds the process knowledge, compliance
rules, and data models specific to your industry
4 SAP Business AI platform delivering business context,
unified data, models, and enterprise-grade governance
5 Accelerate the evolution to an Autonomous Enterprise with
agent-led transformation, delivered through RISE and GROW.

## PDF page 15
SAP Saphire 2026
https://partneredge.sap.com/en/partnership/events/sapphire.html
INTERNAL – SAP and Partners Only 18

## PDF page 16
RISE with SAP - New L1 presentation
https://partneredge.sap.com/en/solutions/rise-with-sap/sell.html
https://partneredge.sap.com/en/library/assets/partnership/dgl/10/72/SAP881072.html
INTERNAL – SAP and Partners Only 19

## PDF page 17
Webinar: Partner Learning Accelerator: SAP certified - Positioning the Autonomous
Enterprise - Jul.01.2026
INTERNAL – SAP and Partners Only 20

## PDF page 18
ECC > SAP Cloud ERP Private (SAP S/4HANA Cloud Private Edition)
C S A e
T
R R P W
M
M M O M
PS FI
SD EC
MM CO
PP IM
SAP ERP
QM TR
PM CA
1 Joule as the new engagement layer, bringing together data,
PA BC
workflows, and agents across SAP systems and beyond
PD IS
2 SAP Autonomous Suite to reinvent how enterprises run,
based on AI assistants and agents executing work E2E
• Monolithic on premise solutions
• Multiple integration technologies
3 Industry AI embeds the process knowledge, compliance
• High-maintenance rules, and data models specific to your industry
• Difficult to upgrade
4 SAP Business AI platform delivering business context,
unified data, models, and enterprise-grade governance
5 Accelerate the evolution to an Autonomous Enterprise with
agent-led transformation, delivered through RISE and GROW. 21
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 19
ECC > SAP Cloud ERP Private (SAP S/4HANA Cloud Private Edition)
C S A e Innovation
T
R R P W
M
M M O M
+
Keep the
PS FI
SD EC Business Value
lights on
MM CO
PP IM
SAP ERP
creation
QM TR
PM CA
1 Joule as the new engagement layer, bringing together data,
PA BC
workflows, and agents across SAP systems and beyond
PD IS
2 SAP Autonomous Suite to reinvent how enterprises run,
based on AI assistanCts laenda agnen tsC exoecurtieng work E2E
• Monolithic on premise solutions
• Multiple integration technologies
3 Industry AI embeds the process knowledge, compliance
Ensure that business-critical systems remain agile,
• High-maintenance rules, and data models specific to your industry
cost-efficient, and ready to adopt innovations that
• Difficult to upgrade
4 SAP Business AI platfdorrmiv dee lgiverroinwg bthusiness context,
unified data, models, and enterprise-grade governance
5 Accelerate the evolution to an Autonomous Enterprise with
agent-led transformation, delivered through RISE and GROW. 22
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 20
Clean Core Customer Success Story
Cloud ERP Private Greenfield in the Headquarters and Two-Tier ERP for some local subsidiaries
Industry - High-Tech | Country – Japan | Employees – 12,717 | Business Transformation Project
Revenue – Yen 577 B
• Speed up the business
• Business expansion
• 94% fewer SAP ERP
“Our new policy is to fit our business processes • Improve Cash Conversion Cycle
add-ons decreased
to standard as much as possible, reducing our from over 9,000 to
need for customizations.” 520
“ • 18x faster handling
Before
of solution updates Dimension
Clean Core Core
• Yearly ERP version
“We previously upgraded our instance of the SAP Every 5
upgrade cycle, lower Annual
ERP application every five years, with the project years
project times and
taking about 18 months from preparation to
costs
Over a year 30 days
implementation. We now perform major upgrades
• 1 month time spent
of SAP S/4HANA Cloud, private edition for our
on upgrading ERP
domestic company yearly and minor upgrades
versions cut from one
twice a year. We’ve also cut the time from and a half years to
• Increase in operating expenses
preparation to switchover to around one month..” approx. one month
• Slow response to new technology
Yuri Yasuda, • Difficult to adapt to rapid change
Manager, Corporate DX Dept.
Link to value story
23
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 21
Clean Core Customer Success Story
(Reference Customer that participated in a SAP Customer Conversations event on July/2025)
Cloud ERP Private Brownfield implementation
• Converted to S/4HANA on premise on 2020 and moved to Cloud ERP Private on 2024
• Customer feedback summary: In a brownfield scenario, clean core is a journey. It's not an overnight thing. Major
things on the clean core actually started after S/4HANA conversion. We did not do a significant process
standardization with the Brownfield project, but over time we got definitely some opportunities from S/4HANA with
the new modules and capabilities. I would say 10 to 15% we were able to standardize
Topic Before Conversion Post Conversion Comments
User Interface SAPGUI • 100% Fiori • With Fiori, it’s easier to adopt SAP Innovations
• Started the prototyping of Joule • Easy to connect UI
• Use of Webgui in Fiori for some exceptions
where a Fiori App is not available yet
Extensions and Classical extensions • Adoption of CDS views, Fiori Analytical Apps and
Integration and integration SAC
• Clean Core for new extensions and integrations
✓ On stack: Key user extensibility, ABAP Cloud
✓ BTP: SAP Business Application Studio, SAP Build
suite, ABAP Cloud, IAS
Processes 70% standard x 85% standard x • Example: EWM replaced many extensions
30% customization 15% customization • Adoption of SAP Innovations in every new
release
Upgrade 14 months (ECC 3 months (including the analysis of the new capabilities
EHP06 to EHP08) that will be adopted to provide value delivery to the
business and eventual deprecation of objects)
24
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 22
Clean Core Customers Reference Video
https://www.sap.com/cmp/wlp/rise-into-the-future-webinar-series/index.html#customer-showcases
Nippon Sanson
Cimpress USA
Europe
Brownfield
Greenfield
Upgrade done in 10 weeks
Upgrade done in 3 weeks
25
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 23
Clean core refers to a set of guiding
principles that support continuous business
transformation by fostering agile,
innovative, and efficient ERP systems.
What is
clean core?
The principles focus on building resilient
business processes and extensions,
supported by seamless integration, efficient
operations, and high data quality.

## PDF page 24
The five guiding principles
Keep competitiveness while 1
Business processes
reducing complexity.
Five clean core principles ensure that
business-critical systems remain agile, cost- Decouple extensions 2
Extensibility
efficient, and ready to adopt innovations from the standard core.
that drive growth.
Control data according
3
By adopting standard processes, while Data
to the latest standards.
incorporating stable extensions and
integrations for differentiating processes,
the clean core principles help customers Keep the system landscape
4 Integration
reliable and flexible.
flexibly adapt to changing business
requirements and adopt new capabilities.
Keep the operations
5
Operations
effective and efficient.
27
© 2025 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 25
Clean core rules for extensions to support smoother SAP software updates
SAP S/4HANA Cloud Private Edition,
and on-premise
Expectation management – no magic!
Upgrade projects will not go away
This is not the public cloud.
❖ Easier frequent upgrades
GOAL
❖ Future-safe extensions
Follow the public cloud extensibility rules
whenever possible (Clean core approach)
PUBLIC 28
