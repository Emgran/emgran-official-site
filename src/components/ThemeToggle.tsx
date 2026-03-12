import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  // 初始化时检查 DOM 状态，确保与 Layout.astro 的 is:inline 脚本一致
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // 在 SSR 时返回 'light'，在客户端时检查实际 DOM 状态
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 确保状态与 localStorage 和 DOM 同步
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const isDark = document.documentElement.classList.contains('dark');
    
    if (savedTheme) {
      setTheme(savedTheme);
      // 确保 DOM 状态正确
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (isDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // 在组件挂载前不渲染，避免 hydration 不匹配
  if (!mounted) {
    return (
      <button
        className="rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        <Moon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}