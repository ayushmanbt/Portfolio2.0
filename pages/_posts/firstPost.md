---
title: Redux vs Context API
date: 2019-12-26
layout: default
slug: redux-vs-context-api
desc: Redux and Context API are the two main ways to have global state in React. Check out how to work with both of them and then decide which one is best for you
main_img: /redux_vs_context_api/thumbnail.png
tags: React, Redux, Context API, State Management
---

# Redux vs Context API - My Thoughts

<div style="width: 100%; display: flex">
<img src = "/redux_vs_context_api/thumbnail.png" class="thumbnail">
</div>

I'm sure, if you have somehow stumbled upon this post, you have some basic knowledge of React or any component-based Front-End framework. These frameworks can store data in two ways namely - component level state and app-level state. It is really easy and always preferable to have a component-level state only. But sometimes we need app-level state management. For example - if you have a TodoList in one component and count of the total number of TODOs and number of done and undone TODOs in other components then it will be a better decision to use an app-level state. Without a component level state, you will need to pass the TODOs from component to component.

In React there are mainly two ways to manage state. One is Redux. Redux can not only be used with React but also can be used with other frameworks.

On the other hand Context API is the built-in app-level state management in React.

So in this post, we are going to compare the working of both Redux and Context API and find out which one to use. Spoiler Alert, it depends on your preference.

<br/>

## Working with Redux

### Packages needed

<br/>

- **React**
- **Redux**: for the functions like **createStore()**, **combineReducer()**
- **React-Redux**: contains the methods like **useDispatch**(used to dispatch an action) and **useSelector**(used to select things from the global state) **Provider** is also a part of React-redux.

<br/>

### Components of redux

**_reducer_**: these are functions with state and actions passed in. These work with **action.type** in switch cases and return the updated state it optionally needs to accept **payload** to work properly.
Sometimes you will need to merge separate reducers before creating a store
(generally in _reducer folder_ for each reducer)

**_store_**: store is the hub of all data. It is also passed to the provider
(generally created in _index.js_, but the combining of reducers happen in an _index.js_ in reducer folder)

**_provider_**: a React based component which takes store as an argument
(generally created in _index.js_)

**_actions_**: functions providing/returning payload and action type to the dispatcher which will call the required reducer.
(generally created in a _separate file called actions.js_)

### Folder Structure

Here is the folder structure I use for working with Redux. This is a simple app where a reducer is used to count the number of button taps. **Disclaimer**: The _reducer2.js_ is created just for showing how to combine two reducers, you may or may not use that. So without further adieu, let's look at the folder structure along with the relevant code.

- src/

  - actions
    - index.js [this file stores all the actions which we need to call using dispatcher] example:
    ```JS
    export const action_a = (data) => {
        return {
            type: "ACTION_NAME",
            //generally action names are written in all caps
            payload: data
        }
    }
    ```
  - reducers

    - reducer1.js. example:

    ```JS
    const initialState = 0
    export const reducer1 = (state = initialState, action) => {
        switch(action){
            case 'ACTION_NAME':
                return state + payload;
            // always return the complete updated set,
            // using spread operator will be helpful if you have
            // an object in state
            default:
                return state;
        }
    }
    ```

    - reducer2.js
    - index.js [for combining all the reducers] example:

    ```JS
    import { combineReduce } from "Redux";
    import { reducer1 } from "./reducer1";
    import { reducer2 } from "./reducer2";

    export default megaReducer = combineReducer({
      reducer1,
      reducer2
    });
    ```

  - App.js [React App component]
  - index.js [Main injecting component of React. We will use this to inject our combined reducer to our app, using provider, found in the React-Redux package. Here I have used Redux DevTools to debug it in the console. It is a chrome extension found [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)]:

    ```JSX
    import React from 'react'
    import ReactDOM from 'react-dom';
    import App from './App'
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import megaReducer from './reducers'

    const store = createStore(megaReducer,
    //this is for devtools-redux, you may or may not use that
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
    ```

Now the only thing we need is the ability to access and update the state from the global state. Let's see the steps one by one:

#### Accessing the state using useSelector:

**useSelector()** is a method provided by _React-redux_ package to select a _reducer_ from the combined reducer and access its values. To show how does it work let's edit the **App.js**

```JSX
import React from 'react';
import {useSelector} from 'React-redux';

function App(){
    const count = useSelector(state => state.reducer1)

    return(
        <div>
            <h1>Number: {{count}}</h1>
        </div>
    );
}

export default App;
```

The useSelector function takes in a callback function which returns the required reducer from the combined reducer.

#### Updating the state using useDispatch:

Previously we used **useSelector()** to select a state from the combined reducer. Now we will see how to update the state, so we will need to modify the App.js again:

```JSX
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

function App(){

    const dispatch_control = useDispatch();
    const count = useSelector(state => state.reducer1)

    return(
        <div>
            <h1>Number: {{count}}</h1>
        </div>
    );
}

export default App;
```

at first, I imported the useDispatch function and initialized it as dispatch_control. Now dispatch_control will contain the function returned by the **useDispatch()** which will finally let us dispatch an action. All that is now left is to import the action and use it using dispatch_control:

```JSX

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {action_a} from './actions';

function App(){

    const dispatch_control = useDispatch();
    const count = useSelector(state => state.reducer1)

    return(
        <div>
            <h1>Number: {{count}}</h1>
            <button onClick={() => dispatch_control(action_a(1))} >
                +1
            </button>
        </div>
    );
}
export default App;
```

So here we passed the action to be dispatched imported from ./actions to the onClick event listener of the button "+1" and passed in the payload of 1 as previously we used a payload with the action definition and the reducer action.

So this was the basic overview of using Redux with React. There is still a lot to explore Redux, which I might do in another post.

Now let's jump to context API.

## Working with Context API

**Context API** is the built-in way of React to handle global state management and it is easier than **Redux**

### Important things

**_provider_**: This is a React component with a state and it returns JSX

**_context_**: it is created using a function called createContext()

## Structure of Context.js

```JSX
import React, {useState, createContext} from 'react'

export const xyzContext = createContext();

export const xyzProvider = (props) => {

    const [number, setNumber] = useState(0);

    return(
        <xyzContext.Povider value = {[number, setNumber]}>
            {props.childern}
        </xyzContext.Povider>
    )
}
```

So in this code, we created a new context named xyzContext. Then the state was created using React Hooks. So we are exporting two things, the context and the provider(the React component). The props.children is used to have components inside the Provider component

Now just import the Provider and wrap the App with that component. Let's use the App.js:

```JSX
import React from 'react';
import { xyzProvider } from './Context'

function App(){
    return(
        <xyzProvider>
            <div>
                <h1>Number: </h1>
            </div>
        </xyzProvider>
        );
    }

export default App;
```

Now that we have wrapped our app with the provider we can use the context and the **useContext()** hook provided by React. So let's render our number:

```JSX
import React from 'react';
import {useContext} from 'react';
import { xyzProvider, xyzContext } from './Context';

function App(){
    const [number, setNumber] = useContext(xyzContext);
    return(
        <xyzProvider>
            <div>
                <h1>Number: {{number}}</h1>
            </div>
        </xyzProvider>
    );
}
export default App;
```

Wow! now you can see the number from the global state. Now, the only thing left is to update the number. With the **setNumber** provided by **useContext** it will be really easy:

```JSX
import React from 'react';
import {useContext} from 'react';
import { xyzProvider, xyzContext } from './Context';

function App(){
    const [number, setNumber] = useContext(xyzContext);
    const increaseNumber = () => {
        setNumber(prevNumber => prevNumber + 1);
    }
    return(
        <xyzProvider>
            <div>
                <h1>Number: {{number}}</h1>
                <button onClick="increaseNumber()" >
                    +1
                </button>
            </div>
        </xyzProvider>
    );
}

export default App;
```

So here we used an onClick event listener to fire up the **increaseNumber** function. In the **increaseNumber** function, we used the **setNumber** function which takes a function as an argument. In this function, we pass the previous state and return the new state. In case, if your state is an object then use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Conclusion

According to me, the main advantage of Context API over Redux is that instead of importing actions and using them we get to manipulate the state directly on the component we are currently on. Context API is also easy to set up and is as effective as Redux. Moreover, Context API is the in-built solution, so you don't need to worry about third parties implementing new changes. So I would choose Context API to work with rather than Redux. But keep one thing in mind - Redux is the industry standard.

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
