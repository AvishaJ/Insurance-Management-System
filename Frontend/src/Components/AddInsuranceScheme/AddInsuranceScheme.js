import NavBar from "../NavBarAdmin/NavBarAdmin";
import ReactQuill from "react-quill";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
function AddInsuranceScheme() {
  const [insuranceType, updateInsuranceType] = useState("");
  const [insuranceScheme, updateInsuranceScheme] = useState("");
  const [commissionNewReg, updateCommissionNewReg] = useState(0);
  const [commissionInstall, updateCommissionInstall] = useState(0);
  const [insuranceNote, updateInsuranceNote] = useState("");
  const [minTermPlan, updateMinTermPlan] = useState("");
  const [maxTermPlan, updateMaxTermPlan] = useState("");
  const [minAge, updateMinAge] = useState("");
  const [maxAge, updateMaxAge] = useState("");
  const [minInvestment, updateMinInvestment] = useState("");
  const [maxInvestment, updateMaxInvestment] = useState("");
  const [profitRatio, updateProfitRatio] = useState("");
  const [isActive, updateIsActive] = useState("");
  const fileInput = useRef();
  const [allInsuranceTypes, updateallInsuranceTypes] = useState("");
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getInsuranceTypes();
  }, []);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  const handleAddInsuranceScheme = async (e) => {
    e.preventDefault();

    let testImage = fileInput.current.files[0];

    var bodyFormData = new FormData();
    bodyFormData.append("testImage", testImage);
    bodyFormData.append("insuranceType", insuranceType);
    bodyFormData.append("insuranceScheme", insuranceScheme);
    bodyFormData.append("commissionNewReg", commissionNewReg);
    bodyFormData.append("commissionInstall", commissionInstall);
    bodyFormData.append("insuranceNote", insuranceNote);
    bodyFormData.append("minTermPlan", minTermPlan);
    bodyFormData.append("maxTermPlan", maxTermPlan);
    bodyFormData.append("minAge", minAge);
    bodyFormData.append("maxAge", maxAge);
    bodyFormData.append("minInvestment", minInvestment);
    bodyFormData.append("maxInvestment", maxInvestment);
    bodyFormData.append("profitRatio", profitRatio);

    bodyFormData.append("isActive", isActive);
    if (
      testImage != null &&
      insuranceType != "" &&
      insuranceScheme != "" &&
      commissionNewReg != "" &&
      commissionInstall != "" &&
      insuranceNote != "" &&
      minTermPlan != "" &&
      maxTermPlan != "" &&
      minAge != "" &&
      maxAge != "" &&
      minInvestment != "" &&
      maxInvestment != "" &&
      profitRatio != ""
    ) {
      swal({
        title: "Are you sure?",
        text: "Click OK for Adding Insurance Scheme",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          await axios
            .post(
              "http://localhost:8082/api/v1/createInsuranceScheme",
              bodyFormData
            )
            .then((resp) => {
              swal(resp.data, "Created Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(
                error.response.data,
                "Insurance Scheme not Created",
                "warning"
              );
            });
        }
      });
    } else {
      swal("Fill all fields", "Insurance Scheme not Created", "warning");
    }
  };

  async function getInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        updateallInsuranceTypes(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured!", "warning");
      });
  }
  let InsTypes;
  if (allInsuranceTypes != null)
    InsTypes = Object.values(allInsuranceTypes).map((s) => {
      console.log(s)
      return <MenuItem sx={{width:"50ch"}} value={s.insuranceType}>{s.insuranceType}</MenuItem>;
    });
  return (
    <>
      <NavBar />
      <div className="limiter">
        <div className="form-container">
          <div className="wrap-login100">
            <span id="login100-form-title1" style={{ color: "black" }}>
              Add Insurance Scheme
            </span>
            <form className="login100-form validate-form">
              <FormControl  sx={{ m: 1, width: "50ch" }}>
                <InputLabel id="demo-simple-select-standard-label" >
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
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Insurance Scheme"
                  
                  onChange={(e) => updateInsuranceScheme(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <input type="file" ref={fileInput} />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Commission For New Registration (in %)"
                  type="number"
                  
                  onChange={(e) => updateCommissionNewReg(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Commission Installment Payment (in %)"
                  typeof="Number"
                  
                  onChange={(e) => updateCommissionInstall(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div></div>
              </Box>
              <div style={{ display: "block", width: "50ch" }}>
                <label>Insurance Note:</label>

                <br />
                <ReactQuill
                  theme="snow"
                  // value={insuranceNote}
                  onChange={updateInsuranceNote}
                  //   style={{ height: "20vh" }}
                />
              </div>

              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Minimum Termplan"
                  typeof="Number"
                  onChange={(e) => updateMinTermPlan(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  typeof="Number"
                  label="Maximum Termplan"
                  onChange={(e) => updateMaxTermPlan(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Minimum Age"
                  typeof="Number"
                  
                  onChange={(e) => updateMinAge(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Maximum Age"
                  typeof="Number"
                  onChange={(e) => updateMaxAge(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  onChange={(e) => updateMinInvestment(e.target.value)}
                  label="Minimum Investment"
                  typeof="Number"
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {" "}
                <TextField
                  id="standard-basic"
                  label="Maximum Investment"
                  typeof="Number"
                  onChange={(e) => updateMaxInvestment(e.target.value)}
                  
                />
              </Box>
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {" "}
                <TextField
                  id="standard-basic"
                  label="Profit Ratio"
                  typeof="Number"
                  onChange={(e) => updateProfitRatio(e.target.value)}
                  
                />
              </Box>
              <FormControl  sx={{ m: 1, minWidth: "50ch" }}>
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
            </form>
            <br />
            <br />

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button
                  className="login100-form-btn"
                  onClick={handleAddInsuranceScheme}
                >
                  Add Insurance Scheme
                </button>
              </div>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddInsuranceScheme;
