import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" bg="light" sticky="top">
        <Container>
          <Navbar.Brand
            href="/"
            className="text-uppercase fw-bold text-success fs-3"
          >
            Zero Waste Campaign
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-semibold fs-5">
              <Nav.Link href="/signin">
                <FaSignInAlt /> Sign In
              </Nav.Link>
              <Nav.Link href="/signup">
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
