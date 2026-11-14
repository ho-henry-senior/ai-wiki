# Making the most of agents

Practical guidance for people using AI agents in software work. Start with the outcome you want, explore a short slide, or browse the full collection.

## Topic map

These goals overlap: the same practice can help in more than one way. [Design goals](DESIGN-GOALS.md) explain the intended outcomes and scope.

### Alignment

Get results that match what you intended. Clarify the task, give agents useful context, and check the result against the request.

- [Understand how models and harnesses interact](pages/model-harness-interaction.md)
- [Give agents repository context](pages/repository-context-for-agents.md)
- [Check behavior against requirements](pages/unit-tests-in-the-age-of-ai.md)
- [Passing tests are evidence, not proof](concepts/tests-are-evidence.md) · [slide](slides/tests-are-evidence.md)
- [Improve candidates with hill climbing](concepts/hill-climbing.md)

Here, alignment means matching a specific task's intended outcome; see the broader [AI alignment definition](pages/glossary.md#alignment).

### Economy

Get useful results with less time and fewer tokens, including by reducing rework and delegating repeatable work to tools.

- [Delegate repository tasks to tools](pages/agent-tool-delegation.md)
- [Expose a discoverable task interface](pages/justfile-as-agent-facing-task-interface.md)
- [Make task contracts explicit](concepts/task-interface-contracts.md)
- [Load context through focused entrypoints](concepts/progressive-disclosure.md)
- [Choose tools by purpose](pages/tools-by-purpose.md)
- [Balance iterative improvement against its cost](concepts/hill-climbing.md)

### Traceability

Understand what was requested, what changed, and the evidence and decisions behind it.

- [Define roles and delivery handoffs](pages/agent-role-boundaries.md)
- [Understand the model–harness tool loop](concepts/tool-call-loop.md) · [slide](slides/tool-call-loop.md)
- [Distinguish session history from active context](concepts/session-history-vs-context.md)
- [Review tests against intended behavior](pages/unit-tests-in-the-age-of-ai.md)
- [Understand skills, profiles, and tools](concepts/skills-profiles-and-tools.md)

### Security

Protect sensitive information and limit unsafe actions in agent-assisted work.

- [Understand sensitive-data risks](pages/sensitive-data-in-agent-workflows.md)
- [Review an agent's data flow](pages/agent-data-flow-checklist.md)
- [A worktree is not a sandbox](concepts/worktrees-not-sandboxes.md) · [slide](slides/worktrees-not-sandboxes.md)
- [Instructions are not enforced controls](concepts/instructions-vs-controls.md)
- [Local MCP does not mean local-only data](concepts/local-and-remote-mcp.md)

## Browse the material

- [Short slides](slides/README.md) — concise, standalone ideas.
- [Reusable concepts](concepts/README.md) — focused explanations with examples, caveats, and sources.
- [Authored pages](pages/README.md) — articles, patterns, and checklists.
- [AI glossary](pages/glossary.md) — shared vocabulary for AI and agents.
- [Source index and records](sources/README.md) — provenance and research notes.
- [From CLI agents toward a lightweight software factory](pages/cli-to-software-factory.md) — an exploratory guided path.
