const CACHE_NAME = 'bite-burn-offline-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/animations.css',
    '/js/utils.js',
    '/js/components.js',
    '/pages/achievements.html',
    '/pages/analyzing.html',
    '/pages/daily-routine.html',
    '/pages/dashboard.html',
    '/pages/food-planning.html',
    '/pages/planning.html',
    '/pages/signin.html',
    '/pages/signup.html',
    '/pages/workout.html',
    '/data/country-foods.js'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Handle local API requests or static assets
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return from cache if found
            if (response) {
                return response;
            }

            // Otherwise try to fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Cache the newly fetched asset
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // If both fail and it's an HTML request, we could show an offline page
                // For now, let the browser handle it
            });
        })
    );
});
