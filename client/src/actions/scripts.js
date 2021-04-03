import axios from "axios";
import {
  // CREATE,
  // DELETE,
  // FETCH_ALL,
  // FETCH_ONE,
  LIKE,
  // UPDATE,
} from "../constants/actionTypes";
// import * as api from "../api";

// export const getScripts = () => async (dispatch) => {
//   const { data } = await axios.get("/scripts");
//   dispatch({ type: FETCH_ALL, payload: data });
// };

// export const getScript = (id) => async (dispatch) => {
//   const { data } = await axios.get(`/scripts/${id}`);
//   dispatch({ type: FETCH_ONE, payload: data });
// };

// export const createScript = (script) => async (dispatch) => {
//   const { data } = await axios.post("/scripts", script);
//   dispatch({ type: CREATE, payload: data });
// };

// export const updateScript = (id, script) => async (dispatch) => {
//   const { data } = await axios.patch(`/script/${id}`, script);
//   dispatch({ type: UPDATE, payload: data });
// };

// export const deleteScript = (id) => async (dispatch) => {
//   await axios.delete(`/script/${id}`);
//   dispatch({ type: DELETE, payload: id });
// };

export const likeScript = (id) => async (dispatch) => {
  const { data } = await axios.patch(`/script/${id}/likeScript`);
  dispatch({ type: LIKE, payload: data });
};

// export const fetchUser = () => async (dispatch) => {
//   const res = await axios.get("/api/current_user");

//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const submitSurvey = (values, history) => async (dispatch) => {
//   const res = await axios.post("/api/surveys", values);

//   history.push("/surveys");
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
