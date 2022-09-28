import NavBar from "../NavBar/NavBar";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import { useParams } from "react-router-dom";
function CustomerDocument() {
  const fileInput = useRef();
  //   let testImage = fileInput.current.files[0];
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
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

  return (
    <>
      <NavBar />

      <div className="container-Insurance">
        <div id="wrap-login1001">
          <FormControl  sx={{ m: 1, minWidth: 270 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Document Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //   value={isActive}
              //   onChange={(event) => {
              //     updateIsActive(event.target.value);
              //   }}
              label="Status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <input type="file" ref={fileInput} />
          </Box>
          <div id="container-login100-form-btn1">
            <div id="wrap-login100-form-btn1">
              <div id="login100-form-bgbtn1"></div>
              <button
                id="login100-form-btn1"
                //   onClick={handleAddcityName}
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-Insurance">
        <div id="wrap-login1001" style={{ width: "50%" }}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Document Type</th>
                <th>Document Path</th>
                <th>Action</th>
              </tr>
            </thead>
          </Table>
        </div>
      </div>
    </>
  );
}
export default CustomerDocument;
