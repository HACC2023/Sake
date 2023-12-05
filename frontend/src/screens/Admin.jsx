import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useAdminGetContainersQuery } from "../slices/adminApiSlice";
import { useVendorGetVendorsQuery } from "../slices/adminApiSlice";
import { useAdminRegisterVendorMutation } from "../slices/adminApiSlice";
import { useAdminUpdateVendorInventoryMutation } from "../slices/adminApiSlice";
import { useAdminRemoveVendorInventoryMutation } from "../slices/adminApiSlice";
import { useAdminGetVendorsQuery } from "../slices/adminApiSlice";
import { useAdminRemoveVendorMutation } from "../slices/adminApiSlice";
import { useAdminGetUsersQuery } from "../slices/adminApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Admin = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryUser, setSearchQueryUser] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [updateVendor, setUpdateVendor] = useState("");
  const [updateContainer, setUpdateContainer] = useState("");
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [removeVendor, setRemoveVendor] = useState("");
  const [removeQuantity, setRemoveQuantity] = useState("");
  const [removeContainer, setRemoveContainer] = useState("");
  const [deleteVendor, setDeleteVendor] = useState("");
  const [showSeeContainersModal, setShowSeeContainersModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSeeContainers = customer => {
    const user = users?.find(c => c.phone === customer.phone);
    setSelectedCustomer(user);
    setShowSeeContainersModal(true);
  };

  const handleCloseSeeContainersModal = () => setShowSeeContainersModal(false);

  const [adminRegisterVendor, { isLoading: registerVendorLoading }] =
    useAdminRegisterVendorMutation();

  const [
    adminUpdateVendorInventory,
    { isLoading: updateVendorInventoryLoading },
  ] = useAdminUpdateVendorInventoryMutation();

  const [
    adminRemoveVendorInventory,
    { isLoading: RemoveVendorInventoryLoading },
  ] = useAdminRemoveVendorInventoryMutation();

  const [adminRemoveVendor, { isLoading: RemoveVendorLoading }] =
    useAdminRemoveVendorMutation();

  const {
    data: containers,
    isLoading: containersLoading,
    isError: containersError,
    refetch: containersRefetch,
  } = useAdminGetContainersQuery();

  const {
    data: vendors,
    isLoading: vendorsLoading,
    isError: vendorsError,
    refetch: vendorsRefetch,
  } = useVendorGetVendorsQuery();

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    refetch: usersRefetch,
  } = useAdminGetUsersQuery();

  const {
    data: vendorsDetail,
    isLoading: vendorsDetailLoading,
    isError: vendorsDetailError,
    refetch: vendorsDetailRefetch,
  } = useAdminGetVendorsQuery();

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      await containersRefetch();
      await vendorsRefetch();
      await vendorsDetailRefetch();
      await usersRefetch();
    }, 5000);
    return () => {
      clearInterval(pollInterval);
    };
  }, [containersRefetch, vendorsRefetch, vendorsDetailRefetch, usersRefetch]);

  const handleShowAssignModal = () => setShowAssignModal(true);
  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setUpdateContainer("");
    setUpdateQuantity("");
    setUpdateVendor("");
  };
  const handleShowRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => {
    setShowRemoveModal(false);
    setRemoveContainer("");
    setRemoveQuantity("");
    setRemoveVendor("");
  };
  const [showCreateVendorModal, setShowCreateVendorModal] = useState(false);
  const [showRemoveVendorModal, setShowRemoveVendorModal] = useState(false);

  const handleShowRemoveVendorModal = vendor => {
    setDeleteVendor(vendor);
    setShowRemoveVendorModal(true);
  };
  const handleCloseRemoveVendorModal = () => setShowRemoveVendorModal(false);
  const handleShowCreateVendorModal = () => setShowCreateVendorModal(true);
  const handleCloseCreateVendorModal = () => {
    setShowCreateVendorModal(false);
    setVendorName("");
    setVendorPhone("");
    setVendorEmail("");
    setVendorPassword("");
  };

  const handleRemoveVendor = async () => {
    // needs function to actually remove
    try {
      await adminRemoveVendor(deleteVendor).unwrap();
      toast.success("Successfully Remove Vendor");
      handleCloseRemoveVendorModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCreateVendorAccount = async () => {
    // account creation
    try {
      await adminRegisterVendor({
        name: vendorName.toUpperCase(),
        email: vendorEmail,
        phone: vendorPhone,
        password: vendorPassword,
      }).unwrap();
      handleCloseCreateVendorModal();
      setVendorName("");
      setVendorEmail("");
      setVendorPhone("");
      setVendorPassword("");
      toast.success("Vendor Created Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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

  const filteredVendors = vendorsDetail?.filter(
    vendor =>
      vendor.name.includes(searchQuery.toUpperCase()) ||
      vendor.phone.includes(searchQuery)
  );

  const filteredUsers = users?.filter(
    user =>
      user.name.toUpperCase().includes(searchQueryUser.toUpperCase()) ||
      user.phone.includes(searchQueryUser) ||
      user.containerVendor?.name
        .toUpperCase()
        .includes(searchQueryUser.toUpperCase())
  );

  return (
    <>
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
                        <td>{item.containerInfo?.category}</td>
                        <td>{item?.checkoutQuan}</td>
                        <td>{item?.returnQuan}</td>
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
      <div className="px-5" style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>Admin Portal</h1>
        <div className="py-3 d-flex justify-content-center">
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
                <Form.Control
                  as="select"
                  value={updateVendor}
                  onChange={e => setUpdateVendor(e.target.value)}
                >
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
                  value={updateQuantity}
                  onChange={e => setUpdateQuantity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="containerTypeAssign">
                <Form.Label>Container Type:</Form.Label>
                <Form.Control
                  as="select"
                  value={updateContainer}
                  onChange={e => setUpdateContainer(e.target.value)}
                >
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
        <Modal
          show={showRemoveVendorModal}
          onHide={handleCloseRemoveVendorModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Vendor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteVendor && (
              <p>
                Are you sure you want to remove{" "}
                <span className="h5">{deleteVendor}?</span>
              </p>
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
                <Form.Control
                  as="select"
                  value={removeVendor}
                  onChange={e => setRemoveVendor(e.target.value)}
                >
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
                  value={removeQuantity}
                  onChange={e => setRemoveQuantity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="containerTypeRemove">
                <Form.Label>Container Type:</Form.Label>
                <Form.Control
                  as="select"
                  value={removeContainer}
                  onChange={e => setRemoveContainer(e.target.value)}
                >
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
        <Modal
          show={showCreateVendorModal}
          onHide={handleCloseCreateVendorModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Vendor Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="vendorNameCreate">
                <Form.Label>Vendor Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vendor name"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="vendorEmailCreate">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={vendorEmail}
                  onChange={e => setVendorEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="vendorPhoneCreate">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={vendorPhone}
                  onChange={e => setVendorPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="vendorPasswordCreate">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={vendorPassword}
                  onChange={e => setVendorPassword(e.target.value)}
                />
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
          <h5 className="mb-3">Containers Available:</h5>
          {containersLoading ? (
            <Loader />
          ) : (
            <Table striped bordered hover className="container-md mx-auto">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Container Type</th>
                  <th>Cost</th>
                  <th>Rental Price</th>
                </tr>
              </thead>
              <tbody>
                {containers?.map(({ _id, category, imgUrl, price, cost }) => (
                  <tr key={_id} className="align-middle">
                    <td>
                      <img
                        src={imgUrl}
                        alt={category}
                        style={{ width: "60px", height: "60px" }}
                      />
                    </td>
                    <td>{category}</td>
                    <td>{cost}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div>
          {/* Containers Assigned to Vendors Table */}
          <h5>Containers Assigned to Vendors:</h5>

          {/* search bar */}
          <input
            type="text"
            placeholder="Name or Phone Number"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="mt-2 mb-4"
          />
          {vendorsDetailLoading ? (
            <Loader />
          ) : (
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th style={{ minWidth: "255px" }}>Containers Received</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors?.map(vendor => (
                  <tr key={vendor._id} className="align-middle">
                    <td>{vendor.name}</td>
                    <td>{vendor.phone}</td>
                    <td>{vendor.email}</td>
                    <td style={{ minWidth: "255px" }}>
                      {vendor.containerReceived?.map(container => (
                        <div
                          key={container._id}
                          className="d-flex justify-content-between"
                        >
                          <p>{container.containerSchema.category}</p>
                          <p>{container.quantity}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleShowRemoveVendorModal(vendor.name)}
                      >
                        Remove Vendor
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div>
          {/* Containers Assigned to Vendors Table */}
          <h5>Users</h5>

          {/* search bar */}
          <input
            type="text"
            placeholder="Name/Phone/Vendor"
            value={searchQueryUser}
            onChange={e => setSearchQueryUser(e.target.value)}
            className="mt-2 mb-4"
          />
          {usersLoading ? (
            <Loader />
          ) : (
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Vendor</th>
                  {/* <th style={{ minWidth: "255px" }}>Containers Received</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map(user => (
                  <tr key={user._id} className="align-middle">
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.containerVendor?.name}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleSeeContainers(user)}
                      >
                        Container Information
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
