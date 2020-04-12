---
title: Mobile First Design with Swipe controls in website
date: 2020-04-13
layout: default
slug: swipe_control_webpage
desc: Mobile devices are now firest priority for us, web developers. So why don't we use the mobile specific features like swiping for our webpages. So here is a simple swipe to show delete button showing off the simple ways to use the swipe gestures in a browser.
main_img: /swipe_controls_webpage/thumbnail.png
tags: JS, Swiping, JavaScript, HTML, CSS
---

Nowadays more and more people are using Android and iOS devices to access websites more than they use their desktop devices. So, the mobile first design is recently coming to our attention a lot. But one thing got me thinking, if we can create websites keeping smaller handheld devices in mind, then we should use some mobile specific features to give the users some cool experience. 

In most of the websites I have seen that a hamburgur menu is implemented to hide the navigations and save some space. But they just provide a button to click to open up the hamburger menu. That just does not feel good to me. It was also the same case in my website as well. Recently I implemented a swipe action that can open and close the menu, which feels more natural thing to do in a mobile, touchscreen device. And it looks like this: 

![swipe gesture main menu - Ayushman's portfolio](/swipe_controls_webpage/swipe_gesture_portfolio.gif)

Is not it cool? The circle shows the touch position and on touch it disappears.

Most of you who follow me know that I love to make tutorials, and you won't be let down in this post as well, as we will be implementing a todo card where swiping will reveal the delete button for that card. So without furthur adieu let's jump right into coding. 

But before starting if you want to check out this code this will be available on [github](https://github.com/AyushmanBilasThakur/swipes_in_webpage) or [glitch](https://glitch.com/~swipes-in-webpage). and the hosted version of this will be available [here](https://swipes-in-webpage.glitch.me/). You should really go and check out the hosted version from your phone to just get the feel. Here is a gif to show this swipe open working:

![swipe gesture working - the app we are hoing to make](/swipe_controls_webpage/swipe_gesture_in_app.gif)

## The folder setup

There is no fancy setup required for this project, you will just need a HTML file a CSS file and a JavaScript file all linked up to the HTML file and put into one foledr. And obviously you should use a code editor to code rapidly.

## Writing up the initial HTML

So, our app doesn't need any fancy HTML layout to do stuff. It will be very simple with a `div` of class `container` weapping everything. Inside that div there will be a `div` with a class of `card` and inside that `div` we will have a `h3` with a class of `todo_essentials` which will be having our todo text, just to keep the code simple. You can make this `todo_essentials` a `div` and make this layout complicated.
 
After that we need to get that delete button its own space in a `button` with the class of `delete`, inside which we will be putting a button with a delete icon. I have used a [material design icon](https://materialdesignicons.com/) here. To plcae this icon we need to import the material design icons:

```HTML
<link
    rel="stylesheet"
    href="https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css"
/>
```

Then we have to use a span with class `mdi` and `mdi-trash-can-outline` to make the icon.

So now our HTML file looks something like this:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no"
    />

    <title>Swipe Open Controls</title>

    <link rel="stylesheet" href="./style.css" />

    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css"
    />
  </head>
  <body>
    <div class="container">
      <div class="card">
        <h3 class="todo_essentials">
          Todo 001
        </h3>
        <button class="delete_button">
          <span class="mdi mdi-trash-can-outline"></span>
        </button>
      </div>
    </div>

    <script src="./app.js"></script>
  </body>
</html>
```

Now let's just make the site beautiful.

## CSS

As this is not a CSS tutorial so we won't be focusing much on the CSS and just will be focusing on the required stuff:

So at first we will be resetting the margin and padding. And then we will be setting the positions using the `.container`, the fonts, shadows, font size, margins and padding:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #e9e9e9;
}

.container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 80%;
  /* border: 2px solid black; */
  display: flex;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  background-color: aliceblue;
}

.todo_essentials {
  padding: 10px 20px;
}

.delete_button {
  margin-left: auto;
  display: block;
  height: match-parent;
  padding: 5px 20px;
  background-color: #da0d25;
  color: white;
  outline: none;
  border: none;
  font-size: 1.3rem;
}
```

Now this will be the time to discuss how this sliding mechanism works. So, here I simply set the the `transform origin` to the right(as our button is on the right side of the screen) then set the `scaleX` to 0 using the `transform` property. Then I set a few animations and set the cursor to pointer, for desktop view.

```CSS
.delete-button{
    /* rest of the stuff */
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    cursor: pointer;
}
```

Talking about desktop views, here are some settings I used to show the delete button on hover for desktops:

```CSS
.delete_button:hover,
.delete_button:focus {
  background-color: #9c0315;
}

@media only screen and (min-width: 600px) {
  .container {
    min-width: 0;
    max-width: 500px;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 900px) {
  .card:hover .delete_button {
    transform: scaleX(1) !important;
  }
}
```

Next, we will be jumping into the meat of the project i.e the JavaScript stuff. But before that, let me tell about the available touch events and how we will be using them.

## The touch events available in the browsers

There are mainly four touch events for which you can listen to:


**1. touchstart:** This detects start of touch/touches and fires eventlistener. If you socute the event objcet available in the callback to eventlistener, we get a list of touchs, each one containing some x and y co-ordinates with respect to screen, window, page and etc. The object for a touch looks something like this: 

```js
{
    identifier: 0
    target: div.card
    screenX: 2661
    screenY: 471
    clientX: 273
    clientY: 336
    pageX: 273
    pageY: 336
    radiusX: 11.5
    radiusY: 11.5
    rotationAngle: 0
    force: 1
}
```

**2. touchmove:** As the event name suggests it fires when one of the started touches is moved.

**3. touchend:** As the event name suggests it will fire once a touch is ended i.e. your finger is moved out of the screen.

There is also one more touch event there, about which I don't have much knowledge.

**4. touchcancel**  

Each of the above events yield out an object, where according to me the most important things are _touches_, _targetTouches_ and _changedTouches_. I am still exploring the touch events and will be exploring and sharing more in future.

With the basics of touch events covered I will now diving into coding our main swipe, which will be relying on a simple concept: when the touch starts we will note the initial touch x of `touch[0]` the user. Then on move of touch we will take the x position of `touch[0]` and will find the difference between the initial touch x and this touch. And when the touch ends, if the difference of the final position x and initial x is less than 0 then we can say that there was a left swipe, and otherwise we can say there was a right swipe. The explanation can be found using the diagram below:

![x position in browser, page and anything computer related](/swipe_controls_webpage/x_axis.png)

So, let's just code the touch handling.

## JavaScript

To start things off we will need the reference of the `card` and our `delete button`. We need the reference to the card to add touch event listeners. Then we need a reference to the button to show and hide it accordingly. We also will need a boolean to store whether the button is shown or not. Then we need a variable to store the initial x position and the movement in x. I also create a constant to create a small threshold to eleminate accidental swipe detection. So far this code will look like this:

```JS
const card = document.querySelector(".card");
const theDeleteButton = document.querySelector(".delete_button");

const MOVE_THRESHOLD = 100;

let initialX = 0;
let moveX = 0;
let isDeleteButtonOpen = false;
```

So, the next thing will be to add event listeners to the card. As told before, on touch start we will get the initial x position of touch in our `initialX` variable:

```JS
card.addEventListener("touchstart", e => {
    initialX = e.touches[0].pageX;
});
```

Now, at movement we were to get the current position and calculate the movement. This is done so as sometimes the position is not found properly at the end of the touch(at least for me it as not working properly). So the code for `touchmove` will look like:

```JS
card.addEventListener("touchmove", e => {
  let currentX = e.touches[0].pageX;
  moveX = currentX - initialX;
});
```

Now, at the `touchend` event we need to check if it was left swipe and or a right swipe by checking if our `moveX` amount was less than or greater than the `MOVE_THRESHOLD` multiplied by the sign of the `moveX`. If our value of `moveX` is less than the calculated `MOVE_THRESHOLD` then as explained before we can say that the swipe was a left swipe otherwise, if our value of `moveX` is greater than the calculated `MOVE_THRESHOLD` then we can say it was a right swipe. Then we have the `isDeleteButtonOpen` boolean which says whether the button is visible or not.

So, if the swipe was left and the button was not open we set the `scaleX` of the button to 1(as by setting scaleX 0 we hid the button) and also set the `isDeleteButtonOpen` to true. and if the swipe was right and the button was open we set the `scaleX` to 0. So the final code for `touchend` will be like:

```JS
card.addEventListener("touchend", e => {
  if (moveX < MOVE_THRESHOLD * Math.sign(moveX) && !isDeleteButtonOpen) {
    theDeleteButton.style.transform = "scaleX(1)";
    isDeleteButtonOpen = true;
  } else if (moveX > MOVE_THRESHOLD * Math.sign(moveX) && isDeleteButtonOpen) {
    theDeleteButton.style.transform = "scaleX(0)";
    isDeleteButtonOpen = false;
  }
});
```

So the final project will be working properly now. 

## Conclusion

So, this was a simple tutorial for using swiping gestures in a webpage. But you can build a lot on this, like adjusting the x scale according to the movement, or doing something cooler with different swipe gestures - maybe a small game. The creativity is endless. Until my next post stay happy and keep coding. And keeping in the current condition in mind, stay home, stay safe.