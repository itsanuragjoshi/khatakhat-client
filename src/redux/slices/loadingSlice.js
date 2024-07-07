import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state, action) {
      state[action.payload] = true;
    },
    stopLoading(state, action) {
      state[action.payload] = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
