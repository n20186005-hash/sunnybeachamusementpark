import type { ReactNode } from 'react';

export default function NearbyHero({ image, children }: { image: string; children: ReactNode }) {
  return (
    <section className="relative isolate flex min-h-[min(32rem,78svh)] items-end overflow-hidden bg-water-900 pb-10 pt-24 text-white sm:pb-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10" style={{ background: 'var(--hero-overlay)' }} />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
