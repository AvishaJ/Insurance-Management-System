import NavBar from "../EmployeeNavBar/EmployeeNavBar";
import ViewInsuranceTypeComp from "../ViewInsuranceTypeComp/ViewInsuranceTypeComp";
import IsValidUser from "../isValidUser/isValidUser";
import isEmployeeLoggedIn from "../isEmployeeLoggedIn/isEmployeeLoggedIn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewInsuranceTypeEmp() {
  const userName = useParams().username;
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isEmployeeLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  return (
    <>
      <NavBar />
      <ViewInsuranceTypeComp />
    </>
  );
}
export default ViewInsuranceTypeEmp;
