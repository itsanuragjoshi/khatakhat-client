import { axiosPublic } from "../api/axios";
import { setAuthCredentials } from "../utils/authUtils";
const refreshToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/refreshToken");
    setAuthCredentials(response.data);
  } catch (error) {
    showToast(error.response?.data.error || "Something went wrong", "error");
  }
};

export default refreshToken;
