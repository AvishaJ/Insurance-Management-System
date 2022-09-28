import NavBar from "../AgentNavBar/AgentNavBar";
import axios from "axios";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
import { useParams } from "react-router-dom";
function AgentViewCommissionWithdrawal() {
  const [bankDetails, updateBankDetails] = useState("");
  const [withdrawAmount, updateWithdrawAmount] = useState("");
  const username = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAgentLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleAddStateName = async (e) => {
    e.preventDefault();
    if (bankDetails != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK to withdraw",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingState) => {
        if (AddingState === true) {
          await axios
            .post(
              `http://localhost:8082/api/v1/withdrawCommision/${username}`,
              {
                bankDetails,
                withdrawAmount,
              }
            )
            .then((resp) => {
              swal(resp.data, "Withdraw Succesfull", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal(error.response.data, "Withdraw failed", "warning");
            });
        }
      });
    } else {
      swal("Require StateName", "Withdraw failed", "warning");
    }
  };
  return (
    <>
      <NavBar />
      <div id="limiter1">
        <div className="form-container">
          <div id="wrap-login1001">
            <form id="login100-form1 validate-form">
              <span id="login100-form-title1" style={{ color: "black" }}>
                Withdraw Amount
              </span>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="BankName"
                  
                  // onChange={(e) => updateBankDetails(e.target.value)}
                />
              </Box>
              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Account No"
                  
                  onChange={(e) => updateBankDetails(e.target.value)}
                />
              </Box>

              <Box
                // component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Amount"
                  
                  onChange={(e) => updateWithdrawAmount(e.target.value)}
                />
              </Box>

              <div id="container-login100-form-btn1">
                <div id="wrap-login100-form-btn1">
                  <div id="login100-form-bgbtn1"></div>
                  <button
                    id="login100-form-btn1"
                    onClick={handleAddStateName}
                    style={{ width: "100%" }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AgentViewCommissionWithdrawal;
