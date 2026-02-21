const CACHE_NAME = 'scanmaster-pwa-v4'; // Bumped to v4 to clear persistent invalid URL caches!
const ASSETS_TO_CACHE = [
  './',
  './index.html', // Fixed casing: was previously Index.html which breaks on Github Pages
  'https://unpkg.com/vue@3/dist/vue.global.prod.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  // STRICT RULE: Never cache calls to the Google Apps Script backend database
  if (event.request.url.includes('script.google.com')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Optionally cache new resources here if desired
        return networkResponse;
      }).catch(() => {
        // If both cache and network fail (offline)
        return new Response('Offline Mode Active', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
