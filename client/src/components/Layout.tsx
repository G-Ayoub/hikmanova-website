import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Mail, MapPin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { LANGUAGES, useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ui, useI18n } from "@/lib/i18n";
import { company } from "@/data/company";

const mainNav = [
  { label: ui.nav.solutions, href: "/solutions" },
  { label: ui.nav.services, href: "/services" },
  { label: ui.nav.industries, href: "/industries" },
  { label: ui.nav.caseStudies, href: "/case-studies" },
  { label: ui.nav.about, href: "/about" },
  { label: ui.nav.insights, href: "/blog" },
  { label: ui.nav.contact, href: "/contact" },
];

const footerColumns = [
  {
    title: ui.footer.offer,
    links: [
      { label: ui.nav.solutions, href: "/solutions" },
      { label: ui.nav.services, href: "/services" },
      { label: ui.nav.industries, href: "/industries" },
      { label: ui.nav.caseStudies, href: "/case-studies" },
      { label: ui.nav.technology, href: "/technology" },
    ],
  },
  {
    title: ui.footer.company,
    links: [
      { label: ui.nav.about, href: "/about" },
      { label: ui.nav.innovation, href: "/innovation" },
      { label: ui.nav.clients, href: "/clients" },
      { label: ui.nav.careers, href: "/careers" },
      { label: ui.nav.insights, href: "/blog" },
    ],
  },
  {
    title: ui.footer.legal,
    links: [
      { label: ui.nav.privacy, href: "/privacy" },
      { label: ui.nav.terms, href: "/terms" },
      { label: ui.nav.cookies, href: "/cookies" },
      { label: ui.nav.sitemap, href: "/sitemap" },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useI18n();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu on navigation; scroll to the #anchor if any, else to the top.
  useEffect(() => {
    setMobileMenuOpen(false);
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [location]);

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-2 focus:p-2 focus:bg-background">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold hover:opacity-80 transition-opacity shrink-0">
            <img src="/hikmanova-logo.png" alt="" className="w-10 h-10 object-contain" />
            <span className="hidden sm:inline" dir="ltr">HikmaNova</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : ""}`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-card rounded-full p-1 border border-border" role="group" aria-label="Language">
              {LANGUAGES.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage(lang.code)}
                  className="rounded-full text-xs font-medium px-3 h-7"
                  title={lang.name}
                  aria-pressed={language === lang.code}
                >
                  {lang.label}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t(ui.nav.theme)} className="rounded-full">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden rounded-full"
              aria-label={t(ui.nav.menu)}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border bg-card" aria-label="Mobile">
            <div className="container py-4 flex flex-col">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-3 border-b border-border last:border-0 hover:text-primary ${isActive(link.href) ? "text-primary" : ""}`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card text-card-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <p className="font-serif font-bold text-lg mb-3" dir="ltr">HikmaNova</p>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">{t(ui.brandTagline)}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="w-4 h-4" /> <span dir="ltr">{company.email}</span>
                </a>
                {company.offices.map((office) => (
                  <p key={office.city.en} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {t(office.city)}, {t(office.country)}
                  </p>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title.en}>
                <p className="font-serif font-bold mb-4">{t(column.title)}</p>
                <ul className="space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} <span dir="ltr">HikmaNova</span>. {t(ui.footer.rights)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
