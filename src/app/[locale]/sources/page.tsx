import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { nearbyMetadata } from '@/content/nearby';
import Footer from '@/components/Footer';
import SourcesSection from '@/components/SourcesSection';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sources' });
  return { title: t('title'), description: t('subtitle'), alternates: nearbyMetadata('/sources', locale) };
}

export default async function SourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sources');
  const nav = await getTranslations('header');
  const links = ['privacy-policy', 'terms-of-service', 'cookie-settings'] as const;

  return (
    <>
      <main className="mx-auto max-w-5xl space-y-8 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <a href={`/${locale}`} className="inline-block text-sm font-medium text-[var(--accent)] underline underline-offset-4">{nav('backToHome')}</a>
        <SourcesSection />
        <section id="editorial" className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
          <h2 className="mb-2 font-display text-xl font-semibold">{t('editorialTitle')}</h2>
          <p>{t('editorialNote')}</p>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">{t('lastUpdated')}</p>
        </section>
        <section id="image-rights" className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
          <h2 className="mb-2 font-display text-xl font-semibold">{t('imageTitle')}</h2>
          <p>{t('imageCopyright')}</p>
        </section>
        <section id="policies">
          <h2 className="mb-3 font-display text-xl font-semibold">{t('policiesTitle')}</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => <li key={link}><a href={`/${locale}/${link}`} className="text-[var(--accent)] underline underline-offset-4">{t(link)}</a></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
