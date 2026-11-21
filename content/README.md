# Authored pages

Articles, applied patterns, reference catalogs, and checklists for AI-assisted software work.

Pages are listed here by their section on the website, which their `lane` front matter sets and which can differ from their folder. Focused explanations are also listed in the [concepts index](concepts/README.md).

## Goals

- [Alignment](goals/alignment/README.md) — core advice for matching work to the intended outcome.
  - [Requirements discovery with coding agents](goals/alignment/agent-led-requirements-discovery.md)
  - [Explicit decisions and scope boundaries](goals/alignment/explicit-decisions-and-scope-boundaries.md)
- [Economy](goals/economy/README.md) — core advice for using time and tokens effectively without sacrificing quality or security.
  - [Well-organised repository context](goals/economy/agent-ready-repository-context.md)
  - [Discoverable deterministic checks](goals/economy/discoverable-deterministic-checks.md)
- [Security](goals/security/README.md) — limit what an agent can reach and do, starting from where its tools run.
  - [Excessive agent access](goals/security/excessive-agent-access.md)
  - [Unexpected data exposure](goals/security/unexpected-data-exposure.md)
  - [Prompt injection](goals/security/prompt-injection.md)
  - [Untrusted code execution](goals/security/untrusted-code-execution.md)
- [Trust & Traceability](goals/traceability/README.md) — developing core advice for reviewing changes you can rely on and keeping a record of agent work.

## Guides

- [Agent roles](concepts/skills-profiles-and-tools.md) — what a role is, when to add one, and how it differs from a skill and a tool.
  - [Agile roles in agentic development](articles/agent-role-boundaries.md) — familiar responsibilities and handoffs in an agent-assisted workflow.
  - [How agent roles use skills](reference/agent-roles-directory.md) — original role files showing explicit skill use and possible adaptations.
- [How coding agents work](articles/understanding-coding-agents.md) — an illustrated four-chapter guide to agent components, model requests, the tool-call loop and session context.
  - [Inside a coding agent](articles/inside-coding-agent.md)
  - [What the model receives and returns](articles/model-requests-and-responses.md)
  - [The tool-call loop](concepts/tool-call-loop.md)
  - [Session history and active context](concepts/session-history-vs-context.md)
- [Secure a local coding agent](goals/security/local-agent-security.md) — limits a local agent can't get round, for its commands, its credentials, and what runs outside its sandbox.
  - [Configure the sandbox and tool restrictions](goals/security/local-sandbox-and-tool-restrictions.md) — Copilot CLI, app and VS Code: folders, network, deny rules, and a test that a restriction works.
  - [Protect credentials and sensitive data](goals/security/local-agent-credentials.md) — credential pass-through, a narrow token for Copilot, and keeping secrets out of tool output.
  - [Check integrations and sandbox boundaries](goals/security/local-agent-integrations.md) — what the sandbox doesn't cover, and reviewing MCP servers and repository configuration.
- [Set up a repository for agents](goals/alignment/agent-facing-repository-structure.md) — where agent instructions, skills and commands belong, with a diagram connecting them to tests and CI.
  - [Write repository instructions in AGENTS.md](goals/alignment/repository-instructions.md) — what to put in it, which Copilot features and other agents read it, and how to fill Copilot's gaps.
  - [Repository context for coding agents](goals/alignment/repository-context-for-agents.md) — write down the facts an agent got wrong, near the code they concern.
  - [Enable agents to run repository commands](goals/alignment/agent-tool-delegation.md) — list commands in `AGENTS.md`, and set up the Copilot cloud agent to run them.
  - [Give agents a command interface with Just](goals/economy/justfile-agent-workflows.md) — advertise recipes, run single tests, compose checks, and define handoff gates.
- [Skills](goals/economy/useful-skills.md) — what a skill is, and how to tell whether one is worth adding.
  - [Agent skills directory](reference/agent-skills-directory.md) — built-in, inspected and candidate skills, with credited sources and limitations.
  - [Write a SKILL.md](reference/writing-agent-skills.md) — where Copilot finds skills, the file format, and a complete minimal skill.

## Articles

- [Define, steer, and verify a task](goals/alignment/define-and-verify-tasks.md) — write the task, hand it to Copilot, steer it, and check the result.
- [Choose a model and control cost](goals/economy/choose-a-model-and-control-cost.md) — how Copilot charges for tokens, which model tier to use, and how to cap a session.
- [Secure the Copilot cloud agent](goals/security/cloud-agent-security.md) — what GitHub enforces, and the secrets, firewall, MCP, and approval settings you set.
- [Case study: a lo-fi software factory](articles/lo-fi-software-factory-case-study.md) — a local agent workflow, its observed results, and limitations.
- [The Home Repo pattern for agents working across repositories](articles/home-repo-pattern.md) — a shared starting point for agent context and skills across projects, with access and maintenance limits.

## Reference

- [Agent data-flow checklist](reference/agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [AGENTS.md example: short repository entrypoint](reference/agents-md-example.md) — adaptable instructions with project pointers and checks.
- [Local checks and tools for coding agents](reference/local-development-tools.md) — a reference catalogue of testing, linting, unused-code, container and security tools.
- [Git worktrees for parallel agent work](reference/git-worktrees-for-agents.md) — commands, a diagram, and practical boundaries for separate agent working directories.
- [Agent skills directory](reference/agent-skills-directory.md) — also part of the Skills guide.
- [AI glossary](reference/glossary.md) — definitions of common AI terms and distinctions.
