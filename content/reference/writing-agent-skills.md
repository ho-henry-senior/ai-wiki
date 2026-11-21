---
type: reference
summary: Where Copilot finds skills, the SKILL.md syntax and required metadata, optional supporting files, and a complete small example.
status: developing
lane: guides
order: 12
checked: 2026-11-15
tags:
  - Skills
---

# Write a SKILL.md

Once you have [decided a skill is worth adding](../goals/economy/useful-skills.md) and found nothing suitable in [the skills directory](agent-skills-directory.md), create a directory containing a `SKILL.md` file with **YAML front matter** followed by **Markdown instructions**. The portable [Agent Skills specification](https://agentskills.io/specification) defines the format, not where every product searches for skills or whether it supports slash commands.

## Where to put it

Put project skills in `.agents/skills/NAME/SKILL.md`. Copilot reads it, and the folder is not named after one product. Copilot also reads `.github/skills/` and `.claude/skills/`. The `SKILL.md` format is the open Agent Skills standard, so the same skill can work in other agents that support it.

| Copilot feature                                     |  Loads project skills   |
| --------------------------------------------------- | :---------------------: |
| Cloud agent and code review on GitHub.com           |           Yes           |
| Copilot CLI and the Copilot app                     |           Yes           |
| Agent mode in VS Code, Visual Studio, and JetBrains | Yes (version-dependent) |

In the Copilot features that support skills, the agent uses each skill's name and description to choose one, then loads its instructions when the task calls for it. Personal skills go in `~/.copilot/skills/` or `~/.agents/skills/`, but cloud sessions do not see them; put any skill the cloud agent needs in the repository. To share skills across several repositories, see [the Home Repo pattern](../articles/home-repo-pattern.md). `gh skill` in the GitHub CLI can find and install skills from GitHub repositories.

Source for this section: GitHub's [agent skills documentation](https://docs.github.com/en/copilot/concepts/customizations/agent-skills).

## Composition

```text
.agents/skills/
└── review-api-changes/
    ├── SKILL.md
    ├── references/          # Optional documentation
    ├── scripts/             # Optional executables
    └── assets/              # Optional templates or data
```

The required file is named `SKILL.md` exactly. The skill directory and `name` should match, using lowercase hyphenated words. The optional folders are not needed for a small skill.

## Complete example

Save this as `.agents/skills/review-api-changes/SKILL.md`:

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

The opening and closing `---` delimit YAML front matter. **`name` and `description` are required.** The description should explain _what the skill does_ and _when to use it_: agents may use it to decide whether to load the instructions. The body is normal Markdown with headings, steps, links and code blocks.

Optional standard metadata includes `license`, `compatibility`, `allowed-tools` and `metadata`. Product-specific fields such as `disable-model-invocation` in [some listed skills](agent-skills-directory.md) are not universal requirements.

## Instructions and supporting files

Keep the main file focused on its inputs, steps, expected output and checks. Put longer explanations in `references/`, executable helpers in `scripts/` and templates in `assets/`. Link to supporting files from `SKILL.md`; a link is a pointer, not proof the agent loaded it.

Avoid copying `AGENTS.md` into each skill. A skill is for a bounded repeatable procedure, not every repository rule. Scripts can read data, write files and use the network, so inspect their dependencies and permissions before running them.

Before reusing it, follow the [real-task comparison](../goals/economy/useful-skills.md#decide-whether-you-need-one). For a project-specific example, see [the wiki-review skill](https://github.com/ho-henry-senior/ai-wiki/blob/main/.agents/skills/wiki-review/SKILL.md) for a project-specific example.
