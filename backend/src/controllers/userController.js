const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");
const { generateToken } = require("../utils/auth");

// Register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Please provide email and password");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, "Email already in use");
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);

    return sendSuccess(res, 201, "User registered successfully", {
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    return sendError(res, 500, `Registration error: ${error.message}`);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendError(res, 401, "Invalid credentials");
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid credentials");
    }

    const token = generateToken(user._id);

    return sendSuccess(res, 200, "Login successful", {
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    return sendError(res, 500, `Login error: ${error.message}`);
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(
      res,
      200,
      "Profile retrieved successfully",
      user.toJSON(),
    );
  } catch (error) {
    return sendError(res, 500, `Error retrieving profile: ${error.message}`);
  }
};

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const { name, avatar, isKids } = req.body;

    if (!name) {
      return sendError(res, 400, "Please provide a profile name");
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.profiles.push({ name, avatar, isKids: isKids || false });
    await user.save();

    return sendSuccess(res, 201, "Profile created successfully", user.profiles);
  } catch (error) {
    return sendError(res, 500, `Error creating profile: ${error.message}`);
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { name, avatar, isKids } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const profile = user.profiles.id(profileId);
    if (!profile) {
      return sendError(res, 404, "Profile not found");
    }

    if (name) profile.name = name;
    if (avatar) profile.avatar = avatar;
    if (isKids !== undefined) profile.isKids = isKids;

    await user.save();

    return sendSuccess(res, 200, "Profile updated successfully", user.profiles);
  } catch (error) {
    return sendError(res, 500, `Error updating profile: ${error.message}`);
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.profiles.id(profileId).deleteOne();
    await user.save();

    return sendSuccess(res, 200, "Profile deleted successfully", user.profiles);
  } catch (error) {
    return sendError(res, 500, `Error deleting profile: ${error.message}`);
  }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(
      res,
      200,
      "Profiles retrieved successfully",
      user.profiles,
    );
  } catch (error) {
    return sendError(res, 500, `Error retrieving profiles: ${error.message}`);
  }
};
