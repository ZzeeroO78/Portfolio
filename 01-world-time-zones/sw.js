/**
 * Service Worker for World Time Zones App
 * Enables offline functionality and caching strategies
 * Version: 2.1
 */

const CACHE_NAME = 'world-time-zones-v2.1';
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css?v=2.0',
    '/script.js?v=2.1',
    '/manifest.json'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache opened');
            return cache.addAll(STATIC_FILES).catch(err => {
                console.log('Cache addAll error:', err);
                // Don't fail install if some resources aren't available
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if available
            if (response) {
                // Update cache in background
                fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                }).catch(() => {
                    // Network failed, use cached response
                });
                return response;
            }

            // Otherwise fetch from network
            return fetch(event.request).then(networkResponse => {
                // Don't cache if not a success response
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                // Cache successful responses
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Network failed and not in cache - return offline page if available
                return caches.match('/index.html');
            });
        })
    );
});

// Handle messages from clients
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded - version 2.1');
