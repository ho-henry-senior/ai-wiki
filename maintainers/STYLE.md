# Writing standard

Write so a developer understands what matters and why, and can act on it, on one read. Most readers use Copilot.

Use **British English (en-GB)**, with **-ise** spellings such as *organise*, *summarise* and *recognise*, in published and maintainer prose. Preserve official names, interface labels, setting names, quotations, code, commands, identifiers, file paths and URLs.

## Rules

1. **Give every recommendation its reason and underlying principle.** A reader should never meet an action without knowing what problem it addresses or what it prevents or achieves. Explain the principle when it helps readers apply the advice beyond the example; a procedure alone may miss the point. Put the reason where it reads best, before or alongside the action. Do not force every recommendation into the same order.
2. **Prefer shared conventions, and show actions in Copilot.** Recommend files and formats that agents share, such as `AGENTS.md`, over tool-specific ones. Give each action one concrete Copilot or GitHub example: a file, a command, a setting, or a short snippet the reader can copy. Explanations of how something works do not need one.
3. **State the behaviour, not "verify it".** Say what Copilot does, which part of Copilot it applies to (the editor, CLI, app, cloud agent, or code review), and record the date you checked in the page's `checked` front matter. Do not tell readers to "verify in your harness" without telling them how.
4. **State the advice in full.** A link adds depth; it never replaces the advice. A section that is one sentence and a link is not finished.
5. **Say it once.** Each core idea has one owner page, listed in [who owns what](MAINTAINING.md#who-owns-what). Elsewhere, summarise it in one line and link to the owner. Do not restate it.
6. **Cut hedges.** Avoid "appropriate", "relevant", "useful", "consider", "where practical", "materially", and "proportionate" unless the sentence is wrong without them. Give one specific caveat instead of several vague ones.
7. **Use plain words and short sentences without sacrificing precision.** Prefer the active voice and "you". One idea per sentence. State when a claim depends on the agent, permissions, settings, or environment. Never turn conditional behaviour into a universal claim to save words.
8. **Do not imply that examples are exhaustive.** Write "Four ways a coding agent can cause harm", not "The four ways", unless the list is genuinely complete. Apply this to headings, summaries, lists, and categories.
9. **Lead with the transferable idea.** Name a concept or principle clearly, say why it matters, and show how to apply it. Make tools examples of the idea rather than the reason for the page. Use a concept's established name as its heading when that name helps readers recognise and reuse it.
10. **Decide what to do with long pages.** A page over about 500 words for an overview, advice page or concept, or about 900 for a how-to, explanation, exploration or pattern, needs one decision, taken in this order: replace restated material with a link to its owner; split the page if it answers two separate questions; otherwise shorten it, or keep it whole and give the reason as `long-because` in its front matter. Shortening never cuts a reason, an important caveat, or a qualification needed for accuracy. Checklists, references, and case studies have no ceiling.

11. **Write for scanning.** Readers often skim before reading closely. Put the main point first, and give each paragraph one idea. Break paragraphs when the idea changes; concise writing does not mean dense text. Use bold sparingly for an important principle, and make link text describe its destination. Put supporting links on their own line when they would interrupt the advice. Use headings and lists only when they improve clarity.

12. **Give each page one reader need, and only what serves it.** A page should help a reader understand something or do something useful. Do not present an abstract outline as a followable guide: if the page cannot tell readers what to do without substantial extra research, make it an explanation or a glossary definition instead. Aim for around five substantive points, as a guideline rather than a limit, and link to deeper material rather than reproducing it. Make the point directly. Do not restate the summary in the introduction, and do not give a short, easy-to-scan page an in-page contents list. Keep a simple concept simple: a short explanation of a useful idea can be a page of its own without growing into a long article. Correct a misconception only when it is likely or consequential enough to matter; a warning often works better as one sentence in practical guidance than as a page.
13. **Make every illustration and example earn its place.** A diagram should make something easier to understand, or show what the text cannot, such as a sequence of handoffs. That a diagram is written in Mermaid is an implementation detail, not a reason to include it, unless the page is about diagrams agents can read. Choose the stronger form: a diagram for relationships and handoffs, a table for comparisons. An example should teach a particular lesson; say why it is worth inspecting, and do not present this wiki's own files as exemplary without assessing them. Trim illustrative detail, such as a full RACI matrix, that could be mistaken for a standard.
14. **Credit sourced patterns prominently.** Distinguish this wiki's own guidance from a summary of someone else's pattern, and name the original author and source near the top of the page.

## What each page does

Each [page type](INFORMATION-ARCHITECTURE.md#page-types) has a job. Write to it:

- **Overview:** what matters for one goal and why, then where to go next. It summarises; other pages own the detail.
- **Concept:** a reusable mechanism or distinction, usually in `content/concepts/`, explained well enough to reason with. It may include practical implications, but explanation is its main purpose, and it needs no action.
- **Advice:** a concise recommendation under a Goal, explaining why it matters and where to act.
- **How-to or pattern:** why the change is worth making, what to do, and how to check it worked.
- **Explanation:** how related ideas fit together, built up step by step.
- **Reference or checklist:** something to scan or consult. Each line still says why it matters.
- **Case study:** what happened, and what was learned.

A long page needs a summary at the top and sections that make sense on their own, so a reader can go straight to the part they need.

## Examples

**Give the reason and principle.** Before:

> Deny the commands you never want run without you: `copilot --deny-tool='shell(git push)'`. Deny rules win over allow rules.

After:

> Text the agent reads in an issue or file can tell it to run commands, and the model cannot reliably tell that text from your instructions. So deny the commands that would do most damage if it obeyed, such as publishing your work: `copilot --deny-tool='shell(git push)'`. Copilot enforces deny rules whatever the model decides, and they win over allow rules.

**Distinguish a procedure from its purpose.** Before:

> Write your next task down. State the outcome, checks and what is out of scope.

After:

> Agree on the problem before delegating the solution. An agent can build a convincing solution to the wrong problem, so ask it to challenge assumptions and draft requirements for your review before implementation.

**State the behaviour.** Before:

> A link is not a guarantee of automatic loading. Some instruction formats eagerly import referenced files; others leave ordinary links for an agent to follow. Verify the actual harness behaviour, and keep essential requirements visible at the appropriate entrypoint.

After:

> Put rules the agent must always follow in `AGENTS.md` itself, not in a linked file. Copilot CLI loads a file referenced as `@path` immediately, but other Copilot features may not, and an ordinary Markdown link is only followed if the agent decides to.

The page then records `checked: 2026-11-15` in its front matter.

**Write for scanning.** Before, the principle, action and follow-through run together:

> Requirements discovery is a negotiation: the agent suggests possibilities, but you decide the scope. Challenge unnecessary additions and record the boundaries so they are not reintroduced later. [Agree on the problem](../content/goals/alignment/agree-on-the-problem.md).

After, separate the ideas and the supporting link:

> **Requirements discovery is a negotiation:** the agent suggests possibilities, but you decide the scope.
>
> Challenge unnecessary additions.
>
> Record the boundaries so they are not reintroduced later.
>
> More detail: [Agree on the problem](../content/goals/alignment/agree-on-the-problem.md).

## Checking a page

Run `just style` to find pages over their ceiling, hedge words, sentences repeated across pages, and dates of checking written in the text instead of the `checked` field. Then read the page once as a new reader and confirm:

- you could say what problem each recommendation addresses and why it matters, from the page alone;
- claims about model or agent behaviour state their scope and retain qualifications that change their meaning;
- every action has a Copilot or GitHub example;
- no section depends on a link for its main point;
- nothing on the page repeats another page; and
- the page does its type's job.

Every rule here must be checkable from the page alone. If you cannot tell whether a page follows a rule, fix the rule.
