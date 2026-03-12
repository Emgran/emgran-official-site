import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Bot, BarChart3, Palette, LineChart, ChevronDown } from 'lucide-react';
import { useTranslations, getLocalizedPath, defaultLang } from '@/i18n';
import { ParticleBackground } from './ParticleBackground';

interface HeroProps {
  lang?: string;
}

export function Hero({ lang = defaultLang }: HeroProps) {
  const t = (key: string) => useTranslations(lang as any)(key as any);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: t('features.milestone.title'),
      description: t('features.milestone.desc'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Palette,
      title: t('features.collab.title'),
      description: t('features.collab.desc'),
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: LineChart,
      title: t('features.insights.title'),
      description: t('features.insights.desc'),
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} className="-z-10" />

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="container py-24 md:py-32 lg:py-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.span
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              ✨ {t('hero.badge')}
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}{' '}
            <span className="gradient-text-animated">{t('hero.title.highlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={getLocalizedPath('/contact', lang)}
              className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                {t('hero.cta.primary')}
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href={getLocalizedPath('/product', lang)}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background/50 backdrop-blur px-8 py-3.5 text-sm font-medium hover:bg-accent transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta.secondary')}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold gradient-text-animated"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs mb-2">{lang === 'zh' ? '向下滚动' : 'Scroll down'}</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="container py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('features.subtitle')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-xl border border-border bg-card/50 backdrop-blur p-6 overflow-hidden"
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.3)',
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <motion.div
                  className={`rounded-lg bg-gradient-to-br ${feature.gradient} p-3 w-fit mb-4`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>
                
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
                
                {/* Corner decoration */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-24 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('workflow.title')}</h2>
        </motion.div>

        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center group"
              >
                {/* Step number with animation */}
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {index + 1}
                </motion.div>
                
                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-purple-600/50 to-indigo-600/50" />
                )}
                
                <h3 className="mt-4 font-semibold text-lg">{t(`workflow.${step}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                  {t(`workflow.${step}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 animate-gradient-flow" />
          
          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('cta.title')}
            </motion.h2>
            <motion.p
              className="mt-4 text-white/80 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.a
              href={getLocalizedPath('/contact', lang)}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-medium text-purple-600 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('cta.button')}
            </motion.a>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}