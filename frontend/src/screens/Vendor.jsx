import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useVendorProfileQuery } from "../slices/adminApiSlice";
import { useVendorGetUsersQuery } from "../slices/adminApiSlice";
import { useVendorCheckoutUserMutation } from "../slices/adminApiSlice";
import Loader from "../components/Loader";

const Vendor = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showSeeContainersModal, setShowSeeContainersModal] = useState(false);
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

  const handleShowAssignModal = phone => {
    setShowAssignModal(true);
    setCheckoutUser(phone);
    console.log(phone);
  };

  const handleCloseAssignModal = () => setShowAssignModal(false);

  const handleShowRemoveModal = phone => {
    setShowRemoveModal(true);
    setReturnUser(phone);
    console.log(phone);
  };

  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const handleSeeContainers = phone => {
    const user = users?.find(c => c.phone === phone);
    console.log(user);
    setSelectedCustomer(user);
    setShowSeeContainersModal(true);
  };

  const handleCloseSeeContainersModal = () => setShowSeeContainersModal(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  const filteredUsers = users?.filter(
    user =>
      user.phone.includes(searchQuery) ||
      user.name.toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }} className="px-5">
      <h1>Vendor Portal</h1>
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
              <p>
                Customer: <span className="h5">{selectedCustomer.name}</span>
              </p>
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
            <Form.Group controlId="containerType">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control
                as="select"
                value={checkoutContainer}
                onChange={e => setCheckoutContainer(e.target.value)}
              >
                <option>Select container type</option>
                {vendorProfile?.containerReceived?.map(container => (
                  <option
                    key={container._id}
                    value={container.containerSchema.category}
                  >
                    {container.containerSchema.category}
                  </option>
                ))}
              </Form.Control>
              <Form.Group controlId="numContainersAssign">
                <Form.Label>Number of Containers to Assign:</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Enter number of containers"
                  value={checkoutQuantity}
                  onChange={e => setCheckoutQuantity(e.target.value)}
                />
              </Form.Group>
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
            <Form.Group controlId="containerTypeRemove">
              <Form.Label>Container Type:</Form.Label>
              <Form.Control
                as="select"
                value={returnContainer}
                onChange={e => setReturnContainer(e.target.value)}
              >
                <option>Select container type</option>
                {vendorProfile?.containerReceived?.map(container => (
                  <option
                    key={container._id}
                    value={container.containerSchema.category}
                  >
                    {container.containerSchema.category}
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
                value={returnQuantity}
                onChange={e => setReturnQuantity(e.target.value)}
              />
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
                <th>Description</th>
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
                  <td>{container.containerSchema.desc}</td>
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
                      onClick={() => handleShowAssignModal(user.phone)}
                      className="mx-3"
                    >
                      Checkout
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowRemoveModal(user.phone)}
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
