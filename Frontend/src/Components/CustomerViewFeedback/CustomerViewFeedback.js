import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import SearchInput, { createFilter } from "react-search-input";
import axios from "axios";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";
import { useParams } from "react-router-dom";
function CustomerViewFeedback() {
  const [focused, setFocused] = useState(false);
  const [searchTerm, updateSearchTerm] = useState("");
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const userName = useParams().username;
  const [allQuery, updateAllQuery] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getQuery();
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const searchUpdated = (term) => {
    updateSearchTerm(term);
  };

  let rowOfEmployee;
  async function getQuery() {
    axios
      .get("http://localhost:8082/api/v1/getAllQuery")
      .then((resp) => {
        updateAllQuery(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  if (allQuery != null) {
    if (allQuery != null) {
      const KEYS_TO_FILTERS = ["customerName", "message", "title"];
      const filteredEmails = Object.values(allQuery).filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
      );
      rowOfEmployee = filteredEmails.map((c) => {
        return (
          <tr id={c.customerName}>
            <td id={c.customerName} style={{ width: "15%", padding: "10px" }}>
              {c.customerName}
            </td>
            <td id={c.customerName} style={{ width: "15%", padding: "10px" }}>
              {c.title}
            </td>
            <td id={c.customerName} style={{ width: "15%", padding: "10px" }}>
              {c.message}
            </td>
            <td id={c.customerName} style={{ width: "15%", padding: "10px" }}>
              {c.createdAt.split("T")[0].split("-").reverse().join("-")}
            </td>
            <td id={c.customerName} style={{ width: "15%", padding: "10px" }}>
              {c.reply === "" ? (
                <>No Reply Yet</>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: c.reply }}></div>
              )}
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <>
      <NavBar />

      <div id="limiter2">
        <div className="form-container">
          <div id="wrap-login1002">
            <div>
              <span id="login100-form-title2" style={{ color: "black" }}>
                <h4>View Queries</h4>
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

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Customer Name
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Title
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Message
                    </th>

                    <th scope="col" style={{ width: "10%" }}>
                      Contact Date
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Reply Message
                    </th>
                  </tr>
                </thead>
                <tbody>{rowOfEmployee}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerViewFeedback;
