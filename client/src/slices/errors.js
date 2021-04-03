import { createSlice } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { createScene } from "./scenes";
import { createScript } from "./scripts";

const rejectionReducer = (state, { payload }) => {
  const errorArray = Object.values(payload.message).map((key) => key.message);
  state.errors = errorArray;
  state.isOpen = true;
};

export const initialState = {
  errors: [],
  isOpen: false,
};

const errorsSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      console.log(payload);
      state.errors = payload;
      state.isOpen = true;
    },
    clearError: (state) => {
      state.errors = [];
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isRejectedWithValue(createScript, createScene), // <-- thunk actions
      rejectionReducer
    );
  },
  // {
  //   [createScript.rejected]: (state, { payload }) => {
  //     const errorArray = Object.values(payload.message).map(
  //       (key) => key.message
  //     );
  //     state.errors = errorArray;
  //     state.isOpen = true;
  //   },
  //   [createScene.rejected]: (state, { payload }) => {
  //     const errorArray = Object.values(payload.message).map(
  //       (key) => key.message
  //     );
  //     state.errors = errorArray;
  //     state.isOpen = true;
  //   },
  // },
});
export const { setError, clearError } = errorsSlice.actions;

export const errorsSelector = (state) => state.errors;

export default errorsSlice.reducer;
