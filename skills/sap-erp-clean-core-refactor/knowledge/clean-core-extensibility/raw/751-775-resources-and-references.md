---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 751
page_end: 775
topic: resources-and-references
---

# Clean Core Extensibility - pages 751-775

## PDF page 751
3. Joule explains the
code
INTERNAL – SAP and Partners Only 874

## PDF page 752
Labs Preview - Joule skills + Agentic capabilities

## PDF page 753
INTERNAL – SAP and Partners Only 876

## PDF page 754
INTERNAL – SAP and Partners Only 877

## PDF page 755
INTERNAL – SAP and Partners Only 878

## PDF page 756
AI-based custom code analysis and adaptation

## PDF page 757
Assistants supporting ongoing modernization
Discover Prepare Explore Realize Deploy Run Continuously innovate
Central engagement layer and orchestration through Joule
System Analysis Assistant Continuation across the migration process
Input for all other assistants
Continuous monitoring and improvement
Data Management Assistant
of migration data quality
Maintaining a
Custom Code Assistant
clean core strategy
Configuration Assistant
Test Management Assistant
Rollout Assistant
Project Management Assistant
Continuous exchange
Joule for Consultants Joule for Developers
INTERNAL – SAP and Partners Only 880

## PDF page 758
Saphire 2026 - Demo of SAP Joule for developers ABAP agentic AI custom code migration in Eclipse
https://www.youtube.com/watch?v=G9QGCHWkxKw
Agentic demo (Q2 2026 — just
released)
• ABAP MCP Server connects Eclipse to an
agent (demo uses Amazon Q, but it's
partner-agnostic)
• Agent runs ATC on a scope of custom code
→ finds, say, 29 technical findings
• Agent applies deterministic quick fixes at
scale (rule-based, high confidence)
• Agent then proposes and applies AI-
generated fixes with confidence
classification and human-in-the-loop review
INTERNAL – SAP and Partners Only 881

## PDF page 759
Blog: S/4HANA Custom Code Migration Agent - Accelerating ECC to SAP S/4HANA Transformation with Agentic AI
https://community.sap.com/t5/technology-blog-posts-by-sap/s-4hana-custom-code-migration-agent-accelerating-ecc-to-sap-s-4hana/ba-p/14418929
“Proposes AI-based fixes for the
complex use cases, for which
deterministic quick fixes do
not exist.
For each AI-based fix the
confidence score of the fix
proposal is calculated. The
agent automatically changes the
code only using AI-based fixes
with high confidence score and
without syntax errors. AI-based
fixes with lower confidence
score or causing syntax errors
are inserted into the code as
proposals in the comments. This
will allow developers to review
the proposed changes and
adjust them as needed”
YouTube video demo
INTERNAL – SAP and Partners Only 883

## PDF page 760
Demo: S/4HANA Custom Code Migration Agent - 1/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
1. Enable the ABAP MCP
for the AI assistance of
choice (e.g. Amazon Q,
GitHub Copilot)
INTERNAL – SAP and Partners Only 884

## PDF page 761
Demo: S/4HANA Custom Code Migration Agent - 2/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
2. PROMPT: Migrate Package
ABCDEFG to S/4HANA compliant
code with variant
S4HANA_READINESS_2025
INTERNAL – SAP and Partners Only 885

## PDF page 762
Demo: S/4HANA Custom Code Migration Agent - 3/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
5. Deterministic
3. ATC is executed
quick fixes are
applied
6. Re-run ATC
7. Deterministic Quick Fixes: 0
4. ATC findings
• Deterministic Quick Fixes: 14
• AI Quick Fixes: 15
INTERNAL – SAP and Partners Only 886

## PDF page 763
Demo: S/4HANA Custom Code Migration Agent - 4/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
Quick Fix 8. Run AI Fix
implemented
INTERNAL – SAP and Partners Only 887

## PDF page 764
Demo: S/4HANA Custom Code Migration Agent - 5/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
CSV file created with the list of AI Code
migration proposals and respective
“Confidence Score” (based on syntax check
correctness and LLM confidence score)
INTERNAL – SAP and Partners Only 888

## PDF page 765
Demo: S/4HANA Custom Code Migration Agent - 6/6
https://www.youtube.com/watch?v=3KZK8sLn_ZY
AI Fix list:
• Confidence score High: Applied directly, but not activated
• Confidence score Medium and Low: Added as a comment for further user review
INTERNAL – SAP and Partners Only 889

## PDF page 766
System Conversion - Classic ABAP in ECC and S/4HANA Cloud Private Edition
Custom Code Migration Agent Example of a possible scenario after an ECC
scope conversion to S/4HANA Cloud Private Edition
The result is “Classic ABAP” compliant
ECC with S/4HANA SAP S/4HANA Cloud Private Edition SAP BTP
On-stack On-stack Side-by- side
extension extension extension
System Conversion
SAP ECC SAP S/4HANA
ATC variant:
applications applications
S4HANA_READINESS
Finance Finance Classic
Sales Sales ABAP *
Examples of code corrections
Procurement Procurement
for S/4HANA
Manufacturing Classic From To Manufacturing
… …
ABAP * SQL syntax SAP HANA
Extensions are
for ECC syntax
S/4HANA
All ECC Error in compliant
transactions are deprecated (distributed in
available transactions (e.g. Levels B, C, D)
MBXX)
* Classic ABAP: Freestyle custom ABAP development that allows
Non-released API / Object
the use and modification of all SAP objects
891
© 2024 SAP SE or an SAP affiliate company. All rights reserved. FOR INTERNAL SAP AND PARTNER USE ONLY

## PDF page 767
Joule desktop generated: Three Agents to Know (Late 2026 Roadmap)
• Mass S/4HANA Custom Code Conversion Agent —
ATC-driven, fixes code to run on S/4HANA (Q2 2026
GA)
• Mass Clean Core Adoption Agent — detect and fix
clean-core ATC issues, move to ABAP Cloud
patterns (later 2026)
• Web Dynpro → SAP Fiori Modernization Agent —
transform legacy UI to ABAP Cloud/Fiori (later 2026)
INTERNAL – SAP and Partners Only 892

## PDF page 768
INTERNAL – SAP and Partners Only 893

## PDF page 769
INTERNAL – SAP and Partners Only 894

## PDF page 770
Learn more

## PDF page 771
INTERNAL – SAP and Partners Only 896

## PDF page 772
Help.sap.com: SAP Joule for Developers, ABAP AI Capabilities
https://help.sap.com/docs/abap-cloud/abap-development-tools-user-guide/joule-for-developers-abap-ai-capabilities?utm_source=chatgpt.com
INTERNAL – SAP and Partners Only 897

## PDF page 773
Hands-on session RAP120 - Build SAP Fiori Apps with ABAP Cloud and SAP Joule for developers
https://github.com/SAP-samples/abap-platform-rap120
INTERNAL – SAP and Partners Only 898

## PDF page 774
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
INTERNAL – SAP and Partners Only 899

## PDF page 775
Joule Work
https://partneredge.sap.com/en/products/joule/about/joule-work.html
INTERNAL – SAP and Partners Only 900
