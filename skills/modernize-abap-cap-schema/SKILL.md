---
name: modernize-abap-cap-schema
description: Generates a CAP CDS persistence model from explicitly approved ABAP tables after the side-by-side decision assigns their data ownership to CAP or governed replication. Maps DDIC semantics without confusing CAP CDS with ABAP CDS. Use only with a reviewed ownership manifest, never to copy every Z table mechanically.
---

# Modernize ABAP → CAP Schema

Produces `<target>/db/schema.cds` from explicitly selected customer tables (`TABL`). This is CDS for
the **CAP runtime** (`@sap/cds`), not ABAP CDS DDL.

Sub-skill of [`../modernize-abap-to-btp-cap/SKILL.md`](../modernize-abap-to-btp-cap/SKILL.md). Also usable standalone for table-only reverse-engineering.

## Input

```
<Z-package> <target-dir> --decision=<path>/side-by-side-decision.json --tables=<T1,T2,...> [--namespace=com.example.foo]
```

Require `dataOwnership=cap|replicated`. Refuse `s4` and `none`. The table list must come from the
approved bounded context; package enumeration is evidence, not consent to migrate every table.

## Defaults

| Aspect | Default |
|---|---|
| Output | `<target>/db/schema.cds` |
| Namespace | derived from package: `com.example.<package_lower>` |
| `cuid` aspect | auto-applied if PK is `sysuuid_x16` (RAW(16)) |
| `managed` aspect | auto-applied if table has any of `crusr` / `crdat` / `cruzt` / `chusr` / `chdat` / `chuzt` |
| `temporal` aspect | NOT auto-applied (rare 1:1 mapping; flag for user review) |
| Key | preserve every DDIC key field; redesign only through an approved migration decision |
| Currency / Quantity | `@Semantics.amount.currencyCode` / `@Semantics.quantity.unitOfMeasure` |
| Comments | DDIC short text + field labels → `@Common.Label` |

## DDIC → CDS type mapping

| DDIC | CDS | Notes |
|---|---|---|
| CHAR(n) | `String(n)` | preserve length |
| NUMC(n) | `String(n)` | leading-zero numeric; CAP-side validation up to user |
| DEC(p,s) / CURR(p,s) / QUAN(p,s) | `Decimal(p,s)` | currency/quantity get semantic annotation |
| INT1 / INT2 / INT4 | `UInt8` / `Int16` / `Int32` | INT1 is unsigned 0-255 |
| INT8 | `Int64` | |
| FLTP | `Double` | |
| RAW(n) / SSTRING / STRING | `Binary(n)` / `String` / `LargeString` | |
| RAW(16) | `UUID` (auto via `cuid`) | UUID convention |
| RAWSTRING | `LargeBinary` | |
| DATS | `Date` | |
| TIMS | `Time` | |
| UTCLONG / DATN / TIMN | `Timestamp` / `Date` / `Time` | modern DDIC built-ins (7.5x+) |
| LCHR / LRAW | `LargeString` / `LargeBinary` | |
| CUKY (currency key) | `Currency` (reuse type → `Association to sap.common.Currencies`) | pairs with the CURR amount field |
| UNIT (unit of measure, e.g. data element MEINS) | own `UnitsOfMeasure` CodeList entity | `@sap/cds/common` ships NO Units code list (only Countries/Currencies/Languages/Timezones) — generate one |
| LANG (SPRAS) | `Association to Languages` | |
| CLNT | `String(3)` | client field — usually omitted in BTP CAP |
| DEC(15) as `TIMESTAMP` / DEC(21,7) as `TIMESTAMPL` / TZNTSTMPS/TZNTSTMPL | `Timestamp` | detect via data element, not raw DEC — classic ABAP timestamps are DECs storing UTC with NO timezone attached |
| DF16_DEC / DF34_DEC / DF16_RAW / DF34_RAW | `Decimal` | decfloat; note precision in schema-notes |
| ACCP | `String(6)` | posting period YYYYMM; keep as string |
| PREC / CUKY standalone (no amount sibling) | `String(2)` / `String(5)` | orphan reference fields — flag for review |

## Workflow

### Step 1 — Validate ownership and enumerate evidence

Load `side-by-side-decision.json`, then read `SAPRead(type="DEVC", name="<pkg>")` recursively and
confirm that every requested `--tables` entry exists in the customer namespace. Use
`SAPSearch(searchType="tadir_lookup", names=["<table_name>"], objectType="TABL")` only to validate
exact names across packages; `tadir_lookup` does not enumerate by `packageName`.

Do not add package tables that are absent from the approved list.

### Step 2 — Read DDIC details (per table)

`SAPRead(type="TABL", name="<table>")` — ARC-1 returns the DDIC table/structure as CDS-like source. Parse fields, keys and type references from that source; drill into `SAPRead(type="DTEL", name="<data_element>")` / `SAPRead(type="DOMA", name="<domain>")` only when labels, fixed values, conversion exits or domain semantics are needed.

For complex domains / data elements: drill in only when the DDIC source type alone is insufficient (e.g. fixed value lists → `@assert.range`).

### Step 3 — Apply type mapping + aspects

Walk each field through the table above. For each table, decide aspects:
- `cuid` if RAW(16) primary key
- `managed` if audit columns present
- `localized` if `texts` companion table detected (`<table>T`)

### Step 4 — Infer Associations

From DDIC foreign-key references:

| FK cardinality | Heuristic | CAP relation |
|---|---|---|
| Child table with parent FK + parent owns lifecycle | parent has stronger semantics | `Composition of many <Child>` on parent |
| Lookup / master data (Currencies, Units, Languages) | shared catalog | `Association to <Master>` |
| Generic FK to entity not owned | independent lifecycle | `Association to <Entity>` |

Bidirectional inference: write both sides (`<parent>.items : Composition of many <child>` AND `<child>.parent : Association to <parent>`).

Preserve composite primary and foreign keys. Never collapse a multi-field DDIC key to its first
field. If CAP conventions require a surrogate UUID, model the legacy key as a unique business key
and document migration/reconciliation before changing identity semantics.

### Step 5 — Emit + validate

Write `<target>/db/schema.cds` in CAP pretty-print format. Validate via:

```bash
npx cds compile <target>/db/schema.cds --to sql > /dev/null && echo "OK"
```

(`--to edmx` would fail here — it requires at least one `service` definition, which only exists after `modernize-abap-cap-service` runs. Use it then, not on the schema alone.)

With `@sap/cds-mcp` connected, cross-check doubtful mappings against the authoritative docs (`search_docs`, e.g. "temporal aspect", "localized entity") and introspect the staged model with `search_model` — cheaper than compile-error roundtrips.

### Step 6 — Migration notes

Write `<target>/docs/schema-notes.md` with:
- Tables migrated + their CAP entity name + namespace
- Ownership mode, approving decision record and source contract
- Aspects auto-applied
- Associations inferred + cardinality reasoning
- Manual review items: temporal candidates, ambiguous FKs, `LCHR` / `LRAW` size limits

For `replicated`, also record source API/event version, external key, ordering/version field,
idempotency key, reconciliation query, retention/deletion behavior and failure owner.

## Gotchas

- **`.INCLUDE` / `.APPEND` structures**: flatten the included fields into the entity (CAP has no DDIC-style include); record the original include name in `schema-notes.md` so repeated includes across tables can become a shared aspect.
- **Conversion exits (ALPHA, CUNIT, …)** on domains: CAP does not run them. Leading-zero keys (`ALPHA`) must be normalized at data-migration time and documented — otherwise FK joins silently miss.
- **MANDT (client) field**: drop on BTP CAP (no client concept). Flag if data needs cross-client merge.
- **`@AbapCatalog` annotations** (DDIC): do NOT carry over; CAP has its own (`@cds.persistence.skip`, `@assert.range`, etc.).
- **Domain fixed values**: map to `@assert.range` if ≤10 values, otherwise emit a CodeList entity.
- **Hierarchical / parent-child Z tables**: review `Composition` choice — sometimes Association is safer (no cascade delete).
- **S/4-owned data**: model a remote service contract in CAP rather than persistence. Do not invoke
  this skill merely because a TABL exists in the source package.

## When NOT to use

- Greenfield CDS design from scratch → use [`../generate-rap-service/SKILL.md`](../generate-rap-service/SKILL.md) or hand-write
- View-only entities (no underlying TABL) → not the target of this skill
- Multi-package data model with cross-package FK → split into multiple invocations, then merge manually
- `dataOwnership=s4|none` -> consume a released remote contract or remain stateless

## References

- [SAP CAP — CDS Modeling](https://cap.cloud.sap/docs/cds/cdl)
- [CAP — Common Reuse Aspects](https://cap.cloud.sap/docs/cds/common) (`cuid`, `managed`, `temporal`, `localized`)
- DDIC types → CDS types: [SAP — ABAP CDS Types](https://help.sap.com/docs/abap-cloud/abap-data-types) (cross-reference for ABAP CDS vs CAP CDS)
