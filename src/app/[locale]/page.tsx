import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import NearbyHome from '@/components/NearbyHome';
import type { Locale } from '@/i18n/routing';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import HistorySection from '@/components/HistorySection';
import InfoSection from '@/components/InfoSection';
import LegendsSection from '@/components/LegendsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import WeatherSection from '@/components/WeatherSection';
import SeasonalStrategy from '@/components/SeasonalStrategy';
import Itineraries from '@/components/Itineraries';
import VisitorResponsibility from '@/components/VisitorResponsibility';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://sunnybeachamusementpark.com';
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'bg': `${baseUrl}/bg`,
        'en': `${baseUrl}/en`,
        'zh': `${baseUrl}/zh`,
        'he': `${baseUrl}/he`,
        'ro': `${baseUrl}/ro`,
        'x-default': `${baseUrl}/bg`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const faqItems = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <main>
        <Hero />
        <Intro />
        <NearbyHome locale={locale as Locale} />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection locale={locale} />
        <SeasonalStrategy />
        <Itineraries />
        <FacilitiesSection />
        <VisitorResponsibility />
        <HistorySection />
        <InfoSection />
        <LegendsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <MapEmbed />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
