import { useSelector } from "react-redux";

import useFetchData from "../../common/hooks/useFetchData";

import Header from "../../common/components/header/Header";
import FormOrg from "../../common/components/form/FormOrg";
import Loader from "../../common/components/loader/Loader";

const OrgEdit = () => {
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { data: orgData, isLoading } = useFetchData(
    `/org/${orgId}`,
    {},
    "authZ"
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header title="Organization Profile" />
      <main className="orgEdit">
        <FormOrg
          data={orgData}
          formId="formOrgEdit"
          method="PUT"
          orgId={orgId}
        />
      </main>
    </>
  );
};

export default OrgEdit;
