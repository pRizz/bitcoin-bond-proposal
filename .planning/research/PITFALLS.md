# Pitfalls Research

**Domain:** State Bitcoin reserve and bond policy package plus public research site
**Researched:** 2026-03-31
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Overclaiming Legislative Status

**What goes wrong:**
The site speaks about bills as if they are enacted, current, or stronger than the latest official action supports.

**Why it happens:**
Policy trackers often collapse introduced text, committee action, and enacted law into one story line.

**How to avoid:**
Require `current status`, `last action date`, `status as of`, and a primary legislative source before publish.

**Warning signs:**
Summaries use verbs like “creates” or “authorizes” without making clear whether the bill passed.

**Phase to address:**
Phase 1 and Phase 3.

---

### Pitfall 2: Blurring Reserve and Bond Concepts

**What goes wrong:**
The product treats a reserve bill, a bond issuance, a collateralized bond, and a bitcoin-linked financing structure as the same thing.

**Why it happens:**
The public discourse around Bitcoin public finance is still immature and category boundaries are not stable.

**How to avoid:**
Define a clear taxonomy early, keep `reserve` and `bond` as separate first-class fields, and explain subtype on every affected page.

**Warning signs:**
One entry says “Bitcoin-backed bond” without describing proceeds, collateral, repayment, or state risk.

**Phase to address:**
Phase 1 and Phase 2.

---

### Pitfall 3: Publishing Advocacy Without Enough Source Discipline

**What goes wrong:**
The project sounds confident but is supported by thin sourcing or promotional summaries.

**Why it happens:**
Bitcoin-positive projects often optimize for conviction before proving the factual layer.

**How to avoid:**
Separate fact, interpretation, and argument in the content model. Make official sources the floor and label incomplete entries honestly.

**Warning signs:**
A page has strong conclusions but only news articles or social posts as references.

**Phase to address:**
Phase 2 and Phase 3.

---

### Pitfall 4: Letting the Website Drift from the Legislative Packet

**What goes wrong:**
The one-pager, bill draft, and public site start telling slightly different stories or use inconsistent terminology.

**Why it happens:**
Teams often treat website copy and document copy as separate writing streams.

**How to avoid:**
Use canonical Markdown sources, shared terminology, and a generated content graph that feeds both public pages and PDF outputs.

**Warning signs:**
The website says “reserve asset,” while the bill draft and memo use different definitions or constraints.

**Phase to address:**
Phase 1 through Phase 4.

---

### Pitfall 5: Trying to Finish All 50 States Deeply in v1

**What goes wrong:**
The project spends all its energy on shallow nationwide coverage and never finishes the Illinois model package or a trustworthy exemplar set.

**Why it happens:**
Registry products create pressure to cover everything before they are strong anywhere.

**How to avoid:**
Make the 50-state skeleton structural, but limit deep v1 publication to 3-5 exemplar entries plus Illinois-first artifacts.

**Warning signs:**
The backlog grows faster than the quality bar can be maintained.

**Phase to address:**
Phase 2 and Phase 3.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Free-form state metadata | Fast authoring | Broken filters, inconsistent pages, painful refreshes | Never for canonical publishable entries |
| Separate PDF-only source files | Quick document styling | Guaranteed drift from website and research records | Never if the content is supposed to stay aligned |
| Copy-paste legislative summaries from third parties | Faster initial catalog growth | Reputational damage and source confusion | Acceptable only as temporary intake notes, not published content |
| Implicit freshness with no dates | Cleaner-looking pages | Readers assume a precision the project does not have | Never |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Legislature sites | Treating search snippets as final truth | Follow through to the official bill page, history, text, or agency release |
| PDF build lane | Relying on unstated workstation setup | Document the renderer path and make it part of repo setup |
| Static route generation | Parsing raw content inside pages | Compile once and have routes read generated artifacts |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Runtime Markdown parsing per route | Slow builds or route logic clutter | Precompile content graph | Breaks once content types multiply |
| Giant all-state pages with every detail inline | Heavy pages and unreadable UX | Keep catalog concise and push detail to dedicated pages | Breaks as soon as state coverage grows |
| Overbuilt charts before the data model settles | Constant redesign and rewrite churn | Lock the schema and narrative first, then visualize | Breaks during the first serious content expansion |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Treating generated PDFs as user-editable source | Silent divergence and accidental misinformation | Regenerate from canonical Markdown only |
| Publishing unverifiable donation or treasury wallet details without process | Credibility and operational risk | Keep custody and wallet claims tightly sourced and reviewed |
| Loose ingestion of external markdown or HTML | Content injection or broken builds | Validate and sanitize at the boundary |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Overly technical Bitcoin jargon on public pages | Normal readers bounce immediately | Lead with plain-English explanations and reserve deeper detail below |
| Legislative prose without translation | Public readers cannot tell what a bill does | Add “what this would actually do” summaries |
| Dashboard-style clutter | The thesis gets lost in tables and controls | Use editorial sections, restrained filters, and clear hierarchy |

## "Looks Done But Isn't" Checklist

- [ ] **State entry:** Missing `status as of` or `last reviewed` — verify both are present and visible.
- [ ] **Bill summary:** Missing plain-English operational effect — verify the page explains what changes in practice.
- [ ] **PDF artifact:** Generated once locally but not reproducible — verify build instructions and hook path work from a fresh checkout.
- [ ] **Homepage infographic:** Visually polished but not numerically sourced — verify each headline metric has an auditable source.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Overclaimed status | MEDIUM | Correct the page, update freshness metadata, note the official source, review similar entries |
| Taxonomy confusion | MEDIUM | Freeze new publication, normalize existing entries, add explicit subtype rules |
| Packet/site drift | HIGH | Reconcile canonical sources, regenerate all derived outputs, and lock the authoring path |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Overclaiming legislative status | Phase 1 | Schema requires status fields and dated source metadata |
| Reserve/bond category blur | Phase 1 | Taxonomy is explicit in docs, schemas, and UI |
| Weak source discipline | Phase 2 | Each exemplar state entry has primary sources before publish |
| Packet/site drift | Phase 2 and Phase 4 | PDFs and site pages are generated from canonical content |
| 50-state sprawl | Phase 3 | Roadmap keeps exemplar depth ahead of total coverage |

## Sources

- [Texas SB 21 history](https://capitol.texas.gov/billlookup/History.aspx?Bill=SB21&LegSess=89R)
- [Illinois HB 1844](https://www.ilga.gov/legislation/104/HB/10400HB1844.htm)
- [Arizona SB 1025](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm)
- [Missouri HB 1217](https://house.mo.gov/BillContent.aspx?bill=HB1217&code=R&year=2025)
- [Oklahoma HB 1203 vote and summary materials](https://www.oklegislature.gov/cf/2025-26%20SUPPORT%20DOCUMENTS/votes/Senate/HB1203_VOTES.HTM)
- [NH BFA Bitcoin-backed municipal bond](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/)

---
*Pitfalls research for: state Bitcoin reserve and bond policy registry*
*Researched: 2026-03-31*
