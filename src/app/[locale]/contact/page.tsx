import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
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
    title: t('contactTitle'),
    description: t('contactDescription'),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';

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

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Form */}
        <Reveal delay={80} className="lg:col-span-3">
          <div className="rounded-3xl border border-forest/10 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-forest dark:text-amber-light">
              {t('formTitle')}
            </h2>
            <ContactForm />
          </div>
        </Reveal>

        {/* Info + Map */}
        <Reveal delay={140} className="lg:col-span-2">
          <div className="space-y-6">
            <div className="rounded-3xl border border-forest/10 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
              <h2 className="font-display text-xl font-bold text-forest dark:text-amber-light">
                {t('infoTitle')}
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest dark:bg-amber/10 dark:text-amber-light">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal dark:text-cream">{t('address')}</p>
                    <p className="text-charcoal/65 dark:text-cream/65">{t('addressValue')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest dark:bg-amber/10 dark:text-amber-light">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal dark:text-cream">{t('phone')}</p>
                    <a href={`tel:+${whatsappNumber}`} className="text-charcoal/65 hover:text-forest dark:text-cream/65 dark:hover:text-amber-light">
                      +{whatsappNumber}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest dark:bg-amber/10 dark:text-amber-light">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal dark:text-cream">{t('email')}</p>
                    <a href="mailto:info@dolphinpets.com" className="text-charcoal/65 hover:text-forest dark:text-cream/65 dark:hover:text-amber-light">
                      info@dolphinpets.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest dark:bg-amber/10 dark:text-amber-light">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal dark:text-cream">{t('hours')}</p>
                    <p className="text-charcoal/65 dark:text-cream/65">{t('hoursValue')}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-3xl border border-forest/10 dark:border-white/10">
              <h2 className="sr-only">{t('mapTitle')}</h2>
              <iframe
                title={t('mapTitle')}
                src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
