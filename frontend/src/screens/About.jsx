import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const About = () => {
  const containerStyle = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "50px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    width: "60%",
    maxWidth: "100%",
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538445058110-AJF7QG8H62P9UUZBIM89/OahuBeach_Above-2.jpg?format=2500w"
        alt="Banner"
        style={{ width: "100%", height: "auto" }}
      />
      <div style={containerStyle}>
        <Container>
          <Row>
            <Col sm={12} md={6} className="text-center">
              <h2>What We Do</h2>
              <p>
                ZWO is building a healthier future, with a balanced consumer
                culture and less waste, through a system of proactive
                interventions in our current production methods, purchasing
                practices and waste management systems. We work in the following
                ways:
              </p>
              <ul>
                <li>Design and pilot zero waste projects that can be scaled appropriately</li>
                <li>Conduct waste audits to inform targeted waste reduction methods to businesses and office spaces</li>
                <li>Create and support dynamic policy at the state and county level</li>
              </ul>
            </Col>
            <Col sm={12} md={6} className="text-center">
              <h2>Who We Are</h2>
              <p>
                Zero Waste O‘ahu is made up of a connected group of individuals
                and organizations with a passion for making Hawai‘i a healthier,
                sustainable island community.
              </p>
              <img
                src="https://images.squarespace-cdn.com/content/5bb2972af4755a2a5eca6b7c/1540860471183-ZBG0HOFDE5OC16PM0JQ4/ZWO_Logo_DarkerLetters.png?content-type=image%2Fpng"
                alt="Logo"
                style={{ width: "200px", height: "auto", marginTop: "1px" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default About;
