---
phase: 11-broader-national-publication-batch
plan: "02"
subsystem: registry-ui
tags: [bun, site-content, solidstart, editorial-registry, confidence-cues]
requires: [11-01, 10-02]
provides:
  - Shared confidence/completeness cue model for published state records.
  - States index cards with calm record-footing cues for the expanded batch.
  - State detail sidebars that reuse the shared cue instead of raw confidence labels.
affects: [phase-12, phase-13]
tech-stack:
  added: []
  patterns: [shared-read-model-cues, thin-route-consumer, editorial-record-footing]
key-files:
  created: []
  modified:
    - src/lib/site/content.ts
    - src/lib/site/content.test.ts
    - src/components/editorial/StateCard.tsx
    - src/routes/(site)/states/index.tsx
    - src/routes/(site)/states/[slug].tsx
key-decisions:
  - "Derive record-footing copy from compiled state metadata in one pure helper rather than in route code."
  - "Use stage-specific editorial language for legislative bills and preserve explicit authority-action labeling."
  - "Expose the cue inside the existing card and sidebar shells instead of introducing comparison or scorecard UI."
patterns-established:
  - "Published state selectors now attach confidenceCue objects alongside manifest data for any registry consumer."
  - "Registry surfaces use record-footing language instead of raw confidence levels."
requirements-completed: [CATA-09]
generated_by: gsd-execute-plan
lifecycle_mode: yolo
phase_lifecycle_id: 11-2026-04-11T20-59-51
generated_at: 2026-04-11T21:41:43Z
duration: 5m
completed: 2026-04-11
---

# Phase 11 Plan 02: Broader National Publication Batch Summary

**Shared confidence/completeness cues now power the ten-state catalog and detail surfaces without introducing dashboard language**

## Performance

- **Duration:** 5m
- **Started:** 2026-04-11T21:37:52Z
- **Completed:** 2026-04-11T21:41:43Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Added a pure `buildConfidenceCue()` helper in the shared site-content layer and wired it into both `getStatesIndexModel()` and `getStateBySlug()`.
- Expanded `src/lib/site/content.test.ts` to the ten-state registry batch and added focused coverage for legislative-stage cues, authority-action wording, and shared selector output.
- Updated the existing `/states` catalog cards to show calm record-footing cues and refreshed the stale "first published batch" copy.
- Replaced the raw confidence label on state-detail sidebars with the same shared cue model while keeping the registry note and financing-case panels intact.

## Verification

- `bun run format:check`
- `bun run lint`
- `bun test src/lib/site/content.test.ts`
- `bun run build`

## Task Commits

1. **Task 1: Add a shared confidence/completeness cue model with unit coverage**
   - `f042e1e` `test(11-02): add failing confidence cue coverage`
   - `4a62c98` `feat(11-02): add shared state confidence cues`
2. **Task 2: Surface the shared cue on the existing states index and cards**
   - `cf1280f` `feat(11-02): surface confidence cues on state cards`
3. **Task 3: Surface the shared cue on the existing state-detail page**
   - `c3c5198` `feat(11-02): show confidence cues on state detail pages`

## Files Created/Modified

- `src/lib/site/content.ts` - adds the shared `confidenceCue` read-model object and the pure `buildConfidenceCue()` selector helper.
- `src/lib/site/content.test.ts` - covers the ten-state batch plus cue derivation and selector wiring behavior.
- `src/components/editorial/StateCard.tsx` - renders the shared record-footing cue inside the existing card shell.
- `src/routes/(site)/states/index.tsx` - threads the cue into catalog cards and refreshes the catalog copy for the expanded batch.
- `src/routes/(site)/states/[slug].tsx` - swaps the raw confidence label for the shared record-footing cue in the sidebar.

## Decisions Made

- Kept the cue derivation in the functional core so routes consume one already-shaped object instead of assembling editorial copy locally.
- Used stage-specific bill wording such as early-stage, advanced, and enacted to distinguish coverage posture without exposing `high` / `medium` / `low`.
- Preserved explicit record-type wording for authority actions so New Hampshire remains clearly distinct from legislature-filed bills.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- Found `.planning/phases/11-broader-national-publication-batch/11-02-SUMMARY.md`.
- Verified task commits `f042e1e`, `4a62c98`, `cf1280f`, and `c3c5198` in git history.
