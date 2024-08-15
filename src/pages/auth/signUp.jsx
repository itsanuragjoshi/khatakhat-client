import Header from "../../common/components/header/Header";
import FormSignup from "../../common/components/form/FormSignup";

const SignUp = () => {
  return (
    <>
      <Header title="Create your account on Khatakhat" />
      <main className="formSignup">
        <FormSignup data="" formId="formSignup" />
      </main>
    </>
  );
};

export default SignUp;
