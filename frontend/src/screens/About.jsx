import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      {/* Banner Image */}
      <img
        src="https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538445058110-AJF7QG8H62P9UUZBIM89/OahuBeach_Above-2.jpg?format=2500w"
        alt="Banner"
        style={{ width: '100%', height: 400 }}//feel free to change these values to adjust resolution
      />

      {/* two different sections, what we do and who we are. I copy and pasted text from their website but its all kinda incomplete */}
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col md={6} className="text-center">
            <h2>What We Do</h2>
            <p>
            ZWO is building a healthier future, with a balanced consumer culture and less waste, through a system of proactive interventions in our current production methods, purchasing practices and waste management systems.   We work in the following ways:
            </p>
          </Col>
          <Col md={6} className="text-center">
            <h2>Who We Are</h2>
            <p>
            Zero Waste O‘ahu is made up of a connected group of individuals and organizations with a passion for making Hawai‘i a healthier, sustainable island community.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;