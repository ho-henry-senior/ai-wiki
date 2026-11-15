---
type: overview
summary: Leave a record someone else can follow later, covering what was asked, who or what made the change, who approved it, and the evidence.
status: established
---

# Traceability

Leave a record that someone else can follow later: what was asked, who or what made the change, how it was corrected, who approved it, and the evidence. Keep that record on the issue and pull request, where reviewers and auditors look. For public-sector work, this record is often an obligation.

## Try this first

Open your last agent pull request and check that a reader could answer these questions from GitHub alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarizing the checks |
| Who approved it?                    | The pull request review                       |

## Core advice

- **Record who did the work.** Commits from the Copilot cloud agent are authored by Copilot, list the person who started the task as co-author, are signed, and link to the session log. For any tool that commits under your name, add a `Co-authored-by:` line that names the agent.
- **Copy the evidence onto the pull request.** Actions keeps checks, workflow runs, and logs for 90 days by default, and public repositories cannot keep them longer. Add a comment that says which checks ran, their results, and which did not run.
- **Keep the record where reviewers look.** Cloud agent session logs stay on GitHub, are visible to anyone with access to the repository, and can be archived but not deleted. Copilot CLI and editor sessions belong to you and can be deleted, so put anything a reviewer needs on the pull request.
- **Steer in the open.** Put corrections in pull request comments, not private chat, so a reviewer can see why the result differs from the request. [How to steer](define-and-verify-tasks.md#steer-it).
- **Separate who asked from who approved.** The pull request review should name a human approver other than the requester. See [verify the result](define-and-verify-tasks.md#verify-the-result).
- **Treat the agent's explanation as a claim.** A pull request description or session narrative is the agent's account, not evidence. Check it against the diff and the checks.
- **Keep records safe.** Summarize logs rather than pasting them, and never record secrets. See [sensitive data in agent workflows](sensitive-data-in-agent-workflows.md).

If your organization must keep records for longer, check its records policy. GitHub Enterprise Cloud can stream audit-log events for agents to long-term storage.

## Example

A fictional pull request timeline that answers every question above:

```text
Issue #41   Add CSV export to the Orders page. Done when: header row; quoted values; 10,000 rows.
PR #42      Opened by Copilot, linked to #41. Commits authored by Copilot, co-authored by A. Patel.
Comment     A. Patel: @copilot keep the existing column order; finance imports this file.
Comment     A. Patel: Unit tests passed. The 10,000-row test did not run: no test data.
Comment     A. Patel: @copilot add a generated 10,000-row fixture and run the test.
Comment     A. Patel: 10,000-row test passed (run 1187).
Review      B. Jones approved.
```

A commit that another tool made under your name records the agent like this:

```text
Add CSV export for orders

Co-authored-by: Example Agent <agent@example.com>
```

## Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — record decisions in ADRs, separating confirmed rationale from inference.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — artifacts and review evidence in a real workflow.

## Sources

Checked 15 November 2026.

- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Tracking Copilot's sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/track-copilot-sessions)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
- [GitHub Docs: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
