import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  gradient?: string;
}

export function GlassCard({
  children,
  className,
  blur = "lg",
  hover = true,
  gradient,
}: GlassCardProps) {
  const blurAmount = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }[blur];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/20",
        "bg-white/10 dark:bg-black/20",
        blurAmount,
        "shadow-2xl",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-br before:from-white/30 before:to-transparent",
        "before:opacity-50",
        hover && "transition-all duration-500 cursor-pointer",
        className
      )}
    >
      {/* Optional gradient accent line */}
      {gradient && (
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
