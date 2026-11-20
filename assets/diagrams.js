// Render Mermaid only on pages with diagrams. Strict mode prevents scripts
// and HTML in the diagram source from executing.
window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
await window.mermaid.run({ querySelector: "pre.mermaid" });

// Every rendered diagram gets the same accessible full-screen viewer.
const diagrams = [...document.querySelectorAll("pre.mermaid svg")];
if (diagrams.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "app-diagram-dialog";
  dialog.setAttribute("aria-label", "Enlarged diagram");

  const toolbar = document.createElement("div");
  toolbar.className = "app-diagram-dialog__toolbar";

  const makeButton = (label, onClick) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "app-diagram-dialog__control";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  };

  const viewport = document.createElement("div");
  viewport.className = "app-diagram-dialog__viewport";
  let activeDiagram = null;
  let zoom = 100;
  let returnFocus = null;

  const setZoom = (value) => {
    zoom = Math.max(100, Math.min(250, value));
    if (activeDiagram) activeDiagram.style.width = `${zoom}%`;
    zoomOut.disabled = zoom === 100;
    zoomIn.disabled = zoom === 250;
  };

  const zoomOut = makeButton("− Zoom out", () => setZoom(zoom - 25));
  const zoomIn = makeButton("+ Zoom in", () => setZoom(zoom + 25));
  const close = makeButton("Close ×", () => dialog.close());
  toolbar.append(zoomOut, zoomIn, close);
  dialog.append(toolbar, viewport);
  document.body.append(dialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    returnFocus?.focus();
    returnFocus = null;
    viewport.replaceChildren();
    activeDiagram = null;
  });

  diagrams.forEach((svg, index) => {
    const container = document.createElement("div");
    container.className = "app-diagram";
    const pre = svg.closest("pre.mermaid");
    pre.before(container);
    container.append(pre);

    const enlarge = document.createElement("button");
    enlarge.type = "button";
    enlarge.className = "app-diagram__enlarge";
    enlarge.textContent = "Enlarge diagram";
    enlarge.setAttribute("aria-label", `Enlarge diagram ${index + 1}`);
    enlarge.addEventListener("click", () => {
      returnFocus = enlarge;
      activeDiagram = svg.cloneNode(true);
      activeDiagram.removeAttribute("id");
      activeDiagram.setAttribute("role", "img");
      activeDiagram.style.maxWidth = "none";
      activeDiagram.style.height = "auto";
      viewport.replaceChildren(activeDiagram);
      setZoom(100);
      dialog.showModal();
      close.focus();
    });
    container.append(enlarge);
  });
}
