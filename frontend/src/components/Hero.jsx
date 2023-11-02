import { Carousel, Image } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
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
            <p>Single-use takeout containers and food wrappers account for up to one-third of the debris found on Hawai’i’s shorelines!! Offering  a reusable 
              takeout container system helps to address this issue (and many others) while also cultivating circular and zero waste economies.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/6dc3146b-c896-4165-96e4-0e31ad3df49e/Copy+of+_DSC3598.jpg" />
          <Carousel.Caption>
            <h3><strong>Reusable Containers You Can Rent</strong></h3>
            <p>
            We offer 5 different reusable take out container options, 2 different reusable plate options, and 3 different reusable cutlery options for event 
            organizers looking to 
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Hero;
