import Header from "../../common/components/header/Header";
import FormCustomer from "../../common/components/form/FormCustomer";

const CustomerNew = () => {
  return (
    <>
      <Header title="New Customer" />
      <main className="customerNew">
        <FormCustomer data="" formId="formCustomerNew" method="POST" />
      </main>
    </>
  );
};

export default CustomerNew;
