import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
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
import SourcesSection from '@/components/SourcesSection';
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
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <FacilitiesSection />
        <HistorySection />
        <InfoSection />
        <LegendsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
