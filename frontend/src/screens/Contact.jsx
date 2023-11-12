import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  return (
    <div>
      {/* change this to edit the banner, the current one is kinda stretched */}
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538445058110-AJF7QG8H62P9UUZBIM89/OahuBeach_Above-2.jpg?format=2500w"
        alt="Banner"
        style={{ width: "100%", height: 400 }} //feel free to change these values to adjust resolution
      />

      {/*contact details, the row column system is kinda confusing but once you got the hang of it you can figure it out*/}
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <h2>Contact Us</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h3>Address</h3>
            <p>10 Honolulu St</p>
            <p>Oahu, 96826</p>
          </Col>
          <Col md={6}>
            <h3>Phone</h3>
            <p>(123) 456-7890</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Email</h3>
            <p> oahu.zerowaste@gmail.com</p>
            <p> info@fullcycletakeout.org</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
