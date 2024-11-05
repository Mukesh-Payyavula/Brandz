import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

dotenv.config();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Product Route
app.use("/api/products", productRoutes);

// User Route
app.use("/api/users", userRoutes);

// Order Route
app.use("/api/orders", orderRoutes);

// Wishlist Route
app.use("/api/wishlist", wishlistRoutes);

// Upload Route
app.use("/api/upload", uploadRoutes);

// Category Route
app.use("/api/categories", categoryRoutes);

// PayPal Configuration
app.get("/api/config/paypal", (req, res) => {
  res.status(201).send(process.env.PAYPAL_CLIENT_ID);
});

// Static Files for Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Production Setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Default Route
  app.get("/api", (req, res) => {
    res.status(201).json({ success: true, message: "Welcome to Cloth Shop APP" });
  });
}

// Error Handling Middleware
app.use(errorHandler);
app.use(notFound);

// Fetch Products with Filtering
app.get('/api/products', async (req, res) => {
  const { keyword, pageNumber, category } = req.query;

  const query = {};
  
  if (category) {
    query.category = category; // Add category filter
  }

  if (keyword) {
    query.name = { $regex: keyword, $options: 'i' }; // Search by keyword
  }

  // Pagination
  const pageSize = 10; // Adjust page size as needed
  const page = Number(pageNumber) || 1;
  const skip = pageSize * (page - 1);

  try {
    const products = await Product.find(query).limit(pageSize).skip(skip); // Assuming Product is your model
    const count = await Product.countDocuments(query);

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
