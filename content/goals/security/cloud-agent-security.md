---
type: guide
summary: What GitHub enforces for the Copilot cloud agent and why, what each setting you control protects against, and where its limits stop; secrets, firewall, MCP servers, workflow approval, and who can start it.
status: established
lane: articles
goal: security
order: 3
checked: 2026-11-15
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
  - MCP
---

# Secure the Copilot cloud agent

The Copilot cloud agent runs in a fresh GitHub Actions environment, not on your computer, and usually nobody watches the run. You see its work only when it opens a pull request, by which time it has already used whatever secrets and network access it had.

**Reviewing the pull request protects your default branch; only limits on the run protect everything else.** GitHub enforces some of those limits, and you set the rest.

## What GitHub enforces

| Limit            | What it means                                                                                                                           | What it protects against                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Secrets          | The agent cannot read your repository or organization Actions secrets. It sees only secrets and variables in the `copilot` environment. | An injected instruction sending your deployment or organization credentials somewhere. |
| Branch           | It can push only to its own branch, and cannot approve or merge its pull request.                                                       | Unreviewed code reaching your default branch.                                          |
| Workflows        | Actions workflows do not run on its pull request until someone with write access clicks **Approve and run workflows**.                  | The agent's code running in workflows that have write access or secrets of their own.  |
| Who can start it | Only people with write access can assign it work or steer it.                                                                           | Outsiders directing the agent.                                                         |
| Firewall         | Internet access from the agent's shell is limited to an allowlist by default.                                                           | Data leaving for, or code arriving from, a host you did not expect.                    |
| Hidden text      | HTML comments and hidden characters in issues and comments are removed before the agent reads them.                                     | Instructions a human reviewer of the issue could not see.                              |

## What you need to set

1. **Keep the `copilot` environment minimal.** Whatever is in it, an injected instruction could try to send. Add only the secrets the task needs, scoped and short-lived, and never deployment or organization-wide credentials.
2. **Keep the firewall on, and add hosts one at a time.** Each host you allow is one more place data can go. The firewall covers processes the agent starts through its shell. It does **not** cover MCP servers or your `copilot-setup-steps.yml` steps, so check what those can reach. Its recommended allowlist includes common package registries, so it will not stop the agent installing a bad package; see [invented package names](../../concepts/hallucinated-dependencies.md). GitHub also says the firewall is not a complete security solution.
3. **Review the MCP servers you configure for the agent** as carefully as code that runs with its permissions, because that is what they are, and the firewall does not limit them.
4. **Leave Require approval for workflow runs on** in the cloud agent's settings. Turning it off lets unreviewed code from the agent run in workflows that may have write access or secrets. [Verify the result](../alignment/define-and-verify-tasks.md#verify-the-result) says what to check before approving.
5. **Keep branch protection with required reviews.** GitHub stops the person who asked the agent for the work from approving its pull request, so with required reviews on, someone who did not direct the work has to approve it. Without required reviews, nothing makes that second look happen.
6. **Decide what it may read.** Assigning it an issue gives the issue's text to the model, so treat issues and comments from outside your team as untrusted input. See [prompt injection](prompt-injection-coding-agents.md).

Organization owners can set the firewall for every repository and stop repositories adding their own allowlist rules. Repository administrators can change it only where the organization lets them.

Sources: GitHub's documentation on [the agent firewall](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall), [risks and mitigations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations), and [responsible use](https://docs.github.com/en/copilot/responsible-use/copilot-cloud-agent).

## Other hosted agents

Ask the same questions of any hosted agent: which secrets it can see, what it can push, what network it can reach, who can start it, and which integrations sit outside its limits. "Cloud" does not mean sandboxed or short-lived; it means the run happens where you are not watching.

For where its logs and records go, see [Traceability & Trust](../traceability/README.md) and the [agent data-flow checklist](../../reference/agent-data-flow-checklist.md).
