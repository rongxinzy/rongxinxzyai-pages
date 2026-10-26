# Contributing

You are welcome to contribute to the Seriya through issue reports, documentation improvements, Skill authoring, or code changes.

## Reporting Issues

Submit issues with the issue template on [GitHub Issues](https://github.com/rongxinzy/RongxinAI/issues), including your system, version, reproduction steps, and logs. Logs can be exported in the app under **Settings → About → Export Logs**. Do not include API keys, credentials, or personal data in issues, logs, or screenshots.

## Submitting Code

- Read the repository's `AGENTS.md` before changing code; when the interface is involved, also follow `DESIGN.md`.
- One PR solves one problem. Use the `type(scope): summary` format for the title, for example `fix(chat): keep scroll position after streaming`.
- In the PR description, explain what changed, why, and what verification you performed with what results.
- Before submitting, run `bun run build`, `bun run lint`, `bun run test`, and `bun run format:check`.
- Keep single source files under 1000 lines; CI checks for unused exports and dependencies (Knip).
- For interface changes, check both light and dark themes and both Chinese and English in the browser preview first, and attach screenshots to the PR.

The required CI check is `ci-gate`; PRs are merged after it passes. See the repository's `DEVOPS.md` and `CONTRIBUTING.md` for the full process.
