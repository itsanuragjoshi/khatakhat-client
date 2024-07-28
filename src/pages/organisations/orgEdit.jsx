import Header from "../../common/components/header/Header";
import FormOrgAddEdit from "../../common/components/form/FormOrgAddEdit";
import useFetchData from "../../common/hooks/useFetchData";
import { useParams } from "react-router-dom";

const OrgEdit = () => {
  const { orgId } = useParams();
  const { data: orgData } = useFetchData(`/org/${orgId}`);

  return (
    <>
      <Header title="Organisation Profile" />
      <main className="orgEdit">
        <FormOrgAddEdit
          data={orgData}
          formId="formOrgProfile"
          method="PUT"
          orgId={orgId}
        />
      </main>
    </>
  );
};

export default OrgEdit;
