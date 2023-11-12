import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vendor, setVendor] = useState("");

  const submitHandler = async e => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormContainer>
      <h1>Sign Up (User)</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="formGroupVendor">
          <Form.Label>Choose a Vendor</Form.Label>
          <Form.Select aria-label="Click to Show Vendors">
            <option value="1">Big Fish</option>
            <option value="2">Big Meat</option>
            <option value="3">fruit</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="phone">
          <Form.Label>Your Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="text-center">
          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/signin">Sign In</Link>
            </Col>
          </Row>
        </div>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
