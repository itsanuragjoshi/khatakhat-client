import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const location = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/dashboard";

  return !accessToken ? (
    <Outlet />
  ) : location.pathname === "/signout" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to={from} state={{ from: location }} replace />
  );
};

export default RedirectIfAuthenticated;
