// Service worker pre admin appku - vyzaduje ho PWABuilder na zabalenie do APK.
const CACHE = 'eyerim-admin-v1';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  // Admin appka potrebuje vzdy zive data - necachujeme volania na server
  if (e.request.url.indexOf('script.google.com') !== -1) return;
  e.respondWith(
    fetch(e.request).catch(function () { return caches.match(e.request); })
  );
});
