import type { Locale } from '@/i18n/routing';
import { nearbyPlaces } from '@/content/nearby';
import { nearbyLabels, nearbyVisitLabels } from '@/content/nearby-labels';
import NearbyCards from './NearbyCards';

export default function NearbyHome({ locale }: { locale: Locale }) {
  const featuredSlugs = ['sunny-beach', 'old-nesebar', 'marina-dinevi', 'nesebar-archaeological-museum', 'action-aquapark', 'pomorie-salt-museum'];
  const featured = featuredSlugs.flatMap((slug) => nearbyPlaces.filter((place) => place.slug === slug));
  const visit = nearbyVisitLabels(locale);

  return (
    <section id="nearby" className="section-padding" dir={locale === 'he' ? 'rtl' : undefined} aria-labelledby="nearby-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="nearby-heading" className="mb-3 text-3xl font-semibold sm:text-4xl">{visit.homeTitle}</h2>
        <p className="mb-7 text-[var(--text-secondary)]">{visit.homeLead}</p>
        <NearbyCards places={featured} locale={locale} />
        <a href={`/${locale}/nearby`} className="mt-7 inline-block font-semibold text-[var(--accent)] underline underline-offset-4">
          {nearbyLabels(locale).all}
        </a>
      </div>
    </section>
  );
}
