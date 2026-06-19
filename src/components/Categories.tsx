import { useTranslations } from 'next-intl';
import { Dog, Cat, Bird, Shirt, Sparkles, Fish } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Reveal from './Reveal';

const categories = [
  { key: 'dogs', icon: Dog, slug: 'dogs' },
  { key: 'cats', icon: Cat, slug: 'cats' },
  { key: 'birds', icon: Bird, slug: 'birds' },
  { key: 'accessories', icon: Shirt, slug: 'accessories' },
  { key: 'grooming', icon: Sparkles, slug: 'grooming' },
  { key: 'aquarium', icon: Fish, slug: 'aquarium' },
] as const;

export default function Categories() {
  const t = useTranslations('categories');

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-forest dark:text-amber-light sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-charcoal/70 dark:text-cream/70">{t('subtitle')}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ key, icon: Icon, slug }, i) => (
          <Reveal key={key} delay={i * 60}>
            <Link
              href={`/products?category=${slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-forest/10 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-amber hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/5 text-forest transition-colors group-hover:bg-amber/15 group-hover:text-amber-dark dark:bg-white/5 dark:text-amber-light">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-charcoal dark:text-cream">
                  {t(key as any)}
                </h3>
                <p className="mt-1 hidden text-xs text-charcoal/60 dark:text-cream/60 sm:block">
                  {t(`${key}Desc` as any)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
