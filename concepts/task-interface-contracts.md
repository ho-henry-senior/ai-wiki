---
type: pattern
summary: A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
---

# Task names need explicit contracts

A task named `verify` or `check` has no universal meaning. Its usefulness depends on a repository-specific contract that tells people and agents what it actually does.

## What the contract should explain

- What is checked or changed, and how to select a narrower check.
- Prerequisites and likely runtime or cost.
- Whether the command is read-only or modifies files.
- Whether a failure is a blocking gate or a diagnostic requiring interpretation.

For example, `format-check` might report formatting differences without edits, while `format` rewrites files. A dependency audit may be a useful diagnostic even when baseline findings make it unsuitable as a clean routine gate.

Keep executable commands in canonical scripts or task-runner recipes. Documentation should explain how to choose and interpret them rather than duplicate their underlying shell commands.

These distinctions are useful choices, not mandatory task tiers. Prefer the repository's existing interface over an extra wrapper unless the wrapper adds discoverability or a stable contract.

## Evidence and applications

- [Repository Justfile observations](../sources/repository-justfiles.md) — local examples of focused checks, routine gates, diagnostics, and mutating commands.
- Applied in [delegating repository tasks](../pages/agent-tool-delegation.md), [the Justfile pattern](../pages/justfile-as-agent-facing-task-interface.md), and [tool choices](../pages/tools-by-purpose.md).
