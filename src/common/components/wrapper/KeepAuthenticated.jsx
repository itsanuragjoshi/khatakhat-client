import { useEffect } from "react";
import refreshToken from "../../../utils/refreshToken";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const KeepAuthenticated = () => {
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {}
    };
    !accessToken ? verifyRefreshToken() : null;
  }, []);

  return <Outlet />;
};

export default KeepAuthenticated;
