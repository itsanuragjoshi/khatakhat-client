import { useNavigate } from "react-router-dom";
import { axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";
import { useSelector } from "react-redux";

const useUsers = () => {
  const navigate = useNavigate();
  const { userRoles } = useSelector((state) => state.auth);
  const orgId = userRoles?.orgId?._id;

  const { showToast } = useToastContext();

  const createUsers = async (
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
        params: {
          orgId: orgId,
        },
      });

      setInput(initialInputValues);
      setErrors(initialErrorValues);
      showToast(response?.data.success, "success");
      navigate("/settings/users", { replace: true });
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
          error.response?.data.error || "Error! Unable to create the user.",
          "error"
        );
      }
    }
  };

  const updateUsers = async (
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
        params: {
          orgId: orgId,
        },
      });

      setErrors(initialErrorValues);
      showToast(response?.data?.success, "success");
      navigate("/settings/users", { replace: true });
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
          error.response?.data.error || "Error! Unable to update the user.",
          "error"
        );
      }
    }
  };

  return {
    createUsers,
    updateUsers,
  };
};

export default useUsers;
