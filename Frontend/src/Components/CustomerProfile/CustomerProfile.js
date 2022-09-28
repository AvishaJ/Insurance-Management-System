import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

function CustomerProfile() {
  const currentUser = useParams();
  const [user, updateuser] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(currentUser.username));
      console.log(isLoggedIn);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }

  async function getProfile() {
    axios
      .get(
        `http://localhost:8082/api/v1/profileCustomer/${currentUser.username}`
      )
      .then((resp) => {
        console.log(resp.data);
        updateuser(resp.data);
      })
      .catch((error) => {
        swal(error.response.data, "Error Occured", "warning");
      });
  }
  return (
    <>
      <NavBar />
      <div id="limiter2">
        <div className="form-container">
          <div id="wrap-login1002">
            <h1
              className="h1"
              style={{
                color: "black",
                textAlign: "center",
                textStyle: "bold",
              }}
            >
              user
            </h1>
            <br />
            <Table striped bordered hover size="sm">
              {
                <tbody>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Name :
                    </th>
                    <td style={{ padding: "10px" }}>
                      {user.firstName + " " + user.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Email :
                    </th>
                    <td style={{ padding: "10px" }}>{user.email}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Nominee :
                    </th>
                    <td style={{ padding: "10px" }}>{user.nominee}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Nominee Relation:
                    </th>
                    <td style={{ padding: "10px" }}>{user.nomineeRelation}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      isActive :
                    </th>
                    <td style={{ padding: "10px" }}>
                      {user.isActive ? "Active" : "InActive"}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      State :
                    </th>
                    <td style={{ padding: "10px" }}>{user.state}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      City :
                    </th>
                    <td style={{ padding: "10px" }}>{user.city}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Address :
                    </th>
                    <td style={{ padding: "10px" }}>{user.address}</td>
                  </tr>
                </tbody>
              }
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerProfile;
