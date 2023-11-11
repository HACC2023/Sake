import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import Vendor from "../models/vendorModel.js";
import Container from "../models/containerSchema.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth-admin
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPasswords(password))) {
    generateToken(res, admin._id, "admin");
    res
      .status(201)
      .json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// route POST /api/users/register-user
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({ name, email, password });

  if (admin) {
    res
      .status(201)
      .json({ _id: admin._id, name: admin.name, email: admin.email });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
  res.status(200).json({ message: "Register Admin" });
});

// @desc Register a new vendor
// route POST /api/users/register-vendor
// @access Public
const registerVendor = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const vendorExists = await Vendor.findOne({ email });

  if (vendorExists) {
    res.status(400);
    throw new Error("Vendor already exists");
  }

  const vendor = await Vendor.create({
    containerOwner: req.admin._id,
    name,
    email,
    phone,
    password,
  });

  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid vendor data");
  }
});

// @desc Logout an admin
// route POST /api/users/logout
// @access Public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("admin", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged Out" });
});

// @desc get list of vendors
// route GET /api/users/admin/vendors
// @access Private
const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().select("-password");
  res.status(200).json(vendors);
});

// @desc get vendor by name
// route GET /api/users/admin/vendors/:name (The-Red-Fish)
// @access Private
const getVendorByName = asyncHandler(async (req, res) => {
  const vendorName = req.params.name.replace(/-/g, " ");
  const vendor = await Vendor.findOne({
    name: new RegExp(`^${vendorName}$`, "i"),
  })
    .select("-password")
    .populate({ path: "containerOwner", select: "-password" });
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }
  res.status(200).json(vendor);
});

// @desc dispatch containers to specific vendor
// route PATCH /api/users/admin/vendors/:name
// @access Private
const updateVendor = asyncHandler(async (req, res) => {
  const vendorName = req.params.name.replace(/-/g, " ");
  const { containerName, quantity } = req.body;
  const container = await Container.findOne({
    category: containerName,
  });
  const vendor = await Vendor.findOne({
    name: new RegExp(`^${vendorName}$`, "i"),
  })
    .select("-password")
    .populate({ path: "containerReceived.containerSchema" });
  if (vendor) {
    const containerToUpdate = vendor.containerReceived.find(
      container => container.containerSchema.category === containerName
    );
    if (containerToUpdate) {
      containerToUpdate.quantity += +quantity;
    } else {
      vendor.containerReceived.push({ containerSchema: container, quantity });
    }
    const updatedVendor = await vendor.save();
    res.status(200).json(updatedVendor);
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
});

// @desc remove containers from specific vendor
// route PATCH /api/users/admin/remove/vendors/:name
// @access Private
const removeVendor = asyncHandler(async (req, res) => {
  const vendorName = req.params.name.replace(/-/g, " ");
  const { containerName, quantity } = req.body;
  const vendor = await Vendor.findOne({
    name: new RegExp(`^${vendorName}$`, "i"),
  })
    .select("-password")
    .populate({ path: "containerReceived.containerSchema" });
  if (vendor) {
    const containerToUpdate = vendor.containerReceived.find(
      container => container.containerSchema.category === containerName
    );
    if (!containerToUpdate) {
      return res.status(404).json({
        message: "Container not found",
      });
    }
    if (containerToUpdate.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Quantity to remove exceeds the available quantity" });
    }
    if (containerToUpdate.quantity === +quantity) {
      vendor.containerReceived = vendor.containerReceived.filter(
        container => container.containerSchema.category !== containerName
      );
    } else {
      containerToUpdate.quantity -= +quantity;
    }
    const updatedVendor = await vendor.save();
    res.status(200).json(updatedVendor);
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
});

export {
  authAdmin,
  registerAdmin,
  registerVendor,
  logoutAdmin,
  getAllVendors,
  getVendorByName,
  updateVendor,
  removeVendor,
};
