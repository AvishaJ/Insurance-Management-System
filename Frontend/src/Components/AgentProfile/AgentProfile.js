import NavBar from "../AgentNavBar/AgentNavBar";
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
function AgentProfile() {
  const currentUser = useParams();
  const [profile, updateProfile] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAgentLoggedIn(currentUser.username));
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
    await axios
      .get(`http://localhost:8082/api/v1/profileAgent/${currentUser.username}`)
      .then((resp) => {
        console.log(resp.data);
        updateProfile(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <>
      <NavBar />
      <div id="limiter2">
        <div id="container-login1002">
          <div id="wrap-login1002">
            <h1
              className="h1"
              style={{
                color: "black",
                textAlign: "center",
                textStyle: "bold",
              }}
            >
              Profile
            </h1>
            <br />
            <Table striped bordered hover size="sm">
              {
                <tbody>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Agent Code :
                    </th>
                    <td style={{ padding: "10px" }}>{profile.agentCode}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Agent Name :
                    </th>
                    <td style={{ padding: "10px" }}>{profile.fullName}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Email ID :
                    </th>
                    <td style={{ padding: "10px" }}>{profile.emailId}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      isActive :
                    </th>
                    <td style={{ padding: "10px" }}>
                      {profile.isActive ? "Active" : "InActive"}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Qualification :
                    </th>
                    <td style={{ padding: "10px" }}>{profile.qualification}</td>
                  </tr>
                  <tr>
                    <th
                      style={{ width: "30%", height: "50%", padding: "10px" }}
                    >
                      Address :
                    </th>
                    <td style={{ padding: "10px" }}>{profile.address}</td>
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
export default AgentProfile;
