---
phase: 09-route-polish-and-readability-qa
plan: "01"
subsystem: ui
tags: [dark-mode, homepage, registry, catalog, scanability]
requires: []
provides:
  - sharper homepage reading path
  - clearer proof-strip and registry snapshot scanability
  - stronger catalog filter and state-card hierarchy
affects: [homepage, catalog, proof-surfaces]
tech-stack:
  added: []
  patterns: [layout-preserving route polish, calmer proof-surface hierarchy]
key-files:
  created: []
  modified:
    - src/routes/(site)/index.tsx
    - src/routes/(site)/states/index.tsx
    - src/components/editorial/ProofStrip.tsx
    - src/components/editorial/RegistrySnapshot.tsx
    - src/components/editorial/StateCard.tsx
    - src/styles/app.css
key-decisions:
  - "Phase 9 should clarify the existing homepage reading path, not redesign the structure."
  - "Proof and catalog surfaces should become sharper without becoming dashboard UI."
patterns-established:
  - "The homepage now uses a clearer read-order cue and complete action set across the model / argument / proof stack."
  - "Registry snapshot cards and state cards now emphasize state identity, status, and significance in a calmer scan order."
requirements-completed: [THEME-03, THEME-05]
duration: 5 min
completed: 2026-04-04
---

# Phase 9 Plan 01: Homepage and catalog polish Summary

**Homepage reading order and proof/catalog scanability tightened without changing the route structure**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-04T08:50:00Z
- **Completed:** 2026-04-04T08:55:08Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Clarified the homepage reading path with stronger hero hierarchy, explicit read-order labeling, and a completed three-surface CTA set.
- Reworked proof-strip, registry snapshot, and state-card hierarchy so status, type, significance, and freshness scan cleanly in the dark system.
- Tightened catalog controls and count framing so the states index feels intentional rather than lightly recolored.

## Task Commits

Each task was committed atomically:

1. **Task 1: Tune homepage contrast and reading-path hierarchy** - `c80379d` (feat)
2. **Task 2: Improve proof and catalog surface scanability** - `c80379d` (feat)

**Plan metadata:** Recorded in `09-01-PLAN.md`

## Files Created/Modified

- `src/routes/(site)/index.tsx` - Hero read order, section-card hierarchy, and registry CTA path are clearer.
- `src/routes/(site)/states/index.tsx` - Filter framing, published-count context, and empty-state handling improved.
- `src/components/editorial/ProofStrip.tsx` / `src/components/editorial/RegistrySnapshot.tsx` / `src/components/editorial/StateCard.tsx` - Proof and catalog surfaces now scan in a calmer, more ordered way.
- `src/styles/app.css` - Shared panel and chip surfaces support the tighter catalog and proof hierarchy.

## Decisions Made

- Kept the `model / argument / proof` structure explicit and reinforced it rather than introducing a new homepage concept.
- Made registry snapshot cards directly navigable so homepage proof surfaces behave like real entry points, not static summaries.

## Deviations from Plan

None - plan executed as intended.

## Issues Encountered

None

## User Setup Required

None

## Next Phase Readiness

- Long-form routes can now adopt calmer reading surfaces without needing more homepage or catalog restructuring.
- Final route QA can concentrate on long-form comfort, focus visibility, and mobile consistency.

---
*Phase: 09-route-polish-and-readability-qa*
*Completed: 2026-04-04*
