import { Carousel, Image } from "react-bootstrap";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/4c6450ee-ff33-4940-b819-a359a38ecf69/Copy+of+_DSC4440.jpg" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/4ff8fbd2-f26d-4bfd-83b3-7d009d55b699/Copy+of+IMG_8365.JPG" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/6dc3146b-c896-4165-96e4-0e31ad3df49e/Copy+of+_DSC3598.jpg" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Hero;
