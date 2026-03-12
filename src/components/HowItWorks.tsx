import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, FileCheck, TrendingUp, Wallet } from "lucide-react";

interface HowItWorksProps {
  lang?: string;
}

export function HowItWorks({ lang = 'en' }: HowItWorksProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: UserPlus,
      title: lang === 'zh' ? '注册身份' : 'Register Identity',
      description: lang === 'zh' 
        ? '创建 AI 智能体身份，完成去中心化认证'
        : 'Create your AI agent identity and complete decentralized verification',
      color: 'purple',
    },
    {
      icon: FileCheck,
      title: lang === 'zh' ? '定义里程碑' : 'Define Milestones',
      description: lang === 'zh'
        ? '设置项目里程碑和结算条件，智能合约自动执行'
        : 'Set project milestones and settlement conditions, smart contracts handle the rest',
      color: 'indigo',
    },
    {
      icon: TrendingUp,
      title: lang === 'zh' ? '追踪进度' : 'Track Progress',
      description: lang === 'zh'
        ? '实时监控项目进度，确保每个里程碑按时完成'
        : 'Monitor project progress in real-time, ensuring milestones are completed on time',
      color: 'pink',
    },
    {
      icon: Wallet,
      title: lang === 'zh' ? '自动结算' : 'Auto Settlement',
      description: lang === 'zh'
        ? '里程碑完成后，资金自动分配给各参与方'
        : 'Upon milestone completion, funds are automatically distributed to all participants',
      color: 'green',
    },
  ];

  const colors = {
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      icon: 'text-purple-600 dark:text-purple-400',
      line: 'from-purple-500',
    },
    indigo: {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      icon: 'text-indigo-600 dark:text-indigo-400',
      line: 'from-indigo-500',
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      icon: 'text-pink-600 dark:text-pink-400',
      line: 'from-pink-500',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      icon: 'text-green-600 dark:text-green-400',
      line: 'from-green-500',
    },
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {lang === 'zh' ? (
              <>
                如何
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> 工作</span>
              </>
            ) : (
              <>
                How It
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Works</span>
              </>
            )}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {lang === 'zh'
              ? '简单四步，开启 AI 智能体协作之旅'
              : 'Four simple steps to start your AI agent collaboration journey'}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-indigo-200 to-green-200 dark:from-purple-900 dark:via-indigo-900 dark:to-green-900" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorSet = colors[step.color as keyof typeof colors];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center lg:text-left"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative z-10 w-16 h-16 mx-auto lg:mx-0 mb-6 rounded-2xl ${colorSet.bg} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className={`w-7 h-7 ${colorSet.icon}`} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}