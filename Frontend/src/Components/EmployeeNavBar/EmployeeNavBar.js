import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import image from "../../images/pngwing.com.png";


import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function BasicExample() {
  const navigate = new useNavigate();
  const username = useParams().username;
  const handleAddEmployee = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddEmployee/${username}`);
  };
  const handleViewEmployee = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewEmployee/${username}`);
  };
  const handleAddAgent = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddAgent/${username}`);
  };
  const handleViewAgent = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewAgent/${username}`);
  };
  const handleViewFeedback = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewFeedback/${username}`);
  };
  const handleViewCommission = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewCommission/${username}`);
  };
  const handleViewCommissionWithdrawal = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewCommissionWithdrawal/${username}`);
  };
  const handleViewCustomer = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewCustomer/${username}`);
  };
  const handleAddCity = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddCity/${username}`);
  };
  const handleAddState = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddState/${username}`);
  };
  const handleViewCity = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewCity/${username}`);
  };
  const handleViewState = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewState/${username}`);
  };
  const handleInsuranceAccount = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/InsuranceAccount/${username}`);
  };
  const handleViewPolicyPayment = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewPolicyPayment/${username}`);
  };
  const handleViewPolicyClaim = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewPolicyClaim/${username}`);
  };
  const handleAddInsuranceType = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddInsuranceType/${username}`);
  };
  const handleViewInsuranceType = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewInsuranceType/${username}`);
  };
  const hanldeAddInsuranceScheme = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/AddInsuranceScheme/${username}`);
  };
  const handleViewInsuranceScheme = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewInsuranceScheme/${username}`);
  };
  // const handleAddInsurancePlan = (e) => {
  //   e.preventDefault();
  //   navigate(`/EmployeeDashboard/AddInsurancePlan/${username}`);
  // };
  const handleViewInsurancePlan = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ViewInsurancePlan/${username}`);
  };
  const handleTaxSettings = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/TaxSettings/${username}`);
  };
  const handleInsuranceSettings = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/InsuranceSettings/${username}`);
  };
  const handleProfile = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/Profile/${username}`);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/ChangePassword/${username}`);
  };
  const handleEmployeeDashboard = (e) => {
    e.preventDefault();
    navigate(`/EmployeeDashboard/${username}`);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Click OK for LogOut",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willLogout) => {
      console.log(willLogout);
      if (willLogout === true) {
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
            swal("You Can't Logout", error.response.data, "warning");
          });
      }
    });
  };
  return (
    <Navbar className="sticky-top Nav" bg="#AE2CFF" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={handleEmployeeDashboard}>
          <h2 style={{ fontFamily: "italic", }}>Life-Insurance</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleEmployeeDashboard}>Dashboard</Nav.Link>

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

              <NavDropdown.Item onClick={handleViewCommissionWithdrawal}>
                View Commission Withdrawal
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Insurance" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewCustomer}>
                View Customers
              </NavDropdown.Item>
              {/* <NavDropdown.Item onClick={handleInsuranceAccount}>
                Insurance Account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewPolicyPayment}>
                View Policy Payment
              </NavDropdown.Item>

              <NavDropdown.Item onClick={handleViewPolicyClaim}>
                View Policy Claim
              </NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Query" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewFeedback}>
                View Feedback
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Insurance Type" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewInsuranceType}>
                View Insurance Type
              </NavDropdown.Item>

              <NavDropdown.Item onClick={handleViewInsuranceScheme}>
                View Insurance Scheme
              </NavDropdown.Item>

              <NavDropdown.Item onClick={handleViewInsurancePlan}>
                View Insurance Plan
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewCity}>
                View City
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
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
