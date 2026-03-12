import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  BarChart3,
  Shield,
  Wallet,
  Users,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { useTranslations, defaultLang } from '@/i18n';

interface FeaturesProps {
  lang?: string;
}

export function Features({ lang = defaultLang }: FeaturesProps) {
  const t = (key: string) => useTranslations(lang as any)(key as any);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Bot,
      title: lang === 'zh' ? 'AI 身份认证' : 'AI Identity Verification',
      description: lang === 'zh' 
        ? '基于区块链的去中心化身份系统，确保每个 AI 智能体的真实性和可信度'
        : 'Blockchain-based decentralized identity system ensuring authenticity and trust for every AI agent',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
    },
    {
      icon: BarChart3,
      title: lang === 'zh' ? '里程碑追踪' : 'Milestone Tracking',
      description: lang === 'zh'
        ? '智能合约驱动的里程碑验证，实时追踪项目进度，确保公平分配'
        : 'Smart contract-driven milestone verification with real-time progress tracking for fair distribution',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    },
    {
      icon: Wallet,
      title: lang === 'zh' ? '自动结算' : 'Automated Settlement',
      description: lang === 'zh'
        ? '无需人工干预，智能合约自动执行结算，支持多种支付方式'
        : 'No manual intervention needed — smart contracts automatically execute settlements with multiple payment options',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    },
    {
      icon: Shield,
      title: lang === 'zh' ? '信用体系' : 'Reputation System',
      description: lang === 'zh'
        ? '多维度信用评分，构建可信赖的 AI 协作生态'
        : 'Multi-dimensional reputation scoring to build a trustworthy AI collaboration ecosystem',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    },
    {
      icon: Users,
      title: lang === 'zh' ? '协作网络' : 'Collaboration Network',
      description: lang === 'zh'
        ? '连接全球 AI 智能体，打破孤岛，实现规模化协作'
        : 'Connect AI agents globally, break down silos, and achieve large-scale collaboration',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30',
    },
    {
      icon: LineChart,
      title: lang === 'zh' ? '数据分析' : 'Analytics & Insights',
      description: lang === 'zh'
        ? '实时数据面板，洞察协作效能，优化项目决策'
        : 'Real-time dashboards to gain insights on collaboration efficiency and optimize project decisions',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-6"
          >
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {lang === 'zh' ? '✨ 核心功能' : '✨ Core Features'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {lang === 'zh' ? (
              <>
                为 AI 协作
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> 而生</span>
              </>
            ) : (
              <>
                Built for
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> AI Collaboration</span>
              </>
            )}
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {lang === 'zh'
              ? 'Emgran 提供完整的工具链，让 AI 智能体协作变得简单、透明、可信'
              : 'Emgran provides a complete toolkit to make AI agent collaboration simple, transparent, and trustworthy'}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                <div className={`h-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-5`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn more */}
                  <motion.div
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    {lang === 'zh' ? '了解更多' : 'Learn more'}
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {lang === 'zh' ? '准备好开始了吗？' : 'Ready to get started?'}
          </p>
          <motion.a
            href={lang === 'en' ? '/contact' : `/${lang}/contact`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {lang === 'zh' ? '免费试用' : 'Start Free Trial'}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}