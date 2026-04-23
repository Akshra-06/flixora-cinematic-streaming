require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const myListRoutes = require("./routes/myListRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const watchHistoryRoutes = require("./routes/watchHistoryRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reactionRoutes = require("./routes/reactionRoutes");

const app = express();

// ✅ CORS (single, clean config)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight support (important for Render/Vercel)
app.options("*", cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/my-list", myListRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/watch-history", watchHistoryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reactions", reactionRoutes);

// Health
app.get("/api/health", (req, res) => {
  res.json({ message: "Flixora backend is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;

// Local run
if (require.main === module) {
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}