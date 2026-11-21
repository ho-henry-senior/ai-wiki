---
type: pattern
summary: Use a shared starting repository for agent instructions, skills and pointers when work spans several repositories, while keeping each project's rules and checks with its code.
status: developing
lane: articles
goal: alignment
checked: 2026-11-18
tags:
  - AGENTS.md
  - Repository
  - Skills
---

# The Home Repo pattern for agents working across repositories

When an agent works across several repositories, starting in one project can hide the others, while copying shared instructions and skills into every repository creates versions that drift. Matt Pocock calls an alternative the **Home Repo pattern**: start the agent in one repository that holds shared context and points to the projects it may need.

The Home Repo coordinates work; it does not replace the project repositories or their own instructions, checks and history.

## Give shared context one home

A small arrangement might be:

```text
workspace/
├── home/
│   ├── AGENTS.md           # Shared guidance and pointers to other repos
│   ├── skills/             # Procedures used across projects
│   └── docs/               # Decisions and conventions shared across repos
├── storefront/             # Its own code, AGENTS.md and checks
└── payments-api/           # Its own code, AGENTS.md and checks
```

Start a local coding-agent session in `home/`. Its `AGENTS.md` names the other repositories, says what each owns and where to find it. The agent can then inspect a project when the task calls for it, provided its filesystem and tool permissions allow access.

For example, the Home Repo could say:

```md
## Other repositories

- Storefront: ../storefront — customer-facing web application.
  Read its AGENTS.md before making changes.
- Payments API: ../payments-api — payment endpoints and contracts.
  Read its AGENTS.md before making changes.
```

These are **discovery pointers, not automatic context loading**. The agent still has to open the right files, and its coding environment must expose the paths.

Keep project-specific commands, contracts and constraints in each project's own repository. Put only genuinely shared skills and conventions in the Home Repo. This avoids creating a second, competing source of truth for a project's rules.

## Adopt it from an existing workflow

1. **Inventory** the repositories a recurring task crosses and the shared instructions or skills duplicated between them. Leave unrelated repositories out.
2. **Agree what moves.** Shared procedures can live in the Home Repo; build commands, local architecture and project-specific rules stay with the code. Review the proposed moves before changing files.
3. **Create a small starting point.** Add an `AGENTS.md` with short repository pointers and links to shared material. Start with plain paths and Markdown rather than new orchestration software.
4. **Try one cross-repository task.** Ask the agent to identify the repositories and contracts involved before editing. Check that it reads the project instructions, runs each project's checks, and presents the changes separately for review.

For a growing number of repositories, group pointers by system or area and link to those directories of repositories rather than putting every path in the starting instructions. This is [progressive disclosure](../concepts/progressive-disclosure.md): the agent opens details when it needs them.

## Boundaries and trade-offs

**A Home Repo is an organisational pattern, not an access control.** Starting an agent with visibility of more repositories increases what its tools might read or change. Give a session access only to the repositories and credentials its task needs. Filesystem pointers cannot override sandbox or permission settings.

A local agent with several checked-out repositories is different from the [Copilot cloud agent](../goals/security/cloud-agent-security.md), whose repository access is restricted by its execution environment. A Home Repo file does not grant that cloud agent access to other repositories.

Shared instructions also need an owner: a stale repository path or broad rule can mislead every session that starts there. Changes spanning repositories still require separate tests, pull requests and approvals. Don't assume that a successful check in one repository proves the integration works.

For work within a single repository, a short `AGENTS.md` and existing commands are usually simpler. See [Set up a repository for agents](../goals/alignment/agent-facing-repository-structure.md) and [repository context for coding agents](../goals/alignment/repository-context-for-agents.md).

## Source

- [Matt Pocock: The Home Repo Pattern](https://www.aihero.dev/the-home-repo-pattern) — the original proposal, setup prompt and discussion of scaling and alternatives.
