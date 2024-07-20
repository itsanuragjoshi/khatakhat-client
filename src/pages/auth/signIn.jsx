import Header from "../../common/components/header/Header";
import FormUserSignin from "../../common/components/form/FormUserSignin";

const SignIn = () => {
  return (
    <>
      <Header title="Sign In to access Khatakhat" />
      <main className="formUserSignIn">
        <FormUserSignin data="" formId="formUserSignIn" />
      </main>
    </>
  );
};

export default SignIn;
