import axios from "axios";
import store from "../redux/store";
import {
  refreshAccessToken,
  refreshPermissionToken,
} from "../utils/refreshToken";

/*
  axiosPublic - for unauthenticated requests
  axiosAuthN - for requests requiring only authentication (access token)
  axiosAuthZ - for requests requiring both authentication and authorization (access token and permission token)
*/

const BASE_URL = import.meta.env.VITE_APP_API_URI;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosAuthN = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosAuthZ = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosAuthN.interceptors.request.use(
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

axiosAuthZ.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    const permissionToken = state.auth.permissionToken;
    const orgId = state.auth.userRoles?.orgId?._id;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (permissionToken) {
      config.headers["Authorization-Role"] = `Bearer ${permissionToken}`;
    }

    if (orgId) {
      config.params = {
        ...config.params,
        orgId: orgId,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthN.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        const state = store.getState();
        const newAccessToken = state.auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosAuthN(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

axiosAuthZ.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        const state = store.getState();
        const newAccessToken = state.auth.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        await refreshPermissionToken();
        const newPermissionToken = state.auth.permissionToken;
        originalRequest.headers[
          "Authorization-Role"
        ] = `Bearer ${newPermissionToken}`;

        return axiosAuthZ(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosAuthN, axiosAuthZ };
