---
type: reference
summary: Retrieval-augmented generation supplies selected external information to a model at response time, with quality and security dependent on the retrieval pipeline.
---

# Retrieval-augmented generation

Retrieval-augmented generation (RAG) retrieves information relevant to a request and supplies it to a model as context for generating a response. It can help an application answer using material that is too extensive, specialized, or changeable to include in every prompt. Retrieval changes the input available to the model; it does not itself update model weights.

## How it works

An application prepares a collection of sources, often dividing documents into passages and recording their origins. For a request, it searches that collection, selects relevant passages, and supplies them alongside the request. The model then generates a response using that context. An application may also return source links so a reader can inspect the evidence.

Retrieval can use keyword search, [vector similarity](vector-stores.md), structured queries, or a combination. **RAG does not require a vector database.** The retrieval step can also be part of a larger agent workflow; it does not make the model's answer or tool use automatically correct.

## Example: repository documentation

An agent answering questions across many repositories could search current architecture decisions, retrieve relevant passages, and cite their locations. Exact search may be useful for a known API name; semantic search may find a related decision described in different words.

For a small, well-indexed repository, focused entrypoints and ordinary search may be sufficient. Compare alternatives using representative questions, answer quality, latency, and token cost; indexing and retrieval also have setup and maintenance costs. See [evals](evals.md) and [repository context](../pages/repository-context-for-agents.md).

## Limits and safety

- **Relevance and freshness:** missing, stale, or misleading passages can produce an unsupported answer. Keep indexes current, preserve source and version information, and check important claims against authoritative sources.
- **Trust:** retrieved text may contain prompt injection. Treat it as data, not authority to change instructions; enforce tool and access restrictions outside the model. See [instructions versus controls](instructions-vs-controls.md).
- **Access and data flow:** enforce the requester's access to source material during retrieval and consider where documents, queries, and results are stored or sent. Embedding or indexing data may expose it to additional services.
- **Evidence:** citations help readers inspect sources but do not prove that the answer accurately represents them. Test both retrieval and generated answers against the intended task.

## Sources and applications

- [Lewis et al.: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — the original RAG research.
- [OpenAI: Retrieval](https://developers.openai.com/api/docs/guides/retrieval) — an example of semantic search and supplying retrieved results to a model.
- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — indirect instructions in external content and the limits of RAG as a defense.
