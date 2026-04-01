# Phase 3: Research Registry Core - Research

**Researched:** 2026-04-01
**Status:** Ready for planning

## Objective

Research what Phase 3 needs so the project can move from an Illinois packet into a credible national registry backbone with a 50-state skeleton and the first publishable batch of state entries.

## Registry Reality Check

The registry phase has two jobs that must remain separate:

1. create the national skeleton and internal research workflow; and
2. publish a first batch of state entries that are strong enough to set the standard for later work.

The evidence base is still reserve-heavy, but the editorial direction approved for this phase is to emphasize bond-financed reserve accumulation where the facts support that interpretation. That means the registry should not fake symmetry between reserve and bond evidence, but it also should not bury the bond financing thesis when it is relevant.

## Official-State Exemplar Set

### Illinois

- Official source: [HB1844 bill status](https://www.ilga.gov/Legislation/BillStatus?DocNum=1844&DocTypeID=HB&GA=104&GAID=18&LegId=159334&SessionID=114)
- Supporting source: [HB1844 text PDF](https://www.ilga.gov/documents/legislation/104/HB/PDF/10400HB1844lv.pdf)

Why it matters:

- Illinois is the packet anchor and an actual reserve-bill record.
- The registry entry should remain descriptive and official-record-oriented, distinct from the normative packet.

### Texas

- Official source: [SB 21 introduced bill text](https://capitol.texas.gov/tlodocs/89R/billtext/html/SB00021I.htm)
- Supporting source: [SB 21 committee analysis](https://capitol.texas.gov/tlodocs/89R/analysis/html/SB00021H.htm)

Why it matters:

- Texas provides one of the strongest official reserve-law or reserve-structure signals.
- It is useful as a high-significance reserve benchmark even if the registry’s editorial framing leans toward bond-financed reserve accumulation.

### Arizona

- Official source: [SB1025 text](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm)
- Supporting source: [SB1025 Senate fact sheet](https://www.azleg.gov/legtext/57leg/1R/summary/S.1025FIN_ASVETOED.DOCX.htm)

Why it matters:

- Arizona is a high-visibility reserve-bill signal.
- It helps show the difference between a strong reserve concept and the actual fate of a bill.

### Oklahoma

- Official source: [HB1203 floor version](https://www.oklegislature.gov/cf_pdf/2025-26%20FLR/HFLR/HB1203%20HFLR.PDF)
- Supporting source: [HB1203 House bill summary](https://www.oklegislature.gov/cf_pdf/2025-26%20SUPPORT%20DOCUMENTS/BILLSUM/House/HB1203%20FA1%20BILLSUM.PDF)

Why it matters:

- Oklahoma provides another substantive reserve-side example with concrete investment caps and public-finance framing.
- It helps the registry avoid overconcentrating on only Texas and Arizona.

### New Hampshire

- Official source: [NH BFA Approves World's First Bitcoin-Backed Municipal Bond](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/)

Why it matters:

- New Hampshire is the clearest official bond-side signal in the current project context.
- It is structurally different from a legislature-filed bill, so any registry entry must say that plainly rather than pretending it is the same kind of record as a reserve bill.

## Planning Implications

### 1. The skeleton must stay minimal

The 50-state skeleton should be a manifest-level layer, not 50 fake public records. The approved Phase 3 context already locked the minimal shape:

- state
- slug
- registry status
- proposal focus
- short note
- internal editorial priority

Implication:

- Phase 3 should add manifest support and queue/published separation first, before authoring exemplar entries.

### 2. Publishable entries must be narrative-first, metadata-backed

Each entry should use:

- at-a-glance summary;
- legislative status block;
- what this would actually do;
- bond/reserve analysis;
- key statutory mechanics;
- source trail;
- confidence note.

Implication:

- The state-entry content model likely needs to expand beyond the current minimal state frontmatter so the entry body and generated read model can support those sections cleanly.

### 3. New Hampshire is a deliberate edge case

New Hampshire’s official bond-side signal is useful, but it is not a standard legislature-bill record in the same way as Illinois, Texas, Arizona, or Oklahoma.

Implication:

- The registry should explicitly mark what kind of state-level action New Hampshire represents.
- The project should not hide that distinction.
- This strengthens trust rather than weakening the bond emphasis.

### 4. The bond thesis should shape the editorial line, not distort the facts

The registry should be willing to say:

- this is reserve-heavy;
- this is only indirectly bond-relevant;
- this matters because it creates a path toward bond-financed reserve accumulation;
- or this is limited and mostly symbolic.

Implication:

- Editorial judgment lines should be short but real.

## Recommended Plan Split

Three plans in two waves is the cleanest shape.

### Wave 1

- **03-01 Skeleton, schema, and queue/published boundary**
  - add the 50-state skeleton manifest;
  - encode internal editorial priority;
  - separate publishable state entries from unresearched or queued states;
  - update validation and compile scripts to understand the new registry layer.

### Wave 2

- **03-02 Illinois, Texas, and Arizona publishable entries**
  - covers the packet anchor plus two high-significance reserve exemplars.

- **03-03 Oklahoma and New Hampshire publishable entries**
  - covers the remaining reserve exemplar plus the strongest official bond-side signal;
  - explicitly marks New Hampshire’s record type if it differs from a legislature-filed bill.

This split keeps the content files disjoint enough for parallel execution after the manifest/schema work lands.

## Risks and Gotchas

- The registry can lose credibility if the 50-state skeleton looks like 50 researched entries when only 5 are real.
- New Hampshire’s bond-side signal is useful, but only if its record type is described honestly.
- If the first batch of entries reads like plain tracker rows, the registry will not establish the editorial standard needed for later phases.
- If the bond emphasis is pushed too hard, the registry can start overstating what reserve-focused bills actually do.

## Sources

- [Illinois HB1844 bill status](https://www.ilga.gov/Legislation/BillStatus?DocNum=1844&DocTypeID=HB&GA=104&GAID=18&LegId=159334&SessionID=114)
- [Illinois HB1844 text PDF](https://www.ilga.gov/documents/legislation/104/HB/PDF/10400HB1844lv.pdf)
- [Texas SB 21 introduced text](https://capitol.texas.gov/tlodocs/89R/billtext/html/SB00021I.htm)
- [Texas SB 21 committee analysis](https://capitol.texas.gov/tlodocs/89R/analysis/html/SB00021H.htm)
- [Arizona SB1025 text](https://www.azleg.gov/legtext/57leg/1r/bills/sb1025s.htm)
- [Arizona SB1025 fact sheet](https://www.azleg.gov/legtext/57leg/1R/summary/S.1025FIN_ASVETOED.DOCX.htm)
- [Oklahoma HB1203 floor version](https://www.oklegislature.gov/cf_pdf/2025-26%20FLR/HFLR/HB1203%20HFLR.PDF)
- [Oklahoma HB1203 House bill summary](https://www.oklegislature.gov/cf_pdf/2025-26%20SUPPORT%20DOCUMENTS/BILLSUM/House/HB1203%20FA1%20BILLSUM.PDF)
- [NH BFA official bitcoin-backed municipal bond announcement](https://nhbfa.com/news/nh-bfa-approves-worlds-first-bitcoin-backed-municipal-bond/)

---
*Phase: 03-research-registry-core*
*Research completed: 2026-04-01*
