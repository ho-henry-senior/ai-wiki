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

Make the checks discoverable through the repository's existing command interface. Provide a focused command for testing one file or case, and a full verification command to run before handoff. Add a task runner such as Just only when existing commands are scattered or hard to invoke.

On the next task, check whether the agent uses a focused command while editing and runs the full gate before handoff.

Checks raise the standard of the code cheaply; Alignment makes it the right code.

More detail: [Give agents a command interface with Just](justfile-agent-workflows.md), [enable agents to run repository commands](../alignment/agent-tool-delegation.md), and [local checks and tools](../../reference/local-development-tools.md).
