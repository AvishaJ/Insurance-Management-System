import { useEffect, useState } from "react";

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
import swal from "sweetalert";
import DialogTitle from "@mui/material/DialogTitle";
import SearchInput, { createFilter } from "react-search-input";

import axios from "axios";

function ViewCityComp() {
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [value, updateValue] = useState("");
  const [stateName, updateStateName] = useState("");
  const [allStates, updateAllStates] = useState([]);
  const [allCities, updateAllCities] = useState([]);
  const [citytoUpdate, updatecitytoUpdate] = useState();
  const handleClickOpen = (e) => {
    console.log(e.target.id);
    updatecitytoUpdate(e.target.id);
    setOpen(true);
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getCities();
  }, [stateName]);
  useEffect(() => {
    getStates();
  }, []);
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
  const handleEditCity = async () => {
    swal({
      title: "Are you sure?",
      text: "Click OK to Update this City",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (UpdatingCity) => {
      if (UpdatingCity === true) {
        await axios
          .put(`http://localhost:8082/api/v1/updateCity`, {
            citytoUpdate,
            value,
          })
          .then((resp) => {
            swal(resp.data, "Updated Succesfully", {
              icon: "success",
            });
            getCities();
          })
          .catch((error) => {
            swal(error.response.data, "City not Updated", "warning");
          });
      }
    });
    setOpen(false);
  };
  const toogleActiveFlag = async (e) => {
    console.log(e.target.id);
    const cityName = e.target.id;
    await axios
      .post("http://localhost:8082/api/v1/deleteCity", { cityName })
      .then((resp) => {
        getCities();
        console.log(resp.data);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  };
  let rowOfCity;
  if (allCities != null) {
    const KEYS_TO_FILTERS = ["credential.userName"];
    const filteredEmails = Object.values(allCities).filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    rowOfCity = filteredEmails.map((s) => {
      return (
        <tr
        //    id={s.userId}
        >
          <td
            // id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {s.cityName}
          </td>

          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {s.isActive ? "true" : "false"}
          </td>
          <td style={{ width: "15%" }}>
            <span
              onClick={handleClickOpen}
              style={{ cursor: "pointer", color: "blue" }}
              id={s.cityName}
            >
              Edit
            </span>
            <Dialog
              // id={s.credential.userName}
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
                  {/* <InputLabel id="demo-simple-select-standard-label">
                    Property To Update
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    //   value={propertyToUpdate}
                    autoWidth
                    onChange={(event) => {
                      updatePropertyToUpdate(event.target.value);
                    }}
                    label="Property To Update"
                  >
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select> */}
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
                  id={s.cityName}
                  onClick={(event) => {
                    handleEditCity(event);
                  }}
                >
                  update
                </Button>
              </DialogActions>
            </Dialog>
          </td>
          <td
            //   id={s.credential.userName}
            style={{ width: "10%" }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={s.isActive}
                    onChange={(event) => {
                      toogleActiveFlag(event);
                    }}
                    id={s.cityName}
                  />
                }
              />
            </FormGroup>
          </td>
          {/* <td style={{ width: "10%" }}>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => handleGetAccountDetails(s)}
                    style={{ width: "auto" }}
                  >
                    account details
                  </button>
                </td> */}
        </tr>
      );
    });
  }

  return (
    <>
      <div id="limiter2">
        <div className="form-container">
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>Cities</h4>
              </span>
              <br />
              <SearchInput
                className="search-input"
                onChange={searchUpdated}
                style={{
                  width: "50%",
                  height: "40px",
                  background: "#F2F2F2",
                  font: "black",
                  border: "1px solid #E1D9D1",
                }}
              />
              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  States
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
              <br />
              &nbsp;&nbsp;&nbsp;
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      City
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
                <tbody>{rowOfCity}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewCityComp;
