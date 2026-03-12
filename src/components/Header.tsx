import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Globe } from 'lucide-react';
import { languages, useTranslations, getLocalizedPath, defaultLang } from '@/i18n';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  lang?: string;
}

export function Header({ lang = defaultLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const t = (key: string) => useTranslations(lang as any)(key as any);

  const navItems = [
    { label: t('nav.home'), href: lang === defaultLang ? '/' : `/${lang}` },
    { label: t('nav.about'), href: getLocalizedPath('/about', lang) },
    { label: t('nav.product'), href: getLocalizedPath('/product', lang) },
    // { label: t('nav.pricing'), href: getLocalizedPath('/pricing', lang) }, // Hidden - Coming Soon
    { label: t('nav.contact'), href: getLocalizedPath('/contact', lang) },
  ];

  const switchLanguage = (newLang: string) => {
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    
    if (lang !== defaultLang) {
      newPath = currentPath.replace(`/${lang}`, '') || '/';
    }
    
    if (newLang !== defaultLang) {
      newPath = `/${newLang}${newPath === '/' ? '' : newPath}`;
    }
    
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
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
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{languages[lang as keyof typeof languages]}</span>
            </button>
            
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-md bg-popover border border-border shadow-lg">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => switchLanguage(code)}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors",
                      code === lang && "bg-accent"
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

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
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
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