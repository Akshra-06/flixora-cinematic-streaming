const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

// Add to watch history
exports.addToWatchHistory = async (req, res) => {
  try {
    const { movieId, title, thumbnail, progress } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, "Please provide movieId and title");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Check if movie is already in watch history
    const existingIndex = user.watchHistory.findIndex(
      (item) => item.movieId === movieId,
    );

    if (existingIndex > -1) {
      // Update existing entry
      user.watchHistory[existingIndex].watchedAt = new Date();
      if (progress !== undefined) {
        user.watchHistory[existingIndex].progress = progress;
      }
    } else {
      // Add new entry
      user.watchHistory.push({
        movieId,
        title,
        thumbnail,
        progress: progress || 0,
      });
    }

    await user.save();

    return sendSuccess(res, 201, "Added to watch history", user.watchHistory);
  } catch (error) {
    return sendError(
      res,
      500,
      `Error adding to watch history: ${error.message}`,
    );
  }
};

// Update watch progress
exports.updateWatchProgress = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { progress } = req.body;

    if (progress === undefined) {
      return sendError(res, 400, "Please provide progress");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const item = user.watchHistory.find((i) => i.movieId === movieId);
    if (!item) {
      return sendError(res, 404, "Movie not in watch history");
    }

    item.progress = progress;
    item.watchedAt = new Date();
    await user.save();

    return sendSuccess(res, 200, "Watch progress updated", user.watchHistory);
  } catch (error) {
    return sendError(
      res,
      500,
      `Error updating watch progress: ${error.message}`,
    );
  }
};

// Get watch history
exports.getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(
      res,
      200,
      "Watch history retrieved successfully",
      user.watchHistory,
    );
  } catch (error) {
    return sendError(
      res,
      500,
      `Error retrieving watch history: ${error.message}`,
    );
  }
};

// Get watch progress for specific movie
exports.getWatchProgress = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const item = user.watchHistory.find((i) => i.movieId === movieId);
    if (!item) {
      return sendSuccess(res, 200, "No watch history for this movie", {
        progress: 0,
      });
    }

    return sendSuccess(res, 200, "Watch progress retrieved", item);
  } catch (error) {
    return sendError(
      res,
      500,
      `Error retrieving watch progress: ${error.message}`,
    );
  }
};

// Clear watch history
exports.clearWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.watchHistory = [];
    await user.save();

    return sendSuccess(res, 200, "Watch history cleared");
  } catch (error) {
    return sendError(
      res,
      500,
      `Error clearing watch history: ${error.message}`,
    );
  }
};
