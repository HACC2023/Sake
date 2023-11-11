import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const Admin = () => {

  const [containersInStock, setContainersInStock] = useState({
    small: 30,
    medium: 25,
    large: 20,
  });


  const [containersAssigned, setContainersAssigned] = useState([
    { id: 1, vendorName: 'The Red Fish', location: 'Left Wing', smallContainers: 5, mediumContainers: 3, largeContainers: 2 },
    { id: 2, vendorName: 'The Blue Fish', location: 'Right Wing', smallContainers: 3, mediumContainers: 2, largeContainers: 1 },
  ]);

  // State for modals and other UI interactions
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);


  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const handleAssignContainer = () => {

    handleCloseAssignModal();
  };

  const handleRemoveContainer = () => {

    handleCloseRemoveModal();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Portal</h1>

      <Button variant="primary" style={{ margin: '10px' }} onClick={handleShowAssignModal}>
        Assign Container
      </Button>
      <Button variant="danger" style={{ margin: '10px' }} onClick={handleShowRemoveModal}>
        Remove Container
      </Button>

      {/* Assign Container Modal */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vendorNameAssign">
              <Form.Label>Vendor Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter vendor name" />
            </Form.Group>
            <Form.Group controlId="vendorLocationAssign">
              <Form.Label>Location:</Form.Label>
              <Form.Control type="text" placeholder="Enter vendor location" />
            </Form.Group>
            <Form.Group controlId="numContainersAssign">
              <Form.Label>Number of Containers to Assign:</Form.Label>
              <Form.Control type="number" min="1" placeholder="Enter number of containers" />
            </Form.Group>
            <Form.Group controlId="containerTypeAssign">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control as="select">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAssignContainer}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove Container Modal */}
      <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vendorNameRemove">
              <Form.Label>Vendor Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter vendor name" />
            </Form.Group>
            <Form.Group controlId="numContainersRemove">
              <Form.Label>Number of Containers to Remove:</Form.Label>
              <Form.Control type="number" min="1" placeholder="Enter number of containers" />
            </Form.Group>
            <Form.Group controlId="containerTypeRemove">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control as="select">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemoveContainer}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <p>Containers In Stock:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Container Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(containersInStock).map(([type, quantity]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Containers Assigned to Vendors Table */}
      <p>Containers Assigned to Vendors:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Location</th>
            <th>Small Containers</th>
            <th>Medium Containers</th>
            <th>Large Containers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {containersAssigned.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.location}</td>
              <td>{vendor.smallContainers}</td>
              <td>{vendor.mediumContainers}</td>
              <td>{vendor.largeContainers}</td>
              {/* Add buttons or actions for the admin to manage containers assigned to vendors */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
