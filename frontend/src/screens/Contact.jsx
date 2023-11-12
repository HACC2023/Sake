import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const Contact = () => {
  const contactContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "20px",
    borderRadius: "50px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    width: "60%",
    maxWidth: "100%",
  };

  const rowStyle = {
    marginBottom: "20px",
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538445058110-AJF7QG8H62P9UUZBIM89/OahuBeach_Above-2.jpg?format=2500w"
        alt="Banner"
        style={{ width: "100%", height: "100%" }}
      />

      <div style={contactContainerStyle}>
        <Container>
          <Row style={rowStyle}>
            <Col className="text-center">
              <h2>Contact Us</h2>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col>
              <h3>Email</h3>
              <p>oahu.zerowaste@gmail.com</p>
              <p>info@fullcycletakeout.org</p>
            </Col>
            <Col md={6}>
              <h3>Instagram</h3>
              <p>@FullCycleTakeout</p>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col>
              <h3>Form</h3>
              <p>
                Alternatively, you use the following link below and fill out a
                form to address any inquiries.
              </p>
              <p>
                <a
                  href="https://www.fullcycletakeouthawaii.org/get-in-touch"
                  target="_blank"
                >
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
