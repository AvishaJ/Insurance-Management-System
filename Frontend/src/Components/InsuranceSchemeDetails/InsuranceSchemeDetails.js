import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import TextField from "@mui/material/TextField";
import Table from "react-bootstrap/Table";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import PlanDetails from "../PlanDetails/PlanDetails";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { color } from "@mui/system";
function InsuranceSchemeDetails() {
  const navigate = new useNavigate();
  const insuranceScheme = useLocation().state[0];
  const insuranceType = useLocation().state[1];
  const username = useParams().username;
  console.log(insuranceType);
  const [insuranceSchemeDetails, updateInsuranceSchemeDetails] = useState("");

  const [noOfYears, updateNoOfYears] = useState("");
  const [totalInvestmentAmount, updateTotalInvestmentAmount] = useState("");
  const [years, updateMonths] = useState("");
  const [installmentAmount, updateInstallmentAmount] = useState("");
  const [interestAmount, updateInterestAmount] = useState("");
  const [totalAmount, updateTotalAmount] = useState("");
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

  let insuranceSchemeDetail;
  if (insuranceScheme != null) {
    console.log(insuranceScheme);
    const binaryString = Array.from(
      new Uint8Array(insuranceScheme.image.data),
      (v) => String.fromCharCode(v)
    ).join("");
    const theImage = btoa(binaryString);
    insuranceSchemeDetail = (
      <>
        <img src={`data:image/png;base64,${theImage}`} style={{width:"1000px",paddingLeft:"200px"}} />
        <br />
        <br />
        <h1
          style={{
            color: "black",

            textStyle: "bold",
          }}
        >
          {" "}
          {insuranceScheme.insuranceScheme}
        </h1>
        <br />
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{
            __html: insuranceScheme.insuranceNote,
          }}
        ></div>
      </>
    );
  }

  const handleCalculate = () => {
    const interest =
      (totalInvestmentAmount * insuranceScheme.profitRatio) / 100;
    updateInstallmentAmount(totalInvestmentAmount / noOfYears);
    updateInterestAmount(interest);
    updateTotalAmount(Number(totalInvestmentAmount) + Number(interest));
  };
  const handleBuy = () => {
    navigate(`/CustomerDashboard/InsuranceAccountDetails/${username}`, {
      state: [
        insuranceScheme,
        insuranceType,
        noOfYears,
        totalInvestmentAmount,
        years,
        installmentAmount,
        interestAmount,
        totalAmount,
      ],
    });
  };
  return (
    <>
      <NavBar />
      <div className="container-Insurance">
        <div className="wrap-login100">
          {insuranceSchemeDetail}
          <br />
          <PlanDetails insuranceScheme={insuranceScheme} />
          <br />
          <>
            <h2
              className="h2"
              style={{
                color: "black",

                textStyle: "bold",
              }}
            >
              Interest Calculator
            </h2>
            <br />
            <Table striped bordered hover size="sm">
              {
                <tbody>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Number Of Years :
                    </th>
                    <td style={{ padding: "10px" }}>
                      {" "}
                      <TextField
                        id="standard-basic"
                        label=""
                        
                        fullWidth
                        onChange={(e) => updateNoOfYears(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Total Investment Amount :
                    </th>
                    <td style={{ padding: "10px" }}>
                      {" "}
                      <TextField
                        id="standard-basic"
                        label=""
                        
                        fullWidth
                        onChange={(e) =>
                          updateTotalInvestmentAmount(e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      <br />
                      installment period :
                    </th>
                    <td>
                      <FormControl
                        
                        sx={{ m: 1, minWidth: 270 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={years}
                          onChange={(event) => {
                            updateMonths(event.target.value);
                          }}
                          label="Status"
                        >
                          <MenuItem value={1}>1 year</MenuItem>
                          <MenuItem value={2}>2 year</MenuItem>
                          <MenuItem value={3}>3 year</MenuItem>
                          <MenuItem value={4}>4 year</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                  </tr>
                  <tr
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <td style={{ float: "center", alignSelf: "center" }}>
                      <div id="container-login100-form-btn1">
                        <div id="wrap-login100-form-btn1">
                          <div id="login100-form-bgbtn1"></div>
                          <button 
                            id="login100-form-btn1"
                            onClick={handleCalculate}
                            style={{ width: "100%",backgroundColor:"black",color:"white" }}
                          >
                            Calculate
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Installment Amount :
                    </th>
                    <td style={{ padding: "10px" }}>{installmentAmount}</td>
                  </tr>

                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Interest Amount :
                    </th>
                    <td style={{ padding: "10px" }}>{interestAmount}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Total Amount :
                    </th>
                    <td style={{ padding: "10px" }}>{totalAmount}</td>
                  </tr>
                </tbody>
              }
            </Table>
          </>
          <br />
          <div id="wrap-login100-form-btn1" style={{ width: "300px" }}>
            <div id="login100-form-bgbtn1"></div>
            <button
              id="login100-form-btn1"
              onClick={handleBuy}
              style={{ width: "100%" ,backgroundColor:"black",color:"white" }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default InsuranceSchemeDetails;
