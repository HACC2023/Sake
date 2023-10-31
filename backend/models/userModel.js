import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, uniqe: true },
  phone: { type: String, required: true, uniqe: true },
  password: { type: String, required: true },
  containerReceived: {type: Number, required: true}
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, uniqe: true },
});

const containerSchema = new mongoose.Schema({
  category: {type: String, required: true},
  returned: {type: boolean, default: false, required: true}
})