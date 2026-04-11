---
phase: 12-cluster-and-comparison-surfaces
plan: "02"
subsystem: registry-ui
tags: [bun, solidstart, site-content, editorial-registry, comparison-surface]
requires: [12-01]
provides:
  - Shared `getStatesComparisonModel()` read-model for reserve-benchmark, crossover, and bond-side sections.
  - Dedicated `/states/compare` route with narrative comparison sections and links back to canonical state detail pages.
  - Gateway links from `/states` into the comparison surface with comparison-aligned cue treatment on clustered surfaces.
affects: [phase-13]
tech-stack:
  added: []
  patterns: [shared-comparison-read-model, editorial-comparison-route, selective-comparison-sections]
key-files:
  created:
    - src/routes/(site)/states/compare.tsx
  modified:
    - src/components/editorial/Badge.tsx
    - src/components/editorial/StateCard.tsx
    - src/lib/site/content.ts
    - src/lib/site/content.test.ts
    - src/lib/site/states-surfaces.ts
    - src/routes/(site)/states/clusters.tsx
    - src/routes/(site)/states/index.tsx
key-decisions:
  - "Keep the comparison route selective and narrative by centering reserve benchmarks, crossover records, and bond-side official signals."
  - "Move cluster/comparison route-model logic into `src/lib/site/states-surfaces.ts` so `content.ts` remains the public access layer instead of the narrative-assembly layer."
  - "Align grouped-surface badges with proposal focus rather than raw `proposalKind`, and make comparison slugs fail loudly if the curated narrative drifts from the graph."
patterns-established:
  - "Comparison routes should consume `getStatesComparisonModel()` rather than building narrative pairings in route code."
  - "Cluster and comparison surfaces use proposal-focus-aligned badges while still routing every record back to `/states/[slug]`."
requirements-completed: [SITE-08, SITE-09]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 12-2026-04-11T21-58-38
generated_at: 2026-04-11T22:45:00Z
duration: 12m
completed: 2026-04-11
---

# Phase 12 Plan 02: Cluster and Comparison Surfaces Summary

**Shared comparison read-model plus a new `/states/compare` route now explains the ten-state registry through reserve, crossover, and bond-side reading paths**

## Performance

- **Duration:** 12m
- **Started:** 2026-04-11T22:14:00Z
- **Completed:** 2026-04-11T22:45:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Added a shared comparison-route model with explicit narrative sections for reserve
  benchmarks, crossover records, and bond-side official signals.
- Created a dedicated `/states/compare` route that keeps the comparison work editorial and
  selective while linking readers back to canonical state detail pages.
- Linked `/states` into the comparison route and fixed the grouped-surface UX issues
  surfaced by code review: overall-mix labeling, proposal-focus-aligned badges, and
  fail-closed comparison slug resolution.

## Verification

- `bun run format:check`
- `bun run lint`
- `bun test src/lib/site/content.test.ts`
- `bun run build`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add a shared comparison-route model with unit coverage**
   - `3d07142` `test(12-02): add failing comparison model coverage`
   - `6305b78` `feat(12-02): add shared states comparison model`
2. **Task 2: Build the dedicated `/states/compare` route**
   - `bf59775` `feat(12-02): add states comparison route`
3. **Task 3: Add gateway links from the existing states index into the comparison route**
   - `e29d918` `feat(12-02): link states index to comparison route`
4. **Follow-up review fixes**
   - `b81f0e2` `fix(12-02): align clustered comparison cues`

## Files Created/Modified

- `src/lib/site/states-surfaces.ts` - centralizes the editorial cluster and comparison
  route models outside the lower-level graph-access layer.
- `src/lib/site/content.ts` - exports the shared comparison model through the site-content
  layer.
- `src/lib/site/content.test.ts` - adds comparison-model coverage and a fail-closed
  missing-slug assertion.
- `src/routes/(site)/states/compare.tsx` - renders the new comparison surface.
- `src/routes/(site)/states/index.tsx` - links readers into the comparison route and
  labels the mix chips as overall registry summaries.
- `src/components/editorial/Badge.tsx` and `src/components/editorial/StateCard.tsx` -
  allow grouped surfaces to render proposal-focus-aligned badges.
- `src/routes/(site)/states/clusters.tsx` - passes the comparison-aligned badge props
  through the cluster surface.

## Decisions Made

- Kept the comparison route selective by centering three editorial frames instead of
  trying to compare every state equally.
- Used proposal focus as the badge language on grouped surfaces so crossover records stop
  contradicting their own sections.
- Made missing curated comparison slugs a hard error instead of silently dropping them
  from the route.

## Deviations from Plan

The original executor stalled after landing the Task 1 test commit. I completed the
remaining comparison model, route, and gateway work inline and preserved the intended
task-granular commit history, plus a focused follow-up fix for the code-review warnings.

## Issues Encountered

- The first pass of grouped/comparison surfaces left three warning-level issues in review:
  global mix chips looked filtered, grouped cards used the wrong badge taxonomy for
  crossover records, and missing comparison slugs were silently dropped. All three were
  fixed in `b81f0e2`.

## User Setup Required

None - no external services or local environment changes are required.

## Next Phase Readiness

- Phase 12 now has both grouped cluster reading paths and a narrative comparison route.
- Both new surfaces keep readers one click away from canonical state detail pages.
- Phase 13 can focus on refresh queue and freshness QA without needing more registry
  comparison scaffolding.
