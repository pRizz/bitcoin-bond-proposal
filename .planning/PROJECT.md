# Bitcoin Bond Proposal

## What This Is

Bitcoin Bond Proposal is a shipped Illinois-first policy and research product with canonical Markdown packet documents, repo-owned PDF outputs, a publishable state-registry core, and a public editorial website. The next milestone focuses on refactoring that web product into a dark-by-default editorial experience with restrained Bitcoin-orange accents, while preserving the seriousness, readability, and trust cues established in v1.0.

## Core Value

Produce a credible, reusable Illinois-first legislative package and research registry that makes Bitcoin reserve and bond policy understandable, sourceable, and practical enough for real state-level adoption.

## Current State

- Shipped `v1.0` on 2026-04-03.
- Canonical packet documents exist for:
  - Illinois one-pager
  - Illinois draft bill
  - methodology memo
  - first financing explainer
- Public site surfaces include:
  - thesis homepage
  - methodology page
  - Illinois packet route
  - financing explainer route
  - state catalog
  - five published state-detail pages
- Source-level format and lint checks are restored and enforced in pre-commit alongside the content/PDF trust contract.

## Current Milestone: v1.1 Dark Mode Editorial Refactor

**Goal:** Refactor the public webapp into a dark-by-default editorial product with subtle Bitcoin-orange accents while preserving route-level readability and trust.

**Target features:**
- dark mode as the default visual system across all shipped public routes
- restrained Bitcoin-orange accent treatment for action, emphasis, and navigation
- route-by-route readability and contrast polish across thesis, methodology, packet, explainer, catalog, and state surfaces

## Requirements

### Validated

- ✓ Serious Illinois one-pager, draft bill, and methodology memo shipped in canonical Markdown plus PDFs — `v1.0`
- ✓ 50-state registry skeleton with first five publishable state entries shipped — `v1.0`
- ✓ Repo-owned Markdown-to-PDF publishing pipeline shipped — `v1.0`
- ✓ Thesis-led public site shell with packet, registry, methodology, and explainer surfaces shipped — `v1.0`
- ✓ Source-level format/lint guardrails restored and promoted into pre-commit — `v1.0`

### Active

- [ ] Make the public webapp dark mode by default.
- [ ] Introduce subtle Bitcoin-orange accents without making the site feel loud or hype-driven.
- [ ] Preserve readability, information hierarchy, and trust cues across all shipped public routes.
- [ ] Eliminate route-level visual regressions on desktop and mobile during the dark-theme refactor.

### Out of Scope

- User accounts or community features — still not needed for the legislative and public education product.
- Real-time legislative tracking automation — snapshot-based research remains more credible than pseudo-live status claims.
- Municipal or non-state proposal coverage — future milestones should broaden state coverage first.
- Database-first architecture or admin UI — repo-tracked content still fits the editorial model.
- Light/dark theme toggle in this milestone — the milestone is about establishing a strong dark default, not theme switching UX.
- Packet PDF redesign — this milestone targets the webapp visual system, not print layouts.

## Next Milestone Goals

- Establish a dark-first token and shell system with restrained Bitcoin-orange emphasis.
- Apply and polish that system across homepage, methodology, packet, explainer, catalog, and state-detail routes.
- Preserve the editorial trust model while making the site feel more intentional and atmospheric in dark mode.

## Context

- The project serves a mixed audience:
  - legislators, legislative staff, and policy advocates who need serious reference documents
  - a broader public audience that needs a professional explanation of why Bitcoin reserves and Bitcoin-backed bonds may be rational state policy
- The desired tone remains hybrid:
  - clearly Bitcoin-positive
  - still rational, professional, neutral in structure, and assertive in argument
- The public product currently distinguishes clearly between:
  - normative packet surfaces
  - descriptive registry surfaces
  - methodology/trust surfaces
  - explainer/argument surfaces
- Current shipped stack:
  - Bun
  - TypeScript
  - SolidStart
  - Tailwind CSS v4
  - Playwright
  - Biome

## Constraints

- **Delivery shape**: Canonical Markdown plus repo-owned derived artifacts remains the core publishing model.
- **Audience**: Mixed public and policy audiences remain the primary design constraint.
- **Trust model**: Official legislative sources remain the anchor for publishable state entries.
- **Freshness**: Snapshot-based research with visible dates remains preferable to implied real-time certainty.
- **Architecture**: The site should stay close to the content-first research pattern unless future milestones create clear pressure to change it.
- **Workflow**: The repository should continue to enforce source-level and content/PDF guardrails through repo-owned automation.
- **Milestone scope**: v1.1 is a visual refactor of existing web surfaces, not a new feature-expansion milestone.

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
| Make the webapp dark by default in v1.1 | The next milestone is a focused editorial visual refactor rather than a capability expansion | — Active for v1.1 |

---
*Last updated: 2026-04-04 after starting v1.1 milestone*
