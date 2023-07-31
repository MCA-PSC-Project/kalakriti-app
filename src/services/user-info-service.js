const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("customer_info"));
};

const setUserInfo = (customerInfo) => {
  console.log(JSON.stringify(customerInfo));
  localStorage.setItem("customer_info", JSON.stringify(customerInfo));
};

const removeUserInfo = () => {
  localStorage.removeItem("customer_info");
};

const UserInfoService = {
  getUserInfo,
  setUserInfo,
  removeUserInfo,
};

export default UserInfoService;
