import axios from "axios";
import store from "../redux/store";
import authUtils from "../utils/authUtils";

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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    // Handle successful responses
    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      console.log("newAccessToken", newAccessToken);

      // Update authentication utilities with the new access token
      authUtils(newAccessToken);

      // Clone the request configuration to retry with the new token
      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Retry the original request with the updated token
      return axiosPrivate(originalRequest);
    }

    // Return the response as-is if no access token is found in the response data
    return response;
  },
  (error) => {
    // Handle errors
    authUtils(); // Clear authentication state or handle error
    return Promise.reject(error); // Propagate the error down the promise chain
  }
);

export { axiosPublic, axiosPrivate };
