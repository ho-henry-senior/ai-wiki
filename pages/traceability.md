---
type: overview
summary: Leave a record someone else can follow later, covering what was asked, who or what made the change, how it was corrected, who approved it, and the evidence.
status: established
---

# Traceability

Leave a record that someone else can follow later, on the issue and pull request where reviewers and auditors look. For public-sector work, this record is often an obligation.

## Try this first

Check that a reader could answer these questions from your last agent pull request alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarizing the checks |
| Who approved it?                    | The pull request review                       |

## Core advice

- **Record who did the work.** Copilot cloud agent commits are authored by Copilot, signed, and link to the session log. For a tool that commits under your name, add a `Co-authored-by:` line naming it.
- **Copy the evidence onto the pull request.** Actions keeps checks, runs, and logs for 90 days by default, and public repositories cannot keep them longer. Add a comment listing which checks ran, their results, and which did not.
- **Keep the record where reviewers look.** Cloud agent session logs stay on GitHub and cannot be deleted. CLI and editor sessions are yours and can be, so put what a reviewer needs on the pull request.
- **Steer in the open.** Put corrections in pull request comments, so a reviewer can see why the result differs from the request. [How to steer](define-and-verify-tasks.md#steer-it).
- **Separate who asked from who approved.** [Verify the result](define-and-verify-tasks.md#verify-the-result).
- **Treat the agent's explanation as a claim.** Its pull request description is its account, not evidence; check it against the diff and the checks.
- **Keep records safe.** Summarize logs rather than pasting them, and never record secrets. [Agent data-flow checklist](agent-data-flow-checklist.md).

If you must keep records longer, check your organization's records policy; GitHub Enterprise Cloud can stream agent audit-log events to long-term storage.

## Example

A fictional timeline that answers every question above:

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

- [Furnish repositories with context for agents](repository-context-for-agents.md) — decisions in ADRs.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — review evidence in practice.

## Sources

Checked 15 November 2026.

- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Tracking Copilot's sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/track-copilot-sessions)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
- [GitHub Docs: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
