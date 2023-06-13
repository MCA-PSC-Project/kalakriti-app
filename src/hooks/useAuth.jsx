import React, { createContext, useContext, useState } from "react";
import AuthService from "../services/auth-service";

const authContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(false);
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
  const logout = () => {
    AuthService.logout();
    setAuthed(false);
  };
  return {
    authed,
    login,
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
