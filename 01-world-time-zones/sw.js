// Service Worker for offline support
const CACHE_NAME = 'world-time-v2.1';
const urlsToCache = [
  '/Portfolio/01-world-time-zones/',
  '/Portfolio/01-world-time-zones/index.html',
  '/Portfolio/01-world-time-zones/styles.css',
  '/Portfolio/01-world-time-zones/script.js',
  '/Portfolio/01-world-time-zones/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        return caches.match('/Portfolio/01-world-time-zones/index.html');
      })
  );
});

// Handle background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-cities') {
    event.waitUntil(syncCities());
  }
});

async function syncCities() {
  try {
    const response = await fetch('/api/cities');
    const data = await response.json();
    const cache = await caches.open(CACHE_NAME);
    await cache.put('/api/cities', new Response(JSON.stringify(data)));
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Handle push notifications
self.addEventListener('push', event => {
  if (!event.data) {
    return;
  }

  const options = {
    body: event.data.text(),
    icon: '/Portfolio/01-world-time-zones/data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23667eea" width="192" height="192"/><text x="50%" y="50%" font-size="120" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial">🌍</text></svg>',
    badge: '/Portfolio/01-world-time-zones/data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="45" fill="%23667eea"/></svg>'
  };

  event.waitUntil(
    self.registration.showNotification('World Time Zones', options)
  );
});