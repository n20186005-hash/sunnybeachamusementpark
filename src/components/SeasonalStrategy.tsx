'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function SeasonalStrategy() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const cols = messages?.seasonal?.cols || {};
  const seasons = (messages?.seasonal?.seasons || []) as Array<{
    key: string;
    name: string;
    weather: string;
    sea: string;
    park: string;
    tip: string;
  }>;

  const rows: Array<{ key: string; label: string }> = [
    { key: 'weather', label: cols.weather || 'Weather' },
    { key: 'sea', label: cols.sea || 'Sea & coast' },
    { key: 'park', label: cols.park || 'At the park' },
    { key: 'tip', label: cols.tip || 'Tip' },
  ];

  return (
    <section id="season" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-8 max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('overview')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seasons.map((s) => (
            <div
              key={s.key}
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4 pb-3"
                style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
              >
                {s.name}
              </h3>
              <div className="space-y-3">
                {rows.map((r) => (
                  <div key={r.key} className="flex gap-3">
                    <span
                      className="flex-shrink-0 w-24 text-xs font-semibold uppercase tracking-wide pt-0.5"
                      style={{ color: 'var(--accent)' }}
                    >
                      {r.label}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {s[r.key as keyof typeof s] as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8 mt-8"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('wildlifeTitle')}
          </h3>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('wildlife')}
          </p>
        </div>
      </div>
    </section>
  );
}
