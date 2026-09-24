import { getTranslations } from 'next-intl/server';
import { getWeather, buildAdvice, isRainCode, type WmoLang } from '@/lib/weather';

function WeatherGlyph({ code }: { code: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (code === 0) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
      </svg>
    );
  }
  if (code === 1 || code === 2) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <circle cx="8" cy="8" r="3" />
        <path d="M8 2v1M3 8H2M13 8h1" />
        <path d="M7 19h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 19z" />
      </svg>
    );
  }
  if (code === 3) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <path d="M7 18h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 18z" />
        <path d="M7 14h10a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 14z" opacity="0.6" />
      </svg>
    );
  }
  if (code === 45 || code === 48) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <path d="M4 12h12M6 8h12M8 16h8" opacity="0.7" />
        <path d="M7 18h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 18z" />
      </svg>
    );
  }
  if (isRainCode(code)) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <path d="M7 14h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 14z" />
        <path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2" />
      </svg>
    );
  }
  if (code >= 71 && code <= 77) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
        <path d="M7 14h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 14z" />
        <path d="M8 18h.5M12 18h.5M16 18h.5M10 20h.5M14 20h.5" />
      </svg>
    );
  }
  // 95, 96, 99 — thunderstorm
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" {...common}>
      <path d="M7 14h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 14z" />
      <path d="M13 15l-3 4h3l-2 4" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

export default async function WeatherSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'weather' });
  const lang = (['en', 'bg', 'zh', 'he', 'ro'].includes(locale) ? locale : 'en') as WmoLang;
  const data = await getWeather(lang);

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {!data ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>{t('unavailable')}</p>
          </div>
        ) : (
          <>
            {/* Current conditions */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-4" style={{ color: 'var(--accent)' }}>
                <WeatherGlyph code={data.current.code} />
                <div>
                  <div className="font-display text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {data.current.tempC}°
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {data.current.description}
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <Stat label={t('feelsLike')} value={`${data.current.feelsLikeC}°`} />
                <Stat label={t('humidity')} value={`${data.current.humidity}%`} />
                <Stat
                  label={t('wind')}
                  value={`${data.current.windKmh} km/h`}
                />
                <Stat label={t('precip')} value={`${data.current.precipProb}%`} />
              </div>
            </div>

            {/* Plain-language hint */}
            {data.current.isRainy && (
              <div
                className="rounded-xl p-4 mb-6 flex items-center gap-3"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 14h9a3 3 0 0 0 0-6 4 4 0 0 0-7.5-1A3.5 3.5 0 0 0 7 14z" />
                  <path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2" />
                </svg>
                <span className="text-sm font-medium">{t('rainHint')}</span>
              </div>
            )}

            {/* Practical advice */}
            <div className="flex flex-wrap gap-2 mb-10">
              {buildAdvice(data, lang).map((tip, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {tip}
                </span>
              ))}
            </div>

            {/* 7-day forecast */}
            <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('forecast7')}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
              {data.daily.map((d, i) => (
                <div
                  key={d.date}
                  className="rounded-xl p-3 flex flex-col items-center gap-1 text-center"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {i === 0 ? t('today') : d.weekday}
                  </span>
                  <div style={{ color: 'var(--accent)' }}>
                    <WeatherGlyph code={d.code} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {d.tmax}°
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {d.tmin}°
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {t('precip')} {d.precipProb}%
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              {t('updated')}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
