---
name: deploy-cap-to-kyma
description: Prepares, validates, and optionally deploys an approved CAP application to SAP BTP Kyma using the official CAP Kyma/Helm workflow. Requires a proven Kyma runtime fit, tested CAP project, registry/cluster/namespace ownership, security, operations, and explicit deployment approval. Use only for CAP targets whose side-by-side contract selects kyma.
---

# Deploy CAP to Kyma

Package an already built and tested CAP application for Kyma. Runtime choice does not determine the
Clean Core level; the ERP boundary and all other touchpoints must already satisfy the Level A gate.

## Input

```text
<cap-project> --decision=<path>/side-by-side-decision.json [--namespace=<k8s-namespace>] [--apply]
```

Require `implementationModel=cap`, `runtime=kyma`, `runtimeFitProven=true`, and evidence that
`cap_solution_verified` passed. Without `--apply`, prepare and validate artifacts only.

## Pre-flight

- Confirm local CAP/CDS, container builder or Docker, Helm, kubectl, cluster context, namespace,
  container registry, image ownership, and pull permissions.
- Confirm HANA/auth/service choices, secrets model, ingress/domain, network policy, resource
  requests/limits, health probes, autoscaling, logging, alerting, backup, rollback, and delivery
  ownership.
- Use `sap-btp-best-practices`, `sap-btp-connectivity`, `sap-btp-service-manager`, and
  `sap-btp-cloud-logging` when their trigger conditions apply and the skills are exposed.

## Workflow

Use the project's local CAP toolchain and review every generated diff:

```bash
npx cds add hana,xsuaa
npx cds add kyma
npx cds build --production
```

Inspect `gen/chart`, generated image definitions, service bindings, values, and Kubernetes security
settings. Re-run compile, tests, image scan, and Helm rendering before deployment.

After explicit `--apply` approval and successful pre-flight, use the official CAP deployment flow:

```bash
npx cds up -2 k8s -n <namespace>
```

Record the generated Helm release, image digests, namespace, rollout status, service endpoints, and
rollback command. Do not place credentials in Helm values committed to source control.

## Acceptance

- Workloads and required jobs roll out successfully.
- Health/readiness probes, authentication, destinations, service bindings, and S/4 connectivity
  pass.
- CAP integration/parity tests pass against the deployed endpoint.
- Logs, metrics, alerts, support owner, rollback, and delivery path are operational.

If cluster or registry capabilities are unavailable, return an owned handoff with exact missing
evidence. Do not silently fall back to Cloud Foundry and do not claim a deployment occurred.
