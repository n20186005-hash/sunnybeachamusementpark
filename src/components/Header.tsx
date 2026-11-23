'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { nearbyLabels } from '@/content/nearby-labels';
import type { Locale } from '@/i18n/routing';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const sections = ['history', 'faq', 'facilities', 'gallery', 'reviews', 'map'] as const;

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const nearby = pathname.startsWith('/nearby');
  const onPhoto = pathname === '/' || nearby;
  const solid = scrolled || !onPhoto;
  const logoHref = `/${locale}`;
  const linkClass = 'inline-flex min-h-10 items-center rounded-md px-2 text-sm font-medium hover:underline underline-offset-4 focus-visible:outline-2';

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const links = [
    ...sections.map((section) => ({ href: `${logoHref}#${section}`, label: t(section), current: undefined })),
    { href: `${logoHref}/nearby`, label: nearbyLabels(locale).nearby, current: nearby ? 'location' as const : undefined },
    { href: `${logoHref}/sources`, label: t('sources'), current: pathname === '/sources' ? 'page' as const : undefined },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: solid ? 'var(--bg-secondary)' : 'linear-gradient(to bottom, rgba(10, 25, 22, .78), rgba(10, 25, 22, .25))',
        color: solid ? 'var(--text-primary)' : '#fff',
        borderBottom: solid ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <a href={logoHref} className="min-w-0 font-display text-sm font-semibold leading-tight sm:text-lg">
          {t('brand')}
        </a>
        <nav aria-label={t('navigation')} className="hidden shrink-0 items-center xl:flex">
          {links.map(({ href, label, current }) => (
            <a key={href} href={href} aria-current={current} className={`${linkClass} whitespace-nowrap aria-current:underline`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <details ref={menu} className="xl:hidden" onKeyDown={(event) => {
            if (event.key === 'Escape' && menu.current?.open) {
              menu.current.open = false;
              menu.current.querySelector('summary')?.focus();
            }
          }}>
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-md [&::-webkit-details-marker]:hidden" aria-label={t('navigation')}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </summary>
            <nav aria-label={t('navigation')} className="absolute inset-x-3 top-full mt-1 grid grid-cols-2 gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-2 text-[var(--text-primary)] shadow-lg sm:inset-s-auto sm:w-80">
              {links.map(({ href, label, current }) => (
                <a key={href} href={href} aria-current={current} className={`${linkClass} aria-current:underline`} onClick={() => {
                  if (menu.current) menu.current.open = false;
                }}>{label}</a>
              ))}
            </nav>
          </details>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
