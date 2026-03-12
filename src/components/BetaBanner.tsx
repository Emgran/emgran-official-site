import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Loader2 } from 'lucide-react';

interface BetaBannerProps {
  lang?: string;
}

export function BetaBanner({ lang = 'en' }: BetaBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isZh = lang === 'zh';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call - replace with actual waitlist API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just show success
    setStatus('success');
    
    // Store in localStorage for persistence
    localStorage.setItem('emgran_waitlist', email);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Message */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-sm">
                🎉
              </span>
              <p className="text-sm font-medium">
                {isZh ? (
                  <>
                    <span className="font-bold">Beta 测试中</span>
                    <span className="mx-2 opacity-50">•</span>
                    <span>免费使用，名额有限</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">Currently in Beta</span>
                    <span className="mx-2 opacity-50">•</span>
                    <span>Free to use, limited spots</span>
                  </>
                )}
              </p>
            </div>

            {/* Waitlist Form */}
            {status !== 'success' ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="email"
                    placeholder={isZh ? '输入邮箱' : 'Enter email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 w-36 sm:w-44"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-3 py-1.5 rounded-lg bg-white text-purple-600 font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-70 flex items-center gap-2 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    isZh ? '加入等待' : 'Join Waitlist'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {isZh ? '已加入等待名单！' : 'You\'re on the list!'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}