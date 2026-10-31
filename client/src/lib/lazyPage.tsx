import { lazy, type ComponentType } from "react";

type Loader = () => Promise<{ default: ComponentType }>;

/** Route components ignore the props wouter passes (they read params with useParams). */
export type LazyPage = ((props: object) => React.JSX.Element) & { preload: () => Promise<void> };

/**
 * A route component whose code is split into its own chunk. Once `preload()` has resolved, it renders
 * synchronously (no Suspense fallback), so the page whose HTML was pre-rendered can take over without
 * flashing an empty screen: main.tsx preloads the current route before mounting the app.
 */
export function lazyPage(loader: Loader): LazyPage {
  let loaded: ComponentType | undefined;
  const load = () => loader().then((m) => { loaded = m.default; return m; });
  const Lazy = lazy(load);
  const Page = () => {
    const Component = loaded ?? Lazy;
    return <Component />;
  };
  return Object.assign(Page, { preload: () => load().then(() => undefined) });
}
