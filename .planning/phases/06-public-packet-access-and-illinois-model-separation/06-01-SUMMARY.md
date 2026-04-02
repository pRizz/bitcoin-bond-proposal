---
phase: 06-public-packet-access-and-illinois-model-separation
plan: "01"
subsystem: ui
tags: [packet, illinois, route, pdf, prerender]
requires: []
provides:
  - public Illinois packet route
  - packet PDF access from the site shell
  - prerendered packet model surface
affects: [homepage, explainer, packet-layer, milestone]
tech-stack:
  added: []
  patterns: [canonical packet markdown route, built asset pdf links]
key-files:
  created:
    - src/routes/(site)/packet/illinois.tsx
  modified:
    - app.config.ts
key-decisions:
  - "The narrowest robust fix is a dedicated `/packet/illinois` route rather than a generic docs-routing system."
  - "Packet PDFs should be exposed as built asset URLs from the canonical repo-owned `pdf/` outputs."
patterns-established:
  - "Normative packet surfaces are separate from descriptive registry records."
  - "Repo-owned PDFs can be surfaced through the web shell by importing them as build assets."
requirements-completed: [DOCS-01, DOCS-02, SITE-01, SITE-06]
duration: 10 min
completed: 2026-04-02
---

# Phase 6 Plan 01: Public packet surface Summary

**Public Illinois packet route added, with real packet downloads and explicit prerendering**

## Performance

- **Duration:** 10 min
- **Started:** 2026-04-02T10:17:00Z
- **Completed:** 2026-04-02T10:27:00Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Added a dedicated public Illinois packet surface at `/packet/illinois`.
- Exposed the one-pager and draft-bill PDFs from that route through built asset URLs.
- Explicitly prerendered the packet route into the public shell.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the public Illinois packet route** - `9d319fd` (feat)
2. **Task 2: Add honest packet downloads and registry distinction** - `0ec24ea` (feat)
3. **Task 3: Prerender the Illinois packet route** - `9cbc74d` (chore)

**Plan metadata:** Pending

## Files Created/Modified
- `src/routes/(site)/packet/illinois.tsx` - New public packet route rendering the canonical Illinois one-pager and draft bill.
- `app.config.ts` - Added `/packet/illinois` to the explicit prerender route list.

## Decisions Made
- Chose a single Illinois packet route instead of building a generic docs surface.
- Kept the packet route explicitly normative and separate from the descriptive Illinois HB1844 registry entry.
- Used Vite asset imports for the packet PDFs so the downloads exist in built output without duplicating source content.

## Deviations from Plan

None - plan executed as intended.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Packet CTAs can now be rewired to a real model surface instead of the Illinois registry page.
- Wave 2 can focus purely on honest labeling and end-to-end flow repair.

---
*Phase: 06-public-packet-access-and-illinois-model-separation*
*Completed: 2026-04-02*
