import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;

  const officialLinks = t.raw('officialLinks') || {};

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {t('brandName')}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('brandSubtitle')}
              </p>
            </div>
            <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('officialResourcesTitle')}
            </h3>
            <div className="flex flex-col gap-2">
              <a href="https://www.tourism.government.bg/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bgTourism || 'Ministry of Tourism of Bulgaria'}
              </a>
              <a href="https://www.bulgariatravel.org/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bgTourismPortal || 'Bulgaria Official Tourism Portal'}
              </a>
              <a href="https://mc.government.bg/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bgCulture || 'Ministry of Culture of Bulgaria'}
              </a>
              <a href="http://ninkn.bg/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bgHeritage || 'National Institute of Immovable Cultural Heritage'}
              </a>
              <a href="http://bs.government.bg/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bsGovernment || 'Burgas Province Government'}
              </a>
              <a href="https://www.mfa.bg/en/services-travel/consular-services/travel-bulgaria/visa-bulgaria" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.bgForeignMinistry || 'Ministry of Foreign Affairs Consular Services'}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('editorialNote')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageCopyright')}</p>
          <p className="text-xs">{t('lastUpdated')}</p>
        </div>
      </div>
    </footer>
  );
}
