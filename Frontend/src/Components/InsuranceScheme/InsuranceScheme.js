import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./InsuranceScheme.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

function InsuranceScheme() {
  const navigate = new useNavigate();
  const insuranceType = useLocation().state;
  const username = useParams().username;
  console.log(insuranceType);
  const [insuranceSchemes, updateInsuranceSchemes] = useState("");
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(username));
      console.log(isLoggedIn);
    }
  }, []);

  useEffect(() => {
    getAllInsuranceScheme();
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  async function getAllInsuranceScheme() {
    await axios
      .post("http://localhost:8082/api/v1/getAllInsuranceScheme", {
        insuranceType,
      })
      .then((resp) => {
        console.log(resp.data);
        updateInsuranceSchemes(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const handleShowMore = (i) => {
    navigate(`/CustomerDashboard/InsuranceSchemeDetails/${username}`, {
      state: [i, insuranceType],
    });
  };
  let cardOfInsuranceScheme;

  if (insuranceSchemes != null) {
    cardOfInsuranceScheme = Object.values(insuranceSchemes).map((i) => {
      const binaryString = Array.from(new Uint8Array(i.image.data), (v) =>
        String.fromCharCode(v)
      ).join("");
      const theImage = btoa(binaryString);
      return (
        <div className="container-Insurance">
          <div className="wrap-login100">
            <img src={`data:image/png;base64,${theImage}`} />
            <br />
            <br />
            <h1
              style={{
                color: "black",

                textStyle: "bold",
              }}
            >
              {" "}
              {i.insuranceScheme}
            </h1>
            <br />
            <div dangerouslySetInnerHTML={{ __html: i.insuranceNote }}></div>
            <br />
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                handleShowMore(i);
              }}
            >
              Show More....
            </span>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {" "}
      <NavBar />
      {cardOfInsuranceScheme}
    </>
  );
}
export default InsuranceScheme;
