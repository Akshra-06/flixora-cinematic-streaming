const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  register,
  login,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
} = require("../controllers/userController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authenticate, getProfile);
router.post("/profiles", authenticate, createProfile);
router.get("/profiles", authenticate, getAllProfiles);
router.put("/profiles/:profileId", authenticate, updateProfile);
router.delete("/profiles/:profileId", authenticate, deleteProfile);

module.exports = router;
