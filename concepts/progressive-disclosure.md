---
type: pattern
summary: Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources.
status: established
---

# Load context through focused entrypoints

Give an agent enough context to find what it needs, rather than loading every instruction and reference for every task. This practice is often called **progressive disclosure**.

For example, a repository entrypoint can identify the project, point to its task interface, and explain when to read its architecture or release guidance. A release task loads release detail; an unrelated documentation edit need not.

## Keep navigation useful

Use descriptive links with enough context to show when their targets matter. Keep each detailed explanation in a canonical location, near the concern it describes, and update incoming links when it moves. Indexes should help readers and agents choose a path, not require them to open every file.

Small files alone do not achieve this: unclear filenames and disconnected fragments merely move the search burden. Keep the example and caveats needed to understand a concept together.

## Limits

A link is not a guarantee of automatic loading. Some instruction formats eagerly import referenced files; others leave ordinary links for an agent to follow. Verify the actual harness behavior, and keep essential requirements visible at the appropriate entrypoint.

## Apply it

- [Give Copilot repository instructions](../pages/copilot-repository-instructions.md) with a short main file, and path-specific files that load only for matching code.
- Place instructions, reference material, and on-demand skills in a [discoverable repository structure](../pages/agent-facing-repository-structure.md).

## Sources and applications

- [Agent Skills specification: Progressive disclosure](https://agentskills.io/specification#progressive-disclosure) — metadata, on-demand instructions, and supporting resources.
- Applied in [repository context](../pages/repository-context-for-agents.md).
