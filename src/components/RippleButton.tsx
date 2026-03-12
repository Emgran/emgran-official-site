import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  rippleColor?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      rippleColor = 'rgba(255, 255, 255, 0.4)',
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleCount = useRef(0);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const newRipple: Ripple = {
          id: rippleCount.current++,
          x,
          y,
          size,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.(e);
      },
      [onClick, ref]
    );

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 py-3 text-base',
    };

    return (
      <motion.button
        ref={ref || buttonRef}
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg font-medium transition-colors overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.button>
    );
  }
);

RippleButton.displayName = 'RippleButton';

// CTA Button with glow effect
interface CTAButtonProps extends RippleButtonProps {
  glowColor?: string;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, className, glowColor = 'rgba(168, 85, 247, 0.5)', ...props }, ref) => {
    return (
      <RippleButton
        ref={ref}
        className={cn(
          'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
          'hover:from-purple-700 hover:to-indigo-700',
          'shadow-lg hover:shadow-xl',
          'animate-cta-glow',
          className
        )}
        style={{
          '--glow-color': glowColor,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </RippleButton>
    );
  }
);

CTAButton.displayName = 'CTAButton';

// Animated link component
interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedLink({ href, children, className }: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn('link-underline inline-block', className)}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}