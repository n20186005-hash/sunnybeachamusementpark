import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sunny Beach Amusement Park – Visitor Guide',
    short_name: 'Sunny Beach Park',
    description:
      'Visitor guide to Sunny Beach Amusement Park (Лунапарк Слънчев бряг) in Sunny Beach, Burgas Province, Bulgaria.',
    start_url: '/bg',
    scope: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#234d5c',
    lang: 'bg',
    categories: ['travel', 'entertainment'],
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      {
        src: '/gallery/sunny-beach-amusement-park-1.jpg',
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
