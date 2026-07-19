const express = require("express");
const { authToken } = require("../middleware/auth");
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  removePushToken,
  toggleNotificationPreferences,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", authToken, getNotifications);
router.put("/:id/read", authToken, markAsRead);
router.put("/read-all", authToken, markAllAsRead);
router.post("/remove-token", authToken, removePushToken);
router.put("/toggle-preferences", authToken, toggleNotificationPreferences);

module.exports = router;
