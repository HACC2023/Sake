import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const User = () => {
  const [containersOwned, setContainersOwned] = useState(3);
  const [currentBalance, setCurrentBalance] = useState(50);
  const [currentReturned, setCurrentReturned] = useState(10);
  const [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  const [showPayBalanceModal, setShowPayBalanceModal] = useState(false);
  const [userContainers, setUserContainers] = useState([
    { type: "small", quantity: 2 },
    { type: "medium", quantity: 1 },
  ]);

  const handleGenerateCode = () => {
    const randomCode = Math.random().toString(36).substr(2, 5);
    alert(`Generated Code: ${randomCode}`);
  };

  const handleShowGenerateCodeModal = () => setShowGenerateCodeModal(true);
  const handleCloseGenerateCodeModal = () => setShowGenerateCodeModal(false);

  const handleShowPayBalanceModal = () => setShowPayBalanceModal(true);
  const handleClosePayBalanceModal = () => setShowPayBalanceModal(false);

  const handlePayNow = () => {
    // Handle payment logic here
    alert("Payment successful!");
    handleClosePayBalanceModal();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>User Portal</h1>
      <p>Containers Owned: {containersOwned}</p>
      <p>Current Balance: ${currentBalance}</p>
      <p>Total Containers Returned: ${currentReturned}</p>
      <p>Containers Owned:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Container Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {userContainers.map((container, index) => (
            <tr key={index}>
              <td>{container.type}</td>
              <td>{container.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    
      <button onClick={handleShowPayBalanceModal}>Pay Balance</button>

      {/* pay dues */}
      <Modal show={showPayBalanceModal} onHide={handleClosePayBalanceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current Balance: ${currentBalance}</p>
          <Form>
            <Form.Group controlId="cardNumber">
              <Form.Label>Credit Card Number:</Form.Label>
              <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>
            <Form.Group controlId="expirationDate">
              <Form.Label>Expiration Date:</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" />
            </Form.Group>
            <Form.Group controlId="cvv">
              <Form.Label>CVV:</Form.Label>
              <Form.Control type="text" placeholder="Enter CVV" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayBalanceModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayNow}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
