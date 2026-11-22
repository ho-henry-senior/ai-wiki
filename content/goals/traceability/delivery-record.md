---
type: advice
summary: "Agile delivery already records what was asked, what changed and who approved it; keep agent work to the same process, record what was checked, and show which changes an agent made."
status: established
lane: goals
goal: traceability
order: 2
checked: 2026-11-15
tags:
  - Copilot
  - Pull requests and review
---

# A record through your delivery process

Agile delivery already records what was asked, what changed and who approved it; keep agent work to the same process, record what was checked, and show which changes an agent made.

Use the norms you use for people's work: a ticket for the request, small commits with clear messages, a pull request that says what changed and why, and an approving review from a named person. Then the record needs no extra process. In public-sector work, it may be an obligation.

## Record what was checked

Note on the pull request what was checked, what it showed, and what wasn't checked. CI results aren't a lasting record: Actions keeps checks, runs and logs for 90 days by default, and public repositories can't keep them longer, while CLI and editor sessions are yours to delete. Make corrections in pull request comments too, [as when steering](../alignment/hand-off-and-steer.md#steer-it).

Summarise logs rather than pasting them, and never record secrets: a record is shared more widely than the session it came from. To keep records longer, check your organisation's records policy; GitHub Enterprise Cloud can stream agent audit-log events to long-term storage.

## Show which changes an agent made

A reader needs to know which changes a person wrote and which an agent did. Copilot cloud agent commits are authored by Copilot, signed, and link to the session log, which stays on GitHub and can't be deleted. For a tool that commits under your name, add a `Co-authored-by:` line naming it:

```text
Add CSV export for orders

Co-authored-by: Example Agent <agent@example.com>
```

## Check the record

Someone should be able to answer these five questions from an agent-produced pull request alone:

| Question                            | Where the answer should be                    |
| ----------------------------------- | --------------------------------------------- |
| What was asked?                     | The linked issue                              |
| Who or what made the change?        | Commit authors and `Co-authored-by:` lines    |
| What changed course, and why?       | Pull request comments                         |
| What was checked, and what was not? | A pull request comment summarising the checks |
| Who approved it?                    | The pull request review                       |

## Sources

- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Tracking Copilot's sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/track-copilot-sessions)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Docs: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
