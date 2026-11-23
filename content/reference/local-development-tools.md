---
type: reference
summary: Local development tools agents can run for focused tests, linting, type checks, unused code, dependency issues, containers and security scans.
status: established
lane: reference
order: 4
tags:
  - Repository
  - Testing
---

# Local checks and tools for coding agents

Give an agent commands that run the project's existing checks rather than asking it to discover or reinvent them. This is a **menu of examples**, not a recommendation to install every tool. Choose tools for your language and repository, expose the commands you use through package scripts, Make, or a [Justfile](../goals/economy/justfile-agent-workflows.md), and describe when to run them in `AGENTS.md`.

| Purpose                         | Example tools                                                | What the agent can learn                                                               |
| ------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Run one test or the full suite  | pytest, Python `unittest`, Jest, Vitest, Mocha               | Whether the behaviour you changed passes; focused runs reduce feedback time and output |
| Lint code                       | Ruff, ESLint, Pylint                                         | Rule violations and likely mistakes                                                    |
| Check types                     | mypy, pyright, TypeScript `tsc`                              | Type inconsistencies before runtime                                                    |
| Check formatting                | Ruff formatter, Prettier, Black                              | Whether code follows the repository's formatting rules                                 |
| Find unused or redundant code   | Knip (JS/TS), Vulture (Python), ESLint unused-variable rules | Candidates for unused files, exports, imports or code; investigate before deleting     |
| Scan for security patterns      | Semgrep, Bandit (Python)                                     | Potential security problems; findings require review                                   |
| Audit dependencies              | `npm audit`, `pip-audit`, OSV-Scanner                        | Known vulnerabilities in dependencies                                                  |
| Scan files and container images | Trivy                                                        | Vulnerabilities, misconfiguration or secrets, depending on the scan mode               |
| Lint Dockerfiles                | Hadolint                                                     | Dockerfile mistakes and maintainability issues                                         |
| Validate other project files    | Template linters, YAML linters, Markdown/link checkers       | Errors in non-code artefacts                                                           |

## Related guidance

- [Enable agents to run repository commands](../goals/alignment/agent-tool-delegation.md) — which commands to list in `AGENTS.md`, what each one does, and which results should block handoff.
- [Review, decide and approve](../goals/traceability/review-decide-and-approve.md#inspect-the-change-and-its-evidence) — running these checks yourself when you review an agent's change.
- [Give agents a command interface with Just](../goals/economy/justfile-agent-workflows.md) — focused test recipes, a read-only handoff gate, and keeping diagnostics and file-changing commands out of it.
