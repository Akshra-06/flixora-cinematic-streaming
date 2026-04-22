const { verifyToken } = require("../utils/auth");
const User = require("../models/User");
const { sendError } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return sendError(res, 401, "No token provided. Please log in.");
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return sendError(res, 401, "Invalid or expired token");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendError(res, 401, "User not found");
    }

    req.user = user;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return sendError(res, 500, `Authentication error: ${error.message}`);
  }
};

module.exports = authenticate;
