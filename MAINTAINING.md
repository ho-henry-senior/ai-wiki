# Maintaining the wiki

Requires [Just](https://just.systems/), Node.js 22 or later, and npm. Run `just --list` to discover tasks, `just setup` to install the pinned development tools, then `just verify` to test and check the sitemap, Markdown formatting, and internal links, including heading anchors. Checks include `concepts/`, `slides/`, repository skills under `.agents/skills/`, and workflow Markdown. External URLs and raw material under `data/` are excluded.

The [sitemap](pages/sitemap.md) lists pages from their metadata and shows the links curated in the four outcome overviews. After adding or removing content, changing its title or metadata, or changing overview links, run `just sitemap`; `just verify` reports stale output without changing it. The sitemap excludes directory indexes and raw material from its generated inventory.

Use `just format` to apply formatting or `just links` to check local links alone. Formatting preserves prose line breaks and leaves embedded code examples unchanged. Recipes delegate to npm scripts, which can also be run directly. See [the agent entrypoint](AGENTS.md) for context pointers and [page conventions](pages/README.md) when adding content.

For a periodic structural or freshness review, use [the wiki-review skill](.agents/skills/wiki-review/SKILL.md). Reviews report their coverage and evidence; a structural review does not imply that every external claim has been reverified.

The dependency overrides pin patched `glob` and `minimatch` releases while the link-checking toolchain still requests older versions.

## Daily reviews

The [daily wiki review](.github/workflows/daily-wiki-review.md) uses [GitHub Agentic Workflows](https://github.github.com/gh-aw/) and Copilot to propose small content improvements. It runs daily at a compiler-selected UTC time or manually from Actions, only on the default branch. An open PR with the `[wiki-review]` title prefix pauses further reviews until it is merged or closed. The agent also checks prior review PRs; duplicate detection is best-effort, not an exactly-once guarantee.

Reviews use the existing skill, check the baseline before starting, and must run `just verify` after their edits before requesting a draft PR. Safe outputs restrict patches to the root topic map and Markdown under `pages/`, `concepts/`, and `sources/`, with at most 12 changed files. Policies, instructions, slides, automation, tooling, and raw archives are outside the edit scope. Nothing merges automatically. Reviews report their actual coverage and evidence; uncertain claims are left unchanged.

Each review has a 100-AI-credit inference budget split between the main agent (80) and threat detection (20). The agent has a 20-minute execution timeout and a 40-turn limit. A per-user 24-hour guardrail also uses 100 credits; it checks prior usage at activation rather than reserving a shared daily allowance. These are usage guardrails, not a hard dollar billing cap: an in-flight request can exceed the remaining budget, and GitHub Actions runner charges are separate. See [the budget reference](https://github.github.com/gh-aw/reference/cost-management/). Failed agent runs or failed threat detection block PR publication.

Before the first run:

1. Add the source workflow and generated `.lock.yml` to the default branch. GitHub Actions executes the generated file.
2. Follow [Copilot authentication for personal repositories](https://github.github.com/gh-aw/reference/auth/#copilot_github_token): create a fine-grained PAT owned by your user account with the **Copilot Requests: Read** account permission, and store it as the Actions repository secret `COPILOT_GITHUB_TOKEN`. Enter it directly in GitHub or with `gh secret set COPILOT_GITHUB_TOKEN`; keep it out of chat and source control. An active Copilot license is required. This workflow deliberately does not use organization-billed `copilot-requests: write`.
3. In repository **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Keep the default token permissions read-only; only compiler-managed publication and reporting jobs carry repository write permissions, not the agent. The workflow never requests PR approval.
4. Manually run **Daily wiki review** from Actions and inspect its logs, credit usage, and any draft PR. A local compilation is not an end-to-end execution test.

PRs use the repository's `GITHUB_TOKEN` and do not automatically trigger other Actions workflows. Review and verify the proposed branch before merging. Missing credentials and other failures are recorded in Actions rather than creating daily failure issues. Disable the workflow in Actions to pause it.

To change the automation, edit its Markdown source, then run `gh aw compile daily-wiki-review --validate` with the [gh-aw CLI extension](https://github.github.com/gh-aw/setup/quick-start/) and commit both source and regenerated lock file. The initial lock was compiled with gh-aw v1.0.1. `just verify` includes the workflow Markdown; compilation separately checks the generated Actions configuration.
