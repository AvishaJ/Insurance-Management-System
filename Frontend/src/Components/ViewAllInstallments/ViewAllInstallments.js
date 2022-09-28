import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

function ViewAllInstallments() {
  const policy = useLocation().state;
  const username = useParams().username;
  const navigation = new useNavigate();
  const [allInstallments, updateAllInstallments] = useState();
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getInstallments();
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  console.log(policy);

  async function getInstallments() {
    const policyId = policy._id;
    await axios
      .post(
        `http://localhost:8082/api/v1/getAllInstallmentPolicy/${username}`,
        { policyId }
      )
      .then((resp) => {
        updateAllInstallments(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        swal(error.response.data, "Error Occured", "warning");
      });
  }
  const hanldePayInstallment = (e, i) => {
    e.preventDefault();
    navigation(`/CustomerDashboard/InstallmentPayment/${username}`, {
      state: [policy.accountno, policy.insuranceScheme, i._id],
    });
  };
  let rowOfPaymentDetails;
  if (allInstallments != null) {
    rowOfPaymentDetails = Object.values(allInstallments).map((i) => {
      return (
        <tr>
          <td>{i.installmentNo}</td>
          <td>{i.installmentDate.split("T")[0]}</td>
          <td>{i.installAmount}</td>
          <td>{i.payDate.split("GMT")[0]}</td>
          <td>{i.paymentStatus}</td>
          <td>
            {i.paymentStatus == "Paid" ? (
              <button style={{ color: "Grey" }} disabled>
                paid
              </button>
            ) : (
              <button
                style={{ color: "blue" }}
                onClick={(event) => hanldePayInstallment(event, i)}
              >
                pay
              </button>
            )}
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <NavBar />
      <div id="limiter2">
        <div >
          <div id="wrap-login1002">
            <span id="login100-form-title1" style={{ color: "black" }}>
              <h4>Installments</h4>
            </span>
            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{username}</td>
                </tr>
              </tbody>
              {/* <tbody>{rowOfCustomerDetails}</tbody> */}
            </Table>
            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "15%" }}>
                    Account Number
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Insurance Type
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Insurance Scheme
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Date Created
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Maturity Date
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Premium Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{policy.accountno}</td>
                  <td>{policy.insuranceType}</td>
                  <td>{policy.insuranceScheme}</td>
                  <td>{policy.dateCreated.split("T")[0]}</td>
                  <td>{policy.maturityDate}</td>
                  <td>{policy.premiumType}</td>
                </tr>
              </tbody>
              {/* <tbody>{rowOfAccountDetails}</tbody> */}
            </Table>
            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "15%" }}>
                    Total Premium Amount
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Profit Ratio
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Sum Assured
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{policy.totalAmount}</td>
                  <td>{policy.profitRatio}</td>
                  <td>{policy.sumAssuredAfterYears}</td>
                </tr>
              </tbody>
              {/* <tbody>{rowOfPremiumDetails}</tbody> */}
            </Table>
            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "15%" }}>
                    Installment Number
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Installment Date
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Installment Amount
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Paid Date
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Payment Status
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Pay
                  </th>
                </tr>
              </thead>
              <tbody>{rowOfPaymentDetails}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewAllInstallments;
