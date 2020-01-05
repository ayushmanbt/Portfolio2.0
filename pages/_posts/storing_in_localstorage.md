---
title: A Simple Bookmarker App with LocalStorage
date: 2020-01-04
layout: default
slug: bookmarker-with-localstorage
desc: There is a feature called localStorage in the browsers, which can be used to store client side data. So, you won't always need a server to store data from user. So, using this feature, we are going to make a site bookmarker app.
main_img: /localstorage_bookmark_app/thumbnail.png
tags: LoaclStorage, HTML5, JavaScript, JS,
---

There is a feature called localStorage in the browsers, which can be used to store client side data. So, you won't always need a server to store data from user. So, using this feature, we are going to make a site bookmarker app. But before that, let's know what localStorage is:

## Understanding the concept of localStorage

LocalStorage is storage provided by browser for webpages. We, as developers can use localStorage to store some user preference. And according to me, the less you use server the better.

> "The less you use server the better" - Ayushman, 2019.😂

But there are some disadvantages of localStorage:

1. If the user deletes browser data then this data will be deleted.

2. The data stored stays specific to that web browser.

Some uses of localStorage:

1. Store refresh token for users(refresh token is a token provided by the server to refresh JWT token provided by server. JWT token is used for user authentication.)

2. Store user preferences like the light/dark theme preference. Don't know how to do a light/dark theme toggle. Read [this post](https://www.ayushmanbthakur.com/posts/light-dark-toggle).

## Getting started, the markup and the style

As this project is mostly JavaScript based, so I won't give much attention to the markup and styling, but can't leave the project looking horrible as well. So, here is a quick run through of the HTML and CSS of the website.

I made the markup quickly, and I will say, it doesn't look super awesome, but it works fine. The HTML:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bookmarks</title>
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <div class="fullscreen">
      <nav>
        <div class="container">
          <h1 class="title">A simple bookmarker</h1>
          <div class="right">
            <a target=":blank" href="https://www.ayushmanbthakur.com/blog"
              >Read the original post</a
            >
          </div>
        </div>
      </nav>

      <div class="container">
        <form>
          <input type="text" id="site_name" required placeholder="site name" />
          <input type="text" id="site_url" required placeholder="site URL" />
          <input type="submit" value="Add This Site" />
        </form>

        <div id="siteList">
          <div class="site">
            <h3>Dummy Site Title</h3>
            <div>
              <a href="#" class="btn">Visit Site</a>
              <div class="del btn" onclick="del(id)">Delete</a>
            </div>
          </div>
          <div class="site">
            <h3>Dummy Site Title</h3>
            <div>
              <a href="#" class="btn">Visit Site</a>
              <div class="del btn" onclick="del(id)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

At first, in the head I declared the title of the site to be bookmarks and linked the stylesheet to the page. Next, in the body I created a div wrapping up the whole markup of the webpage(as I personally don't like applying styles to the body tag). Next, I created the navbar. And after that, there is the form which will be used to get all the submission from the user. The fields in this form are made required so that users can't giv empty response. The inputs are given IDs for ease of access from javascript. After that I created a div with the id of _siteList_. This div will be later populated with bookmarked sites via javascript. But, for now I created a dummy markup for the card of each bookmarked site.

In the markup of the card I created a wrapping div with a class of site. Then, inside the div there is an _h3_ for the site title given by the user. And there are two buttons for _visit site_ and _del_. In the del function we will pass in the ID of the site, so that later when it is dynamically filled up, it is easier to delete those. At the end the script was linked to the page.

Now it was the time to style the page:

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

.right {
    margin-left: auto;
}

.right a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}

a:hover {
    cursor: pointer;
    color: yellow;
}

form {
    width: 100%;
    margin: 0 auto;
    max-width: 600px;
}

input {
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin: 30px 0;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: whitesmoke;
    border-bottom: 2px solid orange;
}

input::placeholder {
    color: #ccc;
}

input[type="submit"] {
    border: 2px solid orange;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
}

input[type="submit"]:hover {
    background-color: orange;
    color: black;
    cursor: pointer;
}

.siteList {
    margin: 20px;
}

.site {
    border: 2px solid white;
    max-width: 600px;
    padding: 40px 40px;
    margin: 20px auto;
    border-radius: 20px;
}

.site h3 {
    font-size: 2rem;
    margin-bottom: 20px;
}

.btn {
    display: block;
    text-decoration: none;
    padding: 10px 20px;
    margin: 20px 0;
    color: white;
    border: 2px solid greenyellow;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 20px;
    ;
}

.btn:hover {
    color: black;
    background: greenyellow;
}

.del {
    border: 2px solid red;
}

.del:hover {
    color: white;
    background-color: red;
}
```

I started off with resetting the margins and padding, making the box size border box, and setting the default font to 'Gill Sans' and fallback font to calibri. After that the design of the nav design is similar to the nav used in my light/dark theme toggle project, which you can read [here](https://www.ayushmanbthakur.com/posts/light-dark-toggle).

As, this post is not about styling I would recommend you to style your own version for this project. My version looks something like this:

![](/localstorage_bookmark_app/markup_complete_01.png)

Now, with that sorted let's move to the meat of this project, the **JavaScript**

## Javascript part of the project.

To start with I will be hard-coding the bookmarks in the javascript and showing them dynamically in the webpage:

To start with I created the list:

```JS
let sites = [
    {
        id: 0,
        site_name: "Google",
        site_link: "https://www.google.com"
    },
    {
        id: 0,
        site_name: "Ayushman's Site",
        site_link: "https://www.ayushmanbthakur.com"
    }
]
```

Now, the next step is to get the div where we are going to show our websites. If you can recall, I gave that _div_ an id of _siteList_.

```JS
// Declaration of sites
let siteList = document.querySelector("#siteList");
```

Now the next step will be to render the _sites_ inside our siteList component:

```JS
// all the previous code
sites.forEach(site => {
    siteList.innerHTML += `
    <div class="site">
        <h3>${site.site_name}</h3>
        <div>
            <a href="${site.site_link}" target=":blank" class="btn">Visit Site</a>
            <div class="del btn" click="del(${site.id})">Delete</div>
        </div>
    </div>
    `
})
```

Here, I looped through the sites using the forEach loop. In the loop I just added some HTML to the siteList component. The HTML markup is the markup I used to denote each dummy site card. Using template string to show up the site_name, site_link and pass the id to the delete function. Now delete the dummy placeholder site cards. Now, the site looks like this:

![](/localstorage_bookmark_app/markup_02.png)

The next step will be to make the delete function work. This will be really easy to do. For that, to ensure the re-render of the list. I will at first declare a function for the render:

```JS
const render = () => {
    siteList.innerHTML = "";
    sites.forEach(site => {
        siteList.innerHTML += `
        <div class="site">
            <h3>${site.site_name}</h3>
            <div>
                <a href="${site.site_link}" target=":blank" class="btn">Visit Site</a>
                <div class="del btn" onclick="del(${site.id})">Delete</>
            </div>
        </div>
        `
    });
}
```

So, at first I cleared out the previous innerHTML of siteList here, so that with each render the list does not pile up on the previous render. Then I did the loop stuff as normal. After this I needed to call the render function once for the initial render.

So, now the deletion function. Here, with the passed in id I used the higher order array function - filter, to filter out the one with that id. This filter function iterates through each element and the callback function passed to it needs to return true or false stating whether the element should be on the updated list or not. The final list is returned and stored in the sites list. Now as the list is updated we need to call the render function to render out the list in HTML. So, the code looks like this:

```JS
let del = (id) => {
    sites = sites.filter(site => site.id !== id)
    render();
}
```

And, the site works like this:

![](/localstorage_bookmark_app/deleting_sites.gif)

Now, we need to make the form working. For that at first I will get the form and it's fields. I will add an eventListener for submit to the form and on submit I will take the input values, construct a new object with it and push it to the list of site. And finally ask the site to render the siteList. So, the code looks like this:

```JS
let form = document.querySelector("form");
let siteName = document.querySelector("#site_name");
let siteLink = document.querySelector("#site_url");

form.addEventListener("submit", e => {
    e.preventDefault();
    let siteObject = {
        id: sites.length,
        site_name: siteName.value,
        site_link: siteLink.value
    }
    sites = [siteObject, ...sites]
    siteName.value = ""
    siteLink.value = ""
    render();
})
```

We need to preventDefault so that form submission does not refresh the page. Here, I had to manually reset the input fields so that it gets ready for the next submission. So, now the site works like this:

![](/localstorage_bookmark_app/adding_item.gif)

Now we can add sites and as well as delete them. But as soon as I hit the refresh button the saved things are lost.

![](/localstorage_bookmark_app/change_unsaved.gif)

The solution, the localStorage.

## Using LocalStorage

In localStorage, you can store values against some keys, but the only values which are allowed are strings. So the solution will be to use JSON.stringify.

So, the first step will be to get the value created. For that, trying to read a value form localStorage will be like this:

```JS
let sites = JSON.parse(localStorage.getItem('sites')) || [];
```

This line says, if you can find the item with an ID 'sites' in localstorage then good, otherwise use an empty array. We needed to use JSON.parse as localStorage stores everything as a string.

Now, after adding a new item or deleting an item we need to store the updated sites value in the localStorage. For the most of the times, we call render after a value update of the sites. So, it will be nice to define the statement there. It is also a one line code with _localStorage.setItem()_

```JS
const render = () => {
    //REST OF THE RENDER CODE
    localStorage.setItem("sites", JSON.stringify(sites))
}
```

So, it is the time of the final test. I have opened up the chrome dev tools with _ctrl + shift + i_ and have then headed to the application tab and then to the localStorage:

![](/localstorage_bookmark_app/opening_localstorage_chrome_devtools.png)

Now our app works just as intended:

<video width="560" height="240" controls class="thumbnail">
<source src = "/localstorage_bookmark_app/final_video.mp4" >
</video>

## Conclusion

So the app is ready, but there are a lot of features we can implement, like:

1. Showing some cool animation
2. Use the light/dark mode toggle I made on the previous post.
3. Give a dedicated delete all button.
4. Turn this app into a chrome extension, which I might do for the next post.

My code is available at [codepen](https://codepen.io/Ayushman_Bilas_Thakur/pen/LYEOKNq). This is the first app I have kept in codepen. I would appreciate if you comment below with your own version of this app.
