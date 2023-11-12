import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ObjectID = mongoose.Schema.Types.ObjectId;

const vendorSchema = new mongoose.Schema(
  {
    containerOwner: { type: ObjectID, required: true, ref: "Admin" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "vendor" },
    containerReceived: [
      {
        containerSchema: { type: ObjectID, ref: "Container" },
        quantity: { type: Number, required: true },
      },
    ],
    location: [{ type: String }],
  },
  { timestamps: true }
);

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

vendorSchema.methods.matchPasswords = async function (enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
