# Roadmap: Bitcoin Bond Proposal

## Current Milestone: v1.2 Registry Expansion and Refresh Workflows

**Status:** Active  
**Phases:** 10-13  
**Total Plans:** 10

## Overview

This milestone moves the project from a five-state proof of concept toward a broader national research product. It starts with refresh-aware maintainer tooling and freshness contracts, uses that foundation to publish a larger trustworthy state batch, updates public registry surfaces so coverage status and review recency stay legible, and finishes with selective `mystic-ui` adoption only where compatibility and editorial trust are preserved.

## Phases

### Phase 10: Refresh Workflow Foundation

**Goal**: Add the freshness-aware content, validation, and maintainer workflow foundation that broader coverage depends on.  
**Depends on**: Nothing (milestone foundation)  
**Requirements**: `PIPE-04`, `PIPE-05`, `PIPE-06`  
**Plans**: 3 plans

Plans:
- [x] 10-01: Extend schema, manifest handling, and compiled content graph for refresh-aware registry state.
- [x] 10-02: Add repo-owned refresh audit and review-report tooling for published entries.
- [x] 10-03: Tighten authoring validation and workflow guidance for new or refreshed state entries.

Success criteria:
1. Maintainer can run a repo-owned command that surfaces published entries due for review.
2. Validation fails when required freshness or manifest-boundary fields drift out of contract.
3. Generated content outputs carry the coverage and freshness data needed by later public surfaces.

### Phase 11: Expanded State Coverage

**Goal**: Publish the next trustworthy batch of state entries on top of the refresh-aware pipeline.  
**Depends on**: Phase 10  
**Requirements**: `CATA-07`, `CATA-08`  
**Plans**: 3 plans

Plans:
- [ ] 11-01: Select the next publication batch and align manifest status for newly targeted states.
- [ ] 11-02: Author and verify the first half of the new state entry batch.
- [ ] 11-03: Author and verify the remaining state entries and promote the expanded batch.

Success criteria:
1. The site exposes a clearly larger published batch than the initial five-state set.
2. Each new published entry includes summary, primary sources, `status as of`, and `last reviewed` fields that pass validation.
3. Manifest and compiled output stay consistent with the newly published state set.

### Phase 12: Public Coverage and Freshness Surfaces

**Goal**: Make expanded coverage and review recency obvious in public registry flows without blurring trust boundaries.  
**Depends on**: Phase 11  
**Requirements**: `SITE-07`, `SITE-08`  
**Plans**: 2 plans

Plans:
- [ ] 12-01: Update the states catalog to show published, queued, and unresearched coverage status with freshness cues.
- [ ] 12-02: Refine state detail surfaces to emphasize review recency, source context, and trust boundaries.

Success criteria:
1. Readers can tell at a glance whether a state is published, queued, or unresearched.
2. Catalog and detail routes surface freshness and review recency without implying live legislative tracking.
3. Public registry flows still distinguish descriptive research records from the normative Illinois packet and explainer surfaces.

### Phase 13: Selective mystic-ui Adoption and QA

**Goal**: Apply selective `mystic-ui` enhancements where they materially improve the public product and pass compatibility, readability, and performance review.  
**Depends on**: Phase 12  
**Requirements**: `SITE-09`  
**Plans**: 2 plans

Plans:
- [ ] 13-01: Validate the compatible `mystic-ui` integration path for SolidStart, Tailwind CSS v4, and the existing dark editorial token system.
- [ ] 13-02: Apply chosen `mystic-ui` enhancements to high-signal public surfaces and complete runtime QA.

Success criteria:
1. Any adopted `mystic-ui` components preserve the current dark editorial hierarchy, trust cues, and Tailwind CSS v4 setup.
2. Enhanced surfaces remain readable, performant, and accessible on desktop and mobile.
3. The public webapp gains noticeable polish without turning into a full component-library rewrite.

## Milestone Notes

**Key decisions:**
- Keep the milestone pipeline-first: maintainer workflow and data trust land before broader public surface work.
- Promote the earlier `999.1` `mystic-ui` seed into the active milestone instead of keeping it as duplicate backlog.
- Defer theme toggle and richer comparison or cluster pages until broader coverage and refresh workflows are stable.

**Out of scope for this milestone:**
- Live legislative tracking or alerting
- Full `mystic-ui` rewrite
- Theme toggle implementation
- Municipal coverage expansion
