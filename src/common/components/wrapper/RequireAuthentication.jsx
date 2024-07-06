import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuthentication = () => {
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default RequireAuthentication;
