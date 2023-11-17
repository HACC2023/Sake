import { Container } from "react-bootstrap";

const Mission = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Container className="pt-4 pb-2" style={{ color: "#007398" }}>
        <h1 style={{ color: "#007398" }}>The Mission</h1>
        <p className="fs-5">
          Our MISSION is to provide zero waste education, resources, and
          programs to build an ethical & responsible consumer culture.
        </p>
        <p className="fs-5">Our VISION is an island community where waste no longer exists.</p>
      </Container>
    </div>
  );
};

export default Mission;
