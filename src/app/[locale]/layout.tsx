import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = 'https://sunnybeachamusementpark.com';
const GA_ID = 'G-HXM22WWPKP';
const LAST_UPDATED = '2026-08-31';

const touristAttractionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': 'https://sunnybeachamusementpark.com/#attraction',
  name: 'Sunny Beach Amusement Park',
  alternateName: ['Лунапарк Слънчев бряг', 'Sunny Beach Amusement Park'],
  description:
    'Comprehensive visitor guide to Sunny Beach Amusement Park in Sunny Beach, Burgas Province, Bulgaria.',
  url: BASE_URL,
  image: [`${BASE_URL}/gallery/sunny-beach-amusement-park-1.jpg`],
  isAccessibleForFree: true,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '18:00',
    closes: '00:00',
    validFrom: '2026-06-01',
    validTo: '2026-09-30',
  },
  telephone: '+359897847003',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Flower Street, Sunny Beach Amusement Park',
    addressLocality: 'Sunny Beach',
    addressRegion: 'Burgas Province',
    postalCode: '8240',
    addressCountry: 'BG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.6929674,
    longitude: 27.713382499999998,
  },
  hasMap: 'https://maps.app.goo.gl/2vQQGdK5Vr23inr86',
  sameAs: [
    'https://maps.app.goo.gl/2vQQGdK5Vr23inr86',
    'https://www.tourism.government.bg/',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Sunny Beach Amusement Park Visitor Guide',
  url: BASE_URL,
  logo: `${BASE_URL}/icons/icon.svg`,
  description:
    'Independent, non-profit tourism information project about Sunny Beach Amusement Park in Sunny Beach, Burgas Province, Bulgaria.',
  areaServed: 'BG',
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Sunny Beach Amusement Park Visitor Guide',
  url: BASE_URL,
  inLanguage: ['bg', 'en', 'zh'],
  publisher: { '@id': `${BASE_URL}/#organization` },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const bgUrl = `${BASE_URL}/bg`;
  const enUrl = `${BASE_URL}/en`;
  const zhUrl = `${BASE_URL}/zh`;
  const selfUrl = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'bg': bgUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': bgUrl,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Sunny Beach Amusement Park',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'bg_BG',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/gallery/sunny-beach-amusement-park-1.jpg`,
          width: 1200,
          height: 630,
          alt: 'Sunny Beach Amusement Park in Sunny Beach, Bulgaria',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${BASE_URL}/gallery/sunny-beach-amusement-park-1.jpg`],
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
  const messages = await getMessages();

  const langAttr = locale === 'zh' ? 'zh-CN' : locale === 'bg' ? 'bg-BG' : 'en';
  const meta = (messages as { meta: { title: string; description: string } }).meta;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/${locale}/#webpage`,
    url: `${BASE_URL}/${locale}`,
    inLanguage: langAttr,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#attraction` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
  };

  return (
    <html lang={langAttr} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
        {/* PWA */}
        <meta name="theme-color" content="#234d5c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sunny Beach Amusement Park" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(e){console.warn('Service worker registration failed',e);});});}`,
          }}
        />
        {/* Theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Structured data: TouristAttraction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionJsonLd) }}
        />
        {/* Structured data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Structured data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Structured data: WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
