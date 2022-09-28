import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import { Alert } from "@mui/material";

import { useEffect } from "react";

function CustomerChangePassword() {
  const userName = useParams().username;
  const [oldPassword, updateOldPassword] = useState();
  const [newPassword, updateNewPassword] = useState();
  const [confirmPassword, updateConfirmPassword] = useState();
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const [status,updateStatus] = useState();

  
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      
       
          const customertoUpdate = userName;
          const propertyToUpdate = "Password";
          const value = newPassword;
          await axios
            .put(`http://localhost:8082/api/v1/updateCustomer/${userName}`, {
              customertoUpdate,
              propertyToUpdate,
              value,
            })
            .then((resp) => {
              console.log(resp.data);
              updateStatus(
                <Alert severity="success">{resp.data}</Alert>
                )
            })
            .catch((error) => {
              console.log(error.response.data);
              updateStatus(
                <Alert severity="error">{error.response.data}</Alert>
                )
            });
       
    } else {
      updateStatus(
        <Alert severity="error">{"passwords not mathed"}</Alert>
        )
    }
  };
  return (
    <>
      <NavBar />
      <div id="limiter1">
        <div className="form-container">
          <div id="wrap-login1001">
            <form id="login100-form1 validate-form">
              <span id="login100-form-title1" style={{ color: "black" }}>
                Change Password
              </span>
              <br />

              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Old Password"
                  
                  onChange={(e) => updateOldPassword(e.target.value)}
                />
              </Box>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="New Password"
                  
                  onChange={(e) => updateNewPassword(e.target.value)}
                />
              </Box>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="confirm new password"
                  
                  onChange={(e) => updateConfirmPassword(e.target.value)}
                />
              </Box>

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    onClick={handleChangePassword}
                    style={{ width: "100%" }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
            {status}
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerChangePassword;
