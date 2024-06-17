import Header from '../../common/components/header/Header';
import FormCustomerAddEdit from '../../common/components/form/FormCustomerAddEdit';

const CustomersNew = () => {
    const initialInputValues = {
        customerType: 'Business',
        customerName: '',
        customerDisplayName: '',
        customerEmail: '',
        customerWorkPhone: '',
        customerMobile: '',
        customerCurrency: '',
        customerGST: 'No',
        customerGSTIN: '',
        customerPlaceOfSupply: '',
        customerBillingCountry: '',
        customerBillingAddress1: '',
        customerBillingAddress2: '',
        customerBillingCity: '',
        customerBillingState: '',
        customerBillingPincode: '',
        customerShippingCountry: '',
        customerShippingAddress1: '',
        customerShippingAddress2: '',
        customerShippingCity: '',
        customerShippingState: '',
        customerShippingPincode: '',
    };

    return (
        <>
            <Header title="New Customer" />
            <main className="customersNew">
                <FormCustomerAddEdit initialInputValues={initialInputValues} formId="formCustomerAdd"/>
            </main>
        </>
    );
};

export default CustomersNew;
