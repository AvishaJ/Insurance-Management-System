import NavBar from "../NavBarAdmin/NavBarAdmin";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useParams } from "react-router-dom";
function TaxSettings() {
  const [value, setValue] = useState(0);
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isAdminLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Click OK for Creating Your Customer Account",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (AddingCustomer) => {
      if (AddingCustomer === true) {
        console.log(value)
        axios
          .post("http://localhost:8082/api/v1/updatetaxSetting", { value })
          .then((resp) => {
            console.log(resp.data);
            swal(resp.data, `tax updated`, {
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            swal(error.response.data, "failed update tax", "warning");
          });
      }
    });
  };
  return (
    <>
      <NavBar />
      <div id="limiter1">
        <div className="form-container">
          <div id="wrap-login1001">
            <h1
              className="h1"
              style={{
                color: "black",
                textAlign: "center",
                textStyle: "bold",
              }}
            >
              Tax Settings
            </h1>
            <br />
            <br />
            <form noValidate autoComplete="off" style={{ textAlign: "center" }}>
              <TextField
                type="number"
                min="0"
                step="1"
                value={value && Math.max(0, value)}
                onChange={(e) =>
                  setValue(
                    e.target.value ? Number(e.target.value) : e.target.value
                  )
                }
                id="outlined-basic"
                label="Tax %"
                variant="outlined"
              />
              <br />
              <br />
              <div className="container-login100-form-btn1">
                <div
                  className="wrap-login100-form-btn1"
                  style={{ width: "200px" }}
                >
                  <div className="login100-form-bgbtn1"></div>
                  <button
                    className="login100-form-btn1"
                    style={{ width: "100%" }}
                    onClick={onSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default TaxSettings;
