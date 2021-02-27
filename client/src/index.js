import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"; // use {compose} if you dont want redux def tools
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { reducers } from "./reducers";

import App from "./App";
import "./index.css";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
