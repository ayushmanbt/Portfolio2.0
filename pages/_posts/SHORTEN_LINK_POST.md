---
title: Link Shortener Pt. 1 - Backend with node.js
date: 2020-01-01
layout: default
slug: link-shortener-backend
desc: Let's make a simple backend with node.js and express which will help us to shorten links
main_img: /shorten_link_backend/thumbnail.png
tags: link_shortener, node.js, express,
---

# Link Shortener Pt. 1 - Backend with node.js

<div style="width: 100%; display: flex">
<img src = "/shorten_link_backend/thumbnail.png" class="thumbnail">
</div>

I'm currently writing 31 posts in 31 days, and this is the post of day 2. Yesterday I made a post about making [personalized New Year's card](https://www.ayushmanbthakur.com/new-year-personalized-card). There I mentioned having the URL shortened will be nice. So, in this post we are going to make an URL shortener together. For this, we will need a database to store the shortened link, a backend API, and if possible a simple FrontEnd service. Without further adieu, let's jump right into making the app. In this post we will be going through the process of making the API for shortening links. In the next post I will be making the FrontEnd.

## Step 01: Installing the required packages

To begin with, we need a backend service. I will build that service with Node.js and Express. We will also need a database to store the shortened links. So the packages I will need are -

1. Express (for creating the server)
2. UUID (for generating ID ,for database)
3. Nodemon (so that I don't need to re-run the server after file change)
4. NeDB

I will be exploring NeDB for my database. It will provide basic functionalities required.

## Step 02 Starting the project

To start the development of the app I will create a folder and run the command:

```
npm init -y
```

Having this -y will initially initialize the project with a **package.json**. If there is any problem executing this command then you will need to install node.js form [nodejs.org](https://nodejs.org)

Now, let's install **express**:

```
npm i express
```

Here _i_ is the shorthand for _install_. Previously in npm we needed to mention the flag _--save_ to add it to **package.json** list. With latest version of node.js and npm that is presumed by npm.

I will also install **nodemon** at this moment:

```
npm i -D nodemon
```

here the flag -D lets us to have nodemon as development dependency, i.e. in production this package won't be installed. After this the **package.json** will look like this:

```JSON
{
  "name": "shorten_link_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
```

After this, I need to update the **package.json** to include a _start_ and a _dev_ script. So I changed the _scripts_ part of the **package.json** from this:

```JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

to this:

```JSON
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
}
```

As from this, if you are smart enough you can assume that we need an **app.js** in our project directory. So let's create that and start up our server.

To start with, I will be importing express and creating an app and make that app to listen to a port:

```JS
const express = require("express");

const app = express();

const PORT = process.env.PORT || 2020;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

Here I used `process.env.PORT || 2020` to let our app use the port number available in process environment or our hard-coded port that is ironically set to _2020_ for New Year celebration😉. At the end

Let's now run our app with our _dev_ script:

```
npm run dev
```

If everything goes right you will see the message _Server running on port 2020_. Now if we visit _localhost:2020_ we will see _Cannot GET /_ as we have not set any response for hitting an URL in the server. So, the next step will be to create a response to a 'GET' request to '/' route.

It is as easy as doing an **app.get()** for the "/" route. This function takes the route as string and a callback function with two values passed in: **request** and **response**. Using these two things we can do different things with the request incoming to the server and the response outgoing from the server. So, we will use the response parameter to call a function **send()** to send our response. Let's just send a "Hello World" text at "/" route.

```JS
app.get("/", (req, res) => {
    res.send("Hello World");
});
```

At this point, let me explain all the types of request you can send to a server.

## Types of server requests

**GET Request**: GET requests are requests generally sent to server to get resources. Your browser normally sends **GET** request

**POST Request**: POST requests are requests for asking the server to add new records or delete or change records. But we also have **DELETE** request for deleting stuff from database, **PUT** request for updating already added values.

Now, let's get back to making our URL shortener.

## The next workflow: The POST request to create the new URL

At this point, we need to receive the URL sent by the user to shorten in the server, assign a shortened id to it and store the shortened ID in our database. Let's take it take step by step.

At first, let us create a POST endpoint at '/api/create/':

For that, we will need a middleware provided by express called **express.json()**. For those who don't know anything about middleware, these are some special functions which pass each request sent to a server through them before doing a GET or POST action. So to initiate the middleware we need to use this statement:

```JS
app.use(express.json());
```

In express to use middleware functions we use **app.use()** function, and pass the function to execute. You can also create your own custom middleware function and there are also other ways to execute middleware functions, which are beyond the scope of this post.

So now we can get the body of the POST requests. Let's just do a simple thing- get the URL sent via post request and return that URL:

```JS
app.post("/api/create", (req, res) => {
    res.send({
        URL: req.body.URL
    })
})
```

Here we take the request body and get the URL sent and send it as a response. So now the _app.js_ looks like this:

```JS
const express = require("express");

const app = express();

const PORT = process.env.PORT || 2020;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/create", (req, res) => {
    res.send({
        URL: req.body.URL
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
```

Now, as I told you before, POST request can't be handled by browser, so we will use a program named [postman](https://www.getpostman.com/)

So, open up postman and send post request to _localhost:2020/api/create_ and make sure to note these points:

![](/shorten_link_backend/request_via_postman_01.png)

## Checking the URL if it is valid

So, at this point, our server is receiving the POST request with the URL sent. Now we need to verify if the URL is valid, only then we will add it to our database.

I will be using RegEx to verify if an URL is valid or not. So after a bit of Google search I was finally able to write this code

```JS
/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
```

this will check the URL via regex and return _True_ or _False_ based on the value passed in. So, the next step was to update the code of POST request handling route - _/api/create_:

```JS
app.post("/api/create", (req, res) => {
    let URL = req.body.URL;
    if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(URL))
        res.status(201).send({
            URL: req.body.URL
        });
    else
        res.status(400).send({
            msg: "Invalid URL passed"
        })
});
```

Here, in the beginning I extracted the URL from the request body. After that I used the regex to check if a valid URL was passed in the POST request. If yes, then with the status code 201(Created) at this point I send back the passed in URL or else with status code 400(Bad Request) I send back a message of invalid URL passed. If you want to know more about HTTP status codes, You can read it [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

Now it ts the time to test out if our _/api/create_ route is working or not.

If we send valid url then I get a valid response:

![](/shorten_link_backend/Valid_request_01.png)

If invalid URL is sent:

![](/shorten_link_backend/invalid_request_01.png)

Now there is still one kind of error left, and that is if the URL parameter is not sent in the request body. For that I enhanced my code:

```JS
app.post("/api/create", (req, res) => {
    if (req.body.URL) {
        let URL = req.body.URL;
        if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(URL))
            res.status(201).send({
                URL: req.body.URL
            });
        else
            res.status(400).send({
                msg: "Invalid URL passed"
            })
    } else {
        res.status(400).send({
            msg: "NO URL passed"
        })
    }
});
```

Here in JS I simply asked if _req.body.URL_ exists. If yes, then I let the previous code to execute, or otherwise I send a status code of 400 with the message of _NO URL passed_. Here is how it looks:

![](/shorten_link_backend/invalid_request_02.png)

## Generating an ID for the URL

So, up until now we are having the URL and returning it. Now it is the time for the real meat of this project - generating the ID for the link i.e. generating the shortened link. For generating the random ID I will be using a NPM package named shortid. It generates short random IDs, which I think will be enough for our small app.

```
npm i shortid
```

No, we need to import shortid in our project. I will import it just under express import like this:

```JS
const express = require("express");
const shortid = require("shortid");
...
```

Now, if the URL is valid we will generate an ID and also return that ID with our response:

```JS
let ID = shortid.generate();
res.status(201).send({
    ID,
    URL: req.body.URL
});
```

Here I used the es6 notation for :

```JS
{
    ID: ID
}
```

After this response the response for valid POST request looks like this:

![](/shorten_link_backend/valid_request_02.png)

Now, as currently we don't have any frontend so it will be nice to have the generated URL sent with the response as well. For that I will be declaring baseURL at the initialization of the app:

```JS
...
const PORT = process.env.PORT || 2020;
const baseURL = process.env.baseURL || `http://localhost:${PORT}`;
...
```

Here I left an option for the baseURL to be set in the process.env, for production purposes, otherwise it will be set to localhost, in the **PORT** number set in the line before.

Now to send the shortened URL we will need this code:

```JS
let ID = shortid.generate();
let shortenedLink = baseURL + "/" + ID;
res.status(201).send({
    ID,
    URL: req.body.URL,
    shortened_url: shortenedLink
});
```

Now the response looks like this:

![](/shorten_link_backend/valid_request_03.png)

If you are reading minutely then you will notice that we got two different IDs for the same URL. At this point we will need a database. I will use the lightweight **nedb**.

```
npm i nedb
```

Now, to use nedb we need to import it:

```JS
const express = require("express");
const shortid = require("shortid");
const nedb = require("nedb");
...
```

After this we need to initialize the database:

```JS
const db = new nedb({ filename: "./URLData.db" });
db.loadDatabase(err => {
  if (!err) {
    console.log("db found/created successfully");
  } else {
    console.log(err);
  }
});
```

Here, at first we create a new nedb instance with an object passed in containing the name of the file to be used to store data. This instance is stored in the constant named _db_.

After this, the db is loaded with the function **db.loadDatabase()**. This function takes in a callback function. This callback takes in an error object. So, I simply determined whether there was any error or not. If there was any error I console logged it, otherwise I consol logged the successful connection.

Now it was the time to store our data in the database. So, the code after determining that a valid URL was passed, was changed a bit:

```JS
let ID = shortid.generate();
let shortenedLink = baseURL + "/" + ID;
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
```

So here, I created an **URLobject** with the _shortid_ generated id, the shortened link and the full URL passed in. Next, I inserted this object in the db with the function **db.insert()** which takes the object to be inserted and takes in a callback. This callback has two parameters - the error and the object stored.

Next, I defined the callback, where, if any error was found status code 500 was sent with the error passed as the response object, otherwise, a status code of 201 was sent with the newObject as the response. Now the response will look similar to this:

![](/shorten_link_backend/db_added_01.png)

Now if we send this request again then we will have another record in the name of same URL. We can't let that happen, to save storage.

## Prevention of duplicate URL insert

So, before inserting, we need to check, if the URL is already present in our DB. For that we will use **db.findOne()**, which will return one instance with the URL if present in db. **db.findOne()** takes a query object as its first argument. This object has the key and the value to match with.

The second argument is a callback function with error and the document found with the given properties matching. If no error then if the document is null then there is no instance of that URL in the database, otherwise it does exist.

Now, if the URL exists it will be wise to return the object that was found. So, the updated code will look like this:

```JS
db.findOne({ URL: req.body.URL }, (err, fndURL) => {
    if (err) {
        res.status(500).send({
            err
        });
    } else {
        if (!fndURL) {
            let ID = shortid.generate();
            let shortenedLink = baseURL + "/" + ID;
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
});
```

Now, if we send the same URL again we will have the previous response:

![](/shorten_link_backend/db_added_01.png)

## Final Task: Redirecting to the original URL from the shortened link

So, now the only task left is to take the GET request from the shortened link and redirect to the original link. This is fairly easy. To start with we will need to capture get request at '/:id', here the _:_ indicates the dynamic nature of the id.

Here, one thing to note is that express parses in a _waterfall manner_ so if we place the URL check of '/:id' above all other response functions, then it won't let us to access other GET routes. So, be careful about placing such dynamic route handling functions.

To access the parameters passed in our request we use

```JS
req.params.param_name
```

In express, to redirect to another URL it is as easy as writing

```JS
res.redirect(URL_TO_REACH)
```

So, with this knowledge in hand and the previous knowledge of finding one document based on a query object we can now construct the GET function to ":/id":

```JS
app.get("/:id", (req, res) => {
  db.findOne({ ID: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.redirect(doc.URL);
    }
  });
});
```

Now, let's open our website with the shortened URL stored:

![](/shorten_link_backend/final_product.gif)

So, our URL shortener works.

## Bonus: Show all URLS at '/api/all'

It will be as easy as returning with the **db.find()** function:

```JS
app.get("/api/all", (req, res) => {
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
```

The final version of the app.js looks like this:

```JS
const express = require("express");
const shortid = require("shortid");
const nedb = require("nedb");

const app = express();

const PORT = process.env.PORT || 2020;
const baseURL = process.env.baseURL || `http://localhost:${PORT}`;

const db = new nedb({ filename: "./URLData.db" });
db.loadDatabase(err => {
  if (!err) {
    console.log("db found/created successfully");
  } else {
    console.log(err);
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/all", (req, res) => {
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

app.post("/api/create", (req, res) => {
  if (req.body.URL) {
    let URL = req.body.URL;
    if (
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        URL
      )
    ) {
      db.findOne({ URL: req.body.URL }, (err, fndURL) => {
        if (err) {
          res.status(500).send({
            err
          });
        } else {
          if (!fndURL) {
            let ID = shortid.generate();
            let shortenedLink = baseURL + "/" + ID;
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
      });
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

app.get("/:id", (req, res) => {
  db.findOne({ ID: req.params.id }, (err, doc) => {
    if (err) {
      res.status(500).send({
        err
      });
    } else {
      res.redirect(doc.URL);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Hosting

I don't think myself capable of explaining the process of hosting,, but I myself hosted this app on [glitch](https://glitch.com). In glitch I went to the **new project** button and selected the **hello-express** option. There I updated the **server.js** with the code written in this project and updated the package.json with this project's package.json and replaced app.js with server.js in package.json. Finally in the .env I updated the value of baseURL. And thus my app was live on glitch. Try it on [https://abt.glitch.me](https://abt.glitch.me)

## Conclusion

This is not the conclusion of the project. As a part of my #31days31posts, on next day I will be making a frontend for this app. If you want to see my complete code here is the [GitHub Link](https://github.com/AyushmanBilasThakur/link_shortener)

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
