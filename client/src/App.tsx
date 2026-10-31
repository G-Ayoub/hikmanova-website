import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch, Router as WouterRouter } from "wouter";
import { BASE } from "./lib/asset";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import Industries from "./pages/Industries";
import Technology from "./pages/Technology";
import Innovation from "./pages/Innovation";
import Clients from "./pages/Clients";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import { hasClientProof } from "./data/company";

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

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" switchable>
          <MotionConfig reducedMotion="user">
            <TooltipProvider>
              <Toaster />
              <WouterRouter base={BASE}>
                <Router />
              </WouterRouter>
            </TooltipProvider>
          </MotionConfig>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
