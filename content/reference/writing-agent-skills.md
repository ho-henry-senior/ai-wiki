---
type: how-to
summary: Create a skill folder and SKILL.md where Copilot finds it, write a description that gets it used at the right time, keep the instructions to one procedure, and check that it loads.
status: developing
lane: guides
checked: 2026-11-15
tags:
  - Copilot
  - Skills
---

# Write your own skill

Write a skill when a task keeps coming up and nothing in [skills worth trying](agent-skills-directory.md) fits. A skill is a folder with a `SKILL.md` file: **YAML front matter** with its name and description, then **Markdown instructions**. The format is the open [Agent Skills specification](https://agentskills.io/specification), so the same skill can work in other agents that support it.

## 1. Choose where it goes

Put a project skill in `.agents/skills/NAME/SKILL.md`. Copilot reads it there, and so do other agents, because the folder isn't named after one product. Copilot also reads `.github/skills/` and `.claude/skills/`.

| Copilot feature                                     |  Loads project skills   |
| --------------------------------------------------- | :---------------------: |
| Cloud agent and code review on GitHub.com           |           Yes           |
| Copilot CLI and the Copilot app                     |           Yes           |
| Agent mode in VS Code, Visual Studio, and JetBrains | Yes (version-dependent) |

A personal skill goes in `~/.copilot/skills/` or `~/.agents/skills/`, but cloud sessions don't see it; put any skill the cloud agent needs in the repository. To share skills across several repositories, see [the Home Repo pattern](../articles/home-repo-pattern.md).

## 2. Create the folder and file

```text
.agents/skills/
└── review-api-changes/
    ├── SKILL.md
    ├── references/          # Optional documentation
    ├── scripts/             # Optional executables
    └── assets/              # Optional templates or data
```

The file must be named `SKILL.md`. Give the folder the same name as the skill, in lowercase hyphenated words. A small skill needs none of the optional folders.

## 3. Write the description

Copilot sees only the name and description until it decides to use a skill, so the description decides whether it is ever used. Say **what the skill does** and **when to use it**, in the words a request would use:

```markdown
---
name: review-api-changes
description: Review API changes against documented contracts when asked about API compatibility.
---
```

`name` and `description` are required. A vague description, such as "helps with APIs", gets the skill loaded for the wrong tasks or not at all. The specification also defines optional fields, such as `license`, `compatibility` and `allowed-tools`; products differ in which they support.

## 4. Write the procedure

Under the front matter, write one bounded procedure: its inputs, steps, expected output and checks. The complete example:

```markdown
---
name: review-api-changes
description: Review API changes against documented contracts when asked about API compatibility.
---

# Review API changes

1. Read the proposed change and docs/api-contract.md.
2. Identify affected request and response behaviour.
3. Compare the change with the documented contract and tests.
4. Report confirmed incompatibilities with file locations.
5. Separate unresolved questions from confirmed findings.

Do not modify files unless asked to make a fix.
```

Put longer explanations in `references/`, helpers in `scripts/` and templates in `assets/`, and link to them from `SKILL.md`, saying when to use each. A link is a pointer, not proof the agent opened the file. Don't copy `AGENTS.md` into the skill: rules every task needs belong there, not in each procedure.

## 5. Check that it loads

In Copilot CLI, run `/skills reload`, then `/skills info review-api-changes` to see that Copilot found it. Then check both ways it can be used:

- **By name:** start a prompt with `/review-api-changes` and check that the agent follows the steps.
- **By description:** ask for the task in ordinary words, without naming the skill, and check that Copilot chooses it. If it doesn't, the description doesn't match how the task is asked for.

In VS Code, type `/skills` in the chat input to see the skills it found. Once it loads, [test whether it helps](test-agent-skills.md). For a project-specific example, see this wiki's [wiki-review skill](https://github.com/ho-henry-senior/ai-wiki/blob/main/.agents/skills/wiki-review/SKILL.md).

## Sources

- [Agent Skills specification](https://agentskills.io/specification)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: Creating agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)
- [VS Code docs: Use Agent Skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills)
