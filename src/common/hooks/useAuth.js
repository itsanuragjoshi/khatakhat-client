import { useNavigate } from "react-router-dom";
import { axiosPublic, axiosPrivate } from "../../api/axios";
import useToastContext from "./useToastContext";
import { setAuthCredentials, resetAuthCredentials } from "../../utils/authUtils";

const useAuth = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

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
      navigate("/dashboard", { replace: true });
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
      navigate("/dashboard", { replace: true });
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
      showToast(response?.data.success, "success");
      navigate("/signin", { replace: true });
    } catch (error) {
      showToast(error.response?.data.error || "Something went wrong", "error");
    }
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
