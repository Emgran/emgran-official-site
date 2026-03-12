import { motion } from 'framer-motion';
import { useTranslations, getLocalizedPath, defaultLang, languages } from '@/i18n';
import { cn } from '@/lib/utils';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = defaultLang }: FooterProps) {
  const t = (key: string) => useTranslations(lang as any)(key as any);

  const productLinks = [
    { label: t('nav.product'), href: getLocalizedPath('/product', lang) },
    { label: t('nav.pricing'), href: getLocalizedPath('/pricing', lang) },
    { label: t('nav.docs'), href: getLocalizedPath('/docs', lang) },
  ];

  const companyLinks = [
    { label: t('nav.about'), href: getLocalizedPath('/about', lang) },
    { label: t('nav.blog'), href: getLocalizedPath('/blog', lang) },
    { label: t('nav.contact'), href: getLocalizedPath('/contact', lang) },
  ];

  const legalLinks = [
    { label: t('footer.privacy'), href: getLocalizedPath('/privacy', lang) },
    { label: t('footer.terms'), href: getLocalizedPath('/terms', lang) },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/emgran', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/emgran', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/emgran', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@emgran.com', label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative border-t border-border bg-muted/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-2">
            <motion.a 
              href={lang === defaultLang ? '/' : `/${lang}`} 
              className="inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold gradient-text-animated">Emgran</span>
            </motion.a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emgran. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            {Object.entries(languages).map(([code, name]) => (
              <motion.a
                key={code}
                href={code === defaultLang ? '/' : `/${code}`}
                className={cn(
                  "text-sm px-3 py-1 rounded-full transition-all",
                  code === lang 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}