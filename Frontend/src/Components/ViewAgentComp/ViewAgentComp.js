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
import { useRef } from "react";
function ViewAgentComp() {
  const currentUser = useParams();
  const [allAgents, updateAllAgents] = useState(0);
  const [allAgent, updateAllAgent] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [agentToUpdate, updateagenttoUpdate] = useState("");
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e) => {
    console.log(e.target.id);
    updateagenttoUpdate(e.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigation = new useNavigate();

  useEffect(() => {
    getAgents();
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
  async function getAgents() {
    axios
      .post("http://localhost:8082/api/v1/getAllAgent", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allAgts, allAgtsCount] = resp.data;
        updateAllAgent(allAgts);
        updateAllAgents(allAgtsCount);
        console.log(allAgts);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  }
  const handleEditEmployee = async (e) => {
    // console.log(e.target.id);
    // const agentToUpdate = e.target.id;
    swal({
      title: "Are you sure?",
      text: "Click OK to Update the Agent",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (UpdatingAgent) => {
      if (UpdatingAgent === true) {
        await axios
          .put(
            `http://localhost:8082/api/v1/updateAgent/${currentUser.username}`,
            {
              agentToUpdate,
              propertyToUpdate,
              value,
            }
          )
          .then((resp) => {
            swal(resp.data, "Updated Succesfully", {
              icon: "success",
            });
            getAgents();
          })
          .catch((error) => {
            swal(error.response.data, "Agent not Updated", "warning");
          });
      }
    });
    setOpen(false);
  };
  const toogleActiveFlag = (e, c) => {
    console.log(c);
    const AgentId = c._id;
    const userName = currentUser.username;
    console.log(userName);
    axios
      .post(
        `http://localhost:8082/api/v1/deleteAgent/${currentUser.username}`,
        {
          AgentId,
        }
      )
      .then((resp) => {
        getAgents();
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  let rowOfEmployee;

  if (allAgent != null) {
    let emps;
    if (focused) {
      emps = allAgents;
    } else {
      emps = allAgent;
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
              {c.fullName}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.credential.userName}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.address}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.emailId}
            </td>
            <td id={c.credential.userName} style={{ width: "15%" }}>
              {c.qualification}
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
                      <MenuItem value="FullName">FullName</MenuItem>
                      <MenuItem value="UserName">UserName</MenuItem>
                      <MenuItem value="address">address</MenuItem>
                      <MenuItem value="email">email</MenuItem>
                      <MenuItem value="qualification">qualification</MenuItem>
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
          </tr>
        );
      });
    }
  }
  return (
    <>
      <div id="limiter2">
        <div className="table">
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>View Agent</h4>
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
              {" "}
              <br />
              <br />
              <Table  bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Agent Name
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Agent Username
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Address
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Email-Id
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Qualification
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

              &nbsp;&nbsp;&nbsp;
              <div className="pagination" style={{ display: "inline-flex" }}>
                <Stack spacing={1}>
                  <Pagination
                    count={Math.ceil(allAgents.length / limit)}
                    color="warning"
                    onChange={(e, value) => updatePageNumber(value)}
                  />
                </Stack>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewAgentComp;
