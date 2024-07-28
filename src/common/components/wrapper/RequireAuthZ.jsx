import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const RequireAuthZ = ({ children, module, permission }) => {
  const { orgId } = useParams();
  const { userRoles } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.persistAuth);

  // Check if userRoles contains an error
  if (userRoles?.error) {
    return <Navigate to="/unauthorized" />;
  }

  const role = userRoles?.find((userRole) => userRole.orgId._id === orgId);

  return isLoading ? (
    <Loader />
  ) : !role ? (
    <Navigate to="/unauthorized" />
  ) : role.roleId.permissions?.[module]?.[permission] ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default RequireAuthZ;
