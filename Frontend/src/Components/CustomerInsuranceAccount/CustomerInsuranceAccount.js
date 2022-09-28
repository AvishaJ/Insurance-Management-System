import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchInput, { createFilter } from "react-search-input";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
function CustomerInsuranceAccount() {
  const [pageNumber, updatePageNumber] = useState(1);
  const userName = useParams().username;
  const [limit, updateLimit] = useState(5);
  const navigate = new useNavigate();

  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [StatetoUpdate, updateStatetoUpdate] = useState("");
  const [value, updateValue] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const [allPolicies, updateAllPolicies] = useState("");
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getPolicies();
  }, [limit, pageNumber]);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  async function getPolicies() {
    await axios
      .post(`http://localhost:8082/api/v1/getUserAllPolicy/${userName}`, {
        limit,
        pageNumber,
      })
      .then((resp) => {
        const [policies, allpolicies] = resp.data;
        updateAllPolicies(policies);

        console.log(policies);
      })
      .catch((error) => {
        console.log(error.response.data);
       
      });
  }
  const handleView = (e, p) => {
    e.preventDefault();
    console.log(p);
    navigate(`/CustomerDashboard/Installments/${userName}`, { state: p });
  };

  let rowOfPolicies;
  if (allPolicies != null) {
    const KEYS_TO_FILTERS = ["credential.userName"];
    const filteredEmails = Object.values(allPolicies).filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    rowOfPolicies = filteredEmails.map((p) => {
      return (
        <tr
        //    id={s.userId}
        >
          <td
            // id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.accountno}
          </td>

          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.insuranceType}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.insuranceScheme}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.createdAt.split("T")[0]}
          </td>

          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.maturityDate.split("T")[0]}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.premiumType}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.totalAmount}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.profitRatio}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            {p.sumAssuredAfterYears}
          </td>
          <td
            //  id={s.credential.userName}
            style={{ width: "15%" }}
          >
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(event) => {
                console.log(p);
                handleView(event, p);
              }}
            >
              view
            </span>
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
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>States</h4>
              </span>
              <br />
              <SearchInput
                className="search-input"
                onChange={searchUpdated}
                style={{
                  width: "50%",
                  height: "40px",
                  background: "#F2F2F2",
                  font: "black",
                  border: "1px solid #E1D9D1",
                }}
              />
              <br />
              <div className="pagination" style={{ display: "inline-flex" }}>
                <label class="fw-bold">limit:</label>
                <select
                  style={{ width: "140px" }}
                  id="role"
                  name="role"
                  onChange={(e) => {
                    updateLimit(e.target.value);
                    updatePageNumber(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;
              {" "}
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Acc No
                    </th>

                    <th scope="col" style={{ width: "10%" }}>
                      Insurance Type
                    </th>
                    {/* <th scope="col" style={{ width: "10%" }}>
                  Account Details
                </th> */}
                    <th scope="col" style={{ width: "12%" }}>
                      Insurance Scheme
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Date Create
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Maturity Date
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Premium Type
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Total Premium Amount
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Profit Ratio
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      Sum Assured
                    </th>
                    <th scope="col" style={{ width: "12%" }}>
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfPolicies}</tbody>
              </Table>
              &nbsp;&nbsp;&nbsp;
              <div className="pagination" style={{ display: "inline-flex" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(allPolicies.length / limit)}
                    color="success"
                    onChange={(e, value) => updatePageNumber(value)}
                  />
                </Stack>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerInsuranceAccount;
