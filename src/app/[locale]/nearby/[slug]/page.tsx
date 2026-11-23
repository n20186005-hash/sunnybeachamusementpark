import NearbyHero from '@/components/NearbyHero';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import Footer from '@/components/Footer';
import NearbyCards from '@/components/NearbyCards';
import { areas, nearbyAccess, nearbyLabels, nearbyVisitLabels } from '@/content/nearby-labels';
import { nearbyMap, nearbyMetadata, nearbyPhotos, nearbyPlaces, nearbyRatings, nearbyText, nearbyVisit } from '@/content/nearby';
import { nearbyPractical } from '@/content/nearby-practical';

type Props = { params: Promise<{ locale: Locale; slug: string }> };
const titleStyle = 'mb-4 text-2xl font-semibold sm:text-3xl';
const linkStyle = 'font-medium text-[var(--accent)] underline underline-offset-4';
const panelStyle = 'rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-7';

export function generateStaticParams() {
  return nearbyPlaces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = nearbyPlaces.find((candidate) => candidate.slug === slug);
  if (!place) notFound();
  const { name: title, description } = nearbyText(place, locale);
  const alternates = nearbyMetadata(`/nearby/${slug}`, locale);
  const images = nearbyPhotos[slug] ? [`/nearby/${slug}.webp`] : [];
  return { title, description, alternates, openGraph: { title, description, url: alternates.canonical, images }, twitter: { title, description, images } };
}

export default async function PlacePage({ params }: Props) {
  const { locale, slug } = await params;
  const place = nearbyPlaces.find((candidate) => candidate.slug === slug);
  if (!place) notFound();
  setRequestLocale(locale);

  const t = nearbyLabels(locale);
  const labels = nearbyVisitLabels(locale);
  const area = areas[place.area];
  const { name, description, operator, source, operatorSource } = nearbyText(place, locale);
  const { history, walk, viewpoint } = nearbyVisit(place, locale);
  const access = nearbyAccess(place.access, locale);
  const practical = nearbyPractical(place, locale);
  const map = nearbyMap(place);
  const directions = nearbyMap(place, true);
  const photo = nearbyPhotos[slug];
  const rating = nearbyRatings[slug];
  const formatNumber = new Intl.NumberFormat(locale);
  const euro = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
  const commonsPage = photo && `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(photo.file.replaceAll(' ', '_'))}`;
  const nearby = nearbyPlaces.filter((candidate) => candidate.slug !== slug);
  const related = [...nearby.filter((candidate) => candidate.area === place.area),
    ...nearby.filter((candidate) => candidate.area !== place.area)].slice(0, 3);

  return (
    <>
      <main>
        <NearbyHero image={photo ? `/nearby/${slug}.webp` : "/nearby/old-nesebar.webp"}>
          <a href={`/${locale}/nearby`} className="text-sm font-medium underline underline-offset-4">{t.nearby}</a>
          <p className="mt-6 text-sm font-medium">{area.name[locale]} · {practical.kind}</p>
          <h1 className="mt-2 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed">{practical.highlight}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90">{practical.hours}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={map} className="rounded-full bg-white/15 px-4 py-2 font-semibold text-white backdrop-blur-sm hover:bg-white/25">{t.map}</a>
            <a href="#reviews" className="rounded-full bg-white/15 px-4 py-2 font-semibold backdrop-blur-sm hover:bg-white/25">
              {rating && <span className="me-2">★ {formatNumber.format(rating.score)}/5 · {formatNumber.format(rating.count)}</span>}
              {t.reviews}
            </a>
          </div>
        </NearbyHero>

        <div className="mx-auto max-w-6xl space-y-9 px-4 py-10 sm:px-6">
          <section aria-labelledby="discover">
            <h2 id="discover" className={titleStyle}>{practical.intro}</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">{description}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <section className={panelStyle}>
                <h3 className="mb-2 text-xl font-semibold">{practical.tips}</h3>
                <p className="text-[var(--text-secondary)]">{access}</p>
              </section>
              <section className={panelStyle}>
                <h3 className="mb-2 text-xl font-semibold">{practical.highlights}</h3>
                <p className="text-[var(--text-secondary)]">{practical.highlight}</p>
              </section>
            </div>
          </section>
          <section id="about" className={`${panelStyle} border-s-4 border-s-[var(--accent)]`}>
            <h2 className={titleStyle}>{labels.about}</h2>
            <p className="font-medium">{name}</p>
            <dl className="mt-3">
              <dt className="text-sm font-semibold text-[var(--accent)]">{t.operator}</dt>
              <dd className="mt-1">{operator}</dd>
            </dl>
            <a href={operatorSource} className={`mt-2 inline-block text-sm ${linkStyle}`}>{t.source}</a>
          </section>
          <section className={panelStyle}>
            <h2 className={titleStyle}>{t.essentials}</h2>
            <table className="w-full border-collapse text-start">
              <tbody className="divide-y divide-[var(--border-color)]">
                {[
                  [practical.type, practical.kind],
                  [practical.district, area.name[locale]],
                  [t.address, <span key="address" lang="bg" dir="ltr">{place.address}</span>],
                  [t.operator, operator],
                ].map(([label, value]) => (
                  <tr key={String(label)}>
                    <th scope="row" className="w-1/3 py-3 pe-3 text-start align-top font-semibold">{label}</th>
                    <td className="py-3 text-start text-[var(--text-secondary)]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <div className="grid gap-5 md:grid-cols-2">
            <section className={panelStyle}>
              <h2 className={titleStyle}>{practical.opening}</h2>
              <p className="text-[var(--text-secondary)]">{practical.hours}</p>
              {practical.schedule.length > 0 && (
                <>
                  <h3 className="mt-4 font-semibold">{practical.scheduleLabel}</h3>
                  <ul className="ms-5 mt-2 list-disc space-y-2 text-[var(--text-secondary)]">
                    {practical.schedule.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </>
              )}
              {practical.hourSource && <a href={practical.hourSource} className={`mt-3 inline-block ${linkStyle}`}>{t.source}</a>}
            </section>
            <section className={panelStyle}>
              <h2 className={titleStyle}>{practical.tickets}</h2>
              <p className="text-[var(--text-secondary)]">{practical.admission}</p>
              {practical.ticket && (
                <>
                  <h3 className="mt-4 font-semibold">{practical.tariffLabel}</h3>
                  <dl className="mt-2 space-y-1 text-[var(--text-secondary)]">
                    <div><dt className="inline">{practical.adult}</dt>{' · '}<dd className="inline">{euro.format(practical.ticket[0])}</dd></div>
                    <div><dt className="inline">{practical.child}</dt>{' · '}<dd className="inline">{euro.format(practical.ticket[1])}</dd></div>
                  </dl>
                </>
              )}
              {practical.ticketSource && <a href={practical.ticketSource} className={`mt-3 inline-block ${linkStyle}`}>{t.source}</a>}
            </section>
          </div>

          <section className={panelStyle}>
            <h2 className={titleStyle}>{t.transport}</h2>
            <p className="leading-relaxed text-[var(--text-secondary)]">{area.transit[locale]}</p>
            <a href={directions} className={`mt-4 inline-block ${linkStyle}`}>{labels.directions}</a>
          </section>
          <section className={panelStyle}>
            <h2 className={titleStyle}>{labels.history}</h2>
            <p className="leading-relaxed text-[var(--text-secondary)]">{history}</p>
          </section>
          <div className="grid gap-5 md:grid-cols-2">
            <section className={panelStyle}>
              <h2 className={titleStyle}>{labels.walk}</h2>
              <ol className="ms-5 list-decimal space-y-2 leading-relaxed text-[var(--text-secondary)]">
                <li><a href={directions} className={linkStyle}>{area.name[locale]} · {labels.directions}</a></li>
                <li>{walk}</li>
              </ol>
            </section>
            <section className={panelStyle}>
              <h2 className={titleStyle}>{practical.notes}</h2>
              <p className="leading-relaxed text-[var(--text-secondary)]">{access}</p>
            </section>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <section className={panelStyle}>
              <h2 className={titleStyle}>{labels.viewpoint}</h2>
              <p className="leading-relaxed text-[var(--text-secondary)]">{viewpoint}</p>
            </section>
            <section className={panelStyle}>
              <h2 className={titleStyle}>{practical.lodging}</h2>
              <p className="leading-relaxed text-[var(--text-secondary)]">{practical.stay}</p>
            </section>
          </div>

          <section className={panelStyle}>
            <h2 className={titleStyle}>{labels.faq}</h2>
            <details className="border-b border-[var(--border-color)] py-3">
              <summary className="cursor-pointer font-semibold">{labels.accessQuestion}</summary>
              <p className="mt-2 text-[var(--text-secondary)]">{access}</p>
            </details>
            <details className="py-3">
              <summary className="cursor-pointer font-semibold">{labels.entranceQuestion}</summary>
              <p lang="bg" dir="ltr" className="mt-2 text-start text-[var(--text-secondary)]">{place.address}</p>
              <a href={map} className={`mt-2 inline-block ${linkStyle}`}>{name} · {t.map}</a>
            </details>
          </section>

          <section id="reviews" className={`scroll-mt-20 ${panelStyle}`}>
            <h2 className={titleStyle}>{t.reviews}</h2>
            {rating && (
              <p className="mb-3">
                <strong className="text-lg">{formatNumber.format(rating.score)}/5</strong>
                {' · '}{formatNumber.format(rating.count)} · Google Maps ·{' '}
                <a href={rating.source} className={linkStyle}>{rating.publisher}</a>
                {' · '}<time dateTime="2026-11-23">2026-11-23</time>
              </p>
            )}
            <p className="text-[var(--text-secondary)]">{t.reviewsText}</p>
            <a href={map} className={`mt-3 inline-block ${linkStyle}`}>{t.map}</a>
          </section>

          <section className={panelStyle}>
            <h2 className={titleStyle}>{practical.guide}</h2>
            <address lang="bg" dir="ltr" className="text-start not-italic">{place.address}</address>
            <div className="mt-3 flex flex-wrap gap-4">
              <a href={map} className={linkStyle}>{t.map}</a>
              <a href={directions} className={linkStyle}>{labels.directions}</a>
            </div>
          </section>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]">
            <a href={source} className={linkStyle}>{t.source}</a>
            {place.access === 'pomMuseum' && (
              <a href="https://www.pomorie.bg/polezno/muzeyni-obekti/" className={linkStyle}>{t.hours}</a>
            )}
            {photo && (
              <span>
                <a href={commonsPage} className={linkStyle}>{t.photo}</a>
                {' · '}{photo.author}{' · '}
                {photo.licenseUrl ? <a href={photo.licenseUrl} className={linkStyle}>{photo.license}</a> : photo.license}
                {' · WebP'}
              </span>
            )}
            {!photo && <a href={source + '#page=10'} className={linkStyle}>{t.photo}</a>}
          </div>

          <section>
            <h2 className={titleStyle}>{t.related}</h2>
            <NearbyCards places={related} locale={locale} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
