import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useVendorGetVendorsQuery } from "../slices/adminApiSlice";
import { useUserRegisterMutation } from "../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vendor, setVendor] = useState("");

  const { data, isLoading, isError, refetch } = useVendorGetVendorsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.auth);

  const [userRegister, { isLoading: registerLoading }] =
    useUserRegisterMutation();

  useEffect(() => {
    if (userInfo) navigate(`/${userInfo.role}`);
  }, [navigate, userInfo]);

  useEffect(() => {
    const pollingInterval = setInterval(() => refetch(), 5000);
    return () => clearInterval(pollingInterval);
  }, [refetch]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await userRegister({
        vendorName: vendor,
        name,
        phone,
        password,
      }).unwrap();
      toast.success("Signed up successfully");
      dispatch(setCredentials({ ...res }));
      navigate("/user");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up (User)</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="formGroupVendor">
          <Form.Label>Choose a Vendor</Form.Label>
          <Form.Select
            aria-label="Click to Show Vendors"
            onChange={e => setVendor(e.target.value)}
          >
            <option value="">Select a Vendor</option>
            {isLoading ? (
              <option>LOADING...</option>
            ) : (
              data?.map(vendor => (
                <option key={vendor._id} value={`${vendor.name}`}>
                  {vendor.name}
                </option>
              ))
            )}
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
          {registerLoading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              disabled={isError}
            >
              Register
            </Button>
          )}

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
