# Roadmap: Bitcoin Bond Proposal

## Milestones

- ✅ **v1.0 Illinois-first MVP** — shipped 2026-04-03. See [v1.0 roadmap archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-ROADMAP.md), [v1.0 requirements archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-REQUIREMENTS.md), and [v1.0 audit archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.0-MILESTONE-AUDIT.md).
- ✅ **v1.1 Dark Mode Editorial Refactor** — shipped 2026-04-04. See [v1.1 roadmap archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-ROADMAP.md), [v1.1 requirements archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-REQUIREMENTS.md), and [v1.1 audit archive](/Users/peterryszkiewicz/.codex/worktrees/8fd7/bitcoin-bond-proposal/.planning/milestones/v1.1-MILESTONE-AUDIT.md).
- ✅ **v1.2 National Coverage, Comparison, and Refresh** — shipped 2026-04-12. See [v1.2 roadmap archive](/Users/peterryszkiewicz/Repos/bitcoin-bond-proposal/.planning/milestones/v1.2-ROADMAP.md), [v1.2 requirements archive](/Users/peterryszkiewicz/Repos/bitcoin-bond-proposal/.planning/milestones/v1.2-REQUIREMENTS.md), and [v1.2 audit archive](/Users/peterryszkiewicz/Repos/bitcoin-bond-proposal/.planning/milestones/v1.2-MILESTONE-AUDIT.md).
- **v1.3 Deeper National Coverage** — active, started 2026-05-27. Expands beyond the current ten-state set by publishing as many additional states as pass credibility, completeness, and freshness gates.

## Phases

<details>
<summary>✅ v1.0 Illinois-first MVP (Phases 1-7) — SHIPPED 2026-04-03</summary>

- [x] Phase 1: Foundation and Trust Contracts (4/4 plans) — completed 2026-04-03
- [x] Phase 2: Illinois Flagship Package (3/3 plans) — completed 2026-04-03
- [x] Phase 3: Research Registry Core (3/3 plans) — completed 2026-04-03
- [x] Phase 4: Public Site Shell (3/3 plans) — completed 2026-04-03
- [x] Phase 5: Editorial Polish and Explainers (3/3 plans) — completed 2026-04-03
- [x] Phase 6: Public Packet Access and Illinois Model Separation (2/2 plans) — completed 2026-04-03
- [x] Phase 7: Tooling Guardrail Cleanup (2/2 plans) — completed 2026-04-03

</details>

<details>
<summary>✅ v1.1 Dark Mode Editorial Refactor (Phases 8-9) — SHIPPED 2026-04-04</summary>

- [x] Phase 8: Dark Theme Foundation (2/2 plans) — completed 2026-04-04
- [x] Phase 9: Route Polish and Readability QA (2/2 plans) — completed 2026-04-04

</details>

<details>
<summary>✅ v1.2 National Coverage, Comparison, and Refresh (Phases 10-13) — SHIPPED 2026-04-12</summary>

- [x] Phase 10: Coverage Expansion Contract and Data Shape (2/2 plans) — completed 2026-04-11
- [x] Phase 11: Broader National Publication Batch (2/2 plans) — completed 2026-04-11
- [x] Phase 12: Cluster and Comparison Surfaces (2/2 plans) — completed 2026-04-11
- [x] Phase 13: Refresh Workflow and Freshness QA (2/2 plans) — completed 2026-04-11

</details>

### v1.3 Deeper National Coverage (Phases 14-17) — ACTIVE

- [x] Phase 14: Candidate Priority and Refresh Intake (3 plans) — completed 2026-05-27
- [x] Phase 15: First Expansion Publication Wave (3 plans) — completed 2026-06-01
- [ ] Phase 16: Throughput Expansion and Deferral Ledger (0 plans) — pending Phase 15
- [ ] Phase 17: Expanded Surface QA and Closeout Prep (0 plans) — pending Phase 16

### Phase 14: Candidate Priority and Refresh Intake

**Goal:** Extend the repo-owned queue workflow so maintainers can choose the next state work from both stale published records and unpublished candidate readiness.  
**Depends on:** Phase 13  
**Requirements:** CATA-10, CATA-11, REFR-04, REFR-06  
**Plans:** 3/3 plans complete

Plans:
- [x] 14-01-PLAN.md — Define candidate intake schema, seed controlled candidate data, and document the non-public content boundary.
- [x] 14-02-PLAN.md — Build pure candidate classification, sorting, freshness-risk, and combined priority models with unit tests.
- [x] 14-03-PLAN.md — Extend `bun run refresh:queue` to write combined priority artifacts under `generated/refresh/` while preserving existing refresh outputs.

**Success criteria:**
1. Maintainer can generate or read a dated priority artifact that includes stale published records and unpublished candidate states.
2. Each unpublished candidate can be classified by source availability, proposal relevance, readiness, and next action without creating an unverified public state page.
3. Refresh and candidate-priority outputs remain under `generated/refresh/` with clear generated-artifact boundaries.
4. The workflow gives a concrete first publication queue for Phase 15.

### Phase 15: First Expansion Publication Wave

**Goal:** Publish the first high-readiness v1.3 state batch and prove the publication path still validates cleanly at expanded scale.  
**Depends on:** Phase 14  
**Requirements:** CATA-14, CATA-15, REFR-05  
**Plans:** 3/3 plans complete

Plans:
- [x] 15-01-PLAN.md — Publish Florida, Kansas, and North Dakota terminal official-source records.
- [x] 15-02-PLAN.md — Publish Ohio active committee and Utah broader enacted digital-asset records.
- [x] 15-03-PLAN.md — Clean candidate intake, regenerate content/refresh artifacts, and run full publication verification.

**Success criteria:**
1. Newly authored state records include official primary sources, status dates, review dates, proposal classification, confidence cues, and policy-effect summaries.
2. Any active or review-due existing records that block publication or comparison work are refreshed before lower-risk expansion proceeds.
3. Manifest updates, content validation, and content compilation succeed without route-specific exceptions.
4. New state-detail pages render from the same canonical content path as the existing ten records.

### Phase 16: Throughput Expansion and Deferral Ledger

**Goal:** Continue publishing credible candidates until the milestone's source-quality gates become the limiting factor, then record why remaining high-interest states were deferred.  
**Depends on:** Phase 15  
**Requirements:** CATA-12, CATA-13  
**Plans:** 1/2 plans executed

Plans:
- [ ] TBD

**Success criteria:**
1. The published registry grows beyond the Phase 15 batch with every additional state passing the same source, schema, confidence, and dated-snapshot contract.
2. Candidate states that cannot be published credibly have explicit deferral reasons recorded outside public state-entry content.
3. The final v1.3 publication count is driven by verified source availability and editorial completeness rather than an arbitrary quota.
4. The shipped state list and deferred candidate list are ready for final surface QA and milestone closeout.

### Phase 17: Expanded Surface QA and Closeout Prep

**Goal:** Make the expanded registry easy to scan, compare, and verify across public surfaces, then record final coverage and evidence for milestone closeout.  
**Depends on:** Phase 16  
**Requirements:** SITE-10, SITE-11, SITE-12, QA-01, QA-02  
**Plans:** 0 plans

Plans:
- [ ] TBD

**Success criteria:**
1. `/states` remains scannable at the expanded published count with confidence, completeness, freshness, status, proposal-type, and region cues intact.
2. `/states/clusters` and `/states/compare` reflect the expanded registry without stale grouping copy, broken links, or unclear drill-down paths.
3. New and existing state-detail pages expose consistent provenance, status, freshness, and comparison context.
4. Verification covers content validation, content compilation, refresh/candidate generation, TypeScript, build, tests, and targeted browser checks.
5. Closeout records the newly published state count, shipped states, deferred candidates, and verification evidence.

## Backlog

### Phase 999.1: Selective mystic-ui adoption across the public webapp (BACKLOG)

**Goal:** Evaluate and selectively adopt [`mystic-ui`](https://github.com/pRizz/mystic-ui) across the public SolidStart webapp where it materially improves the editorial product without compromising Tailwind CSS v4 compatibility, dark-theme coherence, performance, or trust cues.
**Requirements:** Validate the library's SolidStart and Tailwind CSS v4 fit first; preserve the current dark editorial token system and route structure; favor high-signal surfaces such as hero treatment, motion accents, proof panels, navigation accents, and state/catalog cards over a wholesale component rewrite.
**Plans:** 0 plans

Plans:
- [ ] TBD (promote with /gsd-review-backlog when ready)
