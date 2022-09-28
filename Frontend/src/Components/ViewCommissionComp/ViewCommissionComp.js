import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import { Alert } from "@mui/material";
import swal from "sweetalert";
// import SearchBar from "material-ui-search-bar";
import SearchInput, { createFilter } from "react-search-input";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
function ViewCommissionComp() {
  const currentUser = useParams();
  const [Customers, updateCustomers] = useState(0);
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  const [searchTerm, updateSearchTerm] = useState("");
  const [open, setOpen] = useState("");
  const [propertyToUpdate, updatePropertyToUpdate] = useState("FirstName");
  const [value, updateValue] = useState("");
  const [customertoUpdate, updateCustomertoUpdate] = useState("");
  const [focused, setFocused] = useState(false);
  

  const [status,updateStatus] = useState();


  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const handleClickOpen = (e) => {
    console.log(e.target.id);
    updateCustomertoUpdate(e.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigation = new useNavigate();

  useEffect(() => {
    getCustomer();
  }, [pageNumber, limit]);
  async function getCustomer() {
    axios
      .get(`http://localhost:8082/api/v1/getAllCommision`, {
        limit,
        pageNumber,
      })
      .then((resp) => {
        let [allCusts, allCustsCount] = resp.data;
        updateAllCustomers(allCusts);
        updateCustomers(allCustsCount);
        console.log(allCusts);
      })
      .catch((error) => {
        updateStatus(
          <Alert severity="error">{error.response.data}</Alert>
          )
      });
  }
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };
  let rowOfEmployee;

  if (allCustomers != null) {
    let emps;
    if (focused) {
      emps = Customers;
    } else {
      emps = allCustomers;
    }
    if (emps != null) {
      const KEYS_TO_FILTERS = ["insuranceAccountNo"];
      const filteredEmails = Object.values(emps).filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
      );
      rowOfEmployee = filteredEmails.map((c) => {
        return (
          <tr id={c.insuranceAccountNo}>
            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.insuranceAccountNo}
            </td>
            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.agentName}
            </td>

            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.createdAt.split("T")[0].split("-").reverse().join("-")}
            </td>

            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.customerName}
            </td>

            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.insuranceSchema}
            </td>

            <td
              id={c.insuranceAccountNo}
              style={{ width: "15%", padding: "10px" }}
            >
              {c.commisionAmount}
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <>
      <div id="limiter2">
        <div >
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>View Customer</h4>
              </span>
              <br />
              <SearchInput
                className="search-input"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={searchUpdated}
                style={{
                  width: "50%",
                  height: "40px",
                  background: "#F2F2F2",
                  color: "black",
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
              <div className="pagination" style={{ display: "inline-flex" }}>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(Customers.length / limit)}
                    color="warning"
                    onChange={(e, value) => updatePageNumber(value)}
                  />
                </Stack>
              </div>{" "}
              <br />
              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Account No
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Agent
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Date
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Customer
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Insurance Scheme
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      <h4>Commission Amount</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfEmployee}</tbody>
              </Table>
              {status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewCommissionComp;
