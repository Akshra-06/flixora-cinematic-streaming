const Reaction = require("../models/Reaction");
const { sendSuccess, sendError } = require("../utils/response");

// Add or update reaction
exports.addReaction = async (req, res) => {
  try {
    const { movieId, reaction } = req.body;

    if (!movieId || !reaction) {
      return sendError(res, 400, "Please provide movieId and reaction");
    }

    if (!["like", "dislike", "favorite"].includes(reaction)) {
      return sendError(res, 400, "Reaction must be like, dislike, or favorite");
    }

    // Check if reaction already exists
    const existingReaction = await Reaction.findOne({
      userId: req.userId,
      movieId,
    });

    if (existingReaction) {
      // Update existing reaction
      existingReaction.reaction = reaction;
      await existingReaction.save();

      return sendSuccess(res, 200, "Reaction updated", existingReaction);
    }

    // Create new reaction
    const newReaction = new Reaction({
      userId: req.userId,
      movieId,
      reaction,
    });

    await newReaction.save();

    return sendSuccess(res, 201, "Reaction added", newReaction);
  } catch (error) {
    return sendError(res, 500, `Error adding reaction: ${error.message}`);
  }
};

// Get user's reaction to a movie
exports.getUserReaction = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reaction = await Reaction.findOne({
      userId: req.userId,
      movieId,
    });

    if (!reaction) {
      return sendSuccess(res, 200, "No reaction found", null);
    }

    return sendSuccess(res, 200, "Reaction retrieved", reaction);
  } catch (error) {
    return sendError(res, 500, `Error retrieving reaction: ${error.message}`);
  }
};

// Get all reactions for a movie
exports.getMovieReactions = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reactions = await Reaction.find({ movieId });

    const summary = {
      total: reactions.length,
      likes: reactions.filter((r) => r.reaction === "like").length,
      dislikes: reactions.filter((r) => r.reaction === "dislike").length,
      favorites: reactions.filter((r) => r.reaction === "favorite").length,
    };

    return sendSuccess(res, 200, "Movie reactions retrieved", summary);
  } catch (error) {
    return sendError(res, 500, `Error retrieving reactions: ${error.message}`);
  }
};

// Remove reaction
exports.removeReaction = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reaction = await Reaction.findOneAndDelete({
      userId: req.userId,
      movieId,
    });

    if (!reaction) {
      return sendError(res, 404, "Reaction not found");
    }

    return sendSuccess(res, 200, "Reaction removed");
  } catch (error) {
    return sendError(res, 500, `Error removing reaction: ${error.message}`);
  }
};

// Get user's all reactions (paginated)
exports.getUserReactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, reaction } = req.query;

    let query = { userId: req.userId };

    if (reaction) {
      query.reaction = reaction;
    }

    const skip = (page - 1) * limit;

    const reactions = await Reaction.find(query)
      .limit(limit * 1)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Reaction.countDocuments(query);

    return sendSuccess(res, 200, "User reactions retrieved", {
      reactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    return sendError(
      res,
      500,
      `Error retrieving user reactions: ${error.message}`,
    );
  }
};
