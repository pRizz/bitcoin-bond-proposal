---
phase: 06-public-packet-access-and-illinois-model-separation
plan: "02"
subsystem: ui
tags: [cta, packet, registry, illinois, flow]
requires:
  - phase: 06-01
    provides: public Illinois packet route
provides:
  - honest packet CTA routing
  - packet-versus-registry separation
  - verified model-argument-proof public flow
affects: [homepage, explainer, footer, state-detail, milestone]
tech-stack:
  added: []
  patterns: [truthful packet labeling, normative-vs-descriptive separation]
key-files:
  created: []
  modified:
    - src/routes/(site)/index.tsx
    - src/components/editorial/PacketFeature.tsx
    - src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx
    - src/app.tsx
    - src/routes/(site)/states/[slug].tsx
    - content/docs/explainer-bond-financed-reserve-accumulation.md
key-decisions:
  - "Packet CTAs should always lead to the normative packet surface, never to the descriptive Illinois registry record."
  - "The Illinois registry page should point back to the packet explicitly without losing its descriptive role."
patterns-established:
  - "Public packet navigation and registry navigation now stay semantically distinct."
  - "Flow verification happens against prerendered output, not just source routes."
requirements-completed: [DOCS-01, DOCS-02, SITE-01, SITE-05, SITE-06]
duration: 4 min
completed: 2026-04-02
---

# Phase 6 Plan 02: CTA rewiring and separation Summary

**Packet CTAs rewired to the real Illinois model, with clear packet-versus-registry separation across the shell**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-02T10:26:00Z
- **Completed:** 2026-04-02T10:30:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Rewired the homepage, packet feature, explainer sidebar, and footer packet links to `/packet/illinois`.
- Added an explicit Illinois-only support block on the HB1844 page that distinguishes the descriptive registry record from the normative packet.
- Verified the `model / argument / proof` flow in prerendered output and corrected one lingering packet link inside the canonical explainer article body.

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewire packet CTAs to the real packet route** - `75befb2` (feat)
2. **Task 2: Add honest packet and registry cross-links** - `debf711` (feat)
3. **Task 3: Verify the model / argument / proof reading path** - `be2cbf0` (fix)

**Plan metadata:** Pending

## Files Created/Modified
- `src/routes/(site)/index.tsx` - Homepage packet CTA now points to the packet route and the read-first section has a direct packet action.
- `src/components/editorial/PacketFeature.tsx` - Featured packet card now points to the packet route.
- `src/routes/(site)/explainers/bond-financed-reserve-accumulation.tsx` - Explainer sidebar packet CTA now points to the packet route.
- `src/app.tsx` - Footer featured packet link now points to the packet route.
- `src/routes/(site)/states/[slug].tsx` - Illinois registry page now points readers to the packet honestly while remaining descriptive.
- `content/docs/explainer-bond-financed-reserve-accumulation.md` - Corrected the article-body packet link discovered during final flow verification.

## Decisions Made
- Treated the Illinois packet as the normative site model everywhere packet language appears.
- Kept the Illinois HB1844 page descriptive and explicit about what it is not.
- Verified the packet flow in built HTML so misleading rendered links could not survive unnoticed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Corrected a lingering packet link inside the canonical explainer body**
- **Found during:** Task 3 (Verify the model / argument / proof reading path)
- **Issue:** The explainer sidebar CTA was fixed, but the canonical explainer markdown still linked `Read the Illinois model packet` to `/states/illinois`.
- **Fix:** Updated the canonical explainer markdown so the article-body packet link now points to `/packet/illinois`.
- **Files modified:** `content/docs/explainer-bond-financed-reserve-accumulation.md`
- **Verification:** Rebuilt the site and confirmed the prerendered explainer page no longer routes packet readers to the Illinois registry record.
- **Committed in:** `be2cbf0`

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The Phase 6 goal can now be verified against live prerendered packet, explainer, and registry flows.
- Any remaining milestone debt is limited to tooling guardrail cleanup rather than packet-surface ambiguity.

---
*Phase: 06-public-packet-access-and-illinois-model-separation*
*Completed: 2026-04-02*
