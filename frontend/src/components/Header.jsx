import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <header>
      <Navbar bg="light" sticky="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-uppercase fw-bold fs-3">
              Zero Waste Campaign
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link onClick={handleOffcanvasToggle}>
                <span className="burger-icon">&#9776;</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        placement="end"
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Site Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <LinkContainer to="/contact">
            <Nav.Link className="offcanvas-content">
              <FaSignOutAlt /> Contact
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link className="offcanvas-content">
              <FaSignOutAlt /> About Us
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signin">
            <Nav.Link className="offcanvas-content">
              <FaSignInAlt /> Sign In
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link className="offcanvas-content">
              <FaSignOutAlt /> Sign Up
            </Nav.Link>
          </LinkContainer>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
