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
    setAuthentication: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
    },
    resetAuthentication: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
    setAuthorization: (state, action) => {
      state.permissionToken = action.payload.permissionToken;
      state.userRoles = action.payload.userRoles;
    },
    resetAuthorization: (state) => {
      state.permissionToken = null;
      state.userRoles = null;
    },
  },
});

export const {
  setAuthentication,
  resetAuthentication,
  setAuthorization,
  resetAuthorization,
} = authSlice.actions;
export default authSlice.reducer;
