---
type: reference
summary: Put repository rules in .github/copilot-instructions.md, add path-specific files for parts of the codebase, and know which Copilot features read which file.
status: established
---

# Give Copilot repository instructions

Put the rules Copilot needs in every task in `.github/copilot-instructions.md`. It is the one instruction file read by every Copilot feature that supports instructions: chat, the CLI, the cloud agent, and code review. Keep it to what Copilot cannot work out from the code, and point to other files for detail.

## Start with this

Create `.github/copilot-instructions.md` with a few lines like these:

```markdown
# Payments API (Python 3.12, FastAPI)

- Run `make test-unit` for focused tests and `make check` before you finish. `make format` rewrites files.
- Do not edit existing files in `migrations/`. Create a new migration with `make migration`.
- Store money as integer pence, never as floats.
- Architecture and past decisions: `docs/architecture.md` and `docs/adr/`.
```

Each line is a command to run, a rule that isn't obvious from the code, or a pointer to where detail lives. Leave out anything a linter or test already enforces, and anything the README already says. Copilot combines all the instruction files that apply, so a rule repeated in two files only wastes context, and two rules that disagree give unpredictable results.

## Which features read which file

| Copilot feature                         | `.github/copilot-instructions.md` | Path-specific `.instructions.md` | `AGENTS.md` |
| --------------------------------------- | :-------------------------------: | :------------------------------: | :---------: |
| Chat on GitHub.com                      |                Yes                |                No                |     No      |
| Chat in VS Code                         |                Yes                |               Yes                |     Yes     |
| Chat in Visual Studio or JetBrains      |                Yes                |               Yes                |     No      |
| Copilot CLI                             |                Yes                |               Yes                |     Yes     |
| Cloud agent                             |                Yes                |               Yes                |     Yes     |
| Code review on GitHub.com               |                Yes                |               Yes                |    Yes\*    |
| Code review in VS Code or Visual Studio |                Yes                |                No                |     No      |

\*Code review on GitHub.com also reads `REVIEW.md`, `CLAUDE.md`, and `GEMINI.md`. The cloud agent and Copilot CLI also read `CLAUDE.md` and `GEMINI.md`.

Use `AGENTS.md` instead only if other tools in your team must read the same rules, and accept that Copilot Chat on GitHub.com and in Visual Studio or JetBrains will not see them. Do not keep the same rules in both files.

## Add rules for one part of the codebase

Put rules that apply only to some files in `.github/instructions/NAME.instructions.md`, with an `applyTo` glob:

```markdown
---
applyTo: "app/models/**/*.rb"
---

Every model change needs a migration and a model test in `spec/models/`.
```

Copilot loads the file only when it works on a matching file, which keeps everyday context small. Separate several patterns with commas, such as `"**/*.ts,**/*.tsx"`. To stop the cloud agent or code review from using a file, add `excludeAgent: "cloud-agent"` or `excludeAgent: "code-review"` to its front matter.

## Things to know

- **Code review reads the PR's own branch.** Copilot code review uses the instruction files from the pull request's head branch, not the base branch. That lets you test new review rules in a PR, but it also means a PR can change the rules used to review it. Protect `.github/copilot-instructions.md`, `.github/instructions/`, and `AGENTS.md` with `CODEOWNERS` so changes to them need human review.
- **Check what the CLI loaded.** In Copilot CLI, run `/instructions` to see which files the session found and to turn them on or off. Edits don't reach a running session: restart with `copilot --continue` or start a new one with `/new`.
- **The CLI can include other files.** In Copilot CLI, `@docs/testing.md` in `copilot-instructions.md` or `AGENTS.md` loads that file immediately. Other Copilot features may not expand these references, so keep rules every feature needs in the main file itself.
- **Instructions guide; they don't enforce.** "Never push to `main`" asks Copilot to behave. Branch protection or a denied tool stops it. See [instructions are not enforced controls](../concepts/instructions-vs-controls.md).

This wiki's own [AGENTS.md](../AGENTS.md) is a working example of a short entrypoint. For where instruction files sit alongside skills and task commands, see [a structure for agent-facing repositories](agent-facing-repository-structure.md).

## Sources

Checked 15 November 2026.

- [GitHub Docs: Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [GitHub Docs: About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [GitHub Docs: Add custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [GitHub Changelog: Copilot code review reads instructions from the head branch (17 July 2026)](https://github.blog/changelog/2026-07-17-copilot-code-review-customization-and-configurability-improvements/)
- [AGENTS.md convention](https://github.com/agentsmd/agents.md)
