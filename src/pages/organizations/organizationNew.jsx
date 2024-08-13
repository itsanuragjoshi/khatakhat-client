import Header from "../../common/components/header/Header";
import FormOrgAddEdit from "../../common/components/form/FormOrgAddEdit";
import Alert from "../../common/components/alert/Alert";

const OrganizationNew = () => {
  return (
    <>
      <Header title="New Organization" />
      <main className="organizationNew">
        <Alert
          type="info"
          message="You can change these details later in Settings, if needed."
        />
        <FormOrgAddEdit data="" formId="formOrganizationNew" method="POST" />
      </main>
    </>
  );
};

export default OrganizationNew;
