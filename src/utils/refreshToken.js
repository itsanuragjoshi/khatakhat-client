import { axiosPublic } from "../api/axios";
import { setAuthCredentials } from "../utils/authUtils";

export const refreshAccessToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/refreshAccessToken");
    setAuthCredentials({ accessToken: response.data.accessToken });
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};

export const refreshPermissionToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/refreshPermissionToken");
    setAuthCredentials({ permissionToken: response.data.permissionToken });
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};
