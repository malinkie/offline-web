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
    