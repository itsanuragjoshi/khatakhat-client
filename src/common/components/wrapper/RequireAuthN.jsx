import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Loader from "../loader/Loader";

const RequireAuthN = () => {
  const location = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.persistAuth);

  return isLoading ? (
    <Loader />
  ) : accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuthN;
