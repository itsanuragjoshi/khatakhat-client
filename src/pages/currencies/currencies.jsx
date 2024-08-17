import { useNavigate } from "react-router-dom";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/Table";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Currencies = () => {
  const navigate = useNavigate();
  const { data: currencies } = useFetchData("/currencies/default");

  const renamedProps = currencies?.map(
    ({ currencyCode, currencyName, currencySymbol }) => ({
      Code: currencyCode,
      Name: currencyName,
      Symbol: currencySymbol,
    })
  );

  const actionList = [
    { to: "#", icon: <EditIcon />, title: "Edit" },
    { to: "#", icon: <DeleteIcon />, title: "Delete" },
  ];

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "New Currency",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/settings/currencies/new"),
    },
  ];

  return (
    <>
      <Header title="Currencies" buttons={buttons} />
      <main className="currencies relative">
        <Table data={renamedProps} actionList={actionList} />
      </main>
    </>
  );
};

export default Currencies;
