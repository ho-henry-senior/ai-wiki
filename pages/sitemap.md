# Sitemap

This map is generated from page metadata and the links curated in each outcome overview. Regenerate it with `just sitemap`; edit the source pages rather than this file.

## Goal paths

These lists show directly linked pages, concepts, slides, and source records; follow each overview for the advice and context behind its links.

### [Alignment](alignment.md)

- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.
- [Define and verify a task](define-and-verify-tasks.md) — Clarify a task's outcome and acceptance criteria, then preserve proportionate evidence that the result meets them.
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing.
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — A green test suite establishes that assertions passed, not that those assertions completely capture the intended behavior.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — Define agent roles by both their expected responsibilities and explicit off-limits work, using RACI to clarify workflow handoffs.
- [Traceability](traceability.md) — Core advice for recording requests, decisions, changes, and evidence in agent-assisted work.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — Explore unit tests as fast, deterministic feedback for agents, and the risks of treating test volume or a green suite as proof of correctness.
- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Economy](economy.md)

- [Define and verify a task](define-and-verify-tasks.md) — Clarify a task's outcome and acceptance criteria, then preserve proportionate evidence that the result meets them.
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — A discoverable task needs an explicit scope, side effects, prerequisites, and interpretation; its name alone is not a contract.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — Explore unit tests as fast, deterministic feedback for agents, and the risks of treating test volume or a green suite as proof of correctness.
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources.
- [Skills as a changing capability layer](skills-as-capabilities.md) — Explain skills as reusable capabilities that can fill current harness gaps, while their value changes as harnesses evolve.
- [Security](security.md) — Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work.
- [Tool choices by purpose](tools-by-purpose.md) — Considerations for choosing deterministic tools by purpose, with selected examples from Node.js and Python repositories.
- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Traceability](traceability.md)

- [Define and verify a task](define-and-verify-tasks.md) — Clarify a task's outcome and acceptance criteria, then preserve proportionate evidence that the result meets them.
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — A green test suite establishes that assertions passed, not that those assertions completely capture the intended behavior.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — Define agent roles by both their expected responsibilities and explicit off-limits work, using RACI to clarify workflow handoffs.
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing.
- [Alignment](alignment.md) — Core advice for helping an agent's work match a task's intended outcome.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Security](security.md)

- [Agent data-flow checklist](agent-data-flow-checklist.md) — A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination.
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a model response, retaining it, and using it to train models are separate policy and data-flow questions.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly.
- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

## Page inventory

Pages are grouped by their primary purpose; a page can serve more than one purpose. Concepts are listed separately regardless of their metadata type.

### Authored pages

#### case-study

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

#### explanation

- [How models and harnesses interact](model-harness-interaction.md) — How a harness supplies context and tools to a model, handles tool requests, and manages session history and context limits.
- [Skills as a changing capability layer](skills-as-capabilities.md) — Explain skills as reusable capabilities that can fill current harness gaps, while their value changes as harnesses evolve.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — Explore unit tests as fast, deterministic feedback for agents, and the risks of treating test volume or a green suite as proof of correctness.

#### exploration

- [From CLI agents toward a lightweight software factory](cli-to-software-factory.md) — An exploratory path from using a coding agent through delegation and toward automating repeatable work.

#### guide

- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination.
- [Skills and agent profiles](skills-and-agent-profiles.md) — Choose between reusable task procedures and role profiles, and combine them with tools for a concrete workflow.

#### overview

- [Alignment](alignment.md) — Core advice for helping an agent's work match a task's intended outcome.
- [Economy](economy.md) — Core advice for getting useful agent results with less time and fewer tokens, without sacrificing quality or security.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — Working notes on documenting domain, decisions, architecture, and repository boundaries so agents can understand the system they are changing.
- [Security](security.md) — Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work.
- [Traceability](traceability.md) — Core advice for recording requests, decisions, changes, and evidence in agent-assisted work.

#### pattern

- [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) — Use a Justfile to give people and agents a stable, discoverable interface to the repository's existing commands and checks.
- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — An illustrative repository layout that connects shared agent instructions, reference context, skills, task commands, and harness-specific files.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — Define agent roles by both their expected responsibilities and explicit off-limits work, using RACI to clarify workflow handoffs.
- [Define and verify a task](define-and-verify-tasks.md) — Clarify a task's outcome and acceptance criteria, then preserve proportionate evidence that the result meets them.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — Expose deterministic repository tasks so agents can delegate work instead of reverse-engineering commands or performing checks expensively.

#### reference

- [Agent data-flow checklist](agent-data-flow-checklist.md) — A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination.
- [AGENTS.md as a shared agent entrypoint](agents-md-as-shared-entrypoint.md) — Use AGENTS.md as a concise repository entrypoint, with Copilot CLI support and explicit limits on portability.
- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.
- [Tool choices by purpose](tools-by-purpose.md) — Considerations for choosing deterministic tools by purpose, with selected examples from Node.js and Python repositories.
- [Useful skills right now](useful-skills.md) — A living, problem-oriented shortlist of skills with practical value, including harness compatibility and built-in equivalents.

### Concepts

- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Evals](../concepts/evals.md) — Evals compare AI system behavior against task-specific criteria, using representative cases and appropriate checks to inform improvements.
- [Hill climbing](../concepts/hill-climbing.md) — Hill climbing improves a candidate through local changes evaluated against an objective, with trade-offs between repeatability, exploration, and cost.
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a model response, retaining it, and using it to train models are separate policy and data-flow questions.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly.
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep starting context small and make task-specific detail discoverable through focused links and on-demand resources.
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — A green test suite establishes that assertions passed, not that those assertions completely capture the intended behavior.
- [Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) — Retrieval-augmented generation supplies selected external information to a model at response time, with quality and security dependent on the retrieval pipeline.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
- [Session history is not active context](../concepts/session-history-vs-context.md) — A saved session can contain more history than a model receives in any single request.
- [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md) — Skills provide reusable procedures, profiles describe roles, and tools expose executable actions.
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
