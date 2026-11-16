# Writing standard

Write so a developer understands what matters and why, and can act on it, on one read. Most readers use Copilot.

## Rules

1. **Give every recommendation its reason.** A reader should never meet an action without knowing what it prevents or achieves. Put the reason where it reads best; one sentence often carries both. When the reader needs the mechanism to apply the advice to a case the page does not cover, explain the mechanism.
2. **Prefer shared conventions, and show actions in Copilot.** Recommend files and formats that agents share, such as `AGENTS.md`, over tool-specific ones. Give each action one concrete Copilot or GitHub example: a file, a command, a setting, or a short snippet the reader can copy. Explanations of how something works do not need one.
3. **State the behavior, not "verify it".** Say what Copilot does, which surface it applies to (chat, CLI, cloud agent, or code review), and the date you checked. Do not tell readers to "verify in your harness" without telling them how.
4. **State the advice in full.** A link adds depth; it never replaces the advice. A section that is one sentence and a link is not finished.
5. **Say it once.** Each core idea has one owner page, listed in [who owns what](MAINTAINING.md#who-owns-what). Elsewhere, summarize it in one line and link to the owner. Do not restate it.
6. **Cut hedges.** Avoid "appropriate", "relevant", "useful", "consider", "where practical", "materially", and "proportionate" unless the sentence is wrong without them. Give one specific caveat instead of several vague ones.
7. **Use plain words and short sentences without sacrificing precision.** Prefer the active voice and "you". One idea per sentence. State when a claim depends on the agent, permissions, settings, or environment. Never turn conditional behavior into a universal claim to save words.
8. **Decide what to do with long pages.** A page over about 500 words for an overview or concept, or about 900 for a guide or pattern, needs one decision, taken in this order: replace restated material with a link to its owner; split the page if it answers two separate questions; otherwise shorten it, or keep it whole and give the reason as `long-because` in its front matter. Shortening never cuts a reason, an important caveat, or a qualification needed for accuracy. Checklists, references, and case studies have no ceiling.

## What each page does

Each [page type](MAINTAINING.md#articles-and-concepts) has a job. Write to it:

- **Overview:** what matters for one goal and why, then where to go next. It summarizes; other pages own the detail.
- **Concept:** a reusable mechanism or distinction, usually in `concepts/`, explained well enough to reason with. It may include practical implications, but explanation is its main purpose, and it needs no action.
- **Guide or pattern:** why the change is worth making, what to do, and how to check it worked.
- **Explanation:** how related ideas fit together, built up step by step.
- **Reference or checklist:** something to scan or consult. Each line still says why it matters.
- **Case study:** what happened, and what was learned.

A long page needs a summary at the top and sections that make sense on their own, so a reader can go straight to the part they need.

## Examples

**Give the reason.** Before:

> Deny the commands you never want run without you: `copilot --deny-tool='shell(git push)'`. Deny rules win over allow rules.

After:

> Text the agent reads in an issue or file can tell it to run commands, and the model cannot reliably tell that text from your instructions. So deny the commands that would do most damage if it obeyed, such as publishing your work: `copilot --deny-tool='shell(git push)'`. Copilot enforces deny rules whatever the model decides, and they win over allow rules.

**State the behavior.** Before:

> A link is not a guarantee of automatic loading. Some instruction formats eagerly import referenced files; others leave ordinary links for an agent to follow. Verify the actual harness behavior, and keep essential requirements visible at the appropriate entrypoint.

After:

> Put rules the agent must always follow in `AGENTS.md` itself, not in a linked file. Copilot CLI loads a file referenced as `@path` immediately, but other Copilot features may not, and an ordinary Markdown link is only followed if the agent decides to. (Checked 15 November 2026.)

## Checking a page

Run `just style` to find pages over their ceiling, hedge words, and sentences repeated across pages. Then read the page once as a new reader and confirm:

- you could say why each recommendation matters, from the page alone;
- claims about model or agent behavior state their scope and retain qualifications that change their meaning;
- every action has a Copilot or GitHub example;
- no section depends on a link for its main point;
- nothing on the page repeats another page; and
- the page does its type's job.

Every rule here must be checkable from the page alone. If you cannot tell whether a page follows a rule, fix the rule.
