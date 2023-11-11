import React from 'react';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import "./Hero.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const MissionStatement = ({ missionInfo }) => {
  const { imageLeft, textLeft, textRight, imageRight } = missionInfo;

  return (
    <div className="mission-statement" style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <img src={imageLeft} alt="Mission Image" className="img-fluid rounded" />
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center">
          <p>{textLeft}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="d-flex align-items-center">
          <p>{textRight}</p>
        </Col>
        <Col xs={12} md={6}>
          <img src={imageRight} alt="Mission Image" className="img-fluid rounded"/>
        </Col>
      </Row>
    </div>
  );
};

const Hero = () => {
  const missionInfo = { //change these :)
    imageLeft: "https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538444384034-UGMO3BZGNT2T3B3XZ32H/image-asset.jpeg?format=2500w",
    textLeft: "mission right",
    textRight: "mission left",
    imageRight: "https://images.squarespace-cdn.com/content/v1/5bb2972af4755a2a5eca6b7c/1538444546860-E43Z4UNIMW9W689DLMZZ/image-asset.jpeg?format=2500w",
  };

  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src="https://www.honolulumagazine.com/content/uploads/2021/08/m/h/full-cycle-takeout-photo-by-erik-kabik.jpg" />
          <Carousel.Caption>
            <h3><strong>Oahu Zero Waste</strong></h3>
            <p>Hawai’i’s first reusable takeout container program.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/4ff8fbd2-f26d-4bfd-83b3-7d009d55b699/Copy+of+IMG_8365.JPG" />
          <Carousel.Caption>
            <h3><strong>Our environment is our responsibility.</strong></h3>
            <p>Single-use takeout containers and food wrappers account for up to one-third of the debris found on Hawai’i’s shorelines!! Offering a reusable
              takeout container system helps to address this issue (and many others) while also cultivating circular and zero waste economies.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/6dc3146b-c896-4165-96e4-0e31ad3df49e/Copy+of+_DSC3598.jpg" />
          <Carousel.Caption>
            <h3><strong>Reusable Containers You Can Rent</strong></h3>
            <p>
              We offer 5 different reusable takeout container options, 2 different reusable plate options, and 3 different reusable cutlery options for event
              organizers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <MissionStatement missionInfo={missionInfo} />

      <footer className="bg-dark text-center text-white">
        <div className="container p-4">
          <img src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/fc34a218-d058-4223-8932-50b0d5eaa65f/Clear+Logo+Rectangle+1+%281%29.png" alt="Footer Image" width="300" />
          {/* ... existing footer content */}
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023  Copyright:
          <a className="text-white" href="https://www.fullcycletakeouthawaii.org/"> Full Cycle Takeout</a>
        </div>
      </footer>
    </>
  );
};

export default Hero;
