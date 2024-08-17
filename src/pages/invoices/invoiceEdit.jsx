import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import FormInvoice from "../../common/components/form/FormInvoice";
import Loader from "../../common/components/loader/Loader";

const InvoiceEdit = () => {
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
        <FormInvoice
          data={invoiceData}
          formId="formInvoiceEdit"
          method="PUT"
          invoiceId={invoiceId}
        />
      </main>
    </>
  );
};

export default InvoiceEdit;
