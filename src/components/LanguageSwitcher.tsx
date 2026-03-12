import { useState } from 'react';
import { cn } from '@/lib/utils';
import { languages, defaultLang } from '@/i18n';

interface LanguageSwitcherProps {
  lang?: string;
  currentPath?: string;
}

export function LanguageSwitcher({ lang = defaultLang, currentPath }: LanguageSwitcherProps) {
  // Get current path from browser if not provided
  const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  
  // Function to get localized path
  const getLocalizedPath = (targetLang: string) => {
    // Remove existing language prefix
    let cleanPath = path;
    if (path.startsWith('/zh')) {
      cleanPath = path.slice(3) || '/';
    }
    
    // Add new language prefix if not default
    if (targetLang === defaultLang) {
      return cleanPath || '/';
    }
    return `/${targetLang}${cleanPath}`;
  };

  return (
    <div className="flex items-center space-x-1 text-sm">
      <a
        href={getLocalizedPath('en')}
        className={cn(
          "font-medium transition-colors px-2 py-1 rounded",
          lang === 'en' 
            ? "text-foreground bg-muted/50" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
        )}
      >
        EN
      </a>
      <span className="text-muted-foreground">|</span>
      <a
        href={getLocalizedPath('zh')}
        className={cn(
          "font-medium transition-colors px-2 py-1 rounded",
          lang === 'zh' 
            ? "text-foreground bg-muted/50" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
        )}
      >
        中文
      </a>
    </div>
  );
}