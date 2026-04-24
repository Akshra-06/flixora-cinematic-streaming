const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controllers/favoritesController");

// All routes require authentication
router.get("/", authenticate, getFavorites);
router.post("/", authenticate, addToFavorites);
router.delete("/:movieId", authenticate, removeFromFavorites);

module.exports = router;
