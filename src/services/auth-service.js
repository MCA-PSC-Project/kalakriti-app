import api from "../utils/api";
import TokenService from "./token-service";

const register = (email, password) => {
  return api.post("/customers/auth/signup", {
    email,
    password,
  });
};

const login = (email, password) => {
  return api
    .post("/customers/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
