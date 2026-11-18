# Sources the source watch reads

The [weekly source watch](../.github/workflows/weekly-source-watch.md) reads these sources and drafts records of what they publish, into `data/source-watch/`. It is an experiment ([#122](https://github.com/ho-henry-senior/ai-wiki/issues/122)): the records are judged before anything is shown to readers.

The maintainer chooses the sources. To add one, add a row here and add its domain to the workflow's `network.allowed` list; a source whose domain is not allowed cannot be read. Prefer a feed (RSS or Atom) over a web page, because feeds list items with dates and are easier to read reliably. The Anthropic and Claude addresses are pages, not feeds, and the GitHub feed addresses follow GitHub's usual pattern; the first manual run shows which give dated, readable items, and the run reports any that do not.

- **AI Hero (Matt Pocock)**, practitioner, educator: practical agent workflows and skills for developers. Read from `https://www.aihero.dev/rss.xml`.
- **Anthropic news**, vendor: Claude releases and announcements; primary source for its own products. Read from `https://www.anthropic.com/news`.
- **Anthropic engineering**, vendor: how Anthropic's teams build with Claude and Claude Code, such as its writing on verification. Read from `https://www.anthropic.com/engineering`.
- **Claude blog**, vendor: Claude Code practices and how-tos, such as building verification loops with skills. Read from `https://claude.com/blog`.
- **OpenAI**, vendor: OpenAI models and Codex; primary source for its own products. Read from `https://openai.com/news/rss.xml`.
- **GitHub Copilot changelog**, vendor: Copilot product changes, the narrow feed for its changelog label. Read from `https://github.blog/changelog/label/copilot/feed/`.
- **GitHub Copilot articles**, vendor: longer GitHub Blog articles about Copilot, separate from the changelog. Read from `https://github.blog/ai-and-ml/github-copilot/feed/`.
- **Simon Willison**, practitioner: careful, hands-on coverage of LLM tools; prompt injection and agent security. Read from `https://simonwillison.net/atom/entries/`.
- **METR**, research: measured studies of AI agents and developer productivity. Read from `https://metr.org/feed.xml`.
- **DORA (Google)**, research: surveys of how AI affects software delivery; publishes rarely. Read from `https://dora.dev/research/`.

**Not yet read:** Lauren Tan, whom the maintainer follows. No feed or site to read has been chosen, and her current role must be checked from her own pages before any record names it. X posts are out of scope: the watch does not scrape X or monitor accounts.

The vendors are primary sources for their own products, but they also promote them; the research sources and Simon Willison balance a list that otherwise leans towards enthusiasm.
