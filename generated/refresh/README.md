# Generated Refresh Artifacts

This directory is the repo-owned home for refresh workflow outputs such as queued review
lists, stale-entry reports, and other refresh-only artifacts.

It is outside canonical authored content on purpose:

- files here are not canonical published content;
- files here must not replace or shadow `content/states/*.md`;
- files here may guide maintainer review, but they do not auto-publish state entries.
- generated priority artifacts must remain under `generated/refresh/` and must not
  replace `content/states/*.md` records.

If a refresh artifact identifies work that should become public, promote that work
through the normal authored-content path under `content/`.

Current generated outputs:

- `generated/refresh/state-refresh-queue.json` — machine-readable refresh queue
- `generated/refresh/state-refresh-queue.md` — maintainer-readable refresh queue
- `generated/refresh/state-priority-queue.json` — machine-readable combined
  refresh/candidate priority queue
- `generated/refresh/state-priority-queue.md` — maintainer-readable combined
  refresh/candidate priority queue

Regenerate with:

- `bun run refresh:queue`
