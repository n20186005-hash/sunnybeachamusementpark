'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function Itineraries() {
  const t = useTranslations('itineraries');
  const messages = useMessages() as any;
  const audiences = (messages?.itineraries?.audiences || []) as Array<{
    key: string;
    name: string;
    summary: string;
    steps: string[];
  }>;
  const general = (messages?.itineraries?.general || []) as Array<{
    key: string;
    name: string;
    summary: string;
    steps: string[];
  }>;

  return (
    <section id="itineraries" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-10 max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('overview')}
        </p>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('audienceTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {audiences.map((a) => (
            <div
              key={a.key}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {a.name}
              </h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {a.summary}
              </p>
              <ol className="space-y-2 list-decimal list-inside text-sm" style={{ color: 'var(--text-secondary)' }}>
                {a.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('generalTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {general.map((g) => (
            <div
              key={g.key}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {g.name}
              </h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {g.summary}
              </p>
              <ol className="space-y-2 list-decimal list-inside text-sm" style={{ color: 'var(--text-secondary)' }}>
                {g.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
