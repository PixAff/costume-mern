import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchScripts = createAsyncThunk("script/getScripts", async () => {
  const res = await axios.get("/scripts");
  return res.data;
});

export const createScript = createAsyncThunk(
  "script/newScript",
  async (script, { rejectWithValue }) => {
    try {
      const res = await axios.post("/scripts", script);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteScript = createAsyncThunk(
  "script/destroyScript",
  async (id) => {
    const res = await axios.delete(`/script/${id}`);
    return res.data;
  }
);

export const updateScript = createAsyncThunk(
  "script/patchScript",
  async ({ id, script }) => {
    const res = await axios.patch(`/script/${id}`, script);
    return res.data;
  }
);

export const initialState = {
  loading: false,
  hasErrors: false,
  currentId: null,
  scripts: [],
};

const scriptsSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    setCurrentId: (state, { payload }) => {
      state.currentId = payload;
    },
  },
  extraReducers: {
    [fetchScripts.pending]: (state) => {
      state.loading = true;
    },
    [fetchScripts.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.scripts = payload.map((script) => script);
      state.loading = false;
    },
    [fetchScripts.rejected]: (state) => {
      state.scripts = [];
      state.loading = false;
    },
    [deleteScript.pending]: (state) => {
      // state.loading = true;
    },
    [deleteScript.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.scripts = state.scripts.filter(
        (script) => script._id !== payload.script._id
      );
      state.loading = false;
      state.hasErrors = false;
    },
    [deleteScript.rejected]: (state) => {
      state.scripts = [];
      state.loading = false;
    },
    [createScript.pending]: (state) => {
      // state.loading = true;
    },
    [createScript.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.scripts = [...state.scripts, payload];
      state.loading = false;
      state.hasErrors = false;
    },
    [createScript.rejected]: (state) => {
      state.loading = false;
    },
    [updateScript.pending]: (state) => {
      // state.loading = true;
    },
    [updateScript.fulfilled]: (state, { payload }) => {
      state.scripts = state.scripts.map((script) =>
        script._id === payload._id ? payload : script
      );
      state.loading = false;
      state.hasErrors = false;
    },
    [updateScript.rejected]: (state) => {
      state.scripts = [];
      state.loading = false;
    },
  },
});

export const { setCurrentId, logout } = scriptsSlice.actions;

export const scriptsSelector = (state) => state.scripts;

export default scriptsSlice.reducer;

// export function fetchScripts() {
//   return async (dispatch) => {
//     dispatch(getScripts());

//     try {
//       const { data } = await axios.get("/scripts");
//       dispatch(getScriptsSuccess(data));
//     } catch (error) {
//       dispatch(scriptsFailure());
//     }
//   };
// }

// export function createScript(script) {
//   return async (dispatch) => {
//     dispatch(newScript(script));

//     try {
//       const { data } = await axios.post("/scripts", script);
//       dispatch(newScriptSuccess(data));
//     } catch (error) {
//       dispatch(scriptsFailure());
//     }
//   };
// }

// export function deleteScript(id) {
//   return async (dispatch) => {
//     dispatch(destroyScript(id));
//     try {
//       const { data } = await axios.delete(`/script/${id}`);
//       dispatch(destroyScriptSuccess(data));
//     } catch (error) {
//       dispatch(scriptsFailure());
//     }
//   };
// }
