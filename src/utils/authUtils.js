import store from "../redux/store";
import { jwtDecode } from "jwt-decode";
import {
  setAuthentication,
  resetAuthentication,
  setAuthorization,
  resetAuthorization,
} from "../redux/slices/authSlice";

export const setAuthN = ({ accessToken }) => {
  const currentState = store.getState().auth;
  let userInfo = currentState.userInfo || null;

  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    userInfo = {
      userId: decodedAccessToken.userInfo.userId,
      userName: decodedAccessToken.userInfo.userName,
      userEmail: decodedAccessToken.userInfo.userEmail,
    };
  }

  store.dispatch(
    setAuthentication({
      accessToken: accessToken || currentState.accessToken,
      userInfo,
    })
  );
};

export const setAuthZ = ({ permissionToken }) => {
  const currentState = store.getState().auth;
  let userRoles = currentState.userRoles || null;

  if (permissionToken) {
    const decodedPermissionToken = jwtDecode(permissionToken);
    userRoles = decodedPermissionToken.userRoles;
  }

  store.dispatch(
    setAuthorization({
      permissionToken: permissionToken || currentState.permissionToken,
      userRoles,
    })
  );
};

export const resetAuthN = () => {
  store.dispatch(resetAuthentication());
};

export const resetAuthZ = () => {
  store.dispatch(resetAuthorization());
};
