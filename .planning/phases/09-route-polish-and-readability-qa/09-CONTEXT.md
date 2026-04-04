# Phase 9: Route Polish and Readability QA - Context

## Decisions Captured

### Homepage readability tuning
- Phase 9 should keep the homepage structure intact and clarify the existing reading path rather than redesigning layout.
- Highest-priority homepage tuning:
  - hero headline and subcopy contrast
  - proof-strip scanability
  - packet and registry card hierarchy
  - first two section transitions
- The hero may become slightly stronger, but not louder or more dramatic for its own sake.
- The existing `model / argument / proof` structure should remain in place and be clarified rather than changed.

### Long-form reading surfaces
- Long-form text should feel comfortable and calm in dark mode, not stark white-on-black.
- Improve readability through:
  - softer body contrast
  - stronger heading contrast
  - more breathing room between sections
  - better table and list treatment
- The most important long-form surfaces in this phase are:
  - methodology
  - explainer
  - Illinois packet route
  - state-detail narrative bodies
- The goal is better legibility, not more expressive typography.

### Proof and data surface clarity
- Trust and data surfaces should become distinctly sharper than in Phase 8, but must not turn into dashboard UI.
- Highest-priority data surfaces:
  - state cards
  - proof strip
  - registry snapshot
  - state metadata blocks
  - table contrast
- Orange should be used selectively to guide attention, not to color every data surface.
- Secondary notes, source trails, status support text, and caveat blocks should remain visually quiet.

### Interaction and QA priorities
- Highest-priority QA targets:
  - hover clarity
  - active-state clarity
  - focus visibility
  - mobile wrapping and spacing
  - consistent dark treatment across every shipped route
- Mobile QA is first-class in this phase.
- Do not add more motion unless a small interaction state needs it for clarity.
- Done means:
  - no low-contrast interactive states
  - no broken focus rings
  - no awkward mobile overflow or wrapping
  - no route that still feels half-light or visually unfinished

## Deferred Boundary
- Do not redesign route structure or add new public surfaces.
- Do not add a theme toggle in this phase.
- Do not turn route polish into a broader content-expansion milestone.
