import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaAngellist,
  FaMailBulk,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useAdminLogoutMutation,
  useVendorLogoutMutation,
  useUserLogoutMutation,
} from "../slices/adminApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [adminLogout] = useAdminLogoutMutation();
  const [vendorLogout] = useVendorLogoutMutation();
  const [userLogout] = useUserLogoutMutation();

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  useEffect(() => {
    setShowOffcanvas(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      if (userInfo.role === "admin") await adminLogout().unwrap();
      if (userInfo.role === "vendor") await vendorLogout().unwrap();
      if (userInfo.role === "user") await userLogout().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
                <span className="burger-icon fs-1 lh-2">&#9776;</span>
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
          <LinkContainer to="/">
            <Nav.Link className="offcanvas-content">
              <FaHome /> Home
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link className="offcanvas-content">
              <FaAngellist /> About Us
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact">
            <Nav.Link className="offcanvas-content">
              <FaMailBulk /> Contact
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <>
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer
                  to={`/${JSON.parse(localStorage.getItem("userInfo")).role}`}
                >
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <LinkContainer to="/signin">
                <Nav.Link className="offcanvas-content">
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link className="offcanvas-content">
                  <FaSignOutAlt /> Sign Up{" "}
                  <span className="text-muted">(User Only)</span>
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
