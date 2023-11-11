import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      className="my-4"
      style={{
        width: "30px",
        height: "30px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};

export default Loader;
