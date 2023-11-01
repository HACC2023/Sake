import { Container, Navbar, Nav } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css"

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" bg="light" sticky="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              className="text-uppercase fw-bold fs-3"
            >
              Zero Waste Campaign
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-semibold fs-5">
              <LinkContainer to="/signin">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
