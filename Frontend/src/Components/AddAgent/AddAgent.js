import "./AddAgent.css";
import AddAgentComp from "../AddAgentComp/AddAgentComp";
import NavBar from "../NavBarAdmin/NavBarAdmin";
import IsValidUser from "../isValidUser/isValidUser";
import isAdminLoggedIn from "../isAdminLoggedIn/isAdminLoggedIn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function AddAgent() {
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
      <AddAgentComp />
    </>
  );
}
export default AddAgent;
