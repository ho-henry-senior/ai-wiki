---
type: reference
summary: What AGENTS.md can do as a shared repository instruction entrypoint, where major agent harnesses support it, and why their behavior is not uniform.
---

# AGENTS.md as a shared agent entrypoint

`AGENTS.md` is an increasingly useful convention for giving coding agents repository-level instructions. Official documentation from several major tools recognizes it, but support is not universal and does not imply identical discovery, scope, or precedence rules. Treat it as a shared entrypoint, not a guarantee that every harness will load the same instructions.

## What the documentation says

| Harness | Documented behavior |
| --- | --- |
| OpenAI Codex | Uses `AGENTS.md` files for repository instructions, with instructions discoverable in the directory hierarchy. |
| GitHub Copilot CLI | Supports `AGENTS.md` as a source of custom instructions. |
| Cursor CLI | Reads `AGENTS.md` alongside its own rules and other supported instruction files. |
| Claude Code | Documents `AGENTS.md` as an alternative project instruction file to `CLAUDE.md`. |
| Gemini CLI | Defaults to `GEMINI.md`; its context filename setting can be configured to include `AGENTS.md`. |

These are not interchangeable loading contracts. A tool may combine files, discover instructions only in certain locations, or require configuration. Check the current documentation and verify what a particular harness loads before relying on an instruction being applied.

## What to put in the entrypoint

Keep the file short enough to be useful as routinely loaded context. Prefer stable, repository-wide guidance:

- a brief description of the system and important boundaries;
- constraints or conventions that materially affect changes and are not obvious from code;
- the dependable setup, test, lint, and build commands, or a link to their canonical documentation;
- a small map to deeper domain, architecture, decision, and cross-repository context; and
- guidance on where to look for task-specific instructions.

Use progressive disclosure: put only the broadly useful starting context in `AGENTS.md`, and keep detailed explanations near the subsystem or concern they describe. Link to those documents rather than copying them into the entrypoint. This helps agents find relevant information without loading every detail for every task.

Avoid turning the file into a duplicate of the README, a complete architecture manual, or a list of rules already enforced by tools. If different harnesses need different native files, keep one canonical source where practical and make any adapters or imports explicit. Do not assume that nested files, imports, or precedence behave the same across tools.

For a complete illustrative layout that places `AGENTS.md` alongside agent documentation, skills, and task commands, see [A structure for agent-facing repositories](agent-facing-repository-structure.md).

## Findings and limitations

The documentation supports a qualified conclusion: `AGENTS.md` is an emerging cross-harness convention, not a universal standard with a shared schema or uniform runtime behavior. The strongest repository practice is therefore to keep its purpose clear, link it from the project’s main documentation, and validate instruction discovery in the harnesses the team actually uses.

## Sources

- [OpenAI Codex: `AGENTS.md`](https://developers.openai.com/codex/guides/agents-md/)
- [GitHub Copilot CLI: Add custom instructions](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Cursor CLI: Using the CLI](https://cursor.com/docs/cli/using)
- [Claude Code: Manage memory](https://code.claude.com/docs/en/memory)
- [Gemini CLI: `GEMINI.md` context files](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md)

Documentation checked 13 November 2026; harness behavior can change.
