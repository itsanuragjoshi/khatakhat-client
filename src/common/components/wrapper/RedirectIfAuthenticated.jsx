import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { accessToken, userRole } = useSelector((state) => state.auth);

  return !accessToken ? (
    <Outlet />
  ) : userRole && userRole.length > 0 ? (
    <Navigate to="/selectOrg" replace />
  ) : (
    <Navigate to="/createOrg" replace />
  );
};

export default RedirectIfAuthenticated;
