import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk(
  "role/getRoles",
  async (scriptId) => {
    const res = await axios.get(`/roles/${scriptId}`);
    return res.data;
  }
);

// export const createScript = createAsyncThunk(
//   "script/newScript",
//   async (script) => {
//     const res = await axios.post("/scripts", script);
//     return res.data;
//   }
// );

// export const deleteScript = createAsyncThunk(
//   "script/destroyScript",
//   async (id) => {
//     const res = await axios.delete(`/script/${id}`);
//     return res.data;
//   }
// );

export const initialState = {
  loading: false,
  fetched: false,
  hasErrors: false,
  roles: [],
};

const rolesSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetRoles: (state) => initialState,
  },
  extraReducers: {
    [fetchRoles.pending]: (state) => {
      state.loading = true;
    },
    [fetchRoles.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.roles = payload.map((scene) => scene);
      state.loading = false;
      state.fetched = true;
    },
    [fetchRoles.rejected]: (state) => {
      state.roles = [];
      state.loading = false;
    },
    // [deleteScript.pending]: (state) => {
    //   // state.loading = true;
    // },
    // [deleteScript.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   state.scripts = state.scripts.filter(
    //     (script) => script._id !== payload.script._id
    //   );
    //   state.loading = false;
    //   state.hasErrors = false;
    // },
    // [deleteScript.rejected]: (state) => {
    //   state.scripts = [];
    //   state.loading = false;
    // },
    // [createScript.pending]: (state) => {
    //   // state.loading = true;
    // },
    // [createScript.fulfilled]: (state, { payload }) => {
    //   console.log(payload);
    //   state.scripts = [...state.scripts, payload];
    //   state.loading = false;
    //   state.hasErrors = false;
    // },
    // [createScript.rejected]: (state) => {
    //   state.scripts = [];
    //   state.loading = false;
    // },
  },
});
export const { resetRoles } = rolesSlice.actions;

export const rolesSelector = (state) => state.roles;

export default rolesSlice.reducer;
