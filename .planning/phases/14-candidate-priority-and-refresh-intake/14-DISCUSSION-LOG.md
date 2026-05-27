# Phase 14: Candidate Priority and Refresh Intake - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-05-27T13:59:07.880Z
**Phase:** 14-Candidate Priority and Refresh Intake
**Mode:** Yolo
**Areas discussed:** Priority artifact shape, Candidate classification, Prioritization rules, Verification contract

---

## Priority Artifact Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Extend existing refresh queue only | Add candidate rows to the existing refresh queue files. | |
| Add a combined priority queue | Keep existing refresh files and add a new generated priority artifact covering refresh plus candidates. | yes |
| Candidate-only artifact | Generate only unpublished candidate output and leave published refresh separately. | |

**User's choice:** Auto-selected combined priority queue.
**Notes:** This preserves existing behavior while giving Phase 15 a single maintainer view of refresh blockers and expansion candidates.

---

## Candidate Classification

| Option | Description | Selected |
|--------|-------------|----------|
| Public placeholder state pages | Create placeholder public pages for high-interest candidates. | |
| Controlled data input plus generated output | Store unpublished candidate classifications outside public state entries and generate maintainer artifacts. | yes |
| Script-only hard-coded candidates | Keep candidate rows inside the generator script. | |

**User's choice:** Auto-selected controlled data input plus generated output.
**Notes:** This keeps unverified candidate work out of `content/states/*.md` while still making the queue reproducible.

---

## Prioritization Rules

| Option | Description | Selected |
|--------|-------------|----------|
| Refresh-first with candidate subqueue | Put stale published records ahead of lower-risk expansion, while preserving a ranked first-publication queue. | yes |
| Candidate-first | Rank new publication opportunities before stale published refresh work. | |
| Single blended score only | Merge all work into one flat score without source-specific sections. | |

**User's choice:** Auto-selected refresh-first with candidate subqueue.
**Notes:** Active or review-due published records can affect trust in new comparison work, but Phase 15 still needs a concrete publication order.

---

## Verification Contract

| Option | Description | Selected |
|--------|-------------|----------|
| Script smoke only | Regenerate files and inspect output manually. | |
| Pure model tests plus repo checks | Unit-test sorting/classification, regenerate artifacts, and run repo-native checks. | yes |
| Full browser route QA | Add browser checks now. | |

**User's choice:** Auto-selected pure model tests plus repo checks.
**Notes:** Phase 14 is mostly maintainer workflow and generated artifacts. Browser QA becomes more important when public surfaces change in later phases.

---

## the agent's Discretion

- Exact type names, score labels, and Markdown table layout.
- Whether candidate-priority model logic lives in `registry-freshness.ts` or a sibling module.

## Deferred Ideas

- Public state publication for selected candidates.
- Full deferral ledger for remaining high-interest states.
- Expanded public catalog and comparison UI changes.
