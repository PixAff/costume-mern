import { combineReducers } from "redux";

import scriptsReducer from "./scripts";
import scenesReducer from "./scenes";
import rolesReducer from "./roles";
import errorsReducer from "./errors";

// import errors from "./errors";

const combinedReducers = combineReducers({
  scripts: scriptsReducer,
  scenes: scenesReducer,
  roles: rolesReducer,
  errors: errorsReducer,
});

const rootReducer = (state, action) => {
  // TODO: this is supposed to introduce a global reset state function - DOES NOT WORK
  // see: https://stackoverflow.com/questions/59061161/how-to-reset-state-of-redux-store-when-using-configurestore-from-reduxjs-toolki/61943631#61943631
  if (action.type === "script/logout") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

export default rootReducer;
