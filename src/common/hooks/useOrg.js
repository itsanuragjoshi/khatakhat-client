import { axiosAuthN, axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";
import { refreshPermissionToken } from "../../utils/refreshToken";

const useOrg = () => {
  const { showToast } = useToastContext();

  const createOrg = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthN.post("/org", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
    } catch (error) {
      if (error?.response?.data?.errors) {
        const backendErrors = error?.response?.data?.errors?.reduce(
          (acc, err) => {
            acc[err.field] = err.error;
            return acc;
          },
          {}
        );
        setErrors(backendErrors);
      } else {
        showToast(
          error.response?.data.error || "Failed to create organization.",
          "error"
        );
      }
    }
  };

  const updateOrg = async (orgId, formData, setErrors, initialErrorValues) => {
    try {
      const response = await axiosAuthZ.put(`/org/${orgId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      await refreshPermissionToken();
    } catch (error) {
      if (error?.response?.data?.errors) {
        const backendErrors = error?.response?.data?.errors?.reduce(
          (acc, err) => {
            acc[err.field] = err.error;
            return acc;
          },
          {}
        );
        setErrors(backendErrors);
      } else {
        showToast(
          error.response?.data.error || "Failed to update organization.",
          "error"
        );
      }
    }
  };

  return { createOrg, updateOrg };
};

export default useOrg;
