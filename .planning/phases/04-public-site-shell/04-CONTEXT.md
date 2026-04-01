# Phase 4: Public Site Shell - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the first public-facing website that presents the thesis, methodology, catalog, and state detail surfaces using the packet and registry artifacts already built. This phase is about the shell, information hierarchy, visual direction, and public reading experience. It does not add new data domains, new registry research categories, or deeper debt-modeling capabilities beyond what the current packet and registry already support.

</domain>

<decisions>
## Implementation Decisions

### Homepage story and hierarchy
- The homepage should lead with the thesis rather than the product structure.
- The recommended above-the-fold order is:
  - clear headline about why states should consider bond-financed Bitcoin reserve accumulation
  - one to two sentence framing
  - proof strip with a few high-signal facts from the registry
  - featured Illinois packet call to action
- The first screen should be explicit and assertive, but evidence-first.
- The thesis should dominate first, the Illinois packet should be the featured concrete example, and the registry should act as the credibility layer.
- The primary homepage call to action should be:
  - `Read the Illinois model packet`
- The secondary homepage call to action should be:
  - `Browse state proposals`
- Phase 4 should deliberately include a small set of intuitive infographics on the homepage and supporting pages.

### Catalog and state-page experience
- The first catalog should use medium density rather than a sparse or spreadsheet-heavy layout.
- Each catalog item should show:
  - state
  - proposal title or bill id
  - current status
  - proposal focus
  - one-line significance
  - freshness metadata
- V1 catalog filters should be limited to:
  - state
  - proposal focus (`bond`, `reserve`, `both`)
  - registry or legislative status
  - editorial priority
- Default sort should be:
  - editorial priority first
  - significance second
  - freshness third
- Alternate sorts may include:
  - alphabetical by state
  - most recently reviewed
- State detail pages should balance content in this order:
  - at-a-glance and status block
  - plain-English effect
  - bond/reserve analysis
  - why this matters or why this is limited
  - key statutory mechanics
  - source trail
- Sources should be highly visible but should support the reading flow rather than dominate the first screen.

### Methodology page tone and role
- The public methodology page should be assertive first and defensive second.
- It should say:
  - here is how we classify and source things
  - here is why the mainstream framing is incomplete
  - here are the limits and caveats
- The page should be explicit but compact near the top about declared bias:
  - the site is not neutral
  - it favors disciplined, bond-financed Bitcoin reserve accumulation
  - primary sourcing and clear labeling remain non-negotiable
- The methodology page should read like a policy memo first, with technical-documentation sections beneath it.
- The methodology page should explicitly say weak, symbolic, or only indirectly relevant records may still appear in the registry, but they will be labeled as such rather than inflated.

### Visual direction and public credibility
- The design language should signal editorial-financial seriousness with restrained authority.
- The visual tone should favor:
  - sharp typography
  - strong hierarchy
  - a muted but confident palette
  - diagrams and infographics that feel like policy briefing material rather than dashboards
- Phase 4 should include a few strong visuals, not a gallery of charts.
- The initial infographic set should focus on:
  - reserve versus bond pathway diagram
  - how bond-financed reserve accumulation works
  - state proposal map or status view
  - debt and capital-allocation framing only where it can be supported by current Phase 4 scope
- The site should avoid:
  - glowing crypto aesthetics
  - trading-chart clutter
  - purple neon or dark-finance clichés
  - meme visuals
  - dashboard overload
  - bland government-site sterility
- The homepage and site shell should visually emphasize:
  - one dominant hero thesis
  - one featured Illinois packet block
  - one compact registry preview
  - one or two intuitive diagrams

### Claude's Discretion
- Exact component split and route structure inside the approved homepage, methodology, catalog, and state-detail shell.
- Exact visual treatment of the initial infographic set, as long as it remains serious and policy-briefing-oriented.
- Exact copy framing for proof-strip facts and supporting labels.
- Exact density and card/list presentation details for the catalog so long as the approved data hierarchy remains intact.
- Exact typography, spacing, and color-token implementation details.

</decisions>

<specifics>
## Specific Ideas

- The first impression should be: “this is a serious research product with a point of view,” not “this is a dataset dump” and not “this is crypto marketing.”
- The homepage should feel like an editorial policy brief with supporting registry proof, not like a dashboard or brochure.
- The Illinois packet should be visually featured as the concrete model, while the registry demonstrates that the site also has national scope.

</specifics>

<deferred>
## Deferred Ideas

- State debt and major metro area debt research, plus payoff or issuance modeling and graphs, should be treated as a later research-and-analysis capability rather than part of the minimal Phase 4 shell.
- If pursued later, that work could support a dedicated explainer, comparison surface, or inserted phase focused on debt modeling and bond-issuance scenarios.

</deferred>

---
*Phase: 04-public-site-shell*
*Context gathered: 2026-04-01*
