import Header from "../../common/components/header/Header";
import FormCustomersAddEdit from "../../common/components/form/FormCustomersAddEdit";

const CustomersNew = () => {
  return (
    <>
      <Header title="New Customer" />
      <main className="customersNew">
        <FormCustomersAddEdit data="" formId="formCustomersAdd" method="POST" />
      </main>
    </>
  );
};

export default CustomersNew;
