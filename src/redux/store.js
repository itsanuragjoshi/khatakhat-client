import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
