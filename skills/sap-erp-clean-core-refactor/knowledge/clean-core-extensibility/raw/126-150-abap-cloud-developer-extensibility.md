---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 126
page_end: 150
topic: abap-cloud-developer-extensibility
---

# Clean Core Extensibility - pages 126-150

## PDF page 126
Blog: ABAP development tools for Visual Studio Code is now available on the VS Code marketplace!
https://community.sap.com/t5/technology-blog-posts-by-sap/abap-development-tools-for-visual-studio-code-is-now-available-on-the-vs/ba-p/14402120
INTERNAL – SAP and Partners Only 140

## PDF page 127
Classic ABAP x ABAP Cloud

## PDF page 128
Classic ABAP ABAP Cloud
Higher effort maintenance and testing after Upgrades without side-effects,
upgrades (if there are Levels C and D objects) very little to no testing
SAP S/4HANA Cloud Private Edition SAP BTP SAP S/4HANA Cloud Private Edition SAP BTP
On-stack Side-by- side On-stack Side-by- side
extension extension extension extension
Extend with ABAP
Extend with ABAP Cloud, CAP, or low-
Cloud (SAP Build) code/no-code tools
SAP S/4HANA SAP S/4HANA
(SAP Build)
applications applications
Finance Classic Finance
Sales Sales
ABAP
Procurement Procurement
for S/4HANA
Manufacturing Manufacturing
… …
Extensions are
S/4HANA
compliant
(distributed in
Levels B, C, D)
143
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 129
From Classic ABAP to ABAP Cloud
144
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 130
From classic ABAP to ABAP Cloud: End-user perspective
Classic UX SAP Fiori UX
Dynpro, Web Dynpro, Business Server Pages, and more Simplified and harmonized UX. Role-based design. Responsive and adaptive UI.
Dynpro UI – e.g. ALV
Learn more
145
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 131
Main differences between classic ABAP and ABAP Cloud
Classic ABAP development ABAP Cloud development model
Not cloud-ready and minimum upgrade stability Cloud-ready, upgrade-stable, future-proof, enabled by generative AI
Extremely flexible and powerful, but not public cloud-ready Powerful for building fully clean core-compliant apps, services,
by default and limited to on-premises and private cloud and extensions both on-stack and side-by-side
All SAP objects, APIs, and implicit extensions points Only public SAP objects, APIs, and extension points
can be used in custom code and to extend SAP apps can be used in custom code and to extend SAP apps
SAP objects can be modified SAP objects cannot be modified
≠
Clear separation between SAP code and extension code
No clear separation between SAP code and extension code
checked by the ABAP compiler
Use of proven cloud technologies and client-side UI technologies
Use of proven and mature, but not cloud-ready,
such as cloud-optimized ABAP language, core data services,
server-side UI technologies
ABAP RESTful application programming model, and SAP Fiori
SAP software changes lead to high test and adaptation efforts, SAP software changes lead to low test and adaptation efforts,
typically resulting in fewer upgrades enabling easier, more frequent upgrades
Slow agility and innovation speed Increased agility and innovation speed
146
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 132
Your learning path to become ABAP Cloud developer
Learning Journey: Certification: ABAP Dev4S4C Badge
Go through
• Acquiring Core ABAP Skills Cloud *
Enablements/Work Hands-on
• Practicing Clean Core Extensibility
For SAP Ss/4hHoANpAs Cloud workshop
Beginner
And as a support
ABAP Cloud Partner Get
Certified Academy
Link
Experienced
Delta Content
ABAPer
* C_ABAPD | SAP Certified Associate - Back-End Developer -
ABAP Cloud
Check SAP Certifications to get more information on the certification status and find the recommended
alternative for retired certifications and SAP Certification Recommendation.
More SAP training and certification opportunities:
www.sap.com/education
INTERNAL – SAP and Partners Only 151

## PDF page 133
How to practice ABAP Cloud?
System
You can use ABAP cloud in any BTP, ABAP
Environment (also free tier or trial environment)
as well as in every SAP S/4HANA release >2022
Examples
• Tutorials
• RAP Workshops (RAP100 etc.)
• Videos on Tutorials, e.g. from Devtoberfest (also
available in Youtube Playlist)
• Sessions on TechEd or ABAPConf
INTERNAL – SAP and Partners Only 152

## PDF page 134
Further information
Clean Core Extensibility for SAP S/4HANA Cloud | SAP white paper
Extend SAP S/4HANA in the cloud and on premise with ABAP-based extensions | SAP white paper
ABAP Cloud Development Guide | SAP help documentation
ABAP RESTful Application Programming Model (RAP) | What’s New? | SAP Community topic page, SAP help documentation
ABAP road map information | For ABAP-based products and ABAP Cloud
Acquire Core ABAP Skills | Practicing Clean Core Extensibility for SAP S/4HANA Cloud | SAP Learning Journeys
Public SAP websites
ABAP Development Community: www.sap.com/community/topic/abap.html
ABAP Extensibility Community: https://pages.community.sap.com/topics/abap-extensibility
ABAP Testing and Analysis Community: https://community.sap.com/topics/abap-testing-analysis
SAP BTP ABAP environment Community: https://community.sap.com/topics/btp-abap-environment
SAP S/4HANA Cloud ABAP environment Community: https://community.sap.com/topics/s4hana-cloud-abap-environment
SAP products: www.sap.com/products
SAP training and certification opportunities
www.sap.com/education: for example, courses S4D400, S4D430, S4D437, and HA400
https://learning.sap.com/: for example, search for ABAP or ABAP Cloud
SAP Certified Associate—ABAP Cloud Back-End Developer
153

## PDF page 135
Day 1 Feedback
Virtual version of the training
Language
Selection
https://surveys-platform.cfapps.us10.hana.ondemand.com/survey/ccea-day-1-virtual-english-2026-07
Adoption of Clean Core Extensibility in Customers
1.
Which topics covered today were new to you
2.
Free text for comments
3.
Your feedback is very important for us to improve this new training
•
Feedback is anonymous and takes about 5 minutes
•
Thank you very much!
155

## PDF page 136
Q & A

## PDF page 137
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
PUBLIC 158

## PDF page 138
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
INTERNAL – SAP and Partners Only 159

## PDF page 139
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
INTERNAL – SAP and Partners Only * SAP Build Apps Deprecation and The Path Forward 160

## PDF page 140
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
INTERNAL – SAP and Partners Only 162

## PDF page 141
SAP Build is an . . .
AppDev and automation
solution that spans low-code,
pro-code, and generative AI.

## PDF page 142
Capabilities vs Products
*
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 164

## PDF page 143
Begin your extension journey today with SAP Build
Get started Start your free trial of SAP Activate your Build entitlements
at no cost Build now included in your RISE for SAP offering
Learn more Visit SAP Build Page Try the SAP Build Learning journey
Explore pre-built content for
Accelerate
SAP S/4HANA from the SAP
development
Build
INTERNAL – SAP and Partners Only 165

## PDF page 144
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
INTERNAL – SAP and Partners Only 166

## PDF page 145
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
INTERNAL – SAP and Partners Only 167

## PDF page 146
Partner BTP Enablement & Coaching Overview
https://dam.sap.com/mac/app/p/pdf/asset/preview/S8Dv58K?ltr=a&rc=10&doi=SAP1279970
INTERNAL – SAP and Partners Only 168

## PDF page 147
Partner BDC Enablement & Coaching Overview
https://dam.sap.com/mac/app/p/pdf/asset/preview/XPFjPZs?ltr=a&rc=10&doi=SAP1279244
INTERNAL – SAP and Partners Only 169

## PDF page 148
Partner AI Enablement & Coaching Overview
https://dam.sap.com/mac/app/p/pdf/asset/preview/V2xj915?ltr=a&rc=10&doi=SAP1279508
INTERNAL – SAP and Partners Only 170

## PDF page 149
Day 2 Attendance check
https://forms.office.com/Pages/ResponsePage.aspx?id=bGf3QlX0PEKC9twtmXka91LKZMutGCFBltT9ZrQ0rTJURUhQMk5XMVdIOVQ2U05EQ0RRMkZEVFlaMC4u&r6f1961c85f51448587512a10c14b8a12=00014216
1. Scan the QR code
2. Enter your name, email,
SUSER and company
3. Submit
Please don't modify the
EventID prefilled value)
INTERNAL – SAP and Partners Only 171

## PDF page 150
Low-code applications
Workflows and automations
Digital workspaces
