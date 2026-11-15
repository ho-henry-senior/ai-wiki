---
type: reference
summary: Background. A vector store finds items by meaning rather than exact words, using embeddings; useful for search and RAG, with trade-offs in quality, upkeep, and data handling.
---

# Vector stores

**Background:** what sits behind "semantic search" in some retrieval systems.

A vector store keeps numerical vectors, usually **embeddings** produced by a model from text, and finds the stored items closest to a query. A search for "how do we undo a deployment?" can then find a passage titled "rollback procedure" with no words in common. It can support [RAG](retrieval-augmented-generation.md), but it is a search tool in its own right.

## Choices and limits

- **It need not be a separate product.** Many databases offer vector search, for example PostgreSQL with pgvector.
- **Closest is not correct.** A similarity score measures nearness, not relevance. Keyword search is better for exact symbols and error codes; hybrid search combines the two.
- **Results depend on the embedding model,** how documents are split, and how current the index is. Changing the model means re-embedding everything.
- **Enforce access separately** from ranking, before results reach a user or model.
- **Embeddings are derived from your data,** so treat them as sensitive as the text they came from.

Test retrieval on real queries, including exact identifiers and questions with no answer in the collection.

## Sources

- [pgvector](https://github.com/pgvector/pgvector)
- [OpenAI: Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
