import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/Table";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Users = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: userRolesByOrg } = useFetchData(
    "/users/byOrg",
    { orgId },
    "authZ"
  );

  const createActions = (userRoleId) => [
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Edit",
      btnIcon: <EditIcon />,
      btnClick: () => navigate(`/settings/users/${userRoleId}/edit`),
    },
    // {
    //   btnType: "button",
    //   btnClass: "btnSecondary",
    //   btnText: "Delete",
    //   btnIcon: <DeleteIcon />,
    //   btnClick: () => {},
    // },
  ];

  const formatData = userRolesByOrg?.map(({ _id, userId, roleId }) => ({
    User: { value: userId.userName },
    Email: { value: userId.userEmail },
    Role: { value: roleId.roleName },
    actions: { value: createActions(_id) },
  }));

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
        <Table data={formatData} />
      </main>
    </>
  );
};

export default Users;
