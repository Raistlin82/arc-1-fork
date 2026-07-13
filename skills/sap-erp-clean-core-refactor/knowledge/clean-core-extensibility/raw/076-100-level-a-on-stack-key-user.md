---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 76
page_end: 100
topic: level-a-on-stack-key-user
---

# Clean Core Extensibility - pages 76-100

## PDF page 76
Q & A

## PDF page 77
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
INTERNAL – SAP and Partners Only 84

## PDF page 78
Clean core extensibility model - Level A > On-stack extensibility
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
INTERNAL – SAP and Partners Only 85

## PDF page 79
SAP Build
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
INTERNAL – SAP and Partners Only 86

## PDF page 80
Developer and Key User extensibility
Developer Extensibility Key User Extensibility
Developer
ABAP Cloud development Custom fields and tables,
model to build SAP Fiori customer analytics • Create and change complex business logic
• Rich, modern IDE functionality, including
apps, services, and and forms, …
debugging, code checks, quality tools
extensions. Supports y
t • Support of big projects and teams
transactional, analytical, and i x
e
integration scenarios l
p
m
High developer productivity Web-based key user tools
o
• Performing simple tasks in an easy way
c
with Eclipse-based ABAP
k • Easy to use and lifecycle stable
development tools s
a • WYSIWYG and instant testing included
T
• Low entry barrier
Based on stable extension points and APIs Key user, business expert,
implementation consultant
Clean Core compliant by definition
Feature richness
INTERNAL – SAP and Partners Only 87

## PDF page 81
Developer and key-user extensibility: Feature overview
Developer extensibility Key-user extensibility
UI adaptation project UI adaptation mode
(SAP Business Application Studio) (SAP Fiori Launchpad)
Extension field Extension field
(ABAP development tools – editors and wizard) (Custom Fields SAP Fiori app)
RAP Business Object Custom business object
(ABAP development tools – editors and wizard) (Custom Business Objects SAP Fiori app)
CDS view and OData service CDS view and OData service
(ABAP development tools – editors and wizard) (Custom CDS views SAP Fiori app)
Analytical query and applications Analytical query and applications
(ABAP development tools – editor; SAP Analytics Cloud) (SAP Fiori apps, SAP Analytics Cloud)
… …
INTERNAL – SAP and Partners Only 88

## PDF page 82
Developer and key-user extensibility: Layering
Key-user objects
• Are fully managed by key user extensibility tools
Key-user extensibility objects
• Can be displayed and debugged, but cannot be
edited with ABAP development tools
Access for selected scenarios
• Are separated by name range, software
component, and ABAP package
Developer extensibility
objects Access between key user and developer
extensibility objects is restricted
(see documentation).
INTERNAL – SAP and Partners Only 90

## PDF page 83
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
INTERNAL – SAP and Partners Only 91

## PDF page 84
Motivation for Key User Extensibility
Key User Extensibility
“Key User extensibility” refers to the possibility to customize applications and their UIs, reports, email templates, and form
templates. Using extensibility apps, you can create extensions without the need for extensive coding skills.
Scenario: Smaller low/no-code extensions
Use cases:
• UI field layout like small changes to existing apps, custom forms, and templates
(adding new fields, for example)
• Custom analytics
Benefits
• Fully managed and integrated in solutions
• No development skills required
• Upgrade stable
Disadvantages
• More challenging to meet complex requirements
• Restricted ABAP Language for custom logic
Refer to Key User Extensibility Overview
INTERNAL – SAP and Partners Only 92

## PDF page 85
Motivation for Key User Extensibility in SAP S/4HANA
Key User - Organizational Considerations
How to organize and manage Key User extensibility
Decide where you will make the change
Know your key user extension options
• Some key user extensions are best made in
• Key user extensions are least effort and
development, some in production
upgrade-safe
• Consider governance and transport needs
• Refer to ABAP Platform - Key User
Extensibility
Start easy and build your skills
Decide who makes what type of change
• Not every app supports key user extensions
• Key user extensions can be used by your business
but many do
SMEs, your functional consultants, AND/OR your IT
• Try out different techniques and build skills
team, including developers
within your team
• Refer to What is Key User Extensibility and who are
your key users
Refer to ABAP Platform - Key User Extensibility
INTERNAL – SAP and Partners Only 93

## PDF page 86
SAP S/4HANA Key User Extensibility Scenarios
SAP Fiori
Fiori LauFciohrpi aLadunchpad
I6 Custom UI collection of apps with a simple and easy-to-
use experience for broadly used SAP software
Custom User User Interface
functions that work seamlessly across devices –
Interface (Fiori) (Fiori)
desktop, tablet, and smartphone.
I1 UI Adaptation
Frontend
Backend: ABAP Server
OData (Open Data Protocol)
OData Service OData Service OData
OASIS standard that defines the best practice for
building and consuming RESTful APIs.
s
tc
e
jb
O s I3 Analytics / Forms
s
s
d
le
e
n is
u (
A
A
p
B
p
A
l
P
ic
|
a
C
ti
D
o
S
n
)
iF
m
o (
A
A
p
B
p
A
l
P
ic
|
a
C
ti
D
o
S
n
)
CDS (Core Data Services)
B
m
ts
u
o C modeling environment, which provides a data
ts I4 Business Logic
u
C definition language (DDL) for defining
semantically rich database tables/views (CDS
2
I
entities) in the database. The enhancements
5 Database Table Database Table
I include annotations, associations, and (SQL)
expressions.
SAP Key User Extensibility
INTERNAL – SAP and Partners Only 94

## PDF page 87
Key User extensibility options
Low code adaptations and extensions
For key users, business
20 UI adap20tations Key perf2o0rmance
Key us2e5r tools 25 25 experts, implementation
at runtime indicators (KPIs)
consultants
Performing simple tasks in an
easy way
Easy to use and lifecycle stable
WYSIWYG and instant testing
included
Custom 2a0nalytical Custom20 logic & 20 Custom 2b0usiness
25 25 Custom2 5reports 25 Low entry barrier
queries workflow logic
Web-based key user tools
Based on stable extension
points and APIs
Custom 2b0usiness Custom20 fields 20 20
25 25 Custom C25DS views Custom25 forms
objects & tables
INTERNAL – SAP and Partners Only 95

## PDF page 88
Key User extensibility - For more Details, see the Appendix
INTERNAL – SAP and Partners Only 96

## PDF page 89
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
INTERNAL – SAP and Partners Only 97

## PDF page 90
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
INTERNAL – SAP and Partners Only 98

## PDF page 91
The ABAP Cloud model combines
Cloud technologies
• ABAP Cloud Language Version
• ABAP RESTful application programming model
• SAP Fiori UX
• ABAP development tools
• Generative AI–enabled development
Clear separation between SAP code and custom code
Public extension points, local APIs, and remote APIs
Cloud-ready and clean core
by default
INTERNAL – SAP and Partners Only 99

## PDF page 92
The evolution to ABAP Cloud
ABAP Cloud
SAP BTP*
ABAP SAP S/4HANA Cloud
SAP S/4HANA environment ABAP environment
2012 2015 2018 2022 2024 2025
ABAP objects, ABAP ABAP supports Cloud-ready Cloud-ready Integration SAP Joule for
ABAP unit, development ABAP extensions ABAP extensions on into SAP Build Developers,
• SAP HANA
the internet, tools for on SAP BTP SAP S/4HANA Cloud ABAP AI
• SAP Fiori
internal tables Eclipse (ADT) and SAP S/4HANA capabilities
• Core Data Services
ABAP RESTful
without header line
• Cloud
Application
• Key user extensibility
Programming model
(RAP)
INTERNAL – SAP and Partners Only * SAP Business Technology Platform 100

## PDF page 93
ABAP Cloud development model
One development model for SAP S/4HANA and SAP BTP
On-stack Side-by-side
- TIGHTLY coupled LOOSELY coupled -
extensibility extensibility
SAP S/4HANA SAP S/4HANA Cloud, SAP S/4HANA Cloud, SAP BTP,
any premise 1 private edition 1 public edition 2 ABAP Environment
ABAP Cloud development model
to build cloud-ready business apps, services, and extensions
Classic ABAP development model
1 SAP S/4HANA any premise or SAP S/4HANA Cloud, private edition release ≥ 2022
2 SAP S/4HANA Cloud, public edition release ≥ 2208, 3-system landscape required
Refer to ABAP Cloud - Technical Use Cases and Recommended Technologies 101

## PDF page 94
ABAP Cloud map
ABAP Cloud
SAP Fiori apps
App
Analytical apps
B D
im
u o s
p
m in
le
a e i
m
n s e s -
e
x s s
n
p p e
t
o e
a
r s v c
t
u
i
i i
o
c f r i
n
e e c for SAP Fi ( o O U r D i I a a s t n a e d C a r D a n v n d S ic a 2 In l e e y A s t n 1 ic t ) i a ty l , c R li A e D n P
D
o t 3 s m
o
B
m
u a s i i
a
n n
i
e
A
-
n
s s
B -
s p
s A
O
p
e
P
b c
, e C
j i e
c
f
D
c i
i
c
f
t
S i
,
c
( C m O D
l
D o
o
S a d
g
t a a f
i
e n , o
c
b l a r s u l p y I s n t r in i o c t e c e a s e l g s s p r e s r a v o a e t v n n i i o d t d s n e , d H r a s T t e T a P r in , v S t i e O c g A e r P a s , t R io F n C, SQL) IA e v it a r e n e G 9 s s r e e i p ti
o
lib
le
a
v
p
e
a
d
c
r
I
o
A
f
P
e l
A
u
B
o
– A
J
, 8 9 n o ita r K g i D m S
e
IA
d o
P
c
A
m
B A
o t
d
s
n
u
a
c
s e ir a r b il d n a s e c iv r e s e
s u e R
... ,O C X ,.s b o j ,tn e m e g a n a m tu
p tu O
s e it il a u t l q iu n B -i ... ,y tir u c e s ,y tilib is n e tx e ,5 C B
,4 M A I ,s s e n id a e r
t n e m e e lc g y a c n e a f m iL m e ts y s
tr o p s n a r t d n a
t i
e
G
g
,) S p S T a T C b C a g ( , s l o o T
6 7
s lo o t g n ir o tin o m d n a r e s u
S
y
T A
e
D B k A , ,
d- n
SAP HANA Business service Integration services u o lC a h c
Database (SQL and SQLScript) for process and data integration
consumption
(OData, business events, HTTP, SOAP, RFC, SQL)
1 Information access / 2 Core Data Services / 3 ABAP RESTful application programming model / 4 Identity & Access Management / 5 Business Configuration / 6 ABAP Development Tools /
7 Business Application Studio / 8 Planned to be available in future releases / 9 Available for SAP S/4HANA Cloud Public Edition and SAP BTP ABAP environment
INTERNAL – SAP and Partners Only 105

## PDF page 95
Printscreen of an ABAP Cloud Sample Scenario
INTERNAL – SAP and Partners Only 106

## PDF page 96
Screenshot 01/11 - Table
INTERNAL – SAP and Partners Only 107

## PDF page 97
Screenshot 02/11 - CDS View - Interface View
INTERNAL – SAP and Partners Only 108

## PDF page 98
Screenshot 03/11 - CDS View - Consumption View
INTERNAL – SAP and Partners Only 109

## PDF page 99
Screenshot 04/11 - Behaviour Definition
INTERNAL – SAP and Partners Only 110

## PDF page 100
Screenshot 05/11 - Behaviour Implementation
INTERNAL – SAP and Partners Only 111
