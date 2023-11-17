const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white h-auto">
      <div className="container p-4">
        <img
          src="https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/fc34a218-d058-4223-8932-50b0d5eaa65f/Clear+Logo+Rectangle+1+%281%29.png"
          alt="Footer Image"
          width="300"
        />
        <section className="mb-4">
          <p>
            Full Cycle Takeout is a non-profit project created by the team at
            Zero Waste O’ahu.
          </p>
          <p>
            For any inquiries, send an email to: info@fullcycletakeouthawaii.org
          </p>
          <p>
            Follow us on Instagram at @FullCycleTakeout or subscribe to our
            newsletter for the most up to date information.
          </p>
        </section>
        <section>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">About Us</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.fullcycletakeouthawaii.org/about-us"
                    target="_blank"
                    className="text-white"
                  >
                    Click Here
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Rent a Container!</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.fullcycletakeouthawaii.org/rent-a-container"
                    target="_blank"
                    className="text-white"
                  >
                    Click Here
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact Us</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.fullcycletakeouthawaii.org/get-in-touch"
                    target="_blank"
                    className="text-white"
                  >
                    Click Here
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">FAQ</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.fullcycletakeouthawaii.org/faqs"
                    target="_blank"
                    className="text-white"
                  >
                    Click Here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a
          className="text-white"
          href="https://www.fullcycletakeouthawaii.org/"
        >
          {" "}
          Full Cycle Takeout
        </a>
      </div>
    </footer>
  );
};

export default Footer;
