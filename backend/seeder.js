import mongoose from "mongoose";
import dotenv from "dotenv";
import containers from "./data/containers.js";
import Container from "./models/containerSchema.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Container.deleteMany();
    await Container.insertMany(containers);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
