import { combineReducers } from "redux";

import scripts from "./scripts";
import scenes from "./scenes";

export const reducers = combineReducers({ scripts, scenes });
