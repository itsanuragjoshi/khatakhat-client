import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetchData from "../../common/hooks/useFetchData";
import useDelete from "../../common/hooks/useDelete";

import Header from "../../common/components/header/Header";
import Table from "../../common/components/table/Table";
import ConfirmDelete from "../../common/components/confirmDelete/ConfirmDelete";
import Loader from "../../common/components/loader/Loader";

import { formatDate } from "../../utils/dateUtils";

import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Invoices = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const {
    data: invoicesByOrg,
    isLoading,
    refetch,
  } = useFetchData("/invoices/byOrg", { orgId }, "authZ");

  const { showConfirmDelete, hideConfirmDelete, handleDelete, isModal } =
    useDelete("invoices", refetch);

  const createActions = (invoiceId) => [
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Edit",
      btnIcon: <EditIcon />,
      btnClick: () => navigate(`/invoices/${invoiceId}/edit`),
    },
    {
      btnType: "button",
      btnClass: "btnSecondary",
      btnText: "Delete",
      btnIcon: <DeleteIcon />,
      btnClick: () => {
        showConfirmDelete(invoiceId);
      },
    },
  ];

  const formatData = invoicesByOrg?.map(
    ({
      _id,
      customerId,
      invoiceNumber,
      invoiceDate,
      invoiceDueDate,
      invoiceTotalAmount,
      invoiceStatus,
    }) => ({
      Date: { value: formatDate(invoiceDate) },
      "Invoice#": { value: invoiceNumber },
      "Customer Name": { value: customerId.customerName },
      Status: { value: invoiceStatus },
      "Due Date": { value: formatDate(invoiceDueDate) },
      Amount: { value: invoiceTotalAmount, align: "textRight" },
      actions: { value: createActions(_id) },
    })
  );

  const buttons = [
    {
      btnType: "button",
      btnClass: "btnPrimary",
      btnText: "New Invoice",
      btnIcon: <AddIcon />,
      btnClick: () => navigate("/invoices/new"),
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header title="Invoices" buttons={buttons} />
      <main className="invoices relative">
        <Table data={formatData} />
      </main>
      {isModal && (
        <ConfirmDelete
          message="Are you sure you want to delete invoice(s)?"
          onDelete={handleDelete}
          onCancel={hideConfirmDelete}
        />
      )}
    </>
  );
};

export default Invoices;
