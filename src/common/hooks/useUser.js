import { axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";

const useUser = () => {
  const { showToast } = useToastContext();

  const createUser = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.post("/users", formData, {
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
          error.response?.data.error || "Failed to create user.",
          "error"
        );
      }
    }
  };

  const updateUser = async (
    userRoleId,
    formData,
    setErrors,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.put(`/users/${userRoleId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setErrors(initialErrorValues);
      showToast(response?.data?.success, "success");
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
          error.response?.data.error || "Failed to update user.",
          "error"
        );
      }
    }
  };

  return {
    createUser,
    updateUser,
  };
};

export default useUser;
