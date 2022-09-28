import NavBar from "../NavBarAdmin/NavBarAdmin";
import ViewCommissionComp from "../ViewCommissionComp/ViewCommissionComp";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ViewCommission() {
  const [isLoggedIn, updateIsLoggedIn] = useState();
  const userName = useParams().username;
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
      <ViewCommissionComp />
    </>
  );
}
export default ViewCommission;
