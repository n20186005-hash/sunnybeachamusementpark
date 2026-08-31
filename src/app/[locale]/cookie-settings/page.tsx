import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://sunnybeachamusementpark.com';
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const bgUrl = `${baseUrl}/bg/cookie-settings`;
  const selfUrl = `${baseUrl}/${locale}/cookie-settings`;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'bg': bgUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': bgUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
