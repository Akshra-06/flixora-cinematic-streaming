const Notification = require("../models/Notification");
const { sendSuccess, sendError } = require("../utils/response");

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, movieId, movieTitle, type } = req.body;

    if (!message) {
      return sendError(res, 400, "Please provide a message");
    }

    const notification = new Notification({
      userId,
      message,
      movieId,
      movieTitle,
      type: type || "info",
    });

    await notification.save();

    return sendSuccess(res, 201, "Notification created", notification);
  } catch (error) {
    return sendError(res, 500, `Error creating notification: ${error.message}`);
  }
};

// Get user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const { isRead } = req.query;

    let query = { userId: req.userId };

    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    return sendSuccess(
      res,
      200,
      "Notifications retrieved successfully",
      notifications,
    );
  } catch (error) {
    return sendError(
      res,
      500,
      `Error retrieving notifications: ${error.message}`,
    );
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    return sendSuccess(res, 200, "Notification marked as read", notification);
  } catch (error) {
    return sendError(res, 500, `Error marking notification: ${error.message}`);
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, isRead: false },
      { isRead: true },
    );

    return sendSuccess(res, 200, "All notifications marked as read");
  } catch (error) {
    return sendError(res, 500, `Error marking notifications: ${error.message}`);
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    return sendSuccess(res, 200, "Notification deleted");
  } catch (error) {
    return sendError(res, 500, `Error deleting notification: ${error.message}`);
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.userId,
      isRead: false,
    });

    return sendSuccess(res, 200, "Unread count retrieved", {
      unreadCount: count,
    });
  } catch (error) {
    return sendError(
      res,
      500,
      `Error retrieving unread count: ${error.message}`,
    );
  }
};
