import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBarAdmin.css";
import swal from "sweetalert";
import image from "../../images/pngwing.com.png";

import { Navigate, useNavigate, useParams } from "react-router-dom";
function BasicExample() {
  const navigate = new useNavigate();
  const username = useParams().username;
  const handleAddEmployee = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddEmployee/${username}`);
  };
  const handleViewEmployee = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewEmployee/${username}`);
  };
  const handleAddAgent = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddAgent/${username}`);
  };
  const handleViewAgent = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewAgent/${username}`);
  };
  const handleViewFeedback = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewFeedback/${username}`);
  };
  const handleViewCommission = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewCommission/${username}`);
  };
  const handleViewCommissionWithdrawal = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewCommissionWithdrawal/${username}`);
  };
  const handleViewCustomer = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewCustomer/${username}`);
  };
  const handleAddCity = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddCity/${username}`);
  };
  const handleAddState = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddState/${username}`);
  };
  const handleViewCity = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewCity/${username}`);
  };
  const handleViewState = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewState/${username}`);
  };
  const handleInsuranceAccount = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/InsuranceAccount/${username}`);
  };
  const handleViewPolicyPayment = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewPolicyPayment/${username}`);
  };
  const handleViewPolicyClaim = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewPolicyClaim/${username}`);
  };
  const handleAddInsuranceType = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddInsuranceType/${username}`);
  };
  const handleViewInsuranceType = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewInsuranceType/${username}`);
  };
  const hanldeAddInsuranceScheme = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/AddInsuranceScheme/${username}`);
  };
  const handleViewInsuranceScheme = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewInsuranceScheme/${username}`);
  };
  // const handleAddInsurancePlan = (e) => {
  //   e.preventDefault();
  //   navigate(`/AdminDashboard/AddInsurancePlan/${username}`);
  // };
  const handleViewInsurancePlan = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ViewInsurancePlan/${username}`);
  };
  const handleTaxSettings = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/TaxSettings/${username}`);
  };
  const handleInsuranceSettings = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/InsuranceSettings/${username}`);
  };
  const handleProfile = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/Profile/${username}`);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/ChangePassword/${username}`);
  };
  const handleAdminDashboard = (e) => {
    e.preventDefault();
    navigate(`/AdminDashboard/${username}`);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
   

        await axios
          .post(`http://localhost:8082/api/v1/logout`)
          .then((resp) => {
            swal(
              "Logged Out",
              {
                icon: "success",
              },
              navigate("/")
            );
          })
          .catch((error) => {
           console.log(error.response.data)
          });
      
   
  };
  return (
    <Navbar className="sticky-top Nav" bg="#AE2CFF" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={handleAdminDashboard}>
        <h4 style={{fontFamily:"italic",}}>Life-Insurance</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleAdminDashboard}>Admin Dashboard</Nav.Link>

            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Agent" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleAddAgent}>
                Add Agent
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewAgent}>
                View Agent
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewCommission}>
                View Commission
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={handleViewCommissionWithdrawal}>
                View Commission Withdrawal
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Insurance" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewCustomer}>
                View Customers
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleInsuranceAccount}>
                Insurance Account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewPolicyPayment}>
                View Policy Payment
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={handleViewPolicyClaim}>
                View Policy Claim
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Query" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewFeedback}>
                View Feedback
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Insurance Type" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleAddInsuranceType}>
                Add Insurance Type
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewInsuranceType}>
                View Insurance Type
              </NavDropdown.Item>
              <NavDropdown.Item onClick={hanldeAddInsuranceScheme}>
                Add Insurance Scheme
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={handleViewInsuranceScheme}>
                View Insurance Scheme
              </NavDropdown.Item>
              {/* <NavDropdown.Item onClick={handleAddInsurancePlan}>
                Add Insurance Plan
              </NavDropdown.Item> */}
              <NavDropdown.Item onClick={handleViewInsurancePlan}>
                View Insurance Plan
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleTaxSettings}>
                Tax Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleInsuranceSettings}>
                Insurance Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleAddCity}>
                Add City
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={handleViewCity}>
                View City
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleAddState}>
                Add State
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewState}>
                View State
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleChangePassword}>
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleAddEmployee}>
                Add Employee
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={handleViewEmployee}>
                View Employee
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
