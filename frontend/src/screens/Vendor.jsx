import React, { useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const Vendor = () => {
  const [containersGivenOut, setContainersGivenOut] = useState({
    small: 20,
    medium: 15,
    large: 10,
  });
  const [assignedContainers, setAssignedContainers] = useState(5);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRemoveContainersModal, setShowRemoveContainersModal] = useState(false);
  const [customerData, setCustomerData] = useState([
    { id: 1, name: 'Ethan Ray', phoneNumber: '808-381-8135', email: 'eray1@hpu.edu', totalContainers: 2 },
    { id: 2, name: 'John Computer', phoneNumber: '123-456-7890', email: 'johncom@hpu.edu', totalContainers: 7 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleShowRemoveContainersModal = () => setShowRemoveContainersModal(true);
  const handleCloseRemoveContainersModal = () => setShowRemoveContainersModal(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showSeeContainersModal, setShowSeeContainersModal] = useState(false);

  const handleAssignContainer = () => {
    handleCloseAssignModal();


  };

  const handleRemoveContainer = () => {
    handleCloseRemoveModal();


  };

  const handleSeeContainers = (customerId) => {
    const customer = customerData.find((c) => c.id === customerId);
    setSelectedCustomer(customer);
    setShowSeeContainersModal(true);
  };

  const handleCloseSeeContainersModal = () => setShowSeeContainersModal(false);

  const handleRemoveContainers = (customerId) => {
    console.log(`Remove Containers for customer ${customerId}`);
    setShowRemoveContainersModal(true);
  };

  const filteredCustomers = customerData.filter((customer) =>
    customer.phoneNumber.includes(searchQuery)
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Vendor Portal</h1>

      <Button variant="primary" style={{ margin: '10px' }} onClick={handleShowAssignModal}>
        Assign Container
      </Button>
      <Button variant="danger" style={{ margin: '10px' }} onClick={handleShowRemoveModal}>
        Remove Container
      </Button>

    {/* See Containers Modal */}
    <Modal show={showSeeContainersModal} onHide={handleCloseSeeContainersModal}>
        <Modal.Header closeButton>
          <Modal.Title>Containers Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <div>
              <p>Customer: {selectedCustomer.name}</p>
              <p>Small Containers: {selectedCustomer.smallContainers}</p>  {/* ideally these values are queried from our database? */}
              <p>Medium Containers: {selectedCustomer.mediumContainers}</p>
              <p>Large Containers: {selectedCustomer.largeContainers}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSeeContainersModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Assign Container Modal */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="customerId">
              <Form.Label>Customer Phone Number:</Form.Label>
              <Form.Control type="text" placeholder="Enter customer phone number" />
            </Form.Group>
            <Form.Group controlId="numContainersAssign">
              <Form.Label>Number of Containers to Assign:</Form.Label>
              <Form.Control type="number" min="1" placeholder="Enter number of containers" />
            </Form.Group>
            <Form.Group controlId="containerType">
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
            <Form.Group controlId="customerIdRemove">
              <Form.Label>Customer Phone Number:</Form.Label>
              <Form.Control type="text" placeholder="Enter customer phone number" />
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

      {/* Remove Containers Modal */}
      <Modal show={showRemoveContainersModal} onHide={handleCloseRemoveContainersModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="customerIdRemove">
              <Form.Label>Customer Phone Number:</Form.Label>
              <Form.Control type="text" placeholder="Enter customer phone number" />
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
          <Button variant="secondary" onClick={handleCloseRemoveContainersModal}>
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
          {Object.entries(containersGivenOut).map(([type, quantity]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* search bar */}
      <input
        type="text"
        placeholder="Search by Phone Number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p>Containers Assigned:</p>
      {/* Assigned Containers Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Total Containers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.email}</td>
              <td>{customer.totalContainers}</td>
              <td>
                <Button variant="primary" onClick={() => handleSeeContainers(customer.id)}>
                  See Containers
                </Button>{' '}
                <Button variant="danger" onClick={() => handleRemoveContainers(customer.id)}>
                  Remove Containers
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Vendor;
