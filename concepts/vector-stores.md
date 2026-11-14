---
type: reference
summary: Vector stores index numerical representations for similarity search, with trade-offs in retrieval quality, filtering, maintenance, and data handling.
---

# Vector stores

A vector store keeps and searches numerical vectors, often **embeddings** produced by a model to represent text, images, or other data. Similarity search compares a query vector with stored vectors to find nearby items. Vector search can support [RAG](retrieval-augmented-generation.md), recommendations, clustering, and other tasks; it is useful independently of generation.

## How it works

For text search, an application can split documents into passages, embed them, and store their vectors with identifiers and useful metadata. At query time it embeds the request in a compatible vector space, searches for nearby vectors, and returns their associated passages or references.

For example, a search for “how do we undo a deployment?” might find a passage titled “rollback procedure” even without shared keywords. A similarity score indicates proximity under a chosen measure, not that a passage is correct or relevant. Keyword search can be more useful for exact symbols or error codes; hybrid search combines signals from both approaches.

## Choices and limits

- **Implementation:** vector search can be a feature of an existing database or a dedicated service; it need not be a separate database product. Some indexes use approximate nearest-neighbor search to trade retrieval accuracy for speed or resource use.
- **Quality and maintenance:** results depend on the embedding model, document segmentation, similarity measure, and current index. Changing models may require re-embedding stored content; vectors from different models should not be assumed compatible.
- **Filtering and access:** metadata can narrow results by properties such as repository or version. Enforce authorization independently of relevance ranking, including before returning passages to a user or model.
- **Data handling:** assess where source text, embeddings, metadata, and queries are processed and stored. Embeddings are derived from data and should not be assumed safe to expose.

Evaluate retrieval on representative queries, including exact identifiers and cases where the right answer is absent. Measure quality alongside indexing, storage, and query costs; the nearest result is not necessarily a useful one.

## Sources and applications

- [OpenAI: Retrieval](https://developers.openai.com/api/docs/guides/retrieval) — embeddings, semantic search, source results, and filters.
- [pgvector](https://github.com/pgvector/pgvector) — an example of exact and approximate vector search within an existing database.
- Related: [Retrieval-augmented generation](retrieval-augmented-generation.md) and [evals](evals.md).
