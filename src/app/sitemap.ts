import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dolphinpets.com';
  const pages = ['', '/about', '/products', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${siteUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
