cacheName = 'tip2-1'
filesToCache = [
  '/'
  'index.html'
  'lib/material-design-lite/material.min.css'
  'lib/material-design-lite/material.min.js'
  'lib/clipboard/dist/clipboard.min.js'
  'lib/angular/angular.min.js'
  'lib/angularfire/dist/angularfire.min.js'
  'lib/moment/min/moment.min.js'
  'lib/firebase/firebase.js'
  'css/app.css'
  'js/app.js'
]

self.addEventListener 'install', (e)->
  console.log('[ServiceWorker] Install')
  e.waitUntil(caches
    .open(cacheName)
    .then (cache)->
      console.log('[ServiceWorker] Caching app shell')
      cache.addAll(filesToCache)
  )

self.addEventListener 'fetch', (e)->
  console.log '[ServiceWorker] Fetch', e.request.url
  e.respondWith(caches
    .match e.request
    .then (response)->
      return response || fetch(e.request)
  )

self.addEventListener 'activate', (e)->
  console.log '[ServiceWorker] Activate'
  e.waitUntil(caches.keys()
    .then (keyList)->
      Promise.all keyList.map (key)->
        if key != cacheName
          console.log '[ServiceWorker] Removing old cache', key
          caches.delete key
  )
