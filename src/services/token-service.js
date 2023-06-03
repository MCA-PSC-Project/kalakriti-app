const getLocalRefreshToken = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  return customer?.refresh_token;
};

const getLocalAccessToken = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  return customer?.access_token;
};

const updateLocalAccessToken = (token) => {
  let customer = JSON.parse(localStorage.getItem("customer"));
  customer.access_token = token;
  localStorage.setItem("customer", JSON.stringify(customer));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("customer"));
};

const setUser = (customer) => {
  console.log(JSON.stringify(customer));
  localStorage.setItem("customer", JSON.stringify(customer));
};

const removeUser = () => {
  localStorage.removeItem("customer");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
