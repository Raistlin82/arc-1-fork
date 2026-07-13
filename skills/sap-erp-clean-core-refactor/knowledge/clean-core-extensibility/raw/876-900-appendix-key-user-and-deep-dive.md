---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 876
page_end: 900
topic: appendix-key-user-and-deep-dive
---

# Clean Core Extensibility - pages 876-900

## PDF page 876
optional
Webinar: Learn about the free SAP Build test, demo, and development (TDD)
licenses for partners
https://partneredge.sap.com/en/library/education/psd/2025/jul/e_oe_te_w_PSD_WEB_00010722.html
PUBLIC 1006

## PDF page 877
Appendix
Level A - On-stack extensibility - Key User extensibility
Level A - Side-by-side extensibility
Extensibility KPIs - Detailed Information
Setting up ATC Checks for Clean Core and Importing ATC Results
How to post Questions in the ABAP Development community

## PDF page 878
Extensibility KPI: Clean core share
How
Clean core share is determined by evaluating each custom Measuring clean core share provides a comprehensive view of
code object based on the "worst" reference it uses. This how custom code objects are distributed across clean core
ensures that the most non-compliant dependency defines the levels. This insight is essential for driving system efficiency and
object’s classification. guiding optimization efforts.
Key points: Key factors:
• If a custom object refers to internal objects, it is categorized • Gain visibility into custom code distribution
as Level C, while ABAP cloud objects and side-by-side
• Identify areas requiring immediate attention
extensions with SAP BTP are categorized as Level A.
• Track improvement over time
• Clean core share represents the distribution of objects
across levels, giving a quantitative view of code compliance. • Measure progress by monitoring the clean core share
Example distribution: (including side-by-side extensions with SAP BTP)
− Level A: 10% (100 objects) • Support strategic decision-making
− Level B: 50% (500 objects) • Ensure long-term maintainability
− Level C: 35% (350 objects)
− Level D: 5% (50 objects)
• Actionable insight: This distribution highlights where
improvement is needed.
For example, reducing the share of Level C/D objects
indicates stronger adherence to clean core principles.
1008

## PDF page 879
Extensibility KPI: Clean core share
Objective Provide transparency on the distribution of custom code objects across Governance & Maturity of Value Non-quantifiable
clean core levels maturity governance
relevance process Effort Medium
Calculation Clean core share classifies each custom code object based on its "worst" Key Clean core share provides transparency into how custom code
details reference level, according to the clean core level concept and the ABAP results objects (including SAP BTP side-by-side extensions) are
language version used. distributed across clean core levels. This insight is essential for
driving system efficiency and guiding optimization efforts. It also
Example: Distribution of 1,000 objects into
supports strategic decision-making and ensures long-term
• Level A: 10% (100 objects)
maintainability when measured on a regular basis.
• Level B: 50% (500 objects)
• Level C: 35% (350 objects)
• Level D: 5% (50 objects)
Recommended Now: ABAP test cockpit and custom dashboard Cadence Assessment should Type Semi-automatic
tools run on a regular basis
Future: RISE with SAP Methodology dashboard
(e.g., weekly).
Prerequisites Now: ABAP test cockpit clean core checks (SAP Note 3565942) Measurement • Implement the latest version of SAP Note 3565942 to leverage
& limitations configured or Project Kernseife guidance ABAP test cockpit clean core check findings
Future: Setup of data collectors for RISE with SAP Methodology • Extract data regularly into a custom dashboard, or – in the future –
dashboard use the RISE with SAP Methodology dashboard
1009

## PDF page 880
Extensibility KPI: Technical debt score
How
The technical debt score is a weighted measure based on the severity of
references to SAP objects.
Key points:
• Weighting factors are assigned to findings in ABAP test cockpit
− Error: 10 points
− Warning: 5 points
− Information: 1 point
• The score is calculated by summing the weighted findings.
• Example:
− 5 errors, 20 warnings, and 10 information messages result in:
5 * 10 + 20 * 5 + 10 * 1 = 160 points.
While clean core share offers a general overview, the technical debt score is
more actionable. It represents the technical debt contained within a given
custom code object, providing a clear and objective measure of the factors
influencing system maintainability.
1010

## PDF page 881
Extensibility KPI: Technical debt score
Objective Create a virtual score to assess the technical debt of individual objects Governance & Maturity of Value Non-quantifiable
and enable higher-level aggregation (e.g., development packages, maturity governance
namespaces). relevance process Effort Medium
Calculation # of Priority 1 findings * 10 + Key • Provides transparency on technical debt per object to:
Technical debt score
details = # of Priority 2 findings * 5 + results • Identify objects with higher technical debt
(per object)
• Measure overall technical debt in the system over time
# of Priority 3 findings * 1
• Set goals, track the progress, and compare results across periods
Based on the priority assessment of ABAP test cockpit findings from the
clean core check variant (SAP Note 3565942); Priority 1 findings are
weighted x10, priority 2 findings x5, and priority 3 findings x1.
Relevant checks: “Usage of APIs”, “Allowed enhancement
Cadence ABAP test cockpit clean core checks should run on a regular basis
technologies”, “Search customer modifications”, “Critical statements”
(e.g., weekly) to update scores
Recommended Now: ABAP test cockpit and custom dashboard Type Semi-automatic
tools
Future: RISE with SAP Methodology dashboard
Prerequisites Now: ABAP test cockpit clean core checks (SAP Note 3565942) Measurement • Implement the latest version of SAP Note 3565942 to leverage
& limitations configured or Project Kernseife guidance ABAP test cockpit clean core check findings
Future: Setup of data collectors for RISE with SAP Methodology • Extract data regularly into a custom dashboard, or – in the future –
dashboard use the RISE with SAP Methodology dashboard
1011

## PDF page 882
Extensibility KPI: Unused code share
How
Measuring unused code share requires activating usage data measurements.
SAP recommends using ABAP Call Monitor (SCMON) for usage data
collection, combined with transaction SUSG for aggregating usage data over a
longer period.
Key points:
• To develop custom dashboards and generate tailored insights, you can use
ABAP Call Monitor (SCMON and SUSG) and insights from other
extensibility KPIs.
• To gain a more detailed understanding of your unused code share, start by
leveraging data from ABAP Call Monitor (SCMON).
• Then aggregate SCMON data using transaction SUSG.
• Compare the list of used objects with all custom code objects stored in
tables such as TADIR. This comparison identifies unused objects for
potential cleanup and optimization, ensuring a lean and efficient system
architecture.
Every unused custom code object represents potential technical debt.
Identifying and removing unused code objects is essential to maintain a clean
and efficient system.
1012

## PDF page 883
Extensibility KPI: Unused code share
Objective Identify the share of unused custom code in the system Governance & Maturity of Value Non-quantifiable
maturity housekeeping
relevance practice Effort Medium
Calculation # unused custom code objects Key Custom objects are customer-created extensions outside the SAP
details Unused code share (%) = × 100 results standard. The unused code share highlights the portion of custom
# total custom code objects objects not utilized, helping to identify areas for potential cleanup
and optimization.
The unused code share shows the fraction of unused custom code
objects in the system, expressed as a percentage.
Cadence Usage logging should be active permanently in production
systems.
Recommended ABAP Call Monitor (SCMON) and SUSG Type Automatic
tools
Prerequisites • Activation of usage logging via ABAP Call Monitor (SCMON) Measurement Activate usage logging directly via transaction SUSG in production.
& limitations and SUSG for aggregation in productive system guidance See SAP Notes 2643357 and 2701371 for more details.
• Ideally covers a time frame of 12 months or more
1013

## PDF page 884
Extensibility KPI: Business modifications
How
Business modifications can be identified using the custom code analytics
dashboard or the RISE with SAP Methodology dashboard. The Modification
Analysis guide explains how to extract data from the SAP table SMODILOG
using patterns to identify technical modifications not created intentionally as
business modifications.
Key points:
• Results can be reviewed directly in the dashboards mentioned above.
• The calculation logic of business modifications in your system – including
classification rules – is documented in Modification Analysis.
• Insights help assess modification risks and support clean core
governance.
Modifications generally pose risks during upgrades because they involve
changes to SAP standard code outside of extension points, potentially
leading to additional maintenance efforts.
1014

## PDF page 885
Extensibility KPI: Business modifications
Objective Provide transparency on the number of business Governance & Maturity of Value Non-quantifiable
modifications in the system maturity extension architecture
relevance guidelines Effort Medium
Calculation Business modifications are a subset of all logged changes to SAP Key Business modifications generally pose risks during upgrades, as they
details standard objects in table SMODILOG. They represent intentional results involve changes to SAP standard code outside of extension points,
changes by the customer and must be distinguished from technical potentially leading to additional maintenance efforts.
modifications – i.e., unintended changes to SAP standard objects
Tracking the number of business modifications supports proper risk
(e.g., those originating from the implementation of SAP Notes).
assessment during upgrades and highlights the need for cleaner
Business modifications can be identified using the RISE with SAP extension practices.
Methodology dashboard.
Cadence Business modifications should be tracked on a regular basis
(e.g., weekly).
Recommended RISE with SAP Methodology dashboard Type Automatic
tools
Prerequisites Setup of data collectors for RISE with SAP Methodology Measurement The calculation logic for business modifications is explained in more
& limitations dashboard guidance detail in the document Modification Analysis.
1015

## PDF page 886
Appendix
Level A - On-stack extensibility - Key User extensibility
Level A - Side-by-side extensibility
Extensibility KPIs - Detailed Information
Setting up ATC Checks for Clean Core and Importing ATC Results
How to post Questions in the ABAP Development community
INTERNAL – SAP and Partners Only 1016

## PDF page 887
How-To Guide
Setting up ATC Checks for Clean
Core and Importing ATC Results
to RISE with SAP Methodology
Dashboard
November 2025

## PDF page 888
Before You Start
Background & Basics

## PDF page 889
Motivation / Background
To reflect the Clean Core Level Concept on the RISE with SAP Methodology dashboard, you must
manually import the check results generated in the ABAP Test Cockpit (ATC).
First, create the check result for your selected system in the ATC. Then, download the check result
file and import it into the dashboard.

## PDF page 890
Essential SAP Notes and further Resources
SAP Notes:
- 3627152 - SAP Note Analyzer Files for ATC Checks Related to Clean Core
- Includes: 3565942 - ATC Checks "Usage of APIs" and "Allowed Enhancement Technologies“
- 2781766 - Enabling ATC check result export for SAP Readiness Check 2.0
- 3578329 - Frameworks, Technologies and Development Patterns in Context of Clean Core Extensibility
Blog Posts:
- ABAP test cockpit (ATC) recommendations for govern... - SAP Community
- Remote Code Analysis in ATC - One central check sy... - SAP Community
- New Clean Core Extensibility KPIs arrive on the RI... - SAP Community
Further documentation:
- Custom Code Migration Guide for SAP S/4HANA 2025
- Extensibility | SAP Help Portal
- Clean Core Extensibility Whitepaper

## PDF page 891
How ABAP Test Cockpit supports clean core level concept
CLEAN CORE LEVELS
Usage of SAP objects in custom development ABAP test cockpit behavior
A Released SAP APIs (local and remote) and extension points No messages
B Classic SAP APIs and extension points Priority 3 - Info message
C Internal SAP objects Priority 2 - Warning message
D Not recommended SAP objects and extension technologies Priority 1 - Error message
Learn more: Clean Core Extensibility for SAP S/4HANA Cloud whitepaper and ABAP Extensibility guide

## PDF page 892
ATC Checks – Basics: Check Systems
ATC distinguishes between central and local check systems.
• Central Check System:
• involves a dedicated central system that runs checks on code from multiple satellite systems
• Local Check System:
• ATC is directly run on the development system itself
• Allows developers to perform static code quality and impact analyses without sending them to a central system

## PDF page 893
ATC Options and Prerequisites
• (Central or local) ATC check system
• Requires SAP S/4HANA 2023 or higher
• Must have installed the relevant check notes described in SAP Note Analyzer Files for ATC Checks Related to
Clean Core
• ATC can be run either via SAP GUI or using Custom Code Migration App (CCMA)
• SAP Custom Code Migration App on BTP
• Is already Pre-configured (checks and notes are available)
• Check Variant needs to be created
Some options of the custom code analysis depend on whether your
central check system is an on-premise system or based on SAP BTP ABAP
environment.

## PDF page 894
How-to Proceed

## PDF page 895
Required Steps at a Glance
1 2 3 4
Technical ATC Check Setup Create Clean Core ATC Variant Export ATC Check Results File Import ATC Check Results
• Basis Administrators • ABAP Experts • All users with required • Users with System
authorizations Dashboard
• ABAP Experts
Administrator role

## PDF page 896
Step 1 - Technical ATC Check Setup
Choose the appropriate ATC option
A: (Central or local) Check System
• Make sure to use the appropriate software → see collective note 3627152
• In SAP Note Analyzer, upload file “SAP-NOTE-3627152-CENTRAL.xml” for your local/central check
system
• In SAP Note Analyzer, upload file “SAP-NOTE-3627152-CHECKED.xml” for the relevant checked systems
• Connect the check system against all development related systems
• Set up your ATC check either as a one-time run or as a regular run (recommended)
B: ATC on SAP BTP
• On SAP BTP, ATC is pre-configured → apart from creating an ATC Check variant (see next step), no further
activities are required
• Implement notes in checked system
• See also the blog post ATC on SAP BTP for on-premise developments for further information

## PDF page 897
Step 2 - Creation of Clean Core ATC Variant
Add the required ATC checks for clean core to your existing global standard ATC check variant.
If you set up ATC for the first time you should create your own ATC standard variant as a copy of
the default ATC variant ABAP_CLOUD_DEVELOPMENT_DEFAULT in ABAP development tools
for Eclipse and add the clean core checks listed below.
- Allowed SAP enhancement technologies
o reports usage of enhancements in custom code
based on not allowed enhancement technologies
See SAP Note 3565942
- Usage of APIs
o based on usage guidelines for SAP APIs in custom code
- Critical Statements
o checks critical ABAP statements that may impact stability or
upgrade safety

## PDF page 898
Step 2 – Create Clean Core ATC Variant: Critical Statements Check
The Critical statements check must be parametrized in the check details:
Use the following values for parametrization:

## PDF page 899
Step 2 – Create Clean Core ATC Variant: Usage of APIs Check – Classic APIs
Classic APIs are based on SAP’s recommendations for classic ABAP development technologies,
reuse services and application specific frameworks, which should be utilized in classic ABAP
developments.
Classifications are provided for the following SAP object types:
• Function modules (FUNC)
• Classes/interfaces (CLAS/INTF)
• CDS views (STOB)
• BO interfaces (BDEF)
Classic APIs can be inspected by the Cloudification Repository viewer on GitHub:
https://sap.github.io/abap-atc-cr-cv-s4hc/?version=objectClassifications_SAP.json

## PDF page 900
Step 2 - Create Clean Core ATC Variant: Usage of APIs Check – Check behavior
• Purpose: verify the usage of classic ABAP development
objects based on the consumption of SAP APIs.
• Verifies usages of SAP standard objects in custom code like
interfaces, classes, function modules, CDS views, behavior
definitions, DDIC database tables and DDIC database views,
programs or their subroutines, whereby the SAP DDIC object
types like data elements, domains, table types and
structures are not checked (no ATC finding is reported).
• For usage of released SAP APIs in custom code no ATC
findings are reported. For usage of an SAP classic API the
check reports an info message, for usage of an API which is
not classified (SAP internal API) the check reports a warning
and for usage of an API marked as “no API” an error message
containing successor is reported (if a successor has been
provided).
