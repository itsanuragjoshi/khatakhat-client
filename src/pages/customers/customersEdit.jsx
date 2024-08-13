import Header from "../../common/components/header/Header";
import FormCustomerAddEdit from "../../common/components/form/FormCustomerAddEdit";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetchData from "../../common/hooks/useFetchData";
import Loader from "../../common/components/loader/Loader";

const CustomersEdit = () => {
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
      <main className="customersEdit">
        <FormCustomerAddEdit
          data={customerData}
          formId="formCustomerEdit"
          method="PUT"
          customerId={customerId}
        />
      </main>
    </>
  );
};

export default CustomersEdit;
