import {
  CLEAR_ROLES,
  CREATE_ROLE,
  DELETE_ROLE,
  // FETCH_ROLE,
  FETCH_ROLES,
  // UPDATE_ROLE,
} from "../constants/actionTypes";

export default function roles(roles = [], action) {
  switch (action.type) {
    case FETCH_ROLES:
      // case FETCH_ROLE:
      return action.payload;
    case CREATE_ROLE:
      return [...roles, action.payload];
    // case UPDATE_ROLE:
    //   return roles.map((role) =>
    //     role._id === action.payload._id ? action.payload : role
    //   );
    case CLEAR_ROLES:
      return [];
    case DELETE_ROLE:
      return roles.filter((role) => role._id !== action.payload);
    default:
      return roles;
  }
}
