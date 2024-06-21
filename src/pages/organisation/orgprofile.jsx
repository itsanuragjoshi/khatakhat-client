import Header from "../../common/components/header/Header";
import FormOrgProfileAddEdit from "../../common/components/form/FormOrgProfileAddEdit";
import useFetchData from "../../common/hooks/useFetchData";
import { useParams } from "react-router-dom";

const Orgprofile = () => {
  const { id } = useParams();
  const orgId = id;
  const {
    data: orgData,
    loading,
    error,
  } = useFetchData(`${import.meta.env.VITE_APP_API_URI}/org/${orgId}`);

  return (
    <>
      <Header title="Organisation Profile" />
      <main className="orgEdit">
        <FormOrgProfileAddEdit
          data={orgData}
          formId="formOrgProfile"
          method="PUT"
          orgId={orgId}
        />
      </main>
    </>
  );
};

export default Orgprofile;
