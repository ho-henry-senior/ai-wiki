---
type: reference
summary: Models sometimes name packages that do not exist, often the same ones; attackers register those names, and an agent that installs dependencies itself can run their code before anyone reviews it.
status: developing
lane: guidance
goal: concepts
order: 13
checked: 2026-11-16
---

# Invented package names can be real attacks

A model suggests a package by predicting a plausible name, not by checking a registry, so it sometimes names one that does not exist. Attackers register such names with malicious code. This is called slopsquatting. An agent makes it worse than a chat answer would, because it adds the dependency and runs the install itself, so the code can run before the change reaches review.

## How it happens

- **Models invent names at a measurable rate.** In a peer-reviewed study presented at USENIX Security 2025, 5.2% of code samples from commercial models and 21.7% from open-source models referred to a package that did not exist.
- **The same names recur,** which makes them predictable. A 2026 study, not yet peer reviewed, found 127 names that five different frontier models all invented. An attacker does not have to guess; they can read a list.
- **Registering a name is free and immediate** on public registries such as npm and PyPI.
- **Installing runs code.** npm runs a package's install scripts during installation, and building a Python package from source runs its setup code. Either can happen with the agent's access, in your session or in the cloud agent's environment.

Compromised real packages and names one typo away from real ones reach you the same way, and the defenses below cover them too.

## What stops it

- **Read every new dependency in the diff and the lock file.** Check that it exists, who publishes it, when it was first published, and how widely it is used. A package whose name fits the task exactly but appeared recently with few downloads is the pattern to look for.
- **Stop install scripts running by default:** `npm config set ignore-scripts true`. Some packages need their scripts; with this set, you allow them knowingly. For Python, `pip install --only-binary :all:` avoids building packages from source. Both close one path, code that runs at install time; a malicious package can still run its code when your project imports or runs it.
- **Install from the lock file in automation,** for example with `npm ci` in `copilot-setup-steps.yml`, so every run installs exactly the versions the lock file records. That makes installs reproducible, not safe: the agent can change the manifest and the lock file, so the lock file is only as trustworthy as the review of its diff.
- **Contain what an install script can reach.** On your computer, the [local sandbox](../pages/local-agent-sandboxing.md) limits files, network, and credentials. In the cloud, the firewall's recommended allowlist includes common package registries, so it does not stop the download; keep the `copilot` environment minimal instead.

Asking the agent in `AGENTS.md` to check before adding a dependency helps, but it is an instruction, not a limit; see [instructions are not enforced controls](instructions-vs-controls.md).

## Sources

- [Cloud Security Alliance: Slopsquatting, AI hallucinations as supply-chain attack vectors](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/) — summarizes the USENIX Security 2025 study.
- [CSO Online: Top AIs invent the same fake PyPI and npm package names](https://www.csoonline.com/article/4201164) — reports the 2026 study of recurring names.
- [GitHub Docs: Customizing the agent firewall](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall)

Applied in [the security overview](../pages/security.md), [the cloud agent guide](../pages/cloud-agent-security.md), and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
