import Header from "../../common/components/header/Header";
import FormUserAddEdit from "../../common/components/form/FormUserAddEdit";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetchData from "../../common/hooks/useFetchData";
import Loader from "../../common/components/loader/Loader";

const UsersEdit = () => {
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
      <main className="usersEdit">
        <FormUserAddEdit
          data={userRoleInfo}
          formId="formUserEdit"
          method="PUT"
          userRoleId={userRoleId}
        />
      </main>
    </>
  );
};

export default UsersEdit;
