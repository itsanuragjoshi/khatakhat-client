import Header from "../../common/components/header/Header";
import FormOrgAddEdit from "../../common/components/form/FormOrgAddEdit";
import Alert from "../../common/components/alert/Alert";

const OrgNew = () => {
  return (
    <>
      <Header title="Organisation Profile Set Up" />
      <main className="orgNew">
        <Alert
          type="info"
          message="You can change these details later in Settings, if needed."
        />
        <FormOrgAddEdit data="" formId="formOrgProfileNew" method="POST" />
      </main>
    </>
  );
};

export default OrgNew;
