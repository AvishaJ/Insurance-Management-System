import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import agent from "../../images/agent.png";
import insurance from "../../images/istockphoto-498604690-612x612.jpg";
import account from "../../images/account.png";
import settings from "../../images/295166.png";
import queries from "../../images/queries.png";
import { Alert } from "@mui/material";


import "./CustomerDashboard.css";
function CustomerDashboard() {
  const navigate = new useNavigate();
  const username = useParams().username;
  const [insuranceType, updateInsuranceType] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const [status,updateStatus] = useState();

  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getAllInsuranceTypes();
  }, []);
  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  async function getAllInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        console.log(resp.data);
        updateInsuranceType(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateStatus(
          <Alert severity="error">{error.response.data}</Alert>
          )
      });
  }
  const handleOnClick = (i) => {
    navigate(`/CustomerDashboard/InsuranceScheme/${username}`, {
      state: i,
    });
  };

  let OptionOfInsuranceTypes;
  if (insuranceType != null) {
    OptionOfInsuranceTypes = Object.values(insuranceType).map((i) => {
      return (
        <Button
          variant="success"
          onClick={() => {
            handleOnClick(i.insuranceType);
          }}
        >
          {i.insuranceType}
        </Button>
      );
    });
  }
  return (
    <>
      <NavBar className="Nav"/>
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
                    src={insurance}                  />

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
                      {OptionOfInsuranceTypes}
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
                            `/CustomerDashboard/CustomerDocument/${username}`
                          );
                        }}
                      >
                        Document
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
                    height="150px"
                    width="150px"
                    src={insurance}
                  />
                  <Card.Body>
                    <Card.Title>Insurance Account</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        rowGap: "1.1em",
                      }}
                    ></div>
                  </Card.Body>
                </Card>
              </div>
              <div id="AdminDashboardCards">
                <Card style={{ width: "13rem", padding: "1rem" }}>
                  <Card.Img
                    variant="top"
                    height="150px"
                    width="150px"
                    src ={queries}
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
export default CustomerDashboard;
