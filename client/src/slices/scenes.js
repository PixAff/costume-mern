import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { deleteRole } from "./roles";

export const fetchScenes = createAsyncThunk(
  "scene/getScenes",
  async (scriptId) => {
    const res = await axios.get(`/scenes/${scriptId}`);
    return res.data;
  }
);

export const createScene = createAsyncThunk(
  "scene/newScene",
  async ({ id, newData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/scenes/${id}`, newData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteScene = createAsyncThunk(
  "scene/destroyScene",
  async (id) => {
    const res = await axios.delete(`/scene/${id}`);
    return res.data;
  }
);

export const updateScene = createAsyncThunk(
  "scene/patchScene",
  async (scene) => {
    // console.log("slicePatch", scene);
    const res = await axios.patch(`/scene/${scene._id}`, scene);
    return res.data;
  }
);

export const initialState = {
  loading: false,
  hasErrors: false,
  scenesFetched: false,
  scriptId: null,
  scenes: [],
};

const scenesSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    resetScenes: (state) => initialState,
  },
  extraReducers: {
    [fetchScenes.pending]: (state) => {
      state.loading = true;
    },
    [fetchScenes.fulfilled]: (state, { payload }) => {
      state.scenes = payload.map((scene) => scene);
      state.loading = false;
      state.scenesFetched = true;
      state.scriptId = payload[0]?.script._id;
    },
    [fetchScenes.rejected]: (state) => {
      state.scenes = [];
      state.loading = false;
    },
    [deleteScene.pending]: (state) => {
      // state.loading = true;
    },
    [deleteScene.fulfilled]: (state, { payload }) => {
      state.scenes = state.scenes.filter((scene) => scene._id !== payload);
      state.loading = false;
      state.hasErrors = false;
    },
    [deleteScene.rejected]: (state) => {
      state.scenes = [];
      state.loading = false;
      state.hasErrors = true;
    },
    [createScene.pending]: (state) => {
      // state.loading = true;
    },
    [createScene.fulfilled]: (state, { payload }) => {
      state.scenes = [...state.scenes, payload];
      state.loading = false;
      state.hasErrors = false;
    },
    [createScene.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [updateScene.pending]: (state) => {
      // state.loading = true;
    },
    [updateScene.fulfilled]: (state, { payload }) => {
      state.scenes = state.scenes.map((scene) =>
        scene._id === payload._id ? payload : scene
      );
      state.loading = false;
      state.hasErrors = false;
    },
    [updateScene.rejected]: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [deleteRole.fulfilled]: (state, { payload }) => {
      console.log(payload.id);
      state.scenes.forEach((scene) => {
        // find the index of the deleted role id in an array of ids
        const i = scene.roles.findIndex((role) => role._id === payload.id);
        console.log("Role", i);
        // if the array contains the deleted role
        if (i !== -1) {
          // remove one element starting from that position
          scene.roles.splice(i, 1);
        }
      });
    },
  },
});

export const { resetScenes } = scenesSlice.actions;

export const scenesSelector = (state) => state.scenes;

export default scenesSlice.reducer;
