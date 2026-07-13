---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 901
page_end: 925
topic: appendix-key-user-and-deep-dive
---

# Clean Core Extensibility - pages 901-925

## PDF page 901
Step 2 - Create Clean Core ATC Variant: Important Points to consider
• Ensure the ATC Check Variant has been created correctly, including the required clean core
ATC Checks
• Allowed Enhancement Technologies
• API Usage
• Critical Statements
• Perform the ATC check for ALL customer objects
• Choose appropriate set of objects
• Include relevant namespaces (e.g. Z*, Y*)

## PDF page 902
Step 3 - Export ATC Check Results File
After the ATC check run, download and save the ATC check result as a ZIP file as described in the
following SAP Note:
2781766 - Enabling ATC check result export for SAP Readiness Check 2.0
The following authorizations are required to be able to use the download function:
S_Q_ADM - ACTVT:59 (Distribute) and ATC_OBJTYP:02 (Check Result)
Note:
The ATC check result uses the same download format as the SAP Readiness Check for SAP S/4HANA.

## PDF page 903
Step 3 - Export ATC Check Results File
In the "Manage Results" view of ATC, select "Export File for → SAP Readiness Check for SAP
S/4HANA” from the context menu.

## PDF page 904
Step 4 — Import of ATC Check Results
• Go to the Clean Core Tool Status section of the System View in RISE with SAP Methodology Dashboard

## PDF page 905
Step 4 — Import of ATC Check Results
• On the ABAP Test Cockpit card, click on the Import File button.
This button is only visible to users with the System Dashboard Administrator role.

## PDF page 906
Step 4 — Import of ATC Check Results
• On the dialog that opens (File Explorer) find the ATC check result file you downloaded in Step 3
and click on Open to confirm your selection and start the file import.
Depending on the size of the ATC check results file, the file import may require some
time to complete.

## PDF page 907
Step 4 — Import of ATC Check Results
Important Remarks:
• If you have multiple systems eligible for the dashboard,
ensure you import the correct file to avoid an import failure.
• You can only import one file at a time.
• The maximum size of the ZIP file is restricted to 100 MB.
• Do not make any changes to your ZIP file.
If you open and modify it, the import function fails.

## PDF page 908
Step 4 — Import of ATC Check Results
• Once the file import has finished successfully, go to the Extensibility section of the System
View to analyze the results.

## PDF page 909
Troubleshooting

## PDF page 910
Issues on Checked System
OSS Note 2270689 < SAP BASIS 7.58 or 3373034 for SAP BASIS 7.58 and higher asked you to
execute report “RS_ABAP_SETUP_ANALYSIS” but it fails
Call TCODE SE24 and activate CL_ABAP_COMPILER
and start the RS_ABAP…. again
INTERNAL – SAP and Partners Only 1041

## PDF page 911
Issues on Central System
SSL Error for raw.githubusercontent.com
Go to a webbrowser and enter https://185.199.109.133/
This is the IP address behind the URL. If you use the
URL it will redirect you to github.com and then you get
the wrong certificates
INTERNAL – SAP and Partners Only 1042

## PDF page 912
Issues on Central System
Go to a webbrowser and enter https://185.199.109.133/
This is the IP address behind the URL. If you use the URL it will redirect you to github.com and then you get the
wrong certificates
INTERNAL – SAP and Partners Only 1043

## PDF page 913
Issues on Central System
Import both the USERTrust and Sectigo into the SSL client Standard store
INTERNAL – SAP and Partners Only 1044

## PDF page 914
Extensibility KPIs

## PDF page 915
Overview: Extensibility KPIs
y
r
o
g e Operational Upgrade
ta
Risks Stability
C
IP
K
IP Clean core Technical debt Unused code Business
K
share score share modifications
Weighted score
Overview of
c determined by Usage information of
ir Identify all level A Identify all level B / modifications and
te
M objects C / D objects
a
o
m
f f
o
in
u
d
n
in
t
g
a
s
n d
o f
p
A
ri
T
o
C
ri ty a
co
ll
m
SC
p
M
at
O
ib
N
le
-
objects their impacts on the
system
clean core check
Custom Code Analytics (CCA)
tn
Custom Code Analytics ABAP test cockpit (ATC Custom Code Analytics Custom Code Analytics (CCA)
e
m e (CCA) – Clean core checks ) (CCA) ABAP Call Monitor (SCMON and
r
u SUSG)
s
a ABAP test cockpit (ATC
e
M – Clean core checks)
INTERNAL – SAP and Partners Only 1046

## PDF page 916
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

## PDF page 917
System View – Customer Object Assessment
• The Customer Object Assessment provides insights about the distribution of customer objects across the
clean core extensibility levels
• Level A: Based on Custom Code Analytics
• Levels B, C and D: Based on the latest ATC check results you imported
• Allows to quickly identify areas needing immediate attention and improvement
• Enables progress tracking and supports decision-making
SAP objects/development Objects/development patterns Rely on SAP objects/development
Solely built on released SAP APIs
patterns officially classified as neither released (Level A) nor patterns explicitly marked as not
and extension points
classic or released APIs nominated as mature (Level B) recommended

## PDF page 918
Appendix
Level A - On-stack extensibility - Key User extensibility
Level A - Side-by-side extensibility
Extensibility KPIs - Detailed Information
Setting up ATC Checks for Clean Core and Importing ATC Results
How to post Questions in the ABAP Development community
INTERNAL – SAP and Partners Only 1049

## PDF page 919
How to post Questions in the ABAP Development community - 1/4
For ABAP Development questions, check the Q&A page of the SAP Community for ABAP Development.
If your question has not been answered yet, create a new Post with your question.
https://pages.community.sap.com/topics/abap
INTERNAL – SAP and Partners Only 1050

## PDF page 920
How to post Questions in the ABAP Development community - 2/4
https://community.sap.com/t5/b-technology-questions/ABAP+Development/pd-p/833755570260738661924709785639136
INTERNAL – SAP and Partners Only 1051

## PDF page 921
How to post Questions in the ABAP Development community - 3/4
INTERNAL – SAP and Partners Only 1052

## PDF page 922
How to post Questions in the ABAP Development community - 4/4
INTERNAL – SAP and Partners Only 1053

## PDF page 923
Advisory Services

## PDF page 924
In case of questions about S/4HANA Cloud Private Edition:
Cloud Solutions from SAP
SAP Cloud ERP Private Advisory
(Platinum and Gold Partners)
https://partnerbenefitscatalog.sap.com/Partner-Benefits-Catalog/Sales-%26-Presales/SAP-Cloud-ERP-Private-Advisory/p/1002489
Description
The service consists of virtual session(s) providing guidance on
the requested topic and including recommendations on the
next steps.
Package includes
• In 60 Minutes virtual 1:1 sessions, Partner can discuss specific
topic with SAP S/4HANA cloud, private edition expert.
• Partner will get Guidance, which will help them proceeding to
next steps, on specific topic they have selected.
SAP Cloud ERP Private Advisory
INTERNAL – SAP and Partners Only 1055

## PDF page 925
SAP Business AI Advisory
https://partnerbenefitscatalog.sap.com/Partner-Benefits-Catalog/Sales-%26-Presales/SAP-Business-AI-Advisory/p/1002487
INTERNAL – SAP and Partners Only 1056
