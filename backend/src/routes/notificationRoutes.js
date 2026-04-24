const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../controllers/notificationController");

// Public route for creating notifications (can be protected in production)
router.post("/", createNotification);

// Protected routes
router.get("/", authenticate, getUserNotifications);
router.get("/unread-count", authenticate, getUnreadCount);
router.put("/:notificationId/read", authenticate, markAsRead);
router.put("/read-all", authenticate, markAllAsRead);
router.delete("/:notificationId", authenticate, deleteNotification);

module.exports = router;
