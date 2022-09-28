import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import "./footer.css";
function Footer() {
  return (
    <div style={{paddingBottom:"0px"}}>
    <CDBFooter className="shadow" style={{ paddingBottom:"0px" }} >
      <CDBBox
        display="flex"
         flex="column"
        className="mt-4"
        style={{ width: "90%" }}
      >
        <small className="text-center mt-4" >
          copyright @Life Insurance 
        </small>
      </CDBBox>
    </CDBFooter>
    </div>
  );
}
export default Footer;
