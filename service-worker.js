// importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js")

var dataCacheName = 'Hackathon App v-3';
var cacheName = "Hackathon OLX3";
var filesToCache = [
    './',
    './css/style.css',
    './pages/index.html',
    './pages/logIn.html',
    './pages/animal.html',
    './pages/bike.html',
    './pages/book.html',
    './pages/business.html',
    './pages/detail.html',
    './pages/electronic.html',
    './pages/fashion.html',
    './pages/favorite.html',
    './pages/signup.html',
    './pages/furniture.html',
    './pages/job.html',
    './pages/kids.html',
    './pages/mobile.html',
    './pages/myPost.html',
    './pages/posting.html',
    './pages/rent-property.html',
    './pages/sale-property.html',
    './pages/search-anything.html',
    './pages/service.html',
    './pages/vehicle.html',
    './manifest.json',
    './bootstrap-3.3.7/css/bootstrap-sweetalert.min.css',
    './bootstrap-3.3.7/css/bootstrap.min.css',
    './bootstrap-3.3.7/js/bootstrap-sweetalert.min.js',
    './bootstrap-3.3.7/js/bootstrap.min.js',
    './bootstrap-3.3.7/js/jquery.min.js',
    './images/icons/animal.jpg',
    './images/icons/bike.png',
    './images/icons/book.jpg',
    './images/icons/business.jpg',
    './images/icons/electronic.png',
    './images/icons/furniture.png',
    './images/icons/job.png',
    './images/icons/kid.jpg',
    './images/icons/login.jpg',
    './images/icons/mobile.png',
    './images/icons/OLX-Logo.jpg',
    './images/icons/prop-rent.png',
    './images/icons/prop-sale.png',
    './images/icons/service.png',
    './images/icons/signup.png',
    './images/icons/vehicle.png',
    './scripts/app.js'
];


self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    console.log(/*keys, */keyList, '****', cacheName, key !== cacheName)
                    console.log(key);
                    if (key !== cacheName /* && key !== dataCacheName */) {
                        console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key)
                    }
                }));
            })
    );
    return self.clients.claim();
});



self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    //   var dataUrl = 'https://hackathon-project-784cd.firebaseio.com';
    //   if (e.request.url.indexOf(dataUrl) > -1) {
    //       console.log()
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    //     e.respondWith(
    //       caches.open(dataCacheName).then(function(cache) {
    //         return fetch(e.request).then(function(response){
    //           cache.put(e.request.url, response.clone());
    //           return response;
    //         });
    //       })
    //     );
    //   } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
        caches.match(e.request).then(function (response) {
            console.log(response);
            console.log(e.fetch);
            return response || fetch(e.request);
        })
    );
    //   }
});