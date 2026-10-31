import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, Mail, MapPin, Linkedin } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { LANGUAGES, useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ui, useI18n } from "@/lib/i18n";
import { company, hasClientProof } from "@/data/company";
import { asset } from "@/lib/asset";
import { Segmented, spring } from "@/components/motion";

const mainNav = [
  { label: ui.nav.solutions, href: "/solutions" },
  { label: ui.nav.services, href: "/services" },
  { label: ui.nav.industries, href: "/industries" },
  { label: ui.nav.caseStudies, href: "/case-studies" },
  { label: ui.nav.about, href: "/about" },
  { label: ui.nav.insights, href: "/blog" },
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
      ...(hasClientProof() ? [{ label: ui.nav.clients, href: "/clients" }] : []),
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
  const scrolled = useScrolled();

  // Close the mobile menu on navigation; scroll to the #anchor if any, else to the top.
  useEffect(() => {
    setMobileMenuOpen(false);
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [location]);

  // While the mobile menu is open: Escape closes it and the page underneath does not scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-2 focus:p-2 focus:bg-background">
        Skip to content
      </a>

      {/* Translucent bar: content scrolls underneath. The hairline appears only once content meets it. */}
      <header
        className={`material sticky top-0 z-50 transition-[box-shadow] duration-300 ${
          scrolled || mobileMenuOpen ? "shadow-[0_1px_0_var(--hairline)]" : "shadow-[0_1px_0_transparent]"
        }`}
        style={mobileMenuOpen ? { backgroundColor: "var(--material-strong)" } : undefined}
      >
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link href="/" className="pressable flex items-center gap-2 font-serif text-[1.1875rem] font-semibold tracking-[-0.02em] shrink-0">
            <img src={asset("/hikmanova-logo.png")} alt="" className="w-8 h-8 object-contain" />
            <span className="hidden sm:inline" dir="ltr">HikmaNova</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`pressable rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive(link.href) ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Segmented
              size="sm"
              label="Language"
              value={language}
              onChange={setLanguage}
              options={LANGUAGES.map((lang) => ({ value: lang.code, label: lang.label, title: lang.name }))}
            />

            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t(ui.nav.theme)} className="size-9">
              {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </Button>

            <Button asChild size="sm" className="hidden sm:inline-flex h-8 px-4">
              <Link href="/contact">{t(ui.contactUs)}</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden size-9"
              aria-label={t(ui.nav.menu)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <MenuGlyph open={mobileMenuOpen} />
            </Button>
          </div>
        </div>

        {/* Mobile menu grows down out of the bar and folds back up the same way. Interruptible: tapping
            the toggle mid-animation reverses it from where it is. */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav"
              key="mobile-nav"
              aria-label="Mobile"
              className="lg:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100dvh - 3.5rem)", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring.ui}
            >
              <motion.ul
                className="container flex flex-col pt-4 pb-10"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{ open: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } }, closed: {} }}
              >
                {[...mainNav, { label: ui.nav.contact, href: "/contact" }].map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -8 } }}
                    transition={spring.snappy}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`pressable block py-2.5 font-serif text-[1.75rem] font-semibold tracking-[-0.02em] ${
                        isActive(link.href) ? "text-primary" : ""
                      }`}
                    >
                      {t(link.label)}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="border-t border-[var(--hairline)] text-[0.8125rem] leading-relaxed text-muted-foreground">
        <div className="container pt-12 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10 mb-10">
            <div className="col-span-2">
              <p className="flex items-center gap-2 font-serif font-semibold text-[1.0625rem] tracking-[-0.015em] mb-2 text-foreground" dir="ltr">
                <img src={asset("/hikmanova-logo.png")} alt="" className="w-6 h-6 object-contain" /> HikmaNova
              </p>
              <p className="mb-4 max-w-xs">{t(ui.brandTagline)}</p>
              <div className="space-y-1.5">
                <a href={`mailto:${company.email}`} className="pressable flex items-center gap-2 hover:text-foreground">
                  <Mail className="w-3.5 h-3.5" /> <span dir="ltr">{company.email}</span>
                </a>
                {company.social.linkedin && (
                  <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="pressable flex items-center gap-2 hover:text-foreground">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {company.offices.map((office) => (
                  <p key={office.city.en} className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {t(office.city)}, {t(office.country)}
                  </p>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title.en}>
                <p className="font-semibold mb-3 text-foreground">{t(column.title)}</p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="pressable hover:text-foreground transition-colors">
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--hairline)] pt-6">
            <p>
              &copy; {new Date().getFullYear()} <span dir="ltr">HikmaNova</span>. {t(ui.footer.rights)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** True once the page has scrolled under the header (drives the scroll-edge hairline). */
function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);
  return scrolled;
}

/** Two bars that rotate into an X: the icon morphs on the same spring as the menu instead of swapping. */
function MenuGlyph({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[1.5px] w-full rounded-full bg-current";
  return (
    <span className="relative block w-[18px] h-3" aria-hidden>
      <motion.span className={bar} initial={false} animate={open ? { top: 5.25, rotate: 45 } : { top: 1.5, rotate: 0 }} transition={spring.snappy} />
      <motion.span className={bar} initial={false} animate={open ? { top: 5.25, rotate: -45 } : { top: 9, rotate: 0 }} transition={spring.snappy} />
    </span>
  );
}
