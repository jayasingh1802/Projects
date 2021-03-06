<!doctype html>
<!--
Copyright 2014 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<html lang="en">
  <head>
<!--    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="description" content="Sample illustrating the use of Push Messaing and Notifications.">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Push Messaging &amp; Notifications</title>

     Add to homescreen for Chrome on Android 
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="192x192" href="/pushmessage/images/touch/chrome-touch-icon-192x192.png">

     Add to homescreen for Safari on iOS 
    <meta name="apple-mobile-web-app-title" content="Push Messaging and Notifications Sample">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon-precomposed" href="/pushmessage/images/apple-touch-icon-precomposed.png">

     Tile icon for Win8 (144x144 + tile color) 
    <meta name="msapplication-TileImage" content="/pushmessage/images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#3372DF">

    <link rel="icon" href="/pushmessage/images/favicon.ico">-->

    <!-- Include manifest file in the page -->
<!--    <link rel="manifest" href="manifest.json">-->
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    
  </head>

  <body>
<!--    <h1>Push Messaging &amp; Notifications</h1>-->

<!--    <p>Available in <a href="http://www.chromestatus.com/feature/5416033485586432">Chrome 42+</a> &amp; <a href="http://www.chromestatus.com/feature/5480344312610816">Chrome 42+</a></p>

    <p>To use this sample please do the following:</p>

    <ol>
      <li>Create a project in the <a href="http://console.developers.google.com"  target="_blank">Google Developer Console</a>.</li>
      <li>Under APIs enable Google Cloud Messaging for Android and Google Cloud Messaging for Chrome.</li>
      <li>Under Credentials, create a new key and select Server key as the type.</li>
      <li>Create a copy of [config.sample.js](config.sample.js) called config.js</li>
      <li>Create a copy of [manifest.sample.json](manifest.sample.json) called manifest.json</li>
      <li>Replace "&lt;Your Public API Key ...&gt;" in your new `config.js` file with your own API key from the Google Developer Console project.</li>
      <li>Replace "&lt;Your Project Number ...&gt;" in your new `manifest.json` with your own project number from the Google Developer Console project.</li>
    </ol>-->


<!--    <p>
        <button class="js-push-button" disabled>
          Enable Push Messages
        </button>
    </p>-->

    <br />
    <br />

    <h2>cURL Command to Send Push</h2>
    <div id="1234" class="js-curl-command"></div>


<script src="jstz.min.js"></script>
    <script src="config.js"></script>
    <script src="demo.js"></script>
    <script src="main.js"></script>
    <script>
      /* jshint ignore:start */
     
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-53563471-1', 'auto');
      ga('send', 'pageview');
      /* jshint ignore:end */
    </script>
    <!-- Built with love using Web Starter Kit -->
  </body>
</html>
