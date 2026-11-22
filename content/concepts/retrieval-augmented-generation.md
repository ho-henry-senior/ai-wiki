---
type: reference
summary: Background. Retrieval-augmented generation finds passages that match a request and gives them to the model as context; it changes what the model sees, not what it knows.
lane: articles
date: 2026-11-14
status: established
tags:
  - Context and tokens
---

# Retrieval-augmented generation (RAG)

**Background:** how an agent can draw on documentation too large to include in every request.

Retrieval-augmented generation (RAG) searches a collection of sources for passages that match a request and adds them to the model's context. The model then answers using those passages, and can cite them. It changes what the model sees, not what the model has learned.

The search can use keywords, [vector similarity](#vector-search), structured queries, or a mix. **RAG does not need a vector database.**

## When it helps

It helps when material is too large or changes too often to include in every prompt, such as architecture decisions across many repositories. Exact search finds a known API name; similarity search can find a related decision worded differently.

For a single repository, a short `AGENTS.md`, links, and ordinary search are usually enough. Indexing adds setup and upkeep, so compare it on real questions before adopting it; see [evaluation (eval)](../reference/glossary.md#evaluation-eval).

## Limits

- **Stale or missing passages** produce unsupported answers. Keep the index current and record each passage's source and version.
- **Retrieved text is untrusted** and can carry [prompt injection](../goals/security/prompt-injection.md), so limit what the agent can do with what it retrieves; see [instructions and enforced controls](instructions-vs-controls.md).
- **Access must be enforced during retrieval,** so a requester only gets passages they may read. Indexing can also send documents to another service.
- **A citation is not proof** that the answer represents its source.

## Vector search

A vector store keeps numerical vectors, usually [embeddings](../reference/glossary.md#embedding) produced by a model from text, and finds the stored items closest to a query. A search for "how do we undo a deployment?" can then find a passage titled "rollback procedure" with no words in common. It's a search tool in its own right, not only part of RAG.

- **It needn't be a separate product.** Many databases offer vector search, for example PostgreSQL with pgvector.
- **Closest isn't correct.** A similarity score measures nearness, not relevance. Keyword search is better for exact symbols and error codes; hybrid search combines the two.
- **Results depend on the embedding model,** how documents are split, and how current the index is. Changing the model means re-embedding everything.
- **Embeddings are derived from your data,** so treat them as being as sensitive as the text they came from.

Test retrieval on real queries, including exact identifiers and questions with no answer in the collection.

## Sources

- [Lewis et al.: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [pgvector](https://github.com/pgvector/pgvector)
- [OpenAI: Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
