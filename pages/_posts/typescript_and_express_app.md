---
title: Getting Started with TypeScript by making an Express REST API
date: 2020-04-05
layout: default
slug: typescript_express_rest_api
desc: TypeScript is an upcoming technology and a good way to learn typescript is to make a REST API with express and TypeScript
main_img: /typescript_express_app/thumbnail.png
tags: SCSS, SASS, CSS
---

I don't want to convince people to use TypeScript. I just was recently using TypeScript and that's why I wanted to build a simple Transaction Tracker Application. As the scopes of a blog post is not enough so I will be building the simple version of this app, with just the CRUD functionality in a REST API. There will be no database involved to keep this post within limits. So, without further adieu let's start rolling. But just before starting all the code in this project is available in this [github repository](https://github.com/AyushmanBilasThakur/TypeScript_Express_REST_API).

## Setting up the development environment

Maintained by Microsoft, TypeScript is a super set of JavaScript and our browsers can not understand this language. So, Typescript needs a compiler to compile it down to plain old JavaScript, understood by the browsers. To get started with TypeScript, you will need node.js installed in your computer. You can download node.js from [nodejs.org](https://nodejs.org/). After having node.js installed you will need the TypeScript compiler. To have this, just type this command:

```
npm install -g typescript
```

At this point, TypeScript compiler is installed, and you can check that via this command:

```
tsc -v
```

For me the output looks like this: **Version 3.8.3**. As long as a version is shown after this command, you are good to go. I am using [Visual Studio Code](https://code.visualstudio.com/) to write the code for this project.

## Starting the Project

Though I have recently found npm packages which can set up Express + TypeScript projects for us, but that gives an overwhelming amount of code. So we will be setting up the app from scratch. Trust me it is not that much difficult. But first, let me tell you how our app will work:

So, we will be implementing the basic CRUD operations for adding, editing, reading and deleting transactions done by the user. As I said before, we won't be using any database. That means the data will be stored in the program itself using an array of JavaScript objects. Now talking about the routes, there will be five routes there. I have listed them with the type of requests they will be accepting.

1. **GET Request _/api/transactions_**: Gives out a list of all the transactions added to the list.

2. **GET Request _/api/transactions/:id_**: Gives the single transaction with that id.

3. **PUT Request _/api/transactions/:id_**: Updates the single transaction with that id.

4. **POST Request _/api/transactions_**: Creates and adds a new post

5. **DELETE Request _/api/transactions/:id_**: Deletes the single transaction with that id.

Now let's get into setting up the folder structure.

So, First thing I did is created a new folder and initialized a node app with the command:

```
npm init -y
```

_quick tip: using -y with **npm init** lets us to skip all the questions._

Now we need to install some packages to get started. First of all, we obviously need **express** and I will recommend to have **UUID** for creating id for our expenses.

So, having these dependencies only is not enough, we will need some dev dependencies as well:

1. **@types/express:** for express specific type definition in typescript, which are known as interfaces in TypeScript.

2. **nodemon:** nodemon is an extension used to check for javascript code changes. It will keep our server code updated after each save.

3. **concurrently:** concurrently let's us run multiple commands together. In this app we will need concurrently to run tow commands together, which brings us perfectly to the next point, declaring the scripts.

## The required Scripts:

So we will need two main scripts and one more to run these two scripts together. These are mainly for development purpose, this is not a production app. The required scripts are:

1. **"start:dev"**: This script will be used to start the main development related stuff with nodemon, which will actually watch changes in the index.js, which will be created by our TypeScript file. As I told before, TypeScript needs to be compiled to JavaScript to be useful. So the script for _start:dev_ will be like:

```
nodemon dist/index.js
```

2. **build:dev**: This script will be used to build/compile the TypeScript files to JavaScript files. Later in this post, I will be discussing how the build will work and how to write the configuration for that. But for now, let's have a look at the script/command we will be using:

```
tsc --watch --preserveWatchOutput
```

So, let me explain this command a bit. _tsc_ is for TypeScript Compiler, then there are two flags -

a. watch : this makes the compiler to watch for any changes in the typescript files according to the configuration file we are going to write soon.

b. preserveWatchOutput: normally what **tsc** does is it clears the console on each code change, which actually removes important info from the console. That's where this flag comes in. This will keep all console outputs untouched.

3. **dev**: This will be the script which runs both the nodemon script for compiling TypeScript to Javascript and then serving the JavaScript. Here, we will be using concurrently to run two scripts together. The script/command will look like:

```
concurrently 'npm:build:dev' 'npm:start:dev'
```

So altogether the **package.json** will look something like this(note: the versions may vary):

```JSON
{
  "name": "transaction-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start:dev": "nodemon dist/index.js",
    "build:dev": "tsc --watch --preserveWatchOutput",
    "dev": "concurrently 'npm:build:dev' 'npm:start:dev'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "uuid": "^7.0.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.3",
    "concurrently": "^5.1.0",
    "nodemon": "^2.0.2"
  }
}
```

Now, let's create our configuration for TypeScript.

## Configuring the TypeScript Compiler

There are a few things we need to configure to get started with this project. In the project root directory(i.e where the package.json is) we need a _tsconfig.json_ to configure our TypeScript Compiler.

I have kept the compile settings really simple. to learn more about how to write tsconfig properly check out this [link](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). But for now let's go with the config I have written and tested:

```JSON
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "baseUrl": "./src"
  }
}
```

This will set up the compiler properly. Here we basically set the _compilerOptions_ here we set several properties:

1.  **target:** This sets the target version for the compiled JavaScript. Here I have set the version to _es6_. It can be set to: _es5_,_es6_ and many more. Reference the [documentation](https://www.typescriptlang.org/docs/home.html) to know more.

2.  **module:** This declares how to handle the imports and exports of modules. In ES6, the import and export statements were introduced. So by declaring that to _commonjs_, TypeScript compiler will change our import export statement to module import and module.exports.

3.  **outDir:** As the name suggests, this sets up the output directory for the compiled JavaScript. Here I have set the _./dist_ directory as the output directory.

4.  **baseUrl:** Base URL is the property which sets/points to the base directory, where we will be storing base URL. Here I have set the _./src_ directory as the output directory.

Now, with that out of the way we can start developing our app.

## Starting with the index.ts

So according to our setup, everything in the _./src_ directory with _.ts_ as extension will be compiled to JavaScript and will be stored in _./dist_. In our nodemon we have set _dist/index.js_ as our entry point, so we must need a _index.ts_ compiled to _index.js_ to get started. So let's make our _index.ts_ in the _src_ directory.

To start off with we need to import express. But there is the package _@types/express_ which makes the direct _import 'express'_ to throw errors. So the proper way to import express:

```ts
import * as express from "express";
```

Now we need to properly use the main feature of TypeScript, i.e using the types. So let's just import our types:

```ts
import { Request, Response, Express } from "express";
```

Now to initialize our app we need this code:

```ts
const app: Express = express();
const PORT: number = 4000;

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
```

As you can see, I have used the types by using a _:_ after the variable name, and that is how to declare a type of a variable in TypeScript.

Let's add a test route to check if I did everything properly:

```ts
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "api working properly" });
});
```

So, let's run our code for the first time. We need to just write _npm run dev_ to start. If everything goes right the last line of the console will be: 

`Listening to http://localhost:4000`

Now if we go to the address then we will get a response like this:

```JSON
{
  "msg": "api working properly"
}
```

Now, it is really easy to do GET requests from our browsers, but we will soon be doing POST requests to our server. But it is not possible for us to do a POST request to the route directly from a browser. So, it  will be the high time to use any REST client. The two best REST clients according to me are [Insomnia](https://insomnia.rest/) and [Postman](https://www.postman.com/).

With that part aside we can now start coding the rest of our REST API.

In this part we will be making our API routes. To keep our code clean I will be keeping all the Transaction related code in a separate file. So in the _./src_ folder we will be creating a new file _transactionHandler.ts_. Now let's start coding in transactionHandler.

The first thing to do will be to initialize and export the express router:

```TS
import * as express from "express"

const transactionRouter = express.Router();

export default transactionRouter;
```

Now, as you can remember TypeScript earns its name for the types it provides. So it will be proper to import the types:

```TS
import * as express from "express"
import { Router } from "express";

const transactionRouter = express.Router();

export default transactionRouter;
```

Let's now import this router and use it with our app. So in **index.ts** file:

```TS
//the import statement
import transactionRouter from "./transactionHandler"; 

//using the router for /api/ endpoints
app.use("/api", transactionRouter);
```

Now one thing to do at this point will be to make our app use the _express.json()_ middleware. So in our **index.ts** file:

```TS
//before defining the routes 
app.use(express.json())
```


Now, if you can remember the routes we talked about while starting, let's just implement those routes. Here, I will be defining the route handling functions separately. So after defining all the routes and their function the code will look like(in **transactionHandler.ts**):

```ts
//initiation of router here

transactionRouter.get("/transactions", getAllTransactions);
transactionRouter.get("/transactions/:id", getOneTransaction);
transactionRouter.post("/transactions", createTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);
transactionRouter.put("/transactions/:id", updateTransaction);

//export syntax here
```

So, from this code you can get that _getAllTransactions_ will be responsible for the response made when _GET_ request is made to the _"/transactions"_ router. Similarly, _getOneTransaction_ will response to _GET_ request to _"/transactions/:id"_ where the :id is responsible for dynamic routing i.e. we can access the value of _id_ provided in the route and response accordingly. Then there are _POST_, _DELETE_, and _PUT_ request at routes "/transactions" and "/transactions/:id" respectively to perform create, delete and update operations for this CRUD app using the functions _createTransaction_, _deleteTransaction_ and _updateTransaction_ function.

One thing to note here is that we are using this router for "/api" route in the _index.ts_ file. So all these routes with respect to base URL will look like

```(using localhost here)
http://localhost:4000/api/transactions
http://localhost:4000/api/transactions/:id
```

Talking about CRUD functionalities, we have not thought about how an object containing all the data about transactions will look like. Now, the advantage of TypeScript is that we can create our custom data type i.e interface for any object we are going to work with. Having this interface declared helps us with suggestions in some properly configured IDEs and also prevents us from forgetting what properties we require for that object. So, let's create the interface for representing a single transaction. For defining the interface we will be creating a new file _transaction.ts_ in a folder called _interfaces_ in the _src_ directory.

Our transaction will require an id, a name, an amount and a property denoting if it was a credit or a debit. Now there is another feature in TypeScript which lets us to use enumerators. The enum will be useful to adjudge the transaction type. So, the enum will look like(in _transaction.ts_):

```TS
export enum TransactionType {
  Expense = -1,
  Earning = +1
}
```

Here two main things to notice are: 
1. exporting the transaction type enumerator, as this will be useful for creating and updating transaction. 

2. The values of these enumerators are set to +1 and -1 as if we do calculations in future then just multiplying with these values will be enough. One thing to note about enumerators is that enumerators place the values they are representing instead of their names, enumerators just are there for making the code easy to understand.

Now, let's create the interface for transaction and export it(in *transaction.ts*):

```TS
//after defining the enum
export interface Transaction {
  id: String;
  name: String;
  amount: Number;
  type: TransactionType;
}
```

One thing which I have not done for this application but I felt like the readers of this post should be informed about is, in TypeScript interface definition you can make a field optional by adding a _?_ after its name. For example

```ts
interface human{
  firstName: String;
  middleName?: String;
  lastName: String;
}
```

This piece of code makes the middle name not required.

As I told before, we won't be using a database to store our data. So, let's get back to our **transactionHandler.ts** and create an array consisting of data of type Transaction only. 

```TS
/*
first we need to import our interface and I'm also importing
the enum here for future use
*/
import { Transaction, TransactionType } from "./interfaces/transaction";

//creating the list of transactions
let transactions: Transaction[] = []

//rest of the code
```

As you can perceive from the above code is that having _[]_ after an interface denotes that the variable will contain a list of that instance. In our case, it denotes _transactions_ is an array/list containing objects strictly following the interface of Transaction.

So, now it is the time to implement all the functions we have used for handling routes and never defined. But before that let's just have a small function which will find a transaction with a specific id in the array. This helper will be useful to get one transaction and delete one.

So that helper function will look like this:

```TS
const findOneOfID = (id: String): Transaction => {
  const toBeFound: Transaction = transactions.find(t => t.id === id);
  return toBeFound;
}
```

Here the TypeScript speaks for the code. This function named _findOneOfID_ will take a parameter of type _String_ which is named as id and will be returning an object of our defined type/interface _Transaction_.

The function body is really simple and consists only 2 lines of code. In the first line we use an higher order array method find to loop through all the transactions in the transactions variable and return the one where the id of that transaction is equal to the id passed to the function. This found value is stored in a variable called toBeFound(of interface Transaction). The value in toBFound is returned.

Now, let's start with the easiest one defining the _getAllTransactions_ method. As this method handles request and response so let's bring in those interfaces and let's return the json form of this array attached to a name _'data'_:

```TS
//other imports
//before defining the routes and everything
import { Request, Response, Router } from "express";

//initiation of express router, transactions array and findOneOfID

const getAllTransactions = (req: Request, res: Response) => {
  res.json({'data': transactions});
};

//all the route handling

```

So this code is quite self-explanatory and I won't be diving deep into this code.

Next, let's define _getOneTransaction_:

```TS
//all the imports

//all the initializations

const getOneTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  let targetTransaction = findOneOfID(id);
  if (!targetTransaction) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ transaction: targetTransaction });
  }
};

//all the router handling
```

Here, at first we extract the id from request parameters. After that we use our helper function findOneOfID to get our _targetTransaction_. If the id is not found then our function will return _NULL_ which will be treated as _falsy_ value by JavaScript/TypeScript and then we will send a status of 400(not found, know more about status codes [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)) and a json containing the message _"not found"_ . Otherwise we will send a json with the transaction object labelled as transaction.

Now, both these functions are invalid until we create a transaction with a POST request to the "/transactions/:id" route. And if you can recall, the function handling this request to this route was _createTransaction_. So, let's just go through this:

```TS
//all the imports
import { v4 } from "uuid";

//all the initializations

const createTransaction = (req: Request, res: Response) => {
  if (!req.body.name || !req.body.amount) {
    res.status(400).json({ message: "The required fields are not there" });
  } else {
    const amountPassedIn = req.body.amount
    const new_transaction: Transaction = {
      id: v4(),
      name: req.body.name,
      amount: Math.abs(amountPassedIn),
      type: amountPassedIn >= 0? TransactionType.Earning : TransactionType.Expense
    };

    transactions.push(new_transaction);

    res.status(201).json({
      message: "added successfully",
      transaction: new_transaction
    });
  }
}

//all the router handling
```

At the very beginning we are checking if the required fields i.e the name or the amount are passed or not. If not passed then we send a 400 status code(BAD REQUEST) and return a message of _"required fields are not there"_. If both the values are passed then at first we extract the amount given in the request body, then we create a new transaction where we use the _v4_ function provided by **UUID** to create an unique id for the transaction. Then we provide the name and the absolute value of the amount passed in. Next in the type field we use a ternary operator to determine whether the amount passed in the body was greater than or equal to 0 or less than 0. If it is grater than or equal to 0 then using the ternary statement we set the type to be _TransactionType.Earning_(that's why we brought in our TransactionType enumerator). Otherwise it is set to _TransactionType.Expense_.

Later I have extracted this functionality of determining the transaction type to another function named _determineTransactionType_ like so:

```TS
const determineTransactionType = (amount: Number): TransactionType =>  {
  return amount > 0? TransactionType.Earning : TransactionType.Expense
}
```

After all this this new transaction is pushed to the list and with 201 status(CREATED) we return the object.

Let's now handle an easy part of deleting this newly created transaction with DELETE request to '/transactions/:id' handled by the function _deleteTransaction_. Let me write the code first and then I will explain:

```TS
const deleteTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  const toBeDeleted = findOneOfID(id);
  if (!toBeDeleted) {
    res.status(404).json({ message: "Not Found!" });
  } else {
    transactions = transactions.filter(t => t.id !== id);
    res.json({ message: "Deleted Successfully", transaction: toBeDeleted });
  }
}
```

Here, in the beginning we fetched the id from request parameters and used the _findOneOfID()_ to find the one the user has requested to delete. The result was stored in _toBeDeleted_. If the response was **null** then the 404 status code is sent with the message not found. And if it is found then we update the _transactions_ array with the higher order array function filter, which filters the array based on the return value of these function passed in. If the return value is false then the item is kept in the new array to be returned by this function. Thus we filter the array based on the id. Then we send the response with the message _"Deleted Successfully"_ and the deleted transaction is also passed in.

Now, let's implement the function handling the updating the stored value i.e. _updateTransaction_. So, once again let's just write the code and go through it:

```TS
const updateTransaction = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!findOneOfID(id)) {
    res.status(404).json({ message: "Not Found!" });
  } else {
    transactions = transactions.map(t => {
      if (t.id == id) {
        return {
          id: id,
          name: req.body.name ? req.body.name : t.name,
          amount: req.body.amount ? Math.abs(req.body.amount) : t.amount,
          type: req.body.amount? determineTransactionType(req.body.amount) : t.type
        };
      } else return t;
    });
    res.json({
      message: "Update successful",
      transaction: findOneOfID(id)
    });
  }
}
```
In this function alike the _deleteTransaction()_ function we initially take the id passed in the URL, then check if it exists or not with the help of _findOneOfID()_. After that if the id is found then we can use the _map_ function to recreate the array with some editing on the required element. There sure might be better ways but this is what I did. I mapped through each element in the array of transaction and for the transaction(written in short as _t_ here) with the id matching the id we are looking for we will be updating the values if passed in, otherwise will keep the old values. Here we will be using the previously defined _determineTransactionType()_ function. So after updating the value we again use the _findOneByID()_ to return the  updated object.

## Conclusion

Well, this was a really long post but I'm putting a end to this post here. If you want the source code of the app then it is hosted on [GitHub](https://github.com/AyushmanBilasThakur/TypeScript_Express_REST_API). There is still a lot to improve in this app still. In this app you can add a frontend, or you can add user authentication or maybe more routes giving the total balance. The possibilities are endless. Until next time stay happy and keep coding.