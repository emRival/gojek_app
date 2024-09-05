'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "b4528d8d38c2aba03e19ae010931adf4",
"version.json": "88be16a2e0cd3f74c86bb400974d6e5c",
"index.html": "c27e10661daac547eb039dfe30d16468",
"/": "c27e10661daac547eb039dfe30d16468",
"main.dart.js": "50c02c1bc29c0f966849779e0546fdbd",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "8f07913897591dfc6b4a47597f172e75",
"assets/AssetManifest.json": "bb09c16085d1064d12f86af8c8b5eb16",
"assets/NOTICES": "ece31674fa091946fa47e91425bb114a",
"assets/FontManifest.json": "9ac29c7ac006174ace5e3c3499d79bd4",
"assets/AssetManifest.bin.json": "e96268fee737223dde75057363a6b447",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "de463a6371540690416d18a284b0901e",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/images/gopay.png": "da0418fedc657823ac1f05ca490f9253",
"assets/assets/images/gopaylater.png": "8fe6c589cd844321377f87ece46bd895",
"assets/assets/images/avatar.png": "fb1f4f0d4980eb548c9732d04c4b68da",
"assets/assets/images/2.png": "2b09c1aa3786d23819819bf528c7558f",
"assets/assets/images/3.png": "f19fb9982456093efee794b283e407c1",
"assets/assets/images/1.png": "2af3692fa0be72fd528210a688347150",
"assets/assets/icons/search.svg": "3b3ce6678550363f4c465c3dfab92a27",
"assets/assets/icons/dots.svg": "7dd8ad4fd8c13d516557b09c32913b89",
"assets/assets/icons/goclub.svg": "9997895319b6e5c9e4219d7ae96cfb20",
"assets/assets/icons/gosend.svg": "9d7ad401eec87c7fdf1ee9734f630ff9",
"assets/assets/icons/goride.svg": "40ff0e5e7ee77defa78faa2a6c8e2bfb",
"assets/assets/icons/topup.svg": "ae04aeafa3c92a577ec76efb26b8d0db",
"assets/assets/icons/gopulsa.svg": "97335993b6c12a73a9f110bc7f90ac43",
"assets/assets/icons/gofood.svg": "a3da07f1237b868d975dec0dec52b7eb",
"assets/assets/icons/gocar.svg": "1cd0061d49e05312230ebc48612a3736",
"assets/assets/icons/explore.svg": "5d45807e6dd30fd0d1e5e97c465e69e4",
"assets/assets/icons/star.svg": "4301141888b5252c33d6c974ffae6bd9",
"assets/assets/icons/pay.svg": "0a14dec12e8dff24ead57ff7762101cc",
"assets/assets/icons/gomart.svg": "a7a6a0075ad994c0920d95cc6dcd2a84",
"assets/assets/icons/other.svg": "1cead21a5b289d55a4c58b5f80f54610",
"assets/assets/icons/left.svg": "f3469f07990ec9053e4bfc735e2faac2",
"assets/assets/fonts/SF-Pro-Display-Regular.otf": "40a930b468f7b22b3f7beff01e9d643b",
"assets/assets/fonts/SF-Pro-Display-Bold.otf": "dd3d50583e5255342370f2b6d7e7c03b",
"assets/assets/fonts/SF-Pro-Display-Semibold.otf": "e5cf1c00f1276551994c10ca0e733c4f",
"canvaskit/skwasm.js": "e95d3c5713624a52bf0509ccb24a6124",
"canvaskit/skwasm.js.symbols": "0b8baeff2b4484d2d6be67a7e082f9db",
"canvaskit/canvaskit.js.symbols": "9a39ab8aa3d828142935da9efe99b3a2",
"canvaskit/skwasm.wasm": "ee4afa1790abb925360fd9519c5194f7",
"canvaskit/chromium/canvaskit.js.symbols": "43ec75ce562f82c5dc5be1a738d87e37",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "3909da2fbccad1a2e4a1f42750d24977",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "afdcccf150b5cba228e27c813548b842",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
