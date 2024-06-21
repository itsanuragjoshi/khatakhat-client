import Header from "../../common/components/header/Header";
import FormOrgProfileAddEdit from "../../common/components/form/FormOrgProfileAddEdit";
import Alert from "../../common/components/alert/Alert";

const OrgprofileNew = () => {
  return (
    <>
      <Header title="Organisation Profile Set Up" />
      <main className="orgNew">
        <Alert
          type="info"
          message="You can change these details later in Settings, if needed."
        />
        <FormOrgProfileAddEdit
          data=""
          formId="formOrgProfileNew"
          method="POST"
        />
      </main>
    </>
  );
};

export default OrgprofileNew;
