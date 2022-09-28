import NavBar from "../NavBarAdmin/NavBarAdmin";
import ViewInsuranceTypeComp from "../ViewInsuranceTypeComp/ViewInsuranceTypeComp";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ViewInsuranceType() {
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
  return (
    <>
      <NavBar />
      <ViewInsuranceTypeComp />
    </>
  );
}
export default ViewInsuranceType;
