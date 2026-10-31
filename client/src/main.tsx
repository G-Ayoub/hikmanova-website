import { createRoot } from "react-dom/client";
import App, { pageFor } from "./App";
import { BASE } from "./lib/asset";
import { setMountingOverPrerender } from "./lib/prerender";
import { splitLangPath } from "./lib/langPath";
import "./index.css";

const container = document.getElementById("root")!;
const { path } = splitLangPath(window.location.pathname.slice(BASE.length) || "/");

// Load the current page's code first so it renders straight away, replacing the pre-rendered HTML
// without a blank frame. (Not hydrated: the saved theme may differ from the pre-rendered light page.)
pageFor(path)
  .preload()
  .catch(() => undefined)
  .finally(() => {
    setMountingOverPrerender(container.hasChildNodes());
    createRoot(container).render(<App />);
    requestAnimationFrame(() => setMountingOverPrerender(false));
  });
