import Header from "../../common/components/header/Header";
import FormInvoiceAddEdit from "../../common/components/form/FormInvoiceAddEdit";

const InvoicesNew = () => {
  return (
    <>
      <Header title="New Invoice" />
      <main className="invoiceNew">
        <FormInvoiceAddEdit data="" formId="formInvoiceAdd" method="POST" />
      </main>
    </>
  );
};

export default InvoicesNew;
