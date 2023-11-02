import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 6000;
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use("/api/users", userRoutes, vendorRoutes, adminRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

// return a json object with error message and stack if in dev environment
// instead of an HTML error page
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
