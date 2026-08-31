import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

const facilityIcons: Record<string, ReactNode> = {
  toilets: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 2v20M20 2v20" />
      <path d="M4 6h16M4 18h16" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  parking: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 16V8h3a3 3 0 0 1 0 6h-3" />
    </svg>
  ),
  dining: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2v20M6 2c-2 3 2 6 0 9M12 2c0 4 3 5 3 9v11M12 2h3" />
    </svg>
  ),
  lodging: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
      <path d="M2 20h20" />
      <path d="M6 10h4M6 14h4" />
    </svg>
  ),
  shopping: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 7h12l-1.5 13.5a1 1 0 0 1-1 .5h-7a1 1 0 0 1-1-.5L6 7z" />
      <path d="M9 7V6a3 3 0 0 1 6 0v1" />
    </svg>
  ),
  fuel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M13 9h3l2 3v8a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-7" />
      <path d="M7 5h4M7 10h4" />
      <path d="M3 21h10" />
    </svg>
  ),
};

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    type: string;
    title: string;
    description: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p
          className="text-sm text-center mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.type}
              className="rounded-xl p-6 flex flex-col gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {facilityIcons[item.type]}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
