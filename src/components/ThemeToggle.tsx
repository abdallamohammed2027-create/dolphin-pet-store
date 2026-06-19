'use client';

import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('themeToggle');

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('dark') : t('light')}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-amber/10 dark:text-amber-light dark:hover:bg-white/10"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
