// import axios from "axios";
// import {
//   CREATE_SCENE,
//   DELETE_SCENE,
//   FETCH_SCENES,
//   CLEAR_SCENES,
//   UPDATE_SCENE,
//   ADD_ROLES_TO_SCENE,
// } from "../constants/actionTypes";

// export const clearScenes = () => async (dispatch) => {
//   dispatch({ type: CLEAR_SCENES });
// };

// export const getScenes = (scriptId) => async (dispatch) => {
//   const { data } = await axios.get(`/scenes/${scriptId}`);
//   dispatch({ type: FETCH_SCENES, payload: data });
// };

// export const getScript = (id) => async (dispatch) => {
//   const { data } = await axios.get(`/${id}`);
//   dispatch({ type: FETCH_ONE, payload: data });
// };

// export const createScene = (scene, scriptId) => async (dispatch) => {
//   const { data } = await axios.post(`/scenes/${scriptId}`, scene);
//   dispatch({ type: CREATE_SCENE, payload: data });
// };

// export const updateScene = (scene) => async (dispatch) => {
//   const { data } = await axios.patch(`/scene/${scene._id}`, scene);
//   dispatch({ type: UPDATE_SCENE, payload: data });
// };

// export const deleteScene = (id) => async (dispatch) => {
//   const { data } = await axios.delete(`/scene/${id}`);
//   dispatch({ type: DELETE_SCENE, payload: data.id });
//   // return data.id;
// };

// export const addRolesToScene = (scene, roles) => async (dispatch) => {
//   const { data } = await axios.patch(`/roles/scene/${scene._id}`, {
//     roles,
//     scene,
//   });
//   dispatch({ type: ADD_ROLES_TO_SCENE, payload: data });
// };

// export const likeScript = (id) => async (dispatch) => {
//   const { data } = await axios.patch(`/${id}/likeScript`);
//   dispatch({ type: LIKE, payload: data });
// };
