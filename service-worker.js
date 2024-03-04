var cacheName = 'app-cache';
var filesToCache = [
    '/', 
    '/public/css/styles.css',
    '/public/css/bootstrap/assets/css/main.css',
    '/public/css/bootstrap/assets/css/variables.css',
    '/public/css/bootstrap/assets/img/home-page-landscape.jpg',
    '/public/css/bootstrap/assets/img/about-page-landscape.jpg',
    '/public/css/bootstrap/assets/vendor/bootstrap/css/bootstrap.min.css',
    '/public/css/bootstrap/assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '/public/css/bootstrap/assets/vendor/bootstrap-icons/bootstrap-icons.min.css',
    '/public/js/script.js'
];

// Start the service worker and cache all of the app's content
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});