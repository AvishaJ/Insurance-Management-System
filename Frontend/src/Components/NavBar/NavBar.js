import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import swal from "sweetalert";
import "./NavBar.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import image from "../../images/pngwing.com.png";



function BasicExample() {
  const navigate = new useNavigate();
  const [insuranceType, updateInsuranceType] = useState("");
  useEffect(() => {
    getAllInsuranceTypes();
  }, []);
  const username = useParams().username;
  async function getAllInsuranceTypes() {
    await axios
      .get("http://localhost:8082/api/v1/getAllInsuranceType")
      .then((resp) => {
        console.log(resp.data);
        updateInsuranceType(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const handlePlanClick = (i) => {
    navigate(`/CustomerDashboard/InsuranceScheme/${username}`, { state: i });
  };
  const handleViewFeedback = () => {
    navigate(`/CustomerDashboard/CustomerViewFeedback/${username}`);
  };
  let OptionOfInsuranceTypes;
  if (insuranceType != null) {
    OptionOfInsuranceTypes = Object.values(insuranceType).map((i) => {
      return (
        <NavDropdown.Item
        className="Nav"
          onClick={() => {
            handlePlanClick(i.insuranceType);
          }}
        >
          {i.insuranceType}
        </NavDropdown.Item>
      );
    });
  }
  const handleEnquiry = () => {
    navigate(`/CustomerDashboard/Enquiry/${username}`);
  };
  const handleChangePassword = () => {
    navigate(`/CustomerDashboard/CustomerChangePassword/${username}`);
  };
  const handleViewProfile = () => {
    navigate(`/CustomerDashboard/CustomerProfile/${username}`);
  };
  const handleViewDocuments = () => {
    navigate(`/CustomerDashboard/CustomerDocument/${username}`);
  };
  const handleViewDashboard = () => {
    navigate(`/CustomerDashboard/${username}`);
  };
  const handleInsuranceAccount = () => {
    navigate(`/CustomerDashboard/InsuranceAccount/${username}`);
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

          });
      
    
  };
  return (
    <Navbar className="sticky-top Nav" bg="#AE2CFF" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={handleViewDashboard}>        
        <h2 style={{fontFamily:"italic",}}>Life-Insurance</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleViewDashboard}>Acount</Nav.Link>

            <NavDropdown title="Customer Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleViewProfile}>
                Profile
              </NavDropdown.Item>
              {/* <NavDropdown.Item onClick={handleViewDocuments}>
                Documents
              </NavDropdown.Item> */}
              <NavDropdown.Item onClick={handleChangePassword}>
                Change Password
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Insurance Types" id="basic-nav-dropdown">
              {OptionOfInsuranceTypes}
            </NavDropdown>
            <Nav.Link onClick={handleInsuranceAccount}>
              Insurance Account
            </Nav.Link>
            <NavDropdown title="Queries" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleEnquiry}>
                Enquiry
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleViewFeedback}>
                ViewFeedback
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
