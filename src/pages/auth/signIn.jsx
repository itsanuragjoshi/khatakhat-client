import Header from "../../common/components/header/Header";
import FormSignin from "../../common/components/form/FormSignin";

const SignIn = () => {
  return (
    <>
      <Header title="Sign In to access Khatakhat" />
      <main className="formSignin">
        <FormSignin data="" formId="formSignin" />
      </main>
    </>
  );
};

export default SignIn;
