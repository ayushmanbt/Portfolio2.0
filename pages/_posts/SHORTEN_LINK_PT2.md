---
title: Link Shortener Pt. 2 - Using Routers, Handlebars and Making a Simple FrontEnd
date: 2020-01-02
layout: default
slug: link-shortener-frontend
desc: Let's make a simple frontend for our URL shortening service using Handlebars, and let's sanitize the code a bit by creating separate router file
main_img: /shorten_link_pt2/thumbnail.png
tags: link_shortener, node.js, express, handlebars,
---

So, in my [previous post](https://www.ayushmanbthakur.com/posts/link-shortener-backend) we created an express backend to shorten a given URL via http get and post requests. But, handling http requests is not possible for everyone. So, today we will be making a frontend for our app. We will be using handlebars to make the frontend. Using handlebars let us avoid the CORS issue.

To start with, I highly recommend to read my [previous post](https://www.ayushmanbthakur.com/posts/link-shortener-backend) or to start with my [initial github repo](https://github.com/AyushmanBilasThakur/link_shortener).

## Sanitizing our app.js

Currently, our app.js looks messy and unorganized. So, let's just organize it a little bit. Let's create a new folder in the root of the project named _routers_. In this folder we can keep our router files which will make our code for view routes and api routes separate. For that, in the project root I created a new folder named **routes**. There I create api.js. There, at first I Imported _express_. Then I initialized the router component by calling _express.Router()_. After this, we need to export the _router_ by using _module.exports = router_.

After this we will need to configure the _router_ to receive get and post request as we did with _app_(const app = express(); app.get()...) in _app.js_ in the [previous post](https://www.ayushmanbthakur.com/posts/link-shortener-backend).

So, I brought in all the api related routes i.e. **/api/create** POST request and **/api/all** GET request, and assigned them with this router in api.js. After that rearrangement the code looks something like this:

```JS
router.get("/all", (req, res) => {
  db.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(500).send({
        err
      });
    }
  });
});

router.post("/create", (req, res) => {
  if (req.body.URL) {
    let URL = req.body.URL;
    if (
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        URL
      )
    ) {
      db.findOne(
        {
          URL: req.body.URL
        },
        (err, fndURL) => {
          if (err) {
            res.status(500).send({
              err
            });
          } else {
            if (!fndURL) {
              let ID = shortid.generate();
              let shortenedLink = baseURL + "/api/" + ID;
              let URLobject = {
                ID,
                URL: req.body.URL,
                shortened_url: shortenedLink
              };
              db.insert(URLobject, (err, newObj) => {
                if (!err) {
                  res.status(201).send(newObj);
                } else {
                  res.status(500).send({
                    err
                  });
                }
              });
            } else {
              res.status(201).send(fndURL);
            }
          }
        }
      );
    } else
      res.status(400).send({
        msg: "Invalid URL passed"
      });
  } else {
    res.status(400).send({
      msg: "NO URL passed"
    });
  }
});

router.get("/:id", (req, res) => {
  db.findOne(
    {
      ID: req.params.id
    },
    (err, doc) => {
      if (err) {
        res.status(500).send({
          err
        });
      } else {
        res.redirect(doc.URL);
      }
    }
  );
});
```

You can notice that I removed the _/api_ part from my route string, as that will be handled in the _app.js_(scroll a little bit down to find out how). I brought in the GET request to "/:id" to here as it was causing some problems while sitting in the root.

Now the problem is, this piece of code depends on the connection to our nedb database. But our main app also needs access to that database as well. So, it will be wise to move that database connection code to a completely separate file. So in the project root I created a _db_connect.js_ file and pasted this code there:

```JS
const nedb = require("nedb");
const db = new nedb({
    filename: "./URLData.db"
});
db.loadDatabase(err => {
    if (!err) {
        console.log("db found/created successfully");
    } else {
        console.log(err);
    }
});

module.exports = db;
```

At the end of this code the database was exported so that I can require that db variable in other files.

Back to _api.js_ where I bring in the _shortid_ package and the database like this:

```JS
const shortid = require("shortid");
const db = require("../db_connect");
```

Now, if you notice carefully, there is a need of the baseURL variable here. But we don't have the port set in this file, that's set in _app.js_. So, the solution I came up with was to use the PORT variable from the environment variables. For that, I installed a package named **dotenv**:

```
npm i dotenv
```

After this I needed to create a _.env_ file in the root of the project where I declared the _PORT_ variable:

```
PORT=2020
```

So, now defining the baseURL variable was really easy. I had to just initialize dotenv like so:

```JS
require("dotenv").config();
```

and declare baseURL like so:

```JS
const baseURL = process.env.baseURL || `http://localhost:${process.env.PORT}`;
```

So the api.js finally looked like this:

```JS
require("dotenv").config();
const express = require("express");
const shortid = require("shortid");

const router = express.Router();

const db = require("../db_connect");

const baseURL = process.env.baseURL || `http://localhost:${process.env.PORT}`;

router.get("/all", (req, res) => {
  db.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(500).send({
        err
      });
    }
  });
});

router.post("/create", (req, res) => {
  if (req.body.URL) {
    let URL = req.body.URL;
    if (
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        URL
      )
    ) {
      db.findOne(
        {
          URL: req.body.URL
        },
        (err, fndURL) => {
          if (err) {
            res.status(500).send({
              err
            });
          } else {
            if (!fndURL) {
              let ID = shortid.generate();
              let shortenedLink = baseURL + "/api/" + ID;
              let URLobject = {
                ID,
                URL: req.body.URL,
                shortened_url: shortenedLink
              };
              db.insert(URLobject, (err, newObj) => {
                if (!err) {
                  res.status(201).send(newObj);
                } else {
                  res.status(500).send({
                    err
                  });
                }
              });
            } else {
              res.status(201).send(fndURL);
            }
          }
        }
      );
    } else
      res.status(400).send({
        msg: "Invalid URL passed"
      });
  } else {
    res.status(400).send({
      msg: "NO URL passed"
    });
  }
});

router.get("/:id", (req, res) => {
  db.findOne(
    {
      ID: req.params.id
    },
    (err, doc) => {
      if (err) {
        res.status(500).send({
          err
        });
      } else {
        res.redirect(doc.URL);
      }
    }
  );
});

module.exports = router;
```

Now you will be wondering what will happen in _app.js_ now. So for that here is the updated _app.js_:

```JS
require("dotenv").config();
const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

So, here the first noticeable change is: dotenv was initialized and the PORT variable was set to _process.env.PORT_, instead of _process.env.PORT || 2020_.

Another change is that, all the code related to handling '/api/\_\_\_' was removed. Now as they are now handled by _router_ exported from _api.js_ so we imported _api.js_ like so:

```JS
const apiRoutes = require("./routes/api");
```

and asked our _app.js_ to use this apiRoutes for any request to '/api/':

```JS
app.use("/api", apiRoutes);
```

and the final change in this file is to remove all the database connection code, as we don't need that here anymore.

Now if you run the app, your app will run the same as it was running.

## Setting up Handlebars and showing our first page

Installing handlebars is really easy -

```
npm i express-handlebars
```

Now in _app.js_ we will need to initialize handlebars, and it is done like so:

```JS
const hbs = require("express-handlebars");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);
app.set("view engine", "hbs");
```

What this piece of code is doing is that it is bringing in the express-handlebars package and then storing it as **hbs**.
In the next line, the app engine is set to "hbs", and the second parameter is the initialization of **hbs** with an object mentioning the _extname_(extension name, here set as _hbs_), _defaultLayout_(the default layout to use while rendering the pages, here set to use _default.hbs_), _layoutsDir_(directory to find the layouts) and _partialsDir_(directory for the partials). Now this "hbs" engine is set to be the "view engine" in the next line.

Now let's render our first handlebars page. Remember, in previous post, we showed a response of normal text saying "Hello World". Let's now render a handlebars page instead of that. But before that, let's configure our views folder.

The folder structure of views look something like this:

- views
  - layouts (it is for the layout files)
    - default.hbs (the default layout configured)
  - partials (for storing the partial files like footer)
  - home.hbs (the file which will be later responsible for the view shown in '/')

Now, the basic HTML stuff is to be done in the default layout, which will be used by all the other layouts. It is to ensure the principle of coding: **_write once, use everywhere_**

So, I configured the _default.hbs_ like this:

```handlebars
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Shorten URL App</title>
</head>

<body>
    {{{body}}}
</body>

</html>
```

Now, I set the **home.hbs** to show _hello world_ in h1 tag:

```handlebars
<h1>Hello World</h1>
```

Now it was the time to show this page instead of the hello world shown in &lt;pre&gt; tags. That is really easy, we just need to use the render function instead of send function:

```JS
app.get("/", (req, res) => {
  res.render("home");
});
```

This will render the _home.hbs_.

![](/shorten_link_pt2/hbs01.png)

Now I want to include a style file. But in express, we need to first define static folder to do so. For that, using this piece of code will be enough:

```JS
app.use("/static", express.static("public"));
```

Now let's create a public folder in the project root and in that folder let's have a _style.css_ file in it.

In that file, for now, we will reset the margin and padding and set the box sizing to border box and set the font family to something cool:

```CSS
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
```

To link the css in our layout used this code:

```handlebars
    <link rel="stylesheet" href="/static/style.css">
```

And now the page looks like this:

![](/shorten_link_pt2/hbs02.png)

Now let's make our form to create the shortened link.

## Creating the form and sending POST request via Fetch API to create shortened links

I changed up the markup of the homepage to include a form at this point. The markup now looks like this:

```handlebars
<div class="container">
    <h1>URL Shortener</h1>

    <form>
        <input type="text" name="URL" id="URL" placeholder="enter thee URL"/>
        <input type="submit" value="Generate shortened link">
    </form>

    <div>
        <a href="" id="shortenLink"></a>
        <p id="error"></p>
    </div>
</div>
```

Now, to handle the submission of this form I included a script in this file in script tags:

```handlebars
<script>
    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();
        URL = document.getElementById("URL").value
        shortenLinkP = document.getElementById("shortenLink")
        errorP = document.getElementById("error")
        data = {
            URL
        }
        const response = await fetch("/api/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res_json = await response.json()
        if (!res_json.msg) {
            shortenLinkP.innerText = res_json.shortened_url
            shortenLinkP.href = res_json.shortened_url
            errorP.innerText = ""
        }
        else {
            errorP.innerText = res_json.msg
            shortenLinkP.innerText = ""
        }
    })
</script>
```

Here, at first, I query selected the form and added an eventListener to listen to the _submit_ event. The asynchronous(_async_) callback function was passed with a parameter _e_ denoting the event. So in the function, at first the default behavior of the form submitting to itself was prevented - _e.preventDefault();_. After that we had to get the value of the URL input in the input field with the id of _URL_(URL = document.getElementById("URL").value).

After this I selected the paragraphs, one for showing the shortened URLs and another one for showing the errors returned error from the server. After this, the data object was created with the URL value. Then we used fetch API to send a POST request to our "/api/create" with the request type set to POST, the body set to stringified version of the _data object_ and header set to show that JSON data was sent. If you want to know more about Fetch API, read [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

After this we awaited to convert the response to json object and stored it in _res_json_.

If you have read the [previous post](https://www.ayushmanbthakur.com/posts/link-shortener-backend) then you will know that if the response from server contained a _msg_ property then there was some error. Otherwise, there was the shortened link sent back. So we did just that, by checking if there was a msg property in _res_json_. If there was, then the _errorP_ was updated with the error. Otherwise the shortenLinkP was updated with the link in both href and the text. I also made sure that error and the shortened link don't show up together.

The UI was looking a bit bad so I added some CSS.

```CSS
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container {
    max-width: 500px;
    width: 90vw;
    margin: 20px auto;
    text-align: center;
}

input {
    display: block;
    width: 70%;
    padding: 10px 20px;
    margin: 10px auto;
}

input[type="submit"]:hover {
    cursor: pointer;
}

#error {
    color: red;
    font-weight: bold;
}
```

The final app now looks like this:

![](/shorten_link_pt2/link_shortener_2.gif)

## Hosting

With some documentation set in the HTML view, I will be hosting this app really soon, will mention that in the comments. The final code is in GitHub [Here](https://github.com/AyushmanBilasThakur/link_shortener_simple_frontend)

## Conclusion

There are still some ways, in which the frontend of the app can be improved. The most obvious two choices will be:

1. Showing all the shortened URL in the homepage. For doing this it will be better to store the name of the webpages with their URLs

2. Handling the form input errors in client side. It is not always good to rely on the server to send the errors, there should be some client side verifications as well

It will be nice if anyone can create the versions with the updates I mentioned and comment it down for others to see.
