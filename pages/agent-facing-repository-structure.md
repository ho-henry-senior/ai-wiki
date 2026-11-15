---
type: pattern
summary: An illustrative repository layout that connects shared agent instructions, reference context, skills, task commands, and harness-specific files.
---

# A structure for agent-facing repositories

This pattern brings repository conventions discussed across the wiki into one place. It is an illustrative menu, not a recommended starting layout: begin with a concise entrypoint and existing task commands, then add only the pieces that solve a demonstrated need.

```text
repo/
├── AGENTS.md
├── justfile                   # Optional wrapper when existing task commands need one
├── .agents/
│   └── skills/
│       └── <skill-name>/
│           ├── SKILL.md
│           ├── references/       # Optional supporting context
│           ├── scripts/          # Optional deterministic helpers
│           └── assets/           # Optional templates or other resources
├── docs/
│   ├── architecture/             # Canonical project context, when needed
│   └── agents/
│       ├── README.md             # Index, useful as this collection grows
│       ├── issue-tracker.md
│       ├── tooling-review.md
│       └── <topic>-actions.md    # Durable investigation guidance or outcomes
└── .github/                      # Optional GitHub-specific files
    ├── copilot-instructions.md   # Copilot-specific guidance or adapter
    ├── instructions/
    │   └── <scope>.instructions.md
    ├── agents/
    │   └── <role>.agent.md       # Specialized Copilot agent definitions
    ├── prompts/
    │   └── <task>.prompt.md      # Reusable prompts, where supported
    ├── actions/                  # GitHub Actions and reusable actions
    └── workflows/                # CI and other repository automation
```

Do not treat this full tree as a setup checklist. Start with an `AGENTS.md` or equivalent entrypoint and the repository's existing commands; add reference directories, skills, task wrappers, and harness-specific files only when they address a recurring need. Create directories only when they have useful contents. In particular, `.github/` entries are optional and specific to the GitHub features the repository uses. A `.copilot/` directory is not part of this default. GitHub documents `.copilot/skills/` in a dotfiles repository for personal skills in some Copilot cloud sessions; that is distinct from the project-level `.agents/skills/` location.

## What goes where

### `AGENTS.md`: shared starting point

Use [progressive disclosure](../concepts/progressive-disclosure.md): keep the entrypoint concise and repository-wide, linking to detailed context and the task interface. It should orient an agent, not duplicate every reference page or workflow.

Support for `AGENTS.md` is growing, but harnesses differ in how they discover, scope, and combine instruction files. Keep any harness-specific instructions explicit, and verify that the tools used by the team actually load them. See [Write repository instructions in AGENTS.md](repository-instructions.md) for which Copilot features and other agents read which file.

### `docs/agents/`: agent-oriented reference material

Use this for durable material written specifically to help agents work in the repository: domain context, issue-tracker conventions, tooling guidance, or findings from recurring investigations. Keep general canonical documentation in its natural location under `docs/` and link to it from `AGENTS.md`; a document does not become agent-specific merely because an agent needs it.

An index such as `docs/agents/README.md` is helpful once there are several pages. Keep the structure shallow until the material justifies more categories.

### `.agents/skills/`: on-demand workflows

A skill is a directory containing `SKILL.md`, with optional scripts, references, and assets. Use skills for repeatable, task-specific procedures that should be made available when relevant, rather than loading all of their detail as repository-wide instructions.

The Agent Skills format is an open standard, but discovery paths are not universal. Copilot documents `.agents/skills/` and `.github/skills/` among its project skill locations; support depends on the surface in use. Confirm discovery in the actual Copilot client rather than maintaining duplicate skill bodies.

Keep [skills, profiles, and tools distinct](../concepts/skills-profiles-and-tools.md): a skill provides a procedure, a profile describes a role, and a tool performs an action.

See [choose and add skills](useful-skills.md) for when a skill is worth adding and where Copilot finds it.

### `justfile`: stable task interface

A root `justfile` can be a task interface when existing commands are hard to discover or invoke. See [Just as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) for a focused example, or [delegating repo tasks to tools](agent-tool-delegation.md) for the broader principle.

### `.github/`: GitHub-specific configuration and automation

Use GitHub-specific files only when the corresponding feature is in use:

- `.github/copilot-instructions.md` for repository-wide Copilot instructions when needed;
- `.github/instructions/` for path-specific Copilot instructions;
- `.github/agents/` for specialized Copilot agent definitions; and
- `.github/prompts/` for reusable prompt files in supporting Copilot clients.

These are not interchangeable with shared repository documentation or skills. Keep project-wide guidance canonical in `AGENTS.md` where practical, and make any adapter contain only the harness-specific difference. Keep Actions, workflows, and scripts under `.github/` as automation, not as a second home for agent instructions.

## Why use this pattern?

The parts have distinct jobs: `AGENTS.md` orients; `docs/agents/` provides durable reference; skills package on-demand procedures; `justfile` exposes deterministic tasks; and `.github/` holds GitHub-specific configuration and automation. Linking these pieces makes them discoverable without copying all project knowledge into every agent's initial context.

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub Copilot agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [GitHub Copilot custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents)
- [GitHub Copilot prompt files](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-files)

Copilot project-skill locations checked 14 November 2026; other product behavior was not reverified in this review.
