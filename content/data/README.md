# Content Data

This directory holds small controlled data artifacts that support canonical authored content.

Use it for:

- controlled vocabularies such as proposal kinds and subtypes;
- small manifests and lookup tables;
- seed data that validation and compile scripts consume directly.
- refresh workflow fields that belong to canonical manifest data rather than authored narrative files.

Do not use this directory for:

- generated read models;
- public packet documents;
- state proposal narrative entries;
- ad hoc scratch notes.

Canonical authored prose lives in:

- `content/docs/`
- `content/states/`
- `content/explainers/`

Refresh-aware registry workflow:

- `content/data/state-registry-manifest.json` owns registry status plus per-state cadence such as `reviewCadenceDays`.
- `content/states/*.md` own dated public-record freshness fields like `statusAsOf` and `lastReviewed`.
- Run `bun run audit:refresh` before refreshing state content so review debt stays visible and snapshot-based.

Generated artifacts belong outside `content/` so the authored source layer stays obvious.
