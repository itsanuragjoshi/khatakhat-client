import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/table";
import useFetchData from "../../common/hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";

const Customers = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: customersByOrg } = useFetchData(
    "/customers/byOrg",
    { orgId },
    "authZ"
  );

  // Define actions for each user role
  const createActions = (customerId) => [
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Edit",
      btnIcon: <EditIcon />,
      btnClick: () => navigate(`/customers/${customerId}/edit`),
    },
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Delete",
      btnIcon: <DeleteIcon />,
      btnClick: () => {},
    },
  ];

  const formatData = customersByOrg?.map(
    ({ _id, customerName, customerDisplayName, customerEmail }) => ({
      Name: customerName,
      "Display Name": customerDisplayName,
      Email: customerEmail,
      actions: createActions(_id),
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
