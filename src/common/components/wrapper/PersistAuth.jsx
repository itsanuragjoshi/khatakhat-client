import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  refreshAccessToken,
  refreshPermissionToken,
} from "../../../utils/refreshToken";
import Loader from "../loader/Loader";

const PersistAuth = ({ children }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.persistAuth);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      dispatch(startLoading("persistAuth"));
      try {
        await refreshAccessToken();
        await refreshPermissionToken();
      } catch (error) {
      } finally {
        dispatch(stopLoading("persistAuth"));
      }
    };
    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken, dispatch]);

  return isLoading ? <Loader /> : children;
};

export default PersistAuth;
