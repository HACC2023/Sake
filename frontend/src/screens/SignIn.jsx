import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  useAdminLoginMutation,
  useVendorLoginMutation,
  useUserLoginMutation,
} from "../slices/adminApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ROLES = ["admin", "vendor", "user"];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminLogin, { isLoading: isLoadingAdminLogin }] =
    useAdminLoginMutation();
  const [vendorLogin, { isLoading: isLoadingVendorLogin }] =
    useVendorLoginMutation();
  const [userLogin, { isLoading: isLoadingUserLogin }] = useUserLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(`/${userInfo.role}`);
    }
  }, [navigate, userInfo]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      if (role === "admin") {
        const res = await adminLogin({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      }
      if (role === "vendor") {
        const res = await vendorLogin({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      }
      if (role === "user") {
        const res = await userLogin({ phone, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      }
      navigate(`/${role}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>

      <ButtonGroup className="my-4">
        {ROLES.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-dark"}
            name="radio"
            value={radio}
            checked={role === radio}
            onChange={e => setRole(e.currentTarget.value)}
          >
            {radio}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Form onSubmit={submitHandler}>
        {role === "user" ? (
          <Form.Group className="my-2" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
        ) : (
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        )}
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
          {isLoadingAdminLogin || isLoadingVendorLogin || isLoadingUserLogin ? (
            <Loader />
          ) : (
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          )}
        </div>
        {role === "user" && (
          <Row className="py-3 text-center">
            <Col>
              New {role}? <Link to="/signup">Register</Link>
            </Col>
          </Row>
        )}
      </Form>
    </FormContainer>
  );
};

export default SignIn;
