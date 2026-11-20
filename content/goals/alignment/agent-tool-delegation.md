---
type: pattern
summary: Why an agent that can run your checks does better than one that guesses, how to list the commands with what each does, and how to give the Copilot cloud agent the dependencies to run them.
status: established
lane: articles
goal: alignment
order: 3
checked: 2026-11-15
tags:
  - Copilot cloud agent
  - AGENTS.md
  - Commands
---

# Let the agent run your repository's commands

List the commands the agent should run in `AGENTS.md`, with what each one checks and whether it changes files. The agent then runs your tests and checks instead of guessing commands or approximating a check by reading code, which is slower, costs more tokens, and is less reliable.

## Start with this

Add a section like this to `AGENTS.md`, using your repository's real commands:

```markdown
## Commands

- `npm test -- path/to/file.test.ts` runs one test file. Use it while you work.
- `npm run verify` runs all tests, type checks, lint, and link checks. It does not change files. Run it before you finish.
- `npm run format` rewrites files to fix formatting.
- `npm audit` reports dependency issues. Existing findings are expected: report new ones, don't fix them.
```

Each command needs more than a name: state **scope** (including a narrower version), **cost** (prerequisites and approximate runtime), **side effects** (read-only or mutating), and **what failure means** (blocks handoff or needs judgment). For example, `format-check` reports differences while `format` rewrites files; an audit can still identify new findings when existing ones prevent a clean result. Never assume that `verify` or `check` means the same thing across repositories.

Point to commands; do not copy their implementation into instructions, where it goes stale.

## Use what the repository already has

If package scripts or a Makefile already work, list those. Add a task runner only when commands are scattered or hard to invoke. This wiki uses [Just](https://just.systems/), and `just --list` shows each recipe with its comment. For a worked example of **single-test execution, composition, and final gates**, see [give agents a command interface with Just](../economy/justfile-agent-workflows.md):

```just
# Test and check the sitemap, Markdown formatting, and local links without modifying files.
verify:
    npm run verify

# Apply Markdown formatting (modifies files).
format:
    npm run format
```

## Give the Copilot cloud agent what it needs to run them

The cloud agent works in a fresh GitHub Actions environment, so it can only run your commands if their dependencies are installed. Add `.github/workflows/copilot-setup-steps.yml` with a single job named `copilot-setup-steps` that installs them, for example with `npm ci`. Copilot runs it before the agent starts, and code review reuses it by default. It only takes effect once it is on the default branch.

If a setup step fails, the agent starts anyway with whatever was installed, and may then fall back to guessing. Check the setup log when results look wrong.

Setup steps also run outside the cloud agent's firewall; see [secure the Copilot cloud agent](../security/cloud-agent-security.md).

Source: GitHub's documentation on [customizing the cloud agent's environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment).

## Commands worth listing

| Purpose                               | Examples seen in Node.js and Python repositories                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Run one test or all tests             | Jest, Mocha, Python `unittest`                                                                 |
| Check types and lint                  | TypeScript, ESLint, Ruff, mypy                                                                 |
| Check or fix formatting               | Prettier, Ruff                                                                                 |
| Validate templates and images         | Template lint, Dockerfile lint                                                                 |
| Find unused code                      | [Knip](https://knip.dev/) (JS/TS), [Vulture](https://github.com/jendrikseipp/vulture) (Python) |
| Report dependency and security issues | Dependency audit, Trivy, Semgrep                                                               |

List diagnostics such as audits and scans separately from the check that must pass, because they often report findings that already exist. For a broader catalogue covering Semgrep, Hadolint, unused-code tools and more, see [local checks and tools for coding agents](../../reference/local-development-tools.md). For an adaptable command interface and links to real Justfiles, see the [Justfile example](../../reference/justfile-example.md).

A command list tells the agent what it can run, not how the system works. For that, see [repository context for agents](repository-context-for-agents.md).

**Next:** [write your next task down](define-and-verify-tasks.md), step 2 of [start here](../../../README.md#first-steps).
