import mongoose from "mongoose";

const containerSchema = new mongoose.Schema({
  category: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  imgUrl: { type: String },
});

const Container = mongoose.model("Container", containerSchema);

export default Container;
