import { useTranslations } from 'next-intl';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import PawIcon from './PawIcon';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCat = useTranslations('categories');
  const tContact = useTranslations('contact');
  const year = new Date().getFullYear();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';

  return (
    <footer className="border-t border-forest/10 bg-sand dark:border-white/10 dark:bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + about */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-forest">
                <PawIcon className="h-6 w-6" />
              </span>
              <span className="font-display text-xl font-bold text-forest dark:text-amber-light">
                Dolphin
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/70 dark:text-cream/70">
              {t('about')}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors hover:bg-forest hover:text-cream dark:bg-white/10 dark:text-amber-light dark:hover:bg-amber dark:hover:text-forest"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors hover:bg-forest hover:text-cream dark:bg-white/10 dark:text-amber-light dark:hover:bg-amber dark:hover:text-forest"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors hover:bg-forest hover:text-cream dark:bg-white/10 dark:text-amber-light dark:hover:bg-amber dark:hover:text-forest"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-base font-bold text-forest dark:text-amber-light">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tNav('home')}</Link></li>
              <li><Link href="/about" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tNav('about')}</Link></li>
              <li><Link href="/products" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tNav('products')}</Link></li>
              <li><Link href="/contact" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-base font-bold text-forest dark:text-amber-light">
              {t('categories')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/products?category=dogs" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tCat('dogs')}</Link></li>
              <li><Link href="/products?category=cats" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tCat('cats')}</Link></li>
              <li><Link href="/products?category=birds" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tCat('birds')}</Link></li>
              <li><Link href="/products?category=aquarium" className="text-charcoal/70 hover:text-forest dark:text-cream/70 dark:hover:text-amber-light">{tCat('aquarium')}</Link></li>
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h3 className="font-display text-base font-bold text-forest dark:text-amber-light">
              {t('contactInfo')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-charcoal/70 dark:text-cream/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <span>{tContact('addressValue')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <a href={`tel:+${whatsappNumber}`} className="hover:text-forest dark:hover:text-amber-light">
                  +{whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <a href="mailto:info@dolphinpets.com" className="hover:text-forest dark:hover:text-amber-light">
                  info@dolphinpets.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-3xl bg-forest/5 p-6 dark:bg-white/5 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-lg font-bold text-forest dark:text-amber-light">
                {t('newsletterTitle')}
              </h3>
              <p className="mt-1 text-sm text-charcoal/70 dark:text-cream/70">{t('newsletterDesc')}</p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[320px]">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-forest/10 pt-6 text-center text-sm text-charcoal/60 dark:border-white/10 dark:text-cream/60 sm:flex-row sm:text-start">
          <p>{t('rights', { year })}</p>
          <p className="flex items-center gap-1.5">
            <PawIcon className="h-4 w-4 text-amber" />
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
