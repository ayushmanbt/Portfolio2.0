---
title: Light/Dark Mode Toggle
date: 2019-01-03
layout: default
slug: light-dark-toggle
desc: Having a light and dark mode toggle in your website is becoming an essential feature day by day. So in this post we are going to create a light/dark mode toggle for our website
main_img: /light_dark_mode/thumbnail.png
tags: Light-Dark Mode, Light mode, Dark Mode, Toggle, HTML, CSS, JavaScript, JS, Light-Dark Mode,
---

# Make a Simple Dark Mode for Your Website with CSS and JS

<div style="width: 100%; display: flex">
<img src = "/light_dark_mode/light_dark_final.gif" class="thumbnail">
</div>

If you notice properly, in my website there is a dark mode toggle button on the top left corner. If you click it the website will turn into light themed. If you want similar feature in your website, then it is really easy to do so. I will show you how.

## Making the HTML layout

To start with, we will need an HTML layout to work on. So, I came up with a simple layout. It looks something like:

![](/light_dark_mode/design_dark_01.png)

As I love dark mode I made it my default design. And in the light mode the design looks something like this:

![](/light_dark_mode/design_light_01.png)

So, let's start writing this layout:

To start with I will create a folder and there will be these files:

- index.html
- style.css
- script.js
- keyboard.jpg (the image used in the layout)

In the _index.html_ I will start with the initials:

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KEY-BORED</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
</body>

</html>
```

This is the boilerplate provided with _[emmet plugin](https://emmet.io/)_, which comes default with [VSCode](https://code.visualstudio.com/)(the editor of my choice). However, you can install emmet on Atom or Sublime text as well.

Here the only changes I have made are -

1. Changed the title to _KEY-BORED_
2. Linked our CSS with the HTML.

Now, in the next part of the markup I created a wrapper to contain the whole app. This wrapper will be given a separate class via JavaScript later to apply the light mode settings throughout the app. This _div_ was given a class of _.fullscreen_ to apply some CSS on it initially and easily target it in JS as well.

```HTML
<div class="fullscreen">
    <!-- Rest of the markup will go here  -->
</div>
```

Now it ws the time to define some CSS properties for this div and in general:

```CSS
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
```

So I declared 0 margin and padding, along with setting the box size to _border-box_(which makes sizing the divs and all that easier for me) and the default font family was set to "Gill Sans", along with some fallbacks like calibri and so on.

After this I declared the CSS for the general wrapper i.e. _fullscreen_

```CSS
.fullscreen {
    background-color: #000000;
    width: 100%;
    min-height: 100vh;
    color: white;
}
```

As I decided to make the dark mode default, so I set the background color to black and made it to at least cover the full width and the height of the screen. By default I made it to set my text color to white.

Now, it was the time to move on with laying out the website and styling it further.

So, I created the NavBar next:

```HTML
<div class="fullscreen">
    <nav>
        <div class="container">
            <h1 class="title">KEY-BORED</h1>
            <div class="toggler-container">
                <p>DARK🌑</p>
                <div class="toggler">
                    <div class="circle"></div>
                </div>
                <p>LIGHT🌞</p>
            </div>
        </div>
    </nav>
</div>
```

In the navbar, I first placed a container to keep the contents in the center. In this container I placed the _h1_ with the class of _title_ and placed my company-branding there. Next, I placed the toggler. I kept the light/dark theme toggler inside a div with the class _toggler-container_. Inside that there are two _p_ tags with the labels of DARK and LIGHT.

In the middle I placed a _div_ with the class _toggler_ which was the actual toggler. The _div_ with class _circle_ indicates the circle inside the toggler, which indicates which theme is currently enabled.

Now, without styling the nav is incomplete, so I brought in the styles:

```CSS
nav {
    background: #353535;
}
```

This gave the navbar that dark grey look.

```CSS
.container {
    padding: 20px 40px;
    margin: 0 auto;
    max-width: 1440px;
    width: 90%;
}
```

After this the container was designed to have some padding to make it not to stick on the edges. Made the margin to 0 auto to make it come in the center. The max width of the container was set to 1440px to prevent it from spreading too much on giant screens. For general purpose, it was allocated 90% of its parent's width.

Now the container inside the nav needed some special features, so I declared them next:

```CSS
nav .container {
    display: flex;
}
.title {
    color: orange;
    margin: 0;
}
```

I made the title orange as well to give the site some contrast.

After this, to push the toggler-container to the right I used, _margin-left: auto_. Then I made it to _display_ as _flex_ to align the items in it side to side. _justify-content_ and _align-items_ was set to be _center_ for better styling. So the CSS for that looked like this:

```CSS
.toggler-container {
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

Now, it was the time to make the actual toggler:

```CSS
.toggler {
    background: #222;
    margin: 0 10px;
    width: 60px;
    height: 100%;
    border-radius: 100px;
    padding: 5px;
    cursor: pointer;
}

.circle {
    background-color: orange;
    height: 20px;
    width: 20px;
    border-radius: 100px;
}
```

So, here I made the background of the toggler of _dark-grey_(#222). I gave it a _left_ and _right_ _margin_ of 10px to push the labels away. Then, I set its _width_ to 60px and _height_ to 100% of its parent to make it visible. Then I gave it a _padding_ of 5px to keep the circle inside from overlapping its edge and finally the _cursor_ was set to pointer so that the user could know that the button was clickable. The _border radius_ was given to give it a capsule-like look.

Making the circle was really easy. I gave it a _width_ and a _height_ of 20px which made it fit inside the container perfectly. After this, I declared the border radius to make it a circle and gave a _background-color_ of orange.

Now, at this point I had no JavaScript to toggle the button. So, I made the button to toggle on hover for now:

```CSS
.toggler:hover {
    background: limegreen;
}

.toggler:hover .circle {
    transform: translateX(30px);
    background-color: black;
}
```

I made the _background_ of the toggle to limegreen on hover and made the circle to move 30px to right by using _transform: translateX()_ I made the background color black to make the circle prominent on the green background.

To give this changes a transition effect I gave a transition property to the .toggler and the .circle:

```CSS
.toggler {
    /* rest of the code */
    transition: all 0.3s ease-in-out;
}

.circle {
    /* rest of the code.. */
    transition: all 0.3s ease-in-out
}
```

So, it was now time to add some things to the body of the page. In index.html I used some lorem ipsum text to write down this piece:

```HTML
<div class="fullscreen">
    <!-- THE CODE FOR THE NAVBAR -->
    <div class="container">
        <h1>Hello World!</h1>
        <p>
            Lorem ipsum ...
        </p>

        <img src="./keyboard.jpg" alt="">

        <h2>More about us</h2>
        <p>
            Lorem ipsum d...
        </p>
    </div>
</div>
```

The lorem ipsum ... indicates that I added some more text there. I placed an image taken form unsplash, shortened and compressed it for the web and placed it between two paragraphs. I wrapped everything inside a container to keep it nice and center.

To make the image and the paragraphs look better, I added some CSS:

```CSS
img {
    display: block;
    margin: 20px auto;
    width: 60%;
}

h1,
h2 {
    margin: 20px 0;
}
```

Now I could not resist to make my app responsive so I added some media query:

```CSS
@media only screen and (max-width: 550px) {
    nav .container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .toggler-container {
        margin: 0;
        margin-top: 20px;
    }

    img {
        width: 100%;
    }
}
```

For devices of width under 550px having this media query display the things inside the nav to be arranged in a row manner by setting the _flex direction_ to column. With _justify-content_ and _align-items_ I made everything centered inside the top nav. I separated the _.toggler-container_ from the branding by first resetting its _margin_(so that it doesn't get pushed right) and then giving a _margin-top_ of 20px.

It was now time to add the JavaScript and make our site toggle between modes.

## JavaScript, toggling the modes

So, to start with we need to attach our JavaScript with the HTML file like so:

```HTML
<body>
    <!-- REST OF THE CODE -->
    <script src="./script.js"></script>
</body>
```

Now in the JS we did not need much things to do:

```JS
let toggler = document.querySelector(".toggler");
let fullscreen = document.querySelector(".fullscreen");
```

At first, I acquired the toggler and the fullscreen(div containing the whole app), by using _document.querySelector()_. This function selects elements based on the query-string like:

1. "tag_name", for HTML tags
2. ".class_name", for selection based on class name
3. "#id", for selection based on ID.

This _querySelector_ function returns the first element matching the query. There is also _querySelectorAll_ for selecting all elements satisfying the query.

Next, I added an _EventListener_ to our toggler, which listens for the "click" event and calls the callback function given to it. In this callback function I toggle the class of "light" on the fullscreen element. Having this class "light" on the _.fullscreen_ component makes the sit light themed, otherwise the site becomes dark themed. This function adds a class if it is not there and removes it if the class is there. So, the final JavaScript looks like this:

```JS
let toggler = document.querySelector(".toggler");
let fullscreen = document.querySelector(".fullscreen");

toggler.addEventListener('click', () => {
    fullscreen.classList.toggle("light");
})
```

Now, having this will only toggle the class on the _.fullscreen_ div. But we need to actually define some CSS for actually making the light theme.

To start with I made the toggler to change position on click and not on hover. As the class of _.light_ is added to the parent node on click so in light theme to position the toggle right I made some color changes and made the CSS like this:

```CSS
.light .toggler {
    background: #333;
}

.light .toggler .circle {
    transform: translateX(30px);
    background-color: white;
}
```

Which indicates, if the parent has a class of light, then make the toggler 's background grey(#333) and for the circle inside the toggler: make it white and move it 30px right.

Now for light theme, we needed to change the background of the nav and its h1 which was done easily by this code:

```CSS
.light nav {
    background-color: #10A881;
}

.light nav h1 {
    color: black;
}
```

Now the only thing left was to set the default colors for the _.fullscreen_ which was done by this CSS:

```CSS
.fullscreen.light {
    background-color: #eee;
    color: black;
}
```

This _.fullscreen.light_ searches for an element with both the classes _fullscreen_ and _light_

To make the transition smooth I gave the _transition: all 0.3s ease-in-out_ property to _.fullscreen_, _nav_ and _container_

So, now our app is ready, and it works like this:

![](/light_dark_mode/light_dark_final.gif)

The final code:

**HTML:**

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KEY-BORED</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="fullscreen">
        <nav>
            <div class="container">
                <h1 class="title">KEY-BORED</h1>
                <div class="toggler-container">
                    <p>DARK🌑</p>
                    <div class="toggler">
                        <div class="circle"></div>
                    </div>
                    <p>LIGHT🌞</p>
                </div>
            </div>

        </nav>

        <div class="container">
            <h1>Hello World!</h1>
            <p>
                Lorem ipsum...
            </p>

            <img src="./keyboard.jpg" alt="">

            <h2>More about us</h2>
            <p>

                Lorem ipsum d...
            </p>
        </div>
    </div>
    <script src="./script.js"></script>
</body>

</html>
```

**CSS:**

```CSS
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.fullscreen {
    background-color: #000000;
    width: 100%;
    min-height: 100vh;
    color: white;
    transition: all 0.3s ease-in-out;
}

nav {
    background: #353535;
    transition: all 0.3s ease-in-out;
}

.container {
    padding: 20px 40px;
    margin: 0 auto;
    max-width: 1440px;
    width: 90%;
    transition: all 0.3s ease-in-out;
}

nav .container {
    display: flex;
}

.title {
    color: orange;
    margin: 0;
}

.toggler-container {
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.toggler {
    width: 60px;
    margin: 0 10px;
    background: #222;
    height: 100%;
    border-radius: 100px;
    position: relative;
    padding: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.circle {
    background-color: orange;
    height: 20px;
    width: 20px;
    border-radius: 100px;
    transition: all 0.3s ease-in-out
}

img {
    display: block;
    margin: 20px auto;
    width: 60%;
}

h1,
h2 {
    margin: 20px 0;
}

/* CSS to handle light mode */

.light .toggler {
    background: #333;
}

.light .toggler .circle {
    transform: translateX(30px);
    background-color: white;
}

.fullscreen.light {
    background-color: #eee;
    color: black;
}

.light nav {
    background-color: #10A881;
}

.light nav h1 {
    color: black;
}

@media only screen and (max-width: 550px) {
    nav .container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .toggler-container {
        margin: 0;
        margin-top: 20px;
    }

    img {
        width: 100%;
    }
}
```

```JS
let toggler = document.querySelector(".toggler");
let fullscreen = document.querySelector(".fullscreen");

toggler.addEventListener('click', () => {
    fullscreen.classList.toggle("light");
})
```

## Conclusion

All the source code is uploaded on github at [https://github.com/AyushmanBilasThakur/light_dark_toggle](https://github.com/AyushmanBilasThakur/light_dark_toggle). The app is hosted [here](). I really enjoyed making this small utility. You can more enhance this app by adding the light class based on user preferences. Read more [here](https://www.freecodecamp.org/news/how-to-detect-a-users-preferred-color-scheme-in-javascript-ec8ee514f1ef/). Maybe, you can also use localStorage to persist what theme was last used by the user. Submit your version of this webpage in the comments down below for others to enjoy.

<style scoped>
h1,h2,h3,h4,h5,h6{
    font-family: "Montserrat Alternates", sans-serif;
}

pre{
    background: #111 !important;
    z-index: 0;
}

pre *{
    background: transparent !important;
    text-shadow: none;
    color: #d6deeb;
    font-size: 1.1rem;
}

.dark-mode p, .dark-mode li{
    color: #bbb;
}

img{
    width: 100%;
}

p, li{
    color: #222;
    font-size: 1.1rem;
    margin: 5px 0;
}
li{
    margin-left: 20px;
}
</style>
