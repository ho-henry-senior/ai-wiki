# Making the most of agents

Practical guidance for developers using AI agents, mostly GitHub Copilot.

## Start here

Three changes worth making first, in this order. Each is small enough to try today.

1. **Show the agent how to work in your repository.** Give it named commands for focused tests and final checks (for example, in a `justfile`), then tell it when to use them in `AGENTS.md`. That saves time and tokens otherwise spent discovering the workflow. See [give agents a command interface with Just](content/goals/economy/justfile-agent-workflows.md) and [write repository instructions in AGENTS.md](content/goals/alignment/repository-instructions.md).
2. **Agree on the problem before delegating the solution.** An agent can build a convincing solution to the wrong problem. Ask it to challenge your assumptions and question missing requirements, then draft a specification. Review and agree that specification before asking the agent to create issues and implement them. See [define, steer, and verify a task](content/goals/alignment/define-and-verify-tasks.md).
3. **Limit what the agent can do.** A mistake or an injected instruction does harm through the tools and access the agent has, and through changes it leaves for CI or other people to run, so limit those. Turn on the sandbox on your computer, or check the cloud agent's settings. See [security](content/goals/security/README.md).

## By goal

- **[Alignment](content/goals/alignment/README.md)** — Solve the problem you intended.
- **[Economy](content/goals/economy/README.md)** — Spend less time and fewer tokens.
- **[Security](content/goals/security/README.md)** — Limit what an agent can reach and do.
- **[Traceability & Trust](content/goals/traceability/README.md)** — Leave a record others can follow, and review changes you can rely on.

## Look something up

- [Agent data-flow checklist](content/reference/agent-data-flow-checklist.md) — review an agent setup before sensitive work.
- [Glossary](content/reference/glossary.md) — terms used across the wiki.
- Indexes of every [page](content/README.md), [concept](content/concepts/README.md), [slide](content/slides/README.md), and [source](content/sources/README.md).

