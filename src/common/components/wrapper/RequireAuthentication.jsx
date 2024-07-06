import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuthentication = () => {
  const { accessToken } = useSelector((state) => state.auth);
 
  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default RequireAuthentication;
