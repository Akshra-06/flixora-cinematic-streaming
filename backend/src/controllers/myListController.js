const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

// Add movie to my list
exports.addToMyList = async (req, res) => {
  try {
    const { movieId, title, thumbnail } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, "Please provide movieId and title");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Check if movie already in list
    const exists = user.myList.some((item) => item.movieId === movieId);
    if (exists) {
      return sendError(res, 400, "Movie already in your list");
    }

    user.myList.push({ movieId, title, thumbnail });
    await user.save();

    return sendSuccess(res, 201, "Movie added to your list", user.myList);
  } catch (error) {
    return sendError(res, 500, `Error adding to list: ${error.message}`);
  }
};

// Remove movie from my list
exports.removeFromMyList = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.myList = user.myList.filter((item) => item.movieId !== movieId);
    await user.save();

    return sendSuccess(res, 200, "Movie removed from your list", user.myList);
  } catch (error) {
    return sendError(res, 500, `Error removing from list: ${error.message}`);
  }
};

// Get my list
exports.getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, 200, "My list retrieved successfully", user.myList);
  } catch (error) {
    return sendError(res, 500, `Error retrieving my list: ${error.message}`);
  }
};
