# Project Research Summary

**Project:** Bitcoin Bond Proposal
**Milestone:** v1.2 National Coverage, Comparison, and Refresh
**Researched:** 2026-04-11
**Confidence:** HIGH

## Executive Summary

The next milestone should expand the project's research utility, not chase another broad visual rewrite. The existing Bun + TypeScript + SolidStart + Tailwind + Zod stack is already sufficient. The right architecture move is to extend the canonical registry contract, derive comparison- and freshness-ready data in the content graph, then build cluster/comparison routes and a repo-owned refresh queue on top of that contract.

## Key Findings

### Stack additions

- No new core framework is needed.
- Prefer small repo-owned TypeScript helpers and scripts over new dependencies.
- Treat broad `mystic-ui` adoption as deferred support work, not as milestone scope.

### Feature table stakes

- broader publishable state coverage
- cluster and comparison reading paths by status, type, and region
- refresh workflow support for maintainers
- visible freshness cues for readers across registry surfaces

### Watch Out For

- comparison logic that is not derived from canonical data
- stale or inconsistent freshness cues across surfaces
- shallow nationwide sprawl that weakens credibility
- UI experimentation overtaking the milestone's information goals

## Roadmap Implications

- Start by strengthening the data contract and generated graph.
- Publish the next research batch under that stronger contract.
- Build cluster and comparison surfaces on the richer graph.
- Finish with refresh workflow and freshness QA.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing stack and repo layout already support the milestone well |
| Features | HIGH | The target features follow directly from archived milestone seeds and current project goals |
| Architecture | HIGH | The content-first graph pattern cleanly supports comparison and refresh work |
| Pitfalls | HIGH | The main risks are scope drift and trust-contract erosion, not technical uncertainty |

---
*Research completed: 2026-04-11*
*Ready for roadmap: yes*
