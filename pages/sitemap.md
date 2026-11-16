# Sitemap

This map is generated from page metadata and the links curated in each outcome overview. Regenerate it with `just sitemap`; edit the source pages rather than this file.

## Goal paths

These lists group directly linked pages, concepts, slides, and source records by their place in each overview; follow the overview for the advice and context behind its links. A page or concept without a [completeness status](../MAINTAINING.md#completeness-status) is unassessed; status does not establish correctness or freshness.

### [Alignment](alignment.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Write repository instructions in AGENTS.md](repository-instructions.md) — Put repository instructions in AGENTS.md, know which Copilot features read it, and fill Copilot's remaining gaps without duplicating rules. (established)
- [Let the agent run your repository's commands](agent-tool-delegation.md) — List the commands the agent should run, with what each does and whether it changes files, so it runs your checks instead of guessing; give the Copilot cloud agent the dependencies to run them. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)

#### Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — When an agent gets something wrong because it lacked a fact about your system, write that fact down once, near the code it concerns, and link it from AGENTS.md. (developing)
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — One way to split agile work between agent roles and people, with role contracts, a RACI table, and Copilot custom agents that enforce each role's limits. (developing)
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.
- [Evals](../concepts/evals.md) — Background. An eval runs an agent on a fixed set of tasks and checks the results, so you can tell whether a change to your setup made things better or worse.

#### Other links

- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.

### [Economy](economy.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Let the agent run your repository's commands](agent-tool-delegation.md) — List the commands the agent should run, with what each does and whether it changes files, so it runs your checks instead of guessing; give the Copilot cloud agent the dependencies to run them. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep what the agent loads for every task small, and let detail load only when a task needs it; in Copilot, through a short AGENTS.md, path-specific instructions, and skills. (established)
- [Choose a model and control cost](choose-a-model-and-control-cost.md) — How Copilot charges for tokens, which model tier to use for which task, and how to keep a session's cost down and capped. (developing)
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate. (developing)
- [Security](security.md) — The five ways a coding agent can cause harm, how each happens, and what stops it in Copilot; start from where the agent's tools run. (established)

#### Explore further

- [Evals](../concepts/evals.md) — Background. An eval runs an agent on a fixed set of tasks and checks the results, so you can tell whether a change to your setup made things better or worse.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Traceability](traceability.md)

**Status:** established

#### Core advice and supporting links

- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Agent data-flow checklist](agent-data-flow-checklist.md) — The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail. (established)

#### Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — When an agent gets something wrong because it lacked a fact about your system, write that fact down once, near the code it concerns, and link it from AGENTS.md. (developing)
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

### [Security](security.md)

**Status:** established

#### Core advice and supporting links

- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a response, keeping it, and training on it are separate questions; for Copilot, the answers depend on your plan and which feature you use. (developing)
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — Anything a command prints goes to the model and into session history, so keep secrets out of output and out of reach; if one leaks, rotate it. (established)
- [Agent data-flow checklist](agent-data-flow-checklist.md) — The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail. (established)
- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Why a model can follow instructions hidden in issues, files, web pages, and tool output, and how to limit what a Copilot agent can do if it does. (established)
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do. (established)
- [Secure a local coding agent](local-agent-security.md) — Why a local agent's commands are as powerful as you are, and how to limit them in Copilot with the sandbox, tool and URL rules, and credentials kept out of reach. (established)
- [Secure the Copilot cloud agent](cloud-agent-security.md) — What GitHub enforces for the Copilot cloud agent and why, what each setting you control protects against, and where its limits stop; secrets, firewall, MCP servers, workflow approval, and who can start it. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Invented package names can be real attacks](../concepts/hallucinated-dependencies.md) — Models sometimes name packages that do not exist, often the same ones; attackers register those names, and an agent that installs dependencies itself can run their code before anyone reviews it. (developing)
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays. (established)
- [Alignment](alignment.md) — Why an agent's result can differ from what you meant, and how to close the gap; define the work, give the agent context and checks, steer it, and verify the result. (established)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — Turn on Copilot's local sandbox so the operating system, not the model, limits what commands can reach; then prove the limits hold with harmless test files. (developing)

#### Explore further

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

## Page inventory

Pages are grouped by their primary purpose; a page can serve more than one purpose. Concepts are listed separately regardless of their metadata type.

### Authored pages

#### case-study

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

#### explanation

- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — One way to split agile work between agent roles and people, with role contracts, a RACI table, and Copilot custom agents that enforce each role's limits. (developing)
- [How models and harnesses interact](model-harness-interaction.md) — How Copilot's harness gives the model context and tools, runs its tool requests, and manages session history, and why that decides where limits and data controls belong. (established)

#### guide

- [Choose a model and control cost](choose-a-model-and-control-cost.md) — How Copilot charges for tokens, which model tier to use for which task, and how to keep a session's cost down and capped. (developing)
- [Furnish repositories with context for agents](repository-context-for-agents.md) — When an agent gets something wrong because it lacked a fact about your system, write that fact down once, near the code it concerns, and link it from AGENTS.md. (developing)
- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Why a model can follow instructions hidden in issues, files, web pages, and tool output, and how to limit what a Copilot agent can do if it does. (established)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — Turn on Copilot's local sandbox so the operating system, not the model, limits what commands can reach; then prove the limits hold with harmless test files. (developing)
- [Secure a local coding agent](local-agent-security.md) — Why a local agent's commands are as powerful as you are, and how to limit them in Copilot with the sandbox, tool and URL rules, and credentials kept out of reach. (established)
- [Secure the Copilot cloud agent](cloud-agent-security.md) — What GitHub enforces for the Copilot cloud agent and why, what each setting you control protects against, and where its limits stop; secrets, firewall, MCP servers, workflow approval, and who can start it. (established)

#### overview

- [Alignment](alignment.md) — Why an agent's result can differ from what you meant, and how to close the gap; define the work, give the agent context and checks, steer it, and verify the result. (established)
- [Economy](economy.md) — Where an agent's time and tokens go, and how to spend less of both without giving up quality or security; clear tasks, listed commands, focused checks, small context, and the right model. (established)
- [Security](security.md) — The five ways a coding agent can cause harm, how each happens, and what stops it in Copilot; start from where the agent's tools run. (established)
- [Traceability](traceability.md) — Why agent work needs a record someone else can follow, and how to leave one on the issue and pull request; what was asked, who or what made the change, how it was corrected, who approved it, and the evidence. (established)

#### pattern

- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — A map of where agent instructions, reference material, skills, commands, and Copilot files go in a repository, linking to the page that explains each. (established)
- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Let the agent run your repository's commands](agent-tool-delegation.md) — List the commands the agent should run, with what each does and whether it changes files, so it runs your checks instead of guessing; give the Copilot cloud agent the dependencies to run them. (established)

#### reference

- [Agent data-flow checklist](agent-data-flow-checklist.md) — The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail. (established)
- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate. (developing)
- [Write repository instructions in AGENTS.md](repository-instructions.md) — Put repository instructions in AGENTS.md, know which Copilot features read it, and fill Copilot's remaining gaps without duplicating rules. (established)

### Concepts

- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do. (established)
- [Evals](../concepts/evals.md) — Background. An eval runs an agent on a fixed set of tasks and checks the results, so you can tell whether a change to your setup made things better or worse.
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a response, keeping it, and training on it are separate questions; for Copilot, the answers depend on your plan and which feature you use. (developing)
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [Invented package names can be real attacks](../concepts/hallucinated-dependencies.md) — Models sometimes name packages that do not exist, often the same ones; attackers register those names, and an agent that installs dependencies itself can run their code before anyone reviews it. (developing)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep what the agent loads for every task small, and let detail load only when a task needs it; in Copilot, through a short AGENTS.md, path-specific instructions, and skills. (established)
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays. (established)
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) — Background. Retrieval-augmented generation finds passages that match a request and gives them to the model as context; it changes what the model sees, not what it knows.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — Anything a command prints goes to the model and into session history, so keep secrets out of output and out of reach; if one leaks, rotate it. (established)
- [Session history is not active context](../concepts/session-history-vs-context.md) — What a session has saved is not what the model sees in its next request; in Copilot CLI, check with /context and summarize with /compact. (established)
- [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md) — Add a skill for a repeatable procedure, a profile for a role with limits, and a tool for an action the agent cannot perform; in Copilot these are skills, custom agents, and tools or MCP servers. (established)
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — Describe each command's scope, cost, side effects, and whether failure blocks handoff; its name alone does not tell an agent what it does. (established)
- [The model requests; the harness acts](../concepts/tool-call-loop.md) — The model only asks to use a tool; the harness, such as Copilot CLI, decides whether it runs, asks you, or refuses, so put limits in the harness, not the prompt. (established)
- [Vector stores](../concepts/vector-stores.md) — Background. A vector store finds items by meaning rather than exact words, using embeddings; useful for search and RAG, with trade-offs in quality, upkeep, and data handling.

### Slides

- [A worktree is not a sandbox](../slides/worktrees-not-sandboxes.md)
- [Passing tests are evidence, not proof](../slides/tests-are-evidence.md)
- [The model requests; the harness acts](../slides/tool-call-loop.md)

### Source records

- [Code Review Bottleneck: notes on a Warp talk](../sources/warp-code-review-bottleneck.md)
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
