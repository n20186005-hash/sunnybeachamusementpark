import { useTranslations, useMessages } from 'next-intl';

export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const timeline = (messages?.history?.timeline || []) as Array<{
    period: string;
    title: string;
    description: string;
  }>;

  return (
    <section id="history" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
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

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{ background: 'var(--border-color)' }}
          />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-4 pl-4">
                {/* Timeline dot */}
                <div
                  className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    background: 'var(--accent)',
                    borderColor: 'var(--accent)',
                    top: '0.25rem',
                  }}
                />

                {/* Step number */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl p-5"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full mb-2"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    {item.period}
                  </span>
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
      </div>
    </section>
  );
}
