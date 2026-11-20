// Draws the page's Mermaid diagrams. Loaded only on pages that have one,
// after mermaid.min.js. "strict" stops diagrams running scripts or HTML.
window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
try {
  await window.mermaid.run({ querySelector: "pre.mermaid" });
} catch (error) {
  // One diagram that fails to parse must not stop the others, which have
  // already been drawn, from getting the viewer below.
  console.error("A Mermaid diagram could not be drawn.", error);
}

// Every rendered diagram gets the same accessible full-screen viewer.
const diagrams = [...document.querySelectorAll("pre.mermaid svg")];
if (diagrams.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "app-diagram-dialog";
  dialog.setAttribute("aria-label", "Enlarged diagram");

  const toolbar = document.createElement("div");
  toolbar.className = "app-diagram-dialog__toolbar";

  // A GOV.UK secondary button. Symbols are decorative, so screen readers
  // hear only the words.
  const makeButton = (label, { before = "", after = "" } = {}, onClick) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "govuk-button govuk-button--secondary";
    const symbol = (text) => {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.textContent = text;
      return span;
    };
    if (before) button.append(symbol(before), " ");
    button.append(label);
    if (after) button.append(" ", symbol(after));
    if (onClick) button.addEventListener("click", onClick);
    return button;
  };

  // Scrolling is the only way to pan, so the viewport must be focusable for
  // keyboard users; some browsers, such as Safari, do not do this for them.
  const viewport = document.createElement("div");
  viewport.className = "app-diagram-dialog__viewport";
  viewport.tabIndex = 0;
  viewport.setAttribute("role", "region");
  viewport.setAttribute("aria-label", "Diagram. Scroll or use the arrow keys to pan.");
  let activeDiagram = null;
  let zoom = 100;
  let returnFocus = null;
  let originalParent = null;
  let originalStyle = null;

  const setZoom = (value) => {
    zoom = Math.max(100, Math.min(250, value));
    if (activeDiagram) activeDiagram.style.width = `${zoom}%`;
    zoomOut.disabled = zoom === 100;
    zoomIn.disabled = zoom === 250;
  };

  const zoomOut = makeButton("Zoom out", { before: "−" }, () => setZoom(zoom - 25));
  const zoomIn = makeButton("Zoom in", { before: "+" }, () => setZoom(zoom + 25));
  const close = makeButton("Close", { after: "×" }, () => dialog.close());
  close.classList.add("app-diagram-dialog__close");
  toolbar.append(zoomOut, zoomIn, close);
  dialog.append(toolbar, viewport);
  document.body.append(dialog);

  // Close on a click on the backdrop only. A click on the dialog's own
  // padding also has the dialog as its target, so compare positions.
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) dialog.close();
  });
  dialog.addEventListener("close", () => {
    returnFocus?.focus();
    returnFocus = null;
    if (activeDiagram && originalParent) {
      if (originalStyle === null) activeDiagram.removeAttribute("style");
      else activeDiagram.setAttribute("style", originalStyle);
      originalParent.append(activeDiagram);
    }
    viewport.replaceChildren();
    activeDiagram = null;
    originalParent = null;
    originalStyle = null;
  });

  diagrams.forEach((svg, index) => {
    const diagram = svg.closest("pre.mermaid");
    // The diagram itself is the control: no separate button or visual chrome.
    diagram.classList.add("app-diagram__trigger");
    diagram.setAttribute("role", "button");
    diagram.tabIndex = 0;
    diagram.setAttribute("aria-label", `Enlarge diagram ${index + 1}`);

    const open = () => {
      returnFocus = diagram;
      activeDiagram = svg;
      originalParent = svg.parentNode;
      originalStyle = svg.getAttribute("style");
      // Move the original SVG so Mermaid's internal IDs remain unique.
      activeDiagram.style.maxWidth = "none";
      activeDiagram.style.height = "auto";
      viewport.replaceChildren(activeDiagram);
      setZoom(100);
      dialog.showModal();
      close.focus();
    };

    diagram.addEventListener("click", open);
    diagram.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault(); // Space must not scroll the page.
      open();
    });
  });
}
