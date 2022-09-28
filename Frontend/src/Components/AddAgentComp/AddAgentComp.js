import axios from "axios";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import { Alert } from "@mui/material";



function AddAgentComp() {
  const [role, updateRole] = useState("agent");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [address, updateAddress] = useState("");
  const [fullName, updateFullName] = useState("");
  const [emailId, updateEmailId] = useState("");
  const [isActive, updateIsActive] = useState(true);
  const [qualification, updateQualification] = useState();
  const [confirmPassword, updateConfirmPassword] = useState();
  const [status,updateStatus] = useState();



  const onAddAgent = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

        await axios
          .post(`http://localhost:8082/api/v1/createAgent`, {
            fullName,
            userName,
            password,
            address,
            emailId,
            qualification,
            role,
            isActive,
          })
          .then((resp) => {
            console.log(resp)
            updateStatus(
              <Alert severity="success">{"Agent account created"}</Alert>
              )
          })
          .catch((error) => {
            console.log(error)
            updateStatus(
              <Alert severity="error">{error.response.data}</Alert>
              )
          });
  

    } else {

      updateStatus(
        <Alert severity="error">{"passwords not matched"}</Alert>
      )
    }
  };
  return (
    <>
      <div id="limiter1">
        <div className="form-container">
          <div id="form-container">
          
            <form id="form-container">
              <span id="login100-form-title1" style={{ color: "black" }}>
                Add Agent
              </span>

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
                  label="Fullname"
                  
                  onChange={(e) => updateFullName(e.target.value)}
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
                  label="Email"
                  
                  onChange={(e) => updateEmailId(e.target.value)}
                  required
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
                  label="Username"
                  
                  onChange={(e) => updateUserName(e.target.value)}
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
                  label="Password"
                  
                  onChange={(e) => updatePassword(e.target.value)}
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
                  label="Confirm Password"
                  
                  onChange={(e) => updateConfirmPassword(e.target.value)}
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
                  label="Address"
                  
                  onChange={(e) => updateAddress(e.target.value)}
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
                  label="Qualification"
                  
                  onChange={(e) => updateQualification(e.target.value)}
                />
              </Box>
              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={isActive}
                  onChange={(event) => {
                    updateIsActive(event.target.value);
                  }}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>

              <br />

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    onClick={onAddAgent}
                    style={{ width: "100%" }}
                  >
                    Add Agent
                  </button>
                </div>
              </div>

              <div></div>
            {status}
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
export default AddAgentComp;
