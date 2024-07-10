import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userInfo: null,
    userRole: null,
  },
  reducers: {
    setAuthCreds: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
      state.userRole = action.payload.userRole;
    },
    resetAuthCreds: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.userRole = null;
    },
  },
});

export const { setAuthCreds, resetAuthCreds } = authSlice.actions;
export default authSlice.reducer;
