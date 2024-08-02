import { axiosPublic } from "../api/axios";
import { setAuthN, setAuthZ } from "../utils/authUtils";

export const refreshAccessToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/refreshAccessToken");
    setAuthN({ accessToken: response.data.accessToken });
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};

export const generatePermissionToken = async ({ orgId}) => {
  try {
    const response = await axiosPublic.get("/auth/generatePermissionToken", {
      params: {
        orgId,
      },
    });
    setAuthZ({ permissionToken: response.data.permissionToken });
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};

export const refreshPermissionToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/refreshPermissionToken");
    setAuthZ({ permissionToken: response.data.permissionToken });
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};
