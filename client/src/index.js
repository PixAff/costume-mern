import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux"; // use {compose} if you dont want redux def tools
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

// import { reducers } from "./reducers";

import App from "./App";
// import Nav from "./components/main/Nav";

import "./index.css";
import store from "./app/store";
// import { loadState, saveState } from "./utils/localStorage";

// const persistedState = loadState();
// console.log("persisted: ", persistedState);

// const store = createStore(
//   reducers,
//   persistedState,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// store.subscribe(() => {
//   saveState({
//     store: store.getState(),
//   });
// });

// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
