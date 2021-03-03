import { SET_ERROR, HIDE_ERROR } from "../constants/actionTypes";

const initState = {
  error: null,
};

export default function roles(state = initState, action) {
  switch (action.type) {
    case SET_ERROR:
      console.log("red", action.payload);
      return { error: action.payload.message, isOpen: true };
    case HIDE_ERROR:
      return { error: null, isOpen: false };
    default:
      return state;
  }
}
