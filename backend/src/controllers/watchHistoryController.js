const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

// Add to watch history
exports.addToWatchHistory = async (req, res) => {
  try {
    if (!req.userId) {
      return sendError(res, 401, "User not authenticated");
    }
    const { movieId, title, thumbnail, progress, duration, genre } = req.body;

    if (!movieId || !title) {
      return sendError(res, 400, "Please provide movieId and title");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const existingIndex = user.watchHistory.findIndex(
      (item) => item.movieId === movieId,
    );

    if (existingIndex > -1) {
      // 🔄 UPDATE EXISTING
      const item = user.watchHistory[existingIndex];

      item.watchedAt = new Date();

      if (progress !== undefined) item.progress = progress;
      if (duration !== undefined) item.duration = duration;

      const safeProgress = Number(item.progress) || 0;
const safeDuration = Number(item.duration) || 0;

// consider completed if 95% watched
item.completed =
  safeDuration > 0 && safeProgress / safeDuration >= 0.95;

      if (genre) item.genre = genre;
    } else {
      // ➕ ADD NEW
      user.watchHistory.push({
        movieId,
        title,
        thumbnail,
        progress: progress || 0,
        duration: duration || 0,
        completed: duration && progress >= duration - 5 ? true : false,
        genre: genre || "",
      });
    }

    // ✅ ALWAYS SAVE
    await user.save();

    return sendSuccess(res, 201, "Added to watch history", user.watchHistory);
  } catch (error) {
    console.error("WATCH HISTORY ERROR:", error);
    return sendError(res, 500, error.message);
  }
};

// Update watch progress
exports.updateWatchProgress = async (req, res) => {
  try {
    if (!req.userId) {
      return sendError(res, 401, "User not authenticated");
    }
    const { movieId } = req.params;
    const { progress, duration } = req.body;

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

    if (duration !== undefined) {
      item.duration = duration;
    }

    item.completed = item.duration > 0 && item.progress >= item.duration - 5;

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
    if (!req.userId) {
      return sendError(res, 401, "User not authenticated");
    }
    const user = await User.findById(req.userId);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // 🔥 ensure array exists
    if (!user.watchHistory) {
      user.watchHistory = [];
    }

    // 🔥 FILTER ONLY "CONTINUE WATCHING"
    const continueWatching = user.watchHistory
      .filter((item) => {
        const progress = Number(item.progress) || 0;
        const duration = Number(item.duration) || 0;

        if (duration === 0) return false;

        const completed = progress / duration >= 0.95;

        return !completed && progress > 5;
      })
      .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));

    return sendSuccess(
      res,
      200,
      "Continue watching retrieved",
      continueWatching
    );
  } catch (error) {
    console.error("GET WATCH HISTORY ERROR:", error);
    return sendError(res, 500, error.message);
  }
};

// Get watch progress for specific movie
exports.getWatchProgress = async (req, res) => {
  try {
    if (!req.userId) {
      return sendError(res, 401, "User not authenticated");
    }
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
