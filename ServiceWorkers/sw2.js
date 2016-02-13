var urls = ['XXXXXX', 'css/normalize.css', 'css/skeleton.css', 'search.js'];

self.addEventListener("install", function(event) {
    console.log("The SW is now installed"); 
    event.waitUntil(caches.open("myAppCache").then(function(cache) {
        return cache.addAll(urls);
    }));
});