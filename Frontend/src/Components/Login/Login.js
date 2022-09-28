import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Footer from "../footer/footer";
import { color } from "@mui/system";
import { Alert } from "@mui/material";


function Login() {
  const navigation = new useNavigate();
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [status,updateStatus] = useState()
  const registerUser = () => {
    navigation("/Register");
  };
  const onLogin = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8082/api/v1/login", { userName, password })
      .then((resp) => {
        console.log(resp)
        if (resp.data.role == "customer")
          navigation(`/CustomerDashboard/${userName}`);
        if (resp.data.role == "admin")
          navigation(`/AdminDashboard/${userName}`);
        if (resp.data.role == "employee")
          navigation(`/EmployeeDashboard/${userName}`);
        if (resp.data.role == "agent")
          navigation(`/AgentDashboard/${userName}`);
      })
      .catch((error) => {
        updateStatus(
          <Alert severity="error">{error.response.data}</Alert>
          )
      });
  };
  return (
    <>
      
      <div className="limiter1">
        <div className="">
          <div className="wrap-login1001">
            <form className="form-container ">
              <span className="login100-form-title1 p-b-48">
                <i className="zmdi zmdi-font" style={{ color: "#AE2CFF" }}>
                  
                </i>
              </span>
              {/* <br></br> */}
              <span
                className="login100-form-title1"
                style={{ color: "black" }}
              >
                <h2>Login</h2>
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
              <br />

              <div className="container-login100-form-btn1">
                <div className="wrap-login100-form-btn1">
                  <div className="login100-form-bgbtn1"></div>
                  <button
                    className="login100-form-btn1"
                    onClick={onLogin}
                    style={{ width: "60%" }}
                  >
                    Sign In
                  </button>
                </div>
              </div>

              <div>
            

                <a
                
                  style={onmouseover={color:""}}
                  onClick={registerUser}
                >
                  Register
                </a>
              </div>
              {status}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
