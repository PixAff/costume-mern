import { combineReducers } from "redux";

import scripts from "./scripts";
import scenes from "./scenes";
import roles from "./roles";

export const reducers = combineReducers({ scripts, scenes, roles });
