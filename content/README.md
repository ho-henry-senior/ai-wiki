# Authored pages

Articles, applied patterns, reference catalogues, and checklists for AI-assisted software work.

Pages are listed here by their section on the website, which their `lane` front matter sets and which can differ from their folder. Focused explanations are also listed in the [concepts index](concepts/README.md).

## Goals

- [Alignment](goals/alignment/README.md) — core advice for matching work to the intended outcome.
- [Economy](goals/economy/README.md) — core advice for using time and tokens effectively without sacrificing quality or security.
  - [Well-organised repository context](goals/economy/agent-ready-repository-context.md)
  - [Discoverable deterministic checks](goals/economy/discoverable-deterministic-checks.md)
- [Security](goals/security/README.md) — limit what an agent can reach and do, starting from where its tools run.
  - [Excessive agent access](goals/security/excessive-agent-access.md)
  - [Unexpected data exposure](goals/security/unexpected-data-exposure.md)
  - [Prompt injection](goals/security/prompt-injection.md)
- [Trust & Traceability](goals/traceability/README.md) — keep approval with an accountable person, the record in your delivery process, and agent changes identifiable.
  - [Accountable approval](goals/traceability/accountable-approval.md)
  - [A record through your delivery process](goals/traceability/delivery-record.md)

## Guides

- [Choose a model and control cost](goals/economy/choose-a-model-and-control-cost.md) — why routine work rarely needs the strongest model, then choose, evaluate and control costs.
  - [Choosing a model](goals/economy/choose-a-model.md) — which model for which task, what differs between models, and failure modes.
  - [Evaluating your model choice](goals/economy/evaluate-model-choice.md) — comparative tests and review effort.
  - [Understanding and controlling costs](goals/economy/model-costs.md) — Copilot pricing and session controls.

- [Agent roles and skills](articles/agent-roles-and-skills.md) — how skills and agent roles differ, with a Guide for each.
  - [Agent roles](concepts/skills-profiles-and-tools.md) — what a role is, when to add one, and how it differs from a skill and a tool.
    - [Agile roles in agentic development](articles/agent-role-boundaries.md) — familiar responsibilities and handoffs in an agent-assisted workflow.
    - [How agent roles use skills](reference/agent-roles-directory.md) — original role files showing explicit skill use and possible adaptations.
  - [Skills](goals/economy/useful-skills.md) — what a skill is, how Copilot uses one, and how it differs from AGENTS.md and agent roles.
    - [Skills worth trying](reference/agent-skills-directory.md) — the skills built into Copilot, and a few community skills this wiki refers to.
    - [Install an existing skill](reference/install-agent-skills.md) — read it, install a pinned version with `gh skill`, and check Copilot can see it.
    - [Write your own skill](reference/writing-agent-skills.md) — where it goes, a description that gets it used, and a complete minimal skill.
    - [Test whether a skill helps](reference/test-agent-skills.md) — compare a real task with and without it, record the result, and retire it when it's not needed.
- [Define, steer, and verify a task](goals/alignment/define-and-verify-tasks.md) — agree what success means, turn it into issues, then steer the agent and check the result.
  - [Agree on the problem](goals/alignment/agree-on-the-problem.md) — have the agent question you, decide the scope, and agree a specification.
  - [Turn the specification into issues](goals/alignment/turn-specification-into-issues.md) — outcome, acceptance criteria, checks and out of scope for each issue.
  - [Hand off an issue and steer the implementation](goals/alignment/hand-off-and-steer.md) — give the agent an issue, correct it on the pull request, and check the result before accepting it.
- [How coding agents work](articles/understanding-coding-agents.md) — an illustrated four-chapter guide to agent components, model requests, the tool-call loop and session context.
  - [Inside a coding agent](articles/inside-coding-agent.md)
  - [What the model receives and returns](articles/model-requests-and-responses.md)
  - [The tool-call loop](concepts/tool-call-loop.md)
  - [Session history and active context](concepts/session-history-vs-context.md)
- [Review and approve agent work](goals/traceability/review-and-approve-agent-work.md) — developing: getting agent work into a form you can approve, and assessing it.
  - [Ask for small, focused changes](goals/traceability/ask-for-small-focused-changes.md) — the smallest coherent change, nothing beyond the task, tests that matter, stop conditions and a checkable handoff.
  - [Identify the risks in a change](goals/traceability/identify-risks-in-a-change.md) — what agents tend to get wrong, and how to assess impact and verification evidence.
  - [Review, decide and approve](goals/traceability/review-decide-and-approve.md) — agent review as evidence, what doesn't count as approval, and the decision and its record.
- [Secure a local coding agent](goals/security/local-agent-security.md) — limits a local agent can't get round, for its commands, its credentials, and what runs outside its sandbox.
  - [Configure the sandbox and tool restrictions](goals/security/local-sandbox-and-tool-restrictions.md) — Copilot CLI, app and VS Code: folders, network, deny rules, and a test that a restriction works.
  - [Protect credentials and sensitive data](goals/security/local-agent-credentials.md) — credential pass-through, a narrow token for Copilot, and keeping secrets out of tool output.
  - [Check integrations and sandbox boundaries](goals/security/local-agent-integrations.md) — what the sandbox doesn't cover, and reviewing MCP servers and repository configuration.
- [Set up a repository for agents](goals/alignment/agent-facing-repository-structure.md) — where agent instructions, skills and commands belong, with a diagram connecting them to tests and CI.
  - [Write repository instructions in AGENTS.md](goals/alignment/repository-instructions.md) — what to put in it, which Copilot features and other agents read it, and how to fill Copilot's gaps.
  - [Repository context for coding agents](goals/alignment/repository-context-for-agents.md) — write down the facts an agent got wrong, near the code they concern.
  - [Enable agents to run repository commands](goals/alignment/agent-tool-delegation.md) — list commands in `AGENTS.md`, and set up the Copilot cloud agent to run them.
  - [Give agents a command interface with Just](goals/economy/justfile-agent-workflows.md) — advertise recipes, run single tests, compose checks, and define handoff gates.

## Articles

- [Change granularity](concepts/change-granularity.md) — choose a coherent unit of work a person can understand, verify and approve.

- [Secure the Copilot cloud agent](goals/security/cloud-agent-security.md) — what GitHub enforces, and the secrets, firewall, MCP, and approval settings you set.
- [The Home Repo pattern for agents working across repositories](articles/home-repo-pattern.md) — a shared starting point for agent context and skills across projects, with access and maintenance limits.

## Case studies

- [Lo-fi software factory](articles/lo-fi-software-factory-case-study.md) — a four-chapter account of a local agent workflow, its real development and review evidence, outcomes, and limitations.
  - [From a refactor idea to actionable issues](articles/lo-fi-factory-issues.md)
  - [Dispatching development with GitHub labels](articles/lo-fi-factory-dispatch.md)
  - [Agent reviews and human decisions](articles/lo-fi-factory-reviews.md)
  - [What worked, what failed, and what remains](articles/lo-fi-factory-lessons.md)

## Reference

- [Agent data-flow checklist](reference/agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [AGENTS.md example: short repository entrypoint](reference/agents-md-example.md) — adaptable instructions with project pointers and checks.
- [Local checks and tools for coding agents](reference/local-development-tools.md) — a reference catalogue of testing, linting, unused-code, container and security tools.
- [Git worktrees for parallel agent work](reference/git-worktrees-for-agents.md) — commands, a diagram, and practical boundaries for separate agent working directories.
- [AI glossary](reference/glossary.md) — definitions of common AI terms and distinctions.
