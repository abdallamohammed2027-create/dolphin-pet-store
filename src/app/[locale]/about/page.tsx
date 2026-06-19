import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShieldCheck, LayoutGrid, MessageSquareHeart, Truck } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PawIcon from '@/components/PawIcon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
  };
}

const values = [
  { key: 'value1', icon: ShieldCheck },
  { key: 'value2', icon: LayoutGrid },
  { key: 'value3', icon: MessageSquareHeart },
  { key: 'value4', icon: Truck },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-sm font-bold text-amber-dark dark:bg-amber/10 dark:text-amber-light">
            <PawIcon className="h-4 w-4" />
            {t('eyebrow')}
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-forest dark:text-amber-light sm:text-4xl lg:text-5xl">
            {t('title')}
          </h1>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-charcoal/75 dark:text-cream/75">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <h2 className="mt-16 text-center font-display text-2xl font-bold text-forest dark:text-amber-light sm:text-3xl">
          {t('valuesTitle')}
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {values.map(({ key, icon: Icon }, i) => (
          <Reveal key={key} delay={i * 80}>
            <div className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest dark:bg-amber/10 dark:text-amber-light">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-charcoal dark:text-cream">
                  {t(`${key}Title` as any)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65 dark:text-cream/65">
                  {t(`${key}Desc` as any)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
