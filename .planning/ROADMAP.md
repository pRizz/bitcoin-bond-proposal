# Roadmap: Bitcoin Bond Proposal

## Milestones

- ✅ **v1.0 Illinois-first MVP** — shipped 2026-04-03. See [v1.0 roadmap archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-ROADMAP.md), [v1.0 requirements archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-REQUIREMENTS.md), and [v1.0 audit archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-MILESTONE-AUDIT.md).
- 🚧 **v1.1 Dark Mode Editorial Refactor** — initialized 2026-04-04.

## Current Milestone: v1.1 Dark Mode Editorial Refactor

**Goal:** Refactor the public webapp into a dark-by-default editorial experience with subtle Bitcoin-orange accents while preserving readability, hierarchy, and trust cues across all shipped routes.

**Target features:**
- dark mode as the default visual system across existing public routes
- restrained Bitcoin-orange accent treatment for emphasis and actions
- route-by-route readability, contrast, and interaction polish

## Phases

### Phase 8: Dark Theme Foundation

**Goal**: Establish the dark-first token layer, shared shell styling, and reusable accent system for the webapp.  
**Depends on**: Phase 7  
**Requirements**: THEME-01, THEME-02  
**Success Criteria** (what must be TRUE):
  1. The public shell defaults to a dark visual system without requiring a theme toggle or runtime theme switch.
  2. Shared surfaces such as header, footer, cards, buttons, badges, and section wrappers use a restrained Bitcoin-orange accent system rather than the current light palette.
  3. Local build and prerender output remain healthy after the dark-theme foundation is introduced.
**Plans**: 0 plans

Plans:
- [ ] TBD (run `$gsd-plan-phase 8` to break down)

**Details:**
This phase is the theme-system and shared-surface refactor. It should not yet widen into route-by-route polish beyond what is necessary to establish the dark default cleanly.

### Phase 9: Route Polish and Readability QA

**Goal**: Apply and polish the dark editorial system across all shipped routes, with explicit readability and interaction QA.  
**Depends on**: Phase 8  
**Requirements**: THEME-03, THEME-04, THEME-05  
**Success Criteria** (what must be TRUE):
  1. Homepage, methodology, packet, explainer, catalog, and state-detail routes all use the dark editorial system consistently.
  2. Typography, diagrams, cards, tables, hover states, active states, and focus states remain readable and usable on desktop and mobile.
  3. No obvious light-theme artifacts or low-contrast regressions remain in the built and prerendered output.
**Plans**: 0 plans

Plans:
- [ ] TBD (run `$gsd-plan-phase 9` to break down)

**Details:**
This phase finishes the route-level dark refactor and verifies that the system still feels serious, editorial, and trustworthy rather than merely inverted.

## Progress

**Execution Order:**  
Phases execute in numeric order: 8 → 9

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Dark Theme Foundation | v1.1 | 0/0 | Not started | - |
| 9. Route Polish and Readability QA | v1.1 | 0/0 | Not started | - |
