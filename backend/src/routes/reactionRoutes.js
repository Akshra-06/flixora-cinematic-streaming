const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  addReaction,
  getUserReaction,
  getMovieReactions,
  removeReaction,
  getUserReactions,
} = require("../controllers/reactionController");

// Get movie reactions (public)
router.get("/movie/:movieId", getMovieReactions);

// User reaction routes (protected)
router.get("/", authenticate, getUserReactions);
router.get("/movie/:movieId/user", authenticate, getUserReaction);
router.post("/", authenticate, addReaction);
router.delete("/:movieId", authenticate, removeReaction);

module.exports = router;
