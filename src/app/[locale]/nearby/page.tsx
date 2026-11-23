import NearbyHero from '@/components/NearbyHero';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import Footer from '@/components/Footer';
import NearbyCards from '@/components/NearbyCards';
import { nearbyMetadata, nearbyPlaces } from '@/content/nearby';
import { areas, nearbyLabels } from '@/content/nearby-labels';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { nearby: title, subtitle: description } = nearbyLabels(locale);
  const alternates = nearbyMetadata('/nearby', locale);
  return { title, description, alternates, openGraph: { title, description, url: alternates.canonical, images: ['/nearby/old-nesebar.webp'] } };
}

export default async function NearbyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = nearbyLabels(locale);

  return (
    <>
      <main>
        <NearbyHero image="/nearby/old-nesebar.webp">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{t.nearby}</h1>
          <p className="mt-4 max-w-2xl text-lg">{t.subtitle}</p>
        </NearbyHero>
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
          {Object.entries(areas).map(([area, details]) => (
            <section key={area}>
              <h2 className="mb-5 text-3xl font-semibold">{details.name[locale]}</h2>
              <NearbyCards places={nearbyPlaces.filter((place) => place.area === area)} locale={locale} />
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
