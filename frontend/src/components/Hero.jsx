import { Carousel, Image, Container } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  const carouselCaptionContainer = {
    padding: "10px 15px",
    backgroundColor: "rgba(85,86,90,0.4)",
  };
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src="https://www.honolulumagazine.com/content/uploads/2021/08/m/h/full-cycle-takeout-photo-by-erik-kabik.jpg" />
          <Carousel.Caption>
            <div style={{ ...carouselCaptionContainer }}>
              <h3 style={{ fontSize: "50px" }}>
                <strong>Oahu Zero Waste</strong>
              </h3>
              <p style={{ fontSize: "20px" }}>
                Hawai’i’s first reusable takeout container program.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/4ff8fbd2-f26d-4bfd-83b3-7d009d55b699/Copy+of+IMG_8365.JPG" />
          <Carousel.Caption>
            <div style={{ ...carouselCaptionContainer }}>
              <h3 style={{ fontSize: "50px" }}>
                <strong>Our environment is our responsibility.</strong>
              </h3>
              <p style={{ fontSize: "20px" }}>
                Single-use takeout containers and food wrappers account for up
                to one-third of the debris found on Hawai’i’s shorelines!!
                Offering a reusable takeout container system helps to address
                this issue (and many others) while also cultivating circular and
                zero waste economies.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/6dc3146b-c896-4165-96e4-0e31ad3df49e/Copy+of+_DSC3598.jpg" />
          <Carousel.Caption>
            <div style={{ ...carouselCaptionContainer }}>
              <h3 style={{ fontSize: "50px" }}>
                <strong>Reusable Containers You Can Rent</strong>
              </h3>
              <p style={{ fontSize: "20px" }}>
                We offer 5 different reusable takeout container options, 2
                different reusable plate options, and 3 different reusable
                cutlery options for event organizers.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
