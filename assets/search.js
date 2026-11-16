// Replaces how the plugin's search box finds results, with whole-word
// matching and the best matches first. See search-ranking.js.
import { rankResults } from "./search-ranking.js";

customElements.whenDefined("app-search").then(() => {
  const SearchElement = customElements.get("app-search");
  // The plugin reverses whatever findResults returns, so return the ranked
  // list worst first; it then shows best first.
  SearchElement.prototype.findResults = (query, index) =>
    rankResults(query, index).reverse();
});
