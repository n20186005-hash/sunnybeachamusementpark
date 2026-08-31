import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sunnybeachamusementpark.com';
  
  const entries: MetadataRoute.Sitemap = [];

  const pages = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings'
  ];

  for (const locale of routing.locales) {
    const isDefault = locale === routing.defaultLocale;
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date('2026-08-31'),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? (isDefault ? 1 : 0.8) : 0.5,
        alternates: {
          languages: {
            bg: `${baseUrl}/bg${page}`,
            en: `${baseUrl}/en${page}`,
            zh: `${baseUrl}/zh${page}`,
            'x-default': `${baseUrl}/bg${page}`,
          },
        },
      });
    }
  }

  return entries;
}
