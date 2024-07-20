import Header from "../../common/components/header/Header";
import FormUserSignup from "../../common/components/form/FormUserSignup";

const SignUp = () => {
  return (
    <>
      <Header title="Create your account on Khatakhat" />
      <main className="formUserSignUp">
        <FormUserSignup data="" formId="formUserSignUp" />
      </main>
    </>
  );
};

export default SignUp;
