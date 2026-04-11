---
phase: 12-public-coverage-and-freshness-surfaces
plan: "01"
subsystem: ui
tags: [registry, catalog, coverage, freshness]
requires: []
provides:
  - manifest-wide coverage ledger on the states index
  - status-aware registry filters and summary counts
  - published versus non-published state card distinctions
affects: [phase-12, phase-13]
tech-stack:
  added: []
  patterns: [coverage-led catalog, status-aware state cards]
key-files:
  created: []
  modified:
    - src/lib/site/content.ts
    - src/components/editorial/Badge.tsx
    - src/components/editorial/StateCard.tsx
    - src/routes/(site)/states/index.tsx
    - generated/content-graph.json
key-decisions:
  - "The states page should become a 50-state coverage ledger instead of a published-only list."
  - "Only published states get record links; queued and unresearched states stay visible but clearly non-public."
patterns-established:
  - "Catalog status counts and debt signals now lead the registry page."
requirements-completed: [SITE-07]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: phase-20260411T153046Z
generated_at: 2026-04-11T15:37:12Z
duration: 1 min
completed: 2026-04-11
---

# Phase 12 Plan 01: Coverage ledger Summary

**The states page now reads as a 50-state coverage ledger with explicit published, queued, and unresearched status distinctions**

## Performance

- **Duration:** 1 min
- **Started:** 2026-04-11T10:31:49-05:00
- **Completed:** 2026-04-11T10:36:53-05:00
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Reworked the catalog data layer to merge manifest-wide coverage entries with published record data.
- Added summary tiles for published, queued, unresearched, due-soon, and overdue counts.
- Changed state cards so only published records link through while non-published entries stay visibly distinct.

## Task Commits

The plan landed in one atomic implementation commit:

1. **Plan implementation** - `e7e5d51` (feat)

**Plan metadata:** `bf9cc65` (docs: context and plans)

## Files Created/Modified
- `src/lib/site/content.ts` - Adds manifest-wide coverage helpers and total tracked counts.
- `src/components/editorial/Badge.tsx` - Extends badge tones for status and freshness labels.
- `src/components/editorial/StateCard.tsx` - Supports published, queued, and unresearched card variants.
- `src/routes/(site)/states/index.tsx` - Turns the route into a coverage ledger with status filters.
- `generated/content-graph.json` - Updated freshness offsets for the new runtime date.

## Decisions Made
- Use one catalog route for both published and non-published coverage instead of adding a separate backlog page.
- Keep the card visual language but downgrade non-published states to non-linking ledger entries.

## Deviations from Plan

None - plan executed as specified.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Readers can now see the registry’s national coverage posture without leaving the catalog.
- The detail refresh pass can build on the same freshness/status language.

---
*Phase: 12-public-coverage-and-freshness-surfaces*
*Completed: 2026-04-11*
