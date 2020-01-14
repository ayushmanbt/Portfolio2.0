---
title: How to Make a Timer with Javascript
date: 2020-01-07
layout: default
slug: simple_timer_with_js
desc: It is important in life to have track of time. So, today we are going to make a timer app in JavaScript
main_img: /simple_timer_with_js/thumbnail.png
tags: JavaScript, JS, Timer
---

It is important in life to have track of time. So, today we are going to make a timer app in JavaScript. Let's get started with the markup.

## The Markup

After Linking the the _css_ and _js_ to our HTML app I cerated a container to get the app front and center. Inside the container I placed an h1 and with the heading of timer app, then I placed a div containing three input fields for hour minutes and seconds, used h2 tags for ':' between hour, minute and second display.

```html
<div class="timing">
    <input type="number" id="hour" min="0" step="1" placeholder="hh"></input>
    <h2 class="colon"> : </h2>
    <input type="number" id="min" min="0" step="1" placeholder="mm"></input>
    <h2 class="colon"> : </h2>
    <input type="number" id="sec" min="0" step="1" placeholder="ss"></input>
</div>
```

The min and step makes sure we don't go below 0 and the placeholders are for making the user aware. After that I placed some buttons to start and reset the timer and gave them onClick functions which I will declare later:

```html
<div class="buttons">
  <button id="start" onclick="startTime()">Start Timer</button>
  <button id="reset" onclick="resetTime()">Reset Timer</button>
</div>
```

Now, it was the time to add some style:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

Here I reset the margin and padding on all the contents, set a default font family. Then in the container I centered the contents in it.

Next, I did some font sizing:

```css
h1 {
  font-size: 5rem;
  margin-bottom: 20px;
}
h2 {
  padding: 10px;
}
```

I made the timing container(.timing) to display as flex:

```css
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```

Now, it was the time to make the input fields beautiful:

```css
input[type="number"] {
  border: none;
  outline: none;
  font-size: 3rem;
  display: block;
  width: 120px;
  text-align: center;
}
```

I wanted to hide the buttons which allow to change the numbers, so I used this CSS:

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
```

Now, I decided to make the fields readonly when the timer is going and to show the difference I gave them a color:

```css
input[readonly] {
  background-color: greenyellow;
}
```

Next step was to make the buttons beautiful:

```css
button {
  padding: 10px 20px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.5rem;
  border: 2px solid green;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: green;
  color: white;
}
```

I added some media query to make the app beautiful. These media query rules resize the font size of _h1_ and _h2_ elements, ensures that the contents of container do not touch the edge of the screen and the clock fields are displayed properly:

```css
@media screen and (max-width: 500px) {
  .container {
    margin: 20px 10px;
  }

  h1 {
    font-size: 2.2rem;
  }

  h2 {
    display: none;
  }

  input {
    display: block;
    margin: 20px 10px;
  }

  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }

  .timing {
    flex-direction: column;
  }
}
```

Now, let's jump into the JavaScript.

## JavaScript of this project

My basic concept for this app was to use the _setInterval_ function and for every 1000ms, i.e. 1s, the number of seconds will be decreased. And this process will go on until seconds left is 0.

To start with, we need to select the hour, minute and seconds field. And, as told before to track the total second we will require a variable. Now for tracking hour, minute and second individually we need some more variables. So, the variable declaration looks like this:

```js
//getting some dom elements
const hourContainer = document.querySelector("#hour");
const minContainer = document.querySelector("#min");
const secContainer = document.querySelector("#sec");

//as there is only one h1 so this won't be any problem
const header = document.querySelector("h1");

//this is the timer in seconds
let timer_set = 0;

//the hour, min and second
let hour = 0;
let min = 0;
let sec = 0;
```

Now, to change the value of hour, minute and second according to user input we need to add event listener to each of the container.

```js
//if user updates these when editable then check if set >= 60 and stop them form doing that
minContainer.addEventListener("change", () => {
  //code to update minutes goes here
});

secContainer.addEventListener("change", () => {
  //code to update seconds goes here
});

hourContainer.addEventListener("change", () => {
  //code to update hours goes here
});
```

Now as there is nothing to worry about the input in hour field so it ws really easy just to do:

```js
hourContainer.addEventListener("change", () => {
  hour = parseInt(hourContainer.value);
});
```

The _parseInt_ was to make sure that the value stored is int.

Now for minute and second fields we need to update them and the fields based on that. For example: if someone inputs 61 seconds, then we need to update it with 1 minute and 1 second. And Also if there is 59 minutes 61 seconds then we need to convert it to 1 hour 0 minutes and 1 second.

So that code for that looks like this:

```js
minContainer.addEventListener("change", () => {
  min = parseInt(minContainer.value);
  if (min >= 60) {
    hour = Math.floor(hour + min / 60);
    min = min % 60;
  }
});

secContainer.addEventListener("change", () => {
  sec = parseInt(secContainer.value);
  if (sec >= 60) {
    min = Math.floor(min + sec / 60);
    sec = sec % 60;
    if (min > 60) {
      hour = Math.floor(hour + min / 60);
      min = min % 60;
    }
  }
});
```

Now, one thing to note that these updates update the JavaScript variables but not the Ui. For that I declared an updateUI function:

```JS
const updateUI = () => {
    hourContainer.value = hour;
    minContainer.value = min;
    secContainer.value = sec;
}
```

And we need to call it from all the event listener functions:

```js
minContainer.addEventListener("change", () => {
  //rest of code
  updateUI();
});

secContainer.addEventListener("change", () => {
  //rest of code
  updateUI();
});

hourContainer.addEventListener("change", () => {
  //rest of code
  updateUI();
});
```

Next, I implemented the _resetTime_ function, which will reset everything, and as the attributes of _readonly_ will be given to the form fields while the timer is started so we need to remove those attributes as well:

```JS
const resetTime = () => {
    hour = 0
    min = 0
    sec = 0
    timer_set = 0;
    hourContainer.removeAttribute("readonly");
    minContainer.removeAttribute("readonly");
    secContainer.removeAttribute("readonly");
    hourContainer.value = "";
    minContainer.value = "";
    secContainer.value = "";
}
```

Now, the meat of this project, the _startTime_ function. In this function, as I said earlier I set the contents of the input field to be readonly. Next I compute the number of seconds in that timer and store that into _timer_set_. Next I let the rest of the code be handled by a function called _startTicking_.

```js
const startTime = () => {
  hourContainer.setAttribute("readonly", "true");
  minContainer.setAttribute("readonly", "true");
  secContainer.setAttribute("readonly", "true");

  timer_set = hour * 60 * 60 + min * 60 + sec;
  startTicking();
};
```

As I explained earlier, I will set up an interval inside this function to call a function in every 1000ms i.e 1s. The setup inside that function looks like this:

```js
const startTicking = () => {
  setInterval(() => {
    timer_set -= 1;
  }, 1000);
};
```

But, there are some more things to do here:

1. Update the hour, minutes and seconds as well as their UI. For that I declared the updateHMS function, where I used simple maths to determine hour, minute and seconds value and update the UI with previously declared _updateUI_:

```js
const updateHMS = () => {
  sec = timer_set % 60;
  min = Math.floor(timer_set / 60);
  hour = Math.floor(min / 60);
  min = min % 60;
  updateUI();
};
```

So, this function is called in _startTicking_:

```JS
const startTicking = () => {
  setInterval(() => {
    timer_set -= 1;
    updateHMS();
  }, 1000);
};
```

Now, the next required thing is to _endTicking_ and _resetTime_ once the timer is equal or below 0. So, in endTicking I will make the js to change the h1 of the app and play a sound kept in the root of the project:

```JS
//as there is only one h1 so this won't be any problem, I got the h1 of the app
const header = document.querySelector("h1");

const endTicking = () => {
    header.innerText = "Time's Up!!"
    var audio = new Audio('bell_sound.mp3');
    audio.play();
    setTimeout(() => {
        header.innerText = "Timer app"
    }, 3000)

    resetTime();
}
```

The setTimeout is to reset the h1 again to previous h1. The implementation in _startTicking_ will be:

```js
//this is to stor the interval to terminate it
let interval;

const startTicking = () => {
    interval = setInterval(() => {
        timer_set -= 1;

        if (timer_set <= 0) {
            endTicking();
            clearInterval(interval);
        }
        updateHMS();
        }, 1000)
    }
}
```

Now here I declared and stored the interval in a variable to clear it once we are done. Now it is possible that users click reset button while timer goes on, so in resetTimer we need to clear the interval if it exists:

```js
const resetTime = () => {
  //rest of code
  if (interval) {
    clearInterval(interval);
  }
};
```

The only thing left to deal with is if the timer is started with 0. Then we need to check in the very beginning so that we need not to wait 1000ms for both 1s and 0s timer:

```js
if (timer_set > 0) {
  interval = setInterval(() => {
    timer_set -= 1;

    if (timer_set <= 0) {
      endTicking();
      clearInterval(interval);
    }

    updateHMS();
  }, 1000);
} else {
  endTicking();
}
```

## Conclusion

The app is hosted [here](https://ayushmanbilasthakur.github.io/countdownTimer/). You can find the source code [here](https://github.com/AyushmanBilasThakur/countdownTimer). But there are some ways in which this app can be improved:

1. One of the most notable feature I can suggest is to turn it into a PWA. As this app has nothing to deal with a server. T[This post](https://www.ayushmanbthakur.com/posts/how-to-make-a-pwa) will help you to make a PWA.
2. Implementing a pause button for the timer.

If you make your own version of this app then please comment below.
