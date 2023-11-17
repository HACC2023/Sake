import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MiniInfo from "../components/MiniInfo";
import Mission from "../components/Mission";

const Home = () => {
  return (
    <>
      <Hero />
      <Mission />
      {/* <MiniInfo
        imgUrl={
          "https://images.squarespace-cdn.com/content/v1/607912e0b05e0b4b67ab64d8/c11c7c79-d837-4f0c-930f-91394e91a9cb/Copy+of+_DSC5895.jpg?format=2500w"
        }
        headingText={"Reusable container you can rent"}
        desc={
          "We offer 5 different reusable take out container options, 2 different reusable plate options, and 3 different reusable cutlery options for event organizers looking to"
        }
        btnText={"view container options"}
      /> */}
      <Footer />
    </>
  );
};

export default Home;
