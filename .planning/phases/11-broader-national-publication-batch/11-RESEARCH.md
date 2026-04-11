# Phase 11: Broader National Publication Batch - Research

**Researched:** 2026-04-11
**Status:** Ready for planning

## Objective

Research how to execute the next deliberate publication batch so the registry expands
beyond the first five states without weakening the existing source, freshness, and
editorial trust contract.

## Current Repo State

### What already exists

- Five published state entries:
  - Arizona
  - Illinois
  - New Hampshire
  - Oklahoma
  - Texas
- Manifest-level region metadata and published-state legislative status grouping from
  Phase 10.
- Shared registry selectors and `/states` browse cues that now surface focus, region,
  status, and freshness context.

### What Phase 11 must add

- A meaningful second publication batch, likely 4-5 states.
- Confidence/completeness cues that stay calm and editorial rather than becoming a
  scoring dashboard.
- Narrow supporting registry-surface updates only where the batch needs them.

## Candidate Shortlist From Current Official Signals

These are the strongest current candidate states identified from official legislature or
authority pages on 2026-04-11.

### Missouri

- **Official source:** `https://house.mo.gov/BillContent.aspx?bill=HB1217&code=R&year=2025`
- **Signal:** HB 1217 creates the "Bitcoin Strategic Reserve Fund" and allows the state
  treasurer to receive, invest, and hold Bitcoin under certain circumstances.
- **Current official status signal:** Public Hearing Completed (House) on 2025-03-24.
- **Why it matters:** Already seeded in the manifest as a likely follow-on reserve-side
  candidate, making it the most natural Phase 11 priority.

### North Carolina

- **Official source:** `https://www.ncleg.gov/BillLookUp/2025/S327/True`
- **Signal:** S327 is titled the "NC Bitcoin Reserve and Investment Act."
- **Current official status signal:** Passed 1st Reading and referred to Senate Rules and
  Operations on 2025-03-19.
- **Why it matters:** Clear reserve-side signal with explicit official status on the
  General Assembly site.

### Maryland

- **Official source:** `https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1389?ys=2025RS`
- **Bill text PDF:** `https://mgaleg.maryland.gov/2025rs/bills_noln/hb/fhb1389.pdf`
- **Signal:** HB 1389 is the "Strategic Bitcoin Reserve Act of Maryland."
- **Current official status signal:** Official Maryland tracking surfaces show a House
  hearing in the 2025 regular session.
- **Why it matters:** Strong naming clarity and a clearly official bill text/source trail.

### Michigan

- **Official source:** `https://www.legislature.mi.gov/documents/2025-2026/billintroduced/House/htm/2025-HIB-4087.htm`
- **Alternate official bill page:** `https://legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4087&printerFriendly=true`
- **Signal:** HB 4087 would allow the state treasurer to invest portions of major state
  funds in cryptocurrency, with custody and ETP language.
- **Current official status signal:** Introduced on 2025-02-13 and referred to the House
  Committee on Communications and Technology.
- **Why it matters:** Expands the registry with another official reserve-adjacent
  investment-authority model.

### South Carolina

- **Official source:** `https://www.scstatehouse.gov/sess126_2025-2026/bills/4256.htm`
- **Signal:** H. 4256 is the "Strategic Digital Assets Reserve Act of South Carolina."
- **Current official status signal:** Introduced on 2025-03-27 and referred to House Ways
  and Means.
- **Why it matters:** Adds another strong official reserve-side legislative signal from a
  different state legislature with clear public bill text.

## Research Implications

### Batch recommendation

The strongest Phase 11 execution shape is:
- **Required anchor:** Missouri
- **Plus 3-4 from:** North Carolina, Maryland, Michigan, South Carolina

This yields a 4-5 entry expansion that materially broadens the registry without turning
the phase into a rushed national sweep.

### Reserve versus bond balance

The current official signals remain reserve-heavy. Phase 11 should not force a weak
bond-side record just to balance the dataset. The project already has New Hampshire as
the clearest official bond-side exemplar and Illinois as a `both` record.

### Confidence/completeness cues

Every new entry should carry an explicit confidence/completeness note tied to:
- clarity of official text
- clarity of official status tracking
- whether the record is enacted, advanced, introduced, or still thinly developed

These cues should likely appear in:
- the state Markdown record itself
- manifest `shortNote` / significance copy where needed
- existing registry surfaces only if a narrow update is needed to expose the cue

## Risks and Gotchas

- Some candidate states may have strong bill text but thin action history; those should be
  publishable only if the confidence/completeness note is explicit.
- The phase should avoid rewriting the five existing published entries beyond small
  consistency updates.
- It is easy for confidence/completeness work to drift into comparison-page UX; keep any
  UI changes thin and batch-supportive only.
- Official-source quality matters more than hitting a round number of states.

## Recommended Plan Shape

Two plans remain the cleanest split.

### Plan 11-01

**Research and publish the next state batch**

Focus:
- confirm the final shortlist from official sources
- author new canonical state records
- update the manifest for newly published states
- validate and compile the batch

### Plan 11-02

**Integrate confidence/completeness cues into existing registry surfaces**

Focus:
- make any narrow consistency updates needed for the new batch
- expose calm confidence/completeness cues on current catalog/detail surfaces
- avoid comparison pages and dashboard behavior

## Sources

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/phases/11-broader-national-publication-batch/11-CONTEXT.md`
- `content/data/state-registry-manifest.json`
- `content/states/*.md`
- `https://house.mo.gov/BillContent.aspx?bill=HB1217&code=R&year=2025`
- `https://www.ncleg.gov/BillLookUp/2025/S327/True`
- `https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1389?ys=2025RS`
- `https://mgaleg.maryland.gov/2025rs/bills_noln/hb/fhb1389.pdf`
- `https://www.legislature.mi.gov/documents/2025-2026/billintroduced/House/htm/2025-HIB-4087.htm`
- `https://legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4087&printerFriendly=true`
- `https://www.scstatehouse.gov/sess126_2025-2026/bills/4256.htm`

---
*Phase: 11-broader-national-publication-batch*
*Research completed: 2026-04-11*
