// Basic service worker for WitraqTool
const CACHE_NAME = "witraq-cache-v1";
const urlsToCache = [
  "/WitraqTool/",
  "/WitraqTool/index.html",
  "/WitraqTool/manifest.json",
  "/WitraqTool/icons/icon-192.png",
  "/WitraqTool/icons/icon-512.png"
];

// Install event: cache core files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached files when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
