// app.js (Main Application Setup)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./src/utils/logger");
const authRoutes = require("./src/routes/auth.routes");
const limitsRoutes = require("./src/routes/limits.routes");
const { errorHandler } = require("./src/middlewares/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/limits", limitsRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Faster Payments API!" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});


// Error Handling Middleware (MUST be at the end)
app.use(errorHandler);

module.exports = app;
