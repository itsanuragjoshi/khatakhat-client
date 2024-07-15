import { useNavigate } from "react-router-dom";
import { axiosPublic, axiosPrivate } from "../../api/axios";
import useToastContext from "./useToastContext";
import {
  setAuthCredentials,
  resetAuthCredentials,
} from "../../utils/authUtils";
import { useSelector } from "react-redux";

const useAuth = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { userRole } = useSelector((state) => state.auth);

  const handleNavigation = () => {
    if (userRole && userRole.length > 0) {
      navigate("/org/select", { replace: true });
    } else {
      navigate("/org/new", { replace: true });
    }
  };

  const signin = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosPublic.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, permissionToken } = response.data;
      setAuthCredentials({ accessToken, permissionToken });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      handleNavigation();
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.field] = err.error;
          return acc;
        }, {});
        setErrors(backendErrors);
      } else {
        showToast(
          error.response?.data.error ||
            "Error! Unable to sign in to your account.",
          "error"
        );
      }
    }
  };

  const signup = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosPublic.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, permissionToken } = response.data;
      setAuthCredentials({ accessToken, permissionToken });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      handleNavigation();
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.field] = err.error;
          return acc;
        }, {});
        setErrors(backendErrors);
      } else {
        showToast(
          error.response?.data.error ||
            "Error! Unable to sign up for your account.",
          "error"
        );
      }
    }
  };

  const signout = async () => {
    try {
      const response = await axiosPrivate.post("/auth/signout");
      resetAuthCredentials();
      showToast(response?.data?.success, "success");

      navigate("/", { replace: true });
    } catch (error) {
      showToast(
        error.response?.data?.error ||
          "Error! Unable to sign out of your account.",
        "error"
      );
    }
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
