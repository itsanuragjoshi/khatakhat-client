import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userInfo: null,
    userRoles: null,
  },
  reducers: {
    setAuthCreds: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
      state.userRoles = action.payload.userRoles;
    },
    resetAuthCreds: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.userRoles = null;
    },
  },
});

export const { setAuthCreds, resetAuthCreds } = authSlice.actions;
export default authSlice.reducer;
