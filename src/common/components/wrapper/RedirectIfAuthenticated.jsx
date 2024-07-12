import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { accessToken, userRoles } = useSelector((state) => state.auth);

  return !accessToken ? (
    <Outlet />
  ) : userRoles && userRoles.length > 0 ? (
    <Navigate to="/selectOrg" replace />
  ) : (
    <Navigate to="/createOrg" replace />
  );
};

export default RedirectIfAuthenticated;
