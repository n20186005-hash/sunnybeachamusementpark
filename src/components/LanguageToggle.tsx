'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, routing } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';

const labels: Record<string, string> = {
  zh: '中文',
  en: 'English',
  bg: 'Български',
  he: 'עברית',
  ro: 'Română',
};

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations('header');
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const href = pathname === '/nearby/[slug]'
    ? { pathname, params: { slug: params.slug! } }
    : { pathname };

  return (
    <div ref={ref} className="relative" onKeyDown={(event) => {
      if (open && event.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        style={{
          background: 'var(--tag-bg)',
          color: 'var(--tag-text)',
        }}
        aria-label={t('language')}
        aria-expanded={open}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        {labels[locale]}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <div
        hidden={!open}
        className="absolute end-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-50"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
      >
        {routing.locales.map((loc) => (
          <Link
            key={loc}
            href={href}
            locale={loc}
            hrefLang={loc}
            aria-current={loc === locale ? 'true' : undefined}
            onClick={() => setOpen(false)}
            className="block w-full text-start px-4 py-2.5 text-sm transition-colors"
            style={{
              color: loc === locale ? 'var(--accent)' : 'var(--text-primary)',
              fontWeight: loc === locale ? 600 : 400,
              background: 'transparent',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {labels[loc]}
          </Link>
        ))}
      </div>
    </div>
  );
}
