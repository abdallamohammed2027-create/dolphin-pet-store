import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import NewsletterSection from '@/components/NewsletterSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Categories />
      <FeaturedProducts locale={locale} />
      <Testimonials />
      <Gallery />
      <NewsletterSection />
    </>
  );
}
