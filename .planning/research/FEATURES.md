# Feature Research

**Domain:** Milestone v1.2 national coverage expansion, comparison surfaces, and refresh workflows
**Researched:** 2026-04-11
**Confidence:** HIGH

## Feature Categories

### Coverage Expansion

**Table stakes:** publish a larger state batch under the same trust contract, preserve canonical state-detail quality, and expose richer metadata needed for grouping.

**Differentiators:** confidence/completeness cues that stay honest when coverage is uneven, and editorial prioritization that helps readers understand where the strongest signals are.

**Research notes:** coverage should expand in a deliberate batch, not as shallow all-50 publication. The milestone should strengthen the data contract while adding states.

### Comparison and Cluster Surfaces

**Table stakes:** readers can browse by legislative status, proposal type, and region without losing the canonical state detail path.

**Differentiators:** comparison pages that explain patterns and tradeoffs rather than just rendering sortable tables.

**Research notes:** the product should favor narrative comparison and explicit definitions over dashboard density. Readers need help understanding why a grouping matters, not just that it exists.

### Refresh Workflow

**Table stakes:** maintainers can identify stale entries and queue refresh work through repo-owned workflow.

**Differentiators:** reader-facing freshness cues that make uneven review cadence legible without overstating precision.

**Research notes:** refresh automation should produce auditable queues or reports, not live claims or silent status rewrites.

## Anti-Features

| Feature | Why It Looks Tempting | Why It Hurts This Milestone |
|---------|------------------------|-----------------------------|
| Live tracker promises | Feels more current | breaks the trust model and creates unverifiable freshness claims |
| All-state leaderboard UI | Feels data-rich | overwhelms the editorial thesis and hides source quality differences |
| Full visual-system rewrite | Feels like polish | burns time without advancing coverage, comparisons, or maintainability |
| Broad `mystic-ui` rollout | Feels modern | introduces styling and compatibility risk before the information model is settled |

## Recommended Milestone Scope

### Commit to v1.2

- Expand the publishable state batch beyond the first five entries.
- Add richer grouping inputs needed for cluster and comparison reading.
- Ship cluster/comparison surfaces that connect back to canonical state detail pages.
- Add repo-owned refresh queue support and consistent freshness cues.

### Defer

- Theme toggle
- Whole-site component restyle
- Full 50-state deep publication
- Live legislative ingestion

## Sources

- `.planning/PROJECT.md`
- `.planning/milestones/v1.0-REQUIREMENTS.md`
- `.planning/milestones/v1.1-REQUIREMENTS.md`

---
*Feature research for: v1.2 National Coverage, Comparison, and Refresh*
