import { getTranslations } from 'next-intl/server';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { supabase } from '@/lib/supabase/client';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

export default async function FeaturedProducts({ locale }: { locale: string }) {
  const t = await getTranslations('featured');
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(8);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-sand py-16 dark:bg-white/[0.02] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-forest dark:text-amber-light sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-2 text-charcoal/70 dark:text-cream/70">{t('subtitle')}</p>
            </div>
            <Link
              href="/products"
              className="group flex shrink-0 items-center gap-2 rounded-full border-2 border-forest/15 bg-white px-5 py-2.5 text-sm font-bold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream dark:border-white/10 dark:bg-white/5 dark:text-amber-light dark:hover:bg-amber dark:hover:text-forest-dark"
            >
              {t('viewAll')}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
