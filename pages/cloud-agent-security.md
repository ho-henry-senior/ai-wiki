---
type: guide
summary: Know what GitHub already enforces for the Copilot cloud agent, and set the rest yourself; secrets, firewall, MCP servers, workflow approval, and who can start it.
status: established
---

# Secure the Copilot cloud agent

The Copilot cloud agent runs in a fresh GitHub Actions environment, not on your computer. GitHub enforces some limits for you. Set the rest yourself, because a cloud run often has no one watching it.

## What GitHub enforces

| Limit            | What it means                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Secrets          | The agent cannot read your repository or organization Actions secrets. It sees only secrets and variables in the `copilot` environment. |
| Branch           | It can push only to its own branch, and cannot approve or merge its pull request.                                                       |
| Workflows        | Actions workflows do not run on its pull request until someone with write access clicks **Approve and run workflows**.                  |
| Who can start it | Only people with write access can assign it work or steer it.                                                                           |
| Firewall         | Internet access is limited to an allowlist by default.                                                                                  |
| Hidden text      | HTML comments and hidden characters in issues and comments are removed before the agent reads them.                                     |

## What you need to set

1. **Keep the `copilot` environment minimal.** Add only the secrets the task needs, scoped and short-lived. Never add deployment or organization-wide credentials.
2. **Keep the firewall on**, and add hosts to the allowlist one at a time. The firewall only covers processes the agent starts through its shell. It does **not** cover MCP servers or your `copilot-setup-steps.yml` steps, so check what those can reach.
3. **Review MCP servers you configure for the agent** as carefully as code that runs with its permissions.
4. **Leave Require approval for workflow runs on** in the cloud agent's settings. Turning it off lets unreviewed code from the agent run workflows that may have write access or secrets. [Verify the result](define-and-verify-tasks.md#verify-the-result) says what to check before approving.
5. **Keep branch protection and required reviews.** The agent's pull request then needs approval from someone other than the person who asked for it.
6. **Decide what it may read.** Issues and comments from people outside your team are untrusted input. See [prompt injection](prompt-injection-coding-agents.md).

**A pull request gate does not limit what happens during the run.** A run with broad credentials can still do damage before anyone reviews its pull request, so limit the run itself.

Checked 15 November 2026 against GitHub's documentation on [risks and mitigations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations), [responsible use](https://docs.github.com/en/copilot/responsible-use/copilot-cloud-agent), and [the agent firewall](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall).

## Other hosted agents

Ask the same questions of any hosted agent: which secrets it can see, what it can push, what network it can reach, who can start it, and which integrations sit outside its limits. Do not assume "cloud" means sandboxed or short-lived.

For where its logs and records go, see [traceability](traceability.md) and the [agent data-flow checklist](agent-data-flow-checklist.md).
