import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-8 text-center text-sm text-[var(--text-secondary)]">
      <div className="mx-auto max-w-3xl space-y-2">
        <p>{t('rights')}</p>
        <p>{t('disclaimer')}</p>
      </div>
    </footer>
  );
}
