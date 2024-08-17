import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import FormCustomer from "../../common/components/form/FormCustomer";
import Loader from "../../common/components/loader/Loader";

const CustomerEdit = () => {
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { customerId } = useParams();

  const { data: customerData, isLoading } = useFetchData(
    `/customers/${customerId}`,
    { orgId },
    "authZ"
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header title="Edit Customer" />
      <main className="customerEdit">
        <FormCustomer
          data={customerData}
          formId="formCustomerEdit"
          method="PUT"
          customerId={customerId}
        />
      </main>
    </>
  );
};

export default CustomerEdit;
