import { useTranslations } from 'next-intl';
import PawIcon from './PawIcon';
import NewsletterForm from './NewsletterForm';
import Reveal from './Reveal';

export default function NewsletterSection() {
  const t = useTranslations('newsletter');

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 text-center sm:px-12 sm:py-16">
          <PawIcon className="absolute -top-6 -end-6 h-32 w-32 text-white/5 rotate-12" aria-hidden="true" />
          <PawIcon className="absolute -bottom-8 -start-8 h-40 w-40 text-white/5 -rotate-12" aria-hidden="true" />

          <div className="relative mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">{t('title')}</h2>
            <p className="mt-3 text-cream/70">{t('subtitle')}</p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
