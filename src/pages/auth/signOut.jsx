import { useEffect } from "react";

import useAuth from "../../common/hooks/useAuth";

const SignOut = () => {
  const { signout } = useAuth();

  useEffect(() => {
    signout();
  }, []);

  return null;
};

export default SignOut;
