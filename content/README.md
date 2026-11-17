# Authored pages

Articles, applied patterns, reference catalogs, and checklists for AI-assisted software work.

- [Alignment](goals/alignment/README.md) — core advice for matching work to the intended outcome.
- [Economy](goals/economy/README.md) — core advice for using time and tokens effectively without sacrificing quality or security.
- [Security](goals/security/README.md) — limit what an agent can reach and do, starting from where its tools run.
- [Traceability & Trust](goals/traceability/README.md) — developing core advice for keeping a record of agent work and reviewing changes you can rely on.
- [Secure a local coding agent](goals/security/local-agent-security.md) — Copilot CLI, app, and editor: sandbox, tool and URL permissions, credentials.
- [Secure the Copilot cloud agent](goals/security/cloud-agent-security.md) — what GitHub enforces, and the secrets, firewall, MCP, and approval settings you set.
- [Sandbox a local coding agent](goals/security/local-agent-sandboxing.md) — turn on Copilot's local sandbox and prove the limits are enforced.
- [Prompt injection in coding-agent workflows](goals/security/prompt-injection-coding-agents.md) — treat untrusted content as data rather than authority.
- [Choose a model and control cost](goals/economy/choose-a-model-and-control-cost.md) — how Copilot charges for tokens, which model tier to use, and how to cap a session.
- [Define, steer, and verify a task](goals/alignment/define-and-verify-tasks.md) — write the task, hand it to Copilot, steer it, and check the result.
- [AI glossary](reference/glossary.md) — practical definitions of foundational AI and current generative AI terms.
- [How models and harnesses interact](goals/economy/model-harness-interaction.md) — the tool-call loop, message structure, session state, and context limits.
- [Agent data-flow checklist](reference/agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [Furnish repositories with context for agents](goals/alignment/repository-context-for-agents.md) — developing guidance for prioritizing useful repository context without taking on unnecessary documentation.
- [A structure for agent-facing repositories](goals/alignment/agent-facing-repository-structure.md) — a map of where instructions, skills, commands, and Copilot files go, linking to each page.
- [Write repository instructions in AGENTS.md](goals/alignment/repository-instructions.md) — what to put in it, which Copilot features and other agents read it, and how to fill Copilot's gaps.
- [Let the agent run your repository's commands](goals/alignment/agent-tool-delegation.md) — list commands in `AGENTS.md`, examples of what to list, and setting up the Copilot cloud agent to run them.
- [Give agents a command interface with Just](goals/economy/justfile-agent-workflows.md) — advertise recipes, run single tests, compose checks, and define handoff gates.
- [Local checks and tools for coding agents](reference/local-development-tools.md) — a reference catalogue of testing, linting, unused-code, container and security tools.
- [Choose and add skills](goals/economy/useful-skills.md) — when a skill is worth adding, where Copilot finds skills, and candidates to evaluate.
- [From agile roles to agent-assisted workflows](articles/agent-role-boundaries.md) — a perspective on familiar responsibilities and handoffs in an agent-assisted workflow.
- [Case study: a lo-fi software factory](articles/lo-fi-software-factory-case-study.md) — a local agent workflow, its observed results, and limitations.
