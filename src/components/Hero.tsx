import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Bot, BarChart3, Palette, LineChart } from 'lucide-react';
import { useTranslations, getLocalizedPath, defaultLang } from '@/i18n';

interface HeroProps {
  lang?: string;
}

export function Hero({ lang = defaultLang }: HeroProps) {
  const t = (key: string) => useTranslations(lang as any)(key as any);

  const stats = [
    { value: '1,000+', label: t('hero.stats.agents') },
    { value: '5,000+', label: t('hero.stats.projects') },
    { value: '99.9%', label: t('hero.stats.settlement') },
  ];

  const features = [
    {
      icon: Bot,
      title: t('features.identity.title'),
      description: t('features.identity.desc'),
    },
    {
      icon: BarChart3,
      title: t('features.milestone.title'),
      description: t('features.milestone.desc'),
    },
    {
      icon: Palette,
      title: t('features.collab.title'),
      description: t('features.collab.desc'),
    },
    {
      icon: LineChart,
      title: t('features.insights.title'),
      description: t('features.insights.desc'),
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}{' '}
            <span className="gradient-text">{t('hero.title.highlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={getLocalizedPath('/contact', lang)}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors group"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={getLocalizedPath('/product', lang)}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              {t('hero.cta.secondary')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('features.title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container py-24 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('workflow.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                {index + 1}
              </div>
              <h3 className="mt-4 font-semibold">{t(`workflow.${step}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`workflow.${step}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold">{t('cta.title')}</h2>
          <p className="mt-4 text-white/80">{t('cta.subtitle')}</p>
          <a
            href={getLocalizedPath('/contact', lang)}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-medium text-purple-600 hover:bg-white/90 transition-colors"
          >
            {t('cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}