import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    permissionToken: null,
    userInfo: null,
    userRoles: null,
  },
  reducers: {
    setAuthCreds: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.permissionToken = action.payload.permissionToken;
      state.userInfo = action.payload.userInfo;
      state.userRoles = action.payload.userRoles;
    },
    resetAuthCreds: (state) => {
      state.accessToken = null;
      state.permissionToken = null;
      state.userInfo = null;
      state.userRoles = null;
    },
  },
});

export const { setAuthCreds, resetAuthCreds } = authSlice.actions;
export default authSlice.reducer;
