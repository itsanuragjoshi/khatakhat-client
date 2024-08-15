import Header from "../../common/components/header/Header";
import FormUser from "../../common/components/form/FormUser";

const UserNew = () => {
  return (
    <>
      <Header title="New User" />
      <main className="userNew">
        <FormUser data="" formId="formUserNew" />
      </main>
    </>
  );
};

export default UserNew;
