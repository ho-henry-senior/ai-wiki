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

### Daily reviews

The [daily wiki review](.github/workflows/daily-wiki-review.md) uses [GitHub Agentic Workflows](https://github.github.com/gh-aw/) and Copilot to propose small content improvements. It runs daily at a compiler-selected UTC time or manually from Actions, only on the default branch. An open PR with the `[wiki-review]` title prefix pauses further reviews until it is merged or closed. The agent also checks prior review PRs; duplicate detection is best-effort, not an exactly-once guarantee.

Reviews use the existing skill, check the baseline before starting, and must run `just verify` after their edits before requesting a draft PR. Safe outputs restrict patches to the root topic map and Markdown under `pages/`, `concepts/`, and `sources/`, with at most 12 changed files. Policies, instructions, automation, tooling, and raw archives are outside the edit scope. Nothing merges automatically. Reviews report their actual coverage and evidence; uncertain claims are left unchanged.

Each review has a 100-AI-credit inference budget split between the main agent (80) and threat detection (20). The agent has a 20-minute execution timeout and a 40-turn limit. A per-user 24-hour guardrail also uses 100 credits; it checks prior usage at activation rather than reserving a shared daily allowance. These are usage guardrails, not a hard dollar billing cap: an in-flight request can exceed the remaining budget, and GitHub Actions runner charges are separate. See [the budget reference](https://github.github.com/gh-aw/reference/cost-management/). Failed agent runs or failed threat detection block PR publication.

Before the first run:

1. Add the source workflow and generated `.lock.yml` to the default branch. GitHub Actions executes the generated file.
2. Follow [Copilot authentication for personal repositories](https://github.github.com/gh-aw/reference/auth/#copilot_github_token): create a fine-grained PAT owned by your user account with the **Copilot Requests: Read** account permission, and store it as the Actions repository secret `COPILOT_GITHUB_TOKEN`. Enter it directly in GitHub or with `gh secret set COPILOT_GITHUB_TOKEN`; keep it out of chat and source control. An active Copilot license is required. This workflow deliberately does not use organization-billed `copilot-requests: write`.
3. In repository **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Keep the default token permissions read-only; only compiler-managed publication and reporting jobs carry repository write permissions, not the agent. The workflow never requests PR approval.
4. Manually run **Daily wiki review** from Actions and inspect its logs, credit usage, and any draft PR. A local compilation is not an end-to-end execution test.

PRs use the repository's `GITHUB_TOKEN` and do not automatically trigger other Actions workflows. Review and verify the proposed branch before merging. Missing credentials and other failures are recorded in Actions rather than creating daily failure issues. Disable the workflow in Actions to pause it.

To change the automation, edit its Markdown source, then run `gh aw compile daily-wiki-review --validate` with the [gh-aw CLI extension](https://github.github.com/gh-aw/setup/quick-start/) and commit both source and regenerated lock file. The initial lock was compiled with gh-aw v1.0.1. `just verify` includes the workflow Markdown; compilation separately checks the generated Actions configuration.
