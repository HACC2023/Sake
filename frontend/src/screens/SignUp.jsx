import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp() {
  const [isVendor, setIsVendor] = useState(true);

  const toggleSignUpMode = () => {
    setIsVendor(!isVendor);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sign Up</h1>
      <div>
        <Button onClick={toggleSignUpMode} variant="outline-primary">
          {isVendor ? 'Switch to Customer' : 'Switch to Vendor'}
        </Button>
      </div>
      <h3>{isVendor ? 'Vendor Sign Up' : 'Customer Sign Up'}</h3>
      <Form style={{ width: '300px', margin: 'auto' }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>{isVendor ? 'Enter your email address' : 'Enter your phone number'}</Form.Label>
          <Form.Control type={isVendor ? 'email' : 'tel'} placeholder={isVendor ? 'Enter email' : 'Enter phone number'} />
          <Form.Text className="text-muted">
            {isVendor ? 'We\'ll never share your email with anyone else.' : 'We\'ll never share your phone number with anyone else.'}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Enter a Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Passwords must be 6+ characters in length and include a capital letter.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Please Type the Password you entered previously." />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
