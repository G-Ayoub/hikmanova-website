import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.about", href: "/about" },
    { labelKey: "nav.services", href: "/services" },
    { labelKey: "nav.managedServices", href: "/managed-services" },
    { labelKey: "nav.projects", href: "/projects" },
    { labelKey: "nav.blog", href: "/blog" },
    { labelKey: "nav.contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center gap-2 font-serif text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
              <img 
                src="/hikmanova-logo.png" 
                alt="HikmaNova" 
                className="w-10 h-10"
              />
              <span className="hidden sm:inline">HikmaNova</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                  {t(link.labelKey)}
                </span>
              </Link>
            ))}
          </nav>

          {/* Language Switcher, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-card rounded-full p-1 border border-border">
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="rounded-full text-xs font-medium px-3"
              >
                EN
              </Button>
              <Button
                variant={language === 'ar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ar')}
                className="rounded-full text-xs font-medium px-3"
              >
                AR
              </Button>
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-card">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-sm font-medium hover:text-primary transition-colors block py-2 cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card text-card-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">HikmaNova</h3>
              <p className="text-sm text-muted-foreground">
                Innovation through technology
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif font-bold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        {t(link.labelKey)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-serif font-bold mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy">
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {t('footer.privacy')}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {t('footer.terms')}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap">
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {t('footer.sitemap')}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-bold mb-4">{t('footer.getInTouch')}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>info@hikmanova.com</p>
                {/* <p>+213 553 84 33 33</p> */}
                <p>Algiers, Algeria</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HikmaNova. {t('footer.allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
