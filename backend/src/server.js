require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const myListRoutes = require("./routes/myListRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const watchHistoryRoutes = require("./routes/watchHistoryRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reactionRoutes = require("./routes/reactionRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8080",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to MongoDB on first request (for Vercel serverless)
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      return res.status(500).json({
        success: false,
        message: "Database connection failed. Please try again later.",
      });
    }
  }
  next();
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/my-list", myListRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/watch-history", watchHistoryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reactions", reactionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Flixora backend is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Export for Vercel serverless
module.exports = app;

// Start server (for local development)
if (require.main === module) {
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
