import Header from "../../common/components/header/Header";
import FormOrgAddEdit from "../../common/components/form/FormOrgAddEdit";
import useFetchData from "../../common/hooks/useFetchData";
import { useSelector } from "react-redux";
import Loader from "../../common/components/loader/Loader";

const OrganizationEdit = () => {
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
      <main className="organizationEdit">
        <FormOrgAddEdit
          data={orgData}
          formId="formOrganizationEdit"
          method="PUT"
          orgId={orgId}
        />
      </main>
    </>
  );
};

export default OrganizationEdit;