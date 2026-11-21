---
type: reference
summary: The SKILL.md syntax, required YAML metadata, Markdown instructions, optional supporting files and a complete small example.
status: developing
lane: reference
order: 12
checked: 2026-11-18
tags:
  - Skills
---

# Write a SKILL.md

Once you have [decided a skill is worth adding](../goals/economy/useful-skills.md), create a directory containing a `SKILL.md` file with **YAML front matter** followed by **Markdown instructions**. The portable [Agent Skills specification](https://agentskills.io/specification) defines the format, not where every product searches for skills or whether it supports slash commands.

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

Before reusing it, follow the [real-task comparison](../goals/economy/useful-skills.md#decide-whether-you-need-one). See [the skills directory](agent-skills-directory.md) for existing files and authors, or [the wiki-review skill](https://github.com/ho-henry-senior/ai-wiki/blob/main/.agents/skills/wiki-review/SKILL.md) for a project-specific example.
