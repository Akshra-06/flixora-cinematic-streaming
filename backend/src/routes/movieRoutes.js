const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getTrailerByTmdbId,
} = require("../controllers/movieController");

// Public routes
router.get("/", getAllMovies);
router.get("/trailer/:tmdbId", getTrailerByTmdbId);
router.get("/:movieId", getMovieById);

// Admin routes (in production, add admin middleware)
router.post("/", createMovie);
router.put("/:movieId", updateMovie);
router.delete("/:movieId", deleteMovie);

module.exports = router;
