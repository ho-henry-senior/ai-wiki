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
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — One way to split agile work between agent roles and people, with role contracts, a RACI table, and Copilot custom agents that enforce each role's limits.
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
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate.
- [Security](security.md) — Limit what an agent can reach and do, so a mistake or a malicious instruction cannot expose data or cause harm; start from where the agent's tools run. (developing)

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

**Status:** developing

#### Core advice and supporting links

- [Secure a local coding agent](local-agent-security.md) — Turn on the sandbox, restrict which tools, paths, and URLs Copilot can use without asking, and keep credentials out of reach when an agent runs on your computer. (developing)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — Turn on Copilot's local sandbox, restrict files, network, and credentials, and prove the limits are enforced with harmless test files. (developing)
- [Secure the Copilot cloud agent](cloud-agent-security.md) — Know what GitHub already enforces for the Copilot cloud agent, and set the rest yourself; secrets, firewall, MCP servers, workflow approval, and who can start it. (developing)
- [Agent data-flow checklist](agent-data-flow-checklist.md) — The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail. (established)
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a response, keeping it, and training on it are separate questions; for Copilot, the answers depend on your plan and which feature you use.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Treat instructions in issues, files, web pages, and tool output as data, not orders, and limit what the agent can do if it follows them anyway. (developing)
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.

#### Explore further

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

## Page inventory

Pages are grouped by their primary purpose; a page can serve more than one purpose. Concepts are listed separately regardless of their metadata type.

### Authored pages

#### case-study

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.

#### explanation

- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — One way to split agile work between agent roles and people, with role contracts, a RACI table, and Copilot custom agents that enforce each role's limits.
- [How models and harnesses interact](model-harness-interaction.md) — How Copilot's harness gives the model context and tools, runs its tool requests, and manages session history, and why that decides where limits and data controls belong.

#### guide

- [Furnish repositories with context for agents](repository-context-for-agents.md) — When an agent gets something wrong because it lacked a fact about your system, write that fact down once, near the code it concerns, and link it from AGENTS.md. (developing)
- [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md) — Treat instructions in issues, files, web pages, and tool output as data, not orders, and limit what the agent can do if it follows them anyway. (developing)
- [Sandbox a local coding agent](local-agent-sandboxing.md) — Turn on Copilot's local sandbox, restrict files, network, and credentials, and prove the limits are enforced with harmless test files. (developing)
- [Secure a local coding agent](local-agent-security.md) — Turn on the sandbox, restrict which tools, paths, and URLs Copilot can use without asking, and keep credentials out of reach when an agent runs on your computer. (developing)
- [Secure the Copilot cloud agent](cloud-agent-security.md) — Know what GitHub already enforces for the Copilot cloud agent, and set the rest yourself; secrets, firewall, MCP servers, workflow approval, and who can start it. (developing)

#### overview

- [Alignment](alignment.md) — Get results that match what you intended; define the work, give the agent context and checks, steer it, and verify the result. (established)
- [Economy](economy.md) — Get good results with less time and fewer tokens, without giving up quality or security; clear tasks, listed commands, focused checks and context. (established)
- [Security](security.md) — Limit what an agent can reach and do, so a mistake or a malicious instruction cannot expose data or cause harm; start from where the agent's tools run. (developing)
- [Traceability](traceability.md) — Leave a record someone else can follow later, covering what was asked, who or what made the change, how it was corrected, who approved it, and the evidence. (established)

#### pattern

- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — A map of where agent instructions, reference material, skills, commands, and Copilot files go in a repository, linking to the page that explains each.
- [Define, steer, and verify a task](define-and-verify-tasks.md) — Write the task down before the agent starts, steer it where the work is recorded, and review the result against what you wrote. (established)
- [Let the agent run your repository's commands](agent-tool-delegation.md) — List the commands the agent should run, with what each does and whether it changes files, so it runs your checks instead of guessing; give the Copilot cloud agent the dependencies to run them. (established)

#### reference

- [Agent data-flow checklist](agent-data-flow-checklist.md) — The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail. (established)
- [AI glossary](glossary.md) — A practical glossary of foundational AI and current generative AI terminology.
- [Choose and add skills](useful-skills.md) — Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate.
- [Write repository instructions in AGENTS.md](repository-instructions.md) — Put repository instructions in AGENTS.md, know which Copilot features read it, and fill Copilot's remaining gaps without duplicating rules. (established)

### Concepts

- [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md) — Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
- [Evals](../concepts/evals.md) — Background. An eval runs an agent on a fixed set of tasks and checks the results, so you can tell whether a change to your setup made things better or worse.
- [Inference, retention, and training are separate](../concepts/inference-retention-training.md) — Sending data for a response, keeping it, and training on it are separate questions; for Copilot, the answers depend on your plan and which feature you use.
- [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) — Instructions guide model behavior; independently enforced permissions restrict actions even when the model chooses incorrectly. (established)
- [Load context through focused entrypoints](../concepts/progressive-disclosure.md) — Keep what the agent loads for every task small, and let detail load only when a task needs it; in Copilot, through a short AGENTS.md, path-specific instructions, and skills. (established)
- [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) — An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
- [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md) — Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed. (established)
- [Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) — Background. Retrieval-augmented generation finds passages that match a request and gives them to the model as context; it changes what the model sees, not what it knows.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
- [Session history is not active context](../concepts/session-history-vs-context.md) — What a session has saved is not what the model sees in its next request; in Copilot CLI, check with /context and summarize with /compact.
- [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md) — Add a skill for a repeatable procedure, a profile for a role with limits, and a tool for an action the agent cannot perform; in Copilot these are skills, custom agents, and tools or MCP servers.
- [Task names need explicit contracts](../concepts/task-interface-contracts.md) — Describe each command's scope, cost, side effects, and whether failure blocks handoff; its name alone does not tell an agent what it does.
- [The model requests; the harness acts](../concepts/tool-call-loop.md) — The model only asks to use a tool; the harness, such as Copilot CLI, decides whether it runs, asks you, or refuses, so put limits in the harness, not the prompt.
- [Vector stores](../concepts/vector-stores.md) — Background. A vector store finds items by meaning rather than exact words, using embeddings; useful for search and RAG, with trade-offs in quality, upkeep, and data handling.

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
