---
type: overview
summary: Why agent work needs a record someone else can follow, and a review you can rely on; let the record make itself, put the check results on the pull request, read the risky parts first, and direct human attention by risk.
status: established
lane: goals
goal: traceability
order: 4
---

# Traceability & Trust

Agent work splits implementation, decisions and approval between a model and people. Decisions may be buried in private sessions, while checks and logs expire, leaving later readers unable to reconstruct what happened or why. Keep a record and verification evidence where reviewers can find them, so they can judge whether to trust the change without repeating the work; in public-sector work, that record may be an obligation.

## Core advice

- **[Agent authorship and attribution](agent-authorship-and-attribution.md)** — A reader needs to know which changes a person wrote and which an agent did.
- **[Pull request verification evidence](pull-request-verification-evidence.md)** — Add one comment saying which checks ran, what they showed, and which did not.
- **[Risk-focused change review](risk-focused-change-review.md)** — The agent's pull request description is its own account of what it did, so check it against the diff.
- **[Independent change approval](independent-change-approval.md)** — Who looks, and how closely, should depend on what a change touches and what the checks showed, not the agent's confidence.

## Trust: reviewing changes at scale

<div class="app-developing-card">
  <p class="govuk-body-s"><strong>Developing — guidance not yet established</strong></p>
  <p>As agents produce more pull requests, how can automated checks and risk assessments help people decide which changes need human review and which might be safe to merge automatically?</p>
  <p>This is an area for investigation, not yet a recommended workflow. The aim is to support risk-informed decisions with evidence rather than rely on an agent's confidence.</p>
</div>

## Example

Check whether someone could answer these five questions from an agent-produced pull request alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarizing the checks |
| Who approved it?                    | The pull request review                       |

This fictional timeline shows how a pull request can provide those answers:

```text
Issue #41   Add CSV export to the Orders page. Done when: header row; quoted values; 10,000 rows.
PR #42      Opened by Copilot, linked to #41. Commits authored by Copilot, co-authored by A. Patel.
Comment     A. Patel: @copilot keep the existing column order; finance imports this file.
Comment     A. Patel: Unit tests passed. The 10,000-row test did not run: no test data.
Comment     A. Patel: @copilot add a generated 10,000-row fixture and run the test.
Comment     A. Patel: 10,000-row test passed (run 1187).
Review      B. Jones approved.
```

A commit another tool made under your name records the agent like this:

```text
Add CSV export for orders

Co-authored-by: Example Agent <agent@example.com>
```

## Explore further

For more depth, see [furnish repositories with context for agents](../alignment/repository-context-for-agents.md) for decisions in ADRs, and the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for review evidence in practice.
