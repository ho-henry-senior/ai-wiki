# Making the most of agents

Practical guidance for developers using AI agents, focusing on GitHub Copilot.

## Start here

1. **Prepare your repository for agents.** Add an `AGENTS.md` as a shared entry point for the agent's essential instructions. Give it the facts it cannot infer reliably—schemas, connections between systems, past decisions, and known anomalies. Keep the entry point short and link to details when needed: this is [progressive disclosure](content/concepts/progressive-disclosure.md). Give the agent a discoverable command interface, such as a `justfile`, so it knows what it can run and how to check its work.

   See [repository instructions](content/goals/alignment/repository-instructions.md), [repository context](content/goals/alignment/repository-context-for-agents.md), and [command interfaces with Just](content/goals/economy/justfile-agent-workflows.md).
2. **Agree on the problem before delegating the solution.** An agent can build a convincing solution to the wrong problem. Ask it to challenge your assumptions and question missing requirements, then draft a specification. Review and agree that specification before asking the agent to create issues and implement them.

   See [define, steer, and verify a task](content/goals/alignment/define-and-verify-tasks.md).
3. **Limit what the agent can do.** A mistake or an injected instruction does harm through the tools and access the agent has, and through changes it leaves for CI or other people to run, so limit those. Turn on the sandbox on your computer, or check the cloud agent's settings.

   See [security](content/goals/security/README.md).

## By goal

- **[Alignment](content/goals/alignment/README.md)** — Solve the problem you intended.
- **[Economy](content/goals/economy/README.md)** — Spend less time and fewer tokens.
- **[Security](content/goals/security/README.md)** — Limit what an agent can reach and do.
- **[Traceability & Trust](content/goals/traceability/README.md)** — Leave a record others can follow, and review changes you can rely on.

## Look something up

- [Agent data-flow checklist](content/reference/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- Indexes of every [page](content/README.md), [concept](content/concepts/README.md), [slide](content/slides/README.md), and [source](content/sources/README.md).

