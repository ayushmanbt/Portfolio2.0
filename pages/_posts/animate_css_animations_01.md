---
title: Bounce Animation with Vanilla CSS
date: 2020-01-13
layout: default
slug: bounce-animation-with-css
desc: I was wondering if the animations done by animation libraries can be easily done by us? So, today I went to the site of the most popular css animation framework, animate.css and tried to recreate the first animation shown there, the bounce animation.
main_img: /bounce_animation_animate_css/thumbnail.png
tags: CSS3, CSS animation, Animate.css, Bounce animation css
---

I was wondering if the animations done by animation libraries can be easily done by us? So, today I went to the site of the most popular css animation framework, [animate.css](https://daneden.github.io/animate.css/) and tried to recreate the first animation shown there, the bounce animation.

The actual animation:

![animate_css_version](/bounce_animation_animate_css/animate_css_version.gif)

My animation:

![my version](/bounce_animation_animate_css/my_version.gif)

So, you might notice that my animation was a bit different from the original. However, it is really easy to make. So, let's get started.

## The Markup

This app is quite small and simple. So, There is nothing much about the HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Animate.css Animation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Animated Text</h1>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

It starts with the basic declaration of the title and linking the stylesheet in the head. Then in the body we have the div with the class of container. Inside which I placed another h1 with the text of Animated Text. After that I linked the script to the app.

Now, let's do the basic styling to bring that text nice and center:

```CSS
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.container{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    color: white;
}

h1{
    font-size: 6rem;
    cursor: pointer;
}
```

Here I reset all the margin and padding and also set the box sizing. After that, the font family was set to _Gill Sans_ with fallback of Calibri and sans-serif. Next, I made the _.container_ to take up the whole screen and be displayed as flex, so we can bring the main text nice and center. In the h1 the font size was changed and the cursor was changed to be a pointer so that it can be shown that the text can be clicked. In this webpage, I will make the text animate once it is clicked.

That is it for now in the part of CSS. Now, let's get to JavaScript and we will return back to CSS to later define our animation. 

So, the first thing will be to get the _h1_ to be animated and add an _on click_ event listener to it. Now, as I have only one h1 to be animated so it is fine. But if you have multiple things to animate then you can add a specific class to each of them, then select them all via javascript and then loop over the array obtained from the query and add an event listener to each of them. However, that is not the case here. So we will simply select our only h1 and add an onclick listener to it:

```js
const animatedText = document.querySelector("h1");

animatedText.addEventListener("click", () => {
})
```

Now we need to think what will happen once the button is clicked? It's simple it needs to animate. But the question is how? For that, what I came up with to check if a _specific_ class is already added to the element in concern. If that is not added then we will add the class. Once the animation is done we will also need to remove that class, so that we can later add the class again to animate that element again.

For my project I chose the class name to be added be "animation-bounce" and decided to give the animation a duration of 1s. So, with that in mind it was time to jump into css and add this specific class:

```css
/* all the previous code */
.animation-bounce{
    animation-name: bounce;
    animation-duration: 1s;
}
```

So, here we declared the animation name for this class to be bounce and set the animation duration to be 1s. Now, we need to declare the animation, which we do using _@keyframes_ in CSS. 

The declaration syntax of _@keyframes_ is like this:

```css
@keyframes animation-name{
    /* the rest of the code */
}
```

So, inside the keyframes we can declare styles for a specific point of time, starting at 0% and ending at a 100%. These declarations look something like this:

```css
/* example code, not for the actual webpage we are making */
@keyframes animation-name{
    0%{
        color: red;
    }
    100%{
        color: white;
    }
}
```

This above example is animating text color form red to white. Now, if we have a close look at the animation we are trying to mimic then we can see, the text goes up, then falls down and then goes back up again, but this time to a smaller extent and then comes back down and stops. 

The CSS property I can think of at this moment was _transform - translateY_. This _translateY_ property moves any element along the Y-axis. Now, in translate with negative value of Y we go up and with positive value we go down. So, with that in mind and some calculations I thought it would be nice to get the text 70px up then 5px down then take it 25px up and 2 px down, then for the final jump take it 15px up and make it stop at translateY of 0.

So, the animation looks something like this in css:

```css
@keyframes bounce{
    0%{
        transform: translateY(0);
    }
    30%{
        transform: translateY(-70px);
    }
    50%{
        transform: translateY(5px);
    }
    70%{
        transform: translateY(-25px);
    }
    80%{
        transform: translateY(2px);
    }
    90%{
        transform: translateY(-15px);
    }
    100%{
        transform: translateY(0);
    }
}
```

Now, it is finally the time do the rest of the javascript, which will attach the specific class to the element while it is not animating and remove it after the animation is done. I don't know of any direct way to know the animation end, so I used _setTimeout()_ with 1000ms of timeout which is equal with our animation time. So, the code looks like this:

```js
const animatedText = document.querySelector("h1");

animatedText.addEventListener("click", () => {
    if(! animatedText.classList.contains("animation-bounce")){
        animatedText.classList.add("animation-bounce");
        setTimeout(() => {
            animatedText.classList.remove("animation-bounce");
        },1000)
    }
})
```

So, now our cool animation is ready. Check out the app at [codepen](https://codepen.io/Ayushman_Bilas_Thakur/pen/QWwxpyy). If you create your own version then please write them down in the comments, and if you want me to replicate another animation then also tell me in the comments.