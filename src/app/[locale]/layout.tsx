import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fredoka, Inter, Cairo } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { routing } from '@/i18n/routing';
import { ThemeProvider, themeScript } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dolphinpets.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('homeTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('homeDescription'),
    alternates: {
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: siteUrl,
      siteName: t('siteName'),
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const bodyFont = locale === 'ar' ? 'font-arabic' : 'font-body';

  return (
    <html lang={locale} dir={dir} className={`${cairo.variable} ${inter.variable} ${fredoka.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData locale={locale} />
      </head>
      <body className={`${bodyFont} bg-cream text-charcoal antialiased transition-colors dark:bg-charcoal dark:text-cream`}>
        <NextIntlClientProvider>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="pt-20">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <Toaster
              position={dir === 'rtl' ? 'top-left' : 'top-right'}
              toastOptions={{
                style: {
                  background: '#0F5132',
                  color: '#FBF8F2',
                  borderRadius: '1rem',
                  fontFamily: 'inherit',
                },
              }}
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
