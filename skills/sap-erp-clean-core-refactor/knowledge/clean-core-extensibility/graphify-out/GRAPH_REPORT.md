# Graph Report - raw  (2026-07-13)

## Corpus Check
- 38 files · ~106,011 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 251 nodes · 369 edges · 19 communities (13 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Wrappers and Levels|Wrappers and Levels]]
- [[_COMMUNITY_ABAP Cloud Strategy|ABAP Cloud Strategy]]
- [[_COMMUNITY_Key User Extensibility|Key User Extensibility]]
- [[_COMMUNITY_Brownfield Technical Debt|Brownfield Technical Debt]]
- [[_COMMUNITY_ATC Measurement|ATC Measurement]]
- [[_COMMUNITY_Release Contracts|Release Contracts]]
- [[_COMMUNITY_AI Assisted Fixes|AI Assisted Fixes]]
- [[_COMMUNITY_RISE Methodology|RISE Methodology]]
- [[_COMMUNITY_Architecture Decisioning|Architecture Decisioning]]
- [[_COMMUNITY_ABAP Cloud Components|ABAP Cloud Components]]
- [[_COMMUNITY_UI Extension Options|UI Extension Options]]
- [[_COMMUNITY_Governance Boards|Governance Boards]]
- [[_COMMUNITY_Classic Wrapper Setup|Classic Wrapper Setup]]
- [[_COMMUNITY_Business AI Advisory|Business AI Advisory]]
- [[_COMMUNITY_Released Extension Points|Released Extension Points]]
- [[_COMMUNITY_Discovery Center Missions|Discovery Center Missions]]
- [[_COMMUNITY_Joule ABAP Capabilities|Joule ABAP Capabilities]]
- [[_COMMUNITY_RAP Model|RAP Model]]
- [[_COMMUNITY_Cloud ERP Advisory|Cloud ERP Advisory]]

## God Nodes (most connected - your core abstractions)
1. `ABAP Test Cockpit` - 20 edges
2. `Released SAP APIs` - 16 edges
3. `Clean Core Level A` - 14 edges
4. `Side-by-Side Extensibility` - 13 edges
5. `Clean Core Level B` - 11 edges
6. `Clean Core Level C` - 11 edges
7. `Key User Extensibility` - 11 edges
8. `ABAP Cloud Development Model` - 11 edges
9. `SAP Build` - 10 edges
10. `Clean Core Level D` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Brownfield Conversion Runbook` --references--> `Clean Core Extensibility Governance`  [EXTRACTED]
  raw/501-525-brownfield-conversion-runbook.md → raw/226-250-architect-transition-level-a.md
- `Released SAP BAdI` --conceptually_related_to--> `Clean Core Level A`  [EXTRACTED]
  raw/551-575-custom-code-transition-atc.md → raw/026-050-introduction-clean-core-principles.md
- `Clean Core Level B` --references--> `Classic ABAP Development Model`  [EXTRACTED]
  raw/026-050-introduction-clean-core-principles.md → raw/126-150-abap-cloud-developer-extensibility.md
- `MARA Table` --conceptually_related_to--> `Clean Core Level C`  [EXTRACTED]
  raw/101-125-abap-cloud-developer-extensibility.md → raw/051-075-clean-core-levels-a-b-c-d.md
- `Query Browser` --conceptually_related_to--> `Key User Extensibility`  [EXTRACTED]
  raw/476-500-brownfield-conversion-runbook.md → raw/076-100-level-a-on-stack-key-user.md

## Hyperedges (group relationships)
- **Clean Core Level Model Forms A/B/C/D** — clean_core_level_concept, clean_core_level_a, clean_core_level_b, clean_core_level_c, clean_core_level_d [EXTRACTED 1.00]
- **Level A Clean Extension Pattern** — clean_core_level_a, abap_cloud_development_model, sap_build, released_sap_apis, on_stack_extensibility, side_by_side_extensibility [EXTRACTED 1.00]
- **Wrapper Access Pattern for Non-Released Objects** — abap_cloud_development_model, abap_cloud_wrappers, non_released_sap_objects, atc_exemptions, standard_abap_software_component, clean_core_level_b, clean_core_level_c, clean_core_level_d [EXTRACTED 1.00]
- **On-Stack Side-by-Side Selection Pattern** — decision_tree_best_extensibility_option, on_stack_extensibility, side_by_side_extensibility, key_user_extensibility, developer_extensibility [EXTRACTED 1.00]
- **SAP AEM Three Phase Pattern** — sap_application_extension_methodology, assess_extension_use_case, assess_extension_technology, define_extension_target_solution, extension_target_solution_diagram [EXTRACTED 1.00]
- **Clean Core Governance and System Setup Pattern** — clean_core_measurement_framework, governance_and_maturity, extensibility_kpis, ext_sys_01_automated_code_checks, ext_sys_02_exemption_process, ext_sys_03_abap_cloud_software_component, ext_sys_04_usage_data_collection, ext_sys_05_sap_btp_account_side_by_side [EXTRACTED 1.00]
- **Post-Conversion Debt Reduction Program** — technical_debt_reduction, unused_custom_code_retirement, sql_code_pushdown_performance_optimization, sap_fiori_adoption, sap_btp_replatforming, abap_test_cockpit [EXTRACTED 1.00]
- **Clean Extensibility Level ATC Mapping** — clean_extensibility_levels, clean_core_level_a, clean_core_level_b, clean_core_level_c, clean_core_level_d, usage_of_apis_check, critical_statements_check [EXTRACTED 1.00]
- **Agentic Custom Code Modernization Flow** — sap_joule_for_developers_abap_ai, s4hana_custom_code_migration_agent, abap_test_cockpit, deterministic_quick_fixes, ai_generated_fix_proposals, human_in_the_loop_review [EXTRACTED 1.00]
- **Key User Extensibility Toolset** — ui_adaptation_mode, custom_fields_app, custom_business_objects_app, custom_business_logic, custom_cds_views_app, custom_analytical_queries, custom_forms [EXTRACTED 1.00]
- **Clean Core KPI Measurement System** — clean_core_share, technical_debt_score, unused_code_share, business_modifications, abap_test_cockpit, custom_code_analytics, rise_with_sap_methodology_dashboard [EXTRACTED 1.00]
- **ATC to RISE Dashboard Import Flow** — abap_test_cockpit, clean_core_atc_variant, atc_check_results_export_file, rise_with_sap_methodology_dashboard, customer_object_assessment [EXTRACTED 1.00]

## Communities (19 total, 6 thin omitted)

### Community 0 - "Wrappers and Levels"
Cohesion: 0.09
Nodes (33): ABAP Cloud Wrappers, ATC Exemption Browser, ATC Exemptions, Avoid Extensions When Possible, Changelog for SAP Objects, Classic SAP APIs, Clean Core Extensibility, Clean Core Extensibility Governance (+25 more)

### Community 1 - "ABAP Cloud Strategy"
Cohesion: 0.10
Nodes (33): ABAP Cloud Development Model, ABAP Cloud - Technical Use Cases and Recommended Technologies, ABAP for Cloud Development, Brownfield Conversion Runbook, BTP First Strategy, Business Modifications, Classic ABAP Custom Code Transition, Classic ABAP Development Model (+25 more)

### Community 2 - "Key User Extensibility"
Cohesion: 0.10
Nodes (29): ABAP Language Version for Key Users, ABAP Web Editor, Adapt UI, Analytics Extensibility, Core Data Services, Custom Analytical Queries, Custom Business Logic, Custom Business Objects App (+21 more)

### Community 3 - "Brownfield Technical Debt"
Cohesion: 0.08
Nodes (29): ABAP Call Monitor, ABAP Test Cockpit on SAP BTP, Analytical Apps, Brownfield Clean Core Journey, Clean Core Compliant Partner Solutions, Custom Code Migration App, Custom Code Usage Data Collection, Delete Unused Code (+21 more)

### Community 4 - "ATC Measurement"
Cohesion: 0.11
Nodes (26): ABAP_CLOUD_DEVELOPMENT_DEFAULT, ABAP_CLOUD_DEVELOPMENT_DEFAULT Check Variant, ABAP Test Cockpit, Allowed Enhancement Technologies Check, Allowed SAP Enhancement Technologies Check, ATC Check Results Export File, Clean Core ATC Variant, Clean Core Levels A, B, C, D (+18 more)

### Community 5 - "Release Contracts"
Cohesion: 0.10
Nodes (23): ABAP Cloud Language Version, ABAP_CLOUD_READINESS Check Variant, ABAP Development Tools API State, ABAP Unit Tests, Clean Core Level Verification, Cloudification Repository, Contract C0 Extend, Contract C1 Use System-Internally (+15 more)

### Community 6 - "AI Assisted Fixes"
Cohesion: 0.14
Nodes (18): ABAP MCP Server, AI Fix Confidence Score, AI-Generated Fix Proposals, AI-Generated Fixes, AI Units, Base AI, S/4HANA Custom Code Migration Agent, Customer-Built AI (+10 more)

### Community 7 - "RISE Methodology"
Cohesion: 0.15
Nodes (14): Agent-Led Toolchain, Clean Core Quality Gates, Clean Core Runbook in CALM, Clean Core Success Plan, Custom Code Assistant, Extensibility Maturity Assessment, Joule, Migration and Modernization Assistants (+6 more)

### Community 8 - "Architecture Decisioning"
Cohesion: 0.17
Nodes (13): Assess Extension Technology, Assess Extension Use Case, Define Extension Target Solution, EXT-GOV-02 Extension Architecture Guidelines, Extension Architecture, Extension End-to-End Process, Extension Target Solution Diagram, Extension Technology Mapping (+5 more)

### Community 9 - "ABAP Cloud Components"
Cohesion: 0.20
Nodes (10): ABAP Cloud, CAP, Create Application Logic Extension Task, EXT-GOV-04 Developer Skills and Enablement, EXT-SYS-03 ABAP Cloud Software Component, Extension Implementation, I_PRODUCT CDS View, MARA Table (+2 more)

### Community 10 - "UI Extension Options"
Cohesion: 0.29
Nodes (7): Create Custom UI Extension Task, Extension Architecture Guide, SAP BTP Guidance Framework, SAP Fiori Elements, SAP Mobile Services, SAPUI5, UI5 Web Components

### Community 11 - "Governance Boards"
Cohesion: 0.40
Nodes (5): EXT-GOV-01 Governance Process for Extensions, Key Decision Document Template, Solution Standardization Board, SSB Design Review Process, Steering Committee

### Community 12 - "Classic Wrapper Setup"
Cohesion: 0.50
Nodes (4): Classic ABAP, SMODILOG Table, Z_UNCLEAN / HOME Software Component, ZI_EXAMPLE_WRAPPER

## Knowledge Gaps
- **94 isolated node(s):** `Five Clean Core Principles`, `Avoid Extensions When Possible`, `BTP First Strategy`, `Released SAP Remote API`, `Released SAP Local API` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ABAP Test Cockpit` connect `ATC Measurement` to `Wrappers and Levels`, `ABAP Cloud Strategy`, `Release Contracts`, `AI Assisted Fixes`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **Why does `Key User Extensibility` connect `ABAP Cloud Strategy` to `Key User Extensibility`, `Brownfield Technical Debt`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Why does `Custom Fields App` connect `Key User Extensibility` to `ABAP Cloud Strategy`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **What connects `Five Clean Core Principles`, `Avoid Extensions When Possible`, `BTP First Strategy` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Wrappers and Levels` be split into smaller, more focused modules?**
  _Cohesion score 0.0928030303030303 - nodes in this community are weakly interconnected._
- **Should `ABAP Cloud Strategy` be split into smaller, more focused modules?**
  _Cohesion score 0.10416666666666667 - nodes in this community are weakly interconnected._
- **Should `Key User Extensibility` be split into smaller, more focused modules?**
  _Cohesion score 0.10344827586206896 - nodes in this community are weakly interconnected._