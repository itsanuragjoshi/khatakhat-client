import { useEffect } from "react";
import refreshToken from "../../../utils/refreshToken";
import { useSelector } from "react-redux";

const PersistSignIn = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {}
    };
    !accessToken ? verifyRefreshToken() : null;
  }, []);

  return children;
};

export default PersistSignIn;
