---
type: pattern
summary: A Just-specific example and guidance on when a wrapper may help expose existing repository commands.
---

# Just as an agent-facing task interface

A root `justfile` can provide a stable interface over existing tools when commands are otherwise hard to discover or invoke. It is one option, not a required wrapper or replacement build system. For the general guidance on choosing tasks and documenting their contracts, see [delegating repository tasks to tools](agent-tool-delegation.md) and the [task-interface contract](../concepts/task-interface-contracts.md).

## Example: this wiki's Justfile

These recipes are an excerpt from this wiki's [Justfile](../justfile):

```just
# Test and check the sitemap, Markdown formatting, and local links without modifying files.
verify:
    npm run verify

# Check Markdown formatting without modifying files.
format-check:
    npm run format:check

# Apply Markdown formatting (modifies files).
format:
    npm run format
```

`just --list` exposes the recipe names and comments. These checks are separate from the mutating formatter, and the recipes delegate to the wiki's npm scripts. See the Justfile and `package.json` for current definitions; this is an example, not a universal recipe set.

## When not to add one

Just is one practical choice, not a requirement. If existing package scripts or another task runner already provide an equally discoverable and dependable interface, use that rather than adding a wrapper layer for its own sake.

## Examples

The [Justfile patterns across Node.js and Python repositories](../sources/repository-justfiles.md) show different ways to compose focused tests, routine checks, diagnostics, and mutating recipes. Treat them as observed examples, not normative names.
