import NavBar from "../AgentNavBar/AgentNavBar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import IsValidUser from "../isValidUser/isValidUser";
import isAgentLoggedIn from "../isAgentLoggedIn/isAgentLoggedIn";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const htmlToFormattedText = require("html-to-formatted-text");

function AgentMarketing() {
  const [to, updateTo] = useState("");
  const [subject, updateSubject] = useState("");
  const [message, updateMessage] = useState("");
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAgentLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleSendMail = () => {
    const text = htmlToFormattedText(message);
    // console.log(text);
    if (to != "" && subject != "" && message != "") {
      axios
        .post("http://localhost:8082/api/v1/marketing", { to, subject, text })
        .then((resp) => {
          console.log(resp.data);
          swal(resp.data, `Congrats!!, Email Sent Successfully`, {
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          swal(error.response.data, "Email Not Sent", "warning");
        });
    } else {
      swal("Fill all fields", "Email Not Sent", "warning");
    }
  };
  return (
    <>
      <NavBar />

      <div id="limiter2">
        <div className="form-container">
          <div id="wrap-login1002">
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Email Id"
                
                onChange={(e) => updateTo(e.target.value)}
              />
            </Box>
            <Box
              // component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Subject"
                
                onChange={(e) => updateSubject(e.target.value)}
              />
            </Box>
            <br />
            <label>Message</label>

            <ReactQuill
              theme="snow"
              // value={insuranceNote}
              onChange={updateMessage}
              style={{ height: "40vh" }}
            />
            <br />
            <br />

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" onClick={handleSendMail}>
                  Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AgentMarketing;
