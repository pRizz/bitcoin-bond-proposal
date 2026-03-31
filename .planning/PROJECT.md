# Bitcoin Bond Proposal

## What This Is

Bitcoin Bond Proposal is a content-first policy and research project for building a serious legislative package around state Bitcoin treasury reserves and Bitcoin-backed bonds, starting with Illinois. It begins as a Markdown-driven document system with PDF outputs, a research registry of relevant state legislation, and a minimal static website shell that makes the case legible to both legislators and the public. The long-term product is a professional, thesis-driven public site modeled loosely on the `free-the-world` research-registry pattern, but adapted to legislative templates, state-by-state policy tracking, and explainer-heavy public education.

## Core Value

Produce a credible, reusable Illinois-first legislative package and research registry that makes Bitcoin reserve and bond policy understandable, sourceable, and practical enough for real state-level adoption.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Create an Illinois one-page summary that legislators and staff can reference quickly.
- [ ] Create an Illinois draft bill document that can serve as a serious first-pass model for state legislative language.
- [ ] Create a methodology memo that explains source hierarchy, freshness rules, interpretive stance, and publication criteria for state research entries.
- [ ] Create a 50-state research catalog skeleton for reserve and bond legislation, with 3-5 fully researched state entries in v1.
- [ ] Create a Markdown-to-PDF pipeline enforced through a pre-commit hook so the core documents stay publishable as PDFs.
- [ ] Create a minimal static site shell that presents the thesis, the initial Illinois package, the research catalog, and a clear path to deeper explainers and infographics.

### Out of Scope

- User accounts or community features — not needed for the initial legislative and public education product.
- Real-time legislative tracking automation — v1 will use explicit snapshot dates and manual refreshes to preserve trust and simplicity.
- Municipal or non-state proposals — v1 focuses only on state-level reserve and bond bills and enacted laws.
- Database-first architecture or admin UI — repo-tracked content is the default until maintenance pressure proves otherwise.
- A fully built infographic library or complete 50-state deep research set — v1 needs a strong shell and exemplar entries, not total coverage.

## Context

- The project serves a mixed audience:
  - legislators, legislative staff, and policy advocates who need serious reference documents;
  - a broader public audience that needs a professional explanation of why Bitcoin reserves and Bitcoin-backed bonds may be rational state policy.
- The desired tone is hybrid:
  - clearly Bitcoin-positive;
  - still rational, professional, neutral in structure, and assertive in argument.
- The core thesis is three-part:
  - states should consider holding Bitcoin as a reserve asset;
  - states should consider issuing Bitcoin-backed bonds;
  - Illinois should become the first model legislative package that other states can adapt.
- The user wants the site to align generally with the `free-the-world` research-registry approach:
  - thesis-driven presentation;
  - professional editorial voice;
  - structured source trails;
  - catalog, detail, methodology, and explainer surfaces;
  - flexibility where the pattern does not cleanly fit this policy domain.
- Research scope for v1 is intentionally narrow:
  - only state-level reserve and bond bills or enacted laws;
  - no pensions, treasurer actions, municipal efforts, or general public statements unless later expanded.
- The research catalog should treat "Bitcoin-backed bond" broadly at intake, then distinguish between:
  - reserve-financing bonds;
  - bitcoin-collateralized or bitcoin-linked bonds.
- A state research entry is publishable only when it includes:
  - state;
  - proposal type;
  - bill or law identifier;
  - chamber;
  - sponsors;
  - current status;
  - last action date;
  - plain-English summary;
  - explanation of what the proposal would actually do;
  - primary source links;
  - secondary context where useful;
  - an editorial confidence or completeness note.
- Source hierarchy should default to:
  - primary: official legislature pages, bill text, fiscal notes, committee materials, official state releases;
  - secondary: reputable reporting, policy analysis, legal commentary;
  - tertiary: advocacy or social summaries only as leads, not as authority.
- Freshness in v1 should be explicit snapshot-based research with visible `last reviewed` and `status as of` dates, while preserving room for future refresh automation.
- The project should carry clear caution language from the start:
  - policy analysis only, not legal or investment advice;
  - draft language is illustrative and requires licensed legal review;
  - legislative status changes quickly;
  - official bill text controls over summaries;
  - bond structures may require state-specific constitutional, budgetary, and securities analysis.
- The first meaningful operational use is to refine and hand over a serious Illinois packet, with the public website acting as the outward-facing explanation and research interface.
- Bright Builds requirements have already been adopted in this repository and should remain part of the repo’s working contract.

## Constraints

- **Delivery shape**: Start with Markdown documents, PDF outputs, and repo-tracked research artifacts — this keeps v1 auditable, easy to version, and easy to hand to legislators.
- **Audience**: Mixed public and policy audiences — documents must stay serious enough for legislative use while the site stays understandable to non-specialists.
- **Trust model**: Official legislative sources must anchor all published state entries — reputational risk is too high for casual sourcing.
- **Freshness**: v1 should publish dated snapshots, not implied real-time accuracy — legislative status can change too quickly to fake live certainty.
- **Architecture**: The final site should stay close to the `free-the-world` content-first static research pattern unless later requirements prove otherwise.
- **Scope**: Illinois is first, but the product structure must scale into a 50-state catalog without a rewrite.
- **Workflow**: The core documents must compile to PDF through a pre-commit-enforced pipeline so the repository always contains presentation-ready artifacts.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Serve a mixed audience with legislators as the seriousness anchor | The documents need to work in actual policy conversations while the site educates the broader public | — Pending |
| Use a hybrid tone: Bitcoin-positive, professional, rational, and assertive | The project should advocate without sounding unserious or conspiratorial | — Pending |
| Make Illinois the first model package | A concrete state target keeps v1 grounded and reusable for later states | — Pending |
| Scope v1 research to state-level reserve and bond bills or enacted laws only | Narrow scope keeps the first catalog auditable and finishable | — Pending |
| Use official legislative sources as primary authority | State policy claims need an auditable, defensible sourcing standard | — Pending |
| Treat v1 freshness as dated snapshots, not live tracking | Manual freshness is more trustworthy and achievable than pseudo-real-time automation | — Pending |
| Start with document system + PDF pipeline + minimal site shell before a richer public site | The legislative packet is the substance; the site should grow from that foundation | — Pending |
| Use the `free-the-world` research-registry prompt as architectural inspiration, not a rigid clone | The pattern is valuable, but this domain has different subjects, workflows, and assets | — Pending |

---
*Last updated: 2026-03-31 after initialization*
