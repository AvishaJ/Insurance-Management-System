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

  const handleViewCommission = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/Commission/${username}`);
  };
  const handleViewCommissionWithdrawal = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/CommissionWithdrawal/${username}`);
  };
  const handleInsuranceAccount = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/InsuranceAccount/${username}`);
  };
  const handleViewPolicyPayment = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/PolicyPayment/${username}`);
  };
  const handleViewPolicyClaim = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/PolicyClaim/${username}`);
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/Profile/${username}`);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/ChangePassword/${username}`);
  };
  const handleAgentDashboard = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/${username}`);
  };

  const handleViewWithdrawAmount = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/WithdrawAmount/${username}`);
  };
  const handleViewCustomer = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/ViewCustomer/${username}`);
  };
  const handleMarketing = (e) => {
    e.preventDefault();
    navigate(`/AgentDashboard/Marketing/${username}`);
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
        <Navbar.Brand onClick={handleAgentDashboard}>
        <h2 style={{fontFamily:"italic",}}>Life-Insurance</h2>        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleAgentDashboard}>Agent Dashboard</Nav.Link>

            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleChangePassword}>
                Change Password
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleMarketing}>Marketing</Nav.Link>
            <NavDropdown title="Insurance" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewCustomer}>
                View Customer
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
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewCommission}>
                View Commission
              </NavDropdown.Item>

              <NavDropdown.Item onClick={handleViewCommissionWithdrawal}>
                Withdraw Amount
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewWithdrawAmount}>
                View Commission Withdrawal
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
