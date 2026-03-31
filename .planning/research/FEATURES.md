# Feature Research

**Domain:** State Bitcoin reserve and bond legislative research registry and public policy site
**Researched:** 2026-03-31
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Thesis-led homepage | A public policy site needs to explain the claim before asking for trust | MEDIUM | Should lead with the Illinois model package, not generic crypto slogans |
| Methodology page | Readers need to understand source quality, freshness, and interpretation rules | LOW | Critical for trust with legislators, journalists, and skeptical readers |
| Downloadable legislator-facing documents | The project starts as an actual policy packet, not just a website | MEDIUM | One-pager, bill draft, and memo should all have PDF outputs |
| State catalog index | Readers need a way to browse the 50-state landscape without opening raw bill text | MEDIUM | Filters should start simple: state, reserve vs bond, status, enacted vs proposed |
| State detail pages with source trail | Legislative claims are not credible without citations and dates | MEDIUM | Every entry needs `status as of`, `last reviewed`, primary links, and a plain-English summary |
| Visible policy cautions | This domain carries legal, methodological, and investment-risk caveats | LOW | Must separate analysis from legal advice and note that official text controls |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Illinois-first model package | Gives the project a concrete flagship artifact rather than a generic registry | HIGH | Strongest differentiator if the bill draft and one-pager are serious enough to circulate |
| Reserve vs bond taxonomy | Clarifies a category that many casual summaries blur together | MEDIUM | The bond side is currently sparser, so the classification logic matters |
| “What this would actually do” summaries | Translates legislative text into understandable operational outcomes | MEDIUM | Valuable for both legislators and the public |
| Confidence and completeness metadata | Helps readers distinguish strong entries from partial research | LOW | Useful trust signal when the 50-state map is uneven |
| Infographic-forward explainer layer | Makes the thesis understandable to a broad audience without dumbing it down | HIGH | Should remain professional and restrained, not meme-heavy |
| Reusable content graph | Lets the same canonical records drive PDFs, website pages, and comparisons | MEDIUM | Prevents parallel data silos between docs and the site |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real-time legislative tracking in v1 | Sounds current and impressive | Easy to overclaim freshness and hard to validate reliably | Snapshot-based entries with visible review dates |
| Generic CMS/admin UI | Feels like a normal content project requirement | Adds workflow and auth complexity before the data contract is stable | Repo-tracked content and pull-request review |
| Auto-publish from raw legislative intake | Seems scalable | High risk of misclassification, stale status, and incorrect summaries | Queue -> review -> validate -> publish workflow |
| Dense dashboard UX | Feels “data rich” | Buries the thesis and confuses normal readers | Editorial layouts with strong hierarchy and limited filters |
| Over-broad scope into every digital-asset policy topic | Tempting because adjacent bills exist | Dilutes the reserve/bond thesis and slows v1 to a crawl | Keep v1 to state reserve and bond bills or enacted laws only |

## Feature Dependencies

```text
Methodology memo
    └──requires──> source hierarchy + freshness rules

State detail pages
    └──requires──> canonical state entry schema
                       └──requires──> validation pipeline

Catalog index
    └──requires──> normalized state manifests

PDF outputs
    └──requires──> canonical Markdown docs

Homepage infographics ──enhance──> thesis-led homepage

Bond explainers ──depend on──> clarified reserve vs bond taxonomy
```

### Dependency Notes

- **Methodology memo requires source and freshness rules:** the project cannot publish credible state summaries before defining how it judges sources and dates status.
- **State detail pages require a canonical schema:** the site and research docs should not hand-roll every state entry differently.
- **Catalog index requires normalized manifests:** filters and comparison views become fragile if status and type fields are free-form.
- **PDF outputs require canonical Markdown docs:** do not make the PDF the source of truth; make the Markdown canonical and PDFs derived.
- **Bond explainers depend on taxonomy clarity:** bond concepts are easier to misstate than reserve proposals, so classification comes first.

## MVP Definition

### Launch With (v1)

- [ ] Illinois one-page summary — core legislator-facing artifact
- [ ] Illinois first-pass bill draft — proves the project is serious about implementation, not just commentary
- [ ] Methodology memo — trust contract for the catalog and site
- [ ] 50-state skeleton manifest — scalable catalog shape
- [ ] 3-5 fully researched state entries — enough to prove the research workflow
- [ ] PDF build + pre-commit validation — keeps canonical docs publishable
- [ ] Thesis-led homepage — public front door
- [ ] Methodology page — public trust layer
- [ ] Catalog page — browseable registry surface
- [ ] State detail template — canonical public record view
- [ ] One explainer article — shows editorial depth beyond a registry

### Add After Validation (v1.x)

- [ ] Cluster pages by region, legislative status, or proposal type — add once the catalog has enough density
- [ ] Comparison pages for reserve vs bond structures — add when there is enough researched content to compare cleanly
- [ ] Additional infographic modules — add after the homepage story is proven

### Future Consideration (v2+)

- [ ] Semi-automated refresh workflows — only after schema and review gates are stable
- [ ] Wider digital-asset policy coverage — only if it strengthens, not dilutes, the reserve/bond thesis
- [ ] Public contribution workflows — only if quality controls remain strong

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Illinois one-pager | HIGH | MEDIUM | P1 |
| Illinois bill draft | HIGH | HIGH | P1 |
| Methodology memo | HIGH | LOW | P1 |
| 50-state skeleton manifest | HIGH | MEDIUM | P1 |
| 3-5 researched state entries | HIGH | MEDIUM | P1 |
| PDF pipeline | HIGH | MEDIUM | P1 |
| Homepage | HIGH | MEDIUM | P1 |
| Methodology page | HIGH | LOW | P1 |
| Catalog page | HIGH | MEDIUM | P1 |
| State detail template | HIGH | MEDIUM | P1 |
| Infographic system | MEDIUM | HIGH | P2 |
| Cluster pages | MEDIUM | MEDIUM | P2 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Legislative trackers | Crypto advocacy sites | Our Approach |
|---------|----------------------|-----------------------|--------------|
| Bill status | Often broad but thin | Often current-feeling but loosely sourced | Keep entries few enough to source rigorously and date visibly |
| Public explanation | Usually weak | Often strong but promotional | Use a professional, assertive, auditable editorial tone |
| Legislative artifacts | Rare | Usually absent | Make the Illinois packet the flagship deliverable |
| Source trails | Mixed quality | Often inconsistent | Treat primary legislative sources as the publishing floor |

## Sources

- [Texas SB 21 history](https://capitol.texas.gov/billlookup/History.aspx?Bill=SB21&LegSess=89R) — enacted reserve example
- [Arizona SB 1025 text](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm) — reserve-bill example
- [Arizona HB 2749 law](https://www.azleg.gov/legtext/57leg/1r/laws/0150.htm) — enacted reserve-fund-related law
- [Illinois HB 1844](https://www.ilga.gov/legislation/104/HB/10400HB1844.htm) — Illinois reserve proposal
- [Missouri HB 1217](https://house.mo.gov/BillContent.aspx?bill=HB1217&code=R&year=2025) — reserve proposal example
- [Oklahoma HB 1203 bill summary](https://www.oklegislature.gov/cf_pdf/2025-26%20SUPPORT%20DOCUMENTS/BILLSUM/House/HB1203%20INT%20BILLSUM.PDF) — reserve proposal example
- [NH BFA Bitcoin-backed municipal bond](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/) — official bond-side signal

---
*Feature research for: state Bitcoin reserve and bond policy registry*
*Researched: 2026-03-31*
