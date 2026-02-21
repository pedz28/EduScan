const CACHE_NAME = 'scanmaster-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html', // Fixed capitalization error from 'Index.html'
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
        return new Response('Offline Mode Active - Connect to internet to sync', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
