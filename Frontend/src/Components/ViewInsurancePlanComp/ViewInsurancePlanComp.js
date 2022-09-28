import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchInput, { createFilter } from "react-search-input";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
function ViewInsurancePlanComp() {
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [schemetoUpdate, updateSchemetoUpdate] = useState("");
  const [focused, setFocused] = useState(false);
  const [allInsuranceScheme, updateAllInsuranceScheme] = useState("");
  const [allInsuranceTypes, updateallInsuranceTypes] = useState("");
  const [insuranceType, updateInsuranceType] = useState("");
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e) => {
    console.log(e.target.id);
    updateSchemetoUpdate(e.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  useEffect(() => {
    getAllInsuranceScheme();
  }, [insuranceType]);
  useEffect(() => {
    getInsuranceTypes();
  }, []);
  const InsTypes = Object.values(allInsuranceTypes).map((s) => {
    return <MenuItem value={s.insuranceType}>{s.insuranceType}</MenuItem>;
  });
  async function getInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        updateallInsuranceTypes(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  async function getAllInsuranceScheme() {
    console.log("in get scheme");
    await axios
      .post("http://localhost:8082/api/v1/getAllInsuranceScheme", {
        insuranceType,
      })
      .then((resp) => {
        updateAllInsuranceScheme(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const handleEditInsScheme = async (e) => {
    e.preventDefault();

    await axios
      .put("http://localhost:8082/api/v1/updateInsuranceScheme", {
        schemetoUpdate,
        propertyToUpdate,
        value,
      })
      .then((resp) => {
        swal(resp.data, "Update Succesfull", {
          icon: "success",
        });
        getAllInsuranceScheme();
        console.log(resp.data);
      })
      .catch((error) => {
        swal(error.response.data, "Update failed", "warning");
        console.log(error.response.data);
      });
    setOpen(false);
  };
  const handleDeleteInsScheme = async (e, c) => {
    e.preventDefault();
    const insuranceScheme = c.insuranceScheme;
    await axios
      .post("http://localhost:8082/api/v1/deleteInsuranceScheme", {
        insuranceScheme,
      })
      .then((resp) => {
        getAllInsuranceScheme();
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  let rowOfAllInsuranceScheme;
  if (allInsuranceScheme != null) {
    const KEYS_TO_FILTERS = ["allInsuranceTypes"];
    const filteredEmails = Object.values(allInsuranceScheme).filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    rowOfAllInsuranceScheme = filteredEmails.map((c) => {
      return (
        <tr id={c.insuranceScheme}>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.insuranceScheme}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.minTermPlan}
          </td>

          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.maxTermPlan}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.minAge}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.maxAge}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.minInvestment}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.maxInvestment}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.profitRatio}
          </td>
          <td id={c.insuranceScheme} style={{ width: "15%" }}>
            {c.isActive ? "true" : "false"}
          </td>
          <td style={{ width: "15%" }}>
            <span
              onClick={handleClickOpen}
              style={{ cursor: "pointer", color: "blue" }}
              id={c.insuranceScheme}
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
                    <MenuItem value="Insurance Scheme">
                      Insurance Scheme
                    </MenuItem>
                    <MenuItem value="Min Term Plan">Min Term Plan</MenuItem>
                    <MenuItem value="Max Term Plan">Max Term Plan</MenuItem>
                    <MenuItem value="Min Age">Min Age</MenuItem>
                    <MenuItem value="Max Age">Max Age</MenuItem>
                    <MenuItem value="Min Investment">Min Investment</MenuItem>
                    <MenuItem value="Max Investment">Max Investment</MenuItem>
                    <MenuItem value="Profit Ratio">Profit Ratio</MenuItem>
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
                  id={c.insuranceScheme}
                  onClick={(event) => {
                    handleEditInsScheme(event);
                  }}
                >
                  update
                </Button>
              </DialogActions>
            </Dialog>
          </td>
          <td id={c.insuranceScheme} style={{ width: "10%" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.isActive}
                    onChange={(event) => {
                      handleDeleteInsScheme(event, c);
                    }}
                    id={c.insuranceScheme}
                  />
                }
              />
            </FormGroup>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <div id="limiter2">
        <div >
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                View Insurance Scheme
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
              <FormControl  sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Insurance Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={insuranceType}
                  autoWidth
                  onChange={(event) => {
                    updateInsuranceType(event.target.value);
                  }}
                  label="Insurance Type"
                >
                  {InsTypes}
                </Select>
              </FormControl>
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
                    // count={Math.ceil(allEmployes.length / limit)}
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
                      Insurance Scheme
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Policy Term Min
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Policy Term max
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Min Age
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Max Age
                    </th>

                    <th scope="col" style={{ width: "15%" }}>
                      Sum Assured Min
                    </th>

                    <th scope="col" style={{ width: "15%" }}>
                      Sum Assured Max
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Profit Ratio
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
                <tbody>{rowOfAllInsuranceScheme}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewInsurancePlanComp;
