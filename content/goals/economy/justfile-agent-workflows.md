---
type: how-to
summary: Use a justfile as a discoverable command interface for coding agents, with focused tests, composed checks, and clear handoff gates.
status: established
lane: guides
goal: economy
tags:
  - Economy
  - Repository
---

# Give agents a command interface with Just

An agent can inspect a repository to discover how to test and check it, but that exploration takes time and tokens and may produce the wrong command. Give it a small, documented interface instead. A `justfile` names the commands; `just --list` advertises them; `AGENTS.md` tells the agent **when** to run each one. The principle matters more than the runner: existing package scripts or Make targets work too.

## Start with focused tests

Make the cheap, focused check easy to run while the agent is changing code. Reserve the full suite for the final gate. For a Python project using pytest:

```just
# Show the available commands.
default:
    @just --list

# Run one test file, or a node ID such as tests/test_orders.py::test_total.
test target:
    python -m pytest "{{target}}" -q

# Run the complete test suite.
test-all:
    python -m pytest tests/ -q

# Check formatting without modifying files.
format-check:
    python -m ruff format --check .

# Check lint rules.
lint:
    python -m ruff check .

# Final read-only gate before handoff; stop if any check fails.
verify: test-all lint format-check

# Apply formatting (changes files).
format:
    python -m ruff format .
```

Examples: `just test tests/test_orders.py` runs one file; `just test tests/test_orders.py::test_total` runs one test; `just verify` runs the complete gate. Save the file as `justfile` at the repository root; it assumes Just, pytest and Ruff are installed. `format` changes files, while `format-check` does not. Adapt the recipes to your project rather than adding tools just for the example.

A focused recipe should accept a **test path or test identifier**, not require the agent to edit the `justfile` for each test. The exact syntax varies by runner: Jest, Vitest, and `unittest` use different selectors. If test identifiers can come from untrusted input, validate them before interpolating them into shell commands.

## Compose commands into gates

Keep recipes small and give them one clear purpose. Compose a `verify` recipe from the checks that must pass before handoff. A failing dependency stops the gate; don't hide failures with `|| true`.

Separate three kinds of work:

- **Focused checks** while editing: one test file or test case, with fast feedback and short output.
- **Handoff gates**: the full tests, lint, type checks, and other checks that must pass before declaring the task complete.
- **Diagnostics and fixes**: audits may need triage; formatters and generators change files. Don't silently include mutating or advisory commands in a read-only gate.

A Just recipe is a convenient workflow interface, **not a security boundary**. Enforcement still belongs in CI, branch protection, permissions, and sandboxing. Run the same required checks in CI so an agent cannot satisfy the gate merely by claiming it did.

## Advertise the interface to the agent

Keep the instructions short and link to the executable recipes rather than copying their implementation:

```markdown
## Commands

- Run `just --list` to see supported commands.
- While editing, use `just test tests/test_orders.py` or a single test ID.
- Before handoff, run `just verify`; it is read-only and must pass.
- `just format` changes files, if that recipe exists; use it deliberately.
```

Describe the effect of each command, whether it changes files, and whether failure blocks handoff. This is what lets an agent choose the right tool without reconstructing the workflow from CI files and package configuration.

## More examples

Add Just only when it improves on the runner you already have; [enable agents to run repository commands](../alignment/agent-tool-delegation.md#use-what-the-repository-already-has) explains when.

For options beyond the example's pytest and Ruff commands, see the [local checks and tools for coding agents](../../reference/local-development-tools.md).

The wiki's own [justfile](../../../justfile) is a working example of named build and verification commands. [Just's own justfile](https://github.com/casey/just/blob/master/justfile) shows focused test filters and a broader CI recipe.
