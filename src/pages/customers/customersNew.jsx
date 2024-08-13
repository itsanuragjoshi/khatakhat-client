import Header from "../../common/components/header/Header";
import FormCustomerAddEdit from "../../common/components/form/FormCustomerAddEdit";

const CustomersNew = () => {
  return (
    <>
      <Header title="New Customer" />
      <main className="customersNew">
        <FormCustomerAddEdit data="" formId="formCustomerAdd" method="POST" />
      </main>
    </>
  );
};

export default CustomersNew;
