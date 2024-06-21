import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/table";
import useFetchData from "../../common/hooks/useFetchData";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Currencies = () => {
  const navigate = useNavigate();
  // const { data: currencies } = useFetchData(`${import.meta.env.VITE_APP_API_URI}/currencies/default`);

  // const renamedProps = currencies?.map(({ currencyCode, currencyName, currencySymbol }) => ({
  //     Code: currencyCode,
  //     Name: currencyName,
  //     Symbol: currencySymbol
  // }));

  // const actionList = [
  //     { to: "#", icon: <EditIcon />, title: "Edit" },
  //     { to: "#", icon: <DeleteIcon />, title: "Delete" },
  // ];

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
        {/* <Table data={renamedProps} actionList={actionList} /> */}
      </main>
    </>
  );
};

export default Currencies;
