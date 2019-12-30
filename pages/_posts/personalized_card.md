---
title: Personalized New Year Card - No Backend
date: 2019-12-31
layout: default
slug: new-year-personalized-card
desc: Having a complex backend to do simple jobs is really easy. Buy\t it is challenging to flex your knowledge of javascript and make a simple personalized card. Today we are going to make that.
main_img: /new_year_card/thumbnail.png
tags: 2020, HTML, CSS, JS,
---

# Making a Personalized New Year Wishing Card with no Backend

<div style="width: 100%; display: flex">
<img src = "/new_year_card/thumbnail.png" class="thumbnail">
</div>

As the New Year is approaching I wanted to make a personalized New year's card using HTML CSS and Javascript. But I did not want to use any backend like Node.js or Django, because:

1. I wanted the site to be simple.
2. I wanted to make it in a day.
3. I wanted to host it in GitHub.

So, I found a solution - why don't I use query parameters in the URL to personalize the cards.

To start with, I wanted to test out how to have the query string from an URL. So, I linked a javascript file with my index.html and tried to output the query string in the console.

## Working with the Query Params

To get the URL query string in JavaScript I used this code

```JS
console.log(window.location.search)
```

But this was not enough for me. It would be nice to have an object of that query string. Some brainstorming and a little bit of Googling gave me this solution:

I found a function named `URLSearchParams()` which converted the string given by window.query.search into an Object which has several functions which makes it easy to work with that string.

One of the useful functions I found is `entries()` which returns an iterable. Using an iterable we can do a for loop through the entries and create an object off of it. So, my final code looked something like this:

```JS
let queryObject = {};

let params = new URLSearchParams(window.location.search)

let entries = params.entries()

for (value of entries) {
    queryObject[value[0]] = value[1];
}

console.log(queryObject)
```

Here I created an object named `queryObject`. After that, I created the `URLSearchParams()` object and kept it in a variable named `params`(I thought it might be useful so I kept it like that).

Now it was the time to extract the parameters and make the object. For that, I used the `entries()` function in the `params` object. Now it was the time to create the object from the values. For that, I used a `for-of` loop. I marked each value as value.

One thing is that this value is an array with two elements. In the 0th index, there is the **key** and in 1st index, we have the **value** assigned to the key. So, to create the object I used the key values and console logged them. As it is a personalized card so I decided to use two fields - **to** and **from** and the console log looked like this

![](/new_year_card/console-logged-object.png)

## Simple Personalized Message Showing

At this moment there is nothing shown in the HTML. Let's just show a message and make the site look a bit cool. So I created a section named card and here I added the `h1` saying _Happy New Year 2020_. After that, I created a paragraph with an ID `to`. The next paragraph had the message. As I was coding this part I thought I should let the users to personalize message as well so I gave an id of `msg` to that. The next paragraph was given an id of `from`. The total HTML now looked like this:

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Year Wishing</title>
</head>

<body>

    <section class="card">
        <h1>Happy New Year 2020</h1>
        <p id="to">John Doe</p>
        <p id="msg">Hope this year goes fine for you</p>
        <p id="from">Ayushman</p>
    </section>

    <script src="app.js"></script>
</body>

</html>
```

The result looked like this:

![](/new_year_card/markup-01.png)

This was okay but I want to make the site beautiful, so I added the CSS:

```CSS
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

@import url('https://fonts.googleapis.com/css?family=Snowburst+One&display=swap');

@import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.767);
    background-image: url('winter_bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
}

.card {
    width: 90vw;
    text-align: center;
    padding: 20px 20px;
    color: white;
}

.card h1 {
    font-size: 3rem;
    color: #ff7b00;
    margin-bottom: 40px;
    font-family: 'Snowburst One', cursive;
    ;
}

#to,
#from {
    font-size: 1.5rem;
    font-family: 'Nunito Sans', sans-serif;
    color: #b3aeae;
}

#to {
    margin-bottom: 20px;

}

#msg {
    font-family: 'Raleway', sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
}
```

So, I used three fonts from Google Fonts - [Nunito Sans]('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap'), [Snowburst One](https://fonts.googleapis.com/css?family=Snowburst+One&display=swap') and [Raleway]('https://fonts.googleapis.com/css?family=Raleway&display=swap') and this picture from Pixabay as background.

![](https://cdn.pixabay.com/photo/2012/12/14/09/26/winter-69926_960_720.jpg)

I did some blending with the background color and the image and the final product now looks like this:

![](/new_year_card/After-Adding-CSS.png)

Now, I need to customize the text of the card according to the query string.

## Customizing the card according to the query string

As I have given ID to each field in the card's HTML Markup, so it was as easy as getting the elements by ID and editing the innerText. So now the JS looks like this:

```JS
let customizeMessage = () => {
  let toDetails = document.getElementById("to");
  let fromDetails = document.getElementById("from");
  let msg = document.getElementById("msg");

  toDetails.innerText = "To, " + queryObject.to;
  msg.innerText = queryObject.message || msg.innerText;
  fromDetails.innerText = "From, " + queryObject.from;
};
```

I created this new function named `customizeMessage()` where I at first I stored all the required HTML parts in the variables by `document.getElementById()`. After that, I set the innerText of those HTML tags accordingly. As per my choice, I made the **to** and **from** field required, so I have directly set the value of **toDetails** and **fromDetails**. But I decided to keep the message part optional so I set its value `queryObject.message || msg.innerText`. This kind of setting uses the later value if the first value is Undefined.

Now the browser response looks like this:

![](/new_year_card/Customized-Message-01.png)

## Next Step: Creating the Links via a Form

Not everyone can create links via the query string. So, I thought I should create a form to create a link for them.

The first thing we need is the markup of the form.

```HTML
<section class="card" id="formContainer">
    <h1>Personalized 2020 Wishing Card</h1>
    <form id="form">
        <input placeholder="To" type="text" id="toInput" required>
        <input placeholder="From" type="text" id="fromInput" required>
        <textarea placeholder="What do you want to tell?(optional)" id="message" cols="30" rows="10"></textarea>
        <input type="submit" value="Create My link">
    </form>
    <div id="linkbox" class="not-show">
        <h3>The created Link: </h3>
        <br>
        <a id="link" href="#" target="blank">
            #
        </a>
        <div class="control">
            <button onclick="copyLink()">Copy</button>
            <button onclick="clearLink()">Clear Link</button>
        </div>
    </div>
</section>
```

Here I made a section with the ID of `formContainer`. All the IDs created here is useful later for creating the link and all that. I also cerated a button in the card and the changes in the HTML of the card looks like this:

```HTML
<section class="card not-show" id="card">
    <h1>Happy New Year 2020</h1>
    <p id="to">To, John Doe</p>
    <p id="msg">Hope this year goes fine for you</p>
    <p id="from">From, Ayushman</p>
    <button onclick="makeLink()">Create your own</button>
</section>
```

Now it was the time to style a little bit. I introduced a new class `not-show` to hide things. The updates in the CSS were like this:

```CSS
#card>button {
    margin: 20px auto;
    ;
}

.not-show {
    display: none;
}


input,
textarea,
button {
    display: block;
    margin: 20px auto;
    width: 400px;
    padding: 10px 10px;
    font-size: 1.2rem;
    border: 2px solid #777;
}


input[type="submit"],
button {
    background-color: springgreen;
    border: none;
    outline: none;
    transition: all 0.3s ease-in-out;
}

input[type="submit"]:hover,
button:hover {
    cursor: pointer;
    background-color: #005f30;
    color: white;
}

.control {
    display: flex;
    width: 400px;
    margin: 0 auto;
}

button {
    margin: 20px 10px;
}

a {
    color: yellow;
    transition: all 0.3s ease-in-out;
}

a:hover {
    color: #fff;
}

@media screen and (max-width: 500px) {
    html {
        font-size: 75%;
    }

    input,
    textarea,
    button {
        width: 100%;
    }

    .control {
        width: 90%;
        flex-direction: column;
    }

    button {
        margin: 10px 0;
    }
}
```

I also added a `media query` for a better view on mobile devices.

Now it was the time to update the Javascript.

At first I used `document.getElementById()` to get all the elements required -

```JS
let toInput = document.getElementById("toInput");
let fromInput = document.getElementById("fromInput");
let message = document.getElementById("message");
let linkbox = document.getElementById("linkbox");
let form = document.getElementById("form");
let generatedLinkBox = document.getElementById("link");
```

`toInput` is the input from the user for the **to** field.
`fromInput` is the input from the user for the **from** field.
`message` is the input from the user for the **message** field.
`linkbox` is the **linkbox**
`form` is for the form.
`generatedLinkBox` is for having the new link.

Now I needed to define the function on form submit. So I did this -

```JS
form.addEventListener("submit", e => {
  e.preventDefault();
  let queryString = `?to=${encodeURIComponent(
    toInput.value
  )}&from=${encodeURIComponent(fromInput.value)}&message=${encodeURIComponent(
    message.value
  )}`;
  generatedLinkBox.innerText = baseURL + queryString;
  generatedLinkBox.setAttribute("href", generatedLinkBox.innerText);
  linkbox.classList.remove("not-show");
});
```

Here I at first prevented the default action, then collected the value of the form fields. Then out of the given values, I made the query string. This query string was then attached to the `baseURL` of my page where baseURL is defined as `let baseURL = window.location.origin;`. Now the text and href of the shown link was set. At the end I made the box containing the link and the buttons(`<div id="linkbox" class="not-show">`) visible, by removing the not show class.

So, there are two buttons, one to copy the text and the other one to reset the form. To reset the form the function is really easy:

```JS
let clearLink = () => {
  toInput.value = "";
  fromInput.value = "";
  message.value = "";
  linkbox.classList.add("not-show");
};
```

Here I cleared all the values of the input field and made the box containing the generated links and buttons invisible.

Now let's see the other function - the one to copy links:

```JS
let copyLink = () => {
  let range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(generatedLinkBox);
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Link copied Successfully");
};
```

Here we create a range and then remove the previously selected things. Then I made the JavaScript select the generatedLink and copy that. At the end, I created an alert to inform the user of the successful copy was done.

Now, the feature I need is to redirect the user to the base URL if there is no to or form mentioned. For that, I used the queryObject:

```JS
if (queryObject.to && queryObject.from) {
  card.classList.remove("not-show");
  formContainer.classList.add("not-show");
}
```

This code tells the Javascript to render the card if there is **to** and **from** mentioned, otherwise, render the form to create a new card.

```JS
if (queryObject.to && queryObject.from) {
  card.classList.remove("not-show");
  formContainer.classList.add("not-show");
}
```

As I added a new button to let the receivers of the card make one for someone else(`<button onclick="makeLink()">Create your own</button>`) so I need to define the `makeLink()` function. It was as easy as replacing the `window.location` like so:

```JS
let makeLink = () => {
  window.location.replace(baseURL);
};
```

And yay, the app is ready. See it [here](https://2020-is-coming.netlify.com/)

## What could have I improved?

There are some things I could have improved, but due to timing constraints, I could not -

1. Shorten the links.
2. Give the users the freedom to change the header and the picture.
3. Maybe changing option for the year.
4. Let the users download the card as an image.
5. Added some snowflakes. I liked [this](https://www.youtube.com/watch?v=_ARGxz_cU_o) tutorial
6. Maybe added a Favicon🤔

Link to the final website: [link](https://2020-is-coming.netlify.com/)

Here is the [GitHub Repo](https://github.com/AyushmanBilasThakur/newyearcard/). Make changes and comment below with your repo link for others to see your changes.

<style scoped>
h1,h2,h3,h4,h5,h6{
    font-family: "Montserrat Alternates", sans-serif;
}

pre{
    background: #011627 !important;
    z-index: 0;
}

pre *{
    background: transparent !important;
    text-shadow: none;
    color: #d6deeb;
    
}

.dark-mode p, .dark-mode li{
    color: #bbb;
}

img{
    width: 100%;
}

p, li{
    color: #222;
}
li{
    margin-left: 20px;
}



</style>
