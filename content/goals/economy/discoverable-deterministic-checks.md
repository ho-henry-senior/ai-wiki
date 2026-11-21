---
type: advice
summary: "Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result."
status: established
lane: goals
goal: economy
order: 2
tags:
  - Economy
  - Repository
  - Testing
---

# Discoverable deterministic checks

Static analysis, linters, type checks, and tests give the same answer every time, and the agent spends tokens only on reading the result; it could approximate some of them by reading code, but more slowly, at greater cost, and less consistently.

Name them in a `justfile`, so the agent does not experiment to find how to run them, with focused recipes, such as one test or one file of tests, for while it edits, and a full gate to run once before handoff.

On the next task, check whether the agent uses a focused command while editing and runs the full gate before handoff.

Checks raise the standard of the code cheaply; Alignment makes it the right code.

More detail: [Give agents a command interface with Just](justfile-agent-workflows.md), [let the agent run your repository's commands](../alignment/agent-tool-delegation.md), and [local checks and tools](../../reference/local-development-tools.md).
