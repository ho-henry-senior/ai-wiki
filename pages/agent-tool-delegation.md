---
type: pattern
summary: List the commands the agent should run, with what each does and whether it changes files, so it runs your checks instead of guessing; give the Copilot cloud agent the dependencies to run them.
status: established
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

Each line says what the command covers, whether it changes files, and whether a failure blocks handoff or needs judgment. Those are the parts of a [task contract](../concepts/task-interface-contracts.md); the command's name alone does not tell an agent what `verify` or `check` does.

Point to commands; do not copy their implementation into instructions, where it goes stale.

## Use what the repository already has

If package scripts or a Makefile already work, list those. Add a task runner only when commands are scattered or hard to invoke. This wiki uses [Just](https://just.systems/), and `just --list` shows each recipe with its comment:

```just
# Test and check the sitemap, Markdown formatting, and local links without modifying files.
verify:
    npm run verify

# Apply Markdown formatting (modifies files).
format:
    npm run format
```

## Give the Copilot cloud agent what it needs to run them

The cloud agent works in a fresh GitHub Actions environment, so it can only run your commands if their dependencies are installed. Add `.github/workflows/copilot-setup-steps.yml` with a single job named `copilot-setup-steps` that installs them, for example with `npm ci`. Copilot runs it before the agent starts, and code review reuses it by default. It only takes effect once it is on the default branch. If a setup step fails, the agent starts anyway with whatever was installed.

Checked 15 November 2026 against GitHub's documentation on [customizing the cloud agent's environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment).

## Commands worth listing

| Purpose                               | Examples seen in Node.js and Python repositories |
| ------------------------------------- | ------------------------------------------------ |
| Run one test or all tests             | Jest, Mocha, Python `unittest`                   |
| Check types and lint                  | TypeScript, ESLint, Ruff, mypy                   |
| Check or fix formatting               | Prettier, Ruff                                   |
| Validate templates and images         | Template lint, Dockerfile lint                   |
| Find unused code                      | Unused-code checks                               |
| Report dependency and security issues | Dependency audit, Trivy, Semgrep                 |

List diagnostics such as audits and scans separately from the check that must pass, because they often report findings that already exist. More examples are in the [repository Justfile notes](../sources/repository-justfiles.md).

A command list tells the agent what it can run, not how the system works. For that, see [repository context for agents](repository-context-for-agents.md).

**Next:** [write your next task down](define-and-verify-tasks.md), step 2 of [start here](../README.md#start-here).
