# Making the most of agents

Practical guidance for developers using AI agents, focusing on GitHub Copilot.

## Goals

- **[Alignment](content/goals/alignment/README.md)** — Solve the problem you intended.
- **[Economy](content/goals/economy/README.md)** — Spend less time and fewer tokens.
- **[Security](content/goals/security/README.md)** — Limit what an agent can reach and do.
- **[Traceability & Trust](content/goals/traceability/README.md)** — Leave a record others can follow, and review changes you can rely on.

## Guides

- **[How coding agents work](content/articles/understanding-coding-agents.md)** — an ordered guide to the model, harness and tool-call loop.

## First steps

1. **[Prepare your repository for agents](content/goals/alignment/agent-facing-repository-structure.md).** Put essential instructions in `AGENTS.md`, and document what the code cannot reliably explain, such as schemas and decisions. Keep the entry point short, linking to detail when needed through [progressive disclosure](content/concepts/progressive-disclosure.md). Provide a discoverable command interface such as a `justfile` so the agent can run checks without guessing.

   More detail: [Repository instructions](content/goals/alignment/repository-instructions.md), [repository context](content/goals/alignment/repository-context-for-agents.md), and [command interfaces with Just](content/goals/economy/justfile-agent-workflows.md).

2. **[Agree on the problem before delegating the solution](content/goals/alignment/define-and-verify-tasks.md).** An agent can build a convincing solution to the wrong problem. Have it question your assumptions and missing requirements, then agree on a specification before implementation.

3. **[Limit what the agent can do](content/goals/security/README.md).** Mistakes and injected instructions can cause harm through the agent's tools, permissions, and code run later in CI. Enable the local sandbox or review the cloud agent's access controls.

   More detail: [Secure a local coding agent](content/goals/security/local-agent-security.md) or [secure the Copilot cloud agent](content/goals/security/cloud-agent-security.md).

## References

- [Agent data-flow checklist](content/reference/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- Indexes of every [page](content/README.md), [concept](content/concepts/README.md), [slide](content/slides/README.md), and [source](content/sources/README.md).
