import { useEffect } from "react";
import refreshToken from "../../../utils/refreshToken";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import Loader from "../loader/Loader";

const KeepAuthenticated = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.keepAuthenticated);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      dispatch(startLoading("keepAuthenticated"));
      try {
        await refreshToken();
      } catch (error) {
      } finally {
        dispatch(stopLoading("keepAuthenticated"));
      }
    };

    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken]);

  return isLoading ? <Loader /> : <Outlet />;
};

export default KeepAuthenticated;