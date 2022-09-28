import NavBar from "../NavBar/NavBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import { useEffect, useState } from "react";

function InsuranceAccountDetails() {
  const navigate = new useNavigate();
  const insuranceScheme = useLocation().state[0];
  const insuranceType = useLocation().state[1];
  const noOfYears = useLocation().state[2];
  const totalInvestmentAmount = useLocation().state[3];
  const years = useLocation().state[4];
  const installmentAmount = useLocation().state[5];
  const interestAmount = useLocation().state[6];
  const totalAmount = useLocation().state[7];
  const username = useParams().username;
  const date = new Date();
  const maturityDate =
    date.getDate() +
    "-" +
    date.getMonth() +
    "-" +
    (Number(date.getFullYear()) + Number(noOfYears));
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
  const handleSubmit = () => {
    navigate(`/CustomerDashboard/PolicyPayment/${username}`, {
      state: [
        insuranceType,
        insuranceScheme.insuranceScheme,

        noOfYears,
        years,
        installmentAmount,
        date,
      ],
    });
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
                    Insurance Type :
                  </th>
                  <td style={{ padding: "10px" }}>{insuranceType}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Insurance Scheme :
                  </th>
                  <td style={{ padding: "10px" }}>
                    {insuranceScheme.insuranceScheme}
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Number Of Years :
                  </th>
                  <td style={{ padding: "10px" }}>{noOfYears}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Profit Ratio(in %) :
                  </th>
                  <td style={{ padding: "10px" }}>
                    {insuranceScheme.profitRatio}
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Total Investment Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{totalInvestmentAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Premium type :
                  </th>
                  <td style={{ padding: "10px" }}>{years}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Installment Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{installmentAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Interest Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{interestAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Total Amount :
                  </th>
                  <td style={{ padding: "10px" }}>{totalAmount}</td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Date Created :
                  </th>
                  <td style={{ padding: "10px" }}>
                    {date.getDate() +
                      "-" +
                      date.getMonth() +
                      "-" +
                      date.getFullYear()}
                  </td>
                </tr>
                <tr>
                  <th style={{ width: "30%", height: "50%", padding: "10px" }}>
                    Maturity Date :
                  </th>
                  <td style={{ padding: "10px" }}>{maturityDate}</td>
                </tr>
              </tbody>
            }
          </Table>
          <div id="wrap-login100-form-btn1" style={{ width: "300px" }}>
            <div id="login100-form-bgbtn1"></div>
            <button
              id="login100-form-btn1"
              onClick={handleSubmit}
              style={{ width: "100%",backgroundColor:"black",color:"white" }}
            >
              Click to proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default InsuranceAccountDetails;
