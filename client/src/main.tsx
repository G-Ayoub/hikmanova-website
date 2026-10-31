import { createRoot } from "react-dom/client";
import App, { pageFor } from "./App";
import { BASE } from "./lib/asset";
import { setMountingOverPrerender } from "./lib/prerender";
import "./index.css";

const container = document.getElementById("root")!;
const path = window.location.pathname.slice(BASE.replace(/\/$/, "").length) || "/";

// Load the current page's code first so it renders straight away, replacing the pre-rendered HTML
// without a blank frame. (Not hydrated: language and theme may differ from the pre-rendered English page.)
pageFor(path)
  .preload()
  .catch(() => undefined)
  .finally(() => {
    setMountingOverPrerender(container.hasChildNodes());
    createRoot(container).render(<App />);
    requestAnimationFrame(() => {
      setMountingOverPrerender(false);
      document.documentElement.classList.remove("hn-wait");
    });
  });
