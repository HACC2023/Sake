import React from "react";
import { Carousel, Image, Container } from "react-bootstrap";
import Footer from "../components/Footer";

const textShadowStyle = {
  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  color: 'white',
};

const Hero = () => {
  document.body.style.backgroundColor = "#212529";
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src="https://www.honolulumagazine.com/content/uploads/2021/08/m/h/full-cycle-takeout-photo-by-erik-kabik.jpg" />
          <Carousel.Caption>
            <h3 style={{ ...textShadowStyle, fontSize: '100px' }}>
              <strong>Oahu Zero Waste</strong>
            </h3>
            <p style={{ ...textShadowStyle, fontSize: '30px' }}>
              Hawai’i’s first reusable takeout container program.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/4ff8fbd2-f26d-4bfd-83b3-7d009d55b699/Copy+of+IMG_8365.JPG" />
          <Carousel.Caption>
            <h3 style={{ ...textShadowStyle, fontSize: '50px' }}>
              <strong>Our environment is our responsibility.</strong>
            </h3>
            <p style={{ ...textShadowStyle, fontSize: '20px' }}>
              Single-use takeout containers and food wrappers account for up to
              one-third of the debris found on Hawai’i’s shorelines!! Offering a
              reusable takeout container system helps to address this issue (and
              many others) while also cultivating circular and zero waste
              economies.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/6dc3146b-c896-4165-96e4-0e31ad3df49e/Copy+of+_DSC3598.jpg" />
          <Carousel.Caption>
            <h3 style={{ ...textShadowStyle, fontSize: '50px' }}>
              <strong>Reusable Containers You Can Rent</strong>
            </h3>
            <p style={{ ...textShadowStyle, fontSize: '20px' }}>
              We offer 5 different reusable takeout container options, 2
              different reusable plate options, and 3 different reusable cutlery
              options for event organizers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* The Mission Statement */}
      <div
        style={{
          backgroundColor: "#2F5C86",
          padding: "20px",
          textAlign: "center",
          borderRadius: "100px",
        }}
      >
        <Container>
          <h2 style={{ ...textShadowStyle, color: '#8CB890' }}>The Mission</h2>
          <p style={{ ...textShadowStyle, color: 'white', fontSize: '18px' }}>
            Our MISSION is to provide zero waste education, resources, and programs to build an ethical & responsible consumer culture.
          </p>
          <p style={{ ...textShadowStyle, color: 'white', fontSize: '18px' }}>
            Our VISION is an island community where waste no longer exists.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
