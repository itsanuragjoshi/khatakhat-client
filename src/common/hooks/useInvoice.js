import { useNavigate } from "react-router-dom";
import { axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";

const useInvoice = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const createInvoice = async (
    formData,
    setInput,
    setErrors,
    initialInputValues,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.post("/invoices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/invoices", { replace: true });
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
          error.response?.data.error || "Failed to create invoice.",
          "error"
        );
      }
    }
  };

  const updateInvoice = async (
    invoiceId,
    formData,
    setErrors,
    initialErrorValues
  ) => {
    try {
      const response = await axiosAuthZ.put(
        `/invoices/${invoiceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/invoices", { replace: true });
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
          error.response?.data.error || "Failed to update invoice.",
          "error"
        );
      }
    }
  };

  return { createInvoice, updateInvoice };
};

export default useInvoice;
