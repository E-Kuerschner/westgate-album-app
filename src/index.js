import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { windowResized } from "./actions";
import Root from "./components/Root";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

const store = createStore(
    reducer,
    { background: { width: window.innerWidth, height: window.innerHeight } },
    composeEnhancer(applyMiddleware(thunk))
);

store.dispatch(windowResized(window.innerWidth, window.innerHeight));
window.addEventListener("resize", (e) => {
    store.dispatch(windowResized(e.target.innerWidth, e.target.innerHeight));
});

function renderApp(RootComponent) {
    render(
        <RootComponent store={ store } />,
        document.getElementById("root")
    );
}

renderApp(Root);

if (module.hot) {
    module.hot.accept("./components/Root", () => {
        const nextRoot = require("./components/Root").default;
        renderApp(nextRoot);
    })

    module.hot.accept("./reducers", () => {
        const nextReducer = require("./reducers");
        store.replaceReducer(nextReducer);
    })
}