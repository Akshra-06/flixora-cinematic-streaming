const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
    message: {
      type: String,
      required: [true, "Please provide a notification message"],
    },
    movieId: {
      type: String,
      default: null,
    },
    movieTitle: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["info", "warning", "success", "error", "movie-update"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  },
  { timestamps: true },
);

// Create TTL index to automatically delete old notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Notification", notificationSchema);
