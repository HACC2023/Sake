import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const User = () => {
  const [containersOwned, setContainersOwned] = useState(3);
  const [currentBalance, setCurrentBalance] = useState(50);
  const [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  const [showPayBalanceModal, setShowPayBalanceModal] = useState(false);

  const handleGenerateCode = () => {
    const randomCode = Math.random().toString(36).substr(2, 5); // Generates a random 5-character code
    alert(`Generated Code: ${randomCode}`);
  };

  const handleShowGenerateCodeModal = () => setShowGenerateCodeModal(true);
  const handleCloseGenerateCodeModal = () => setShowGenerateCodeModal(false);

  const handleShowPayBalanceModal = () => setShowPayBalanceModal(true);
  const handleClosePayBalanceModal = () => setShowPayBalanceModal(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Portal</h1>
      <p>Containers Owned: {containersOwned}</p>
      <p>Current Balance: ${currentBalance}</p>
      <button style={{ marginRight: '10px' }} onClick={handleShowGenerateCodeModal}>
        Generate Code
      </button>
      <button onClick={handleShowPayBalanceModal}>
        Pay Balance
      </button>

      {/* checkout button */} 
      <Modal show={showGenerateCodeModal} onHide={handleCloseGenerateCodeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Generated Code: <strong>{Math.random().toString(36).substr(2, 5)}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseGenerateCodeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* pay dues */}
      <Modal show={showPayBalanceModal} onHide={handleClosePayBalanceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content for paying balance */}
          <p>Current Balance: ${currentBalance}</p>
          {/* Add payment form or method */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayBalanceModal}>
            Close
          </Button>
          <Button variant="primary" >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
