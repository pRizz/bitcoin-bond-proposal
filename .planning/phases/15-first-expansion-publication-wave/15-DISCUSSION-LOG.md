# Phase 15: First Expansion Publication Wave - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-31T23:53:42.037Z
**Phase:** 15-first-expansion-publication-wave
**Mode:** Yolo
**Areas discussed:** Publication batch selection, Source and refresh gate, Public content shape, Verification contract

---

## Publication Batch Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Publish every Phase 14 candidate | Attempt all seven candidates in one wave, including states still marked needs-status-confirmation. | |
| Publish ready-to-author candidates first | Publish Florida, Kansas, North Dakota, Ohio, and Utah if official source checks still support the entries. | yes |
| Publish one sample entry only | Minimize scope to prove the route path with a single state. | |

**User's choice:** Yolo selected ready-to-author candidates first.
**Notes:** South Dakota and Wyoming remain optional only if official final status can be confirmed quickly without research drift.

---

## Source And Refresh Gate

| Option | Description | Selected |
|--------|-------------|----------|
| Repeat Phase 14 intake statuses | Use the previously generated candidate notes without rechecking official pages. | |
| Recheck official sources first | Update authored claims to the current official posture before publishing. | yes |
| Use secondary trackers to fill gaps | Use third-party status trackers when official pages are hard to parse. | |

**User's choice:** Yolo selected official source checks first.
**Notes:** Current checks found Florida terminal companion statuses, Kansas `Died` posture with 2026 hearing data, North Dakota failed floor posture, Ohio committee posture, and Utah enrolled text with broader digital-asset scope.

---

## Public Content Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse existing state-entry structure | Add canonical Markdown entries and manifest rows that compile through existing routes. | yes |
| Add a special first-wave route | Create a separate route for newly published states. | |
| Redesign state surfaces during publication | Combine publication with catalog, cluster, and comparison UI changes. | |

**User's choice:** Yolo selected reuse of the existing state-entry structure.
**Notes:** Phase 17 owns broader surface QA and route polish unless the existing routes fail with the expanded data set.

---

## Verification Contract

| Option | Description | Selected |
|--------|-------------|----------|
| Run content-only checks | Validate only the new Markdown and manifest data. | |
| Run full repo-native verification | Run content validation, compilation, refresh generation, typecheck, build, tests, and precommit where feasible. | yes |
| Leave browser checks to Phase 17 | Skip route checks entirely until expanded surface QA. | |

**User's choice:** Yolo selected full repo-native verification.
**Notes:** Include a targeted generated-content check proving the expected new slugs are present and the published state count increased.

---

## the agent's Discretion

- Exact prose, file names, secondary source inclusion, and whether to include South Dakota or Wyoming if official status is easy to confirm.
- Plan split and implementation sequencing.

## Deferred Ideas

- South Dakota and Wyoming publication if official final status cannot be confirmed quickly.
- Full deferral ledger and remaining high-interest state rationale in Phase 16.
- Expanded public surface QA and visual/data polish in Phase 17.
