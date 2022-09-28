import NavBar from "../AgentNavBar/AgentNavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
function AgentChangePassword() {
  const userName = useParams().username;
  const [oldPassword, updateOldPassword] = useState();
  const [newPassword, updateNewPassword] = useState();
  const [confirmPassword, updateConfirmPassword] = useState();
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAgentLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      swal({
        title: "Are you sure?",
        text: "Click OK for Changing Password",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          const agentToUpdate = userName;
          const propertyToUpdate = "Password";
          const value = newPassword;
          await axios
            .put(`http://localhost:8082/api/v1/updateAgent/${userName}`, {
              agentToUpdate,
              propertyToUpdate,
              value,
            })
            .then((resp) => {
              swal(resp.data, "Password Changed Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(
                error.response.data,
                "Password Change was not Successfull",
                "warning"
              );
            });
        }
      });
    } else {
      swal(
        "Password and Confirm Password Must Be Same",
        "Password Change Failed",
        "warning"
      );
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
                  variant="standard"
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
                  variant="standard"
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
                  variant="standard"
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
          </div>
        </div>
      </div>
    </>
  );
}
export default AgentChangePassword;
