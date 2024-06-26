import express from "express";
import connectDB from "./databate/db.js"; // Adjust the path as needed
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { isAdmin, requireSignIn } from "./middleware/auth.middleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect to MongoDB
connectDB();

//es 6
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

//routes
app.use("/api/v1/auth", authRoutes); // Adjust the path as needed
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
