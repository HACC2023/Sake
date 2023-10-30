import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, uniqe: true },
  phone: { type: String, required: true, uniqe: true },
  password: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, uniqe: true },
});
