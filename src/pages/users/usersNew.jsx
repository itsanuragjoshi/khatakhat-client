import Header from "../../common/components/header/Header";
import FormUserAddEdit from "../../common/components/form/FormUserAddEdit";

const UsersNew = () => {
  return (
    <>
      <Header title="New User" />
      <main className="usersNew">
        <FormUserAddEdit data="" formId="formUserAdd" />
      </main>
    </>
  );
};

export default UsersNew;
