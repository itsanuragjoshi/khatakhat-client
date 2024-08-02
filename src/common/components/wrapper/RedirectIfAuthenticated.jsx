import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { accessToken, userRoles } = useSelector((state) => state.auth);

  return !accessToken ? (
    <Outlet />
  ) : !userRoles ? (
    <Navigate to="/org/select" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default RedirectIfAuthenticated;
