import NavBar from "../AgentNavBar/AgentNavBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
import { useEffect, useState } from "react";
import agent from "../../images/agent.png";
import insurance from "../../images/istockphoto-498604690-612x612.jpg";
import account from "../../images/account.png";
import settings from "../../images/295166.png";
import queries from "../../images/queries.png";
import marketing from "../../images/marketing.png";


function AgentDashboard() {
  const navigate = new useNavigate();
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
                    height="130px"
                    width="130px"
                    src={insurance}
                  />

                  <Card.Body>
                    <Card.Title>Insurance</Card.Title>
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
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        View Customer
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        Insurance Account
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        View Policy Payment
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        View Policy Claim
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="130px"
                    width="130px"
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
                          navigate(
                            `/CustomerDashboard/CustomerProfile/${username}`
                          );
                        }}
                      >
                        Profile
                      </Button>

                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        View Commission
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        View Commission Withdrawal
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        Withdraw Amount
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div
                id="AdminDashboardCards"
                onClick={() => {
                  navigate(`/CustomerDashboard/InsuranceAccount/${username}`);
                }}
              >
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="130px"
                    width="130px"
                    src = {marketing}
                  />
                  <Card.Body>
                    <Card.Title>Marketing</Card.Title>
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
                            `/CustomerDashboard/CustomerChangePassword/${username}`
                          );
                        }}
                      >
                        Marketing
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="130px"
                    width="130px"
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
                          navigate(`/CustomerDashboard/Enquiry/${username}`);
                        }}
                      >
                        Enquiry
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate(
                            `/CustomerDashboard/CustomerViewFeedback/${username}`
                          );
                        }}
                      >
                        View feedback
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
export default AgentDashboard;
