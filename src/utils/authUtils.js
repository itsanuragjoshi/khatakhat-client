import store from "../redux/store";
import { setAuthCreds, resetAuthCreds } from "../redux/slices/authSlice";

export const setAuthCredentials = ({ accessToken, userInfo }) => {
  store.dispatch(setAuthCreds({ accessToken, userInfo }));
};

export const resetAuthCredentials = () => {
  store.dispatch(resetAuthCreds());
};
