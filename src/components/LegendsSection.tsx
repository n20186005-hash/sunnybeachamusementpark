import { useTranslations, useMessages } from 'next-intl';

export default function LegendsSection() {
  const t = useTranslations('legends');
  const messages = useMessages() as any;
  const items = (messages?.legends?.items || []) as Array<{
    kind: string;
    title: string;
    text: string;
  }>;

  return (
    <section id="legends" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t('overview')}
        </p>

        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {t(`kindBadges.${item.kind}` as any) || item.kind}
                </span>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
