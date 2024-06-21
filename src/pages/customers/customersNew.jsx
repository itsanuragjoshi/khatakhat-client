import Header from "../../common/components/header/Header";
import FormCustomersAddEdit from "../../common/components/form/FormCustomersAddEdit";

const CustomersNew = () => {
  const initialInputValues = {
    customerType: "Business",
    customerName: "",
    customerDisplayName: "",
    customerEmail: "",
    customerWorkPhone: "",
    customerMobile: "",
    customerCurrency: "",
    customerGST: "No",
    customerGSTIN: "",
    customerPlaceOfSupply: "",
    customerBillingCountry: "",
    customerBillingAddress1: "",
    customerBillingAddress2: "",
    customerBillingCity: "",
    customerBillingState: "",
    customerBillingPincode: "",
    customerShippingCountry: "",
    customerShippingAddress1: "",
    customerShippingAddress2: "",
    customerShippingCity: "",
    customerShippingState: "",
    customerShippingPincode: "",
  };

  return (
    <>
      <Header title="New Customer" />
      <main className="customersNew">
        <FormCustomersAddEdit
          initialInputValues={initialInputValues}
          formId="formCustomersAdd"
        />
      </main>
    </>
  );
};

export default CustomersNew;
