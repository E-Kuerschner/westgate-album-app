import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import reducer from "./reducers";
import Root from "./components/Root";

const getAppRoot = () => document.getElementById("root");

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch({
    type: "RESIZE",
    width: window.innerWidth,
    height: window.innerHeight
});

window.addEventListener('resize', (e) => {
    store.dispatch({
        type: "RESIZE",
        width: e.target.innerWidth,
        height: e.target.innerHeight
    });
});

render(<Root store={ store } />, getAppRoot());

if (module.hot) {
    module.hot.accept("./components/Root", () => {
        const nextRoot = require("./components/Root").default;
        render(<nextRoot store={ store } />, getAppRoot());
    })

    module.hot.accept("./reducers", () => {
        const nextReducer = require("./reducers");
        store.replaceReducer(nextReducer);
    })
}