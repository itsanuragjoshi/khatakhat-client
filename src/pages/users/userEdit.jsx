import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import FormUser from "../../common/components/form/FormUser";
import Loader from "../../common/components/loader/Loader";

const UserEdit = () => {
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { userRoleId } = useParams();

  const { data: userData, isLoading } = useFetchData(
    `/users/${userRoleId}`,
    { orgId },
    "authZ"
  );

  const userRoleInfo = userData
    ? {
        roleName: userData.roleId?.roleName || "",
        userEmail: userData.userId?.userEmail || "",
        userName: userData.userId?.userName || "",
      }
    : {};

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header title="Edit User" />
      <main className="userEdit">
        <FormUser
          data={userRoleInfo}
          formId="formUserEdit"
          method="PUT"
          userRoleId={userRoleId}
        />
      </main>
    </>
  );
};

export default UserEdit;
