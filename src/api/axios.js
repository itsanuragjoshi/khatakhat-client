import axios from "axios";
import store from "../redux/store";
import {
  refreshAccessToken,
  refreshPermissionToken,
} from "../utils/refreshToken";

// Define the base URL for the API
const BASE_URL = import.meta.env.VITE_APP_API_URI;

// Create the public Axios instance
const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Create the private Axios instance with interceptors for authorization
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor for private Axios instance
axiosPrivate.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    const permissionToken = state.auth.permissionToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (permissionToken) {
      config.headers["Authorization-Role"] = `Bearer ${permissionToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for private Axios instance
axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh access token
        await refreshAccessToken();
        const state = store.getState();
        const newAccessToken = state.auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Refresh permission token
        await refreshPermissionToken();
        const newPermissionToken = state.auth.permissionToken;
        originalRequest.headers[
          "Authorization-Role"
        ] = `Bearer ${newPermissionToken}`;

        return axiosPrivate(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
