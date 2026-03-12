import { useTranslations, getLocalizedPath, defaultLang, languages } from '@/i18n';

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = defaultLang }: FooterProps) {
  const t = (key: string) => useTranslations(lang as any)(key as any);

  const productLinks = [
    { label: t('nav.product'), href: getLocalizedPath('/product', lang) },
    // { label: t('nav.pricing'), href: getLocalizedPath('/pricing', lang) }, // Hidden - Coming Soon
    // { label: t('nav.docs'), href: getLocalizedPath('/docs', lang) }, // Hidden - Coming Soon
  ];

  const companyLinks = [
    { label: t('nav.about'), href: getLocalizedPath('/about', lang) },
    // { label: t('nav.blog'), href: getLocalizedPath('/blog', lang) }, // Hidden - Coming Soon
    { label: t('nav.contact'), href: getLocalizedPath('/contact', lang) },
  ];

  const legalLinks = [
    // { label: t('footer.privacy'), href: getLocalizedPath('/privacy', lang) }, // Hidden - Coming Soon
    // { label: t('footer.terms'), href: getLocalizedPath('/terms', lang) }, // Hidden - Coming Soon
  ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href={lang === defaultLang ? '/' : `/${lang}`} className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">Emgran</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">{t('footer.product')}</h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">{t('footer.company')}</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">{t('footer.legal')}</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emgran. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            {Object.entries(languages).map(([code, name]) => (
              <a
                key={code}
                href={code === defaultLang ? '/' : `/${code}`}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  code === lang && "text-foreground font-medium"
                )}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}