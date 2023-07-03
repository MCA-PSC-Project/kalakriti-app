import React, { createContext, useContext, useState } from "react";
import AuthService from "../services/auth-service";
import TokenService from "../services/token-service";

const authContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(() => {
    const accessToken = TokenService.getLocalAccessToken();
    const refreshToken = TokenService.getLocalRefreshToken();
    return !!(accessToken && refreshToken);
  });
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      AuthService.login(email, password).then(
        () => {
          setAuthed(true);
          resolve(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setAuthed(false);
          resolve(false);
        }
      );
    });
  };

  const loginMotp = async (mobileNo, motp) => {
    return new Promise((resolve, reject) => {
      AuthService.loginMotp(mobileNo, motp).then(
        () => {
          setAuthed(true);
          resolve(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setAuthed(false);
          resolve(false);
        }
      );
    });
  };

  const logout = () => {
    AuthService.logout();
    setAuthed(false);
  };
  return {
    authed,
    login,
    loginMotp,
    logout,
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
