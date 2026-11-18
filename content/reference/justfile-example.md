---
type: reference
summary: A copyable Justfile for discoverable agent commands, focused checks and a read-only handoff gate.
status: developing
lane: reference
order: 8
tags:
  - Commands
  - Testing
---

# Justfile example: discoverable checks

**Use this asset** when an agent needs a short, named set of commands for editing and verification. This is an _adaptable example_ for a Python project using pytest and Ruff, not a copy of any external repository.

## Copy and adapt: `justfile`

```just
# Show the command menu.
default:
    @just --list

# Run one test file or pytest node ID.
test target:
    python -m pytest "{{target}}" -q

# Run the complete suite.
test-all:
    python -m pytest tests/ -q

# Check formatting without changing files.
format-check:
    python -m ruff format --check .

# Check lint rules.
lint:
    python -m ruff check .

# Run the required checks before handoff.
verify: test-all lint format-check

# Apply formatting (changes files).
format:
    python -m ruff format .
```

Save as `justfile` at the repository root. Install Just, pytest and Ruff, then run `just --list`, `just test tests/test_orders.py` and `just verify`. Replace the test runner, paths and gate with your project's actual checks. The `format` command **modifies files**; `format-check` does not.

## Real files to inspect

- [This wiki's justfile](https://github.com/ho-henry-senior/ai-wiki/blob/main/justfile) — small named recipes; `verify` delegates to the repository's npm checks.
- [Just's own justfile](https://github.com/casey/just/blob/master/justfile) — larger production example with grouped recipes, focused test filters and separate release commands.

The code above is a standalone teaching example. The source links are **real-world alternatives**, not the origin of this exact snippet. For the principle behind the arrangement, see [give agents a command interface with Just](../goals/economy/justfile-agent-workflows.md).
