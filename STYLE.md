# Writing standard

Write so a developer can find the action, try it, and check it worked, on one read. Most readers use Copilot.

## Rules

1. **Lead with the action.** Start each page and section with what to do. Put the reason after it.
2. **Prefer shared conventions, and show them in Copilot.** Recommend files and formats that agents share, such as `AGENTS.md`, over tool-specific ones. Give each piece of advice one concrete Copilot or GitHub example: a file, a command, a setting, or a short snippet the reader can copy. If you cannot give one, the advice may not belong.
3. **State the behavior, not "verify it".** Say what Copilot does, which surface it applies to (chat, CLI, cloud agent, or code review), and the date you checked. Do not tell readers to "verify in your harness" without telling them how.
4. **State the action in full.** A link adds depth; it never replaces the advice. A section that is one sentence and a link is not finished.
5. **Say it once.** If the advice lives on another page, summarize it in one line and link to it. Do not restate it.
6. **Cut hedges.** Avoid "appropriate", "relevant", "useful", "consider", "where practical", "materially", and "proportionate" unless the sentence is wrong without them. Give one specific caveat instead of several vague ones.
7. **Use plain words and short sentences.** Prefer the active voice and "you". One idea per sentence.
8. **Keep pages short.** Aim for about 250 words for an overview or concept and about 500 for a guide or pattern. Checklists, references, and case studies can be longer when every line earns its place.

## Example

**Before:**

> A link is not a guarantee of automatic loading. Some instruction formats eagerly import referenced files; others leave ordinary links for an agent to follow. Verify the actual harness behavior, and keep essential requirements visible at the appropriate entrypoint.

**After:**

> Put rules the agent must always follow in `AGENTS.md` itself, not in a linked file. Copilot CLI loads a file referenced as `@path` immediately, but other Copilot features may not, and an ordinary Markdown link is only followed if the agent decides to. (Checked 15 November 2026.)

## Checking a page

Before handoff, read the page once as a new reader and confirm:

- the first sentence of each section says what to do;
- every piece of advice has a Copilot example;
- no section depends on a link for its main point; and
- nothing on the page repeats another page.
