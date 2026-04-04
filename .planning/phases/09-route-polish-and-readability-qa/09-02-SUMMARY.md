---
phase: 09-route-polish-and-readability-qa
plan: "02"
subsystem: ui
tags: [dark-mode, long-form, readability, qa, mobile]
requires:
  - phase: 09-01
    provides: homepage and catalog readability baseline
provides:
  - calmer long-form reading surfaces
  - stronger focus and interaction visibility
  - mobile-safe route chrome and support panels
affects: [methodology, packet, explainer, state-detail, shell]
tech-stack:
  added: []
  patterns: [shared reading-surface classes, runtime qa-driven refinement]
key-files:
  created: []
  modified:
    - src/components/editorial/ActionLink.tsx
    - src/components/editorial/MarkdownContent.tsx
    - src/components/editorial/SiteHeader.tsx
    - src/routes/(site)/methodology.tsx
    - src/routes/(site)/packet/illinois.tsx
    - src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx
    - src/routes/(site)/states/[slug].tsx
    - src/styles/app.css
key-decisions:
  - "Long-form routes should share calmer reading and support-panel treatments instead of each route improvising its own dark styling."
  - "Route QA should fix concrete focus and mobile issues, not introduce new visual concepts."
patterns-established:
  - "Methodology, packet, explainer, and state-detail routes now use reading-surface and support-panel distinctions for narrative vs support content."
  - "Shared action and navigation components now expose visible keyboard focus and mobile-safe wrapping."
requirements-completed: [THEME-03, THEME-04, THEME-05]
duration: 12 min
completed: 2026-04-04
---

# Phase 9 Plan 02: Long-form readability and QA Summary

**Long-form routes polished for calm reading comfort, with runtime QA used to close the last mobile and focus issues**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-04T08:56:00Z
- **Completed:** 2026-04-04T09:07:35Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Introduced calmer reading surfaces, improved prose spacing, and stronger support-panel hierarchy across methodology, packet, explainer, and state-detail routes.
- Added shared keyboard-focus visibility to CTA links and PDF downloads so dark-mode interactions remain visible instead of disappearing into the chrome.
- Closed the remaining mobile regression by changing the header to a stacked, wrapped layout on narrow screens.

## Task Commits

Each task was committed atomically:

1. **Task 1: Tune long-form reading surfaces** - `0d0cd3c` (feat)
2. **Task 2: Run route-level interaction and mobile QA pass** - `0d0cd3c` (feat)

**Plan metadata:** Recorded in `09-02-PLAN.md`

## Files Created/Modified

- `src/components/editorial/MarkdownContent.tsx` - Long-form prose, lists, blockquotes, and tables gained calmer spacing and clearer hierarchy.
- `src/routes/(site)/methodology.tsx`, `src/routes/(site)/packet/illinois.tsx`, `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx`, and `src/routes/(site)/states/[slug].tsx` - Reading and support surfaces now separate narrative from metadata/support content more clearly.
- `src/components/editorial/ActionLink.tsx` / `src/components/editorial/SiteHeader.tsx` - Focus visibility and narrow-screen header behavior are now stable in the dark shell.
- `src/styles/app.css` - Shared reading-surface, support-panel, chip-focus, and supporting motion rules back the route polish.

## Decisions Made

- Treated focus and mobile fixes as shared-component concerns where possible so route QA did not devolve into one-off patches.
- Kept the long-form styling editorial and calm by deepening panel hierarchy and spacing instead of pushing contrast to stark white-on-black extremes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Runtime QA] Mobile header pills overflowed the narrow viewport**
- **Found during:** Task 2 (Run route-level interaction and mobile QA pass)
- **Issue:** The sticky site header kept its desktop single-row layout on mobile, causing the nav pills to push past the viewport edge.
- **Fix:** Updated `src/components/editorial/SiteHeader.tsx` to use a stacked mobile layout with wrapped nav items.
- **Verification:** Mobile Playwright pass at `390x844` on `/states` showed the header fully wrapping without clipped navigation.
- **Committed in:** `0d0cd3c`

## Issues Encountered

None remaining after QA.

## User Setup Required

None

## Next Phase Readiness

- Phase 9 now satisfies the route-level polish boundary for v1.1.
- The milestone is ready for audit rather than more theme-system work.

---
*Phase: 09-route-polish-and-readability-qa*
*Completed: 2026-04-04*
