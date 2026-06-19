'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languageToggle');

  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={t('label')}
      className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-forest transition-colors hover:bg-amber/10 dark:text-amber-light dark:hover:bg-white/10"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span>{otherLocale === 'ar' ? 'العربية' : 'EN'}</span>
    </button>
  );
}
