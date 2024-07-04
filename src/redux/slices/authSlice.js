import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userInfo: null,
  },
  reducers: {
    setAuthCreds: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
    },
    resetAuthCreds: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
  },
});

export const { setAuthCreds, resetAuthCreds } = authSlice.actions;
export default authSlice.reducer;
