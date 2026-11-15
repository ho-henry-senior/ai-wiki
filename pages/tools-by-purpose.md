---
type: reference
summary: Selected examples of deterministic repository tools, grouped by purpose.
---

# Observed tools by purpose

This compact reference preserves examples observed in Node.js/JavaScript, Node.js/TypeScript, and Python repositories. It is not an exhaustive catalog, a recommendation, or a checklist of tools every repository needs.

Start with the tools a repository already uses. For guidance on whether to add a task interface and how to document its contract, see [delegating repository tasks to tools](agent-tool-delegation.md) and the [task-interface contract](../concepts/task-interface-contracts.md).

| Purpose                                 | Examples observed                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Run tests                               | Jest and Mocha in Node.js projects; Python `unittest` in REST API and queue-consumer projects |
| Check types and code quality            | TypeScript type checks, ESLint, Ruff, and mypy                                                |
| Check or apply formatting               | Prettier and Ruff formatting; template-format checks in a site project                        |
| Validate templates and containers       | Template lint/format checks and Dockerfile lint                                               |
| Check code hygiene                      | Unused-code checks                                                                            |
| Run dependency and security diagnostics | Dependency audits, Trivy filesystem scans, and Semgrep scans                                  |

The examples are illustrative, not endorsements. A tool's usefulness and place in routine verification depend on the repository and the quality of its results.
