---
phase: 05-editorial-polish-and-explainers
plan: "01"
subsystem: docs
tags: [explainer, route, prerender, editorial, markdown]
requires: []
provides:
  - canonical bond-financed reserve explainer
  - public explainer route
  - explainer prerender path
affects: [homepage, editorial-voice, milestone]
tech-stack:
  added: []
  patterns: [canonical explainer markdown, public article route]
key-files:
  created:
    - content/docs/explainer-bond-financed-reserve-accumulation.md
    - src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx
  modified:
    - src/lib/site/content.ts
    - app.config.ts
key-decisions:
  - "The first explainer should sharpen the financing argument, not re-teach reserve basics."
  - "Explainers belong inside the same public shell as the packet and registry."
patterns-established:
  - "Explainers are canonical markdown files rendered through the same route shell as the rest of the site."
  - "New public editorial pages are prerendered explicitly rather than left to crawl-only discovery."
requirements-completed: [SITE-05]
duration: 9 min
completed: 2026-04-02
---

# Phase 5 Plan 01: First explainer Summary

**First deep explainer published as a canonical article and prerendered public route**

## Performance

- **Duration:** 9 min
- **Started:** 2026-04-02T07:55:00Z
- **Completed:** 2026-04-02T08:04:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Wrote the first canonical explainer on bond-financed reserve accumulation.
- Added a public explainer route inside the existing site shell.
- Explicitly prerendered the explainer as part of the public output.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the canonical explainer article** - `555919d` (docs)
2. **Task 2: Add the public explainer route** - `f75f796` (feat)
3. **Task 3: Prerender the explainer into the public shell** - `ec4df1d` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `content/docs/explainer-bond-financed-reserve-accumulation.md` - Canonical explainer article.
- `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx` - Public route for the explainer.
- `app.config.ts` - Prerender route added for the explainer.
- `src/lib/site/content.ts` - Explainer lookup support through the generated docs graph.

## Decisions Made
- The first explainer should answer the financing question directly instead of drifting into generic reserve advocacy.
- The explainer should sit in the same public shell as the packet and registry, not in a disconnected article layer.

## Deviations from Plan

None - plan executed as intended.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The site now has a first real editorial argument layer.
- Homepage and visual polish can now sharpen around a visible explainer rather than a hypothetical one.

---
*Phase: 05-editorial-polish-and-explainers*
*Completed: 2026-04-02*
