import { useNavigate } from "react-router-dom";
import { axiosPublic, axiosAuthN } from "../../api/axios";
import useToastContext from "./useToastContext";
import { setAuthN, resetAuthN, resetAuthZ } from "../../utils/authUtils";

const useAuth = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

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

      const { accessToken } = response.data;

      setAuthN({ accessToken });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/org/select", { replace: true });
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

      const { accessToken } = response.data;

      setAuthN({ accessToken });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/org/select", { replace: true });
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
      const response = await axiosAuthN.post("/auth/signout");

      resetAuthN();
      resetAuthZ();

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
