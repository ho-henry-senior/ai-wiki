---
type: reference
summary: Why repository rules belong in one short AGENTS.md, which Copilot features read it, and how to fill Copilot's remaining gaps without duplicating rules.
status: established
lane: articles
goal: alignment
order: 2
checked: 2026-11-15
tags:
  - Copilot in the editor
  - Copilot CLI
  - Copilot cloud agent
  - Copilot code review
  - AGENTS.md
---

# Write repository instructions in AGENTS.md

An agent can read your code, but not the rules that exist only in your team's heads: which command to run, which folder never to edit, why money is stored in pence. Put those in an `AGENTS.md` file at the root of your repository.

It is the shared convention: Copilot's agents read it, and so do other agents such as Claude Code and Codex, so one file serves them all and there are no copies to drift apart.

Each Copilot feature that reads it loads it with every task, so a long file uses context and tokens on every request. Keep it to what an agent cannot work out from the code, and point to other files for detail.

## Start with this

Create `AGENTS.md` with a few lines like these:

```markdown
# Payments API (Python 3.12, FastAPI)

- Run `make test-unit` for focused tests and `make check` before you finish. `make format` rewrites files.
- Do not edit existing files in `migrations/`. Create a new migration with `make migration`.
- Store money as integer pence, never as floats.
- Architecture and past decisions: `docs/architecture.md` and `docs/adr/`.
```

Each line is a command to run, a rule that isn't obvious from the code, or a pointer to where detail lives. Don't repeat formatting and other mechanical rules that linters or tests already enforce. Do include constraints the agent needs before it acts, such as not editing migrations, because a check only catches a mistake after it is made. Leave out what the README already says; the agent can read it when it needs it.

## Which Copilot features read which file

| Copilot feature                         | `AGENTS.md` | `.github/copilot-instructions.md` | Path-specific `.instructions.md` |
| --------------------------------------- | :---------: | :-------------------------------: | :------------------------------: |
| Cloud agent                             |     Yes     |                Yes                |               Yes                |
| Copilot CLI                             |     Yes     |                Yes                |               Yes                |
| Code review on GitHub.com               |     Yes     |                Yes                |               Yes                |
| Chat in VS Code                         |     Yes     |                Yes                |               Yes                |
| Chat on GitHub.com                      |     No      |                Yes                |                No                |
| Chat in Visual Studio or JetBrains      |     No      |                Yes                |               Yes                |
| Code review in VS Code or Visual Studio |     No      |                Yes                |                No                |

## Fill Copilot's gaps

If your team uses the features in the last three rows, add a short `.github/copilot-instructions.md` with only what those features need, such as the one-line project summary and key conventions. Do not copy `AGENTS.md` into it: features that read both files combine them, so a repeated rule wastes context and two rules that disagree give unpredictable results. Copilot support for `AGENTS.md` has grown through 2026, so check the support table before adding the second file.

## Add rules for one part of the codebase

The shared convention is a nested `AGENTS.md`, such as `app/models/AGENTS.md`. Copilot CLI reads nested files, VS Code reads them only when `chat.useNestedAgentsMdFiles` is turned on, and code review reads only the root file. GitHub's documentation does not say whether the cloud agent reads them.

Until Copilot reads nested files everywhere, use a path-specific file in `.github/instructions/NAME.instructions.md`, which every Copilot agent reads:

```markdown
---
applyTo: "app/models/**/*.rb"
---

Every model change needs a migration and a model test in `spec/models/`.
```

Copilot loads it only when it works on a matching file, which keeps that detail out of tasks on other files. Separate several patterns with commas, such as `"**/*.ts,**/*.tsx"`. To keep a file from the cloud agent or code review, add `excludeAgent: "cloud-agent"` or `excludeAgent: "code-review"` to its front matter.

## Other agents

| Agent       | Reads `AGENTS.md`         | Notes                                         |
| ----------- | ------------------------- | --------------------------------------------- |
| Codex       | Yes                       | Its main instruction file.                    |
| Cursor      | Yes                       | Also reads its own rules in `.cursor/rules/`. |
| Claude Code | Yes, from version 2.1.277 | Only in a folder that has no `CLAUDE.md`.     |
| Gemini CLI  | Only when configured      | Reads `GEMINI.md` by default.                 |

You don't need a tool-specific file for these agents unless you have rules only that tool should follow.

## Things to know

- **Code review reads the PR's own branch.** Copilot code review uses the instruction files from the pull request's head branch, not the base branch. A PR can therefore change the rules used to review it. Protect `AGENTS.md`, `.github/copilot-instructions.md`, and `.github/instructions/` with `CODEOWNERS` so changes to them need human review.
- **Check what the CLI loaded.** In Copilot CLI, run `/instructions` to see the files the session found and to turn them on or off. Edits don't reach a running session: restart with `copilot --continue` or start a new one with `/new`.
- **Keep must-have rules in the file itself.** Copilot CLI loads `@docs/testing.md` from `AGENTS.md` immediately, but other features may not expand these references.
- **Instructions guide; they don't enforce.** "Never push to `main`" asks the agent to behave. Branch protection or a denied tool stops it. See [instructions are not enforced controls](../../concepts/instructions-vs-controls.md).

**Copyable asset:** [AGENTS.md example: short repository entrypoint](../../reference/agents-md-example.md) brings project pointers, working rules and check commands into one file. Replace every illustrative path and rule with facts about your repository.

This wiki's own [AGENTS.md](../../../AGENTS.md) is a working example. For a contrasting short entrypoint, see [VS Code's AGENTS.md](https://github.com/microsoft/vscode/blob/main/AGENTS.md). For where instruction files sit alongside skills and task commands, see [a structure for agent-facing repositories](agent-facing-repository-structure.md).

**Next:** [let the agent run your repository's commands](agent-tool-delegation.md), step 1 of [start here](../../../README.md#first-steps).

## Sources

- [GitHub Docs: Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [GitHub Docs: About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [GitHub Docs: Add custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [GitHub Docs: Add repository instructions in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)
- [GitHub Changelog: Copilot code review reads AGENTS.md (18 June 2026)](https://github.blog/changelog/2026-06-18-copilot-code-review-agents-md-support-and-ui-improvements)
- [GitHub Changelog: Copilot code review reads instructions from the head branch (17 July 2026)](https://github.blog/changelog/2026-07-17-copilot-code-review-customization-and-configurability-improvements/)
- [Claude Code docs: How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [AGENTS.md compatibility list](https://www.mintlify.com/agentsmd/agents.md/compatibility/overview)
- [AGENTS.md convention](https://github.com/agentsmd/agents.md)
