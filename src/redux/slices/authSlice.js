import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAuthCreds: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    resetAuthCreds: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAuthCreds, resetAuthCreds } = authSlice.actions;
export default authSlice.reducer;
