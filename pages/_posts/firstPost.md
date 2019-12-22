---
title: Redux vs Context API (Incomplete)
date: 2019-12-20
layout: default
slug: redux-vs-context-api
desc: Redux and Context API are the two main ways to have global state in React. Check out how to work with both of them and then decide which one is best for you
main_img: /redux_vs_context_api/thumbnail.png
---

# Redux vs Context API - My Thoughts

<div style="width: 100%; display: flex">
<img src = "/redux_vs_context_api/thumbnail.png" class="thumbnail">
</div>

I'm sure, if you have somehow stumbled upon this post, you have some basic knowledge of React or any component based Front-End framework. These frameworks can store data in two ways namely -
**component level state** and **app level state**. It is really easy and always preferable to have component level state only. But sometimes we really need app level state management. For example - if you have a TodoList in one component and count of number of total number of TODOs and number of done and undone TODOs in other component then it will be a better decision to use an app level state. Without a component level state you will need to pass the TODOs from component to component.

In React there are mainly two ways to manage state. One is **Redux**. Redux can not only be used with react, but also can be used with other frameworks.

On the other hand Context API is the built-in app level state management in React.

So in this post we are going to compare the working of both Redux and Context API and find out which one to use. **Spoiler Alert**, it really depends on your preference.

<br/>

## Working with Redux

### Packages needed

<br/>

- **React**
- **Redux**: for the functions like **createStore()**, **combineReducer()**
- **React-Redux**: contains the methodes like **useDipatch**(used to dispatch an action) and **useSelector**(used to select things from global state) **Provider** is also a part of react-redux.

<br/>

### Components of redux

**_reducer_**: these are actually functions with state and actions passed in .. they work with **action.type** in swich cases and return the updated state it optionally needs to accept **payload** to work properly..
Sometimes you will need to merge seperate reducers before creating a store
(generally in _reducer folder_ for each reducer)

**_store_**: store is the hub of all data. It is also passed to the provider
(generally created in _index.js_, but the combining of reduceers happen in a _index.js_ in reducer folder)

**_provider_**: a react based component which takes store as an arguement
(generally created in _index.js_)

**_actions_**: functions providing / returning payload and action type to the dispacher which will call the required reducer.
(generally created in _seperate file called actions.js_)

## Folder Structure

- src/

  - actions
    - index.js [this file stores all the actions which we need to call using dipatcher] example =>
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

    - reducer1.js example =>

    ```JS
    const initialState = 0
    export const reducer1 = (state = initialstate, action) => {
        switch(action){
            case 'ACTION_NAME':
            return state + payload;
            // always return the complete updated set,
            // using spread operator will be helpful
            default:
                return state;
        }
    }
    ```

    - reducer2.js
      - index.js [for exporting the **combineReducer()** product] example =>

    ```js
    import { combineReduce } from "Redux";
    import { reducer1 } from "./reducer1";
    import { reducer2 } from "./reducer2";

    export default allReducer = combineReducer({
      reducer1,
      reducer2
    });
    ```

  - App.js (React App component)
  - index.js (Main injecting component) =>

    ```JS
        import React from 'react'
        import ReactDOM from 'react-dom';
        import App from './App'
        import { Provider } from 'react-redux'
        import { createStore } from 'redux'
        import allReducer from './reducers'

        const store = createStore(allReducer,
        //this is for devtools-redux
        window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()
        );

        ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>,
        document.getElementById('root'));
    ```

To be continued in this post...

<style scoped>
h1,h2,h3,h4,h5,h6{
    font-family: "Montserrat Alternates", sans-serif;
}

.dark-mode p, .dark-mode li{
    color: #bbb;
}

p, li{
    color: #222;
}
li{
    margin-left: 20px;
}

pre{
    padding: 10px 20px;
}

</style>
