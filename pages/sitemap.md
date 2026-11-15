# Sitemap

This map is generated from page metadata and the links curated in each outcome overview. Regenerate it with `just sitemap`; edit the source pages rather than this file.

## Goal paths

These lists group directly linked pages, concepts, slides, and source records by their place in each overview; follow the overview for the advice and context behind its links. A page or concept without a [completeness status](../MAINTAINING.md#completeness-status) is unassessed; status does not establish correctness or freshness.

### [Alignment](alignment.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources. (established)
- [Write repository instructions in AGENTS.md](repository-instructions.md) — Put repository instructions in AGENTS.md, know which Copilot features read it, and fill Copilot's remaining gaps without duplicating rules. (established)
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Traceability](traceability.md) — Leave a record someone else can follow later, covering what was asked, who or what made the change, who approved it, and the evidence. (established)

#### Explore further

- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing. (developing)
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — A perspective on using familiar agile roles and handoffs to understand a possible agent-assisted software factory.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

#### Other links

- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.

### [Economy](economy.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources. (established)
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate.
- [Security](security.md) — Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work. (developing)

#### Explore further

- [Observed tools by purpose](tools-by-purpose.md) — Selected examples of deterministic repository tools, grouped by purpose.
- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Traceability](traceability.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination. (developing)

#### Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing. (developing)
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Security](security.md)

**Status:** developing

#### Core advice and supporting links

- [Secure a local coding agent](local-agent-security.md) — Practical starting controls for coding agents that execute tools on a developer's own machine. (developing)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — How to evaluate and verify sandbox restrictions for a coding agent running on your computer. (developing)
- [Secure a cloud coding agent](cloud-agent-security.md) — Practical controls for coding agents executing in hosted workspaces, CI, or other cloud environments. (developing)
- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Recognize instructions embedded in untrusted material and limit what they can make a coding agent do. (developing)
- [Agent data-flow checklist](agent-data-flow-checklist.md) — A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination. (established)
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a model response, retaining it, and using it to train models are separate policy and data-flow questions.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.

#### Explore further

- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination. (developing)
- [Agent data-flow checklist](agent-data-flow-checklist.md) — A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination. (established)
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

## Page inventory

Pages are grouped by their primary purpose; a page can serve more than one purpose. Concepts are listed separately regardless of their metadata type.

### Authored pages

#### case-study

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

#### explanation

- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — A perspective on using familiar agile roles and handoffs to understand a possible agent-assisted software factory.
- [How models and harnesses interact](model-harness-interaction.md) — How a harness supplies context and tools to a model, handles tool requests, and manages session history and context limits.

#### guide

- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Recognize instructions embedded in untrusted material and limit what they can make a coding agent do. (developing)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — How to evaluate and verify sandbox restrictions for a coding agent running on your computer. (developing)
- [Secure a cloud coding agent](cloud-agent-security.md) — Practical controls for coding agents executing in hosted workspaces, CI, or other cloud environments. (developing)
- [Secure a local coding agent](local-agent-security.md) — Practical starting controls for coding agents that execute tools on a developer's own machine. (developing)
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination. (developing)

#### overview

- [Alignment](alignment.md) — Core advice for helping an agent's work match a task's intended outcome. (established)
- [Economy](economy.md) — Core advice for getting useful agent results with less time and fewer tokens, without sacrificing quality or security. (established)
- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing. (developing)
- [Security](security.md) — Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work. (developing)
- [Traceability](traceability.md) — Leave a record someone else can follow later, covering what was asked, who or what made the change, who approved it, and the evidence. (established)

#### pattern

- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — An illustrative repository layout that connects shared agent instructions, reference context, skills, task commands, and harness-specific files.
- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively. (established)
- [Just as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) — A Just-specific example and guidance on when a wrapper may help expose existing repository commands.

#### reference

- [Agent data-flow checklist](agent-data-flow-checklist.md) — A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination. (established)
- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate.
- [Observed tools by purpose](tools-by-purpose.md) — Selected examples of deterministic repository tools, grouped by purpose.
- [Write repository instructions in AGENTS.md](repository-instructions.md) — Put repository instructions in AGENTS.md, know which Copilot features read it, and fill Copilot's remaining gaps without duplicating rules. (established)

### Concepts

- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Hill climbing](../concepts/hill-climbing.md) — Hill climbing improves a candidate through local changes evaluated against an objective, with trade-offs between repeatability, exploration, and cost.
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a model response, retaining it, and using it to train models are separate policy and data-flow questions.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources. (established)
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) — Retrieval-augmented generation supplies selected external information to a model at response time, with quality and security dependent on the retrieval pipeline.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
- [Session history is not active context](../concepts/session-history-vs-context.md) — A saved session can contain more history than a model receives in any single request.
- [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md) — Add a skill for a repeatable procedure, a profile for a role with limits, and a tool for an action the agent cannot perform; in Copilot these are skills, custom agents, and tools or MCP servers.
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
- [The model requests; the harness acts](../concepts/tool-call-loop.md) — A model requests a tool action; the harness checks and dispatches it, then supplies the result for further inference.
- [Vector stores](../concepts/vector-stores.md) — Vector stores index numerical representations for similarity search, with trade-offs in retrieval quality, filtering, maintenance, and data handling.

### Slides

- [A worktree is not a sandbox](../slides/worktrees-not-sandboxes.md)
- [Passing tests are evidence, not proof](../slides/tests-are-evidence.md)
- [The model requests; the harness acts](../slides/tool-call-loop.md)

### Source records

- [General AI terms: source-backed vocabulary candidates](../sources/ai-terms-research.md)
- [Justfile patterns across Node.js and Python repositories](../sources/repository-justfiles.md)
- [Public agent skills for wiki information architecture](../sources/wiki-information-architecture-skills.md)

## Other entrypoints

- [Homepage](../README.md)
- [Design goals](../DESIGN-GOALS.md)
- [Maintaining the wiki](../MAINTAINING.md)
- [Authored pages index](README.md)
- [Concept index](../concepts/README.md)
- [Slides index](../slides/README.md)
- [Sources index](../sources/README.md)
