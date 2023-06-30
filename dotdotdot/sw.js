
addEventListener('install', ev => {
  ev.waitUntil(
    caches.open('cache')
      .then(cache => cache.addAll([ './', 'icon.png', 'manifest.json' ]))
      .then(skipWaiting())
  );
});

addEventListener('activate', ev => {
  ev.waitUntil(clients.claim());
});

addEventListener('fetch', ev => {
  if (ev.request.url.startsWith(location.origin)) {
    ev.respondWith(
      caches.match(ev.request)
        .then(response => response || fetch(ev.request))
    );
  }
});