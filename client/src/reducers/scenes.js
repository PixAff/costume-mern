// import {
//   CLEAR_SCENES,
//   CREATE_SCENE,
//   DELETE_SCENE,
//   FETCH_SCENE,
//   FETCH_SCENES,
//   UPDATE_SCENE,
//   ADD_ROLES_TO_SCENE,
// } from "../constants/actionTypes";

// export default function scenes(scenes = [], action) {
//   switch (action.type) {
//     case FETCH_SCENES:
//     case FETCH_SCENE:
//       return action.payload;
//     case CREATE_SCENE:
//       return [...scenes, action.payload];
//     case UPDATE_SCENE:
//     case ADD_ROLES_TO_SCENE:
//       return scenes.map((scene) =>
//         scene._id === action.payload._id ? action.payload : scene
//       );
//     case CLEAR_SCENES:
//       return [];
//     case DELETE_SCENE:
//       return scenes.filter((scene) => scene._id !== action.payload);
//     default:
//       return scenes;
//   }
// }
