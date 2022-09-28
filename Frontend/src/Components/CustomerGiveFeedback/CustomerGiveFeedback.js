import NavBar from "../NavBar/NavBar";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

const htmlToFormattedText = require("html-to-formatted-text");
function CustomerGiveFeedback() {
  const [title, updateTitle] = useState();
  const [Msg, updateMessage] = useState();
  const customerName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(customerName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const handleEnquiry = async () => {
    const message = htmlToFormattedText(Msg);
    if (Msg != "") {
      swal({
        title: "Are you sure?",
        text: "Click OK for Changing Password",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (AddingCity) => {
        if (AddingCity === true) {
          await axios
            .post(`http://localhost:8082/api/v1/createQuery/${customerName}`, {
              title,
              message,
            })
            .then((resp) => {
              console.log(resp.data);
              swal(resp.data, "Query sent Succesfully", {
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error.response.data);
              swal(error.response.data, "Error Occured", "warning");
            });
        }
      });
    } else {
      swal("Please type message to send", "Message is Empty", "warning");
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
                label="Title"
                
                onChange={(e) => updateTitle(e.target.value)}
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
  

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <br />
                <br />
                <button className="login100-form-btn" onClick={handleEnquiry}>
                  Send Query
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerGiveFeedback;
