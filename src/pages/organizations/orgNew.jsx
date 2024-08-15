import Header from "../../common/components/header/Header";
import FormOrg from "../../common/components/form/FormOrg";
import Alert from "../../common/components/alert/Alert";

const OrgNew = () => {
  return (
    <>
      <Header title="New Organization" />
      <main className="orgNew">
        <Alert
          type="info"
          message="You can change these details later in Settings, if needed."
        />
        <FormOrg data="" formId="formOrgNew" method="POST" />
      </main>
    </>
  );
};

export default OrgNew;
