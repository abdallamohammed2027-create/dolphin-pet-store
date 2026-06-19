'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import type { Product, ProductCategory } from '@/lib/supabase/database.types';
import ProductCard from '@/components/ProductCard';
import PawIcon from '@/components/PawIcon';
import Reveal from '@/components/Reveal';

const CATEGORIES: ProductCategory[] = ['dogs', 'cats', 'birds', 'accessories', 'grooming', 'aquarium'];

export default function ProductsClient() {
  const t = useTranslations('products');
  const tCat = useTranslations('categories');
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get('category') ?? 'all'
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (!error && data) {
          setProducts(data);
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        search.trim() === '' ||
        p.name_ar.toLowerCase().includes(search.toLowerCase()) ||
        p.name_en.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-amber">
            <PawIcon className="h-5 w-5" />
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-forest dark:text-amber-light sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-charcoal/70 dark:text-cream/70">{t('subtitle')}</p>
        </div>
      </Reveal>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="relative">
          <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/40 dark:text-cream/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-full border border-forest/15 bg-white py-3 ps-12 pe-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest dark:border-white/10 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/40"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeCategory === 'all'
              ? 'bg-forest text-cream'
              : 'bg-white text-charcoal/70 hover:bg-forest/5 dark:bg-white/5 dark:text-cream/70'
          }`}
        >
          {t('all')}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-forest text-cream'
                : 'bg-white text-charcoal/70 hover:bg-forest/5 dark:bg-white/5 dark:text-cream/70'
            }`}
          >
            {tCat(cat as any)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-charcoal/50 dark:text-cream/50">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>{t('searchPlaceholder') ? '' : ''}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center text-charcoal/50 dark:text-cream/50">
          <PawIcon className="h-12 w-12 text-forest/15 dark:text-amber/10" />
          <p>{t('noResults')}</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 8) * 50}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
