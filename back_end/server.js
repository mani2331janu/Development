require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const masterRoute = require("./routes/masterRoutes");
const adminRoute = require("./routes/administrationRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");

const app = express();

// Allow frontend access
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/master", authMiddleware, masterRoute);
app.use("/api/administration", authMiddleware, adminRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
