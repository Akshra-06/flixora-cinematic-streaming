const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: [true, "Please provide a movie ID"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a movie title"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide a thumbnail URL"],
    },
    videoUrl: {
      type: String,
      default: "",
    },
    genre: [String],
    duration: {
      type: Number,
      default: 0, // in minutes
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    releaseDate: Date,
    director: String,
    cast: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Movie", movieSchema);
