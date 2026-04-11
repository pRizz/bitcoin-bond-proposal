# Phase 10: Coverage Expansion Contract and Data Shape - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the synthesized alternatives.

**Date:** 2026-04-11
**Phase:** 10-coverage-expansion-contract-and-data-shape
**Mode:** Yolo
**Areas discussed:** registry metadata contract, derived data path, refresh artifact boundary, surface scope

---

## Registry metadata contract

| Option | Description | Selected |
|--------|-------------|----------|
| Canonical manifest and schema first | Extend `state-registry-manifest.json` and `schema.ts` before any route behavior changes | ✓ |
| Route-local only | Keep the contract unchanged and let route components infer grouping fields independently | |
| Publication-batch first | Add more states now and defer contract cleanup until later | |

**User's choice:** Canonical manifest and schema first
**Notes:** Yolo synthesis kept Phase 10 structural so later publication and comparison work can reuse one trustworthy contract.

---

## Derived data path

| Option | Description | Selected |
|--------|-------------|----------|
| Compile-time derived graph | Add grouping and freshness-ready data in `scripts/compile-content.ts` and expose it through shared loaders | ✓ |
| Route-computed grouping | Compute grouping and freshness signals directly in `src/routes/(site)/states/index.tsx` | |
| Hybrid ad hoc | Mix compile-time and route-local logic based on convenience | |

**User's choice:** Compile-time derived graph
**Notes:** This matches the repo's existing content-graph pattern and avoids duplicating logic in future comparison surfaces.

---

## Refresh artifact boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Separate repo-owned refresh artifacts | Keep refresh queue/report outputs distinct from published canonical state content | ✓ |
| In-place canonical mutation | Let refresh tooling rewrite published content directly | |
| External live tracker | Introduce a live status layer separate from canonical content | |

**User's choice:** Separate repo-owned refresh artifacts
**Notes:** The milestone continues the snapshot-based trust contract and explicitly avoids pseudo-live publication behavior.

---

## Surface scope

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal consumer updates | Limit Phase 10 UI work to the current states index and shared loaders | ✓ |
| Comparison UI now | Start new comparison pages in Phase 10 | |
| Full registry redesign | Rebuild the states surface while touching the data contract | |

**User's choice:** Minimal consumer updates
**Notes:** Phase 12 owns the comparison surfaces; Phase 10 should only expose the stronger underlying data shape.

---

## the agent's Discretion

- Exact field names for grouping and freshness-supporting metadata
- Exact refresh artifact file layout outside canonical published content
- Exact helper structure for grouped selectors in the shared site data layer

## Deferred Ideas

- Publication batch work for Phase 11
- Comparison and cluster storytelling surfaces for Phase 12
- Refresh queue execution and freshness QA for Phase 13
- Theme toggle and selective `mystic-ui` exploration after the information model proves out
