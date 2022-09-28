import axios from "axios";
import { useEffect, useState } from "react";
async function isAdminLoggedIn(userName) {
  let isLoggedIn = false;
  await axios
    .post(`http://localhost:8082/api/v1/isAdminLogin/${userName}`)
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
export default isAdminLoggedIn;
