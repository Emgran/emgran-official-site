import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getLocalizedPath, defaultLang } from '@/i18n';

interface CTASectionProps {
  lang?: string;
}

export function CTASection({ lang = defaultLang }: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700">
        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">
              {lang === 'zh' ? '🎉 限时优惠：前 100 名用户免费使用' : '🎉 Limited offer: Free for first 100 users'}
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {lang === 'zh' ? (
              <>
                准备好开启
                <span className="block mt-2 text-yellow-300">AI 协作新纪元？</span>
              </>
            ) : (
              <>
                Ready to Start Your
                <span className="block mt-2 text-yellow-300">AI Collaboration Journey?</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {lang === 'zh'
              ? '加入已经使用 Emgran 的数千名开发者和企业，让 AI 智能体协作变得简单、透明、可信。'
              : 'Join thousands of developers and enterprises already using Emgran to make AI agent collaboration simple, transparent, and trustworthy.'}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={getLocalizedPath('/contact', lang)}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-purple-600 rounded-xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {lang === 'zh' ? '立即开始' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={getLocalizedPath('/product', lang)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {lang === 'zh' ? '查看演示' : 'Watch Demo'}
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{lang === 'zh' ? '免费试用 14 天' : '14-day free trial'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{lang === 'zh' ? '无需信用卡' : 'No credit card required'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{lang === 'zh' ? '随时取消' : 'Cancel anytime'}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}