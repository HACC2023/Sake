import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ObjectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    containerVendor: { type: ObjectID, required: true, ref: "Vendor" },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    payment: {
      card_number: { type: String },
      cvv: { type: String },
      expiry_month: {
        type: String,
        validate: { validator: v => v.length === 2 },
      },
      expiry_year: {
        type: String,
        validate: { validator: v => v.length === 2 },
      },
      amount: { type: Number },
    },
    locationReturn: { type: String },
    container: [
      {
        containerInfo: { type: ObjectID, ref: "Container" },
        checkoutQuan: { type: Number, default: 0 },
        returnQuan: { type: Number, default: 0 },
      },
    ],
    coupon: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
