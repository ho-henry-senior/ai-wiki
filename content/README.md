# Authored pages

Articles, applied patterns, reference catalogs, and checklists for AI-assisted software work.

Folders organise the source; on the website, each page's `lane` and `goal` front matter decide where it appears. So retrieval-augmented generation and vector stores are articles on the site, though they live in `content/concepts/`.

- [Alignment](goals/alignment/README.md) — core advice for matching work to the intended outcome.
  - [Requirements discovery with coding agents](goals/alignment/agent-led-requirements-discovery.md)
  - [Explicit decisions and scope boundaries](goals/alignment/explicit-decisions-and-scope-boundaries.md)
- [Economy](goals/economy/README.md) — core advice for using time and tokens effectively without sacrificing quality or security.
  - [Discoverable deterministic checks](goals/economy/discoverable-deterministic-checks.md)
- [Security](goals/security/README.md) — limit what an agent can reach and do, starting from where its tools run.
  - [Excessive agent access](goals/security/excessive-agent-access.md)
  - [Unexpected data exposure](goals/security/unexpected-data-exposure.md)
  - [Prompt injection](goals/security/prompt-injection.md)
  - [Untrusted code execution](goals/security/untrusted-code-execution.md)
- [Traceability & Trust](goals/traceability/README.md) — developing core advice for keeping a record of agent work and reviewing changes you can rely on.
  - [Agent authorship and attribution](goals/traceability/agent-authorship-and-attribution.md)
  - [Pull request verification evidence](goals/traceability/pull-request-verification-evidence.md)
  - [Risk-focused change review](goals/traceability/risk-focused-change-review.md)
  - [Independent change approval](goals/traceability/independent-change-approval.md)
- [Secure a local coding agent](goals/security/local-agent-security.md) — Copilot CLI, app, and editor: sandbox, tool and URL permissions, credentials.
- [Secure the Copilot cloud agent](goals/security/cloud-agent-security.md) — what GitHub enforces, and the secrets, firewall, MCP, and approval settings you set.
- [Prompt injection in coding-agent workflows](goals/security/prompt-injection-coding-agents.md) — treat untrusted content as data rather than authority.
- [Choose a model and control cost](goals/economy/choose-a-model-and-control-cost.md) — how Copilot charges for tokens, which model tier to use, and how to cap a session.
- [Define, steer, and verify a task](goals/alignment/define-and-verify-tasks.md) — write the task, hand it to Copilot, steer it, and check the result.
- [How coding agents work](articles/understanding-coding-agents.md) — an illustrated three-chapter guide on agent components, model requests, search and the tool-call loop.
- [Skills](goals/economy/useful-skills.md) — a thematic guide to understanding, writing and finding agent skills.
- [Skills and agent roles](articles/skills-and-agent-roles.md) — how reusable procedures and agent responsibilities differ.
- [Agent data-flow checklist](reference/agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [Repository context for coding agents](goals/alignment/repository-context-for-agents.md) — developing guidance for prioritizing useful repository context without taking on unnecessary documentation.
- [A structure for agent-facing repositories](goals/alignment/agent-facing-repository-structure.md) — an example layout showing where instructions, skills and commands belong, with a diagram connecting them to tests and CI.
- [Write repository instructions in AGENTS.md](goals/alignment/repository-instructions.md) — what to put in it, which Copilot features and other agents read it, and how to fill Copilot's gaps.
- [Enable agents to run repository commands](goals/alignment/agent-tool-delegation.md) — list commands in `AGENTS.md`, examples of what to list, and setting up the Copilot cloud agent to run them.
- [Give agents a command interface with Just](goals/economy/justfile-agent-workflows.md) — advertise recipes, run single tests, compose checks, and define handoff gates.
- [Local checks and tools for coding agents](reference/local-development-tools.md) — a reference catalogue of testing, linting, unused-code, container and security tools.
- [What a skill is, and when to add one](goals/economy/useful-skills.md) — when to use a reusable procedure, where Copilot finds skills, and how to test its value.
- [Agile roles in agentic development](articles/agent-role-boundaries.md) — a perspective on familiar responsibilities and handoffs in an agent-assisted workflow.
- [Case study: a lo-fi software factory](articles/lo-fi-software-factory-case-study.md) — a local agent workflow, its observed results, and limitations.
- [The Home Repo pattern for agents working across repositories](articles/home-repo-pattern.md) — a shared starting point for agent context and skills across projects, with access and maintenance limits.
- [Git worktrees for parallel agent work](reference/git-worktrees-for-agents.md) — commands, a diagram, and practical boundaries for separate agent working directories.
- [Justfile example: discoverable checks](reference/justfile-example.md) — copyable focused tests, verification and formatting recipes.
- [AGENTS.md example: short repository entrypoint](reference/agents-md-example.md) — adaptable instructions with project pointers and checks.
- [Agent skills directory](reference/agent-skills-directory.md) — built-in, inspected and candidate skills, with credited sources and limitations.
- [Write a SKILL.md](reference/writing-agent-skills.md) — syntax, file structure and a complete minimal skill.
- [How agent roles use skills](reference/agent-roles-directory.md) — original role files showing explicit skill use and possible adaptations.
