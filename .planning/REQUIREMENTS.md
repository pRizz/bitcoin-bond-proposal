# Requirements: Bitcoin Bond Proposal

**Defined:** 2026-04-11
**Core Value:** Produce a credible, reusable Illinois-first legislative package and research registry that makes Bitcoin reserve and bond policy understandable, sourceable, and practical enough for real state-level adoption.

## v1.2 Requirements

### Coverage Expansion

- [x] **CATA-07**: Reader can access an expanded batch of publishable state entries beyond the first five, each meeting the existing source and freshness contract.
- [x] **CATA-08**: Reader can browse richer registry metadata that supports grouping entries by status, proposal type, and region.
- [x] **CATA-09**: Reader can see confidence or completeness cues when coverage depth varies across states.

### Comparison and Cluster Surfaces

- [x] **SITE-07**: Reader can browse cluster views grouped by legislative status, proposal type, or region.
- [x] **SITE-08**: Reader can compare states through editorial comparison surfaces that explain meaningful differences without requiring raw bill reading.
- [x] **SITE-09**: Reader can move from cluster or comparison surfaces into the canonical state detail page without losing context.

### Refresh Workflow

- [x] **REFR-01**: Maintainer can generate a repo-owned refresh queue for entries whose review dates or legislative status need attention.
- [x] **REFR-02**: Maintainer can distinguish refresh workflow artifacts from published canonical state content.
- [x] **REFR-03**: Reader can see visible freshness cues across catalog, comparison, and state-detail surfaces.

## Future Requirements

### Visual Follow-On

- **THEME-06**: Reader can choose a theme toggle without losing editorial coherence.
- **UI-01**: Reader can benefit from selective `mystic-ui` motion or hierarchy upgrades only where they materially improve comparison or proof surfaces.

### Longer-Horizon Coverage

- **CATA-10**: Reader can access deep publishable coverage across the full 50-state registry.
- **AUTO-01**: Maintainer can use semi-automated intake signals to prioritize refresh work without creating pseudo-live public claims.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Live legislative tracking claims | Conflicts with the project's snapshot-based trust contract |
| Full visual-system rewrite | Does not advance the milestone's research utility directly |
| Broad `mystic-ui` migration | Adds compatibility and style risk before the information model is settled |
| Database-first ingestion or admin UI | Repo-tracked canonical content still fits the editorial workflow |
| Municipal or non-state expansion | Broader state coverage remains the higher-leverage next step |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CATA-07 | Phase 11 | Complete |
| CATA-08 | Phase 10 | Complete |
| CATA-09 | Phase 11 | Complete |
| SITE-07 | Phase 12 | Complete |
| SITE-08 | Phase 12 | Complete |
| SITE-09 | Phase 12 | Complete |
| REFR-01 | Phase 13 | Complete |
| REFR-02 | Phase 10 | Complete |
| REFR-03 | Phase 13 | Complete |

**Coverage:**
- v1.2 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-11*
*Last updated: 2026-04-11 after Phase 12 completion*
