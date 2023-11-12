import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useAdminGetContainersQuery } from "../slices/adminApiSlice";
import { useVendorGetVendorsQuery } from "../slices/adminApiSlice";

const Admin = () => {
  const [containersInStock, setContainersInStock] = useState({
    small: 30,
    medium: 25,
    large: 20,
  });

  const {
    data: containers,
    isLoading: containersLoading,
    isError: containersError,
  } = useAdminGetContainersQuery();

  const {
    data: vendors,
    isLoading: vendorsLoading,
    isError: vendorsError,
  } = useVendorGetVendorsQuery();

  const [containersAssigned, setContainersAssigned] = useState([
    {
      id: 1,
      vendorName: "The Red Fish",
      phoneNumber: "123-456-7890",
      location: "Left Wing",
      smallContainers: 5,
      mediumContainers: 3,
      largeContainers: 2,
    },
    {
      id: 2,
      vendorName: "The Blue Fish",
      phoneNumber: "987-654-3210",
      location: "Right Wing",
      smallContainers: 3,
      mediumContainers: 2,
      largeContainers: 1,
    },
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const [showCreateVendorModal, setShowCreateVendorModal] = useState(false);
  const [showRemoveVendorModal, setShowRemoveVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleShowRemoveVendorModal = vendor => {
    setSelectedVendor(vendor);
    setShowRemoveVendorModal(true);
  };
  const handleCloseRemoveVendorModal = () => setShowRemoveVendorModal(false);
  const handleShowCreateVendorModal = () => setShowCreateVendorModal(true);
  const handleCloseCreateVendorModal = () => setShowCreateVendorModal(false);

  const handleRemoveVendor = () => {
    // needs function to actually remove
    setContainersAssigned(prevVendors =>
      prevVendors.filter(vendor => vendor.id !== selectedVendor.id)
    );
    handleCloseRemoveVendorModal();
  };

  const handleCreateVendorAccount = () => {
    // account creation
    handleCloseCreateVendorModal();
  };

  const handleAssignContainer = () => {
    handleCloseAssignModal();
  };

  const handleRemoveContainer = () => {
    handleCloseRemoveModal();
  };

  const filteredVendors = containersAssigned.filter(
    vendor =>
      vendor.vendorName.includes(searchQuery) ||
      vendor.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="px-5" style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Admin Portal</h1>
      <div className="py-3">
        <Button variant="primary" onClick={handleShowAssignModal}>
          Assign Container
        </Button>
        <Button
          variant="danger"
          style={{ margin: "0 30px" }}
          onClick={handleShowRemoveModal}
        >
          Remove Container
        </Button>
        <Button variant="success" onClick={handleShowCreateVendorModal}>
          Create Vendor Account
        </Button>
      </div>
      {/* Assign Container Modal */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vendorNameAssign">
              <Form.Label>Vendor Name:</Form.Label>
              <Form.Control as="select">
                <option>Select a Vendor</option>
                {vendors?.map(vendor => (
                  <option key={vendor._id} value={vendor.name}>
                    {vendor.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="numContainersAssign">
              <Form.Label>Number of Containers to Assign:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Enter number of containers"
              />
            </Form.Group>
            <Form.Group controlId="containerTypeAssign">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control as="select">
                <option>Select Container Type</option>
                {containers?.map(container => (
                  <option key={container._id} value={container.category}>
                    {container.category}
                  </option>
                ))}
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

      {/* Remove Vendor Modal */}
      <Modal show={showRemoveVendorModal} onHide={handleCloseRemoveVendorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <p>Are you sure you want to remove {selectedVendor.vendorName}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRemoveVendorModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveVendor}>
            Confirm
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
              <Form.Control as="select">
                <option>Select a Vendor</option>
                {vendors?.map(vendor => (
                  <option key={vendor._id} value={vendor.name}>
                    {vendor.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="numContainersRemove">
              <Form.Label>Number of Containers to Remove:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Enter number of containers"
              />
            </Form.Group>
            <Form.Group controlId="containerTypeRemove">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control as="select">
                <option>Select Container Type</option>
                {containers?.map(container => (
                  <option key={container._id} value={container.category}>
                    {container.category}
                  </option>
                ))}
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

      {/* Create Vendor Account Modal */}
      <Modal show={showCreateVendorModal} onHide={handleCloseCreateVendorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vendor Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="vendorNameCreate">
              <Form.Label>Vendor Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter vendor name" />
            </Form.Group>
            <Form.Group controlId="vendorEmailCreate">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="vendorPhoneCreate">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group controlId="vendorPasswordCreate">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group controlId="vendorConfirmPasswordCreate">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateVendorModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateVendorAccount}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mt-2 mb-4">
        <h5 className="mb-3">Containers In Stock:</h5>
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
      </div>
      <div>
        {/* Containers Assigned to Vendors Table */}
        <h5>Containers Assigned to Vendors:</h5>

        {/* search bar */}
        <input
          type="text"
          placeholder="Name/Number"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mt-2 mb-4"
        />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Small Containers</th>
              <th>Medium Containers</th>
              <th>Large Containers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.vendorName}</td>
                <td>{vendor.phoneNumber}</td>
                <td>{vendor.location}</td>
                <td>{vendor.smallContainers}</td>
                <td>{vendor.mediumContainers}</td>
                <td>{vendor.largeContainers}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShowRemoveVendorModal(vendor)}
                  >
                    Remove Vendor
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
