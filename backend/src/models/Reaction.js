const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
    movieId: {
      type: String,
      required: [true, "Please provide a movie ID"],
    },
    reaction: {
      type: String,
      enum: ["like", "dislike", "favorite"],
      required: [true, "Please provide a reaction type"],
    },
  },
  { timestamps: true },
);

// Create a compound index to ensure one reaction per user per movie
reactionSchema.index({ userId: 1, movieId: 1, reaction: 1 }, { unique: true });

module.exports = mongoose.model("Reaction", reactionSchema);
