import store from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { setAuthCreds, resetAuthCreds } from "../redux/slices/authSlice";

export const setAuthCredentials = ({ accessToken }) => {
  const decodedToken = jwtDecode(accessToken);
  const userInfo = {
    userId: decodedToken.userInfo.userId,
    userName: decodedToken.userInfo.userName,
    userEmail: decodedToken.userInfo.userEmail,
  };
  const userRoles = decodedToken.userRoles;
  store.dispatch(setAuthCreds({ accessToken, userInfo, userRoles }));
};

export const resetAuthCredentials = () => {
  store.dispatch(resetAuthCreds());
};
