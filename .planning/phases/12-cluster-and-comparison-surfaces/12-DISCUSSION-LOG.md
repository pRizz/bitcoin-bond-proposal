# Phase 12: Cluster and Comparison Surfaces - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the synthesized alternatives.

**Date:** 2026-04-11
**Phase:** 12-cluster-and-comparison-surfaces
**Mode:** Yolo
**Areas discussed:** surface shape, cluster route, comparison route, UI boundaries

---

## Surface shape

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated reading paths | Add separate cluster and comparison routes under the states subtree | ✓ |
| Overload `/states` | Turn the existing index into one large multi-purpose comparison surface | |
| New top-level nav section | Add comparison as a top-level site area immediately | |

**User's choice:** Dedicated reading paths
**Notes:** The existing `/states` index remains the gateway instead of becoming a mega-dashboard.

---

## Cluster route

| Option | Description | Selected |
|--------|-------------|----------|
| Editorial grouped sections | Use grouped sections by status, focus/type, and region with cards and short explainer copy | ✓ |
| Table-led clusters | Use dense tables and sorting as the default cluster experience | |
| Bare links only | Ship only simple grouped link lists | |

**User's choice:** Editorial grouped sections
**Notes:** The phase should help readers browse the registry, not turn it into spreadsheet UI.

---

## Comparison route

| Option | Description | Selected |
|--------|-------------|----------|
| Narrative comparison sections | Explain meaningful differences between reserve-heavy, crossover, and bond-side records with links back to details | ✓ |
| Full matrix comparison | Compare every state equally in one large matrix | |
| No dedicated compare route | Keep comparison implicit in the clusters only | |

**User's choice:** Narrative comparison sections
**Notes:** The reserve/bond/crossover frame is the strongest fit for the current ten-state dataset and the project thesis.

---

## UI boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve editorial tone | Reuse existing cards/sections and keep the surfaces calm and mobile-safe | ✓ |
| Add dashboards/scorecards | Introduce stronger quantitative widgets and rankings | |
| Redesign the registry shell | Use Phase 12 as a broader visual rewrite | |

**User's choice:** Preserve editorial tone
**Notes:** Phase 12 should add clarity and reading paths, not a new visual language.

---

## the agent's Discretion

- Exact route names and subnavigation treatment inside the states subtree
- Exact comparison framing so long as it stays tied to the current ten-state dataset
- Exact component decomposition between new editorial helpers and route-local composition

## Deferred Ideas

- Refresh queue execution and cross-surface freshness QA for Phase 13
- Additional publication batches or deeper 50-state expansion later
- Broader visual experimentation or `mystic-ui` work later
