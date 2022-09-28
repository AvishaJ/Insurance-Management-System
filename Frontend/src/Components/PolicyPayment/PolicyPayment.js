import NavBar from "../NavBar/NavBar";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Table from "react-bootstrap/Table";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import { useEffect } from "react";
import swal from "sweetalert";
function PolicyPayment() {
  const navigate = new useNavigate();
  const username = useParams().username;

  const insuranceType = useLocation().state[0];
  console.log(insuranceType);
  const insuranceScheme = useLocation().state[1];
  console.log(insuranceScheme);
  const termPlan = useLocation().state[2];
  console.log(termPlan);
  const premiumType = useLocation().state[3];
  console.log(premiumType);
  const installmentAmount = useLocation().state[4];
  console.log(installmentAmount);
  const getdate = useLocation().state[5];
  let tempdate = getdate; // value from your state
  let date = moment(tempdate).format("DD/MM/YYYY");
  console.log(date);
  let tax;
  let totalAmount;
  const [paymentType, updatePaymentType] = useState("");
  const [cardHolder, updateCardHolder] = useState("");
  const [cardNumber, updateCardNumber] = useState("");
  const [cvvNumber, updateCvvNumber] = useState("");
  const [expDate, updateExpireDate] = useState("");
  const [taxper, updateTaxper] = useState("");
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  useEffect(() => {
    getTax();
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  async function getTax() {
    await axios
      .get("http://localhost:8082/api/v1/gettaxper")
      .then((resp) => {
        console.log(resp.data);
        updateTaxper(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  if (taxper != null) {
    tax = (installmentAmount * taxper) / 100;
    totalAmount = tax + installmentAmount;
  }
  const handleSubmit = () => {
    let tempdate = expDate; // value from your state
    let expireDate = moment(tempdate).format("DD/MM/YYYY");
    if (cardNumber.toString().length === 16) {
      swal({
        title: "Are you sure?",
        text: "Click OK for Paying Amount",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          axios
            .post(`http://localhost:8082/api/v1/buyPolicy/${username}`, {
              insuranceType,
              insuranceScheme,
              termPlan,
              premiumType,
              totalAmount,
              paymentType,
              cardHolder,
              cardNumber,
              cvvNumber,
              expireDate,
            })
            .then((resp) => {
              console.log(resp.data);
              navigate(`/CustomerDashboard/policyPaymentReceipt/${username}`, {
                state: [
                  username,
                  date,
                  paymentType,
                  installmentAmount,
                  tax,
                  totalAmount,
                ],
              });
            })
            .catch((error) => {
              console.log(error.response.data);
              navigate(`/CustomerDashboard/policyPaymentReceipt/${username}`, {
                state: [
                  username,
                  date,
                  paymentType,
                  installmentAmount,
                  tax,
                  totalAmount,
                ],
              });
            });
        }
      });
    } else {
      swal("wrong Card number", "Card number must be 16 in length", "warning");
    }
  };
  return (
    <>
      <NavBar />
      <div className="container-Insurance">
        <div className="wrap-login100">
          <h2
            className="h2"
            style={{
              color: "black",
              alignContent: "center",
              textStyle: "bold",
            }}
          >
            Insurance Account Detail
          </h2>
          <br />
          <Table striped bordered hover size="sm">
            {
              <tbody>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Date :
                  </th>
                  {date}
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Installment Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{installmentAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Tax Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{tax}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Total Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{totalAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Payment Type :
                  </th>
                  <td style={{ padding: "10px" }}>
                    <FormControl
                      fullWidth
                      
                      sx={{ m: 1, minWidth: 270 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select
                      </InputLabel>
                      <Select
                        fullWidth="true"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={paymentType}
                        onChange={(event) => {
                          updatePaymentType(event.target.value);
                        }}
                        label="Status"
                      >
                        <MenuItem value="CreditCard">Credit Card</MenuItem>
                        <MenuItem value="DebitCard">Debit Card</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Card Holder :
                  </th>
                  <td style={{ padding: "10px" }}>
                    <TextField
                      id="standard-basic"
                      label=""
                      
                      fullWidth
                      onChange={(e) => updateCardHolder(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Card Number :
                  </th>
                  <td style={{ padding: "10px" }}>
                    <TextField
                      id="standard-basic"
                      label=""
                      
                      fullWidth
                      onChange={(e) => updateCardNumber(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Cvv Number :
                  </th>
                  <td style={{ padding: "10px" }}>
                    <TextField
                      id="standard-basic"
                      label=""
                      
                      fullWidth
                      onChange={(e) => updateCvvNumber(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Expire Date :
                  </th>
                  <td style={{ padding: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Date Of Birth"
                        inputFormat="DD/MM/YYYY"
                        value={expDate}
                        onChange={(value) => updateExpireDate(value)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                </tr>
              </tbody>
            }
          </Table>
          <div id="wrap-login100-form-btn1" style={{ width: "300px" }}>
            <div id="login100-form-bgbtn1"></div>
            <button
              id="login100-form-btn1"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PolicyPayment;
