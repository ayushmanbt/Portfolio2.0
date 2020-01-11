---
title: Dumb Project - YouTube Video Watcher
date: 2020-01-11
layout: default
slug: youtube_video_watcher
desc: Do you get lost into the autoplay of YouTube videos. Well no more. Get your video playing on your own page.
main_img: /youtube_video_watcher/thumbnail.png
tags: HTML, CSS, HTML5, CSS3, JS, JavaScript
---

I had no idea what to do so I made a crap?🤔 For today's post I made a small web app which takes YouTube ID of a video and will display it in a huge area. So, without further adieu let's jump into making this app. But first of all let's have a look at the app.

![Look of the app](/youtube_video_watcher/how_does_the_app_look_01.png)

On the top we have a small form with a form which we will use to submit the id of a YouTube video. Then, once the video id is submitted, we get the video displayed. BTW if you are wondering what video is it, it is a video from Normalized Nerd , my college senior who does really awesome ML tutorials. You should totally watch [this video shown in the screenshot](https://www.youtube.com/watch?v=cIBqvy6adUY) or his [channel](https://www.youtube.com/channel/UC7Fs-Fdpe0I8GYg3lboEuXw).

If you wondering how to get the ID of a YouTube video, here it is:

![Look of the app](/youtube_video_watcher/the_video_id.png)

## The Markup

This is a really small app, so it has a little markup, a little style and also a really small bit of JavaScript. So let's start with the markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>YouTube Vid Player</title>
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <div class="fullFrame">
      <form action="" id="idform">
        <input type="text" id="id_input" placeholder="YouTube video id" />
        <input type="submit" value="watch" />
      </form>

      <div id="holder"></div>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

To start of with, in the head section I added the _link to the stylesheet_ and the _title_. After that, let's look into the body. Here I created the div with the class _fullFrame_. This div will be covering all of our elements. Inside the div, I placed the form with the id of _idForm_. This id will later help me to get the form in the JavaScript.

Inside the the form I put in the text box to submit the YouTube video ID. There is also a submit button.

After the form, there is a div with the id of _holder_ which will hold the YouTube video.

At the end I linked the JavaScript.

## The Style

To make this app look a bit beautiful at first I reset the margin and padding and set the fonty family to "Gill Sans" and etc.:

```css
* {
  margin: 0px;
  padding: 0px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
```

Next I made the full-screen wrapper to occupy minimum 100% of the available height. Made it to set the background color to black and text-color to white. The padding set to 10 px to make sure nothing touches the edge of the browser.

```css
.fullFrame {
  min-height: 100vh;
  padding: 10px;
  background-color: black;
  color: white;
}
```

Now, I styled the form:

```css
form {
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 30px;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: whitesmoke;
  border-bottom: 2px solid orange;
}

input[type="text"] {
  margin-top: 10px;
  padding-bottom: 10px;
}

input::placeholder {
  color: #ccc;
}

input[type="submit"] {
  border: 2px solid orange;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  padding: 10px;
}

input[type="submit"]:hover {
  background-color: orange;
  color: black;
  cursor: pointer;
}
```

Here, I made the form to be nice and center in the webpage. The max width is set to _600px_. Next I set the input elements to display as block, set their width to 100%. The border and outline was set to none. The border was then reset to orange and text color was set to white.

Next, specifically for the text input I set some margin and padding. Then the placeholder text color was set to light gray.

Then I designed the submit button with full border, and rounded border. There was a transition effect for hover effect. Then for button hover I changed background and text color.

## The JavaScript

To start with I got the container, inside which I will be inserting the YouTube video. Next I got the form to listen to the submit event. And the last thing I got in the JavaScript is the text field in the form:

```JS
const container = document.querySelector("#holder");
const form = document.querySelector("#idform");
const id = document.querySelector("#id_input");
```

Next I added the event listener. In the event listener, I listened for the submit event, where in the callback I took the event **_e_** as a parameter.

The first thing I did was to prevent the default task on submit event. Then I got the value submitted by the user. Then the next task was to clear the inner HTML of the video container and insert the required iframe. If you want the iframe code, YouTube provides that in the share > embed section.

So, the code for form submission looks like this:

```JS
form.addEventListener("submit", e => {
  e.preventDefault();
  let id_num = id.value;
  container.innerHTML = "";
  container.innerHTML += `<iframe id="spc" src="https://www.youtube.com/embed/${id_num}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
});
```

As you can see, I have added an ID of _spc_ to the _iframe_. This was done to add some style in CSS:

```CSS
#spc {
    width: 95vw;
    height: 80vh;
    display: block;
    margin: 20px auto;
}
```

Here I make the video nice and center.

So, that's it. Now there is this dumb app you can use to just to watch one video and not to get lost into the autoplay list.

The app and its code is available at [codepen](https://codepen.io/Ayushman_Bilas_Thakur/pen/ExaLeaQ). If you have some suggestions for this app then comment below.
