import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PawIcon from '@/components/PawIcon';

export default async function NotFound() {
  // Default to Arabic since locale params aren't available in not-found
  setRequestLocale('ar');
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative">
        <PawIcon className="h-28 w-28 text-amber/30 animate-paw-bounce" />
      </div>
      <h1 className="mt-6 font-display text-6xl font-bold text-forest dark:text-amber-light sm:text-7xl">
        {t('title')}
      </h1>
      <h2 className="mt-4 font-display text-2xl font-bold text-charcoal dark:text-cream">
        {t('heading')}
      </h2>
      <p className="mt-2 max-w-md text-charcoal/70 dark:text-cream/70">{t('subtitle')}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-base font-bold text-cream shadow-sm transition-all hover:bg-forest-dark hover:shadow-md active:scale-95"
      >
        <PawIcon className="h-5 w-5" />
        {t('cta')}
      </Link>
    </div>
  );
}
