import Header from "../../common/components/header/Header";
import FormInvoice from "../../common/components/form/FormInvoice";

const InvoiceNew = () => {
  return (
    <>
      <Header title="New Invoice" />
      <main className="invoiceNew">
        <FormInvoice data="" formId="formInvoiceNew" method="POST" />
      </main>
    </>
  );
};

export default InvoiceNew;
