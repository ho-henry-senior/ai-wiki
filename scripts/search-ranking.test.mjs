import assert from "node:assert/strict";
import test from "node:test";
import { rankResults } from "../assets/search-ranking.js";

const index = [
  { title: "Glossary", tokens: "rag retrieval token storage" },
  {
    title: "Vector stores",
    description: "Useful for search and RAG.",
    tokens: "vector embeddings rag",
  },
  { title: "Choose a model and control cost", tokens: "storage average" },
  {
    title: "Retrieval-augmented generation",
    description: "Finds passages and gives them to the model.",
    tokens: "retrieval passages rag",
  },
  {
    title: "Security",
    description: "Limit what an agent can do.",
    tokens: "sandbox",
  },
];

const titles = (query) => rankResults(query, index).map((item) => item.title);

test("matches whole words, not parts of words", () => {
  assert.ok(!titles("rag").includes("Choose a model and control cost"));
});

test("puts title matches first, then descriptions, then page text", () => {
  assert.deepEqual(titles("rag"), [
    "Retrieval-augmented generation",
    "Vector stores",
    "Glossary",
  ]);
});

test("matches the last word as a prefix while it is being typed", () => {
  assert.deepEqual(titles("retri"), [
    "Retrieval-augmented generation",
    "Glossary",
  ]);
});

test("requires every word to match somewhere", () => {
  assert.deepEqual(titles("vector sandbox"), []);
  assert.deepEqual(titles("vector rag"), ["Vector stores"]);
});

test("returns nothing for an empty query, and at most the limit", () => {
  assert.deepEqual(titles("  "), []);
  assert.equal(rankResults("r", index, 2).length, 2);
});
