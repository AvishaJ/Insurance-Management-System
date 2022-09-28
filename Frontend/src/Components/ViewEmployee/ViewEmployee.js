import NavBar from "../NavBarAdmin/NavBarAdmin";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
// import SearchBar from "material-ui-search-bar";
import SearchInput, { createFilter } from "react-search-input";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useRef } from "react";
function ViewEmployee() {
  const currentUser = useParams();
  const [allEmployes, updateallEmployes] = useState(0);
  const [allEmployees, updateallEmployees] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [employetoUpdate, updateEmployetoUpdate] = useState("");
  const [focused, setFocused] = useState(false);
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(currentUser.username));
      console.log(isLoggedIn);
    }
  }, []);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e) => {
    // console.log(e.target.id);
    updateEmployetoUpdate(e.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigation = new useNavigate();

  useEffect(() => {
    getEmployees();
  }, [pageNumber, limit]);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  async function getEmployees() {
    axios
      .post("http://localhost:8082/api/v1/getAllEmployee", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allEmps, allEmpsCount] = resp.data;
        updateallEmployees(allEmps);
        updateallEmployes(allEmpsCount);
        console.log(allEmps);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
        console.log(error.response.data);
      });
  }
  const handleEditEmployee = async (e) => {
    swal({
      title: "Are you sure?",
      text: "Click OK to Update the Employee",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (UpdatingEmployee) => {
      if (UpdatingEmployee === true) {
        await axios
          .put(
            `http://localhost:8082/api/v1/updateEmployee/${currentUser.username}`,
            {
              employetoUpdate,
              propertyToUpdate,
              value,
            }
          )
          .then((resp) => {
            swal(resp.data, "Updated Succesfully", {
              icon: "success",
            });
            getEmployees();
          })
          .catch((error) => {
            swal(error.response.data, "Employee not Updated", "warning");
          });
      }
    });
    setOpen(false);
  };
  const toogleActiveFlag = (e, c) => {
    const employeeId = c._id;
    const userName = currentUser.username;
    console.log(userName);
    axios
      .post(`http://localhost:8082/api/v1/deleteEmployee/${userName}`, {
        employeeId,
      })
      .then((resp) => {
        getEmployees();
      })
      .catch((error) => {
        console.log(error.response.data);
        swal(error.response.data, "Employee not Updated", "warning");
      });
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  let rowOfEmployee;

  if (allEmployees != null) {
    let emps;
    if (focused) {
      emps = allEmployes;
    } else {
      emps = allEmployees;
    }
    if (emps != null) {
      const KEYS_TO_FILTERS = ["credential.userName"];
      const filteredEmails = Object.values(emps).filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
      );
      rowOfEmployee = filteredEmails.map((c) => {
        return (
          <tr id={c.userId}>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.role}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.firstName}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.lastName}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.credential.userName}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.isActive ? "true" : "false"}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              <span
                onClick={handleClickOpen}
                style={{ cursor: "pointer", color: "blue" }}
                id={c.credential.userName}
              >
                Edit
              </span>
              <Dialog
                id={c.credential.userName}
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                  {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Property To Update"
                  fullWidth
                  
                  onChange={(e) => {
                    updatePropertyToUpdate(e.target.value);
                  }}
                /> */}
                  <FormControl  sx={{ m: 1, minWidth: 270 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Property To Update
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={propertyToUpdate}
                      autoWidth
                      onChange={(event) => {
                        updatePropertyToUpdate(event.target.value);
                      }}
                      label="Property To Update"
                    >
                      <MenuItem value="FirstName">FirstName</MenuItem>
                      <MenuItem value="LastName">LastName</MenuItem>
                      <MenuItem value="UserName">UserName</MenuItem>
                      {/* <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Value"
                    fullWidth
                    
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>cancel</Button>
                  <Button
                    id={c.credential.userName}
                    onClick={(event) => {
                      handleEditEmployee(event);
                    }}
                  >
                    update
                  </Button>
                </DialogActions>
              </Dialog>
            </td>
            <td id={c.credential.userName} style={{ width: "10%" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={c.isActive}
                      onChange={(event) => {
                        toogleActiveFlag(event, c);
                      }}
                      id={c.credential.userName}
                    />
                  }
                />
              </FormGroup>
            </td>
            {/* <td style={{ width: "10%" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleGetAccountDetails(c)}
              style={{ width: "auto" }}
            >
              account details
            </button>
          </td> */}
          </tr>
        );
      });
    }
  }
  return (
    <>
      <NavBar />
      <div id="limiter2">
        <div >
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                ViewEmployee
              </span>
              <br />
              <SearchInput
                className="search-input"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={searchUpdated}
                style={{
                  width: "50%",
                  height: "40px",
                  background: "#F2F2F2",
                  font: "black",
                  border: "1px solid #E1D9D1",
                }}
              />
              <br />
              &nbsp;&nbsp;&nbsp;
              <div className="pagination" style={{ display: "inline-flex" }}>
                <label class="fw-bold">limit:</label>
                <select
                  style={{ width: "140px" }}
                  id="role"
                  name="role"
                  onChange={(e) => {
                    updateLimit(e.target.value);
                    updatePageNumber(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="pagination" style={{ display: "inline-flex" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(allEmployes.length / limit)}
                    color="primary"
                    onChange={(e, value) => updatePageNumber(value)}
                  />
                </Stack>
              </div>{" "}
              <br />
              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Emp Type
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Emp Firstname
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Emp Lastname
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Username
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      status
                    </th>
                    {/* <th scope="col" style={{ width: "10%" }}>
                Account Details
              </th> */}
                    <th scope="col" style={{ width: "12%" }}>
                      edit
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      is Active
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfEmployee}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewEmployee;
