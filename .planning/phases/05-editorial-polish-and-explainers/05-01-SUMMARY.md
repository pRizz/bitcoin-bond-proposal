---
phase: 05-editorial-polish-and-explainers
plan: "01"
subsystem: docs
tags: [explainer, editorial, shell, prerender, markdown]
requires: []
provides:
  - First deep explainer article
  - Public explainer route
  - Prerendered explainer page
affects: [homepage, methodology, editorial-voice]
tech-stack:
  added: []
  patterns: [canonical explainer markdown, prerendered article route]
key-files:
  created:
    - content/docs/explainer-bond-financed-reserve-accumulation.md
    - src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx
  modified:
    - app.config.ts
    - generated/content-graph.json
    - src/lib/site/content.ts
key-decisions:
  - "The first explainer should explain the financing distinction, not re-teach reserve basics."
  - "The explainer belongs in the public shell as a first-class route rather than as an isolated article file."
patterns-established:
  - "Explainers are canonical markdown docs with dedicated public routes."
  - "Prerendered article routes can be added to the shell without widening the data model."
requirements-completed: [SITE-05]
duration: 9 min
completed: 2026-04-02
---

# Phase 5 Plan 01: First explainer Summary

**First deep explainer on bond-financed reserve accumulation, published as a prerendered public route**

## Performance

- **Duration:** 9 min
- **Started:** 2026-04-02T07:55:00Z
- **Completed:** 2026-04-02T08:04:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Authored the first deep explainer as canonical markdown.
- Added a first-class public route for the explainer.
- Added the explainer to the prerendered public shell.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the canonical explainer article** - `555919d` (docs)
2. **Task 2: Add the public explainer route** - `f75f796` (feat)
3. **Task 3: Prerender the explainer into the public shell** - `ec4df1d` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `content/docs/explainer-bond-financed-reserve-accumulation.md` - Canonical explainer article.
- `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx` - Public route for the explainer.
- `app.config.ts` - Prerender config updated to include the explainer route.
- `src/lib/site/content.ts` - Uses generated docs metadata for explainer lookup.
- `generated/content-graph.json` - Updated to include the new explainer in the docs graph.

## Decisions Made
- The first explainer should sharpen the financing case, not just restate the packet.
- The explainer should sit inside the same shell and route system as the rest of the public product.

## Deviations from Plan

None - plan executed as intended.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The site now has an argument layer that can be integrated more visibly into the shell.
- The homepage and visual polish can now sharpen around a real explainer rather than a hypothetical one.

---
*Phase: 05-editorial-polish-and-explainers*
*Completed: 2026-04-02*
