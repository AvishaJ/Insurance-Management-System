import "./Register.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Alert } from "@mui/material";


function Login() {
  const navigation = new useNavigate();
  const [agentName, updateAgentName] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [userName, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [dateOfBirth, updateDateOfBirth] = useState(dayjs("2014-08-18"));
  const [address, updateAddress] = useState("");
  const [email, updateEmail] = useState("");
  const [pincode, updatePincode] = useState("");
  const [nominee, updateNominee] = useState("");
  const [nomineeRelation, updateNomineeRelation] = useState("");
  const [allStates, updateAllStates] = useState([]);
  const [allCities, updateAllCities] = useState([]);
  const [stateName, updateStateName] = useState("");
  const [cityName, updateCityName] = useState("");
  const [status,updateStatus] = useState()

  async function getStates() {
    await axios
      .get("http://localhost:8082/api/v1/getAllState")
      .then((resp) => {
        updateAllStates(resp.data);

        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  async function getCities() {
    if (stateName != "") {
      await axios
        .post("http://localhost:8082/api/v1/getAllCity", { stateName })
        .then((resp) => {
          updateAllCities(resp.data);

          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          // swal(error.response.data, "Error Occured!", "warning");
        });
    }
  }

  const states = Object.values(allStates).map((s) => {
    return <MenuItem value={s.stateName}>{s.stateName}</MenuItem>;
  });

  const cities = Object.values(allCities).map((s) => {
    return <MenuItem value={s.cityName}>{s.cityName}</MenuItem>;
  });

  useEffect(() => {
    getCities();
  }, [stateName]);
  useEffect(() => {
    getStates();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

      {
        await axios
          .post("http://localhost:8082/api/v1/createCustomer", {
            firstName,
            lastName,
            userName,
            password,
            dateOfBirth,
            address,
            email,
            stateName,
            cityName,
            pincode,
            nominee,
            nomineeRelation,
            agentName,
          })
          .then((resp) => {
            updateStatus(
              <Alert severity="success">{resp.data}</Alert>
              )
          })
          .catch((error) => {
            updateStatus(
              <Alert severity="error">{error.response.data}</Alert>
              )
          });
      }
    ;
  };

  return (
    <>
      <div className="limiter">
        <div className="form-container">
          <div className="wrap-login100">
        
          
            <span
              className="login100-form-title p-b-26"
              style={{ color: "black" }}
            >
              <h3>Customer Registration</h3>
            </span>

            <form className="">
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Firstname"
                  
                  onChange={(e) => updateFirstName(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Lastname"
                  
                  onChange={(e) => updateLastName(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Username"
                  onChange={(e) => updateUserName(e.target.value)}
                  // 
                />
              </Box>

              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
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
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField
                  id="standard-basic"
                  label="DOB"
                  
                  onChange={(e) => updateDateOfBirth(e.target.value)}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date Of Birth"
                    inputFormat="DD/MM/YYYY"
                    value={dateOfBirth}
                    onChange={(value) => updateDateOfBirth(value)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
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
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Email"
                  onChange={(e) => updateEmail(e.target.value)}
                  
                />
              </Box>

              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={stateName}
                  autoWidth
                  onChange={(event) => {
                    updateStateName(event.target.value);
                  }}
                  label="State"
                >
                  {states}
                </Select>
              </FormControl>

              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={cityName}
                  autoWidth
                  onChange={(event) => {
                    updateCityName(event.target.value);
                  }}
                  label="State"
                >
                  {cities}
                </Select>
              </FormControl>

              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Pincode"
                  onChange={(e) => updatePincode(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  onChange={(e) => updateNominee(e.target.value)}
                  label="Nominee"
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {" "}
                <TextField
                  id="standard-basic"
                  label="Nominee Relation"
                  onChange={(e) => updateNomineeRelation(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "32ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {" "}
                <TextField
                  id="standard-basic"
                  label="Agent Name"
                  onChange={(e) => updateAgentName(e.target.value)}
                  
                />
              </Box>
            </form>
      

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="button" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </div>
            <br></br>
          </div>
          {status}
        </div>
      </div>
    </>
  );
}
export default Login;
