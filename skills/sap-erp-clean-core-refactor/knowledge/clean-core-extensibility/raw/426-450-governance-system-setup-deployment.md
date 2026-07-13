---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 426
page_end: 450
topic: governance-system-setup-deployment
---

# Clean Core Extensibility - pages 426-450

## PDF page 426
Clean Core measurement framework
The clean core measurement framework enables customers to successfully advance
toward a clean core by assessing their governance and maturity, defining concrete
actions, and continuously tracking their success using clean core KPIs.
Process Clean core measurement framework
1 Governance & 2 KPIs
Extensibility
maturity
Measure clean core
Recommendations Data adherence both
Governance & maturity1 KPIs2
regarding tools, during a project and
governance structures like Integration in ongoing operations,
SSB, and expertise based on analysis of
required to get and system data and
Operations
stay clean. collected metrics.
Extensibility KPIs
1. Clean core share
RISE with SAP Methodology RISE with SAP Methodology 2. Technical debt score
clean core advanced q-gates Dashboard 3. Unused code share
4. (Business) modifications
RISE with SAP Methodology
INTERNAL – SAP and Partners Only 503

## PDF page 427
Clean Core Measurement Framework - Governance and Maturity
Detailed information
Check the Clean Core Measurement Framework - Governance
and Maturity
SAP Clean Core Measurement Framework - Governance and
Maturity
IPNUTBELRINCAL – SAP and Partners Only 504

## PDF page 428
Clean Core Extensibility - Governance & Maturity Practices
Extensibility Governance
EXT-GOV-01 - Governance Process for EXT-GOV-02 - Extension Architecture
EXT-GOV-03 - Development Guidelines
Extensions Guidelines
Documented, board-backed governance process Extension guidance that prefers level A, drive on- Development guidance that drive architects to favor
for extensions that enforces clean core architecture stack or side-by-side objectively, enforces released SAP BTP side-by-side and ABAP Cloud, enforce
choices and tracks decisions and technical debt APIs, and strictly documents exceptions and released APIs with governed exceptions, and
technical debt. control deviations
EXT-GOV-04 - Developer Skills &
EXT-GOV-05 - Measurements & KPIs EXT-GOV-06 - Housekeeping Practice
Enablement
Ensure teams have SAP BTP and ABAP Cloud Define and track KPIs via RISE with SAP dashboards Regular usage analysis, scheduled code checks,
expertise, certifications, structured enablement, and and monitor technical debt and usage and planned remediation to retire unused code and
clear skill requirements to deliver clean core proactively reduce technical debt
extensions
System Setup
EXT-SYS-01 - Automated Code Checks EXT-SYS-02 - Exemption Process EXT-SYS-03 - ABAP Cloud Software Component
Automated Code Checks enforce Clean Core and Exemption Process allows controlled ATC ABAP Cloud Software Component enforces a clean,
ABAP Cloud rules by running aligned ATC variants exceptions with assigned approvers, time limits, and separated structure for Level A extensions, limits
regularly and blocking noncompliant code at restricted scope, ensuring exemptions stay specific, classic ABAP creation, and improves transparency
transport release governed, and aligned with Clean Core and maintainability of extension architecture
EXT-SYS-05 - SAP BTP Account for Side-by-Side
EXT-SYS-04 - Usage Data Collection
for Extension Creation
Usage Data collection with SCMON, aggregation SAP BTP Account setup to enable side-by-side
with SUSG and Online Collectors / SAP Early Watch extensions, backend integration and active use of
Alert extractors operational. RISE with SAP SAP Build low-code and pro-code tools
INdTEaRNsAhL –bSAoP aanrdd Pa rgtnievrse Onsly system-wide usage visibility 505

## PDF page 429
Clean Core Extensibility
Governance & Maturity - Result
CURRENT SCORE TARGET SCORE
Clean Core Extensibility Score
<0-5> <0-5>
Practices Importance Current Score Target Score
Maturity of Governance Process for Extensions High <0-5> <0-5>
Maturity of Extension Architecture Guidelines High <0-5> <0-5>
Governance
Maturity Maturity of Development Guidelines High <0-5> <0-5>
<0-5>
Maturity of Developer Skills & Enablement High <0-5> <0-5>
Maturity of Measurements & KPIs High <0-5> <0-5>
Maturity of Housekeeping Practice Medium <0-5> <0-5>
Practices Importance Current Score Target Score
Setup of Automated Code Checks High <0-5> <0-5>
System Setup Setup of Exemption Process High <0-5> <0-5>
<0-5>
Setup of ABAP Cloud Software Component High <0-5> <0-5>
Setup of Usage Data Collection High <0-5> <0-5>
Setup of SAP BTP Account for Side-by-Side Extension Creation High <0-5> <0-5>
INTERNAL – SAP and Partners Only 506

## PDF page 430
Example: Result of Maturity Assessment
INTERNAL – SAP and Partners Only 507

## PDF page 431
Governance Practices - Extensibility Governance - 1/2
EXT-GOV-01 - Governance Process for EXT-GOV-02 - Extension Architecture
EXT-GOV-03 - Development Guidelines
Extensions Guidelines
• Continuity: Existence and • Presence and adoption of extension • Provides standardized guidelines
completeness of a documented, end-to- architecture guidance (e.g., SAP prioritizing side-by-side extensions via
end governance process for extension Application Extension Methodology) SAP BTP and ABAP Cloud in case of
lifecycle (from request to deployment) on-stack developments
• Consideration of the clean core level
• Guidance: Availability of structured concept and preference of level A • Ensures use of released APIs and
guidance for selecting appropriate extensions defines processes for exceptions
extension architecture and models (incl.
• Objective, documented criteria for • Incorporates automated code checks
SAP Extension Methodology)
choosing On-Stack vs. Side-by-Side and supports modern development
• Standardization: Use of standardized extensions technologies
criteria and documented reasoning
• Guidance encourages use of released • Documents code review and exemption
(decision assets for justification of
APIs and defines an exception process processes for unreleased SAP objects
architectural choices)
for utilizing classic APIs or internal
• Outlines procedures for managing
• Approval Process: Presence of objects
deviations and mitigating missing APIs
formal, board-linked approval
• Strong governance and documentation
processes for extensions (incl. handling
for architecture decisions and exception
exceptions like modifications etc.)
approvals to be aware of technical debt
• Documentation: Consistency in created
recording decisions, approvals,
justifications, and technical debt
INTERNAL – SAP and Partners Only 508

## PDF page 432
Governance Practices - Extensibility Governance - 2/2
EXT-GOV-04 - Developer Skills &
EXT-GOV-05 - Measurements & KPIs EXT-GOV-06 - Housekeeping Practice
Enablement
• Evaluates developers’ experience with • System KPIs are defined and tracked • Regularly assess and act on code
SAP BTP and ABAP Cloud (especially regularly to assess system status, e.g. usage data to identify and retire unused
on-stack development) via the RISE with SAP Methodology code
dashboard
• Assesses the percentage of certified • Perform scheduled code quality checks
developers and architects in the team • Goals are set using KPIs, aligned with to maintain system health
management objectives
• Checks for the existence of a structured • Establish actions and timelines to
enablement plan for modern extension • KPI achievements are linked to resolve code errors identified during
technologies developer/architect goals checks
• Considers qualification and certification • KPIs address key extensibility aspects • Proactively reduce technical debt
criteria for hiring internal and external such as technical debt, modifications, through planned housekeeping
developers and object usage activities
• Reviews formal requirements for lead
developers' technology skills
INTERNAL – SAP and Partners Only 509

## PDF page 433
Governance Practices - System Setup - 1/2
EXT-SYS-03 - ABAP Cloud Software
EXT-SYS-01 - Automated Code Checks EXT-SYS-02 - Exemption Process
Component
• Default ATC check variants including • Exemption process is implemented for • Ensures a dedicated "clean" ABAP
clean-core related checks are defined those ATC findings where no other Cloud software component for new
and maintained option is available developments
• ATC checks are aligned with • Approvers are assigned as per the • Establishes clear package structure to
development and architecture established governance process separate Level A extensions from
guidelines. classic ABAP extensions using classic
• Timely limitations for exemptions are in
APIs or internal objects
• Clean Core and ABAP Cloud place and regularly reviewed
considerations are included in check • Restricts creation of classic ABAP
• Object- or package-wide exemptions
variants objects to designated developers
are governed and restricted
• Regular ATC code checks with those • Promotes transparency and
• Default exemptions are applied at the
variants are performed in the system maintainability in extension architecture
finding level, not generically
• ATC is integrated as a mandatory check
on transport release, e.g., to prevent
erroneous coding from becoming
productive
INTERNAL – SAP and Partners Only 510

## PDF page 434
Governance Practices - System Setup - 2/2
EXT-SYS-05 - SAP BTP Account for Side-
EXT-SYS-04 - Usage Data Collection
by-Side for Extension Creation
• SCMON (or UPL) is activated for • SAP BTP is set up and accessible
system-wide usage data collection across the extension landscape.
• Usage data is aggregated. Preferred • Operational model (e.g., sub-account
way is transaction SUSG in the core structure, responsibilities) is in place
system (production); CCLM extractors
• Defined concept exists for BTP-to-
in SAP Solution Manager serve as
backend connections (e.g., S/4
another option
integration).
• Online Collectors and SAP Early Watch
• SAP Build low-code/no-code and pro-
Alert extractors are operational
code tools are provisioned and in use
• RISE with SAP Methodology
• Developments and prototypes are
Dashboard is set up, running in SAP
actively happening on SAP BTP
Cloud ALM, and accessible to relevant
users
INTERNAL – SAP and Partners Only 511

## PDF page 435
Exercises - Clean Core Measurement Framework - Governance and Maturity
Clean Core Measurement Framework - Governance and Maturity
13-1.1 Clean Core Measurement Framework - 13-1.2 Evaluation of the current score and maturity rating for the Practice
Governance and Maturity guidance “Governance Process for Extensions”
You are defining the Clean Core Extensibility Based on your latest project, simulate the evaluation of the “Current Score” and
Governance process in the Project Preparation phase Maturity Rating of the “Governance Process for Extensions” in the beginning of the
and need to guidance Realize phase.
Download the “Clean Core Measurement Framework -
Governance and Maturity” presentation > Find the
Extensibility Chapter
INTERNAL – SAP and Partners Only 512

## PDF page 436
Clean Core measurement framework
The clean core measurement framework enables customers to successfully advance
toward a clean core by assessing their governance and maturity, defining concrete
actions, and continuously tracking their success using clean core KPIs.
Process Clean core measurement framework
1 Governance & 2 KPIs
Extensibility
maturity
Measure clean core
Recommendations Data adherence both
Governance & maturity1 KPIs2
regarding tools, during a project and
governance structures like Integration in ongoing operations,
SSB, and expertise based on analysis of
required to get and system data and
Operations
stay clean. collected metrics.
Extensibility KPIs
1. Clean core share
RISE with SAP Methodology RISE with SAP Methodology 2. Technical debt score
clean core advanced q-gates Dashboard 3. Unused code share
4. (Business) modifications
RISE with SAP Methodology
INTERNAL – SAP and Partners Only 513

## PDF page 437
Clean Core Advanced Quality Gates
(Planned)
INTERNAL – SAP and Partners Only 514

## PDF page 438
INTERNAL – SAP and Partners Only 515

## PDF page 439
Housekeeping & Monitoring - KPIs
INTERNAL – SAP and Partners Only 518

## PDF page 440
Clean Core measurement framework
The clean core measurement framework enables customers to successfully advance
toward a clean core by assessing their governance and maturity, defining concrete
actions, and continuously tracking their success using clean core KPIs.
Process Clean core measurement framework
1 Governance & 2 KPIs
Extensibility
maturity
Measure clean core
Recommendations Data adherence both
Governance & maturity1 KPIs2
regarding tools, during a project and
governance structures like Integration in ongoing operations,
SSB, and expertise based on analysis of
required to get and system data and
Operations
stay clean. collected metrics.
Extensibility KPIs
1. Clean core share
RISE with SAP Methodology RISE with SAP Methodology 2. Technical debt score
clean core advanced q-gates Dashboard 3. Unused code share
4. (Business) modifications
RISE with SAP Methodology
INTERNAL – SAP and Partners Only 519

## PDF page 441
Clean Core measurement framework
The clean core measurement framework enables customers to successfully advance
toward a clean core by assessing their governance and maturity, defining concrete
actions, and continuously tracking their success using clean core KPIs.
Process Clean core measurement framework
1 Governance & 2 KPIs
Extensibility
maturity
Measure clean core
Recommendations Data adherence both
Governance & maturity1 KPIs2
regarding tools, during a project and
governance structures like Integration in ongoing operations,
SSB, and expertise based on analysis of
required to get and system data and
Operations
stay clean. collected metrics.
Extensibility KPIs
1. Clean core share
RISE with SAP Methodology RISE with SAP Methodology 2. Technical debt score
Clean Core Q-gates Dashboard 3. Unused code share
4. (Business) modifications
RISE with SAP Methodology
INTERNAL – SAP and Partners Only 520

## PDF page 442
Clean Core Measurement Framework - KPIs
Detailed information
Check the Clean Core Measurement Framework - KPIs
SAP Clean Core Measurement Framework - KPIs
IPNUTBELRICNAL – SAP and Partners Only 521

## PDF page 443
Clean core extensibility – KPIs at a glance
As the CIO, I need to
Clean core extensibility KPIs
understand that my
transformation team is
following a clean core
mindset with regard to As the CSO, I need to
extensibility. understand the excess of
unused coding to assess
associated risks.
Clean core share Unused code share
% of code objects per clean core level % of unused custom code
Keep competiti-
veness while reducing
complexity.
2 Extensibility
Technical debt score Business modifications
Score of technical debt per custom object # of business modifications
As Upgrade Project
to SAP standard objects
As the CTO, I need to Manager, I need to
understand the degree of estimate the adjustment
technical debt in the effort caused by modified
extensions of my SAP standard objects
organization. RISE with SAP Methodology during upgrade events.
RISE with SAP Methodology Clean Core Q-gates | RISE with SAP Methodology Dashboard
INTERNAL – SAP and Partners Only 522

## PDF page 444
Extensibility KPIs overview
KPI Operational Upgrade
category risks stability
Clean core Unused code Business
KPI Technical debt score
share share modifications
Weighted score
determined by amount Usage information of all Overview of modifications
Identify all Level A Identify all Level
Metric and priority of findings of ABAP Call Monitor- and their impact on the
objects B / C / D objects
ABAP test cockpit clean compatible objects system
core check
Measurement Online Collectors SAP ABAP test cockpit clean ABAP test cockpit clean Online Collectors SAP Note Online Collectors SAP Note
Note 2947886 core check 2947886 2947886
core check
ABAP Call Monitor (SCMON
and SUSG)
INTERNAL – SAP and Partners Only 523

## PDF page 445
Extensibility KPIs - Detailed Information, see the Appendix
INTERNAL – SAP and Partners Only 524

## PDF page 446
Clean Core measurement framework
The clean core measurement framework enables customers to successfully advance
toward a clean core by assessing their governance and maturity, defining concrete
actions, and continuously tracking their success using clean core KPIs.
Process Clean core measurement framework
1 Governance & 2 KPIs
Extensibility
maturity
Measure clean core
Recommendations Data adherence both
Governance & maturity1 KPIs2
regarding tools, during a project and
governance structures like Integration in ongoing operations,
SSB, and expertise based on analysis of
required to get and system data and
Operations
stay clean. collected metrics.
Extensibility KPIs
1. Clean core share
RISE with SAP Methodology RISE with SAP Methodology 2. Technical debt score
Clean Core Q-gates Dashboard 3. Unused code share
4. (Business) modifications
RISE with SAP Methodology
INTERNAL – SAP and Partners Only 525

## PDF page 447
RISE with SAP Methodology dashboard
A comprehensive set of
dashboards to track and
monitor status, gather insights,
and provide recommendations
for transformation projects
System view to
review your current
extensions
Get more insights
about the tool:
SAP Help Portal
INTERNAL – SAP and Partners Only 526

## PDF page 448
Help.sap - Cloud ALM and RISE with SAP Methodology
https://help.sap.com/docs/cloud-alm/applicationhelp/extensibility
INTERNAL – SAP and Partners Only 527

## PDF page 449
System View – KPI Overview
• The KPI Overview section consists of four cards representing four KPIs
• Weighted Score • Displays how much customer • Displays the number of • Indicates the portion of
• Based on severity of objects contribute to overall business modifications in the custom objects that are not
references from customer code execution system utilized
objects to SAP objects • Based on execution of • Based on entries in table • Displays the number of
• Displays aggregated technical customer objects in relation SMODILOG unused customer objects
debt of all customer objects to total execution of all • Are part of Level D but over the past 12 months
executable objects
in the selected system determined by Custom Code • Helps to maintain a lean and
• Weighting details • Helps to assess efforts for Analytics (CCA) efficient system
future upgrades and
o Error: 10 points • Helps to identify need for
adaptation
cleaner extension practices
o Warning: 5 points
• Includes trend over 3 months
• Includes trend over 3 months
o Information: 1 point
o Higher score = greater
technical debt

## PDF page 450
Example of KPI evolution: Technical Debt Score
• Weighted Score
• Based on severity of te
br
eo
references from customer Dc
objects to SAP objects
la
c
S
t b
ine
• Displays aggregated technical h c
e
D
l a
Adherence Target : x%
debt of all customer objects Tc in Adherence Target : x%
h Adherence Target : x%
in the selected system c
e Adherence Target : x%
T
• Weighting details
o Error: 10 points
o Warning: 5 points
o Information: 1 point
o Higher score = greater
technical debt
2025 2026 2027 2028 2029 2030
