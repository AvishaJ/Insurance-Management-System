import { useEffect, useState } from "react";
import NavBar from "../NavBarAdmin/NavBarAdmin";
import axios from "axios";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useParams } from "react-router-dom";
function AddcityName() {
  const userName = useParams().username;
  const [isActive, updateIsActive] = useState(true);
  const [stateName, updateStateName] = useState("");
  const [cityName, updateCityName] = useState("");
  const [allStates, updateAllStates] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState(true);
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  const handleAddcityName = async (e) => {
    e.preventDefault();
    if (cityName != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK for Adding City",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          await axios
            .post(`http://localhost:8082/api/v1/createCity`, {
              stateName,
              cityName,
              isActive,
            })
            .then((resp) => {
              swal(resp.data, "Created Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(error.response.data, "City not Created", "warning");
            });
        }
      });
    } else {
      swal("Require CityName!", "City not Created", "warning");
    }
  };
  useEffect(() => {
    getStates();
  }, []);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const states = Object.values(allStates).map((s) => {
    return <MenuItem value={s.stateName}>{s.stateName}</MenuItem>;
  });
  async function getStates() {
    await axios
      .get("http://localhost:8082/api/v1/getAllState")
      .then((resp) => {
        updateAllStates(resp.data);

        console.log(resp.data);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  }
  return (
    <>
      <NavBar />
      <div id="limiter1" style={{alignItems:"center"}}>
        <div className="form-container">
          <div id="wrap-login1001">
            <form id="login100-form1 validate-form">
              <span id="login100-form-title1" style={{ color: "black" }}>
                Add cityName
              </span>
              <br />
              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  State Name
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
                  label="CityName"
                  
                  onChange={(e) => updateCityName(e.target.value)}
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
              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    onClick={handleAddcityName}
                    style={{ width: "100%" }}
                  >
                    Add cityName
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
export default AddcityName;
