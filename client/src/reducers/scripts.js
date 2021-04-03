// import {
//   CREATE,
//   DELETE,
//   FETCH_ALL,
//   FETCH_ONE,
//   LIKE,
//   UPDATE,
// } from "../constants/actionTypes";

// export default function scripts(scripts = [], action) {
//   switch (action.type) {
//     case FETCH_ALL:
//     case FETCH_ONE:
//       return action.payload;
//     case CREATE:
//       return [...scripts, action.payload];
//     case UPDATE:
//     case LIKE:
//       return scripts.map((script) =>
//         script._id === action.payload._id ? action.payload : script
//       );
//     case DELETE:
//       return scripts.filter((script) => script._id !== action.payload);
//     default:
//       return scripts;
//   }
// }
