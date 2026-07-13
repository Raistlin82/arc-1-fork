---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 501
page_end: 525
topic: brownfield-conversion-runbook
---

# Clean Core Extensibility - pages 501-525

## PDF page 501
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
List the impacted custom code (S/4HANA Custom code adaptation to S/4HANA
workshops (SAP KPIs, Process Extensibility
CAL instance for tests
Adaptation) Innovations, Apps, UX, • Use quick fixes to automGaovtiecranlalyn cree sanodlv e the majority of findings (~60%)
Extensibility Definition of the Extensibility Architecture
Analytics, AI) process for new
Governance,
• REuvanlu AaTtioCn toof itdhee ntify the custom code
and De
•
velo
T
p
h
m
e
e n
re
t G
st
u
h
id
a
e
s
lin
t
e
o
s
be corrected manually. Focus on findings from ABAP test
extensions
KPIs, Processes adteacphtnaotiloongi efos,r SAPS HtrAatNegAic a Enxdte nSsAibPil ity cockpit with priority one (errors) and two (warnings)
prototyping, POCs Extensibility Practices for System Setup *
S/4HANA Decisions • Use SAP Joule for Developers to accelerate custom code adaptation
RISE with SAP • CuNsototem ethr aIntn iot’vsa rtieoqnu ired to correct findings inD eep dive learning •and Qceurticifikc aatniodn aofc curate answers to your questions about simplification
Methodology and Transformation Architects, Analytics, UX and Development
the unused code. Failing to do so poses a notes for SAP S/4HANA and technical documentation
users with Hands on tests
Strategy and Clean Core runbook
risk not only of system dumps but also of • Get explanations of legacy code and its business purpose and
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
data inconsistencies that may go unnoticed processing logic, including its objects
Legacy Custom Custom code usage Data Define code to be Sandbox Conversion
Collection for 18 months deleted
code deletion
Delete unused code (during the conversion runs)
(SCMON and SUSG)
LLiisstt tthhee iimmppaacctteedd ccuussttoomm
Legacy Custom CCuussttoomm ccooddee aaddaappttaattiioonn ttoo SS//44HHAANNAA
ccooddee ((SS//44HHAANNAA AAddaappttaattiioonn))
code adaptation
List classical custom fields “Custom fields enablement”
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions
Core extensions extensions
Design the UX experience Implement SAP Fiori with minimal Adopt
disruption approach and retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
SAPGUI the UI and
Fiori Evaluate standard S/4HANA analytical drive the
Enable End User in SAP Fiori
Apps and Query Browser to replace users
Analytics classical reports Train the users in mandatory towards
S/4HANA Fiori Apps the
Map the CDS views category Query per
Joule / AI analytical
LOB (to be used in Query Browser) Train selected Key users
Apps
(multipliers) in Analytical apps and
Query Browser
INTERNAL – SAP and Partners Only 586

## PDF page 502
System Conversion - Classic ABAP in ECC and S/4HANA Cloud Private Edition
Example of a possible scenario after an ECC
conversion to S/4HANA Cloud Private Edition
ECC SAP S/4HANA Cloud Private Edition SAP BTP
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
INTERNAL – SAP and Partners Only 587

## PDF page 503
Reduction of the Technical Debt with the deletion of unused code
Custom code 1) 6 months project, focused on conversion
Technical
usage Data and move to the Cloud (without Business
Debt
Collection for 16 transformation, only mandatory changes)
months
2) Adoption of Fiori and retirement of SAPGUI
SCMON and ECC to S/4HANA
SUSG conversion project
Deletion of
unused Code
Technical Debt of the
during the
Custom Code migrated
conversion
from ECC to S/4HANA
SAP ERP Move to SAP S/4HANA Cloud Private Edition
Central Component SAP S/4HANA
INTERNAL – SAP and Partners Only 591

## PDF page 504
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
worksChuospsto (SmAPfi elds KPIs, Process Extensibility
CAL instance for tests
Innovations, Apps, UX, Governance and
Extensibility • The transfo D rm ef a in t i i t o io n n o o f f t th h e e E c x l t a e s n s s i i c b a ili l t y c u A s rc t h o i m tec f t i u e r l e d s using “Custom fields enablement”, to allow them to
Analytics, AI) process for new
Governance, Evaluation of the be used with the aCnud sDteovmel oFpimelednst Gapuipd eislin neost a mandatory activity during the System Conversion
extensions
technologies,
KPIs, Processes Strategic Expternosjeibciltity
prototyping, POCs Extensibility Practices for System Setup *
Decisions
• This activity can be performed in the post conversion phase, with other custom code renovation
RISE with SAP Deep dive learning and certification of
Customer Innovation
activities
Methodology and Transformation Architects, Analytics, UX and Development
• The project team nueseerdss w tioth eHvaanldusa oten tief stthsere is any custom field that needs to be renovated during
Strategy and Clean Core runbook
roadmap in CALM the proje C c o t n d a u n c d t t f h o e r r t u h n o b s o e o , k p a e c r ti f v o it r i m es , t h pe e r f “ o C rm us t t h o e m C le fi a e n ld C s o e re n Q a u b a le lit m y G en at t e ” s ( e an .g d . E th xt e e n c s u ib s i t li o ty m M f a ie tu l r d it y is A r s e s q e u ss ir m e e d n t
in an important CDS view or API). The other classical custom fields can be enabled after Go Live
Legacy Custom Custom code usage Data Define code to be Sandbox Conversion
• Technical consideration: Using Custom Fields requires the corresponding Business Context to be
Collection for 18 months deleted
code deletion
available Delete unused code (during the conversion runs)
(SCMON and SUSG)
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
LLiisstt ccllaassssiiccaall ccuussttoomm ffiieellddss ““CCuussttoomm ffiieellddss eennaabblleemmeenntt””
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions
Core extensions extensions
List the classical custom fields “Custom fields enablement”
• Identify the classical custom Fields, • Transaction SCFDD_eEsiUgnI, tehne aUbXl eex lpeegraiecnyc ecustom fieIlmdpsl esmo etnhta StA tPh eFyio cria wnit hb em iunsimeadl with the Custom Adopt
created using the “old” append Fields app. Doing so lets you expose these fields tod iOsrDupattioan s aeprpvriocaecsh, aSnOd ArePtir es ervices, … Fiori as
Evaluate mandatory S/4HANA Fiori Apps
SAPGUI the UI and
field, that will need to be exposed in 1. https://me.sap.com/notes/3632977 https://me.sap.com/notes/3699976
Fiori 2. https://community.saEpv.caolmu/at5t/ete schtnaonlodgayr-bdlo Sg-/p4oHstAs-NbyA-s aapn/caolnyvteicrta-ml anually-created-append-fields-to-real-key-user-custom-fields/ba-p/13967399drive the
Enable End User in SAP Fiori
APIs, CDS views, using the 3. https://community.sapA.cpopms/t5 a/enndte rQpruisee-rrye sBourorcwe-spleanr ntiong r-eblpogla-pcoes ts-by-sap/adding-custom-database-field-to-standard-fiori-apps-in-s-4hana-with- users
custom/ba-p/13450040
AnaClyutisctsom Fields App classical reports Train the users in mandatory towards
4. https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/key-user-custom-fields-in-s-4hana-cloud-private-edition-and-on-premise-
S/4HANA Fiori Apps the
dos/ba-p/14026871Map the CDS views category Query per
Joule / AI 5. https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/custom-fields-in-s-4hana-key-user-versus-developer-extensibility/baa-nalytical
LOB (to be used in Query Browser) Train selected Key users
p/13557355 Apps
(multipliers) in Analytical apps and
6. https://help.sap.com/docs/ABAP_PLATFORM_NEW/b5670aaaa2364a29935f40b16499972d/4accfedc4d2e49c1b321b6ebf288a430.html
7. https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/how-to-creQateu-ecursyt oBmr-ofiewldsse-inr-the-business-process-with-quot-custom-
field/ba-p/13522558
INTERNAL – SAP and Partners Only 592

## PDF page 505
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
workshops (SAP KPIs, Process Extensibility
CAL instance for tests
Innovations, Apps, UX, Governance and
Extensibility Definition of the Extensibility Architecture
Design of new Clean Core extensioAnnaslytics, AI) Ipmropcleesms feonr tnaetwio n of new Clean Core extensions
Governance, Evaluation of the and Development Guidelines
• This is not utseucahnl oinlo fgaiesst ,S ystem Conversion projects, but in case new extensions • e T xt h e e ns n io e n w s extensions that are not being
KPIs, Processes Strategic Extensibility
are developproetdo tiynp iSng/4, HPOACNsA, the LeDveecli sAio fnras mework can be evaluated and used Extensibility cPorancvtiecretse fdo rf rSoymst eEmC SCe tsuph o* uld follow the new
RISE wit•h SAAPn example of use case are new extensions that reqDueireep dBiTveP l esaernrvinicge asn da cnedr tification of Governance and process following the “Stay
Customer Innovation
Methodologtyherefore acnadn T urasnes ftohrem anteiown released APIs availableA irnc hSit/e4cHtsA, ANnAal,y itnicsst,e UaXd a onfd tDheev elopment Clean” guidelines
users with Hands on tests
classic BAPISstrategy and Clean Core runbook • An active SSB should already be in place during
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
• In New Implementation projects, in the other hand, all new extensions should the System Conversion Project to evaluate all
Legacy Custo fo m ll owC uthsteo me xctoednes uibsailgitey Dgaotav ernanDceefin aen cdo dper otoc bees s, reSlyainndgb ooxn C Roenvleearssioend objects extensions functional requests that deviate from
code deletioannd wChoellenc tnioont faovr a1i8la mbolent,h ws rap of Levdeelle Bte dobjects the development guidelines
Delete unused code (during the conversion runs)
(SCMON and SUSG)
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
code (S/4HANA Adaptation)
code adaptation
List classical custom fields “Custom fields enablement”
New Clean Core
DDeessiiggnn ooff nneeww CClleeaann IImmpplleemmeennttaattiioonn ooff nneeww CClleeaann CCoorree
Extensions
CCoorree eexxtteennssiioonnss eexxtteennssiioonnss
Design the UX experience Implement SAP Fiori with minimal Adopt
disruption approach and retire Fiori as
Evaluate mandatory S/4HANA Fiori Apps
SAPGUI the UI and
Fiori
Evaluate standard S/4HANA analytical drive the
Enable End User in SAP Fiori
Analytics Apps and Query Browser to replace users
classical reports Train the users in mandatory towards
Automation
S/4HANA Fiori Apps the
Map the CDS views category Query per
Joule / AI analytical
LOB (to be used in Query Browser) Train selected Key users
Apps
(multipliers) in Analytical apps and
Query Browser
INTERNAL – SAP and Partners Only 593

## PDF page 506
Example of tasks before and during the conversion project 6 months project, focused on
conversion and move to the Cloud
Discover Prepare Explore Realize Deploy Run
General learning program Envision the future Definition of the Extensibility Governance, Implement the Extensibility Governance, monitor of KPIs
Why Fiori must be adopted How to implement Fiori with minimal business impact (keeping the classical
workshops (SAP KPIs, Process Extensibility
CAL instance for tests
and SAPGUI retired Innovations, Appst,r UaXn,s actions available for the user) Governance and
Extensibility Definition of the Extensibility Architecture
Analytics, AI) process for new
Governance,
• AElvl aSluAaPtio Inn onfo tvhae tions are • All classi
a
c
n
a
d
l t
D
ra
ev
n
e
s
lo
a
p
c
m
tio
en
n
t
s
G
,
u
in
id
c
e
lu
lin
d
e
in
s
g Z transactions, can be published in Fiori and
extensions
KPIs, Processes detleivcehnreodlo gthierso, ugh FSiotrrait Aegpicp sExtensibilitya ccessed by the users
prototyping, POCs Extensibility Practices for System Setup *
• The transition to S/4HANDAec isions • Some classic transactions are already available in the S/4HANA catalogs and business
RISE with SAP Deep dive learning and certification of
CCuslotoumde rP Irninvoavteat iEond ition is the roles
Methodology and Transformation Architects, Analytics, UX and Development
first step for the Customer to • When any classic transaction is not available in S/4HANA catalogs and business roles,
users with Hands on tests
Strategy and Clean Core runbook
adopt SAP innovations and the Customer can create custom catalogs, business roles, spaces and pages to publish
roadmap in CALM Conduct the runbook activities, perform the Clean Core Quality Gates and Extensibility Maturity Assessment
transform their business all the classic transactions that the users use in ECC. This will allow a transition from to
Legacy Custom Cu•stomT hceodreef uosraeg, eit D’sa twa orth tDheef ineeff ocortd e to be FiorSia wnditbho mx Cinoinmvearls biounsiness impact
Collection for 18 months deleted
code deletion to retire SAPGUI in the • Some specific key userDse, ltehtea ut ncuasne da ccot daes ( dmuurilntigp tliheer sco, ncvaenrs bioen trruanisn)ed in S/4HANA Apps
(SCMON and SUSG)
system conversion project with analytical features or the Query Browser App. These Apps, can replace “Z reports”
List the impacted custom
Legacy Custom Custom code adaptation to S/4HANA
that coulcdo dbee ( Sre/4tHirAeNdA in A tdhaep tfautitounr)e, in line with the “Get Clean” guideline
code adaptation
List classical custom fields “Custom fields enablement”
New Clean Core
Design of new Clean Implementation of new Clean Core
Extensions
Core extensions extensions
DDeessiiggnn tthhee UUXX eexxppeerriieennccee IImmpplleemmeenntt SSAAPP FFiioorrii wwiitthh mmiinniimmaall AAddoopptt
ddiissrruuppttiioonn aapppprrooaacchh aanndd rreettiirree FFiioorrii aass
EEvvaalluuaattee mmaannddaattoorryy SS//44HHAANNAA FFiioorrii AAppppss
SSAAPPGGUUII tthhee UUII aanndd
Fiori
EEvvaalluuaattee ssttaannddaarrdd SS//44HHAANNAA aannaallyyttiiccaall ddrriivvee tthhee
EnEabnlaeb tleh eE Ennd dU Usesre rins SinA SPA FPi oFriiori
Analytics AAppppss aanndd QQuueerryy BBrroowwsseerr ttoo rreeppllaaccee uusseerrss
ccllaassssiiccaall rreeppoorrttss TTrraaiinn tthhee uusseerrss iinn mmaannddaattoorryy ttoowwaarrddss
Automation
SS//44HHAANNAA FFiioorrii AAppppss tthhee
MMaapp t hthee C CDDSS v vieiewwss “ ccaatteeggoorryy QQuueerryy ”p peer r
Joule / AI aannaallyyttiiccaall
LLOOBB ((ttoo bbee uusseedd iinn QQuueerryy BBrroowwsseerr)) TTrraaiinn sseelleecctteedd KKeeyy uusseerrss
AAppppss
((mmuullttiipplliieerrss)) iinn AAnnaallyyttiiccaall aappppss aanndd
QQuueerryy BBrroowwsseerr
INTERNAL – SAP and Partners Only 594

## PDF page 507
Example of Classic transaction available in S/4HANA - 1/2
INTERNAL – SAP and Partners Only 595

## PDF page 508
Example of Classic transaction available in S/4HANA - 2/2
INTERNAL – SAP and Partners Only 596

## PDF page 509
How to Get and Stay Clean?
Example of post conversion tasks to reduce the Technical debt

## PDF page 510
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
Identify the Business Transformation requirements
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
and priorities
List the most actively used extensions Retire Unused custom code
Classic
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize
optimization B (when A isn’t available) extensions that have a business case
Classify the extensions by Business area business
and renovation
value: Level D Modification + “Clones” + implicit Renovate extensions without
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions
optimized and respective business processes Design and implement new Clean Core extensions
with
tangible
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
impact
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension
Improvement as-is process flows and AI Assistants and agents
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
and AI
evaluation
Paradigm
AI, Situation Handling, Build Process automation Technical Replace classical reports by Analytical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, Joule agents, …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only “Custom fields enablement” 598

## PDF page 511
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
AAsssseessss yyoouurr ssttaarrttiinngg ppooiinntt EExxtteennssiibbiilliittyy GGoovveerrnnaannccee,, mmoonniittoorr ooff KKPPIIss aanndd MMaattuurriittyy AAsssseessssmmeenntt cchheecckkss ++ SSeett TTeecchhnniiccaall DDeebbtt rreedduuccttiioonn ggooaallss
Governance, RReegguullaarr ccooddee uussaaggee ddaattaa aasssseessssmmeenntt ttoo iiddeennttiiffyy aanndd rreettiirree uunnuusseedd ccooddee ((SSCCMMOONN aanndd SSUUSSGG)) ++ RReegguullaarr AATTCC cchheecckkss
KPIs
Identify the Business Transformation requirements
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
and priorities
List the most actively used extensions Retire Unused custom code
Classic
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions
retirement, Identify extensions wit P h o hi s g t h G nu o m L be iv r e o f H in y c p id e e r n t c s are Governance L e a v c el t i D v , i C ti e - s Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize
optimization • Assess your starting point (Technical debt scorBe (,w Lheevne Als is An ’Bt a vCa iDlab sleh)are, % of extensions that have a business case
Classify the extensions by Business area business
and renovation Unused Customer Objec v ts a , l u . e .. : ) Level D Modification + “Clones” + implicit Renovate extensions without
Classify the extensions by use case
• Run the extensibility GovFeorcnuasn ce proecnehsasn ctoe meennftosr:c Cela tshseif yC alenda nA dCapotr eor g Rueipdleaclienes documentation
New Clean Core
Run ATC to check the • exte P ns e io rf n o s r m tec t h h n e ic e al x d te eb n i s t ibilirteym medaitautiroitny assessment Check
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to ident•ify SMQLe astsauterme eanntsd t oc obme municate the KPIs regularly
extensions
optimized and respec • tive S b e us t i t n a e r s g s e p ts ro f c o e r s s th es e reduction of Technical debt Design and implement new Clean Core extensions
with
• Set targets for the extentsainognib mlea turity level dimensions
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require• impErnovfoermceen tmandatory enablement of arch S it / e 4H ct A s N a A n b d e s d t e p v ra e c lo ti p ce e s r s Apps CX, SuccessFactors)
impact
• Celebrate all achievements and promote the positive Business Impact and
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension
Improvement as-is proces B s u fl s o i w n s ess Value of the transformation journey towards Clean Core
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
and AI
evaluation
Paradigm
AI, Situation Handling, Build Process automation Technical Replace classical reports by Analytical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 599

## PDF page 512
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
IIddeennttiiffyy tthhee BBuussiinneessss TTrraannssffoorrmmaattiioonn rreeqquuiirreemmeennttss
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
aanndd pprriioorriittiieess
Focusing on the improvement of Business Value, follow below some
LLiisstt tthhee mmoosstt aaccttiivveellyy uusseedd eexxtteennssiioonnss Retire Unused custom code
examples of evaluations to support the definition and roadmap of initiatives
Classic
extensions LLiisstt tthhee mmoosstt bbuussiinneessss--ccrriittiiccaall eexxtteennssiioonnss to reducSeQ Lth ceod tee pcuhsnhidcoawln d feorb piterformance optimization Renovate by use case
retirement, IIddeennttiiffyy eexxtteennssiioonnss wwiitthh hhiigghh nnuummbbeerr ooff iinncciiddeennttss • PrerLeeqvueils Dit,e C: R- Aedvaipste e txhiset inBgu Lseinveels Cs, TDr taon Lsefvoerlm Aa otrio n reRqeuniorevamtee anntsd iannndov parteio irmitpieosrt,a nt
Prioritize
optimization B (when A isn’t available) extensions that have a business case
based on the Customer scenario after the conversion stabilization
CCllaassssiiffyy tthhee eexxtteennssiioonnss bbyy BBuussiinneessss aarreeaa business
and renovation
value: Level D Modification + “Clones” + implicit Renovate extensions without
CCllaassssiiffyy tthhee eexxtteennssiioonnss bbyy uussee ccaassee
Focus enhancements: Classify and Adapt or Replace documentation
• What are the business areas negatively impacted by extensions in their critical
New Clean Core
RRuunn AATTCC ttoo cchheecckk tthhee eexxtteennssiioonnss tteecchhnniiccaall ddeebbiitt remediation
processes (e.g. very actively used extensions, with high number of incidents,
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SSQQLL MMoonniittoorr ttoo iiddeennttiiffyy SSQQLL ssttaatteemmeennttss ttoo bbee
extensionbs ad user experience)
ooppttiimmiizzeedd aanndd rreessppeeccttiivvee bbuussiinneessss pprroocceesssseess Design and implement new Clean Core extensions
wi•th What are the business areas that historically have the greatest number of
tangible
Signavio Process Insights to identify processes issuesR edpularcineg c luaspsgicraald terasn?sactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement • What arSe/ 4tHhAeN bAu bseinset psrsa catriceeass A wppitsh the highest techniCcXa,l Sduecbcte?ssFactors)
impact
Process Signavio Process Intelligence to understand the • Are R th e e p r la e c c e r e it x i t c e a n l s e io x n t s e b n y s i S o / n 4H s A w N h A e A re pp t s he p E e v r a fo lu r a m te a C n l c ea e n i s C o a r e b c o o tt m le p n li e an c t k P t a o r t t n h e e r solutions
Extension
Improvement as-is process flows process?
Guidelines
and Innovation
Signavio Process Modeler to document your as-is • What are the use cases that we can replace the legacy extensions by Level A or
In Memory
processes and import SAP Best Practices for by new S/4HANA capabilities or Fiori Apps? (e.g. Reports (analytics) >
and AI
evaluation
ParadigmS/4HANA embedded analytics, Legacy enhancements > Released BAdIs,
AI, Situation Handling, Build Process automation Technical W or R k e fl p o l w ac s e > cl a E s v s e ic n a t l r M ep a o n rt a s g b e y m A e na n l t y t a ic n a d l Build E p v r a o l c ua e t s e s c u a s u t t o o m m c a o t d io e n re ) novation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 600

## PDF page 513
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment U to s i e de S nt i i g fy n a a n v d i o re t t i o re e u v n a us lu ed a t c e o d o e p ( p SC o M rt O u N n i a t n ie d s S U fo S r G ) P + r o R c eg e u s la s r i A m TC p r c o h v e e ck m s ent and
KPIs reduction of the Technical debt
IIddeennttiiffyy tthhee BBuussiinneessss TTrraannssffoorrmmaattiioonn rreeqquuiirreemmeennttss
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
aanndd pprriioorriittiieess • Prerequisite: Revise the Business Transformation requirements and priorities,
based on the Customer scenario after the conversion stabilization
List the most actively used extensions Retire Unused custom code
Classic
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions • Signavio Process Insights
retirement, Identify extensions with high number of incidents • Leve E l v D a , C lu - a A te d a y p o t u e r x i c s u tin rr g e L n e t v u e s l C ag , D e t b o a L s e e ve d l o A n o r in dus R tr e y n o K v P at I e b a e n n d c i h nn m o a va rk te s i m to p f o i r n t d an t
Prioritize
optimization B (when A isn’t available) extensions that have a business case
Classify the extensions by Business area business priority target areas for improvement
and renovation
value: Level D Modification + “Clones” + implicit Renovate extensions without
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
• Signavio Process Intelligence
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions • Evaluate the “As is” process flows that Process Intelligence creates with
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions the S/4HANA usage data analysis (event logs)
optimized and respective business processes Design and implement new Clean Core extensions
with
• Identify process variants, bottlenecks, deviations
tangible
SSiiggnnaavviioo PPrroocceessss IInnssiigghhttss ttoo iiddeennttiiffyy pprroocceesssseess • RepSlaeclee cctl aas spicroalc terasnss avcatrioianns tw aitnhd creEavteal uaa rtee fLeOrBen scoelu tpioronsc e(EsWs M, TM, PPDS, Ariba,
business
tthhaatt rreeqquuiirree iimmpprroovveemmeenntt S/4HANA best practices Apps CX, SuccessFactors
impact • Export the “As is” reference processes in BPMN format
Process SSiiggnnaavviioo PPrroocceessss IInntteelllliiggeennccee ttoo uunnddeerrssttaanndd tthhee Replace extensions by S/4HANA Apps Evaluate Clean Core-compliant Partner solutions
Extension
Improvement aass--iiss pprroocceessss fflloowwss
• Signavio Process Modeler
Guidelines
and Innovation
SSiiggnnaavviioo PPrroocceessss MMooddeelleerr ttoo ddooccuummeenntt yyoouurr aass--iiss • Import your “As is” processes in BPMN format
In Memory
pprroocceesssseess aanndd iimmppoorrtt SSAAPP BBeesstt PPrraaccttiicceess ffoorr
• Import SAP delivered Best Practices processes
and AI
eevvaalluuaattiioonn
Paradigm • Design your “To be” processes tailored to your Business requirements
AI, Situation Handling, Build Process automation Technical Replaacned c dlarsivsiecnal breyp oCrltes abny ACnoarlyetical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt • AGpposv, eQrune ryyo Burro pwrsoecr eansds eJsoule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction • RenCoovmatem eexntetn: sInio ncsa wseit ht hSeit uCatuiosnto mer do M e I s R n O ’ t + h Q a M v ) e - a A B P A r P o c C e lo s u s d M , B o u d il e d l P e r r o cess
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Hansdulibngs,c Briupitldio Pnr,o Sceigssn aauvtioom Partoiocne, ss Navigator can be used to evaluate the
Adopt Query Browser and Key-User extensibility E S ve A n P t M B a e na s g t e P m ra en c t t , i c A e I ( s M s a c c o hi p n e e items E p v r a o lu c a e te s s c u d s i t a o g m r a c m od s e a re n p d la t t f e o s rm t s in c g ri t p o t s SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 601

## PDF page 514
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility GovernaDnicsec, movoenirtyor wofo KrPkIss haondp Ms aturity Assessment checks + Set Technical Debt reduction goals
• Prerequisite: Revise the Business Transformation requirements and priorities,
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs based on the Customer scenario after the conversion stabilization
IIddeennttiiffyy tthhee BBuussiinneessss TTrraannssffoorrmmaattiioonn rreeqquuiirreemmeennttss
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
aanndd pprriioorriittiieess
• Prepare a Sandbox system and test SAP Innovations scenarios (e.g. AI, Joule,
List the most actively used extensions Retire Unused custom code
Custom agents and assistants, Situation Handling, Build Process automation,
Classic
extensions
List the most business-critical extensions EvenStQ ML acondaeg peumshednotw, Bn TfoPr ,p …erf)ormance optimization Renovate by use case
retirement, Identify extensions with high number of incidents • CondLeuvcetl dDi,s Cc o- vAedrayp tw eoxirsktsinhgo Lpesv edl rCiv, eDn t ot oL etvheel AC ours tomeRre nBouvsaitne easnsd iTnrnaonvsatfeo rimmpaotriotann t
Prioritize
optimization B (when A isn’t available) extensions that have a business case
requirements and priorities
Classify the extensions by Business area business
and renovation
valu• e: When BLuesvinele Ds sM oImdipficroatvioenm +e “nCtl ovnaelus”e + i sim idpelicnitt ified, plan Raenn ionviatitaet eivxete nosf iIonnnso wviathtoiount
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
adoption
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extenFsiioonrsi as the UI
optimized and respective business processes Design and implement new Clean Core extensions
with
• Assure the adoption of Fiori as the standard UI (retire SAPGUI)
tangible
Signavio Process Insights to identify processes • Drive Rthepel aucsee crlsas tsoicwaal trrdasn stahcet ioannsa wlyittihc al ApEpvsal uthaatet LcOaBn ssouluptpioonrst (tEhWeiMr ,d TaMy,- PtoP-DdSa, yA riba,
business
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
impact activities
Process Signavio Process Intelligence to understand the • The Rreepslualcte s ehxoteunlsdi obnes tbhye S u/4sHeArNsA c oApmpfsortaEbvlea lwuaitteh CFleioarni Ctoo raec ccoemspsl ilaengt aPcaryt ner solutions
Extension
Improvement as-is process flows
transactions and Fiori Analytical Apps with drill downs
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
Query Browser and Key-User extensibility for custom Analytics
and AI
evaluation
Parad•igmTrain some Key users that will be multipliers in the use of Query Browser for
AAII,, SSiittuuaattiioonn HHaannddlliinngg,, BBuuiilldd PPrroocceessss aauuttoommaattiioonn Technicalm ultRi-edpilmaceen cslaiosnsi caanl arelypsorists by Analytical Evaluate custom code renovation of the z
Fiori aanndd EEvveenntt MMaannaaggeemmeenntt DDiissccoovveerryy wwoorrkksshhoopp De•bt PromotAep pthse, Q uuseery o Bf rQowuseerry a nbdro Jwousleer to storamnesa scptioencsif tich aut speerrf orormle asu (teom.ga.t ifoinnasn (ec.eg., MIGO +
Analytics AAddoopptt FFiioorrii aass tthhee UUII aanndd ddrriivvee tthhee uusseerrss ttoowwaarrddss reduction l ogistics, …) MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
tthhee aannaallyyttiiccaall AAppppss
Automation • TrainH saonmdlien gs, eBlueicldte Pdro Kceesys uasuetorms aotiro InT, analysts (depending on the Customer
AAddoopptt QQuueerryy BBrroowwsseerr aanndd KKeeyy--UUsseerr eexxtteennssiibbiilliittyy strateg E y v ) e t n o t u M s a e n a t g h e e m K en e t y , - A U I ( s M e a r c e h x in t e e nsibili E ty v a a lu n a d t e c c re us a t t o e m c c u o s d t e o m rep A la n tf a o l r y m ti i c n s g ( to C S u A s P to B m P T
Joule / AI
ffoorr ccuussttoomm AAnnaallyyttiiccss Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only CDS views, custom analytics tiles, custom analytics Apps, …) 607

## PDF page 515
Hands-on training: The Art of Fiori, Enabling Top 5 Capabilities | 13th - 17th July 2026 | Virtual
https://partnerbenefitscatalog.sap.com/Partner-Benefits-Catalog/Customer-Engagement-%26-Post-Sales/The-Art-of-Fiori%2C-Enabling-Top-5-Capabilities-%7C-13th---17th-July-2026-%7C-Virtual-/p/R000011
INTERNAL – SAP and Partners Only 608

## PDF page 516
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
IIddeennttiiffyy tthhee BBuussiinneessss TTrraannssffoorrmmaattiioonn rreeqquuiirreemmeennttss
PPrrooggrraammss aanndd IInniittiiaattiivveess ttoo:: IImmpprroovvee BBuussiinneessss VVaalluuee aanndd RReedduuccee tthhee TTeecchhnniiccaall DDeebbtt
aanndd pprriioorriittiieess
Definition of the programs and initiatives to Improve Business Value
List the most actively used extensions Retire Unused custom code
Classic and reduce the Technical Debt
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions • Based on all the evaluations, ideas and initiatives designed in the
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
previous slides and driven by the Customer Transformation requirements
PPrriioorriittiizzee
optimization B (when A isn’t available) extensions that have a business case
Classify the extensions by Business area bbuussiinneessss and priorities
and renovation
vvaalluuee:: Level D Modification + “Clones” + implicit Renovate extensions without
• Define Technical projects for Technical Debt reduction (e.g. renovation
Classify the extensions by use case
FFooccuuss enhancements: Classify and Adapt or Replace documentation
New Clean Core of code from Level D in Level A, Replatform of extensions to SAP BTP,
Run ATC to check the extensions technical debit rreemmeeddiiaattiioonn
Extensions eeffffoorrttss oonn Docu . m ..) ent your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
eexxtteennssiioonnss • Define Technical projects to improve Business Value (e.g.
optimized and respective business processes Design and implement new Clean Core extensions
wwiitthh
performance optimization through code pushdown)
ttaannggiibbllee
Signavio Process Insights to identify processes Repl•aceB cyl absusiscianle trsasn saarcetaio nasn wdi trho le: dEevfianluea stet aLnOdBa srodl uFtiioonris A (EpWpsM ,t oTM b,e P PaDdSo,p Ateribda t,o
bbuussiinneessss
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
iimmppaacctt replace classic transactions and classic extensions (e.g. use of SAP
Process Signavio Process Intelligence to understand the Replace Bexetesnt sPiornasc btiyc eSs/4 rHeAcNoAm AmppesndedEv Failouarit eA Cplpeasn t oC opree rcfoomrmpl iaanctt iPvaitritense rt hsoaltu ttihoen s
EExxtteennssiioonn
Improvement as-is process flows
GGuuiiddeelliinneess Customer still execute with classic transactions)
and Innovation
Signavio Process Modeler to document your as-is • By business area and role: define a list of classical reports to be
IInn MMeemmoorryy
processes and import SAP Best Practices for
aanndd AAII retired and replaces by standard S/4HANA Apps, Query Browser and
evaluation
PPaarraaddiiggmm Custom analytical Apps
AI, Situation Handling, Build Process automation TTeecchhnniiccaall Replac•e cBlays bsiucasli nreepsosr tas rbeya A: ndaelyftiniceal SAP LEOvBal usaotelu ctuiosntosm ( EcoWdeM re, nToMva,t iPoPn DofS th, eA zr iba,
Fiori and Event Management Discovery workshop DDeebbtt Apps,C QXu,e rSyu BcrcoewssserF aancdt oJrosu)l eand Ctrleanasna cCtioornes ctheartt pifeierfdo rPma arutntoemr astoiolunsti o(en.gs. tMoI GO +
Analytics Adopt Fiori as the UI and drive the users towards rreedduuccttiioonn Renovattrea enxstefonrsmio nths ew ibthu Ssiitnueastiosn p rocesse M s IR a O n + d Q r M et ) i r - e A B e A x P te C n l s o i u o d n , s Build Process
ttaarrggeettss automation, Event Management, WalkMe …
the analytical Apps
Automation Ha•ndlinBgy, B buuilds iPnreocsess sa areutao:m daetiofinn, e the adoption of SAP Innovations scenarios
Adopt Query Browser and Key-User extensibility Even ( t e M .g a . n A ag I e , m Jo en u t l , e A , I C (M u a s c t h o i m ne agents E v a a n lu d a t a e s c s u i s s t t o a m n t c s o , d S e i r t e u p a l t a i t o fo n r m H i a n n g d to li n S g A , P B B u P i T ld
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only Process automation, Event Management, BTP, …) 609

## PDF page 517
How to Get Clean? Retire Renovate or Innovate Adapt
INTERNAL – SAP and Partners Only 610

## PDF page 518
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, RReegguullaarr ccooddee uussaaggee ddaattaa aasssseessssmmeenntt ttoo iiddeennttiiffyy aanndd rreettiirree uunnuusseedd ccooddee ((SSCCMMOONN aanndd SSUUSSGG)) ++ RReegguullaarr AATTCC cchheecckkss
KPIs
Identify the Business Transformation requirements
PPrrooggrraammss aanndd IInniittiiaattiivveess ttoo:: IImmpprroovvee BBuussiinneessss VVaalluuee aanndd RReedduuccee tthhee TTeecchhnniiccaall DDeebbtt
and priorities
List the most actively used extensions RReettiirree UUnnuusseedd ccuussttoomm ccooddee
Classic
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize
optimization Retire UnBu s(wehde nc uA sistno’mt a vcaoiladbele) extensions that have a business case
Classify the extensions by Business area business
and renovation value: • LReveegl uDl aMrolyd icfiocallteiocnt +u s“Calgoene dsa” t+a i minp plicroit duction wiRthe ntroavnatsea ecxttieonnssio ns without
Classify the extensions by use case
Focus enhSanUcSemGe/SntCs:M COlasNsify and Adapt or Replace documentation
New Clean Core
Run ATC to check the extensions technical debit remediation • Analyze usage data in SAP’s Custom Code Migration app.
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be • Remove / backup unused classic ABAP custom code with the Custom
extensions
optimized and respective business processes Code MigratioDnes aigpnp and implement new Clean Core extensions
with
tangible • You can keep a backup of the deleted objects using abapGit in order to
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement S s /4 t H o A re N A th b e e s o t b p je ra c c t t s ic o es f t A h p e p s deletion transport re C q X u , e S s uc t c o e f s t s h F e a c S to A rs P ) Fiori App
impact
Custom Code Migration in a Git Repository
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension
Improvement as-is process flows
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
and AI
evaluation
Paradigm
AI, Situation Handling, Build Process automation Technical Replace classical reports by Analytical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 611

## PDF page 519
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
Identify the Business Transformation requirements
PPrrooggrraammss aanndd IInniittiiaattiivveess ttoo:: IImmpprroovvee BBuussiinneessss VVaalluuee aanndd RReedduuccee tthhee TTeecchhnniiccaall DDeebbtt
and priorities
List the most actively used extensions Retire Unused custom code
Classic
List the most business-critical extensions SSQQLL ccooddee ppuusshhddoowwnn ffoorr ppeerrffoorrmmaannccee ooppttiimmiizzaattiioonn Renovate by use case
extensions
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
Prioritize
optimization B (when A isn’t available) extensions that have a business case
Classify the extensions by Business area business
and renovation
value: SQLLe vceol dDe M poduisfichadtioonw +n “ fColorn pees”r f+o irmmplaicnitc e optimizRaetnioovnate extensions without
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
• SQL monitor tool, analyzes all database queries in the production
New Clean Core
Run ATC to check the extensions technical debit remediation
system
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SSQQLL MMoonniittoorr ttoo iiddeennttiiffyy SSQQLL ssttaatteemmeennttss ttoo bbee
extensions • SQL monitor identifies expensive SQL statements and the
ooppttiimmiizzeedd aanndd rreessppeeccttiivvee bbuussiinneessss pprroocceesssseess Design and implement new Clean Core extensions
with corresponding objects in ABAP
tangible
Signavio Process Insights to identify processes •RepUlacsee c plaesrsfiocraml traanncseac ctihonesc kwsit hfr om AEBvaAluPa ttee LsOt Bco scokluptiito ntos (aEnWaMly, zTeM ,t hPePsDeS , Ariba,
business
that require improvement So/4bHjAeNctAs baensdt p graectt ihcienst sA popns performance optimCizXa, Stioucnc essFactors)
impact
Process Signavio Process Intelligence to understand the R • epla U ce s e e x C ten D s S io , n A s M by D S P /4 a H n A d N A A A B p A p P s SQ E L v a t l o u a a te d a C p le t a p n e C r o fo re r m co a m n p c li e a - n c t r P it a ic rt a n l e S r s Q o L lu tions
Extension
Improvement as-is process flows queries
Guidelines
and Innovation
Signavio Process Modeler to document your as-is • Learn more about tools from ABAP online:
In Memory
processes and import SAP Best Practices for https://pages.community.sap.com/topics/abap-testing-analysis
and AI
evaluation
Paradigm • Example of performance improvement:
AI, Situation Handling, Build Process automation Technical Replace c • lass B ic e al f o re r p e o c rt o s d b e y A p n u a s ly h t d ic o a w l n: 30 E m va in luate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, •QueAryf tBerro wcosedre a npdu sJohudloe wn: <tr a1n msaicntions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, WalkMe …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only 612

## PDF page 520
SQL code pushdown for performance optimization
Calculation
AS ABAP
“Data to Code” “Code to Data”
SAP HANA
Database
Calculation
Code pushdown means delegating data intense calculations to the
database layer e.g. by using advanced Open SQL, advanced ABAP views
and SQL Script
INTERNAL – SAP and Partners Only 613

## PDF page 521
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
Identify the Business Transformation requirements
Programs and Initiatives to: Improve Business Value and Reduce the Technical Debt
and priorities
Prioritized by Business Value:
List the most actively used extensions Retire Unused custom code
Classic
List the most business-critical extensions SQL code pushdown for performance optimization Renovate by use case
extensions Innovation and Transformation initiatives with
retirement, Identify extensions with high number of incidents Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
optimization Prioritize StBa (wnhdena Ar idsn ’tp avraoilacblee)sses, soluextteinosinonss thaant hdav et ao bouslisness case
Classify the extensions by Business area business
and renovation
value: Level D Modification + “Clones” + implicit Renovate extensions without
Classify the extensions by use case
Focus enhancements: Classify and Adapt or Replace documentation
New Clean Core
Run ATC to check the extensions technical debit remediation
Extensions
efforts on Document your Level A objects and manage your Wrappers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions
optimized and respective business processes Design and implement new Clean Core extensions
with
tangible
Signavio Process Insights to identify processes Replace classical transactions with Evaluate LOB solutions (EWM, TM, PPDS, Ariba,
business
that require improvement S/4HANA best practices Apps CX, SuccessFactors)
impact
Process Signavio Process Intelligence to understand the Replace extensions by S/4HANA Apps Evaluate Clean Core compliant Partner solutions
Extension
Improvement as-is process flows and AI Assistants and agents
Guidelines
and Innovation
Signavio Process Modeler to document your as-is
In Memory
processes and import SAP Best Practices for
and AI
evaluation
Paradigm
AI, Situation Handling, Build Process automation Technical Replace classical reports by Analytical Evaluate custom code renovation of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
Renovate extensions with Situation
targets automation, Event Management, Joule agents, …
the analytical Apps
Automation Handling, Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only “Custom fields enablement” 614

## PDF page 522
Example of post conversion tasks to reduce the Technical debt Activities that reduce
the Technical Debt
Run
Assess your starting point Extensibility Governance, monitor of KPIs and Maturity Assessment checks + Set Technical Debt reduction goals
Governance, Regular code usage data assessment to identify and retire unused code (SCMON and SUSG) + Regular ATC checks
KPIs
Identify the Business Transformation requirements
PPrrooggrraammss aanndd IInniittiiaattiivveess ttoo:: IImmpprroovvee BBuussiinneessss VVaalluuee aanndd RReedduuccee tthhee TTeecchhnniiccaall DDeebbtt
and priorities
Replacement of extensions and classical transactions by S/4HANA Apps, LOB
LLiisstt tthhee mmoosstt aaccttiivveellyy uusseedd eexxtteennssiioonnss Retire Unused custom code
Classic
solutions and Clean Core compliant Partner solutions
LLiisstt tthhee mmoosstt bbuussiinneessss--ccrriittiiccaall eexxtteennssiioonnss SQL code pushdown for performance optimization Renovate by use case
extensions
• Prerequisite: By Business area and role, SAP LOB solutions (EWM, TM, PPDS,
retirement, IIddeennttiiffyy eexxtteennssiioonnss wwiitthh hhiigghh nnuummbbeerr ooff iinncciiddeennttss Level D, C - Adapt existing Level C, D to Level A or Renovate and innovate important
PrioritizAer iba, CX, SuccessFactors) and Clean Core certified Partner solutions have been
optimization B (when A isn’t available) extensions that have a business case
CCllaassssiiffyy tthhee eexxtteennssiioonnss bbyy BBuussiinneessss aarreeaa businesids entified to transform the business processes and retire extensions
and renovation
value: Level D Modification + “Clones” + implicit Renovate extensions without
CCllaassssiiffyy tthhee eexxtteennssiioonnss bbyy uussee ccaassee • In case the Customer is using Classical transactions (Webgui), they can adopt the
Focus enhancements: Classify and Adapt or Replace documentation
New Clean Core RRuunn AATTCC ttoo cchheecckk tthhee eexxtteennssiioonnss tteecchhnniiccaall ddeebbiitt remediat F io i n o ri Apps of the SAP Best Practices for S/4HANA
Extensions
effo•rts oTnh e CustDoomcuemr ecnatn y oaudro Lpetv ethl eA onbejwec tsst aanndd maradn aAgIe A yosusri sWtraanpptsers and exemptions by LOB
SQL Monitor to identify SQL statements to be
extensions
optimized and respective business processes Design and implement new Clean Core extensions
with
tangible
SSiiggnnaavviioo PPrroocceessss IInnssiigghhttss ttoo iiddeennttiiffyy pprroocceesssseess RReeppllaaccee ccllaassssiiccaall ttrraannssaaccttiioonnss wwiitthh EEvvaalluuaattee LLOOBB ssoolluuttiioonnss ((EEWWMM,, TTMM,, PPPPDDSS,, AArriibbaa,,
business
tthhaatt rreeqquuiirree iimmpprroovveemmeenntt SS//44HHAANNAA bbeesstt pprraaccttiicceess AAppppss CCXX,, SSuucccceessssFFaaccttoorrss))
impact
Process SSiiggnnaavviioo PPrroocceessss IInntteelllliiggeennccee ttoo uunnddeerrssttaanndd tthhee RReeppllaaccee eexxtteennssiioonnss bbyy SS//44HHAANNAA AAppppss EEvvaalluuaattee CClleeaann CCoorree ccoommpplliiaanntt PPaarrttnneerr ssoolluuttiioonnss
Extension
Improvement aass--iiss pprroocceessss fflloowwss and AI Assistants and agents
Guidelines
and Innovation
SSiiggnnaavviioo PPrroocceessss MMooddeelleerr ttoo ddooccuummeenntt yyoouurr aass--iiss
Additional possible solutions:
In Memory
pprroocceesssseess aanndd iimmppoorrtt SSAAPP BBeesstt PPrraaccttiicceess ffoorr
an•d ASI olutions that can be implemented only after the conversion to SAP S/4HANA
eevvaalluuaattiioonn
Paradigm
(e.g. new cash management, international trade instead of foreign trade, and
AI, Situation Handling, Build Process automation Technicmala rgiRne aplnaacely csliass sinicsatle raepdo ortfs c boys Atinnagly-tbicaasl ed conEtvroalluliantge cpursotfoitma bciolidtye raennaovlyastiiosn) of the z
Fiori and Event Management Discovery workshop Debt Apps, Query Browser and Joule transactions that perform automations (e.g. MIGO +
• Completely new functionalities within the scope of SAP S/4HANA, such as
Analytics Adopt Fiori as the UI and drive the users towards reduction MIRO + QM) - ABAP Cloud, Build Process
advancReedn ocvoamtep elxiatenncseio rnesp woirthti nSgit,u agtrioonu p reporting, and enterprise contract
targets automation, Event Management, WalkMe …
the analytical Apps
Automation manag H e a m nd e li n n t g , Build Process automation,
Adopt Query Browser and Key-User extensibility Event Management, AI (Machine Evaluate custom code replatforming to SAP BPT
Joule / AI • LOB solutions (EWM, TM, PPDS, Ariba, CX, SuccessFactors)
for custom Analytics Learning, Gen AI, Joule agents)
INTERNAL – SAP and Partners Only • Clean Core compliant Partner solutions 615

## PDF page 523
Domain intelligence with AI assistants and agents
Your company’s operating intelligence embedded in every business function
Autonomous Finance Autonomous SCM Autonomous Spend Autonomous HCM
AI-driven close, real-time variance Demand sensing, autonomous Intelligent sourcing, autonomous Workforce planning agents, skills
analysis, autonomous cash replenishment, and proactive invoice processing, and contract matching, and autonomous
application, and predictive disruption management compliance agents onboarding workflows*
forecasting * Provided by SAP SuccessFactors HCM Suite
Autonomous Customer Engagement Industry AI
Predictive service, autonomous lead Vertical-specific intelligence—asset management
qualification, and real-time customer in energy, regulated manufacturing in life sciences,
experience orchestration* compliance in financial services. Industry domains
span multiple autonomous functions.
* Provided by SAP Customer
Experience
Each domain combines Joule Assistants, specialized Joule Agents, the applications you run
today, and the data that flows through your private cloud.
Public © 2026 SAP SE or an SAP affiliate company. All rights reserved. See Legal Notice on www.sap.com/legal-notice for use terms, disclaimers, disclosures, or restrictions related to this material.

## PDF page 524
Sapphire 2026 Agent View
Autonomous Domains: Assistant Overview
Autonomous Autonomous Autonomous Autonomous Autonomous
Finance Supply Chain Spend HCM CX
Accounts Payable Assistant Product Design Assistant Buying Assistant Career and Talent Development Campaign Assistant
3 Agents 7 Agents 3 Agents 5 Agents 3 Agents
Accounts Receivable Assistant Planning Assistant Category Mgmt Assistant Compensation Assistant Case Management Assistant
11 Agents 5 Agents 3 Agents 3 Agents 6 Agents
Billing Assistant Manufacturing Assistant Invoicing Assistant Core HR Assistant Content Assistant
4 Agents 3 Agents 11 Agents 4 Agents 3 Agents
Cash and Treasury Assistant Logistics Assistant Procurement Contract Assistant HR Knowledge Assistant Deal Closing Assistant
3 Agents 11 Agents 3 Agents 2 Agents 3 Agents
Enterprise Architecture Assistant Asset & Service Assistant Receiving Assistant HR Service Assistant Deal Qualification Assistant
3 Agents 5 Agents 4 Agents 5 Agents 4 Agents
Expense Management Assistant Business Network Assistant Requisition Assistant HR System Assistant Merchandising Assistant
4 Agents 12 Agents 2 Agents 5 Agents 7 Agents
Financial Closing Assistant Services Procurement Assistant Learning Assistant Order Management Assistant
6 Agents 3 Agents 4 Agents 3 Agents
Financial Planning Assistant Sourcing Assistant Onboarding Assistant Sales Assistant
5 Agents 4 Agents 4 Agents 4 Agents
Governance Assistant Supplier Management Assistant Payroll Assistant Self-Service Assistant
3 Agents 5 Agents 3 Agents 3 Agents
Sales Operations Assistant Travel Assistant People Intelligent Assistant Shopping Assistant
4 Agents 3 Agents 3 Agents
2 Agents
Tax and Compliance Assistant Performance Goals Assistant
11 Agents 7 Agents
Recruiting Assistant
5 Agents
Skills Assistant
4 Agents
Time Assistant
4 Agents
617

## PDF page 525
Sapphire 2026 Agent View
Autonomous Finance
Accounts Enterprise Expense Tax and
Accounts Payable Cash and Treasury Financial Closing Financial Planning Governance Sales Operations Travel
Receivable Billing Assistant Architecture Management Compliance
Assistant Assistant Assistant Assistant Assistant Assistant Assistant
Assistant Assistant Assistant Assistant
Payment Inquiry Case Preparation Billing Adjustment Bank Relationship Architecture Data Expense Automation Accounting Accruals Financial Billing Block Bill of
Audit Agent Booking Agent
Handling Agent Agent Agent Agent Agent Agent Agent Forecasting Agent Resolution Agent Exchange Agent
Payment Risk Case Processing Billing Anomaly Cash Positioning Enterprise Content Expense Pre-Submit Analytical Business Variance Analysis International Trade Credit Issues Meeting Location
Direct Tax Agent
Agent Agent Agent Agent Agent Audit Agent Insights Agent Agent Classification Agent Resolution Agent Planner Agent
Receivables and Asset Accounting
Collection Account Billing Creation Treasury Financing Web Research Expense Report Market Sentiment Delivery Issues E-Invoicing Setup
Payables Clearing Anomaly Detection Screening Agent
Preparation Agent Agent Agent Agent Validation Agent Agent Resolution Agent Agent
Agent Agent
Collection Insights Billing Posting Receipt Analysis Financial Consistency Conversational Supply Issue E-Invoicing
Agent Agent Agent Analysis Agent Planning Agent Resolution Agent Submission Error
Resolution Agent
Intercompany
Collections Email Matching and Model Creation Legal Change
Outreach Agent Reconciliation Agent Agent Notification Agent
Dispute Creation Journal Entry Localization
Agent Agent Extensibility Agent
Regulatory Document
Dispute Resolution
Mapping Explainer
Agent
Agent
Dunning Insights Statutory Report
Agent Analysis Agent
Invoice Execution Tax Classification
Agent Agent
Receivable Account Tax Configuration
Analysis Agent Agent
Subscription Lifecycle
Tax Posting Agent
Agent
619
