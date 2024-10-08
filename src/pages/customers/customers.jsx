import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/Table";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Customers = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: customersByOrg } = useFetchData(
    "/customers/byOrg",
    { orgId },
    "authZ"
  );

  const createActions = (customerId) => [
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Edit",
      btnIcon: <EditIcon />,
      btnClick: () => navigate(`/customers/${customerId}/edit`),
    },
    // {
    //   btnType: "button",
    //   btnClass: "btnSecondary",
    //   btnText: "Delete",
    //   btnIcon: <DeleteIcon />,
    //   btnClick: () => {},
    // },
  ];

  const formatData = customersByOrg?.map(
    ({ _id, customerName, customerDisplayName, customerEmail }) => ({
      Name: { value: customerName },
      "Display Name": { value: customerDisplayName },
      Email: { value: customerEmail },
      actions: { value: createActions(_id) },
    })
  );

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "New Customer",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/customers/new"),
    },
  ];

  return (
    <>
      <Header title="Customers" buttons={buttons} />
      <main className="customers relative">
        <Table data={formatData} />
      </main>
    </>
  );
};

export default Customers;
