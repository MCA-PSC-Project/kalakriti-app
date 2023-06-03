import { axiosClient, baseUrl } from "../utils/axios-client";

// export async function login(email, password) {
//   try {
//     const response = await axios.post(`${baseUrl}/customers/auth/login`, {
//       email,
//       password,
//     });

//     if (response.status === 202) {
//       localStorage.setItem("access_token", response.data.access_token);
//       localStorage.setItem("refresh_token", response.data.refresh_token);
//       //   return getUser();
//       console.log("login");
//       return response;
//     }
//   } catch (_) {
//     return null;
//   }
// }

export const login = (data) => {
  console.log("data=", data);
  return axiosClient.post("/customers/auth/login", data).then((response) => {
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
  });
};

export async function refresh() {
  try {
    const response = await axios.post(
      `${baseUrl}/customers/auth/refresh`,
      {},
      {
        headers: {
          Authorization: "Bearer " + getRefreshToken(),
        },
      }
    );
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
  } catch (e) {
    logout();
  }
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  //   clearUser();
}
