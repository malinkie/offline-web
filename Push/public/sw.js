self.addEventListener("push", function(event) {  
    console.log("Received a push message", event);
    var icon = "/images/icon-192x192.png";  
    
    if (event.data) {
        // Payload data available, we notify directly
        event.waitUntil(self.registration.showNotification("Web Notifications", {  
                    body: "Data: " + event.data.json().text,  
                    icon: icon,  
                    tag: "push-message-tag"
                })
        );
    } else {
        // Payload not available, we download the notification
        event.waitUntil(
            fetch("message.txt").then(function(response) {
                return response.json().then(function(message) {
                    console.log(message);
                    return self.registration.showNotification("Web Notifications", {  
                        body: message.text,  
                        icon: icon,  
                        vibrate: [200, 100, 400],
                        tag: "push-message-tag"
                    }); 
                });
            }).catch(function(err) {
                console.log("Error fetching news");
                console.log(err);
                return self.registration.showNotification("Web Notifications", {  
                  body: "There is something new available",  
                  icon: icon,  
                  tag: "push-message-tag-error"  
                });  
            })                                 
        );  
    }
});