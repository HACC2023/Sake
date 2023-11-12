import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useVendorProfileQuery } from "../slices/adminApiSlice";
import { useVendorGetUsersQuery } from "../slices/adminApiSlice";
import { useVendorCheckoutUserMutation } from "../slices/adminApiSlice";
import Loader from "../components/Loader";

const Vendor = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRemoveContainersModal, setShowRemoveContainersModal] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutUser, setCheckoutUser] = useState("");
  const [checkoutContainer, setCheckoutContainer] = useState("");
  const [checkoutQuantity, setCheckoutQuantity] = useState("");
  const [returnUser, setReturnUser] = useState("");
  const [returnContainer, setReturnContainer] = useState("");
  const [returnQuantity, setReturnQuantity] = useState("");

  const {
    data: vendorProfile,
    isLoading: vendorProfileLoading,
    isError: vendorProfileError,
    refetch: vendorProfileRefetch,
  } = useVendorProfileQuery();

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    refetch: usersRefetch,
  } = useVendorGetUsersQuery();

  const [vendorCheckoutUser, { isLoading: vendorCheckoutUserLoading }] =
    useVendorCheckoutUserMutation();

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      await vendorProfileRefetch();
      await usersRefetch();
    }, 5000);
    return () => {
      clearInterval(pollInterval);
    };
  }, [vendorProfileRefetch, usersRefetch]);

  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleShowRemoveContainersModal = () =>
    setShowRemoveContainersModal(true);
  const handleCloseRemoveContainersModal = () =>
    setShowRemoveContainersModal(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showSeeContainersModal, setShowSeeContainersModal] = useState(false);

  const handleAssignContainer = async () => {
    try {
      await adminUpdateVendorInventory({
        data: {
          containerName: updateContainer,
          quantity: updateQuantity,
        },
        name: updateVendor,
      }).unwrap();
      toast.success("Container assigned to vendor successfully");
      handleCloseAssignModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleRemoveContainer = async () => {
    try {
      await adminRemoveVendorInventory({
        data: {
          containerName: removeContainer,
          quantity: removeQuantity,
        },
        name: removeVendor,
      }).unwrap();
      toast.success("Container removed successfully");
      handleCloseRemoveModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSeeContainers = phone => {
    const user = users?.find(c => c.phone === phone);
    console.log(user);
    setSelectedCustomer(user);
    setShowSeeContainersModal(true);
  };

  const handleCloseSeeContainersModal = () => setShowSeeContainersModal(false);

  const handleRemoveContainers = customerId => {
    console.log(`Remove Containers for customer ${customerId}`);
    setShowRemoveContainersModal(true);
  };

  const filteredUsers = users?.filter(
    user =>
      user.phone.includes(searchQuery) ||
      user.name.toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }} className="px-5">
      <h1>Vendor Portal</h1>
      <div className="d-flex justify-content-center py-3">
        <Button
          variant="primary"
          style={{ marginRight: "30px" }}
          onClick={handleShowAssignModal}
        >
          Assign Container
        </Button>
        <Button variant="danger" onClick={handleShowRemoveModal}>
          Remove Container
        </Button>
      </div>
      {/* See Containers Modal */}
      <Modal
        show={showSeeContainersModal}
        onHide={handleCloseSeeContainersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Containers Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <div>
              <p>Customer: {selectedCustomer.name}</p>
              <div>
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th>Container Type</th>
                      <th>Check Out</th>
                      <th>Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer?.container?.map(item => (
                      <tr key={item._id}>
                        <td>{item.containerInfo.category}</td>
                        <td>{item.checkoutQuan}</td>
                        <td>{item.returnQuan}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
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
              <Form.Control
                type="text"
                placeholder="Enter customer phone number"
              />
            </Form.Group>
            <Form.Group controlId="numContainersAssign">
              <Form.Label>Number of Containers to Assign:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Enter number of containers"
              />
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
              <Form.Control
                type="text"
                placeholder="Enter customer phone number"
              />
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
      <Modal
        show={showRemoveContainersModal}
        onHide={handleCloseRemoveContainersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="customerIdRemove">
              <Form.Label>Customer Phone Number:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer phone number"
              />
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
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseRemoveContainersModal}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handleRemoveContainer}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mt-2 mb-4">
        <h5 className="mb-3">Containers Available:</h5>
        {vendorProfileLoading ? (
          <Loader />
        ) : (
          <Table striped bordered hover className="container-md mx-auto">
            <thead>
              <tr>
                <th>Image</th>
                <th>Container Type</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {vendorProfile?.containerReceived?.map(container => (
                <tr key={container._id} className="align-middle">
                  <td>
                    <img
                      src={container.containerSchema.imgUrl}
                      alt={container.containerSchema.category}
                      style={{ width: "60px", height: "60px" }}
                    />
                  </td>
                  <td>{container.containerSchema.category}</td>
                  <td>{container.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <div>
        <h5>Containers Assigned:</h5>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search by Phone Number or Name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mt-2 mb-4"
          style={{ width: "300px" }}
        />
        {/* Assigned Containers Table */}
        {usersLoading ? (
          <Loader />
        ) : (
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map(user => (
                <tr key={user._id} className="align-middle">
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleSeeContainers(user.phone)}
                    >
                      Container Information
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleAssignContainers(user.phone)}
                      className="mx-3"
                    >
                      Checkout
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveContainers(user.phone)}
                    >
                      Return
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Vendor;
