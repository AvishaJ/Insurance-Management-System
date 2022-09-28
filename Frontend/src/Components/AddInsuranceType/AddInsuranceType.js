import NavBar from "../NavBarAdmin/NavBarAdmin";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import { useRef, useState } from "react";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function AddInsuranceType() {
  const [isActive, updateIsActive] = useState(true);
  const [insuranceType, updateInsuranceType] = useState("");
  const [image, updateImage] = useState("");
  const fileInput = useRef();
  const userName = useParams().username;
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
  const handleAddInsuranceType = async (e) => {
    e.preventDefault();
    let testImage = fileInput.current.files[0];
    if (testImage != null && insuranceType != "" && isActive != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK for Adding an Agent",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingAgent) => {
        if (AddingAgent === true) {
          var bodyFormData = new FormData();
          bodyFormData.append("testImage", testImage);
          bodyFormData.append("insuranceType", insuranceType);
          bodyFormData.append("isActive", isActive);
          await axios
            .post(
              `http://localhost:8082/api/v1/createInsuranceType`,
              bodyFormData
            )
            .then((resp) => {
              swal(resp.data, "Created Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(error.response.data, "Agent not Created", "warning");
            });
        }
      });
    } else {
      swal("Fill all fields", "Insurance Type not Created", "warning");
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
                Add Insurance Type
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
                  label="Insurance Type"
                  
                  onChange={(e) => updateInsuranceType(e.target.value)}
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
                <input type="file" ref={fileInput} />
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
              <br />
              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    onClick={handleAddInsuranceType}
                    style={{ width: "100%" }}
                  >
                    Add Insurance Type
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
export default AddInsuranceType;
