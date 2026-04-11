# Roadmap: Bitcoin Bond Proposal

## Milestones

- ✅ **v1.0 Illinois-first MVP** — shipped 2026-04-03. See [v1.0 roadmap archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-ROADMAP.md), [v1.0 requirements archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-REQUIREMENTS.md), and [v1.0 audit archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-MILESTONE-AUDIT.md).
- ✅ **v1.1 Dark Mode Editorial Refactor** — shipped 2026-04-04. See [v1.1 roadmap archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-ROADMAP.md), [v1.1 requirements archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-REQUIREMENTS.md), and [v1.1 audit archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-MILESTONE-AUDIT.md).
- 🚧 **v1.2 National Coverage, Comparison, and Refresh** — phases 10-13 (initialized 2026-04-11)

## Overview

v1.2 turns the shipped Illinois-first product into a broader national research surface. The milestone extends the canonical registry contract, publishes the next deliberate state batch, adds cluster and comparison reading paths, and finishes with repo-owned refresh workflow support and freshness QA.

## Phases

### 🚧 v1.2 National Coverage, Comparison, and Refresh

**Milestone Goal:** Turn the Illinois-first product into a broader national research surface that can compare states credibly and stay fresh without pretending to be live.

#### Phase 10: Coverage Expansion Contract and Data Shape
**Goal**: Extend the canonical registry contract and generated content graph so broader coverage, grouping, and refresh cues have a trustworthy foundation.
**Depends on**: Phase 9
**Requirements**: [CATA-08, REFR-02]
**Success Criteria** (what must be TRUE):
  1. Maintainer can author or derive the metadata needed for grouping by status, proposal type, and region.
  2. Comparison- and freshness-ready data exists in the generated content graph instead of ad hoc route logic.
  3. Published content and refresh workflow artifacts are distinguishable in the canonical project structure.
**Plans**: 2 plans

Plans:
- [x] 10-01: Extend canonical schemas and manifest fields for comparison and refresh contracts.
- [x] 10-02: Propagate grouped and freshness-aware data through the compile pipeline and site loaders.

#### Phase 11: Broader National Publication Batch
**Goal**: Publish the next deliberate batch of state entries under the stronger registry contract and visible confidence/freshness rules.
**Depends on**: Phase 10
**Requirements**: [CATA-07, CATA-09]
**Success Criteria** (what must be TRUE):
  1. Reader can access more publishable state entries than the initial five-state batch.
  2. Expanded entries expose confidence or completeness cues when research depth varies.
  3. The catalog and state-detail content stay aligned with the manifest and canonical sources.
**Plans**: 2 plans

Plans:
- [ ] 11-01: Research and publish the next state batch using the stronger registry contract.
- [ ] 11-02: Integrate the expanded batch into existing registry surfaces with confidence cues.

#### Phase 12: Cluster and Comparison Surfaces
**Goal**: Ship editorial cluster and comparison surfaces that help readers understand legislative patterns without leaving the canonical source trail.
**Depends on**: Phase 11
**Requirements**: [SITE-07, SITE-08, SITE-09]
**Success Criteria** (what must be TRUE):
  1. Reader can browse grouped views by status, proposal type, or region.
  2. Reader can use comparison surfaces that explain meaningful differences between states.
  3. Reader can move from comparison views into canonical state detail pages without losing context.
**Plans**: 2 plans

Plans:
- [ ] 12-01: Build cluster reading paths for the expanded registry.
- [ ] 12-02: Build comparison storytelling surfaces and cross-links back to state detail pages.

#### Phase 13: Refresh Workflow and Freshness QA
**Goal**: Make broader coverage maintainable through repo-owned refresh workflow support and cross-surface freshness QA.
**Depends on**: Phase 12
**Requirements**: [REFR-01, REFR-03]
**Success Criteria** (what must be TRUE):
  1. Maintainer can generate an auditable refresh queue for stale or status-sensitive entries.
  2. Reader sees consistent freshness cues across catalog, comparison, and state-detail surfaces.
  3. Refresh workflow support does not create pseudo-live publication claims or bypass the canonical review path.
**Plans**: 2 plans

Plans:
- [ ] 13-01: Implement a repo-owned refresh queue or report workflow.
- [ ] 13-02: Apply freshness cues and QA across registry and comparison surfaces.

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 10. Coverage Expansion Contract and Data Shape | v1.2 | 2/2 | Complete    | 2026-04-11 |
| 11. Broader National Publication Batch | v1.2 | 0/2 | Not started | - |
| 12. Cluster and Comparison Surfaces | v1.2 | 0/2 | Not started | - |
| 13. Refresh Workflow and Freshness QA | v1.2 | 0/2 | Not started | - |

## Backlog

### Phase 999.1: Selective mystic-ui adoption across the public webapp (BACKLOG)

**Goal:** Evaluate and selectively adopt [`mystic-ui`](https://github.com/pRizz/mystic-ui) across the public SolidStart webapp where it materially improves the editorial product without compromising Tailwind CSS v4 compatibility, dark-theme coherence, performance, or trust cues.
**Requirements:** Validate the library's SolidStart and Tailwind CSS v4 fit first; preserve the current dark editorial token system and route structure; favor high-signal surfaces such as hero treatment, motion accents, proof panels, navigation accents, and state/catalog cards over a wholesale component rewrite.
**Plans:** 0 plans

Plans:
- [ ] TBD (promote with /gsd-review-backlog when ready)
