'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart, Sparkles, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Product } from '@/lib/supabase/database.types';
import PawIcon from './PawIcon';

export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale();
  const t = useTranslations('featured');
  const tProducts = useTranslations('products');
  const [imgError, setImgError] = useState(false);

  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;
  const hasSale = product.sale_price !== null && product.sale_price < product.price;

  const handleAddToCart = () => {
    toast.success(
      locale === 'ar'
        ? `تمت إضافة "${name}" — سيتواصل معك فريقنا لإتمام الطلب`
        : `Added "${name}" — our team will contact you to complete the order`
    );
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-sand dark:bg-charcoal/40">
        {product.image_url && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PawIcon className="h-16 w-16 text-forest/15 dark:text-amber/10" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-xs font-bold text-cream">
              <Sparkles className="h-3 w-3" />
              {t('new')}
            </span>
          )}
          {hasSale && (
            <span className="flex items-center gap-1 rounded-full bg-coral px-2.5 py-1 text-xs font-bold text-white">
              <Tag className="h-3 w-3" />
              {t('sale')}
            </span>
          )}
        </div>

        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-charcoal">
              {tProducts('outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold text-charcoal dark:text-cream line-clamp-2">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60 line-clamp-2">{description}</p>
        )}

        <div className="mt-3 flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="font-display text-lg font-bold text-coral">
                {product.sale_price} {t('egp')}
              </span>
              <span className="text-sm text-charcoal/40 line-through dark:text-cream/40">
                {product.price} {t('egp')}
              </span>
            </>
          ) : (
            <span className="font-display text-lg font-bold text-forest dark:text-amber-light">
              {product.price} {t('egp')}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-bold text-cream transition-all hover:bg-forest-dark active:scale-95 disabled:cursor-not-allowed disabled:bg-charcoal/20 disabled:text-charcoal/50 dark:disabled:bg-white/10 dark:disabled:text-cream/40"
        >
          <ShoppingCart className="h-4 w-4" />
          {t('addToCart')}
        </button>
      </div>
    </article>
  );
}
