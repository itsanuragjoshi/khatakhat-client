import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loader from "../loader/Loader";

const RequireAuthZ = ({ children, module, permission }) => {
  const { userRoles } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.persistAuth);

  if (userRoles?.error) {
    return <Navigate to="/error403" />;
  }

  return isLoading ? (
    <Loader />
  ) : !userRoles ? (
    <Navigate to="/error403" />
  ) : userRoles?.roleId?.permissions?.[module]?.[permission] ? (
    children
  ) : (
    <Navigate to="/error403" />
  );
};

export default RequireAuthZ;
