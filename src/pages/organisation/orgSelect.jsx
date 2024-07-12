import Header from "../../common/components/header/Header";
import FormOrgProfileAddEdit from "../../common/components/form/FormOrgProfileAddEdit";
import useFetchData from "../../common/hooks/useFetchData";
import { useParams } from "react-router-dom";

const OrgSelect = () => {
  const { id } = useParams();
  const orgId = id;
//   const {
//     data: orgData,
//     loading,
//     error,
//   } = useFetchData(`${import.meta.env.VITE_APP_API_URI}/org/${orgId}`);

  return (
    <>
      <Header title="Select an Organisation" />
      <main className="orgEdit">
        {/* <FormOrgProfileAddEdit
          data={orgData}
          formId="formOrgProfile"
          method="PUT"
          orgId={orgId}
        /> */}
      </main>
    </>
  );
};

export default OrgSelect;
