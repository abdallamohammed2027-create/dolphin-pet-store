import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import PawIcon from './PawIcon';

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand to-cream dark:from-charcoal dark:to-charcoal">
      {/* Decorative paw prints scattered in background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <PawIcon className="absolute top-24 start-[8%] h-16 w-16 text-amber/20 rotate-[-15deg]" />
        <PawIcon className="absolute top-1/2 end-[6%] h-24 w-24 text-forest/10 rotate-[12deg]" />
        <PawIcon className="absolute bottom-10 start-[20%] h-12 w-12 text-amber/15 rotate-[20deg]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="text-center lg:text-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-sm font-bold text-amber-dark dark:bg-amber/10 dark:text-amber-light">
              <PawIcon className="h-4 w-4" />
              {t('eyebrow')}
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-forest dark:text-cream sm:text-5xl lg:text-6xl">
              {t('title')}{' '}
              <span className="relative inline-block text-amber">
                {t('titleHighlight')}
                <svg
                  className="absolute -bottom-2 left-0 w-full text-amber/40"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 9C40 4 100 2 198 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>{' '}
              {t('titleEnd')}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal/70 dark:text-cream/70 lg:mx-0">
              {t('subtitle')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/products"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-base font-bold text-cream shadow-lg shadow-forest/20 transition-all hover:bg-forest-dark hover:shadow-xl active:scale-95 sm:w-auto"
              >
                {t('ctaPrimary')}
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-forest/20 bg-white px-8 py-4 text-base font-bold text-forest shadow-sm transition-all hover:border-forest/40 hover:shadow-md active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-cream sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {t('ctaSecondary')}
              </a>
            </div>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-forest/10 pt-8 dark:border-white/10">
              <div>
                <dt className="sr-only">{t('stat1Label')}</dt>
                <dd className="font-display text-2xl font-bold text-forest dark:text-amber-light sm:text-3xl">{t('stat1Value')}</dd>
                <p className="mt-1 text-xs font-medium text-charcoal/60 dark:text-cream/60 sm:text-sm">{t('stat1Label')}</p>
              </div>
              <div>
                <dt className="sr-only">{t('stat2Label')}</dt>
                <dd className="font-display text-2xl font-bold text-forest dark:text-amber-light sm:text-3xl">{t('stat2Value')}</dd>
                <p className="mt-1 text-xs font-medium text-charcoal/60 dark:text-cream/60 sm:text-sm">{t('stat2Label')}</p>
              </div>
              <div>
                <dt className="sr-only">{t('stat3Label')}</dt>
                <dd className="font-display text-2xl font-bold text-forest dark:text-amber-light sm:text-3xl">{t('stat3Value')}</dd>
                <p className="mt-1 text-xs font-medium text-charcoal/60 dark:text-cream/60 sm:text-sm">{t('stat3Label')}</p>
              </div>
            </dl>
          </div>

          {/* Visual: stylized logo badge */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:max-w-lg">
            <div className="absolute h-full w-full rounded-full bg-gradient-to-br from-amber/30 to-forest/10 blur-2xl" aria-hidden="true" />
            <div className="relative flex aspect-square w-[85%] items-center justify-center rounded-full border-8 border-white bg-amber shadow-2xl dark:border-charcoal/40">
              <PawIcon className="h-1/2 w-1/2 text-forest-dark animate-wag" />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-2 start-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg dark:bg-charcoal sm:start-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest dark:bg-amber/10 dark:text-amber-light">
                <PawIcon className="h-5 w-5" />
              </span>
              <div className="text-start">
                <p className="font-display text-sm font-bold text-forest dark:text-amber-light">{t('stat1Value')}</p>
                <p className="text-xs text-charcoal/60 dark:text-cream/60">{t('stat1Label')}</p>
              </div>
            </div>
            <div className="absolute -bottom-2 end-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg dark:bg-charcoal sm:end-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 text-amber-dark dark:bg-forest/20 dark:text-amber-light">
                <PawIcon className="h-5 w-5" />
              </span>
              <div className="text-start">
                <p className="font-display text-sm font-bold text-forest dark:text-amber-light">{t('stat3Value')}</p>
                <p className="text-xs text-charcoal/60 dark:text-cream/60">{t('stat3Label')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
