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
              organizers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <footer className="bg-dark text-center text-white">
        <div className="container p-4">
          <img src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/fc34a218-d058-4223-8932-50b0d5eaa65f/Clear+Logo+Rectangle+1+%281%29.png" alt="Footer Image" width="300" />
          <section className="mb-4">
            <p>Full Cycle Takeout is a non-profit project created by the team at Zero Waste O’ahu.</p>
            <p>For any inquiries, send an email to: info@fullcycletakeouthawaii.org</p>
            <p>Follow us on Instagram at @FullCycleTakeout or subscribe to our newsletter for the most up to date information.</p>
          </section>
          <section className="">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">About Us</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="https://www.fullcycletakeouthawaii.org/about-us" target="_blank" className="text-white">Click Here</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Rent a Container!</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="https://www.fullcycletakeouthawaii.org/rent-a-container" target="_blank" className="text-white">Click Here</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Contact Us</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="https://www.fullcycletakeouthawaii.org/get-in-touch" target="_blank" className="text-white">Click Here</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">FAQ</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="https://www.fullcycletakeouthawaii.org/faqs" target="_blank" className="text-white">Click Here</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
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
