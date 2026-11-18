---
type: reference
summary: Four actual agent role Markdown files from the lo-fi software factory, with responsibilities, handoffs and demo-specific assumptions.
status: developing
lane: reference
order: 13
tags:
  - Skills and custom agents
---

# Agent roles directory

These four **original role files** were supplied as examples from the [lo-fi software factory case study](../articles/lo-fi-software-factory-case-study.md). Their individual authorship is not independently established; the files are reproduced here as supplied, without claiming they are general standards. Follow the source links to inspect or adapt the complete `.agent.md` files.

Roles allocate responsibilities, while [skills](agent-skills-directory.md) provide repeatable procedures. Neither role instructions nor skill text enforces tool permissions. See [skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md).

## Product

**Asset:** [product.agent.md](../../data/role-examples/product.agent.md).

Inspects a repository, uses Matt Pocock's [`/grill-me` and `/to-spec`](agent-skills-directory.md) skills to discover requirements, and obtains explicit human approval of the specification. It hands the agreed specification to the Business Analyst. It limits discovery questions to five per batch and leaves application code unchanged.

## Business Analyst

**Asset:** [business-analyst.agent.md](../../data/role-examples/business-analyst.agent.md).

Works from the approved product specification and uses Matt Pocock's [`/to-tickets`](agent-skills-directory.md#to-tickets) to propose independent, traceable GitHub Issues. It asks for human approval **before publishing tickets** and reports specification-to-issue mapping.

## Developer

**Asset:** [developer.agent.md](../../data/role-examples/developer.agent.md).

Implements one selected GitHub Issue, runs checks and opens a non-draft pull request, recording verification evidence. It has separate instructions for dispatcher-prepared worktrees and interactive runs, including issue blockers, branch checks, workflow labels and failure recovery. It never merges.

## Reviewer

**Asset:** [reviewer.agent.md](../../data/role-examples/reviewer.agent.md).

Independently examines a pull request against its Issue, code, tests and security concerns. It can publish a review comment in a dispatcher-led run but leaves approval and merge decisions to a human. A `review-complete` label records publication of a report, **not** an approval.

## Adapting these files

The Developer and Reviewer files assume the case study's `demo-config.json`, `docs/handover.md`, worktree paths, GitHub labels and dispatcher. The Product and Business Analyst assume globally installed skills and defined human approval points. **Do not install these as drop-in general-purpose agents**: replace those dependencies and verify supported front matter for your chosen agent before use.

The files show the actual sequence of responsibilities and handoffs in the case study, not a tested general architecture. For the underlying idea, read [From agile roles to agent-assisted workflows](../articles/agent-role-boundaries.md).
