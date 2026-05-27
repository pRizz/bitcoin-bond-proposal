# Bitcoin Bond Proposal

## What This Is

Bitcoin Bond Proposal is a shipped Illinois-first policy and research product. It combines canonical Markdown packet documents, repo-owned PDF outputs, a publishable state-registry core, and a dark-by-default editorial website that presents the thesis, methodology, Illinois packet, explainer, and state-by-state record surfaces as one coherent public product.

## Core Value

Produce a credible, reusable Illinois-first legislative package and research registry that makes Bitcoin reserve and bond policy understandable, sourceable, and practical enough for real state-level adoption.

## Current Milestone: v1.3 Deeper National Coverage

**Goal:** Expand beyond the current ten-state publication set by shipping as many additional state briefs as can pass the project's credibility, completeness, and freshness standards.

**Target features:**
- Publish a larger national state set selected by credible source availability and readiness rather than a fixed quota.
- Improve refresh and candidate prioritization so maintainers can decide which new states and stale evidence deserve attention first.
- Add selective catalog, detail, cluster, or comparison improvements only where expanded coverage needs better browsing, freshness cues, or side-by-side use.
- Preserve confidence, completeness, provenance, and dated-snapshot cues as hard publication gates.

## Current State

- Shipped `v1.0` on 2026-04-03.
- Shipped `v1.1` on 2026-04-04.
- Shipped `v1.2 National Coverage, Comparison, and Refresh` on 2026-04-12.
- Started `v1.3 Deeper National Coverage` on 2026-05-27.
- The registry now exposes ten published state records plus dedicated `/states/clusters`
  and `/states/compare` reading paths.
- Maintainers can generate a repo-owned refresh queue under `generated/refresh/`, and
  public registry surfaces now share explicit freshness cues without implying live
  tracking.
- Canonical packet documents now exist for:
  - Illinois one-pager
  - Illinois draft bill
  - methodology memo
  - first financing explainer
- Repo-owned PDF outputs remain derived from canonical Markdown.
- The public webapp now defaults to a warm dark editorial system with restrained Bitcoin-orange accents and route-level readability polish across:
  - thesis homepage
  - methodology page
  - Illinois packet route
  - financing explainer route
  - state catalog
  - ten published state-detail pages
- Source-level format and lint checks remain restored and enforced in pre-commit alongside the content/PDF trust contract.

## Requirements

### Validated

- ✓ Serious Illinois one-pager, draft bill, and methodology memo shipped in canonical Markdown plus PDFs — `v1.0`
- ✓ 50-state registry skeleton with first five publishable state entries shipped — `v1.0`
- ✓ Repo-owned Markdown-to-PDF publishing pipeline shipped — `v1.0`
- ✓ Thesis-led public site shell with packet, registry, methodology, and explainer surfaces shipped — `v1.0`
- ✓ Source-level format/lint guardrails restored and promoted into pre-commit — `v1.0`
- ✓ Public site defaults to a dark editorial shell across shipped routes — `v1.1`
- ✓ Restrained Bitcoin-orange emphasis now carries navigation, actions, proof surfaces, and key labels without drifting into hype styling — `v1.1`
- ✓ Desktop/mobile readability and interaction QA passed across homepage, methodology, packet, explainer, catalog, and state-detail surfaces — `v1.1`
- ✓ Reader can browse richer registry metadata by status, proposal type, and region through the canonical registry contract and `/states` surface — `Phase 10 / v1.2`
- ✓ Maintainer can distinguish refresh workflow artifacts from published canonical state content through the `generated/refresh/` boundary and supporting docs — `Phase 10 / v1.2`
- ✓ Reader can access an expanded ten-state publishable registry batch beyond the initial five records without weakening the source and freshness contract — `Phase 11 / v1.2`
- ✓ Reader can see calm confidence/completeness cues when coverage depth varies across states on the existing catalog and detail surfaces — `Phase 11 / v1.2`
- ✓ Reader can browse dedicated cluster views grouped by status, proposal type, and region under the existing states subtree — `Phase 12 / v1.2`
- ✓ Reader can use an editorial comparison surface with direct links back to canonical state detail pages — `Phase 12 / v1.2`
- ✓ Maintainer can generate a repo-owned refresh queue for published entries whose review dates or active legislative posture need attention — `Phase 13 / v1.2`
- ✓ Reader can see explicit freshness cues across catalog, grouped comparison surfaces, and state-detail pages — `Phase 13 / v1.2`

### Active

- [ ] Broaden publishable national coverage beyond the current ten-state registry by publishing every additional state record that clears credibility, completeness, and freshness gates during the milestone.
- [ ] Strengthen candidate readiness and refresh prioritization so maintainers can see which unpublished or stale states deserve attention first.
- [ ] Keep catalog, state-detail, cluster, and comparison surfaces understandable as the published state count grows.
- [ ] Record explicit deferral reasons for high-interest states that cannot be published credibly in this milestone.

### Out of Scope

- User accounts or community features — still not needed for the legislative and public education product.
- Real-time legislative tracking automation — snapshot-based research remains more credible than pseudo-live status claims.
- Municipal or non-state proposal coverage — future milestones should broaden state coverage first.
- Database-first architecture or admin UI — repo-tracked content still fits the editorial model.
- Broad visual-system rewrites or wholesale `mystic-ui` adoption — defer unless a specific comparison or refresh surface proves the editorial value clearly.
- Lowering source, confidence, or freshness standards to increase the state count — credibility remains more important than coverage volume.
- Full 50-state deep publication as a required v1.3 outcome — publish as many states as are credible, but do not force low-evidence entries into the public set.

## Follow-On Goals

- Complete any remaining 50-state deep coverage after v1.3 once source availability and workflow throughput justify it.
- Revisit selective `mystic-ui` or theme upgrades only after expanded coverage reveals concrete comparison or proof-surface needs.
- Consider more structured intake tooling after the repo-owned queue and publication workflow have proven their shape.

## Context

- The project serves a mixed audience:
  - legislators, legislative staff, and policy advocates who need serious reference documents;
  - a broader public audience that needs a professional explanation of why Bitcoin reserves and Bitcoin-backed bonds may be rational state policy.
- The desired tone remains hybrid:
  - clearly Bitcoin-positive;
  - still rational, professional, neutral in structure, and assertive in argument.
- The public product now distinguishes clearly between:
  - normative packet surfaces;
  - descriptive registry surfaces;
  - methodology/trust surfaces;
  - explainer/argument surfaces.
- Current shipped stack:
  - Bun
  - TypeScript
  - SolidStart
  - Tailwind CSS v4
  - Playwright
  - Biome
- The next milestone builds on the existing canonical content and generated content graph surfaces:
  - `content/data/state-registry-manifest.json`
  - `content/states/*.md`
  - `src/lib/content/schema.ts`
  - `scripts/compile-content.ts`
  - `src/lib/site/content.ts`
  - `src/routes/(site)/states/*`

## Constraints

- **Delivery shape**: Canonical Markdown plus repo-owned derived artifacts remains the core publishing model.
- **Audience**: Mixed public and policy audiences remain the primary design constraint.
- **Trust model**: Official legislative sources remain the anchor for publishable state entries.
- **Freshness**: Snapshot-based research with visible dates remains preferable to implied real-time certainty.
- **Coverage count**: v1.3 optimizes for the maximum credible published batch, not a predetermined state quota.
- **Architecture**: The site should stay close to the content-first research pattern unless future milestones create clear pressure to change it.
- **Workflow**: The repository should continue to enforce source-level and content/PDF guardrails through repo-owned automation.
- **Comparisons**: Cluster and comparison pages must explain, not gamify, the legislative landscape.
- **UI scope**: Theme and component experimentation stays secondary to coverage, comparison clarity, and refresh operability.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Serve a mixed audience with legislators as the seriousness anchor | The documents need to work in actual policy conversations while the site educates the broader public | ✓ Implemented across packet, site, and registry |
| Use a hybrid tone: Bitcoin-positive, professional, rational, and assertive | The project should advocate without sounding unserious or conspiratorial | ✓ Implemented in packet, explainer, and shell copy |
| Make Illinois the first model package | A concrete state target keeps v1 grounded and reusable for later states | ✓ Shipped as the flagship packet and public packet route |
| Scope v1 research to state-level reserve and bond bills or enacted laws only | Narrow scope keeps the first catalog auditable and finishable | ✓ Shipped with a five-record state batch |
| Use official legislative sources as primary authority | State policy claims need an auditable, defensible sourcing standard | ✓ Encoded in methodology and registry content |
| Treat v1 freshness as dated snapshots, not live tracking | Manual freshness is more trustworthy and achievable than pseudo-real-time automation | ✓ Shipped with `status as of` and `last reviewed` fields |
| Start with document system + PDF pipeline + minimal site shell before a richer public site | The legislative packet is the substance; the site should grow from that foundation | ✓ Shipped in milestone order from packet system to public shell |
| Use the `free-the-world` research-registry prompt as architectural inspiration, not a rigid clone | The pattern is valuable, but this domain has different subjects, workflows, and assets | ✓ Adapted into a policy-oriented shell with packet + explainer + registry surfaces |
| Keep packet and registry surfaces distinct | The normative Illinois model and the descriptive legislative record must not be conflated | ✓ Implemented in Phase 6 |
| Promote restored format/lint checks into pre-commit only once trustworthy | Tooling guardrails should help, not add noise | ✓ Implemented in Phase 7 |
| Make the webapp dark by default in v1.1 | The next milestone is a focused editorial visual refactor rather than a capability expansion | ✓ Implemented in Phases 8-9 |
| Preserve route structure while improving dark-mode readability and interaction clarity | The visual refactor should clarify the reading path, not redesign the product | ✓ Implemented in Phase 9 |
| Make broader coverage, comparison, and refresh the v1.2 driver | The next leverage point is research utility and maintainability, not another shell-only polish cycle | ✓ Implemented across Phases 10-13 |
| Use shared freshness thresholds for both public trust cues and maintainer refresh workflow | The public site and refresh queue should agree on what counts as current versus review-due | ✓ Implemented in Phase 13 |
| Keep `mystic-ui` as selective backlog support instead of milestone scope | UI experimentation should follow proven information needs and Tailwind v4 compatibility | — Pending |
| Make v1.3 throughput-driven but gate-limited | The user wants as many publishable states as can be credibly finished, while preserving the trust contract over raw count | — Pending |

<details>
<summary>Archived v1.2 milestone framing</summary>

Previous current milestone: **v1.2 National Coverage, Comparison, and Refresh**

Goal:
- turn the Illinois-first product into a broader national research surface that can compare states credibly and stay fresh without pretending to be live

Target features:
- broader publishable national coverage beyond the initial five state entries
- cluster and comparison surfaces for status, proposal type, and regional pattern reading
- repo-owned refresh queue and freshness cues across registry surfaces
- only selective UI experimentation when it directly strengthens comprehension or trust

</details>

<details>
<summary>Archived v1.1 milestone framing</summary>

Previous current milestone: **v1.1 Dark Mode Editorial Refactor**

Goal:
- refactor the public webapp into a dark-by-default editorial product with subtle Bitcoin-orange accents
- preserve route-level readability and trust

Target features:
- dark mode as the default visual system across all shipped public routes
- restrained Bitcoin-orange accent treatment for action, emphasis, and navigation
- route-by-route readability and contrast polish across thesis, methodology, packet, explainer, catalog, and state surfaces

</details>

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-27 after v1.3 milestone kickoff*
