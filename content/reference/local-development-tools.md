---
type: reference
summary: Local development tools agents can run for focused tests, linting, type checks, unused code, dependency issues, containers and security scans.
status: established
lane: reference
order: 4
tags:
  - Commands
  - Testing
---

# Local checks and tools for coding agents

Give an agent commands that run the project's existing checks rather than asking it to discover or reinvent them. This is a **menu of examples**, not a recommendation to install every tool. Choose tools for your language and repository, expose the commands you use through package scripts, Make, or a [Justfile](../goals/economy/justfile-agent-workflows.md), and describe when to run them in `AGENTS.md`.

| Purpose                         | Example tools                                                | What the agent can learn                                                            |
| ------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Run one test or the full suite  | pytest, Python `unittest`, Jest, Vitest, Mocha               | Whether the relevant behaviour passes; focused runs reduce feedback time and output |
| Lint code                       | Ruff, ESLint, Pylint                                         | Rule violations and likely mistakes                                                 |
| Check types                     | mypy, pyright, TypeScript `tsc`                              | Type inconsistencies before runtime                                                 |
| Check formatting                | Ruff formatter, Prettier, Black                              | Whether code follows the repository's formatting rules                              |
| Find unused or redundant code   | Knip (JS/TS), Vulture (Python), ESLint unused-variable rules | Candidates for unused files, exports, imports or code; investigate before deleting  |
| Scan for security patterns      | Semgrep, Bandit (Python)                                     | Potential security problems; findings require review                                |
| Audit dependencies              | `npm audit`, `pip-audit`, OSV-Scanner                        | Known vulnerabilities in dependencies                                               |
| Scan files and container images | Trivy                                                        | Vulnerabilities, misconfiguration or secrets, depending on the scan mode            |
| Lint Dockerfiles                | Hadolint                                                     | Dockerfile mistakes and maintainability issues                                      |
| Validate other project files    | Template linters, YAML linters, Markdown/link checkers       | Errors in non-code artifacts                                                        |

## Give agents focused commands

Prefer a recipe that accepts a test file or test identifier, for example:

```sh
python -m pytest tests/test_orders.py -q
python -m pytest tests/test_orders.py::test_total -q
npx vitest run src/orders.test.ts
```

These are examples, not universal commands: flags and test selectors depend on the project's runner. The agent should run the smallest check that covers the change during editing, then the required full gate before handoff. See [the Justfile guide](../goals/economy/justfile-agent-workflows.md) for an executable example with parameterised recipes and composition.

## Decide which results block handoff

- **Required checks:** tests, lint, types and formatting checks that the repository expects to pass. Run them in CI as well as locally.
- **Advisory diagnostics:** unused-code reports, security scans and dependency audits may have false positives or pre-existing findings. Record and triage results; do not silently delete code or change dependencies.
- **Mutating tools:** formatters with write flags, auto-fix commands and generators change files. Label them clearly and keep them separate from read-only verification.

A tool's output is evidence, not proof of correctness or security. Document the command's scope, expected runtime, side effects and failure policy in [the agent's command list](../goals/alignment/agent-tool-delegation.md). See also [passing tests are evidence, not proof](../concepts/tests-are-evidence.md).

## Related guidance

- [Let the agent run your repository's commands](../goals/alignment/agent-tool-delegation.md) — advertise commands and their meaning in `AGENTS.md`.
- [Give agents a command interface with Just](../goals/economy/justfile-agent-workflows.md) — discovery, focused tests, composition and gates.
- [Repository Justfile patterns](../sources/repository-justfiles.md) — examples observed in Node.js and Python repositories.
