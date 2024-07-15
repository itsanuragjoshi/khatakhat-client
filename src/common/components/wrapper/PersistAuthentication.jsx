import { useEffect } from "react";
import {
  refreshAccessToken,
  refreshPermissionToken,
} from "../../../utils/refreshToken";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import Loader from "../loader/Loader";

const PersistAuthentication = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.keepAuthenticated);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      dispatch(startLoading("keepAuthenticated"));
      try {
        await refreshAccessToken();
        await refreshPermissionToken();
      } catch (error) {
      } finally {
        dispatch(stopLoading("keepAuthenticated"));
      }
    };
    verifyRefreshToken();
  }, []);

  return isLoading ? <Loader /> : <Outlet />;
};

export default PersistAuthentication;
