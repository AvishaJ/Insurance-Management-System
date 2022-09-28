import "./AdminDashboard.css";
import "../NavBar/NavBar.css";
import NavBar from "../NavBarAdmin/NavBarAdmin";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; 
import agent from "../../images/agent.png";
import insurance from "../../images/istockphoto-498604690-612x612.jpg";
import account from "../../images/account.png";
import settings from "../../images/295166.png";
import queries from "../../images/queries.png";

function AdminDashboard() {
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const userName = useParams().username;
  useEffect(() => {
    
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
    isLoggedIn();
  }, []);
  const navigate = new useNavigate();
  const username = useParams().username;
  
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
                    src={agent}                  />
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
                          navigate(`/AdminDashboard/AddAgent/${username}`);
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/ViewAgent/${username}`);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ViewCommission/${username}`
                          );
                        }}
                      >
                        View Commission
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ViewCommissionWithdrawal/${username}`
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
                            `/AdminDashboard/AddInsuranceType/${username}`
                          );
                        }}
                      >
                        Add Insurance Type
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ViewInsuranceType/${username}`
                          );
                        }}
                      >
                        View Insurance Type
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/AddInsuranceScheme/${username}`
                          );
                        }}
                      >
                        Add Insurance Scheme
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ViewInsuranceScheme/${username}`
                          );
                        }}
                      >
                        View Insurance Scheme
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ViewInsurancePlan/${username}`
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
                    src={account}
                  />
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
                          navigate(`/AdminDashboard/Profile/${username}`);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/ChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/AddEmployee/${username}`);
                        }}
                      >
                        Add Employee
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/ViewEmployee/${username}`);
                        }}
                      >
                        View Employee
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
                    src={settings}                  />
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
                          navigate(`/AdminDashboard/TaxSettings/${username}`);
                        }}
                      >
                        Tax Settings
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/AdminDashboard/InsuranceSettings/${username}`
                          );
                        }}
                      >
                        Insurance Settings
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/AddCity/${username}`);
                        }}
                      >
                        Add City
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/ViewCity/${username}`);
                        }}
                      >
                        View City
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/AddState/${username}`);
                        }}
                      >
                        Add State
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(`/AdminDashboard/ViewState/${username}`);
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
                    src={queries}                  />
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
                          navigate(`/AdminDashboard/ViewFeedback/${username}`);
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
export default AdminDashboard;
