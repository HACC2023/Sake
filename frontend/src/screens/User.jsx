import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useUserProfileQuery } from "../slices/adminApiSlice";

const User = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showPayBalanceModal, setShowPayBalanceModal] = useState(false);

  const handleShowPayBalanceModal = () => setShowPayBalanceModal(true);
  const handleClosePayBalanceModal = () => setShowPayBalanceModal(false);

  const handlePayNow = () => {
    // Handle payment logic here
    alert("Payment successful!");
    handleClosePayBalanceModal();
  };

  const {
    data: userProfile,
    isLoading: userProfileLoading,
    isError: userProfileError,
    refetch: userProfileRefetch,
  } = useUserProfileQuery();

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      await userProfileRefetch();
    }, 5000);
    return () => {
      clearInterval(pollInterval);
    };
  }, [userProfileRefetch]);

  useEffect(() => {
    setCurrentBalance(
      userProfile?.container.reduce(
        (accu, currIndex) =>
          accu +
          (currIndex.checkoutQuan - currIndex.returnQuan) *
            currIndex.containerInfo.cost,
        0
      )
    );
  }, [userProfile]);

  return (
    <div style={{ textAlign: "center", margin: "50px 50px 0" }}>
      <h1>User Portal</h1>
      <p className="fs-5 mb-0">Vendor: {userProfile?.containerVendor?.name}</p>
      <p className="fs-5 mb-0">Vendor phone: {userProfile?.containerVendor?.phone}</p>
      <Table striped bordered hover className="w-75 mx-auto my-4">
        <thead>
          <tr>
            <th>Container Type</th>
            <th>Checked Out</th>
            <th>Returned</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {userProfile?.container.map((container, index) => (
            <tr key={index}>
              <td>{container.containerInfo.category}</td>
              <td>{container.checkoutQuan}</td>
              <td>{container.returnQuan}</td>
              <td>
                ${" "}
                {(container.checkoutQuan - container.returnQuan) *
                  container.containerInfo.cost}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Balance</td>
            <td>
              ${" "}
              {userProfile?.container.reduce(
                (accu, currIndex) =>
                  accu +
                  (currIndex.checkoutQuan - currIndex.returnQuan) *
                    currIndex.containerInfo.cost,
                0
              )}
            </td>
          </tr>
        </tfoot>
      </Table>

      <Button onClick={handleShowPayBalanceModal}>Pay Balance</Button>

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
