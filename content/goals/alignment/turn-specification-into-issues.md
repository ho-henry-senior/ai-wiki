---
type: how-to
summary: Split an agreed specification into small issues, each with an outcome, acceptance criteria the agent can check, the commands to run, and what is out of scope.
status: established
lane: guides
goal: alignment
tags:
  - Specifications
  - Testing
---

# Turn the specification into issues

Once the specification is agreed, ask the agent to split it into [small, verifiable](../../concepts/change-granularity.md) GitHub issues, each linked to the specification. Check that the issues collectively cover the agreed outcome and do not introduce new requirements. For each issue, use four headings. Each answers a question the implementing agent would otherwise answer for itself:

```markdown
## Outcome

Users can export the orders table as a CSV file from the Orders page.

## Acceptance criteria

- The file has a header row that matches the table's columns.
- Values containing commas or quotes are quoted correctly.
- An export of 10,000 rows finishes without timing out.

## Checks

- Add a test with a value that contains both a comma and a quote.
- Run `make test-unit` for the exporter tests, then `make check`.

## Out of scope

- Excel (.xlsx) export.
- Changing the table's columns.
```

- **Outcome** says what the user gets, so the agent aims at the result rather than at a plausible change.
- **Acceptance criteria** are what the agent will check its work against. Make each one observable, so a check fails if it is missed; "works well" cannot fail.
- **Checks** names the commands, so the agent runs your tests rather than inventing its own or judging by reading the code.
- **Out of scope** stops nearby work the agent might think helps, which costs time and makes the diff harder to review.

If you cannot write the acceptance criteria, the issue is not ready: return to the specification or settle the open questions first. For a small, clear change, a short agreed task may be enough without a separate specification document.

For independent local agent tasks, [Git worktrees](../../reference/git-worktrees-for-agents.md) give each session a separate working directory and branch without isolating its tools or credentials.

Related skill: Matt Pocock's [\`/to-tickets\`](../../reference/agent-skills-directory.md#to-tickets) proposes dependent vertical-slice tickets. Check and approve the breakdown before creating issues.

Then [hand an issue to the agent](hand-off-and-steer.md).
