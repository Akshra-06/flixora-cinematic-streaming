const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  addToMyList,
  removeFromMyList,
  getMyList,
} = require("../controllers/myListController");

// All routes require authentication
router.get("/", authenticate, getMyList);
router.post("/", authenticate, addToMyList);
router.delete("/:movieId", authenticate, removeFromMyList);

module.exports = router;
