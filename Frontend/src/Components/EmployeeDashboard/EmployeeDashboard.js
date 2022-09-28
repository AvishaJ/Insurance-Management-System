import NavBar from "../EmployeeNavBar/EmployeeNavBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isEmployeeLoggedIn from "../isEmployeeLoggedIn/isEmployeeLoggedIn";
import agent from "../../images/agent.png";
import insurance from "../../images/istockphoto-498604690-612x612.jpg";
import account from "../../images/account.png";
import settings from "../../images/295166.png";
import queries from "../../images/queries.png";
import image from "../../images/pngwing.com.png";


import { useEffect, useState } from "react";
function EmployeeDashboard() {
  const navigate = new useNavigate();
  const username = useParams().username;

  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isEmployeeLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  return (
    <>
      <NavBar />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                rowGap: "2em",
              }}
            >
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src={agent}
l                  />
                  <Card.Body>
                    <Card.Title>Agent</Card.Title>
                    <br />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/AddAgent/${username}`);
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/ViewAgent/${username}`);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewCommission/${username}`
                          );
                        }}
                      >
                        View Commission
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewCommissionWithdrawal/${username}`
                          );
                        }}
                      >
                        View Commission Withdrawal
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src={insurance}
                  />

                  <Card.Body>
                    <Card.Title>Insurance Type</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsuranceType/${username}`
                          );
                        }}
                      >
                        View Insurance Type
                      </Button>

                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsuranceScheme/${username}`
                          );
                        }}
                      >
                        View Insurance Scheme
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewInsurancePlan/${username}`
                          );
                        }}
                      >
                        View Insurance Plan
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src={account}                  />
                  <Card.Body>
                    <Card.Title>Account</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/Profile/${username}`);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src = {settings}
                  />
                  <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/ViewCity/${username}`);
                        }}
                      >
                        View City
                      </Button>

                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/EmployeeDashboard/ViewState/${username}`);
                        }}
                      >
                        View State
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src={queries}
                  />
                  <Card.Body>
                    <Card.Title>Query</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/EmployeeDashboard/ViewFeedback/${username}`
                          );
                        }}
                      >
                        view feedback
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployeeDashboard;
