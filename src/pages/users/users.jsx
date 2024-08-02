import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/table";
import useFetchData from "../../common/hooks/useFetchData";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";

const Users = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: userRolesByOrg } = useFetchData("/users/byOrg", { orgId }, "authZ");

  const renamedProps = userRolesByOrg?.map(({ userId, roleId }) => ({
    User: userId.userName,
    Email: userId.userEmail,
    Role: roleId.roleName,
  }));

  const actionList = [
    { to: "#", icon: <EditIcon />, title: "Edit" },
    { to: "#", icon: <DeleteIcon />, title: "Delete" },
  ];

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "New User",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/settings/users/new"),
    },
  ];

  return (
    <>
      <Header title="All Users" buttons={buttons} />
      <main className="users relative">
        <Table data={renamedProps} actionList={actionList} />
      </main>
    </>
  );
};

export default Users;
