const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

// Public routes
router.get("/", getAllMovies);
router.get("/:movieId", getMovieById);

// Admin routes (in production, add admin middleware)
router.post("/", createMovie);
router.put("/:movieId", updateMovie);
router.delete("/:movieId", deleteMovie);

module.exports = router;
