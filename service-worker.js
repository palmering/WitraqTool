// WitraqTool Service Worker (refactored)
const CACHE_NAME = "witraq-cache-v2";
const urlsToCache = [
  "/WitraqTool/",
  "/WitraqTool/index.html",
  "/WitraqTool/manifest.json",
  "/WitraqTool/icons/icon-192.png",
  "/WitraqTool/icons/icon-512.png",
  "/WitraqTool/offline.html" // optional offline page
];

// Install: cache core files
self.addEventListener("install", event => {
  self.skipWaiting(); // activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate: remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch: serve cached files, fallback to offline.html if needed
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/WitraqTool/offline.html");
      });
    })
  );
});

