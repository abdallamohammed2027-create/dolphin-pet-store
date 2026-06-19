interface StructuredDataProps {
  locale: string;
}

/**
 * Injects Organization + LocalBusiness JSON-LD structured data for SEO.
 */
export default function StructuredData({ locale }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dolphinpets.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '201014410528';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: locale === 'ar' ? 'دولفين لمستلزمات الحيوانات' : 'Dolphin Pet Supplies',
    url: siteUrl,
    telephone: `+${whatsappNumber}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    openingHours: 'Mo-Su 10:00-23:00',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
