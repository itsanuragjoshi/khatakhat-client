import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = () => {
  const { accessToken } = useSelector((state) => state.auth);
  return !accessToken ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default RedirectIfAuthenticated;
