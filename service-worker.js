//'use strict';
var API_ENDPOINT = 'https://android.googleapis.com/gcm/send';
var Update_API = 'http://localhost/vengage/SubscribeUser/updatenotification_Status/';

self.addEventListener('activate', function(event) {
    
  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  console.log(1);
  event.waitUntil(          
    caches.keys().then(function(cacheNames) {console.log(2);
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
                
      );
    })
  );
  console.log('update');
});

function showNotification(title, body, icon, data) {
  var notificationOptions = {
    body: body,
    icon: icon ? icon : 'images/touch/chrome-touch-icon-192x192.png',
    tag: 'simple-push-demo-notification',
    data: data
    
  };  
  self.registration.showNotification(title, notificationOptions);
  return;
}




self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  console.log(_veq['vengage.source']);
  // Since this is no payload data with the first version
  // of Push notifications, here we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch(API_ENDPOINT).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }
    
      return response.json().then(function(data) {
        var title = data.title;;
        var message = data.message;
        var icon = data.imgurl;
        var tag = { 
            sucriberid: data.subid,
            notificationid: data.notid,
            hiturl: data.url
        }    
       
        return showNotification(title, message, icon, tag);
          
      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this push message';
        var icon = 'images/notification-icon.png';
        var tag = { 
            sucriberid: '1234',
            notificationid: '5678',
            hiturl: 'http://www.google.com'
        }

      return showNotification(title, message,icon,tag);
    })
  );
});


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event);
    console.log('On notification click: ', event.notification.onclose);
  console.log('On notification click: ', event.notification.data.sucriberid);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)          
        return client.focus();
    }
    if (clients.openWindow)
        console.log('openWindow----------------');               
        console.log('testing..................');
        return clients.openWindow(Update_API+event.notification.data.subid+'/'+event.notification.data.notid+'/'+event.notification.data.url);
      
  }));

});




