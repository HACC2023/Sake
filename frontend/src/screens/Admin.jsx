import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Admin = () => {
  const [containersGivenOut] = useState(10);
  const [assignedContainers, setAssignedContainers] = useState(5);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Portal</h1>
      <p>Containers Given Out: {containersGivenOut}</p>
      <p>Assigned Containers: {assignedContainers}</p>
      <button style={{ marginRight: '10px' }} onClick={handleShowAssignModal}>
        Assign Container
      </button>
      <button onClick={handleShowRemoveModal}>
        Remove Container
      </button>

      {/* add container */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

      {/* remove container */}

      <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
