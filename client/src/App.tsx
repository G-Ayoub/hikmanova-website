import { MotionConfig } from "framer-motion";
import { Suspense } from "react";
import { Redirect, Route, Switch, Router as WouterRouter } from "wouter";
import { BASE } from "./lib/asset";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage, type Language } from "./contexts/LanguageContext";
import { AR_PREFIX } from "./lib/langPath";
import { hasClientProof } from "./data/company";
import { lazyPage, type LazyPage } from "./lib/lazyPage";

// Each page is its own chunk, so a visitor downloads only the code for the pages they open.
const Home = lazyPage(() => import("./pages/Home"));
const About = lazyPage(() => import("./pages/About"));
const Solutions = lazyPage(() => import("./pages/Solutions"));
const SolutionDetail = lazyPage(() => import("./pages/SolutionDetail"));
const Services = lazyPage(() => import("./pages/Services"));
const ServiceDetail = lazyPage(() => import("./pages/ServiceDetail"));
const CaseStudies = lazyPage(() => import("./pages/CaseStudies"));
const Industries = lazyPage(() => import("./pages/Industries"));
const Technology = lazyPage(() => import("./pages/Technology"));
const Innovation = lazyPage(() => import("./pages/Innovation"));
const Clients = lazyPage(() => import("./pages/Clients"));
const Careers = lazyPage(() => import("./pages/Careers"));
const Blog = lazyPage(() => import("./pages/Blog"));
const BlogPost = lazyPage(() => import("./pages/BlogPost"));
const Contact = lazyPage(() => import("./pages/Contact"));
const Privacy = lazyPage(() => import("./pages/Privacy"));
const Terms = lazyPage(() => import("./pages/Terms"));
const Cookies = lazyPage(() => import("./pages/Cookies"));
const Sitemap = lazyPage(() => import("./pages/Sitemap"));
const NotFound = lazyPage(() => import("./pages/NotFound"));

/** Page that will render for a path (without the base), so it can be loaded before the app mounts. */
export function pageFor(path: string): LazyPage {
  const p = path.replace(/\/+$/, "") || "/";
  const exact: Record<string, LazyPage> = {
    "/": Home, "/solutions": Solutions, "/services": Services, "/case-studies": CaseStudies,
    "/industries": Industries, "/technology": Technology, "/innovation": Innovation,
    "/clients": hasClientProof() ? Clients : CaseStudies, "/about": About, "/careers": Careers,
    "/blog": Blog, "/contact": Contact, "/privacy": Privacy, "/terms": Terms, "/cookies": Cookies, "/sitemap": Sitemap,
  };
  if (exact[p]) return exact[p];
  if (p.startsWith("/solutions/")) return SolutionDetail;
  if (p.startsWith("/services/")) return ServiceDetail;
  if (p.startsWith("/blog/")) return BlogPost;
  return NotFound;
}

/** Old URLs from the previous site, kept so existing links keep working. */
const legacyProjects: Record<string, string> = {
  "fifa-team-monitor": "/solutions/teammonitor",
  "nusuk-smart-card": "/solutions/nusuk-card",
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/solutions/hotel-pms">
        <Redirect to="/solutions" replace />
      </Route>
      <Route path="/solutions/:slug" component={SolutionDetail} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/industries" component={Industries} />
      <Route path="/technology" component={Technology} />
      <Route path="/innovation" component={Innovation} />
      <Route path="/clients">
        {/* Until there are client logos or testimonials, send visitors to the case studies instead. */}
        {hasClientProof() ? <Clients /> : <Redirect to="/case-studies" replace />}
      </Route>
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/sitemap" component={Sitemap} />

      {/* Legacy redirects */}
      <Route path="/projects">
        <Redirect to="/solutions" replace />
      </Route>
      <Route path="/projects/:slug">
        {(params) => <Redirect to={legacyProjects[params.slug] ?? "/solutions"} replace />}
      </Route>
      <Route path="/managed-services">
        <Redirect to="/services/devops-sovereign-hosting" replace />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

/** Routes are the same in both languages; Arabic ones are served under the /ar prefix. */
function LocalizedRouter({ ssrPath }: { ssrPath?: string }) {
  const { language } = useLanguage();
  return (
    <WouterRouter base={BASE + (language === "ar" ? AR_PREFIX : "")} ssrPath={ssrPath}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </WouterRouter>
  );
}

/** `ssrPath` and `lang` are set when pre-rendering a page at build time (scripts/gen-sitemap.ts). */
function App({ ssrPath, lang }: { ssrPath?: string; lang?: Language }) {
  return (
    <ErrorBoundary>
      <LanguageProvider initial={lang}>
        <ThemeProvider defaultTheme="light" switchable>
          <MotionConfig reducedMotion="user">
            <LocalizedRouter ssrPath={ssrPath} />
          </MotionConfig>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
