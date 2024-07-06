import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
