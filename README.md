# Making the most of agents

A working knowledge base for people building with agents and people building agent tools. It brings together practical guidance, concepts, examples, and source material. The topic map is provisional: change it as the collection develops.

See [the design goals](DESIGN-GOALS.md) for the wiki's purpose, scope, and intended organization.

Articles connect ideas into a narrative; [reusable concepts](concepts/README.md) explain individual ideas in depth. Read an article for a guided discussion or follow its concept links for focused reference.

## Topic map

These are starting lenses, not a complete taxonomy. Add links to authored pages as they emerge. A page may appear under more than one topic; keep only one copy of the page.

### Repository context and readiness

Making one repository or a set of repositories easier for agents to understand and work in: domain and architecture context, decisions, inter-repository contracts, diagrams, and deterministic tools.

- [Furnish repositories with context for agents](pages/repository-context-for-agents.md)
- [A structure for agent-facing repositories](pages/agent-facing-repository-structure.md)
- [AGENTS.md as a shared agent entrypoint](pages/agents-md-as-shared-entrypoint.md)
- [Get more from agents by delegating repo tasks to tools](pages/agent-tool-delegation.md)
- [A Justfile as an agent-facing task interface](pages/justfile-as-agent-facing-task-interface.md)
- [Load context through focused entrypoints](concepts/progressive-disclosure.md)
- [Task names need explicit contracts](concepts/task-interface-contracts.md)

### Shaping work for agents

Preparing work for implementation, including specifications, domain understanding, and ways to use agents to discover or clarify requirements.

- [Unit tests in the age of AI](pages/unit-tests-in-the-age-of-ai.md)
- [Passing tests are evidence, not proof](concepts/tests-are-evidence.md)

### Agent capabilities and configuration

Harness features, tools, skills, and agent profiles: what they are, when they help, and how to make them discoverable and usable.

- [How models and harnesses interact](pages/model-harness-interaction.md)
- [Tool choices by purpose](pages/tools-by-purpose.md)
- [Skills as a changing capability layer](pages/skills-as-capabilities.md)
- [Useful skills right now](pages/useful-skills.md)
- [Skills and agent profiles](pages/skills-and-agent-profiles.md)
- [Skills, profiles, and tools have different jobs](concepts/skills-profiles-and-tools.md)

### Agent execution and coordination

Working effectively with agents, from CLI use and token efficiency to delegation, distinct roles, and multi-agent workflows.

- [Get more from agents by delegating repo tasks to tools](pages/agent-tool-delegation.md)
- [A Justfile as an agent-facing task interface](pages/justfile-as-agent-facing-task-interface.md)
- [Define agent role responsibilities and boundaries](pages/agent-role-boundaries.md)
- [Unit tests in the age of AI](pages/unit-tests-in-the-age-of-ai.md)
- [The model requests; the harness acts](concepts/tool-call-loop.md)
- [Session history is not active context](concepts/session-history-vs-context.md)

### Security in agent-assisted work

Sensitive-data exposure, tool permissions, and controls for using agents safely.

- [Sensitive data in agent workflows](pages/sensitive-data-in-agent-workflows.md)
- [Agent data-flow checklist](pages/agent-data-flow-checklist.md)
- [Local MCP does not mean local-only data](concepts/local-and-remote-mcp.md)
- [Inference, retention, and training are separate](concepts/inference-retention-training.md)
- [Secrets can leak through tool output](concepts/secrets-in-tool-output.md)
- [A worktree is not a sandbox](concepts/worktrees-not-sandboxes.md)
- [Instructions are not enforced controls](concepts/instructions-vs-controls.md)

### Shared vocabulary

- [AI glossary](pages/glossary.md) — practical definitions of foundational AI and current generative AI terms.

## Guided path

- [From CLI agents toward a lightweight software factory](pages/cli-to-software-factory.md) — an exploratory path linking topics as the material develops, not a prescribed maturity model.

## Browse the material

- [Authored pages](pages/README.md)
- [Reusable concepts](concepts/README.md)
- [Source index and records](sources/README.md)

## Maintaining the wiki

Requires [Just](https://just.systems/), Node.js 22 or later, and npm. Run `just --list` to discover tasks, `just setup` to install the pinned development tools, then `just verify` to check Markdown formatting and internal links, including heading anchors. Checks include `concepts/` and repository skills under `.agents/skills/`. External URLs and raw material under `data/` are excluded.

Use `just format` to apply formatting or `just links` to check local links alone. Formatting preserves prose line breaks and leaves embedded code examples unchanged. Recipes delegate to npm scripts, which can also be run directly. See [the agent entrypoint](AGENTS.md) for context pointers and [page conventions](pages/README.md) when adding content.

For a periodic structural or freshness review, use [the wiki-review skill](.agents/skills/wiki-review/SKILL.md). Reviews report their coverage and evidence; a structural review does not imply that every external claim has been reverified.

The dependency overrides pin patched `glob` and `minimatch` releases while the link-checking toolchain still requests older versions.
