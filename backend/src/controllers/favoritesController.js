const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

// Add movie to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { movieId, title, thumbnail } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, "Please provide movieId and title");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Check if movie already favorited
    const exists = user.favorites.some((item) => item.movieId === movieId);
    if (exists) {
      return sendError(res, 400, "Movie already in your favorites");
    }

    user.favorites.push({ movieId, title, thumbnail });
    await user.save();

    return sendSuccess(res, 201, "Movie added to favorites", user.favorites);
  } catch (error) {
    return sendError(res, 500, `Error adding to favorites: ${error.message}`);
  }
};

// Remove movie from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.favorites = user.favorites.filter((item) => item.movieId !== movieId);
    await user.save();

    return sendSuccess(
      res,
      200,
      "Movie removed from favorites",
      user.favorites,
    );
  } catch (error) {
    return sendError(
      res,
      500,
      `Error removing from favorites: ${error.message}`,
    );
  }
};

// Get favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(
      res,
      200,
      "Favorites retrieved successfully",
      user.favorites,
    );
  } catch (error) {
    return sendError(res, 500, `Error retrieving favorites: ${error.message}`);
  }
};
