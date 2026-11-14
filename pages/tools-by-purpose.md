---
type: reference
summary: Considerations for choosing deterministic tools by purpose, with selected examples from Node.js and Python repositories.
---

# Tool choices by purpose

This is a guide to choosing tools for repeatable repository tasks, not an exhaustive catalog or a set of required technologies. The examples come from Node.js/JavaScript and Node.js/TypeScript repositories, plus Python repositories for REST APIs and queue consumers. They illustrate how different stacks can expose similar capabilities through a shared task interface.

Prefer tools that replace bounded, repeatable work with reliable, actionable results. Expose them through [explicit task contracts](../concepts/task-interface-contracts.md), including focused execution, runtime cost, side effects, and whether findings are a routine gate or a diagnostic requiring interpretation.

| Purpose                                 | Examples observed                                                                             | Selection considerations                                                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Run tests                               | Jest and Mocha in Node.js projects; Python `unittest` in REST API and queue-consumer projects | Provide a focused-test option where useful. Full suites may have different cost or coverage behavior; state what each recipe runs.            |
| Check types and code quality            | TypeScript type checks, ESLint, Ruff, and mypy                                                | Choose checks that give actionable feedback in the repository's stack. Make clear which checks are in the routine gate.                       |
| Check or apply formatting               | Prettier and Ruff formatting; template-format checks in a site project                        | Separate read-only checks from commands that rewrite files or apply fixes.                                                                    |
| Validate templates and containers       | Template lint/format checks and Dockerfile lint                                               | Keep repository-specific checks discoverable; document required setup or safety flags where relevant.                                         |
| Check code hygiene                      | Unused-code checks                                                                            | These can be useful, but their gate placement should depend on whether their output is stable and actionable in that repository.              |
| Run dependency and security diagnostics | Dependency audits, Trivy filesystem scans, and Semgrep scans                                  | These may report baseline findings or require triage. Make their diagnostic nature and interpretation clear instead of implying a clean gate. |

The examples are illustrative, not endorsements or a claim that every repository needs every category. For the command-interface pattern and how agents should choose among repository recipes, see [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md).
