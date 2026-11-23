import type { Locale } from '@/i18n/routing';
import { nearbyPhotos, nearbyText, type NearbyPlace } from '@/content/nearby';

export default function NearbyCards({ places, locale }: { places: NearbyPlace[]; locale: Locale }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => {
        const { name, description } = nearbyText(place, locale);
        return (
          <li key={place.slug} className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm">
            <a href={`/${locale}/nearby/${place.slug}`} className="group block h-full">
              {nearbyPhotos[place.slug] && (
                // Local WebP is already resized and optimised.
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`/nearby/${place.slug}.webp`} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold group-hover:underline">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
