const Notification = require("../models/notification");
const UserModel = require("../models/user");
const { removeToken } = require("../services/notificationService");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
    });
  }
};

const removePushToken = async (req, res) => {
  try {
    const { pushToken } = req.body;

    if (!pushToken) {
      return res.status(400).json({
        success: false,
        message: "Push token is required",
      });
    }

    await removeToken(req.user.id, pushToken);

    return res.status(200).json({
      success: true,
      message: "Push token removed successfully",
    });
  } catch (error) {
    console.error("Error removing push token:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove push token",
    });
  }
};

const toggleNotificationPreferences = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.notificationsEnabled = !user.notificationsEnabled;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Promotional notifications ${user.notificationsEnabled ? "enabled" : "disabled"}`,
      data: { notificationsEnabled: user.notificationsEnabled },
    });
  } catch (error) {
    console.error("Error toggling notification preferences:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update notification preferences",
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  removePushToken,
  toggleNotificationPreferences,
};
