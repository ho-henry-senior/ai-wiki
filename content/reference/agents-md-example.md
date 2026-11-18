---
type: reference
summary: A small AGENTS.md example that tells coding agents where to find project rules and which checks to run.
status: developing
lane: reference
order: 9
tags:
  - AGENTS.md
---

# AGENTS.md example: short repository entrypoint

**Use this asset** when you want the agent to know the few project rules that cannot be inferred from code, without loading a manual into every task. This is an _adaptable example_, not an excerpt from a third-party project.

## Copy and adapt: `AGENTS.md`

```markdown
# Orders service

## Find context

- Architecture: docs/architecture.md
- API contracts: docs/api.md
- Decisions and exceptions: docs/adr/

## Working rules

- Store money as integer pence, not floating-point values.
- Add new migrations; do not rewrite committed migrations.
- Keep changes within the issue's agreed scope.

## Checks

- Discover supported commands with `just --list`.
- While editing, run `just test tests/test_orders.py`.
- Before handoff, run `just verify`; this must pass.
- `just format` changes files; run it deliberately.
```

Create this file at the repository root. Replace the business rules and paths with _real_ project facts; the commands must correspond to actual recipes in your repository. Keep critical rules directly in the file. An ordinary Markdown pointer does not guarantee another file will be read, and instructions are not enforced security controls.

## Real files to inspect

- [VS Code's AGENTS.md](https://github.com/microsoft/vscode/blob/main/AGENTS.md) — short pointer to detailed Copilot instructions, with one specific cross-cutting rule.
- [This wiki's AGENTS.md](https://github.com/ho-henry-senior/ai-wiki/blob/main/AGENTS.md) — paths to canonical guidance plus `just verify` for handoff.
- [Next.js's AGENTS.md](https://github.com/vercel/next.js/blob/canary/AGENTS.md) — contrasting, extensive monorepo instructions; informative but not a default size target.

For support differences and how agents load instructions, see [write repository instructions in AGENTS.md](../goals/alignment/repository-instructions.md).
