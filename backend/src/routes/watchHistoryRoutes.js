const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  addToWatchHistory,
  updateWatchProgress,
  getWatchHistory,
  getWatchProgress,
  clearWatchHistory,
} = require("../controllers/watchHistoryController");

// All routes require authentication
router.get("/", authenticate, getWatchHistory);
router.post("/", authenticate, addToWatchHistory);
router.get("/:movieId", authenticate, getWatchProgress);
router.put("/:movieId", authenticate, updateWatchProgress);
router.delete("/", authenticate, clearWatchHistory);

module.exports = router;
