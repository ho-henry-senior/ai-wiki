---
type: reference
summary: Curated agent skills for requirements, specifications, tickets, implementation, review and documentation, with source and author links.
status: developing
lane: reference
order: 11
checked: 2026-11-18
tags:
  - Skills and custom agents
---

# Agent skills directory

A small selection of **real skills to inspect and adapt**, not tested endorsements or skills installed by this wiki. Each entry links to the original `SKILL.md` and its author or maintainer. Read the whole skill and bundled scripts before installation: a skill can ask an agent to run commands or act in external systems.

To build one, see [Write a SKILL.md](writing-agent-skills.md). For whether a skill is worth installing, see [Choose and add skills](../goals/economy/useful-skills.md).

## Requirements and planning

### /grill-me and /grilling

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) and [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md).

`/grill-me` delegates to `/grilling`. The latter interviews the user in rounds, clarifying dependencies between decisions before work begins. A deliberately intensive method; the user still owns the decisions.

### /to-spec

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md).

Synthesises a conversation and repository context into a specification. **Caution:** the source publishes to a configured tracker without a final approval of the full specification; [this wiki recommends human agreement](../goals/alignment/detailed-specification-from-agreed-decisions.md) before implementation.

### /to-tickets

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-tickets/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md).

Breaks a specification into verifiable vertical-slice tickets with explicit dependencies. Asks the user to approve the ticket breakdown before publishing to the configured tracker or local files.

## Implementation and review

### /tdd

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [tdd/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md).

A test-first workflow focused on observable behaviour at agreed interfaces. Requires test-boundary decisions and repository test tooling.

### /implement-spec

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [implement-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement-spec/SKILL.md).

Coordinates ticket implementations through separate worktrees, subagents and an integration branch. Needs a configured tracker and supported tooling; [worktrees are not sandboxes](../concepts/worktrees-not-sandboxes.md).

### /code-review

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [code-review/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md).

Reviews a diff both against repository coding standards and the originating specification. It uses subagents; human review remains essential.

## Documentation and maintenance

### docs-sync-audit

**Maintainer:** [GitHub Awesome Copilot community](https://github.com/github/awesome-copilot). **Source:** [docs-sync-audit/SKILL.md](https://github.com/github/awesome-copilot/blob/main/skills/docs-sync-audit/SKILL.md).

Checks documentation claims against code/configuration and distinguishes confirmed drift from possible gaps. Its bundled script needs separate inspection. The repository maintainer is credited rather than assuming individual authorship.

### wiki-review

**Maintainer:** [Making the most of agents contributors](https://github.com/ho-henry-senior/ai-wiki). **Source:** [wiki-review/SKILL.md](https://github.com/ho-henry-senior/ai-wiki/blob/main/.agents/skills/wiki-review/SKILL.md).

Reviews this wiki's structure, navigation, duplicated concepts and design goals. Its procedures refer to project-specific conventions.

These eight entries were inspected on 2026-11-18, **not installed or executed** in this review. Their requirements and slash-command availability vary by product and may change. Recheck the source before adoption.
