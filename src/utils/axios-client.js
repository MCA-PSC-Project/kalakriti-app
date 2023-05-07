import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  refresh,
} from "../services/auth-service";

export const baseUrl = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
  baseURL: baseUrl,
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer " + getAccessToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { response, config } = error;

    if (response.status === 400) {
      return Promise.reject(error);
    }

    if (getRefreshToken()) {
      if (response.status === 401) {
        if (response.data.message === "Unauthorized") {
          return Promise.reject(error);
        }
        await refresh();
        return axiosClient(config);
      }
    }

    return Promise.reject(error);
  }
);
