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
      navigate("/selectOrg", { replace: true });
    } else {
      navigate("/createOrg", { replace: true });
    }
  };

  const signin = async (
    input,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axiosPublic.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken } = response.data;
      setAuthCredentials({ accessToken });

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
          error.response?.data.error || "Something went wrong",
          "error"
        );
      }
    }
  };

  const signup = async (
    input,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axiosPublic.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken } = response.data;
      setAuthCredentials({ accessToken });

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
          error.response?.data.error || "Something went wrong",
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
      showToast(error.response?.data?.error || "Something went wrong", "error");
    }
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
