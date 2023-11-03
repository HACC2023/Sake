import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignIn() {
  const [isVendor, setIsVendor] = useState(true);

  const toggleSignInMode = () => { {/*separated by whether they are a vendor or not*/}
    setIsVendor(!isVendor);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sign In</h1>
      <div>
        <Button onClick={toggleSignInMode} variant="outline-primary">
          {isVendor ? 'Switch to Customer' : 'Switch to Vendor'}  
        </Button>
      </div>
      <h3>{isVendor ? 'Vendor Sign In' : 'Customer Sign In'}</h3>
      <Form style={{ width: '300px', margin: 'auto' }}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>{isVendor ? 'Email address' : 'Phone Number'}</Form.Label>
          <Form.Control type={isVendor ? 'email' : 'tel'} placeholder={isVendor ? 'Enter email' : 'Enter phone number'} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
