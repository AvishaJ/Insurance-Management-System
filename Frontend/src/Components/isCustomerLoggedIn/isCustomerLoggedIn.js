import axios from "axios";
async function isCustomerLoggedIn(userName) {
  let isLoggedIn = false;
  await axios
    .post(`http://localhost:8082/api/v1/isCustomerLogin/${userName}`)
    .then((resp) => {
      console.log(resp.data);
      isLoggedIn = true;
    })
    .catch((error) => {
      console.log(error.response.data);
      isLoggedIn = true;
    });
  return isLoggedIn;
}
export default isCustomerLoggedIn;
