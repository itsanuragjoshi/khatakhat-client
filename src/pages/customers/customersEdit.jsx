import Header from "../../common/components/header/Header";
import FormCustomersAddEdit from "../../common/components/form/FormCustomersAddEdit";

const CustomersEdit = () => {
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
      <Header title="Edit Customer" />
      <main className="customersEdit">
        <FormCustomersAddEdit
          initialInputValues={initialInputValues}
          formId="formCustomerEdit"
        />
      </main>
    </>
  );
};

export default CustomersEdit;
