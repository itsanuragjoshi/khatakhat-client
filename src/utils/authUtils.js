import store from "../redux/store";
import { setAuthCreds, resetAuthCreds } from "../redux/slices/authSlice";

const authUtils = (accessToken) => {
  accessToken
    ? store.dispatch(setAuthCreds({ accessToken }))
    : store.dispatch(resetAuthCreds());
};

export default authUtils;
