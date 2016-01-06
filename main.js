//'use strict';
window.GoogleSamples = window.GoogleSamples || {};
window.GoogleSamples.Config = window.GoogleSamples.Config || {
  gcmAPIKey: 'AIzaSyDe1KoSutUC8f-jqyjMERtjPxWOafB42rQ'
};

var gcm_sender_id = '754998415133';
var API_KEY = window.GoogleSamples.Config.gcmAPIKey;
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

var curlCommandDiv = document.querySelector('.js-curl-command');

var l = document.createElement('link');
l.rel = "manifest";
l.href = "manifest.json";
document.head.appendChild(l);

//var isPushEnabled = false;

// This method handles the removal of subscriptionId
// in Chrome 44 by concatenating the subscription Id
// to the subscription endpoint
function endpointWorkaround(pushSubscription) {
  // Make sure we only mess with GCM
  if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
    return pushSubscription.endpoint;
  }

  var mergedEndpoint = pushSubscription.endpoint;
  // Chrome 42 + 43 will not have the subscriptionId attached
  // to the endpoint.
  if (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
    // Handle version 42 where you have separate subId and Endpoint
    mergedEndpoint = pushSubscription.endpoint + '/' +
      pushSubscription.subscriptionId;
  }
  return mergedEndpoint;
}

function sendSubscriptionToServer(subscription) {
  // TODO: Send the subscription.endpoint
  // to your server and save it to send a
  // push message at a later date
  //
  // For compatibly of Chrome 43, get the endpoint via
  // endpointWorkaround(subscription)
  console.log('TODO: Implement sendSubscriptionToServer()');

  var mergedEndpoint = endpointWorkaround(subscription);

  // This is just for demo purposes / an easy to test by
  // generating the appropriate cURL command
  
  showCurlCommand(mergedEndpoint);
}

// NOTE: This code is only suitable for GCM endpoints,
// When another browser has a working version, alter
// this to send a PUSH request directly to the endpoint

function showCurlCommand(mergedEndpoint) {
  // The curl command to trigger a push message straight from GCM
  if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
      console.log('This browser isn\'t currently supported for this demo')
//    window.Demo.debug.log('This browser isn\'t currently ' +
//      'supported for this demo');
    return;
  }

  var endpointSections = mergedEndpoint.split('/');
  var subscriptionId = endpointSections[endpointSections.length - 1];

  var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
    '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
    ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
    console.log(subscriptionId);
     //curlCommandDiv.textContent = curlCommand;
//alert("happy");
//var x = new Date();
//var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
//console.log(currentTimeZoneOffsetInHours);
var browser = getBrowserDetails();
var timezone;
var country;
var city;

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var x = xhttp.responseText;
    console.log(x);
  }
};
    xhttp.withCredentials = "true";
  xhttp.open("GET", "http://freegeoip.net/json/", true); 
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();


//$.get("http://freegeoip.net/json/", function (response) {
//    console.log(response);
//            //console.log(JSON.stringify(response, null, 4));
//            country = JSON.stringify(response.country_code, null, 4);
//            city = JSON.stringify(response.city, null, 4);
//            timezone = JSON.stringify(response.time_zone, null, 4);
//            console.log(country.replace(/"/g,''));
//            console.log(city.replace(/"/g,''));
//            console.log(timezone.replace(/"/g,''));
//    
// $.ajax({
//  type: "POST",
//  url: "http://localhost/vengage/SubscribeUser/addSubscribers/",
//  data: { clientid: _veq['vengage.clientid'], source: _veq['vengage.source'], browser: browser, country: country.replace(/"/g,''), city: city.replace(/"/g,''), timezone: timezone.replace(/"/g,''), access_token: subscriptionId},
//  success: success
//  });
////$.ajax({
////  type: "POST",
////  url: "http://localhost/vengage/SubscribeUser/addSubscribers/",
////  data: { clientid: '1234567895',source:'1',browser: 'Chrome 48.0.2540.0' ,country: 'IN',city: 'New Delhi',timezone: 'Asia/Calcutta',
////      access_token: 'PA91bGN7FaBZORffHoWHMETtRgirciMLrqXs-xyoTugxZDAlL7nYt82toMQ0jyszz4ZyI2Uh2MsVb4FyD6pbjqF7wMTFZjk2ITy5rzeSKUxbg84kUd5Fp51kpQ6kYecm50Oxr2hrP0wmsXhzD_ANtgXb1y7lNziXUntbNmlgO9Da0-wrkF8grM'},
////  success: success
////  });
// }, "jsonp");
function success() {
  console.log( "second finished" );
}

 
}

function unsubscribe() {
//  var pushButton = document.querySelector('.js-push-button');
//  pushButton.disabled = true;
  curlCommandDiv.textContent = '';

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // To unsubscribe from push messaging, you need get the
    // subcription object, which you can call unsubscribe() on.
    serviceWorkerRegistration.pushManager.getSubscription().then(
      function(pushSubscription) {
        // Check we have a subscription to unsubscribe
        if (!pushSubscription) {
          // No subscription object, so set the state
          // to allow the user to subscribe to push
//          isPushEnabled = false;
//          pushButton.disabled = false;
//          pushButton.textContent = 'Enable Push Messages';
          return;
        }

        // TODO: Make a request to your server to remove
        // the users data from your data store so you
        // don't attempt to send them push messages anymore

        // We have a subcription, so call unsubscribe on it
        pushSubscription.unsubscribe().then(function(successful) {
//          pushButton.disabled = false;
//          pushButton.textContent = 'Enable Push Messages';
//          isPushEnabled = false;
        }).catch(function(e) {
          // We failed to unsubscribe, this can lead to
          // an unusual state, so may be best to remove
          // the subscription id from your data store and
          // inform the user that you disabled push
          console.log('Unsubscription error: ', e);
          //window.Demo.debug.log('Unsubscription error: ', e);
         // pushButton.disabled = false;
        });
      }).catch(function(e) {
          console.log('Error thrown while unsubscribing from ' +
          'push messaging.', e);
//        window.Demo.debug.log('Error thrown while unsubscribing from ' +
//          'push messaging.', e);
      });
  });
}

function subscribe() {
  // Disable the button so it can't be changed while
  // we process the permission request
//  var pushButton = document.querySelector('.js-push-button');
//  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {
        // The subscription was successful
//        isPushEnabled = true;
//        pushButton.textContent = 'Disable Push Messages';
//        pushButton.disabled = false;

        // TODO: Send the subscription subscription.endpoint
        // to your server and save it to send a push message
        // at a later date
        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          //window.Demo.debug.log('Permission for Notifications was denied');
          //pushButton.disabled = true;
          console.log('Permission for Notifications was denied');
        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          //window.Demo.debug.log('Unable to subscribe to push.', e);
          console.log('Unable to subscribe to push.', e);
//          pushButton.disabled = false;
//          pushButton.textContent = 'Enable Push Messages';
        }
      });
  });
}

// Once the service worker is registered set the initial state
function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.log('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.log('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.log('Push messaging isn\'t supported.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.
//        var pushButton = document.querySelector('.js-push-button');
//        pushButton.disabled = false;

        if (!subscription) {
          // We aren’t subscribed to push, so set UI
          // to allow the user to enable push
          return;
        }

        // Keep your server in sync with the latest subscription
        sendSubscriptionToServer(subscription);

        // Set your UI to show they have subscribed for
        // push messages
//        pushButton.textContent = 'Disable Push Messages';
//        isPushEnabled = true;
      })
      .catch(function(err) {
        console.log('Error during getSubscription()', err);
      });
  });
}

window.addEventListener('load', function() {
//  var pushButton = document.querySelector('.js-push-button');
//  pushButton.addEventListener('click', function() {
//    if (isPushEnabled) {
//      unsubscribe();
//    } else {
      subscribe();
//    }
//  });
//alert(1);
  // Check that service workers are supported, if so, progressively
  // enhance and add push messaging support, otherwise continue without it.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(initialiseState);
  } else {
    console.log('Service workers aren\'t supported in this browser.');
  }
});

function getBrowserDetails(){
    var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;
      // In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
   browserName = "Opera";
   fullVersion = nAgt.substring(verOffset+6);
   if ((verOffset=nAgt.indexOf("Version"))!=-1) 
     fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
   browserName = "Microsoft Internet Explorer";
   fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
   browserName = "Chrome";
   fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
   browserName = "Safari";
   fullVersion = nAgt.substring(verOffset+7);
   if ((verOffset=nAgt.indexOf("Version"))!=-1) 
     fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
    browserName = nAgt.substring(nameOffset,verOffset);
    fullVersion = nAgt.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
       browserName = navigator.appName;
    }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
    fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
    fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
    fullVersion  = ''+parseFloat(navigator.appVersion); 
    majorVersion = parseInt(navigator.appVersion,10);
}

var browserdetails = browserName+' '+fullVersion;

return browserdetails;

//document.write(''
//                +'Browser name  = '+browserName+'<br>'
//                +'Full version  = '+fullVersion+'<br>'
//                +'Major version = '+majorVersion+'<br>'
//                +'navigator.appName = '+navigator.appName+'<br>'
//                +'navigator.userAgent = '+navigator.userAgent+'<br>');
}
