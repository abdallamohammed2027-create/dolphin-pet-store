'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [index, setIndex] = useState(0);

  const testimonials = [
    { name: t('t1Name'), role: t('t1Role'), text: t('t1Text') },
    { name: t('t2Name'), role: t('t2Role'), text: t('t2Text') },
    { name: t('t3Name'), role: t('t3Role'), text: t('t3Text') },
    { name: t('t4Name'), role: t('t4Role'), text: t('t4Text') },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goTo = (i: number) => setIndex((i + testimonials.length) % testimonials.length);

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

      <div className="relative mx-auto mt-12 max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-forest/10 bg-white p-8 dark:border-white/10 dark:bg-white/5 sm:p-12">
          <Quote className="h-10 w-10 text-amber/40" aria-hidden="true" />

          <div className="relative mt-4 min-h-[7rem]">
            {testimonials.map((item, i) => (
              <blockquote
                key={i}
                aria-hidden={i !== index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <p className="text-lg leading-relaxed text-charcoal/80 dark:text-cream/80">
                  {item.text}
                </p>
                <footer className="mt-6">
                  <p className="font-display font-bold text-forest dark:text-amber-light">{item.name}</p>
                  <p className="text-sm text-charcoal/60 dark:text-cream/60">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-cream dark:border-white/15 dark:text-amber-light"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-amber' : 'w-2.5 bg-forest/20 dark:bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest hover:text-cream dark:border-white/15 dark:text-amber-light"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
