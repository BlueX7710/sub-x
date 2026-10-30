// Offline support: the page itself is fetched network-first (so updates arrive),
// everything else (icons, fonts, the smart-cube library) is served from cache and refreshed in the background.
// The page warms the cache after it loads (all fonts every look uses, and the smart-cube library), so
// Sub-X works fully offline after one visit. Paths are relative to this file, so it works in a sub-folder.
const CACHE = 'subx-v3';
const BASE = new URL('./', self.location).href;
const SHELL = ['', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'].map(p => BASE + p);
const CACHED_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin && !CACHED_HOSTS.includes(url.hostname)) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok && !res.redirected) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(BASE, copy)); }
        return res;
      }).catch(() => caches.match(BASE))
    );
    return;
  }

  e.respondWith(
    caches.match(req, { ignoreVary: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
