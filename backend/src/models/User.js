const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a profile name"],
      trim: true,
      maxlength: [50, "Profile name cannot be longer than 50 characters"],
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    isKids: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const watchHistorySchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: String,
    watchedAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0, // seconds watched
    },
    duration: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
    }, // 🔥 needed for recommendations
  },
  { timestamps: false },
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    profiles: [profileSchema],
    myList: [
      {
        movieId: String,
        title: String,
        thumbnail: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    favorites: [
      {
        movieId: String,
        title: String,
        thumbnail: String,
        favoritedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    watchHistory: [watchHistorySchema],
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to exclude password when converting to JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
