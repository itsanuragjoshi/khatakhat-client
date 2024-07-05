import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignedIn = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default SignedIn;
