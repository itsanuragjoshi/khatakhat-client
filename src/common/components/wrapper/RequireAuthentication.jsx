import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuthentication = () => {
  const location = useLocation();
  const { accessToken } = useSelector((state) => state.auth);

  return location.pathname === "/signout" ? (
    <Outlet />
  ) : accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuthentication;
