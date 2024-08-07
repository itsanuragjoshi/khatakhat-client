import { useNavigate } from "react-router-dom";
import { axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";

const useCustomers = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const createCustomers = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.post("/customers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/customers", { replace: true });
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
          error.response?.data.error || "Failed to create customer.",
          "error"
        );
      }
    }
  };

  const updateCustomers = async (
    customerId,
    formData,
    setErrors,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.put(
        `/customers/${customerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/customers", { replace: true });
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
          error.response?.data.error || "Failed to update customer.",
          "error"
        );
      }
    }
  };

  return { createCustomers, updateCustomers };
};

export default useCustomers;
