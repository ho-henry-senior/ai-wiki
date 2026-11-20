# Page reviews

How to review an Article or Reference page, and the decisions recorded so far. The writing principles a review checks against are in [the writing standard](STYLE.md); this file covers only the review method and its record. Goals pages are outside this review: assess them in their own context.

## How to review a page

1. **Read the published page,** not only its Markdown: the reading effort, clarity, density and presentation, and whether its assets help.
2. **Ask first whether it should exist on its own.** What would a reader lose if it disappeared? Could its few distinctive points live better in another page?
3. **Judge it in this order:** practical usefulness, then relevance to the reader, distinctiveness and overlap with other pages, writing, information density, and presentation within the page.
4. **Count diagrams, examples and other assets in its favour only when they help.** A strong text-only page is not marked down.
5. **Adjust for its type.** A concise piece of advice, a summary of someone else's pattern, a longer case study and a curated directory each do a different job.
6. **Record a decision:** keep, refine, merge, remove or defer, with a one-line reason and the likely changes.

Assess navigation and discoverability separately, as a property of the site, not of the page. Scores, if used at all, are notes to support a decision, never the decision.

**Removal is provisional until it is carried out.** Before removing a page, check what is distinctive in it and where that should move, update incoming links, and add a redirect if the page was linked from outside. **Defer** means the topic deserves coverage but isn't a priority now; it is not a removal.

Make the changes in small batches of related pages, after comparing pages that overlap, rather than rewriting one page at a time.

## How to record a decision

Add one line under [Decisions](#decisions): the page's title, linked to its file; the decision in bold; then the reason and likely changes. When a decision is carried out, add the pull request number. When a later review changes a decision, replace the line rather than adding a second one.

## Decisions

From the pilot review of five pages ([#135](https://github.com/ho-henry-senior/ai-wiki/issues/135)):

- [The model requests; the harness acts](../content/concepts/tool-call-loop.md) — **Keep; refine the visual.** A good explanation. Make the slide a self-contained, reusable diagram rather than a partial duplicate; reusable includes are tracked in [#133](https://github.com/ho-henry-senior/ai-wiki/issues/133).
- [Repository layout example](../content/reference/repository-layout-example.md) — **Keep; substantially revise.** Keep the useful directory tree, and rebuild the page around about six pieces of practical repository-readiness advice, linking to the detail. Remove the repeated opening, the in-page navigation and the low-value diagram, and don't present this wiki's own files as exemplars without saying why.
- [The Home Repo pattern](../content/articles/home-repo-pattern.md) — **Keep; lightly refine.** An informative summary of an external pattern, with useful examples. Shorten it, and make its attribution and source clear.
- [Lo-fi software factory case study](../content/articles/lo-fi-software-factory-case-study.md) — **Keep; lightly refine.** A longer treatment suits a case study, and its related links help. Consider reusing an existing workflow diagram as a shared asset.
- [Agent skills directory](../content/reference/agent-skills-directory.md) — **Keep; substantially restructure.** Useful but sprawling. Focus on what skills help with, good credited examples, and what Copilot provides built in, linking to the writing and choosing guides rather than repeating them. Distinguish inspected skills from tested ones.

From reviews 6 to 12:

- [From agile roles to agent-assisted workflows](../content/articles/agent-role-boundaries.md) — **Keep; substantially shorten.** Keep the sequence diagram of agent handoffs and human intervention, possibly as a reusable asset. Reduce the illustrative RACI matrix and the role tables, and link to the permissions and approval guidance. The workflow is an example, not a standard arrangement.
- **Task names need explicit contracts — Remove in [PR #138](https://github.com/ho-henry-senior/ai-wiki/pull/138).** Its four points (scope, cost, side effects and meaning of failure) now live in [Let the agent run your repository's commands](../content/goals/alignment/agent-tool-delegation.md); the separate concept repeated that advice.
- **A worktree is not a sandbox — Remove in [PR #140](https://github.com/ho-henry-senior/ai-wiki/pull/140).** The standalone warning addresses an unlikely misconception. [Git worktrees for parallel agent work](../content/reference/git-worktrees-for-agents.md) retains the practical explanation and shared-state caveats.
- [Evals](../content/concepts/evals.md) — **Keep; defer development.** An important idea for judging agent performance across representative tasks, but the page is underdeveloped and not a near-term priority.
- **Passing tests are evidence, not proof — Remove in [PR #139](https://github.com/ho-henry-senior/ai-wiki/pull/139).** Consolidate acceptance-criterion coverage, tests that detect realistic failures, red-first verification, and the limits of unit tests in [Define, steer, and verify a task](../content/goals/alignment/define-and-verify-tasks.md#verify-the-result). Its short slide repeats the same caveat without adding a useful visual.
- [Progressive disclosure](../content/concepts/progressive-disclosure.md) — **Keep as a short concept; refocus.** Explain deliberate context design: a small initial context, good signposts, compact destinations and expansion on demand. One concrete example is enough; leave Copilot's loading mechanics to the repository-instructions guidance. It is distinct from retrieval-augmented generation.
- **Secrets can leak through tool output — Remove in [PR #141](https://github.com/ho-henry-senior/ai-wiki/pull/141).** The risk, masking precautions and credential-rotation response now appear in [Unexpected data exposure](../content/goals/security/unexpected-data-exposure.md) and [Secure a local coding agent](../content/goals/security/local-agent-security.md), with links to retention and session history. The standalone scenario added little.

## Next

Compare the remaining Articles and Reference pages in groups, note further pages to merge or remove, and then prioritise small batches of changes. A detailed review of every remaining page, one at a time, is not needed.
