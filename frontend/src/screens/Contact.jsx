import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const Contact = () => {
  const contactContainerStyle = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Adjust the background color and opacity as needed
    padding: "20px",
    borderRadius: "50px", // Set borderRadius to 0 to remove rounded corners
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    width: "60%", // Adjust the width as needed
    maxWidth: "100%", // Ensure the container doesn't exceed the image width
  };

  const rowStyle = {
    marginBottom: "20px", // Adjust the margin bottom as needed
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538445058110-AJF7QG8H62P9UUZBIM89/OahuBeach_Above-2.jpg?format=2500w"
        alt="Banner"
        style={{ width: "100%", height: "auto" }}
      />

      {/* Contact details with grey background */}
      <div style={contactContainerStyle}>
        <Container>
          <Row style={rowStyle}>
            <Col>
              <h2>Contact Us</h2>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={6}>
              <h3>Address</h3>
              <p>10 Honolulu St</p>
              <p>Oahu, 96826</p>
            </Col>
            <Col>
              <h3>Email</h3>
              <p>oahu.zerowaste@gmail.com</p>
              <p>info@fullcycletakeout.org</p>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col>
              <h3>Form</h3>
              <p>Alternatively, you use the following link below and fill out a form to address any inquiries.</p>
              <p>
                <a href="https://www.fullcycletakeouthawaii.org/get-in-touch" target="_blank">
                https://www.fullcycletakeouthawaii.org/get-in-touch
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
