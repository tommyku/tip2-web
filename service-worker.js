var cacheName, filesToCache;

cacheName = 'tip2-1';

filesToCache = ['/', 'index.html', 'lib/material-design-lite/material.min.css', 'lib/material-design-lite/material.min.js', 'lib/clipboard/dist/clipboard.min.js', 'lib/angular/angular.min.js', 'lib/angularfire/dist/angularfire.min.js', 'lib/moment/min/moment.min.js', 'lib/firebase/firebase.js', 'css/app.css', 'js/app.js'];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  return e.waitUntil(caches.open(cacheName).then(function(cache) {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  return e.respondWith(caches.match(e.request).then(function(response) {
    return response || fetch(e.request);
  }));
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  return e.waitUntil(caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches["delete"](key);
      }
    }));
  }));
});
