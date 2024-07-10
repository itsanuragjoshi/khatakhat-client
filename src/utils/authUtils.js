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
  const userRole = decodedToken.userRole;
  store.dispatch(setAuthCreds({ accessToken, userInfo, userRole }));
};

export const resetAuthCredentials = () => {
  store.dispatch(resetAuthCreds());
};
