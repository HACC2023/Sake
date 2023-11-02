import mongoose from "mongoose";

const ObjectID = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const vendorSchema = new mongoose.Schema(
  {
    containerOwner: { type: ObjectID, required: true, ref: "Admin" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique },
    phone: { type: String, required: true, unique },
    password: { type: String, required: true },
    containerReceived: [
      { containerSchema, quantity: { type: Number, required: true } },
    ],
    location: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    containerVendor: { type: ObjectID, required: true, ref: "Vendor" },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique },
    password: { type: String, required: true },
    payment: {
      card_number: { type: String, required: true },
      cvv: { type: String, required: true },
      expiry_month: {
        type: String,
        required: true,
        validate: { validator: v => v.length === 2 },
      },
      expiry_year: {
        type: String,
        required: true,
        validate: { validator: v => v.length === 2 },
      },
      amount: { type: Number, required: true },
    },
    locationReturn: { type: String, required: true },
    container: [
      {
        containerInfo: containerSchema,
        checkoutQuant: { type: Number, required: true },
        returnQuan: { type: Number, required: true, default: 0 },
      },
    ],
    returnPeriod: { type: Number, required: true },
  },
  { timestamps: true }
);

const containerSchema = new mongoose.Schema({
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);
const User = mongoose.model("User", userSchema);

export { Admin, Vendor, User };
