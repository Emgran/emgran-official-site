import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Zap,
  Shield,
  Code,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description:
      "Access state-of-the-art language models and neural networks for your applications.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized infrastructure ensures your AI queries are processed in milliseconds.",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.1,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.2,
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "Clean APIs, comprehensive docs, and SDKs in your favorite programming languages.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.3,
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy worldwide with edge locations across 6 continents for minimal latency.",
    gradient: "from-indigo-500 to-purple-500",
    delay: 0.4,
  },
  {
    icon: Sparkles,
    title: "Auto-Optimization",
    description:
      "Smart caching and model selection automatically optimize for cost and performance.",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  show: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Everything you need to{" "}
            <span className="gradient-text-animated">
              build with AI
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features designed to help you ship AI-powered products faster
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative p-6 md:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                whileHover={{ 
                  y: -8,
                  borderColor: "rgba(168, 85, 247, 0.5)",
                  boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon container */}
                <motion.div
                  variants={iconVariants}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <motion.div
                  className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </motion.div>

                {/* Corner decoration */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                
                {/* Top shine effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}