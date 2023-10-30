import { Container, Navbar, Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-info-subtle">
        <Container>
          <Navbar.Brand href="#home" className="text-uppercase fw-bold text-success fs-3">Zero Waste Campaign</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto fw-semibold fs-5">
              <Nav.Link href="#home">Sign In</Nav.Link>
              <Nav.Link href="#link">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
