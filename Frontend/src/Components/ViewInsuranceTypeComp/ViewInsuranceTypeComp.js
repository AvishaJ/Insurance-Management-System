import { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchInput, { createFilter } from "react-search-input";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import swal from "sweetalert";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
function ViewInsuranceTypeComp() {
  const [focused, setFocused] = useState(false);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [allInsuranceType, updateAllInsuranceType] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [image, updateImage] = useState();
  const [insuranceTypetoUpdate, updateinsuranceTypetoUpdate] = useState();
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e, c) => {
    // console.log(e.target.id);
    // updateEmployetoUpdate(e.target.id);
    updateinsuranceTypetoUpdate(c.insuranceType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  useEffect(() => {
    getInsuranceTypes();
  }, []);
  async function getInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        updateAllInsuranceType(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        swal(error.response.data, "Error Occured!", "warning");
      });
  }
  const handleEditInsuranceType = async (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "Click OK to Update this Scheme",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (UpdatingCity) => {
      if (UpdatingCity === true) {
        console.log(insuranceTypetoUpdate);
        await axios
          .put("http://localhost:8082/api/v1/updateInsuranceType", {
            insuranceTypetoUpdate,
            value,
          })
          .then((resp) => {
            swal(resp.data, "Updated Succesfully", {
              icon: "success",
            });
            getInsuranceTypes();
          })
          .catch((error) => {
            swal(error.response.data, "Scheme not Updated", "warning");
          });
      }
    });
    setOpen(false);
  };
  const handleDeleteInsuranceType = async (e, c) => {
    e.preventDefault();
    const insuranceType = c.insuranceType;
    await axios
      .post("http://localhost:8082/api/v1/deleteInsuranceType", {
        insuranceType,
      })
      .then((resp) => {
        getInsuranceTypes();
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        swal(error.response.data, "Error Occured!", "warning");
      });
  };
  let rowOfAllInsuranceType;
  if (allInsuranceType != null) {
    const KEYS_TO_FILTERS = ["insuranceType"];
    const filteredEmails = Object.values(allInsuranceType).filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    rowOfAllInsuranceType = filteredEmails.map((c) => {
      console.log(c.image.data);
      // const base64String = btoa(
      //   String.fromCharCode(...new Uint8Array((c.image.data)))
      // );
      const binaryString = Array.from(new Uint8Array(c.image.data), (v) =>
        String.fromCharCode(v)
      ).join("");
      const theImage = btoa(binaryString);

      return (
        <tr id={c.insuranceType}>
          <td id={c.insuranceType} style={{ width: "15%" }}>
            {c.insuranceType}
          </td>
          <td id={c.insuranceType} style={{ width: "15%" }}>
            <img
              src={`data:image/png;base64,${theImage}`}
              style={{ width: "80px" }}
            />
          </td>
          <td style={{ width: "15%" }}>
            <span
              onClick={(event) => handleClickOpen(event, c)}
              style={{ cursor: "pointer", color: "blue" }}
              // id={s.cityName}
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
                  {/* <InputLabel id="demo-simple-select-standard-label">
                    Property To Update
                  </InputLabel> */}
                  {/* <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={propertyToUpdate}
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
                  id={c.insuranceType}
                  onClick={(event) => {
                    handleEditInsuranceType(event);
                  }}
                >
                  update
                </Button>
              </DialogActions>
            </Dialog>
          </td>
          <td id={c.insuranceType} style={{ width: "15%" }}>
            {c.isActive ? "true" : "false"}
          </td>
          <td id={c.insuranceType} style={{ width: "10%" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.isActive}
                    onChange={(event) => {
                      handleDeleteInsuranceType(event, c);
                    }}
                    id={c.insuranceType}
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
                View Insurance Type
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

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Insurance Type
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      image
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Edit
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      status
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      is Active
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfAllInsuranceType}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewInsuranceTypeComp;
