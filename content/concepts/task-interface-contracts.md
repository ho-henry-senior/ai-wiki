---
type: pattern
summary: Describe each command's scope, cost, side effects, and whether failure blocks handoff; its name alone does not tell an agent what it does.
status: established
lane: articles
goal: economy
order: 23
tags:
  - Commands
---

# Task names need explicit contracts

Describe what each command does; do not rely on its name. A command called `verify` or `check` means something different in every repository, and an agent that has to guess may get it wrong in either direction: skipping a check it should have run, or running one that rewrites files when it only meant to look.

## What to say about each command

- **Scope:** what it checks or changes, and how to run a narrower version.
- **Cost:** prerequisites and roughly how long it takes.
- **Side effects:** whether it only reads or also rewrites files.
- **Meaning of failure:** whether a failure blocks handoff, or is a diagnostic that needs judgment.

For example, `format-check` reports formatting differences, while `format` rewrites files. A dependency audit can still help as a diagnostic even though existing findings mean it will not pass cleanly.

## Evidence and applications

- [Repository Justfile notes](../sources/repository-justfiles.md): focused checks, routine gates, diagnostics, and mutating commands in several repositories.
- Applied in [let the agent run your repository's commands](../goals/alignment/agent-tool-delegation.md).
