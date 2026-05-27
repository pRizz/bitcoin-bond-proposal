---
phase: 14-candidate-priority-and-refresh-intake
reviewed: 2026-05-27T14:39:58Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - src/lib/content/schema.ts
  - src/lib/content/schema.test.ts
  - src/lib/site/candidate-priority.ts
  - src/lib/site/candidate-priority.test.ts
  - scripts/build-refresh-queue.ts
  - content/data/state-candidate-intake.json
  - content/data/README.md
  - generated/refresh/README.md
  - generated/refresh/state-priority-queue.json
  - generated/refresh/state-priority-queue.md
findings:
  critical: 0
  warning: 3
  info: 0
  total: 3
status: resolved
resolved: 2026-05-27T14:42:14Z
---

# Phase 14: Code Review Report

**Reviewed:** 2026-05-27T14:39:58Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** resolved
**Pass/Fail:** Pass after follow-up fixes.

## Summary

Reviewed the Phase 14 candidate intake schema, pure priority model, generator wiring, controlled data, and generated priority artifacts. The implementation preserves the public-content boundary: no `content/states/*.md` or public route changes were present, and the combined artifacts stay under `generated/refresh/`.

Material guidance applied: local `AGENTS.md`, `AGENTS.bright-builds.md`, `standards-overrides.md`, and Bright Builds architecture, code-shape, verification, testing, and TypeScript/JavaScript standards. The OpenLinks guidance was considered because README files were in scope, but no identity-placement change was relevant to this maintainer-artifact review.

Read-only checks run:

- `bun test src/lib/content/schema.test.ts src/lib/site/candidate-priority.test.ts` - 20 pass.
- Parsed `content/data/state-candidate-intake.json` through `parseStateCandidateIntake` - pass.
- Recomputed `generated/refresh/state-priority-queue.json` from the current model - pass.
- `git diff --quiet -- content/states` - pass.

## Warnings

### WR-01: Invalid Calendar Dates Can Be Parsed and Mis-scored as Current

**File:** `src/lib/content/schema.ts:11`
**Resolution:** Fixed by refining `IsoDateStringSchema` to reject impossible calendar dates and adding parser regression coverage for `2026-02-30` and `2026-99-99`.

**Issue:** `IsoDateSchema` only verifies the `YYYY-MM-DD` shape, not whether the date exists. A validly shaped typo such as `2026-99-99` passes candidate intake parsing; `src/lib/site/candidate-priority.ts:72` then normalizes it through `Date.UTC`, and the age calculation can clamp the result to `0`, making bad or future-normalized dates look current. That undermines the freshness risk math the priority queue depends on.

**Fix:**

```ts
const IsoDateStringSchema = NonEmptyStringSchema.regex(
	isoDatePattern,
	"date must use YYYY-MM-DD format",
).refine((value) => {
	const [year, month, day] = value.split("-").map(Number);
	const parsed = new Date(Date.UTC(year, month - 1, day));

	return (
		parsed.getUTCFullYear() === year &&
		parsed.getUTCMonth() === month - 1 &&
		parsed.getUTCDate() === day
	);
}, "date must be a valid calendar date in YYYY-MM-DD format");
```

Add a parser regression test for impossible dates such as `2026-99-99` and `2026-02-30`.

### WR-02: Candidate Readiness and Next Action Can Disagree

**File:** `src/lib/content/schema.ts:147`
**Resolution:** Fixed by enforcing the `readiness` -> `nextAction` relationship in `StateCandidateIntakeEntrySchema.superRefine` and adding a parser regression test for mismatched values.

**Issue:** `StateCandidateIntakeEntrySchema.superRefine` enforces official-source requirements and deferral reasons, but it does not enforce the relationship between `readiness` and `nextAction`. The parser currently accepts rows such as `readiness: "ready-to-author"` with `nextAction: "confirm-final-status"`, which would create contradictory maintainer guidance in the generated priority queue.

**Fix:**

```ts
const expectedNextActionByReadiness = {
	"ready-to-author": "author-state-entry",
	"needs-status-confirmation": "confirm-final-status",
	defer: "defer-until-stronger-official-source",
} as const;

if (entry.nextAction !== expectedNextActionByReadiness[entry.readiness]) {
	context.addIssue({
		code: "custom",
		message: `${entry.readiness} candidates require nextAction ${expectedNextActionByReadiness[entry.readiness]}`,
		path: ["nextAction"],
	});
}
```

Add one parser test that rejects a mismatched `readiness` / `nextAction` pair.

### WR-03: Priority Markdown Does Not Escape Every Dynamic Table Cell

**File:** `scripts/build-refresh-queue.ts:96`
**Resolution:** Fixed by adding `renderMarkdownRow` and routing all generated Markdown table rows through shared cell escaping.

**Issue:** `renderCandidateIntakeNotes` escapes `evidenceNote` and `deferralReason`, but writes `entry.state` and `entry.officialSourceUrl` directly into a Markdown table row. The schema accepts non-empty state strings and URL strings that can contain `|` or newlines, so a valid controlled input row can break the generated maintainer table or inject extra table structure. This weakens the generated Markdown boundary the phase intended to harden.

**Fix:**

```ts
function renderMarkdownRow(cells: ReadonlyArray<string | number>): string {
	return `| ${cells.map((cell) => escapeMarkdownCell(String(cell))).join(" | ")} |`;
}

return renderMarkdownRow([
	entry.state,
	entry.evidenceNote,
	deferralReason,
	entry.officialSourceUrl ?? "Unavailable",
]);
```

Use the same row helper for the other generated Markdown tables so all dynamic cells share one escaping path.

---

## Follow-up Verification

- `bun test src/lib/content/schema.test.ts src/lib/site/candidate-priority.test.ts` - 22 pass.
- `bun run refresh:queue` - pass.
- `bunx tsc --noEmit` - pass.

_Reviewed: 2026-05-27T14:39:58Z_
_Resolved: 2026-05-27T14:42:14Z_
_Reviewer: the agent (gsd-code-reviewer)_
_Depth: standard_
