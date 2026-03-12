import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { languages, useTranslations, getLocalizedPath, defaultLang } from '@/i18n';

interface HeaderProps {
  lang?: string;
}

export function Header({ lang = defaultLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const t = (key: string) => useTranslations(lang as any)(key as any);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems = [
    { label: t('nav.home'), href: lang === defaultLang ? '/' : `/${lang}` },
    { label: t('nav.about'), href: getLocalizedPath('/about', lang) },
    { label: t('nav.product'), href: getLocalizedPath('/product', lang) },
    { label: t('nav.pricing'), href: getLocalizedPath('/pricing', lang) },
    { label: t('nav.contact'), href: getLocalizedPath('/contact', lang) },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href={lang === defaultLang ? '/' : `/${lang}`} className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">Emgran</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher - Inline Style */}
          <div className="language-switcher flex items-center space-x-1 text-sm">
            <a
              href="/"
              className={cn(
                "font-medium transition-colors",
                lang === 'en' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="/zh/"
              className={cn(
                "font-medium transition-colors",
                lang === 'zh' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              中文
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* CTA Button */}
          <a
            href={getLocalizedPath('/contact', lang)}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t('hero.cta.primary')}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={getLocalizedPath('/contact', lang)}
              className="block py-2 text-sm font-medium text-primary"
            >
              {t('hero.cta.primary')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}