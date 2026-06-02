---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 17-2026-06-02T21-06-55
generated_at: 2026-06-02T21:07:03Z
---

# Phase 17: Expanded Surface QA and Closeout Prep - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md; this log preserves the alternatives considered.

**Date:** 2026-06-02T21:07:03Z  
**Phase:** 17-expanded-surface-qa-and-closeout-prep  
**Mode:** Yolo  
**Areas discussed:** Catalog scanability, cluster and comparison routes, state-detail consistency, verification and closeout evidence

## Catalog scanability

| Option | Description | Selected |
|--------|-------------|----------|
| Preserve medium-density catalog | Keep the existing `StateCard` and filter/sort pattern, then fix stale copy, generated-count assumptions, mobile wrapping, and drill-down clarity. | Yes |
| Redesign catalog layout | Replace the current catalog with a new visual or interaction pattern. | |
| Add advanced filtering | Expand filters beyond the current proposal-type and sort controls. | |

**User's choice:** Auto-selected preserve medium-density catalog.  
**Notes:** This matches Phase 17's QA/closeout goal and keeps future SITE-13 out of scope.

## Cluster and comparison routes

| Option | Description | Selected |
|--------|-------------|----------|
| Keep editorial grouping and selective comparison | Update stale grouping/comparison copy and verify links while preserving the narrative, non-scoreboard structure. | Yes |
| Convert comparison to a matrix | Build a broader matrix-style comparison tool. | |
| Add new grouping dimensions | Expand beyond legislative status, proposal focus, and region. | |

**User's choice:** Auto-selected keep editorial grouping and selective comparison.  
**Notes:** Existing `states-surfaces.ts` models already provide shared links and current comparison sections.

## State-detail consistency

| Option | Description | Selected |
|--------|-------------|----------|
| Consistency-focused detail QA | Ensure new and existing detail pages expose provenance, status, freshness, record footing, and sibling-route context through the canonical content path. | Yes |
| State-specific route exceptions | Add custom page behavior or bespoke content blocks for new Phase 16 states. | |
| Detail redesign | Rework the detail layout beyond consistency fixes. | |

**User's choice:** Auto-selected consistency-focused detail QA.  
**Notes:** The existing Illinois packet distinction remains acceptable; new state-specific exceptions should be avoided.

## Verification and closeout evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Full repo-native verification plus targeted browser QA | Run content validation, content compilation, refresh/candidate generation, TypeScript, build, tests, and browser checks on representative routes. | Yes |
| Unit/build checks only | Skip browser checks and rely on code/test output alone. | |
| Browser-only smoke check | Run route screenshots without the repo-native verification surface. | |

**User's choice:** Auto-selected full repo-native verification plus targeted browser QA.  
**Notes:** QA-01 explicitly requires browser checks, and QA-02 needs durable closeout evidence.

## the agent's Discretion

- Select exact route copy edits needed to remove stale assumptions.
- Select representative desktop/mobile browser viewport coverage.
- Add focused tests only where model behavior or link assumptions need a regression guard.

## Deferred Ideas

- Advanced filtering or matrix-style comparison remains future SITE-13 scope.
- Selective `mystic-ui` or broad theme upgrades remain UI-01/backlog Phase 999.1 scope.
- Additional state publication belongs in a future coverage phase unless Phase 17 uncovers a blocking data defect.
