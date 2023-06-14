export default function authHeader() {
  const customer = JSON.parse(localStorage.getItem("customer"));

  if (customer && customer.accessToken) {
    return { Authorization: "Bearer " + customer.accessToken };
  } else {
    return {};
  }
}
