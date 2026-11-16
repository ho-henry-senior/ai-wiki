// Draws the page's Mermaid diagrams. Loaded only on pages that have one,
// after mermaid.min.js. "strict" stops diagrams running scripts or HTML.
window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
window.mermaid.run({ querySelector: "pre.mermaid" });
