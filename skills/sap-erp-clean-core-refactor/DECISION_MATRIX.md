# Clean Core Decision Matrix

This is the readable form of [`chain.json`](./chain.json). The JSON manifest is authoritative for
precedence, gates, skill dispatch and ARC-1 operation IDs. [`action-catalog.json`](./action-catalog.json)
is authoritative for tool payload shapes.

## Decision order

Apply rows by ascending precedence and stop at the first fully evidenced match. A/B/C/D is not the
first architectural choice. The order is: SAP standard, unused code, extension use case, target
domain, current Clean Core level, executable capability, proof.

| Decision ID | Priority | Source | Target level | Target domain | Action | Select when |
|---|---:|---|---|---|---|---|
| STANDARD_FIRST | 10 | Any | A | Standard | `replace_with_standard` | SAP standard covers the requirement with approved parity |
| ANY_TO_REMOVED | 20 | Any | Removed | Retired | `remove_unused` | Runtime and static evidence prove no valid consumer |
| KEY_USER_LEVEL_A | 30 | B/C/D/Unknown | A | Key User on-stack | `replace_with_key_user_extensibility` | A released key-user extension point, field, UI adaptation, form or CBO fits |
| A_RETAIN | 40 | A | A | Current allowed domain | `no_action` | Allowed technology and every relevant touchpoint are proven released |
| CUSTOM_API_RELEASE | 50 | B/C | Architecture-dependent | Current allowed domain | `release_api` | A stable customer API is the only unreleased dependency |
| ON_STACK_LEVEL_A | 60 | B/C/D | A | Developer on-stack | `rewrite_on_stack_abap_cloud` | Tight S/4 coupling, LUW consistency or high-volume local access favors embedded ABAP Cloud and released touchpoints exist |
| WRAPPER_CLASSIC | 70 | B/C/D | A consumer + B wrapper | Developer on-stack | `create_or_use_wrapper` | No released successor exists; a documented classic API can be isolated in Private Edition/on-premise |
| WRAPPER_INTERNAL | 71 | C/D | A consumer + C wrapper | Developer on-stack | `create_or_use_wrapper` | No released/classic successor exists and a time-bound internal-access exception is approved |
| SIDE_BY_SIDE_CF | 80 | B/C/D/Unknown | A | Side-by-side CF | `extract_to_side_by_side_cf` | Independent lifecycle, SaaS, mobile, multi-system, loose coupling or independent scale dominates |
| SIDE_BY_SIDE_KYMA_MANUAL | 81 | B/C/D/Unknown | Architecture-dependent | Side-by-side Kyma | `plan_kyma_side_by_side` | Kyma is selected; current ARC-1 CAP implementation is CF-only, so execution is a handoff |
| HYBRID | 90 | B/C/D/Unknown | Architecture-dependent | Hybrid | `hybrid_extension` | On-stack transactional responsibilities and side-by-side responsibilities both exist |
| B_KEEP_PRIVATE | 100 | B | B | Classic on-stack | `keep_at_level_b` | Private Edition/on-premise permits B and no justified A business case exists |
| MECHANICAL_REMEDIATION | 110 | B/C/D | Architecture-dependent | Current allowed domain | `migrate_custom_code` | Selected findings are deterministic quick fixes or bounded mechanical corrections |
| ANY_TO_RESEARCH | 999 | Any | ResearchRequired | Research | `research_required` | Any required evidence, owner, successor, capability, target or parity remains uncertain |

`Unknown` is not Level D. D requires evidence of a modification, forbidden technology or no-API
zone. Missing evidence always lands on `ANY_TO_RESEARCH`.

## Landscape constraints

| Landscape | Compliance floor | Wrapper policy | Level B policy |
|---|---|---|---|
| S/4HANA Public Cloud | A | No B/C wrapper implementation | Not allowed |
| BTP ABAP Environment | A | Consumer may call a released remote/on-stack API; no local classic wrapper | Not allowed |
| S/4HANA Private Cloud | A preferred; B permitted | A+B allowed; A+C only as governed, time-bound exception | Allowed with AEM rationale; no ATC exemption for informational B findings |
| S/4HANA on-premise | A preferred; B permitted | A+B allowed; A+C only as governed, time-bound exception | Allowed with AEM rationale; no ATC exemption for informational B findings |

## Target-domain selector

| Signal | Prefer on-stack | Prefer side-by-side |
|---|---:|---:|
| Same S/4 transaction and strong consistency | Yes | No |
| High-volume or latency-sensitive S/4 data access | Yes | No |
| Extension of an existing S/4 application | Yes | Usually no |
| Non-SAP users, consumer-grade or native mobile UX | Usually no | Yes |
| SaaS, multi-system hub or cross-backend process | No | Yes |
| Independent operations, scaling, downtime or release cadence | No | Yes |
| Responsibilities split across both groups | Hybrid | Hybrid |

## Action inventory

Primary actions are shown in the decision rows. Specialized dispatches remain explicit:

| Action | Role |
|---|---|
| `migrate_segw_to_rap` | SEGW OData V2 replacement inside an on-stack or side-by-side decision |
| `analytical_embedded` | Embedded analytics replacement for aggregate/read-only reporting |
| `rap_logic` | RAP behavior implementation inside an approved on-stack design |
| `rap_full_stack_researched` | Production RAP stack after research and plan approval |
| `greenfield_rap_may` | MAY-only prototype path; never a default production refactor |

## Non-negotiable evidence

- Standard-first and AEM reasoning precede a target decision.
- Level A requires all relevant touchpoints to be released, not just one dependency.
- Releasing one custom API upgrades only that dependency. Reclassify every consumer afterward.
- Wrapper output is composite and records the wrapper's own B or C debt separately.
- Key User and Kyma actions are plan/handoff paths until an exposed, validated implementation
  capability exists.
- Generative writes require diff approval. Deterministic SAP quick fixes may share one explicit
  package-and-transport approval, but still require syntax, activation, ATC and tests.
