import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import useToastContext from "./useToastContext";

const useOrg = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const createOrg = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosPrivate.post("/org", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
          error.response?.data.error ||
            "Error! Unable to create your organisation.",
          "error"
        );
      }
    }
  };

  const updateOrg = async (orgId, formData, setErrors, initialErrorValues) => {
    try {
      const response = await axiosPrivate.put(`/org/${orgId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate(window.location.pathname);
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
            "Error! Unable to update your organisation.",
          "error"
        );
      }
    }
  };

  return { createOrg, updateOrg };
};

export default useOrg;
