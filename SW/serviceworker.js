var urls = ['css/normalize.css', 'css/skeleton.css', 'search.js'],
    cache = caches.open("myAppCache");

self.addEventListener("install", function(event) {
    console.log("The SW is now installed"); 
    event.waitUntil(cache.then(function(cache) {
        return cache.addAll(urls);
    }));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                var fetchPromise = fetch(event.request).then(
                    function(networkResponse) {
                        cache.then(
                          function(_cache){
                            _cache.put(event.request.url, networkResponse.clone());
                          }
                        );
                        return networkResponse;
                    });
                // We use the currently cached version if it's there
                return response || fetchPromise;
            })
        );
    });

self.addEventListener('activate', function(event) {
 
  // Array of cache that we will use in this version
  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deletes the cache because we won't use it here
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});