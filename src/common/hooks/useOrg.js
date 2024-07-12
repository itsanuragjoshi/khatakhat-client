import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import useToastContext from "./useToastContext";
import { useSelector } from "react-redux";

const useOrg = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
//   const { userRole } = useSelector((state) => state.auth);

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
          error.response?.data.error || "Error! Unable to create your organisation.",
          "error"
        );
      }
    }
  };

  const updateOrg = async (
    orgId,
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const res = await axiosPrivate.put(`/org/${orgId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setInput(initialInputValues);
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
          error.response?.data.error || "Error! Unable to update your organisation.",
          "error"
        );
      }
    }
  };

  return { createOrg, updateOrg };
};

export default useOrg;
