import axios from "axios";
async function isAgentLoggedIn(userName) {
  let isLoggedIn = false;
  console.log(userName);
  await axios
    .post(`http://localhost:8082/api/v1/isAgentLogin/${userName}`)
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
export default isAgentLoggedIn;
