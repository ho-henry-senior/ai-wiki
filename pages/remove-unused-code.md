---
type: guide
summary: Find candidates for unused code with Knip in JavaScript and TypeScript or Vulture in Python, then investigate the findings before removing anything.
status: established
lane: goals
goal: economy
order: 12
checked: 2026-11-17
tags:
  - Commands
---

# Find and remove unused code

Code left behind after a change makes the next change harder: there is more to read, maintain, and potentially depend on. **Use a static analysis tool to find candidates, then ask an agent to investigate them.** A report is evidence to check, not permission to delete code.

## Pick one tool for your repository

| Tool | Use it for | Run it |
| --- | --- | --- |
| [Knip](https://knip.dev/) | Unused files, exports, and dependencies in JavaScript and TypeScript | `npx knip` |
| [Vulture](https://github.com/jendrikseipp/vulture) | Potentially unused Python functions, classes, variables, imports, and other code | `python -m vulture .` |

Run either command from the repository root after installing the tool in the project's development environment. For Python, `python -m vulture . --min-confidence 100` narrows the report to Vulture's highest-confidence findings; that still does not prove a declaration is unused.

## Investigate before deleting

Both tools use static analysis. Code may be used through framework conventions, reflection, dynamic imports, external consumers, or scripts that the analyzer does not understand. Knip's entry points and plugins affect what it considers reachable; Vulture reports confidence rather than proving non-use.

Start with a small group of findings. Ask the agent to show why each candidate is unused, inspect references and runtime entry points, and remove only code whose purpose can be ruled out. For a legitimate false positive, adjust the tool's configuration or whitelist rather than deleting working code.

Make the cleanup a focused pull request. Run the affected tests, then the repository's full checks, and review the diff before merging. Code behind a retired feature flag or an obsolete API may still be referenced, so neither tool can decide whether that behaviour is still needed.

## Give the agent the command

List the appropriate read-only scan in `AGENTS.md`, or expose it as a named package-script or Just recipe. Say that findings are **advisory** and must be reviewed before removal. See [let the agent run repository commands](agent-tool-delegation.md) and [local checks and tools](local-development-tools.md).

## Sources

- [Knip: Getting started](https://knip.dev/overview/getting-started)
- [Knip: How it works](https://knip.dev/explanations/how-knip-works)
- [Knip: Resolve reported issues](https://knip.dev/guides/handling-issues)
- [Vulture: Usage, confidence and false positives](https://github.com/jendrikseipp/vulture#readme)
