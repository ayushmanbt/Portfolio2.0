---
title: How to Make a Progressive Web App
date: 2020-01-05
layout: default
slug: how-to-make-a-pwa
desc: Turning an app into a progressive web app helps you to have the app offline, as well as it let's the users to install the app as well
main_img: /progressive_web_app/thumbnail.png
tags: Progressive Web App, PWA, JavaScript, JS,
---

So, in yesterday's post I made a [bookmarking application](https://www.ayushmanbthakur.com/posts/bookmarker-with-localstorage), which used the localStorage of the browser to store bookmark app. But what happens if there is no internet connection? So, I hosted my app on GitHub and in the developers tools(ctrl + shift + i) in the network tab set the network to offline like this:

Which, you can see made the app go offline.

<video width="560" height="240" controls class="thumbnail">
<source src = "/progressive_web_app/offline_problem_01.mp4"> 
</video>

But does this app really need the offline feature to show all the list of your bookmarks? Absolutely not. So let's make this app to work offline with the progressive web app feature.

Technically, only having a service worker make our website offline, but making owr website a PWA has its perks like providing install features on android devices.

## Things required to make a PWA

So, to turn an ap into a PWA we need to tick a few check marks. There is an utility called lighthouse in chrome dev tools. There is a test for PWA there. The setup looks like this:

![](/progressive_web_app/lighthouse_test_setup.png)

After running the test in the Installable section, you will find the required things to turn your app into a PWA. So, according to that result, the things we require are.

1. **A Service Worker:** Service Worker is a javascript file which works on a different thread rather than the main javascript of the webpage. This service worker intercepts the requests going off the webpage to the server and responses coming from the server.

As service workers are such powerful, so having _https://_ is a must for sites with service worker to make that work. The only _http://_ URL allowed to use service worker is localhost. This is for testing purpose. But it will still show an error.

2. **manifest.json:** If you have ever worked on making a native app then you know that those apps require some unique info like _app_name_, _app_icon_, _theme_color_ etc. for the app. Manifest will be hosting all these information needed for our app.

## Creating and initializing the service worker

So, to start with I will create a _sw.js_ denoting a service worker. Now we need to register the service worker. It takes only a few lines of code. In the main script or in the HTML script tag we can have the service worker registered.

To start with we need to check if serviceWorker service is available in the browser, and if available, then we need to register the service worker to the navigator. This registration function takes in the path to the service worker and returns a promise. With that promise we can, on success console log the success and also can throw error.

This code looks like this:

```JS
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(sw => console.log("Service work registration successful"))
        .catch(err => console.log("Error"))
} else {
    console.log("Service Worker not supported!")
}
```

So, if everything goes right and we now have a look at our console, then we will see the message of "Service work registration successful.

![](/progressive_web_app/sw_registration_01.png)

Now, if we head to the Application and have a look at the Service Workers, we will be able to see the service worker:

![](/progressive_web_app/sw_registration_02.png)

So, we have successfully set up our service worker. Now the next step will to to tap out the requests to our server and cache those responses, so that if offline, we can still show the app.

## Caching the files

To create a cache storage, we need to code in sw.js. In this file there will be the logic, which will make our app to be able to render when offline.

So to start with, we need a name for the cache. Like the addEventListeners of the window object and the elements in the DOM, the serviceWorker also has an eventListener, which can listen to events like, install (fired when service worker is installed), fetch (when our web app sends a fetch request to the server) and can do stuff.

So, after installation we need to open the cache and cache our essential assets. Then, when the app makes fetch request to server, our service worker will intercept that and if the asset is in the cache then will return that in response. So, even if the app is offline we can render the app. The code looks like this:

```JS
const CACHE_NAME = "bookmark-app-cache"

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(
                [
                    '/',
                    'index.html',
                    'style.css',
                    'script.js'
                ]
            )
        })
    )
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
```

So, what the code says is that: the name of our cache is "bookmark-app-cache". So when _self_ i.e the service worker is installed then take this callback function which takes in the current event(_e_). Then we hold on the event with the _waitUntil()_ function. In that function we open up the cache which returns a promise, to which we chain with _.then_ which takes the _cache_ open and adds all of the assets. In this case these assets are: 'index.html','style.css' and 'script.js'. Here I also cached '/' so that if someone access the URL without the "index.html" in the URL, they can do so. Finally this function returns the response of the _cache.addAll()_ function.

So the cache just got created. Now on fetch event, in the callback function, we make the event to respond with a response. We match the request incoming with the request passed. Then we take the response and if there is any response in the cache, then it is returned. Otherwise, the fetch API is called to complete our request via server.

So, it is the high time to check how our app works offline:

<video width="560" height="240" controls class="thumbnail">
<source src = "/progressive_web_app/offline_test_01.mp4"> 
</video>

Now we need the _manifest.json_ to enhance the working of the app.

## Creating manifest.json

The few properties we need in the _manifest.json_ are:

1. **Name:** This will be the name of the app
2. **Short Name:** This is the name shown when the app is installed.
3. **icons:** This is a list of icons to be used when the app is installed. Icons of 192 x 192 and 512 x 512 are required.
4. **start_url:** This is the url to start the app on.
5. **background_color**
6. **theme_color**
7. **display:** This sets the display of the app when installed on mobile device.

Want to know more about manifest.json, read [here](https://developers.google.com/web/fundamentals/web-app-manifest)

So, my _manifest.json_ looks like this:

```JSON
{
    "short_name": "Bookmarks",
    "name": "Bookmark App",
    "icons": [{
            "src": "icon.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "iconx512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "start_url": "/",
    "background_color": "#000000",
    "theme_color": "#ffa500",
    "display": "standalone"
}
```

So, now it was the time to link this manifest.json to our app and set up a few properties, and run the app for one last time. The HTML tags added were:

```HTML
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#ffa500">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

These are three tags required to turn your app into a PWA. The first one connects the manifest.json to our page. The second one sets the theme color for our app. The last one sets the viewport size for the app.

So, the final app works like this:

<video width="560" height="240" controls class="thumbnail">
<source src = "/progressive_web_app/PWA_final_test.mp4"> 
</video>

## Conclusion

The app is finally converted into a PWA. You can see the final code [here](https://github.com/AyushmanBilasThakur/bookmark-app). If you want to try or install the app visit [this link](https://bookmark-app-abt.glitch.me/). So, GitHub was not letting me have the PWA activated, so I chose glitch to host my app. But there are many topics about PWA which I could not cover in this post. Some of these topics are:

1. Caching requests to API
2. Rendering different views based on if the app is offline or online
3. Manually prompting the users to install the app.

Comment your own version of the app down below. And today, I tried a new style of posting, hope you enjoyed it.
