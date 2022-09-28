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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function AddState() {
  const userName = useParams().username;
  const [stateName, updateStateName] = useState("");
  const [isActive, updateIsActive] = useState(true);
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  const handleAddStateName = async (e) => {
    e.preventDefault();
    if (stateName != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK for Adding State",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingState) => {
        if (AddingState === true) {
          await axios
            .post(`http://localhost:8082/api/v1/createState`, {
              stateName,
              isActive,
            })
            .then((resp) => {
              swal(resp.data, "Created Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(error.response.data, "State not Created", "warning");
            });
        }
      });
    } else {
      swal("Require StateName", "State not Created", "warning");
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
                Add State
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
                  label="StateName"
                  
                  onChange={(e) => updateStateName(e.target.value)}
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
                    onClick={handleAddStateName}
                    style={{ width: "100%" }}
                  >
                    Add StateName
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
export default AddState;
