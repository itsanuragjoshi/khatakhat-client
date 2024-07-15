import store from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { setAuthCreds, resetAuthCreds } from "../redux/slices/authSlice";

export const setAuthCredentials = ({ accessToken, permissionToken }) => {
  const currentState = store.getState().auth;

  let userInfo = currentState.userInfo || null;
  let userRoles = currentState.userRoles || null;

  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    userInfo = {
      userId: decodedAccessToken.userInfo.userId,
      userName: decodedAccessToken.userInfo.userName,
      userEmail: decodedAccessToken.userInfo.userEmail,
    };
  }

  if (permissionToken) {
    const decodedPermissionToken = jwtDecode(permissionToken);
    userRoles = decodedPermissionToken.userRoles;
  }

  store.dispatch(
    setAuthCreds({
      accessToken: accessToken || currentState.accessToken,
      userInfo,
      permissionToken: permissionToken || currentState.permissionToken,
      userRoles,
    })
  );
};

export const resetAuthCredentials = () => {
  store.dispatch(resetAuthCreds());
};
