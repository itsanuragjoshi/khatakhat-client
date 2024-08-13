import Header from "../../common/components/header/Header";
import FormInvoiceAddEdit from "../../common/components/form/FormInvoiceAddEdit";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetchData from "../../common/hooks/useFetchData";
import Loader from "../../common/components/loader/Loader";

const InvoicesEdit = () => {
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { invoiceId } = useParams();

  const { data: invoiceData, isLoading } = useFetchData(
    `/invoices/${invoiceId}`,
    { orgId },
    "authZ"
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header title="Edit Invoice" />
      <main className="invoiceEdit">
        <FormInvoiceAddEdit
          data={invoiceData}
          formId="formInvoiceEdit"
          method="PUT"
          invoiceId={invoiceId}
        />
      </main>
    </>
  );
};

export default InvoicesEdit;
