import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk(
  "role/getRoles",
  async (scriptId) => {
    const res = await axios.get(`/roles/${scriptId}`);
    return res.data;
  }
);

export const createRole = createAsyncThunk("role/newRole", async (role) => {
  const res = await axios.post(`/roles/${role.script}`, role);
  return res.data;
});

export const deleteRole = createAsyncThunk("role/destroyRole", async (id) => {
  const res = await axios.delete(`/role/${id}`);
  return res.data;
});

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
    [deleteRole.pending]: (state) => {
      // state.loading = true;
    },
    [deleteRole.fulfilled]: (state, { payload }) => {
      state.roles = state.roles.filter((role) => role._id !== payload.id);
      state.loading = false;
      state.hasErrors = false;
    },
    [deleteRole.rejected]: (state) => {
      state.roles = [];
      state.loading = false;
    },
    [createRole.pending]: (state) => {
      // state.loading = true;
    },
    [createRole.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.roles = [...state.roles, payload];
      state.loading = false;
      state.hasErrors = false;
    },
    [createRole.rejected]: (state) => {
      state.roles = [];
      state.loading = false;
    },
  },
});
export const { resetRoles } = rolesSlice.actions;

export const rolesSelector = (state) => state.roles;

export default rolesSlice.reducer;
