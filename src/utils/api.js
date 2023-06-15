import axios from "axios";
import TokenService from "../services/token-service";
import AuthService from "../services/auth-service";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.url !== "/auth/refresh") {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== "/customers/auth/login" &&
      err.response &&
      originalConfig.url !== "/auth/refresh"
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const response = await instance.post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: "Bearer " + TokenService.getLocalRefreshToken(),
              },
            }
          );
          // console.log("refresh token response=", response);
          const { access_token } = response.data;
          console.log("new Access token= ", access_token);
          TokenService.updateLocalAccessToken(access_token);

          return instance(originalConfig);
        } catch (error) {
          console.log(error);
          AuthService.logout();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
