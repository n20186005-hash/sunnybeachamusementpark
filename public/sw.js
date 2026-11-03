/* Sunny Beach Amusement Park - Service Worker */
const CACHE = 'sunny-beach-park-v2';
const PRECACHE = ['/bg', '/icons/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Never return a cached HTML document for a JS, CSS, image, or data request.
  // Let the browser handle those resources through the network normally.
  if (request.mode !== 'navigate' || request.method !== 'GET') return;

  event.respondWith(
    fetch(request).catch(async () => {
      const fallback = await caches.match('/bg');
      return fallback || Response.error();
    })
  );
});
