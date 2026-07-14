---
name: scaffold-cap-fiori-elements
description: Scaffolds a Fiori Elements OData V4 application inside an approved CAP project using CAP service metadata and CAP CDS annotations. Keeps CAP annotations separate from ABAP CDS/RAP annotations and capability-gates SAP Fiori tools. Use only when the side-by-side contract selects cap_fiori_elements.
---

# Scaffold CAP Fiori Elements

Create a metadata-driven Fiori Elements application for a CAP service. This is not the RAP-oriented
`convert-ui5-to-fiori-elements` flow.

## Input

```text
<cap-project> --decision=<path>/side-by-side-decision.json --service=<service> --entity=<entity>
```

Require all of the following:

- `implementationModel=cap` and `uiTarget=cap_fiori_elements`;
- a compiling OData V4 CAP service;
- accepted users, floorplan, main entity, navigation, actions, authorization, and accessibility
  requirements.

## Workflow

1. Inspect CAP service metadata and existing `app/` projects. Do not infer the UI from DDIC tables.
2. Select the smallest fitting floorplan, normally List Report/Object Page for transactional
   business data. Do not force Fiori Elements when custom controls or interaction dominate.
3. Use an exposed SAP Fiori tools/Fiori creation capability when available. Record the exact
   capability used; never invent a generator command. If unavailable, generate only the reviewed
   project files and record the degraded tooling gate.
4. Keep service definitions clean. Put UI annotations under the app or a dedicated CAP annotation
   model that imports the CAP service.
5. Prefer CAP common annotations such as `@title`, `@description`, `@readonly`, and `@mandatory`
   where they express the intent; add OData UI vocabulary annotations only for presentation needs.
6. Generate i18n, routing, manifest, pages, navigation, value helps, actions, draft handling, and
   role-based visibility required by the accepted UX.
7. Validate metadata, build, lint, accessibility, and a preview against local/mock data. CAP's
   dynamic Fiori preview is an iteration aid, not the production application.

## Output

```text
<cap-project>/app/<app-id>/
<cap-project>/app/<app-id>/annotations.cds
<cap-project>/docs/ui-decision.md
```

Use `sap-fiori-app-development` plus `sap-fiori-tools` or `sap-fiori-create-cli` when exposed.
Use `sap-fiori-guidelines` and the available UI5 lint/build capabilities for stakeholder-facing UI.
The deployment runtime remains independent: the same accepted CAP/Fiori model may later be packaged
for CF or Kyma.

## Refusal rules

Stop when the CAP service is a placeholder, annotations target ABAP CDS names instead of CAP service
entities, the required UX is fundamentally freestyle, or authorization and draft semantics are
unresolved.
