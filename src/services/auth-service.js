import api from "../utils/api";
import TokenService from "./token-service";
import UserInfoService from "./user-info-service";

const register = (data) => {
  return api.post("/customers/auth/register", data);
};

const login = (email, password) => {
  return api
    .post("/customers/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.status === 202 && response.data.access_token) {
        TokenService.setUser(response.data);

        // get customer's first_name & dp to store it in localStorage
        api
          .get(`/customers/profile`)
          .then((response) => {
            if (response.status === 200) {
              // console.log(response.data);
              const customerInfo = {
                firstName: response.data?.first_name,
                dpPath: response.data?.dp?.path,
              };
              console.log("customerInfo= ", customerInfo);
              UserInfoService.setUserInfo(customerInfo);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // when the user is not verified
      else if (response.status === 201) {
        window.alert(response.data);
        return;
      }
      return response;
    });
};

const loginMotp = (mobileNo, motp) => {
  return api
    .post("/customers/auth/motp/login", {
      mobile_no: mobileNo,
      motp,
    })
    .then((response) => {
      if (response.status === 202 && response.data.access_token) {
        TokenService.setUser(response.data);
      }
      // // when the user is not verified
      // else if (response.status === 201) {
      //   window.alert(response.data);
      //   return;
      // }
      return response;
    });
};

const logout = () => {
  TokenService.removeUser();
  UserInfoService.removeUserInfo();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("customer"));
};

const AuthService = {
  register,
  login,
  loginMotp,
  logout,
  getCurrentUser,
};

export default AuthService;
