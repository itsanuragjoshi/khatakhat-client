import { useState } from "react";
import { axiosAuthZ } from "../../api/axios";
import useToastContext from "./useToastContext";

const useDelete = (entityType, refetch) => {
  const { showToast } = useToastContext();
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entityId, setEntityId] = useState(null);

  const showConfirmDelete = (entityId) => {
    setIsModal(true);
    setEntityId(entityId);
  };

  const hideConfirmDelete = () => {
    setIsModal(false);
    setEntityId(null);
  };

  const handleDelete = async () => {
    if (!entityId) return;
    setIsLoading(true);
    try {
      const response = await axiosAuthZ.delete(`/${entityType}/${entityId}`);
      showToast(response?.data.success, "success");
      refetch();
    } catch (error) {
      showToast(error.response?.data.error, "error");
    } finally {
      setIsLoading(false);
      hideConfirmDelete();
    }
  };

  return {
    showConfirmDelete,
    hideConfirmDelete,
    handleDelete,
    isModal,
    isLoading,
  };
};

export default useDelete;
