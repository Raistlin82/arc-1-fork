---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 201
page_end: 225
topic: released-apis-and-wrappers
---

# Clean Core Extensibility - pages 201-225

## PDF page 201
ABAP Cloud Partner Certification Academy - November 22, 2023
Example and Demo: Wrapper of the table SMODILOG
INTERNAL – SAP and Partners Only 232

## PDF page 202
ABAP Cloud Wrapper guidelines - Setup
CORNERSTONES OF THE SETUP
Wrapper development must reside in a software component with ABAP language
version Standard ABAP
→ It cannot be in a software component together with Level A developments
→ It has to use HOME or a dedicated software component (namespace optional)
→ Non-released SAP objects can be accessed
ABAP Cloud rules are enforced by ATC checks
→ Wrappers shall be developed as ABAP Cloud compliant as possible
→ ATC exemptions for desired violations (access to non-released SAP objects)
Developer authorizations
→ Start with ABAP Cloud developer role template
→ Add authorization for Standard ABAP
INTERNAL – SAP and Partners Only 234

## PDF page 203
ABAP Cloud Wrapper– Possible issues
TRANSACTIONAL CONSISTENCY
→ Wrappers around non-released SAP objects might not confirm strict transaction
handling when consumed in Level A
→ Violations of strict handling of the SAP LUW in Level A are tolerated if they stem from
wrappers
→ Monitoring of issues possible via logs in transaction SAAB for checkpoint group
CC_STMT and CC_RAP_CONTRACT
→ COMMIT WORK / ROLLBACK WORK are not tolerated
FURTHER PITFALL
→ SAP GUI not available in Level A → wrappers using objects tied to SAP GUI will not
work for consumption in Level A
INTERNAL – SAP and Partners Only 235

## PDF page 204
Set up Developer Extensibility on S/4HANA on premise/Private Cloud
Create local or transportable Software Component for ABAP language version
1.
“ABAP for Cloud Development”.
Create Structure Package(s). Within this structure package create Main packages
2.
and Development packages as usual.
Configure Authorizations to restrict developer access to ABAP Cloud language
3.
version.
Set up ATC Checks and Manage API Snapshots
4.
INTERNAL – SAP and Partners Only 236

## PDF page 205
Objects to be wrapped
The following table summarizes the objects that are recommended to be wrapped
OBJECT TYPE TO BE WRAPPED OBJECT TYPE USED FOR WRAPPER
RAP BO Class / interface (access to RAP BO via EML)
Function module Class / interface
Class / interface Class / interface
CDS view + DCL CDS view + DCL
Table CDS view (+ DCL)
Other object types are currently not recommended
INTERNAL – SAP and Partners Only 237

## PDF page 206
Frequently Asked Questions
What about dictionary artefacts? Shall
How can I ensure stability of my wrapper?
they be wrapped?
No. Same ATC consistency and compatibility
checks apply …
To decouple from dictionary artefacts in
code: use local type declarations in → … for released wrappers
wrapper classes
→ … for public SAP APIs
For usage in Level A dictionary artefacts:
use released SAP artefacts or create own
STABILITY AND CONSISTENCY OF
WRAPPERS
DICTIONARY ARTEFACTS
What about authorization checks done
Can I wrap non-released BAdIs? in wrapped SAP objects?
Wrappers might involve non-released
Nothing to be done
SAP authorization objects and do not
Released BAdIs are implemented in have a clean authorization signature
Level A, non-released BAdIs in Level B
BUSINESS AUTHORIZATIONS
NON-RELEASED BAdIs
INTERNAL – SAP and Partners Only 238

## PDF page 207
Important guides for Wrappers
5.2 Custom wrappers: When and how
to use classic ABAP code to mitigate
missing APIs
Pg. 43
Overview, comparison of
How to mitigate missing public SAP NEW! Released in August 2025.
extensibility options, introduction How the classic ABAP world maps
APIs by building SAP Cloud Introduction of the Clean Core Level
to ABAP Cloud and Clean Core to the new ABAP Cloud world
Wrappers Concept, among others
Level Concept.
Additional information and blog posts linked at https://community.sap.com/topics/s4hana-cloud-abap-environment
INTERNAL – SAP and Partners Only 240

## PDF page 208
Q & A

## PDF page 209
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
INTERNAL – SAP and Partners Only 242

## PDF page 210
Certification program for Partner extensions
BTP-EXT-CC
• Apps on SAP BTP apps
S/4HC-ABAP-CLOUD-CC
integrated with SAP Cloud ERP
• Add on for ABAP Cloud Private
• Clean core level A • Use of released or classic APIs
S/4HC-ABAP-CC
• Add-on for classic ABAP, clean core level B
• ABAP test cockpit check, no error, and no warning
S/4HC-ABAP-COND
• Add-on for classic ABAP
• Conditional clean core level C
• Application of a change log for SAP objects
• ABAT test cockpit check*, no error
Partners must implement their extensions with the highest possible level of clean extensibility according to technical feasibility. SAP
recommends the use of SAP BTP for side-by-side extensibility.
With clean core certifications, a partner commits to support the next release of SAP Cloud ERP Private within four weeks after availability of
the new release and to submit the certification package in time to SAP Integration and Certification Center.
Learn more in “Certification of Partner Solutions Following Clean Core” or contact SAP Integration and Certification Center (icc@sap.com).
INTERNAL – SAP and Partners Only 243
*ATC check, see SAP Note 3565942

## PDF page 211
Clean Core certification program for partner extensions – details
• Certification program offered by SAP Integration and Certification Center (SAP ICC) for partner
extensions integrated with SAP S/4HANA Cloud Private Edition:
• On-stack extensions based on ABAP Cloud, fulfilling Level A requirements (S/4HC-ABAP-CLOUD-CC).
• On-stack extensions based on classic ABAP, fulfilling Level B or Level C requirements (S/4HC-ABAP-CC).
• Side-by-side extensions running on SAP BTP using released or classic APIs (BTP-EXT-CC).
• Further details: Certification of Partner Solutions following Clean Core.
• Contact SAP ICC directly: icc@sap.com.
INTERNAL – SAP and Partners Only 244

## PDF page 212
Resources
Blog
Sap.com Partner Portal
Certification of Partner Solutions following
Clean Core
INTERNAL – SAP and Partners Only 245

## PDF page 213
Webinar about how to develop Partner solutions in ABAP Cloud:
Global webinar to introduce deployment options for ABAP
https://partneredge.sap.com/en/library/education/psd/2026/mar/e_oe_te_w_PSD_WEB_00013514.html
INTERNAL – SAP and Partners Only 246

## PDF page 214
Q & A

## PDF page 215
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
INTERNAL – SAP and Partners Only 249

## PDF page 216
The Architects notebook will have to evolve to Level A so they can define the
right extensibility pattern, aligned with the Clean Core principals
Classic ABAP (Levels B, C, D) Level A
Sales Order tables Sales Order CDS views
• VBAK - Sales Document: Header • I_SALESDOCUMENT - Sales
Data Document
• VBAP - Sales Document: Item Data • I_SALESDOCUMENTITEM -
Sales Document Item
Sales Order BAPIs
• BAPI_SALESORDER_CREATEFROMDAT2 Sales Order Released APIs
• I_SALESORDERTP
Sales Order User Exit
• MV45AFZZ
Sales Order enhancement spot
• ES_SD_SLS_EXTEND
• Released BAdIs
• SD_SLS_CHECK_HEAD
• SD_SLS_CHECK_ITEM
• SD_SLS_CHECK_DELIVSCHED
• SD_SLS_CHECK_BEFORE_SAVE
INTERNAL – SAP and Partners Only 250

## PDF page 217
Evolution of the Architect mindset to the Level A Technologies / Frameworks and
Objects (CDS views, APIs, BAdIs, ...)
Data Access (read) Reports UI
Level (B, C, D) Level A Level (B, C, D) Level A Level (B, C, D) Level A
Table read access C • Standard Fiori Apps SAPGui B
ABAP Reports B • Query Browser • Fiori / UI5
BAPI * WebDynpro B
• Released CDS Views • Custom Analytical • Build Apps *
Non released CDS Queries ABAP List Viewer • Mobile SDK
C SAP Query - B
Views C • Manage KPIs and (ALV)
Framework
Reports
Create / Edit Business Objects
Output Management Development environment
Level (B, C, D) Level A
Level (B, C, D) Level A Level (B, C, D) Level A
BAPI *
Sapscript B • Eclipse ADT
SHDB + Call
SAPGui (SE11, SE37, • BAS (Business
D SmartForms B • Output Management - *
transaction
• Released APIs SE38, SE80, etc ...) Application Studio)
Print Forms
Email Templates • SAP Build **
Table write access D B
SO10
Modification D
Process Workflow Integration Technologies
Extension Points
Level (B, C, D) Level A Level (B, C, D) Level A
Level (B, C, D) Level A
Flexible Business ALE & Idoc B
B
BAdI (classic) B Workflows
BAPI Technology B • Process Integration
Customer Exits Classic Workflow B Technologies
B SHDB + Call
(SMOD/CMOD) • BAdI (Kernel based) • SAP Build Process D
User exits and transaction
Automation
Implicit or Explicit extensions to block
D
Enhancements request and approve *
documents (e.g.
Purchase Order) * SAP Build Apps Deprecation and The Path Forward
* B, C or D
INTERNAL – SAP and Partners Only On stack extensibility: Key User Extensibility, ABAP Cloud 251
** SAP Build
Side-by-Side extensibility: Build Apps *, Build Process Automation, ABAP Cloud, Build Code (CAP, Mobile, …)

## PDF page 218
Blogs that help the transition from
Classic ABAP to Level A

## PDF page 219
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 1/7
Nov.04.2025
https://github.com/Yoloyoda/abap-for-cloud-development-cheatsheet
INTERNAL – SAP and Partners Only 253

## PDF page 220
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 2/7
Nov.04.2025
Line of Business
Sales Sales (Pricing)
Table: CDS view: Table: CDS view:
VBAK i_salesdocument KONH i_slsprcgconditionrecord
VBAP i_salesdocumentitem KONM i_slsprcgcndnrecordscale
VBEP i_salesdocumentscheduleline KONP i_slsprcgconditionrecord
VBFA i_sddocumentmultilevelprocflow KONV i_conditiontype
VBKD i_salesdocument PRCD_ELEMENTS i_pricingconditiontype
VBRK i_billingdocumentbasic T685
VBRP i_billingdocumentitembasic T685A
TVGRT i_salesoffice
TVKBT i_salesareasalesoffice
TVKBZ i_salesgroup
TVKGR i_salesorganization
TVKO i_salesarea
TVTA i_distributionchannel
Delivery
TVTW
Table: CDS view:
Function Module: Behavior Definition: LIKP i_deliverydocument
BAPISDORDER_GETDETAILEDLIST i_salesordertp LIPS i_deliverydocumentitem
BAPI_SALESORDER_CREATEFROMDAT2 TVST i_shippingpoint
INTERNAL – SAP and Partners Only 254

## PDF page 221
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 3/7
Nov.04.2025
Line of Business
Sourcing and Procurement Business Partner
Table: CDS view: Table: CDS view:
EKKO i_purchaseorderapi01 KNA1 i_customer
EKPO i_purchaseorderitemapi01 KNB1 i_customercompany
RBKP i_supplierinvoiceapi01 KNVK i_contactperson
RSEG i_suplrinvcitempurordrefapi01 KNVP i_custsalespartnerfunc
MATDOC i_materialdocumentheader_2 KNVV i_customersalesarea
EBAN i_purchaserequisitionitemapi01 LFA1 i_supplier
EBKN i_purreqnacctassgmtapi01 LFB1 i_suppliercompany
EINA i_purchasinginforecordapi01 LFM1 i_supplierpurchasingorg
EINE i_materialstock
MSKA
MSKU
MSLB
MSLBH
Function Module: Behavior Definition:
BAPI_PO_CHANGE i_purchaseordertp_2
BAPI_PO_CREATE1 i_purchaserequisitiontp
BAPI_PR_CHANGE i_purchasecontracttp
BAPI_PR_CREATE i_supplierinvoicetp
BAPI_REQUISITION_CHANGE
BAPI_REQUISITION_CREATE
BAPI_REQUISITION_GETDETAIL
BAPI_INCOMINGINVOICE_CREATE
BAPI_INCOMINGINVOICE_POST
BAPI_INCOMINGINVOICE_RELEASE
INTERNAL – SAP and Partners Only 255

## PDF page 222
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 4/7
Nov.04.2025
Line of Business
Finance Finance (Hierarchy)
Table: CDS view: Table: CDS view:
BKPF i_journalentry SETHEADER i_costcenterhierarchy
BSEG i_operationalacctgdocitem SETHEADERT i_costcenterhierarchynode
ACDOCA i_journalentryitem SETLEAF i_costctractivitytypehiernode
SKA1 i_glaccountlineitem SETNODE i_functionalareahierarchy
SKB1 i_glaccountlineitemrawdata i_functionalareahiernode
T001 i_glaccountinchartofaccounts i_profitcenterhierarchy
T003 i_glaccountincompanycode i_profitcenterhierarchynode
CEPC i_companycode
i_profitcenter
Payment
Function Module: Behavior Definition:
BAPI_ACC_EMPLOYEE_EXP_POST i_journalentrytp Table: CDS view:
BAPI_ACC_INVOICE_RECEIPT_CHECK REGUH i_paymentprogramcontrol
BAPI_ACC_INVOICE_RECEIPT_POST REGUP i_paymentproposalpayment
BAPI_ACC_DOCUMENT_CHECK REGUV i_paymentproposalitem
BAPI_ACC_DOCUMENT_POST REGUT i_paymentproposalcontrol
BAPI_ACC_ACT_POSTINGS_REVERSE
INTERNAL – SAP and Partners Only 256

## PDF page 223
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 5/7
Nov.04.2025
Line of Business
Manufacturing Physical Inventory Management
Table: CDS view: Table: CDS view:
MARA i_product IKPF i_physinvtrydocheader
MARC i_productqm ISEG i_physinvtrydocitem
MARD i_productsales T001L i_storagelocation
MARM i_productprocurement T001W i_plant
AFKO i_productplantbasic MSEG i_materialdocumentitem_2
AFPO i_productsupplyplanning MKPF i_materialdocumentheader_2
AFRU i_productstoragelocationbasic
Function Module: Behavior Definition:
AFVC i_productunitsofmeasure
MB_CREATE_GOODS_MOVEMENT i_materialdocumenttp
AFVU i_manufacturingorder
MB_POST_GOODS_MOVEMENT i_physicalinventorydocumenttp
AFVV i_manufacturingorderitem
BAPI_GOODSMVT_CANCEL
MKAL i_mfgorderconfirmation
BAPI_GOODSMVT_CREATE
PLKO i_manufacturingorderoperation
BAPI_MATPHYSINV_CHANGECOUNT
PLPO i_productionversion
BAPI_MATPHYSINV_COUNT
i_billofoperationsgroup
BAPI_MATPHYSINV_CREATE
i_mfgbillofoperationsoperation
Function Module: Behavior Definition:
BAPI_MATERIAL_MAINTAINDATA_RT i_producttp_2
BAPI_MATERIAL_SAVEREPLICA i_plannedordertp
BAPI_MATERIAL_SAVEDATA i_productionordertp
BAPI_PLANNEDORDER_GET_DETAIL i_productionordconfirmationtp
BAPI_PRODORD_CHANGE i_plndindeprqmttp
BAPI_PRODORD_COMPLETE_TECH i_supplydemanditemtp
BAPI_PRODORD_CREATE
BAPI_PRODORD_RELEASE
BAPI_MATERIAL_STOCK_REQ_LIST
INTERNAL – SAP and Partners Only 257

## PDF page 224
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 6/7
Nov.04.2025
Solution Syntax - Table
Excel upload to itab Job scheduling
Function module: Class: Tcode: Fiori app:
GUI UPLOAD xco_cp_xlsx SM36 Application Jobs
TEXT_CONVERT_XLS_TO_SAP xco_cp_xlsx_selection SM37 Application Job Templates
ALSM_EXCEL_TO_INTERNAL_TABLE xco_cp_xlsx_read_access Maintain Job Users
... Function module:
Class: JOB_OPEN Class:
cl_fdt_xl_spreadsheet JOB_CLOSE cl_apj_dt_create_content(Creating job
JOB_SUBMIT catalog and template)
Forms and printing BP_JOB_DELETE cl_apj_rt_api(Start, change, delete job
BP_JOB_READ programmatically)
Tcode: Tool:
SHOW_JOBSTATE
SE71~SE77(SAP Script) Adobe LiveCycle Designer(for designing
SMARTFORMS, form layout)
SMARTSTYLES(Smartforms)
Number range
SFP(Adobe forms) Services:
Forms Service by Adobe(for rendering Tcode: Class:
Function module: PDF forms built with Adobe LiveCycle SNRO cl_numberrange_objects(maintain
OPEN_FORM Designer) number range object)
START_FORM Table: cl_numberrange_intervals(maintain
WRITE_FORM Class: NRIV number range interval)
END_FORM cl_print_queue_utils(writing print queues) cl_numberrange_runtime(get next
CLOSE_FORM Function module: number, check number)Fiori app:
Call Function '<Smartform/Adobe form Fiori app: NUMBER_GET_NEXT Manage number range intervals
FM>' Maintain print queues NUMBER_CHECK
INTERNAL – SAP and Partners Only 258

## PDF page 225
Blog: Smooth transition to ABAP for Cloud Development (Cheat sheet) - 7/7
Nov.04.2025
Solution Syntax - Detailed solution
Topics covered in detail:
• ABAP memory
• Access management
• Calendar
• Change document logging
• Excel upload to itab
• Exchange rate
• Forms and printing
• Job scheduling
• Large object handling
• Parallel processing
• Translation
• UI
INTERNAL – SAP and Partners Only 259
