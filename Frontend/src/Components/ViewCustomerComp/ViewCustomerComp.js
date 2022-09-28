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
import { useRef } from "react";
function ViewCustomerComp() {
  const currentUser = useParams();
  const [Customers, updateCustomers] = useState(0);
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [customertoUpdate, updateCustomertoUpdate] = useState("");
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e) => {
    console.log(e.target.id);
    updateCustomertoUpdate(e.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigation = new useNavigate();

  useEffect(() => {
    getCustomer();
  }, [pageNumber, limit]);
  const handleGetAccountDetails = (c) => {
    console.log(c);
    navigation(`/adminDashboard/GetAccountDetails/${currentUser.username}`, {
      state: c,
    });
  };

  // const handleUpdate = (username) => {
  //   navigation(`/adminDashboard/UpdateCustomer/${currentUser.username}`, {
  //     state: username,
  //   });
  // };
  async function getCustomer() {
    axios
      .post("http://localhost:8082/api/v1/getAllCustomer", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allCusts, allCustsCount] = resp.data;
        updateAllCustomers(allCusts);
        updateCustomers(allCustsCount);
        console.log(allCusts);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  }
  const handleEditCustomer = async (e) => {
    // console.log(e.target.id);
    // const customertoUpdate = e.target.id;
    swal({
      title: "Are you sure?",
      text: "Click OK to Update this Employee",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (UpdatingEmployee) => {
      if (UpdatingEmployee === true) {
        await axios
          .put(
            `http://localhost:8082/api/v1/updateCustomer/${currentUser.username}`,
            {
              customertoUpdate,
              propertyToUpdate,
              value,
            }
          )
          .then((resp) => {
            swal(resp.data, "Updated Succesfully", {
              icon: "success",
            });
            getCustomer();
          })
          .catch((error) => {
            swal(error.response.data, "Employee not Updated", "warning");
          });
      }
    });
    setOpen(false);
  };
  const toogleActiveFlag = (e, c) => {
    const customerId = c._id;
    const userName = currentUser.username;
    console.log(userName);
    axios
      .post(
        `http://localhost:8082/api/v1/deleteCustomer/${currentUser.username}`,
        {
          customerId,
        }
      )
      .then((resp) => {
        getCustomer();
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  let rowOfEmployee;

  if (allCustomers != null) {
    let emps;
    if (focused) {
      emps = Customers;
    } else {
      emps = allCustomers;
    }
    if (emps != null) {
      const KEYS_TO_FILTERS = ["credential.userName"];
      const filteredEmails = Object.values(emps).filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
      );
      rowOfEmployee = filteredEmails.map((c) => {
        return (
          <tr id={c.credential.userName}>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.credential.userName}
            </td>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              <b>Firstname:&nbsp;</b>
              <br />
              {c.firstName}
              <br />
              <br />
              <b>Lastname:&nbsp;</b>
              <br />
              {c.lastName}
            </td>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.dateOfBirth.split("T")[0].split("-").reverse().join("-")}
            </td>

            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.email}
            </td>

            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              <b>State:&nbsp;</b> <br />
              {c.state}
              <br />
              <br />
              <b>City:&nbsp;</b> <br />
              {c.city}
              <br />
              <br />
              <b>Pincode:&nbsp;</b> <br />
              {c.pincode}
            </td>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              <b>Nominee:&nbsp;</b>
              {c.nominee}
              <br />
              <br />

              <b>Nominee Relation:&nbsp;</b>
              {c.nomineeRelation}
            </td>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              {Object.values(c.policies).map((c) => {
                return (
                  <>
                    <p>{c.insuranceScheme}</p>
                    <br />
                  </>
                );
              })}
            </td>

            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.isActive ? "true" : "false"}
            </td>
            <td
              id={c.credential.userName}
              style={{ width: "15%", padding: "10px" }}
            >
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
                  variant="standard"
                  onChange={(e) => {
                    updatePropertyToUpdate(e.target.value);
                  }}
                /> */}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 270 }}>
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
                      <MenuItem value="dateOfBirth">dateOfBirth</MenuItem>
                      <MenuItem value="address">address</MenuItem>
                      <MenuItem value="email">email</MenuItem>
                      <MenuItem value="state">state</MenuItem>
                      <MenuItem value="city">city</MenuItem>
                      <MenuItem value="pincode">pincode</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Value"
                    fullWidth
                    variant="standard"
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
                      handleEditCustomer(event);
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
      <div id="limiter2">
        <div >
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>View Customer</h4>
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
                  color: "black",
                  border: "1px solid #E1D9D1",
                }}
              />
              <br />
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
                    count={Math.ceil(Customers.length / limit)}
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
                      UserName
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Customer Name
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      DOB
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Email-Id
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Address
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Nominee
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Policy
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
export default ViewCustomerComp;
