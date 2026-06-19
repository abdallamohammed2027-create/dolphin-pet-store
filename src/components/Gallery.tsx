'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PawIcon from './PawIcon';
import Reveal from './Reveal';

// Placeholder gallery images — replace with real store photos.
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80', alt: 'Cute dog in pet store' },
  { src: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80', alt: 'Cat sitting near pet supplies' },
  { src: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80', alt: 'Pet food shelves' },
  { src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80', alt: 'Pet accessories display' },
  { src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80', alt: 'Bird in cage' },
  { src: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=800&q=80', alt: 'Aquarium fish tank' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="gallery" className="bg-sand py-16 dark:bg-white/[0.02] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 text-amber">
              <PawIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-forest dark:text-amber-light sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-charcoal/70 dark:text-cream/70">{t('subtitle')}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i * 50}>
              <button
                onClick={() => {
                  setActiveIndex(i);
                  setOpen(true);
                }}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-forest/0 transition-colors group-hover:bg-forest/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={activeIndex}
        slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </section>
  );
}
