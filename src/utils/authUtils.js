import store from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { setAuthCreds, resetAuthCreds } from "../redux/slices/authSlice";

export const setAuthCredentials = ({ accessToken }) => {
  const decodedToken = jwtDecode(accessToken);
  const userInfo = {
    userId: decodedToken.userId,
    userName: decodedToken.userName,
    userEmail: decodedToken.userEmail,
  };
  store.dispatch(setAuthCreds({ accessToken, userInfo }));
};

export const resetAuthCredentials = () => {
  store.dispatch(resetAuthCreds());
};
