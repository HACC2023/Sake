import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useVendorProfileQuery } from "../slices/adminApiSlice";
import { useVendorGetUsersQuery } from "../slices/adminApiSlice";
import { useVendorCheckoutUserMutation } from "../slices/adminApiSlice";
import { useVendorUserReturnMutation } from "../slices/adminApiSlice";
import { useVendorUpdateLocationMutation } from "../slices/adminApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Vendor = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSeeContainersModal, setShowSeeContainersModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutUser, setCheckoutUser] = useState("");
  const [checkoutContainer, setCheckoutContainer] = useState("");
  const [checkoutQuantity, setCheckoutQuantity] = useState("");
  const [returnUser, setReturnUser] = useState("");
  const [returnContainer, setReturnContainer] = useState("");
  const [returnQuantity, setReturnQuantity] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

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

  const [vendorUserReturn, { isLoading: vendorReturnUserLoading }] =
    useVendorUserReturnMutation();

  const [vendorUpdateLocation, { isLoading: vendorUpdateLocationLoading }] =
    useVendorUpdateLocationMutation();

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      await vendorProfileRefetch();
      await usersRefetch();
    }, 5000);
    return () => {
      clearInterval(pollInterval);
    };
  }, [vendorProfileRefetch, usersRefetch]);

  const handleShowAssignModal = customer => {
    const user = users?.find(c => c.phone === customer.phone);
    setSelectedCustomer(user);
    setShowAssignModal(true);
    setCheckoutUser(customer.phone);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setCheckoutContainer("");
    setCheckoutQuantity("");
  };

  const handleShowLocationModal = () => {
    setShowLocationModal(true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
    setNewLocation("");
  };

  const handleShowRemoveModal = customer => {
    const user = users?.find(c => c.phone === customer.phone);
    setSelectedCustomer(user);
    setShowRemoveModal(true);
    setReturnUser(customer.phone);
  };

  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
    setReturnContainer("");
    setReturnQuantity("");
  };

  const handleSeeContainers = customer => {
    const user = users?.find(c => c.phone === customer.phone);
    setSelectedCustomer(user);
    setShowSeeContainersModal(true);
  };

  const handleCloseSeeContainersModal = () => setShowSeeContainersModal(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAssignContainer = async () => {
    try {
      await vendorCheckoutUser({
        data: {
          containerName: checkoutContainer,
          quantity: checkoutQuantity,
        },
        phone: checkoutUser,
      }).unwrap();
      toast.success("Container assigned to user successfully");
      handleCloseAssignModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleRemoveContainer = async () => {
    try {
      await vendorUserReturn({
        data: {
          containerName: returnContainer,
          quantity: returnQuantity,
          location: returnLocation,
        },
        phone: returnUser,
      }).unwrap();
      toast.success("Container return updated successfully");
      handleCloseRemoveModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddLocation = async () => {
    try {
      await vendorUpdateLocation({ returnLocation: newLocation }).unwrap();
      toast.success("Added Location Successfully");
      handleCloseLocationModal();
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
      <div className="my-3">
        <h3>Return Location:</h3>
        {vendorProfileLoading ? (
          <Loader />
        ) : (
          <div>
            {vendorProfile?.location?.map(loc => (
              <span key={loc} className="mx-2 fs-5">
                {loc}
              </span>
            ))}
          </div>
        )}
        <Button
          variant="success"
          className="mt-3"
          onClick={handleShowLocationModal}
        >
          Add Location
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

      {/* Add location Container Modal */}
      <Modal show={showLocationModal} onHide={handleCloseLocationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Return Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="returnLocation">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                required
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLocationModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddLocation}>
            Add
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
                {selectedCustomer?.container.map(con => (
                  <option key={con._id} value={con.containerInfo.category}>
                    {con.containerInfo.category}
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
            <Form.Group controlId="returnLocation">
              <Form.Label>Return Location:</Form.Label>
              <Form.Control
                as="select"
                value={returnLocation}
                onChange={e => setReturnLocation(e.target.value)}
              >
                <option>Select location</option>
                {vendorProfile?.location?.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
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
                  <td className="d-flex justify-content-center">
                    <Button
                      variant="info"
                      onClick={() => handleSeeContainers(user)}
                    >
                      Container Information
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleShowAssignModal(user)}
                      className="mx-3"
                    >
                      Checkout
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowRemoveModal(user)}
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
